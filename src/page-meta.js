// Page <title>, description and canonical URL, shared by scripts/prerender.mjs
// (written into the static HTML) and by the browser (updated on every
// client-side navigation), so both always produce the same values.

export const SITE = 'https://alexgmathieu.github.io';
const SUFFIX = 'Alexandre Mathieu';

// Same values as the <head> of index.html, which the home page keeps as is.
export const HOME_META = {
  title: "Alexandre Mathieu — Développeur d'applications IA",
  description: "Portfolio d'Alexandre Mathieu, développeur d'applications IA après 12 ans de marketing B2B industriel. Projets RAG (Python, ChromaDB, OpenAI) et articles de blog.",
  ogDescription: "12 ans de marketing B2B industriel, puis reconversion en développement d'applications IA. Projets RAG et blog.",
  url: `${SITE}/`,
};

// ─── Text helpers ───────────────────────────────────────────────────────────

export function plainText(html) {
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
  const space = cut.lastIndexOf(' ');
  return cut.slice(0, space > 0 ? space : cut.length).replace(/[,;:.\s]+$/, '') + '…';
}

// ─── Meta for a Markdown page ───────────────────────────────────────────────

// route: "/blog/<slug>" or "/project/<id>" (without the trailing slash)
export function markdownPageMeta(route, { frontmatter: fm, sections }) {
  const lede = typeof fm.lede === 'string' ? plainText(fm.lede) : '';
  return {
    title: `${fm.titre} | ${SUFFIX}`,
    description: truncate(lede || firstParagraph(sections)),
    url: `${SITE}${route}/`,
  };
}

// ─── Browser: update <head> after a client-side navigation ──────────────────

function setContent(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function applyPageMeta({ title, description, ogDescription = description, url }) {
  document.title = title;
  setContent('meta[name="description"]', 'content', description);
  setContent('link[rel="canonical"]', 'href', url);
  setContent('meta[property="og:title"]', 'content', title);
  setContent('meta[property="og:description"]', 'content', ogDescription);
  setContent('meta[property="og:url"]', 'content', url);
}
