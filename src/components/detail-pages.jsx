// ===== Detail pages: Project & Blog =====
import React from 'react';
import { Reveal, Tag } from './components';
import { useMarkdownPage } from '../hooks/useMarkdownPage';

// ─── Shared layout ───────────────────────────────────────────────────────────

const DetailSection = ({ num, label, title, children }) => (
  <section className="detail-section">
    <div className="container">
      <div className="detail-section-grid">
        <div className="detail-section-num">
          {num}
          <span className="label">{label}</span>
        </div>
        <Reveal>
          <h2>{title}</h2>
          {children}
        </Reveal>
      </div>
    </div>
  </section>
);

// ─── Visual block renderers ───────────────────────────────────────────────────

const Callout = ({ data }) => (
  <div className="callout">
    <div className="callout-label">{data.label}</div>
    <div className="callout-body">{data.corps}</div>
  </div>
);

const ArchFlow = ({ steps }) => (
  <div className="arch-flow">
    {steps.map((s) => (
      <div className="arch-step" key={s.num}>
        <span className="arch-step-num">{s.num}</span>
        <span className="arch-step-name">{s.nom}</span>
        <span className="arch-step-detail">{s.detail}</span>
      </div>
    ))}
  </div>
);

const ResultsTable = ({ data }) => (
  <table className="results-table">
    <thead>
      <tr>
        <th>Catégorie</th>
        <th className="num">MRR</th>
        <th className="num">nDCG@5</th>
        <th className="num">Coverage</th>
        <th className="num">Q.</th>
      </tr>
    </thead>
    <tbody>
      {data.lignes.map((r) => (
        <tr key={r.cat}>
          <td>{r.cat}</td>
          <td className="num strong">{r.mrr}</td>
          <td className="num">{r.ndcg}</td>
          <td className="num">{r.coverage}</td>
          <td className="num">{r.q}</td>
        </tr>
      ))}
      {data.global && (
        <tr style={{ borderTop: '0.5px solid var(--accent-30)' }}>
          <td style={{ color: 'var(--accent)' }}>Global</td>
          <td className="num strong">{data.global.mrr}</td>
          <td className="num strong">{data.global.ndcg}</td>
          <td className="num strong">{data.global.coverage}</td>
          <td className="num strong">{data.global.q}</td>
        </tr>
      )}
    </tbody>
  </table>
);

const Lessons = ({ items }) => (
  <div className="lessons">
    {items.map((l) => (
      <div className="lesson" key={l.num}>
        <div className="lesson-num">{l.num}</div>
        <p className="lesson-body">
          <strong>{l.titre}</strong>{' '}{l.corps}
        </p>
      </div>
    ))}
  </div>
);

const Phase2 = ({ data, onNavigate }) => (
  <>
    <ul style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text)',
                 paddingLeft: 0, listStyle: 'none', maxWidth: '62ch' }}>
      {data.items.map((item) => (
        <li key={item.texte}>
          <span style={{
            color: item.priorite === 'P2' ? 'var(--accent)' : 'var(--text-2)',
            fontFamily: 'var(--font-mono)',
          }}>
            [{item.priorite}]
          </span>{' '}
          {item.texte}
        </li>
      ))}
    </ul>
    <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
      <a href={data.cta_url} target="_blank" rel="noreferrer" className="btn btn-primary">
        Voir le code sur GitHub
        <span className="btn-arrow">→</span>
      </a>
      <button className="btn btn-secondary"
              onClick={() => onNavigate({ name: 'home', scrollTo: 'contact' })}>
        En discuter
      </button>
    </div>
  </>
);

// Map a placeholder key to the matching visual block component
function renderBloc(key, frontmatter, onNavigate) {
  if (key === 'callout_hypothese' && frontmatter.callout_hypothese)
    return <Callout key={key} data={frontmatter.callout_hypothese} />;
  if (key === 'architecture' && frontmatter.architecture)
    return <ArchFlow key={key} steps={frontmatter.architecture} />;
  if (key === 'resultats' && frontmatter.resultats)
    return <ResultsTable key={key} data={frontmatter.resultats} />;
  if (key === 'lecons' && frontmatter.lecons)
    return <Lessons key={key} items={frontmatter.lecons} />;
  if (key === 'phase2' && frontmatter.phase2)
    return <Phase2 key={key} data={frontmatter.phase2} onNavigate={onNavigate} />;
  return null;
}

// ─── Project detail ───────────────────────────────────────────────────────────

export const ProjectDetail = ({ onNavigate }) => {
  // id comes from the route; we receive it via the route state stored in App
  // App passes route.id as a prop — we read it from the URL instead via onNavigate closure
  // Actually App renders <ProjectDetail onNavigate={navigate} /> and route.id is in App scope.
  // We need the id here — so App must pass it as a prop.
  // This component receives `id` prop (wired in App.jsx).
  return <ProjectDetailInner onNavigate={onNavigate} />;
};

// Inner component that receives id directly
export const ProjectDetailInner = ({ id, onNavigate }) => {
  const url = id ? `/content/projets/${id}.md` : null;
  const { status, frontmatter: fm, sections } = useMarkdownPage(url);

  React.useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (status === 'loading') return <PageLoader />;
  if (status === 'error')   return <PageError label="projet" onNavigate={onNavigate} />;

  return (
    <main>
      <header className="detail-header">
        <div className="container">
          <button className="detail-back"
                  onClick={() => onNavigate({ name: 'home', scrollTo: 'projects' })}>
            ← Retour aux projets
          </button>
          <div className="detail-eyebrow">
            <span>Projet {fm.numero}</span>
            <span>·</span>
            <span>{fm.domaine}</span>
            <span>·</span>
            <span className="live"><span className="dot" />{fm.statut}</span>
          </div>
          <h1 className="detail-title">{fm.titre}</h1>
          <p className="detail-lede">{fm.lede}</p>
          <div className="detail-tags">
            {(fm.tags || []).map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          {fm.meta && (
            <div className="detail-meta-grid">
              <div className="detail-meta-item">
                <span className="detail-meta-label">Rôle</span>
                <span className="detail-meta-value">{fm.meta.role}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Période</span>
                <span className="detail-meta-value">{fm.meta.periode}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Stack</span>
                <span className="detail-meta-value">{fm.meta.stack}</span>
              </div>
              <div className="detail-meta-item">
                <span className="detail-meta-label">Code</span>
                <a href={fm.meta.code_url} target="_blank" rel="noreferrer"
                   className="detail-meta-value" style={{ color: 'var(--accent)' }}>
                  {fm.meta.code_label}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {fm.cover && (
        <div className="container">
          <img src={fm.cover} alt="" className="detail-cover" />
        </div>
      )}

      {sections.map((s) => (
        <DetailSection key={s.num} num={s.num} label={s.label} title={s.titre}>
          {/* Prose HTML from Markdown body */}
          {s.html && (
            <div dangerouslySetInnerHTML={{ __html: s.html }}
                 className="detail-prose" />
          )}
          {/* Visual blocks at their placeholder positions */}
          {s.blocs.map((key) => renderBloc(key, fm, onNavigate))}
        </DetailSection>
      ))}
    </main>
  );
};

// ─── Blog detail ─────────────────────────────────────────────────────────────

export const BlogDetail = ({ slug, onNavigate }) => {
  const url = slug ? `/content/blog/${slug}.md` : null;
  const { status, frontmatter: fm, sections } = useMarkdownPage(url);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [slug]);

  if (status === 'loading') return <PageLoader />;
  if (status === 'error')   return <PageError label="article" onNavigate={onNavigate} />;

  // An article is a placeholder if it has a single "À venir" section
  const isPlaceholder = sections.length === 1 && sections[0]?.label === 'À venir';

  return (
    <main>
      <div className="read-progress" style={{ width: progress + '%' }} />
      <header className="detail-header">
        <div className="container">
          <button className="detail-back"
                  onClick={() => onNavigate({ name: 'home', scrollTo: 'blog' })}>
            ← Retour au blog
          </button>
          <div className="blog-detail-meta">
            {(fm.categories || []).map((c, i) => (
              <React.Fragment key={c}>
                <span className="cat">{c}</span>
                {i < fm.categories.length - 1 && (
                  <span style={{ color: 'var(--muted)' }}>·</span>
                )}
              </React.Fragment>
            ))}
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span>{fm.date}</span>
            <span style={{ color: 'var(--muted)' }}>·</span>
            <span>{fm.lecture}</span>
          </div>
          <h1 className="detail-title">{fm.titre}</h1>
          {fm.cover && (
            <img src={fm.cover} alt="" className="detail-cover" />
          )}
        </div>
      </header>

      {sections.map((s) => (
        <DetailSection key={s.num} num={s.num} label={s.label} title={s.titre}>
          <div dangerouslySetInnerHTML={{ __html: s.html }}
               className="detail-prose" />
          {isPlaceholder && (
            <div style={{ marginTop: 24 }}>
              <button className="btn btn-secondary"
                      onClick={() => onNavigate({ name: 'home', scrollTo: 'blog' })}>
                Voir les autres articles
              </button>
            </div>
          )}
        </DetailSection>
      ))}
    </main>
  );
};

// ─── Utility states ───────────────────────────────────────────────────────────

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginTop: 72 }}>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12,
                   color: 'var(--text-2)', letterSpacing: '0.18em' }}>
      chargement…
    </span>
  </div>
);

const PageError = ({ label, onNavigate }) => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 72 }}>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12,
                   color: 'var(--text-2)', letterSpacing: '0.14em' }}>
      // impossible de charger ce {label}
    </span>
    <button className="btn btn-secondary"
            onClick={() => onNavigate({ name: 'home' })}>
      ← Retour à l'accueil
    </button>
  </div>
);
