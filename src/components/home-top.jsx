// ===== Home page sections =====
import React from 'react';
import { Reveal, SectionHead, Tag } from './components';
import projetsData from '../data/projets.json';

export const Hero = () =>
<section className="hero" id="hero">
    <div className="container">
      <div className="hero-grid">
        <div>
          <div className="section-num" style={{ marginBottom: 24 }}>
            01
          </div>
          <div className="hero-status">
            <span className="dot" />
            <span>Disponible — Sept 2026</span>
          </div>
          <h1 className="hero-title">
            Développeur
            <br />
            d'applications IA
          </h1>
          <p className="hero-mono">
            J'ai passé 12 ans dans le marketing industriel.
            <br />
            Puis ChatGPT est arrivé et j'ai décidé de rejoindre
            <br />
            le côté obscur plutôt que de me faire bouffer.
          </p>
          <div className="hero-ctas">
            <button
            className="btn btn-primary"
            onClick={() => {
              const el = document.getElementById("projects");
              if (el)
              window.scrollTo({
                top: el.offsetTop - 64,
                behavior: "smooth"
              });
            }}>

              Voir mes projets
              <span className="btn-arrow">→</span>
            </button>
            <button
            className="btn btn-secondary"
            onClick={() => {
              const el = document.getElementById("contact");
              if (el)
              window.scrollTo({
                top: el.offsetTop - 64,
                behavior: "smooth"
              });
            }}>

              Me contacter
            </button>
          </div>
        </div>
        <Reveal delay={120}>
          <div className="hero-photo">
            <img
              src="/assets/images/portrait.webp"
              alt="Alexandre Mathieu"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>;


export const About = () =>
<section className="section" id="about">
    <div className="container">
      <SectionHead num="02" title="À propos" kicker="bio" />
      <div className="about-grid">
        <Reveal>
          <p className="about-lead" style={{ fontFamily: "\"Space Grotesk\"" }}>
            J'ai passé 12 ans à utiliser la tech des autres. Maintenant
            j'apprends à faire la mienne.
          </p>
          <p className="body-text" style={{ fontFamily: "\"JetBrains Mono\"", fontSize: "13px" }}>
            Dessinateur industriel de formation, j'ai passé 12 ans à construire
            des stratégies marketing pour des entreprises qui conçoivent des
            machines de pointe : aéronautique, spatial, automobile, nucléaire,
            naval. J'ai vu comment les entreprises décident, ce qu'elles
            achètent, pourquoi elles hésitent, et ce qui les fait avancer.
          </p>
          <p className="body-text" style={{ fontFamily: "\"JetBrains Mono\"", fontSize: "13px" }}>
            Quand l'IA a commencé à redessiner les contours de mon métier,
            j'aurais pu apprendre à mieux utiliser ChatGPT comme tout le monde.
            J'ai préféré comprendre comment ça marche et apprendre à construire.
          </p>
          <p className="body-text" style={{ fontFamily: "\"JetBrains Mono\"", fontSize: "13px" }}>
            Aujourd'hui je développe des applications IA orientées métier : des
            outils qui s'intègrent dans des workflows réels, qui répondent à des
            problèmes concrets, et qui tiennent leurs promesses sans exploser le
            budget. Je ne fais pas de LLMs. Je fais des applications qui les
            utilisent intelligemment.
          </p>
          <p className="body-text" style={{ fontFamily: "\"JetBrains Mono\"", fontSize: "13px" }}>
            Ce que j'apporte qu'un junior sorti d'école n'a pas : je sais ce
            qu'une entreprise attend vraiment d'un outil. Pas la perfection
            technique — l'utilité, la fiabilité, le ROI.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="career-strata" aria-label="Parcours chronologique">
            <div className="cs-header">
              <span>// parcours</span>
              <span className="live">
                <span className="dot" />
                2026
              </span>
            </div>
            <div className="cs-axis">
              <div className="stratum stratum-3">
                <div className="cs-tick">2025</div>
                <div className="cs-band">
                  <span className="cs-now-mark" />
                  <span className="cs-band-duration">1 an +</span>
                  <span className="cs-band-label">Dev IA</span>
                  <span className="cs-band-detail">
                    Bootcamp Mines Paris PSL · autoformation · portfolio GitHub
                  </span>
                </div>
              </div>
              <div className="stratum stratum-2">
                <div className="cs-tick">2011</div>
                <div className="cs-band">
                  <span className="cs-band-duration">14 ans</span>
                  <span className="cs-band-label">Marketing industriel B2B</span>
                  <span className="cs-band-detail">
                    Airbus Defence and Space · Pinette PEI
                  </span>
                </div>
              </div>
              <div className="stratum stratum-1">
                <div className="cs-tick">2005</div>
                <div className="cs-band">
                  <span className="cs-band-duration">6 ans</span>
                  <span className="cs-band-label">Formation initiale</span>
                  <span className="cs-band-detail">
                    DUT Génie Méca · BSc · Licence pro · dessinateur indus. · MSc Innovation Strategy Entrepreneurship
                  </span>
                </div>
              </div>
            </div>
            <div className="cs-footer">
              <div className="cs-stat">
                <span className="cs-stat-label">Terrain</span>
                <span className="cs-stat-value">14 ans</span>
              </div>
              <div className="cs-stat">
                <span className="cs-stat-label">Secteurs</span>
                <span className="cs-stat-value">05</span>
              </div>
              <div className="cs-stat accent">
                <span className="cs-stat-label">Statut</span>
                <span className="cs-stat-value">→ dev IA</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="section-meta">
        <span>section/02 · about</span>
        <span>last-updated 2026-05</span>
      </div>
    </div>
  </section>;


export const Projects = ({ onOpenProject }) => {
  const visibles = projetsData.filter((p) => p.slug);
  const kicker = `${visibles.length.toString().padStart(2, '0')} / ${visibles.length.toString().padStart(2, '0')}`;

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHead num="03" title="Projets" kicker={kicker} />
        <div className="projects-grid">
          {visibles.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <article
                className="card card-interactive project-card"
                onClick={() => onOpenProject(p.slug)}
                tabIndex={0}
                role="link"
              >
                <div className="project-card-image" aria-hidden>
                  Image
                </div>
                <div className="project-header">
                  <div>
                    <div className="kicker" style={{ marginBottom: 8 }}>
                      // projet {p.numero}
                    </div>
                    <h3 className="project-title">{p.titre}</h3>
                  </div>
                  <span className="project-status">
                    <span className="dot" />
                    {p.statut}
                  </span>
                </div>
                <div className="project-tags">
                  {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-metrics">
                  {p.metriques.map((m) => (
                    <div className="metric" key={m.label}>
                      <span className="metric-value">{m.valeur}</span>
                      <span className="metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
                <div className="project-footer">
                  <span>{p.github}</span>
                  <span className="project-link-arrow">Voir le projet →</span>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={visibles.length * 120}>
            <div className="project-empty">
              <span style={{ fontSize: 18, color: "var(--text-2)" }}>+</span>
              <span>Projet {String(visibles.length + 1).padStart(2, '0')} — en cours d'écriture</span>
            </div>
          </Reveal>
        </div>

        <div className="section-meta">
          <span>section/03 · portfolio</span>
          <span>{visibles.length} projet{visibles.length > 1 ? 's' : ''} visible{visibles.length > 1 ? 's' : ''} · 01 en cours</span>
        </div>
      </div>
    </section>
  );
};
