// ===== CV, Blog, Contact sections =====
import React from 'react';
import { Reveal, SectionHead, Tag } from './components';
import competencesData from '../data/competences.json';

const CV_TABS = [
  { id: "profil", label: "Profil" },
  { id: "experiences", label: "Expériences" },
  { id: "competences", label: "Compétences" },
  { id: "formation", label: "Formation" },
  { id: "projets", label: "Projets" },
  { id: "perso", label: "Perso" },
];

export const CV = ({ onOpenProject }) => {
  const [tab, setTab] = React.useState("profil");
  return (
    <section className="section" id="cv">
      <div className="container">
        <SectionHead num="04" title="Parcours" kicker="cv" />
        <div className="cv-shell">
          <div className="cv-sidebar">
            <div className="cv-tabs">
              {CV_TABS.map((t, i) => (
                <button
                  key={t.id}
                  className={"cv-tab" + (tab === t.id ? " active" : "")}
                  onClick={() => setTab(t.id)}
                >
                  <span className="tab-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
            <a
              href="#"
              className="btn btn-secondary cv-download"
              onClick={(e) => e.preventDefault()}
              style={{ width: "100%", justifyContent: "space-between" }}
            >
              Télécharger CV PDF
              <span className="btn-arrow">↓</span>
            </a>
          </div>
          <div className="cv-pane">
            {tab === "profil" && <CVProfil />}
            {tab === "experiences" && <CVExperiences />}
            {tab === "competences" && <CVCompetences />}
            {tab === "formation" && <CVFormation />}
            {tab === "projets" && <CVProjets onOpenProject={onOpenProject} />}
            {tab === "perso" && <CVPerso />}
          </div>
        </div>
        <div className="section-meta">
          <span>section/04 · cv</span>
          <span>{CV_TABS.length} onglets · pdf disponible</span>
        </div>
      </div>
    </section>
  );
};

const CVProfil = () => (
  <Reveal>
    <h3>Développeur d'applications IA</h3>
    <p className="body-text" style={{ maxWidth: "62ch" }}>
      Développeur d'applications IA en reconversion depuis le marketing
      industriel B2B. Double profil rare : 12 ans de terrain dans des
      entreprises qui conçoivent des machines de pointe, et une montée en
      compétences active sur les LLMs, RAG et agents IA.
    </p>
    <p
      className="body-text"
      style={{
        maxWidth: "62ch",
        color: "var(--accent)",
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        marginTop: 24,
      }}
    >
      Disponible en Bourgogne et Rhône-Alpes à partir de septembre 2026.
    </p>
  </Reveal>
);

const EXPERIENCES = [
  {
    period: "2019 — 2025",
    role: "Responsable Marketing et Communication",
    co: "Pinette PEI / Jean Perrot",
    location: "Chalon-sur-Saône",
    context:
      "Structuration et pilotage de la fonction marketing d'une PME industrielle multi-marques (presses composites + tôlerie) sur des marchés variés : aéronautique, spatial, automobile, énergies, naval.",
    learnings: [
      "Dans une PME industrielle, chaque action marketing se justifie : les résultats en leads et en trafic se mesurent, l'image de marque beaucoup moins. Et pourtant les deux comptent.",
      "Les données existent, elles sont rarement exploitées : quand on s'y attelle, la vraie valeur est dans la structuration et la qualité, pas dans la collecte.",
      "Les directions industrielles font confiance aux faits, pas aux concepts : la réponse au cahier des charges et le prix l'emportent toujours sur l'image de marque.",
      "Dans une relation B2B longue durée, la crédibilité se construit sur la connaissance du métier client — y compris savoir dire \"ce n'est pas ce qu'il vous faut\".",
      "Piloter un prestataire technique sans être l'expert qui exécute, ça s'apprend à ses dépens : la confiance n'empêche pas le contrôle, et un cadrage rigoureux en amont évite les mauvaises surprises.",
    ],
    achievements: [
      "Refonte site web : +25% trafic, +100% conversions",
      "LinkedIn : 500 → 3 500 abonnés via stratégie de contenu technique co-construite avec les experts internes",
      "Implémentation marketing automation (Plezi) : nurturing, scoring et qualification des leads",
      "Pilotage budgétaire, reporting direction, management de stagiaires et alternants",
    ],
  },
  {
    period: "2011 — 2017",
    role: "Marketing et Innovation — Développement de nouvelles offres",
    co: "Airbus Defence and Space",
    location: "Les Mureaux",
    context:
      "Rôle transverse au sein d'une cellule d'innovation dans un groupe de défense et spatial mondial. Marchés adressés : drones, automobile, satellites, gestion de l'énergie, logiciels.",
    learnings: [
      "Dans un environnement techno push, la techno ne se vend pas seule : il faut traduire des capacités techniques en bénéfices concrets pour que quelqu'un accepte de payer.",
      "Le prix d'une solution n'est jamais neutre : une techno brillante portée par une structure aux coûts fixes colossaux reste invendable.",
      "Dans les grands groupes, la friction interne peut dépasser la friction marché — les processus de validation consomment autant d'énergie que le projet lui-même.",
    ],
    achievements: [
      "Maturation d'une vingtaine de projets innovation, de l'idée jusqu'aux gates de validation",
      "Customer development terrain sur plusieurs projets portés en direct",
      "Contribution à la traduction de signaux marché en cahiers des charges fonctionnels pour la R&D",
      "Implémentation Lean Startup au sein de la Business Nursery",
      "Formation et coaching aux méthodologies innovation à l'échelle du groupe",
      "Facilitation d'ateliers Business Model Generation dans toutes les divisions",
    ],
  },
  {
    period: "2009 — 2010",
    role: "Concepteur Mécanique — Dessinateur Projeteur",
    co: "Innovtec Industries",
    location: "Auvergne-Rhône-Alpes",
    context:
      "Missions en régie chez plusieurs clients industriels sur des secteurs variés : énergie solaire, manutention en environnement ATEX, plasturgie.",
    achievements: [
      "Modélisation 3D sur CATIA V5 et SolidWorks",
      "Dessin industriel et documentation technique bilingue FR/EN",
      "Conception sur des environnements techniques contraints (ATEX, machines spéciales)",
    ],
  },
  {
    period: "2008 — 2009",
    role: "Junior Project Manager — Atelier Chaudronnerie et Structures Métalliques",
    co: "École La Mache",
    location: "Lyon",
    context:
      "Pilotage de la création d'un atelier de haute technologie d'une valeur d'1 M€ : découpe laser CN, presse plieuse CN, robot de soudage.",
    achievements: [
      "Gestion de projet industriel de bout en bout : suivi planning, réception et mise en service des machines",
      "Programmation des machines à commandes numériques",
      "Formation des utilisateurs aux nouveaux équipements",
      "Gestion opérationnelle de l'atelier après création : devis, maintenance préventive",
    ],
  },
];

const CVExperiences = () => {
  const [open, setOpen] = React.useState(0);
  return (
    <Reveal>
      <h3>Expériences</h3>
      <p
        className="eyebrow-mono"
        style={{
          color: "var(--text-2)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {EXPERIENCES.length} postes · 17 ans de terrain industriel
      </p>
      <div className="exp-list">
        {EXPERIENCES.map((e, i) => {
          const isOpen = open === i;
          return (
            <div
              className={"exp-item" + (isOpen ? " open" : "")}
              key={i}
            >
              <button
                className="exp-toggle"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
              >
                <span className="exp-period">{e.period}</span>
                <span className="exp-head">
                  <span className="exp-role">{e.role}</span>
                  <span className="exp-co">
                    {e.co}
                    {e.location ? ` · ${e.location}` : ""}
                  </span>
                </span>
                <span className="exp-chevron" aria-hidden>
                  +
                </span>
              </button>
              {isOpen && (
                <div className="exp-detail">
                  {e.context && (
                    <p className="exp-context">{e.context}</p>
                  )}
                  {e.learnings && (
                    <div className="exp-block">
                      <div className="exp-block-label">
                        // ce que ce contexte m'a appris
                      </div>
                      <ul>
                        {e.learnings.map((l, k) => (
                          <li key={k}>{l}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {e.achievements && (
                    <div className="exp-block">
                      <div className="exp-block-label">
                        // réalisations clés
                      </div>
                      <ul>
                        {e.achievements.map((a, k) => (
                          <li key={k}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Reveal>
  );
};

const CVCompetences = () => {
  const { ia, marketing } = competencesData;
  const totalIA = ia.operationnel.length + ia.apprentissage.length + ia.notions.length;
  const totalMarketing = marketing.reduce((n, g) => n + g.competences.length, 0);

  return (
    <Reveal>
      <h3>Compétences</h3>
      <p
        className="eyebrow-mono"
        style={{
          color: "var(--text-2)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: 18,
        }}
      >
        2 domaines · {totalIA + totalMarketing} entrées
      </p>

      <h4>IA et développement</h4>
      <div className="skills-block">
        <div className="skill-level">
          <div className="skill-level-label">
            <span className="skill-dot l1" /> Opérationnel
          </div>
          <div className="skill-list">
            {ia.operationnel.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
        <div className="skill-level">
          <div className="skill-level-label">
            <span className="skill-dot l2" /> En apprentissage
          </div>
          <div className="skill-list">
            {ia.apprentissage.map((s) => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
        <div className="skill-level">
          <div className="skill-level-label">
            <span className="skill-dot l3" /> Notions
          </div>
          <div className="skill-list">
            {ia.notions.map((s) => <Tag key={s} muted>{s}</Tag>)}
          </div>
        </div>
      </div>

      <h4>Marketing et métier industriel</h4>
      <div className="comp-groups">
        {marketing.map((g, i) => (
          <div className="comp-group" key={g.titre}>
            <div className="comp-group-label">
              <span className="comp-group-num">{String(i + 1).padStart(2, "0")}</span>
              <span>{g.titre}</span>
            </div>
            <div className="skill-list">
              {g.competences.map((s) => <Tag key={s} muted>{s}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
};

const FORMATIONS = {
  reconversion: [
    {
      year: "2025–26",
      title: "Autoformation Développeur d'applications IA",
      school: "En cours",
    },
    {
      year: "2025",
      title: "Bootcamp Data Scientist et IA",
      school: "Mines Paris PSL — terminé",
    },
  ],
  initiale: [
    {
      year: "2012",
      title: "MSc Innovation, Strategy and Entrepreneurship",
      school: "Grenoble EM",
    },
    {
      year: "2013",
      title: "Business Model Masterclass",
      school: "Alex Osterwalder, Zurich",
    },
    {
      year: "2009",
      title: "Licence professionnelle Gestion de projet",
      school: "Université Lyon 1",
    },
    {
      year: "2008",
      title: "BSc European Engineering Business and Management",
      school: "Coventry University",
    },
    {
      year: "2007",
      title: "DUT Génie Mécanique et Productique",
      school: "IUT Lyon 1",
    },
  ],
};

const CVFormation = () => (
  <Reveal>
    <h3>Formation</h3>
    <h4>Reconversion IA</h4>
    <div>
      {FORMATIONS.reconversion.map((f, i) => (
        <div className="formation-item" key={i}>
          <div className="formation-year">{f.year}</div>
          <div>
            <div className="formation-title">{f.title}</div>
            <div className="formation-school">{f.school}</div>
          </div>
        </div>
      ))}
    </div>
    <h4>Formation initiale</h4>
    <div>
      {FORMATIONS.initiale.map((f, i) => (
        <div className="formation-item" key={i}>
          <div className="formation-year">{f.year}</div>
          <div>
            <div className="formation-title">{f.title}</div>
            <div className="formation-school">{f.school}</div>
          </div>
        </div>
      ))}
    </div>
  </Reveal>
);

const CVProjets = ({ onOpenProject }) => (
  <Reveal>
    <h3>Projets</h3>
    <p
      className="body-text"
      style={{ maxWidth: "62ch", color: "var(--text-2)", marginBottom: 24 }}
    >
      Sélection de projets de développement IA réalisés dans le cadre de ma
      reconversion. Code source public sur GitHub.
    </p>
    <button
      className="card card-interactive"
      onClick={() => onOpenProject("dnd-ai-companion")}
      style={{
        width: "100%",
        textAlign: "left",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          className="exp-role"
          style={{ fontFamily: "var(--font-display)", fontSize: 16 }}
        >
          DnD AI Companion
        </span>
        <span className="exp-period">2026 — Phase 1</span>
      </div>
      <div className="exp-co">
        Moteur de recherche sémantique RAG · Python, ChromaDB, Streamlit · MRR
        0.627
      </div>
    </button>
  </Reveal>
);

const CVPerso = () => (
  <Reveal>
    <h3>Personnel</h3>
    <h4>Langues</h4>
    <div>
      {[
        ["Français", "Natif"],
        ["Anglais", "Courant"],
        ["Espagnol", "Intermédiaire"],
        ["Hongrois", "Notions — en apprentissage"],
      ].map(([n, l]) => (
        <div className="lang-row" key={n}>
          <span className="lang-name">{n}</span>
          <span className="lang-level">{l}</span>
        </div>
      ))}
    </div>
    <h4>Centres d'intérêt</h4>
    <div className="interest-grid">
      {[
        ["Jeu de rôle", "Maître de jeu D&D"],
        ["Maker", "Impression 3D · Blender · Figurines"],
        ["Sports", "Escalade · Running · Street workout · Snowboard · Parachutisme"],
        ["Cuisine", "Cuisine et pâtisserie"],
        ["Voyages", "Tour du monde 2017–2018"],
        ["Bénévolat", "Secouriste Croix-Rouge"],
      ].map(([label, val]) => (
        <div className="interest-pill" key={label}>
          <span className="interest-label">{label}</span>
          <span>{val}</span>
        </div>
      ))}
    </div>
  </Reveal>
);

// ===== Blog =====

const BLOG_POSTS = [
  {
    slug: "marketing-vers-code-39-ans",
    num: "01",
    cats: ["Reconversion"],
    title:
      "Pourquoi j'ai quitté le marketing pour apprendre à coder à 39 ans",
    date: "2026 · à paraître",
    readTime: "8 min",
  },
  {
    slug: "premier-projet-ds-chatgpt",
    num: "02",
    cats: ["Reconversion", "Projets"],
    title:
      "Mon premier projet data science : ce que ChatGPT a fait à ma place et ce que ça m'a appris",
    date: "2026 · à paraître",
    readTime: "12 min",
  },
  {
    slug: "rag-probleme-de-donnees",
    num: "03",
    cats: ["IA", "Projets"],
    title:
      "Pourquoi un pipeline RAG, c'est d'abord un problème de données",
    date: "2026 · à paraître",
    readTime: "14 min",
  },
  {
    slug: "pme-industrielles-roi-ia",
    num: "04",
    cats: ["IA", "Industrie"],
    title:
      "PME industrielles et IA : pourquoi le ROI prime sur la techno",
    date: "2026 · à paraître",
    readTime: "10 min",
  },
];

const BLOG_FILTERS = ["Tous", "IA", "Reconversion", "Industrie", "Projets"];

export const Blog = ({ onOpenPost }) => {
  const [filter, setFilter] = React.useState("Tous");
  const filtered =
    filter === "Tous"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.cats.includes(filter));

  return (
    <section className="section" id="blog">
      <div className="container">
        <SectionHead
          num="05"
          title="Blog"
          kicker={`${filtered.length} article${filtered.length > 1 ? "s" : ""}`}
        />
        <div className="blog-filters">
          {BLOG_FILTERS.map((f) => (
            <button
              key={f}
              className={"blog-filter" + (filter === f ? " active" : "")}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="blog-grid">
          {filtered.map((p) => (
            <article
              key={p.slug}
              className="card card-interactive blog-card"
              onClick={() => onOpenPost(p.slug)}
              tabIndex={0}
              role="link"
            >
              <div className="blog-card-image" aria-hidden>
                Image
              </div>
              <div className="blog-card-meta">
                <span style={{ color: "var(--accent-40)" }}>#{p.num}</span>
                {p.cats.map((c, i) => (
                  <React.Fragment key={c}>
                    <span className="blog-card-cat">{c}</span>
                    {i < p.cats.length - 1 && (
                      <span style={{ color: "var(--muted)" }}>·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <h3 className="blog-card-title">{p.title}</h3>
              <div className="blog-card-footer">
                <span>{p.date}</span>
                <span>
                  {p.readTime} <span className="project-link-arrow">→</span>
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="section-meta">
          <span>section/05 · blog</span>
          <span>{BLOG_POSTS.length} articles · contenus à venir</span>
        </div>
      </div>
    </section>
  );
};

// ===== Contact =====

// Obfuscation email anti-bot — technique CSS direction:rtl
// L'email est stocké renversé dans le DOM ; unicodeBidi + direction:rtl
// le restitue correctement à l'affichage pour les humains.
// String.fromCharCode(64) évite le caractère "@" littéral dans le bundle.
const _at = String.fromCharCode(64);
// "alexandre.g.mathieu@outlook.fr" renversé caractère par caractère
const _emailRev = `rf.kooltuo${_at}ueihtam.g.erdnaxela`;
const _emailHref = `mailto:alexandre.g.mathieu${_at}outlook.fr`;

const EmailObfuscated = ({ className }) => (
  <a className={className} href={_emailHref}>
    <span style={{ unicodeBidi: "bidi-override", direction: "rtl" }}>
      {_emailRev}
    </span>
    <span className="contact-link-label">email</span>
  </a>
);

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqejyjje";

export const Contact = () => {
  const [form, setForm] = React.useState({
    nom: "",
    email: "",
    message: "",
  });
  // "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = React.useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          email: form.email,
          message: form.message,
          _gotcha: "",          // honeypot — doit rester vide
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ nom: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section className="section" id="contact">
      <div className="container">
        <SectionHead num="07" title="Contact" kicker="dispo sept 2026" />
        <div className="contact-grid">
          <Reveal>
            <h3 className="contact-lead">Construisons quelque&nbsp;chose.</h3>
            <p className="contact-sub">
              Je suis en recherche active d'un poste de développeur
              d'applications IA, disponible en France (Bourgogne et Rhône-Aples) à partir de septembre
              2026.
            </p>
            <div className="contact-links">
              <EmailObfuscated className="contact-link" />
              <a
                className="contact-link"
                href="https://linkedin.com/in/alexandre-g-mathieu"
                target="_blank"
                rel="noreferrer"
              >
                <span>linkedin.com/in/alexandre-g-mathieu</span>
                <span className="contact-link-label">linkedin</span>
              </a>
              <a
                className="contact-link"
                href="https://github.com/AlexGMathieu"
                target="_blank"
                rel="noreferrer"
              >
                <span>github.com/AlexGMathieu</span>
                <span className="contact-link-label">github</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <form className="form" onSubmit={submit} noValidate>
              {/* Honeypot anti-spam — doit rester invisible et vide */}
              <input
                type="text"
                name="_gotcha"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="form-row split">
                <div className="form-row">
                  <label className="field-label">Nom</label>
                  <input
                    className="field"
                    name="nom"
                    value={form.nom}
                    onChange={(e) => setForm({ ...form, nom: e.target.value })}
                    required
                  />
                </div>
                <div className="form-row">
                  <label className="field-label">Email</label>
                  <input
                    className="field"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <label className="field-label">Message</label>
                <textarea
                  className="field"
                  name="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Quelques lignes sur le contexte, le projet, l'équipe…"
                  required
                />
              </div>
              <div className="form-submit">
                <span className="form-note">
                  Réponse sous 48h en semaine
                </span>
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours…" : "Envoyer"}
                  {!isSubmitting && <span className="btn-arrow">→</span>}
                </button>
              </div>

              {status === "success" && (
                <div className="form-success">
                  // message envoyé — merci, je reviens vers vous très vite.
                </div>
              )}
              {status === "error" && (
                <div className="form-error">
                  // erreur lors de l'envoi — réessayez ou contactez-moi directement par email.
                </div>
              )}
            </form>
          </Reveal>
        </div>
        <div className="section-meta">
          <span>section/07 · contact</span>
          <span>Disponible CDI · Bourgogne / Rhône-Alpes · sept 2026</span>
        </div>
      </div>
    </section>
  );
};
