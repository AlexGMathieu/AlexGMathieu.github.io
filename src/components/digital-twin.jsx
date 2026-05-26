// ===== Digital Twin section =====

const DT_SUGGESTIONS = [
  "Pourquoi tu as quitté le marketing ?",
  "Comment tu travailles sur un projet RAG ?",
  "Qu'est-ce que tu peux apporter qu'un junior ne peut pas ?",
];

const DT_SYSTEM = `Tu es le jumeau numérique d'Alexandre Mathieu, développeur d'applications IA en reconversion depuis 12 ans de marketing industriel B2B (Airbus Defence and Space 2011–2017, Pinette PEI 2019–2025).

RÈGLES :
- Tu réponds à la première personne, en français, comme si tu étais Alexandre.
- Ton : direct, sec, honnête, parfois mordant. Pas de buzzwords (passionné, innovant, synergies, disruptif).
- Tu ne fais pas de blabla d'introduction. Tu vas droit au point.
- 2 à 3 paragraphes courts maximum. Pas de listes à puces sauf si vraiment nécessaire.
- Si on demande tes coordonnées ou pour entrer en contact direct, redirige vers le formulaire de la section Contact ou l'adresse alexandre.g.mathieu@outlook.fr.
- Si on te pose une question hors sujet (météo, blagues, code arbitraire), tu refuses poliment et recentres sur ton parcours / tes positions / tes projets.

POSITIONS TECHNIQUES :
- Tu construis des applications qui utilisent les LLMs (RAG, agents), tu ne fais pas de LLMs.
- Un pipeline RAG c'est 80% un problème de données, 20% un problème de modèle.
- L'utilité, la fiabilité et le ROI priment toujours sur la techno.
- Tu mesures avant d'optimiser : éval-set avant pipeline.
- Sur les PME industrielles, le ROI prime sur la techno.

PROJETS :
- DnD AI Companion : moteur de recherche sémantique pour Maîtres du Jeu D&D 5e. RAG sur données 5etools, ChromaDB (11 collections), 14 parsers, Streamlit. MRR 0.627, Coverage 81% sur 150 questions d'éval. Phase 1 terminée.

PARCOURS :
- Formation technique 2007–2011 (DUT Génie Méca, BSc, Licence pro)
- Concepteur mécanique 2009–2010 (Innovtec Industries)
- Junior PM atelier 2008–2009 (École La Mache)
- Marketing & Innovation 2011–2017 (Airbus Defence and Space, Les Mureaux) — drones, spatial, automobile, énergie
- Responsable Marketing & Com 2019–2025 (Pinette PEI / Jean Perrot, Chalon-sur-Saône) — presses composites, tôlerie, aéro/spatial/auto/énergies/naval
- Reconversion 2025– (Bootcamp Mines Paris PSL, autoformation)

DISPONIBILITÉ : septembre 2026, CDI ou mission, en France.`;

const DigitalTwin = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  const send = async (text) => {
    const clean = (text || "").trim();
    if (!clean || sending) return;
    const userMsg = { role: "user", content: clean };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setSending(true);

    // Build conversation payload: bake the system prompt into the first user turn.
    const payload = next.map((m, i) => {
      if (m.role === "user" && i === 0) {
        return {
          role: "user",
          content: DT_SYSTEM + "\n\n--- Question ---\n" + m.content,
        };
      }
      return m;
    });

    try {
      const reply = await window.claude.complete({ messages: payload });
      setMessages((m) => [
        ...m,
        { role: "assistant", content: (reply || "").trim() },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Indisponible pour le moment — un souci côté infra. Tu peux me joindre directement via le formulaire de la section Contact ou par mail à alexandre.g.mathieu@outlook.fr.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const showSuggestions = messages.length === 0 && !sending;

  return (
    <section className="section" id="digital-twin">
      <div className="container">
        <SectionHead num="06" title="Digital Twin" kicker="agent · live" />
        <div className="dt-shell">
          <div className="dt-intro">
            <h3 className="dt-lead">Posez-moi vos questions directement.</h3>
            <p className="dt-sub">
              Ce n'est pas un chatbot générique. C'est un agent entraîné sur mon
              parcours, mes projets, mes positions techniques et mes
              convictions. Vous pouvez lui demander ce que je pense du RAG en
              contexte industriel, comment je travaille, ou simplement pourquoi
              j'ai quitté le marketing. C'est aussi une démonstration concrète
              de ce que je construis.
            </p>
          </div>

          <Reveal>
            <div className="dt-chat" aria-label="Chat avec le jumeau numérique d'Alexandre">
              <div className="dt-chat-header">
                <span>// alexandre.twin</span>
                <span className="live">
                  <span className="dot" />
                  En ligne
                </span>
              </div>

              <div
                className="dt-messages"
                ref={scrollRef}
                role="log"
                aria-live="polite"
              >
                {messages.length === 0 && (
                  <div className="dt-empty">
                    <div className="dt-empty-prompt">{">"} ready_</div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div className={"dt-message " + m.role} key={i}>
                    <span className="dt-message-label">
                      {m.role === "user" ? "vous" : "alexandre"}
                    </span>
                    <div className="dt-message-bubble">{m.content}</div>
                  </div>
                ))}
                {sending && (
                  <div className="dt-message assistant">
                    <span className="dt-message-label">alexandre</span>
                    <div className="dt-typing" aria-label="En train d'écrire">
                      <span className="dt-typing-dot" />
                      <span className="dt-typing-dot" />
                      <span className="dt-typing-dot" />
                    </div>
                  </div>
                )}
              </div>

              {showSuggestions && (
                <React.Fragment>
                  <div className="dt-suggestion-prefix">
                    // questions suggérées
                  </div>
                  <div className="dt-suggestions">
                    {DT_SUGGESTIONS.map((q) => (
                      <button
                        key={q}
                        className="dt-suggestion"
                        onClick={() => send(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </React.Fragment>
              )}

              <div className="dt-input-row">
                <span className="dt-input-prompt" aria-hidden>
                  {">"}
                </span>
                <input
                  className="dt-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Posez votre question…"
                  disabled={sending}
                  aria-label="Votre question"
                />
                <button
                  className="dt-send"
                  onClick={() => send(input)}
                  disabled={!input.trim() || sending}
                  aria-label="Envoyer"
                >
                  Envoyer
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </div>
          </Reveal>

          <p className="dt-footer-meta">
            Alimenté par Claude · Entraîné sur données vérifiées · Les réponses
            reflètent mes positions réelles
          </p>
        </div>
        <div className="section-meta">
          <span>section/06 · digital twin</span>
          <span>agent · fr · claude</span>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { DigitalTwin });
