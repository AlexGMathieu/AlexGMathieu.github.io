// ===== Shared components: Nav, Footer, Reveal, Logo =====
import React from 'react';

export const Logo = ({ onClick }) =>
<button
  onClick={onClick}
  style={{
    background: "transparent",
    border: 0,
    padding: 0,
    cursor: "pointer",
    color: "var(--text)"
  }}
  aria-label="Alexandre Mathieu — accueil">

    <span className="logo">
      <span>Alexandre</span>
      <span className="logo-last">MATHIEU</span>
    </span>
  </button>;


export const NAV_LINKS = [
{ id: "about", label: "À propos" },
{ id: "projects", label: "Projets" },
{ id: "cv", label: "CV" },
{ id: "blog", label: "Blog" },
{ id: "contact", label: "Contact" }];


function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids.join(",")]);
  return active;
}

export const Nav = ({ onNavigate, route, hideLinks = false }) => {
  const scrolled = useScrolled();
  const active = useActiveSection(
    route === "home" ? ["hero", ...NAV_LINKS.map((l) => l.id)] : []
  );

  const goSection = (id) => {
    if (route !== "home") {
      onNavigate({ name: "home", scrollTo: id });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 64,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="container nav-inner">
        <Logo onClick={() => onNavigate({ name: "home", scrollTo: "hero" })} />
        {!hideLinks &&
        <div className="nav-links" role="menubar">
            {NAV_LINKS.map((l) =>
          <button
            key={l.id}
            role="menuitem"
            className={
            "nav-link" + (
            route === "home" && active === l.id ? " active" : "")
            }
            onClick={() => goSection(l.id)}
            style={{
              background: "transparent",
              border: 0,
              cursor: "pointer", fontFamily: "\"JetBrains Mono\""
            }}>

                {l.label}
              </button>
          )}
          </div>
        }
        <div className="nav-right">
          <button
            className="btn btn-primary"
            onClick={() => goSection("contact")}>

            Contact
            <span className="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </nav>);

};

export const Footer = ({ onNavigate }) =>
<footer className="footer">
    <div className="container">
      <div className="footer-inner">
        <div className="footer-copy">
          © 2026 — Alexandre Mathieu
        </div>
        <div className="footer-links">
          {NAV_LINKS.map((l) =>
        <a
          key={l.id}
          href={`#${l.id}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate({ name: "home", scrollTo: l.id });
          }}>

              {l.label.toLowerCase()}
            </a>
        )}
        </div>
        <div className="footer-stack" style={{ textAlign: "right" }}>
          construit avec <span className="accent">[stack]</span>
        </div>
      </div>
    </div>
  </footer>;


export const Reveal = ({ children, delay = 0, as = "div", className = "", ...rest }) => {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  const Cmp = as;
  return (
    <Cmp
      ref={ref}
      className={"reveal" + (shown ? " in" : "") + (className ? " " + className : "")}
      {...rest}>

      {children}
    </Cmp>);

};

export const SectionHead = ({ num, title, kicker }) =>
<div className="section-head">
    <span className="section-num">{num}</span>
    <h2 className="section-title" style={{ fontFamily: "\"JetBrains Mono\"" }}>{title}</h2>
    {kicker &&
  <span
    className="kicker"
    style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>

        {kicker}
      </span>
  }
  </div>;


export const Tag = ({ children, muted = false }) =>
<span className={"tag" + (muted ? " tag-muted" : "")}>{children}</span>;
