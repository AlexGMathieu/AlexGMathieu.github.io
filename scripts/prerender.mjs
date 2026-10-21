// Prerender every route of the site to static HTML, after `vite build`
// (client) and `vite build --ssr` (server entry) have run.
//
// Output, in dist/:
//   index.html                  home page
//   blog/<slug>/index.html      one page per file in public/content/blog
//   project/<id>/index.html     one page per file in public/content/projets
//   sitemap.xml                 generated from the same list of routes
//
// GitHub Pages serves these files with a 200 status, so crawlers and LLMs get
// the full text without running any JavaScript. In a browser, React mounts over
// the same markup, so nothing changes visually.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const SITE = 'https://alexgmathieu.github.io';
const SUFFIX = 'Alexandre Mathieu';

// Minimal browser stand-in: App reads window.location and window.history.state
// while rendering. Effects and event handlers never run on the server.
const fakeWindow = { location: { pathname: '/', search: '' }, history: { state: null } };
globalThis.window = fakeWindow;

const { render, parseMarkdown } = await import(pathToFileURL(ssrEntry).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}

// ─── Helpers ────────────────────────────────────────────────────────────────

const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function plainText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// The Markdown parser can return an empty first section (text before the first
// "## " heading), so take the first section that has some text.
function firstParagraph(sections) {
  for (const s of sections) {
    const text = plainText(s.html);
    if (text) return text;
  }
  return '';
}

function truncate(text, max = 160) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…';
}

// Replace the value of one attribute, and fail loudly if the tag is missing.
function setAttr(html, pattern, value, label) {
  if (!pattern.test(html)) throw new Error(`prerender: ${label} not found in template`);
  return html.replace(pattern, (_m, a, b) => `${a}${escAttr(value)}${b}`);
}

function withMeta(html, { title, description, url }) {
  if (!/<title>[\s\S]*?<\/title>/.test(html)) throw new Error('prerender: <title> not found');
  let out = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escText(title)}</title>`);
  out = setAttr(out, /(name="description"\s+content=")[^"]*(")/, description, 'meta description');
  out = setAttr(out, /(rel="canonical"\s+href=")[^"]*(")/, url, 'canonical');
  out = setAttr(out, /(property="og:title"\s+content=")[^"]*(")/, title, 'og:title');
  out = setAttr(out, /(property="og:description"\s+content=")[^"]*(")/, description, 'og:description');
  out = setAttr(out, /(property="og:url"\s+content=")[^"]*(")/, url, 'og:url');
  return out;
}

function buildPage({ route, meta, cache }) {
  fakeWindow.location.pathname = route;
  globalThis.__MD_CACHE__ = cache;

  let html = template.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`);
  html = withMeta(html, meta);

  if (Object.keys(cache).length > 0) {
    // "<" is escaped so that article text can never close the script tag.
    const json = JSON.stringify(cache).replace(/</g, '\\u003c');
    html = html.replace('</head>', () => `<script>window.__MD_CACHE__=${json}</script>\n  </head>`);
  }

  globalThis.__MD_CACHE__ = undefined;
  return html;
}

function writePage(route, html) {
  const file = route === '/'
    ? path.join(dist, 'index.html')
    : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  return path.relative(dist, file);
}

// "27/05/2026" → "2026-05-27" (anything else, such as "à paraître", → null)
function isoDate(fr) {
  const m = typeof fr === 'string' && fr.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

function readMarkdownDir(dir, urlPrefix) {
  const folder = path.join(root, 'public', 'content', dir);
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const id = f.replace(/\.md$/, '');
      const raw = fs.readFileSync(path.join(folder, f), 'utf8');
      // JSON round-trip: the server renders exactly what the browser will read
      // back from the embedded cache (dates, undefined values, etc.).
      const parsed = JSON.parse(JSON.stringify(parseMarkdown(raw)));
      if (!parsed.frontmatter?.titre || parsed.sections.length === 0) {
        throw new Error(`prerender: ${dir}/${f} has no title or no sections`);
      }
      return { id, url: `${urlPrefix}/${id}.md`, parsed };
    });
}

// ─── Build the list of pages ────────────────────────────────────────────────

const pages = [];
const sitemap = [];

pages.push({
  route: '/',
  meta: null, // keeps the title and description written in index.html
  cache: {},
});
sitemap.push({ loc: `${SITE}/` });

for (const p of readMarkdownDir('projets', '/content/projets')) {
  const fm = p.parsed.frontmatter;
  const description = truncate(plainText(fm.lede || '') || firstParagraph(p.parsed.sections));
  pages.push({
    route: `/project/${p.id}`,
    meta: {
      title: `${fm.titre} | ${SUFFIX}`,
      description,
      url: `${SITE}/project/${p.id}/`,
    },
    cache: { [p.url]: p.parsed },
  });
  sitemap.push({ loc: `${SITE}/project/${p.id}/` });
}

for (const p of readMarkdownDir('blog', '/content/blog')) {
  const fm = p.parsed.frontmatter;
  const published = isoDate(fm.date);
  pages.push({
    route: `/blog/${p.id}`,
    meta: {
      title: `${fm.titre} | ${SUFFIX}`,
      description: truncate(firstParagraph(p.parsed.sections)),
      url: `${SITE}/blog/${p.id}/`,
    },
    cache: { [p.url]: p.parsed },
  });
  // Unpublished drafts ("à paraître") get a page but stay out of the sitemap.
  if (published) sitemap.push({ loc: `${SITE}/blog/${p.id}/`, lastmod: published });
}

// ─── Write ──────────────────────────────────────────────────────────────────

for (const page of pages) {
  const meta = page.meta ?? (() => {
    const title = template.match(/<title>([\s\S]*?)<\/title>/)[1].replace(/&amp;/g, '&');
    const description = template.match(/name="description"\s+content="([^"]*)"/)[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"');
    return { title, description, url: `${SITE}/` };
  })();
  const written = writePage(page.route, buildPage({ route: page.route, meta, cache: page.cache }));
  console.log(`prerender: ${page.route.padEnd(48)} → dist/${written}`);
}

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  sitemap
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n${u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : ''}  </url>`)
    .join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(dist, 'sitemap.xml'), xml);
console.log(`prerender: sitemap.xml with ${sitemap.length} URLs`);
