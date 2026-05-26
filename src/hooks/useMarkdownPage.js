import { useState, useEffect } from 'react';
import { marked } from 'marked';
import yaml from 'js-yaml';

// ─── Markdown parser ─────────────────────────────────────────────────────────

/**
 * Split raw Markdown text into:
 *   frontmatter : parsed YAML object
 *   sections    : array of { num, label, titre, html, blocs }
 *
 * Section heading convention: ## {num} · {label} · {titre}
 * Visual block placeholders:  <!-- clé_frontmatter -->
 */
function parseMarkdown(raw) {
  // 1. Split frontmatter
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return { frontmatter: {}, sections: [] };

  const frontmatter = yaml.load(fmMatch[1]) || {};
  const body = fmMatch[2];

  // 2. Split body on ## headings
  const sectionChunks = body
    .split(/^## /m)
    .filter(Boolean);

  const sections = sectionChunks.map((chunk) => {
    const lineEnd = chunk.indexOf('\n');
    const heading = chunk.slice(0, lineEnd).trim();
    const rest    = chunk.slice(lineEnd + 1);

    // Parse heading: "01 · Label · Titre complet"
    const parts = heading.split(' · ');
    const num   = parts[0]?.trim() ?? '';
    const label = parts[1]?.trim() ?? '';
    const titre = parts.slice(2).join(' · ').trim();

    // Extract <!-- bloc_key --> placeholders and split prose around them
    const PLACEHOLDER = /<!--\s*(\w+)\s*-->/g;
    const blocs = [];
    let match;
    while ((match = PLACEHOLDER.exec(rest)) !== null) {
      blocs.push(match[1]);
    }
    const prose = rest.replace(PLACEHOLDER, '').trim();

    return {
      num,
      label,
      titre,
      html: marked.parse(prose),
      blocs,           // ordered list of frontmatter keys to render at each position
      rawProse: prose, // kept for downstream needs
    };
  });

  return { frontmatter, sections };
}

// ─── Hook ────────────────────────────────────────────────────────────────────

/**
 * Fetch and parse a Markdown file from /public.
 *
 * Returns: { status: 'loading' | 'ok' | 'error', frontmatter, sections }
 */
export function useMarkdownPage(url) {
  const [state, setState] = useState({ status: 'loading', frontmatter: {}, sections: [] });

  useEffect(() => {
    if (!url) return;
    setState({ status: 'loading', frontmatter: {}, sections: [] });

    let cancelled = false;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        const { frontmatter, sections } = parseMarkdown(text);
        setState({ status: 'ok', frontmatter, sections });
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error', frontmatter: {}, sections: [] });
      });

    return () => { cancelled = true; };
  }, [url]);

  return state;
}
