// Server entry used only at build time by scripts/prerender.mjs.
// It renders the same <App /> as the browser, to an HTML string.
import { renderToString } from 'react-dom/server';
import App from './App.jsx';

export { parseMarkdown } from './hooks/useMarkdownPage.js';

export function render() {
  return renderToString(<App />);
}
