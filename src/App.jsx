import React from 'react';
import { Nav, Footer } from './components/components';
import { Hero, About, Projects } from './components/home-top';
import { CV, Blog, Contact } from './components/home-bottom';
import { ProjectDetailInner, BlogDetail } from './components/detail-pages';
import { CookieBanner } from './components/cookie-banner';

// ─── URL helpers ────────────────────────────────────────────────────────────

function routeToUrl(route) {
  if (route.name === 'project') return `/project/${route.id}`;
  if (route.name === 'blog')    return `/blog/${route.slug}`;
  return '/';
}

// Parse the current URL into a route object (used on initial load / refresh).
function routeFromUrl() {
  const { pathname } = window.location;
  const project = pathname.match(/^\/project\/(.+)/);
  if (project) return { name: 'project', id: project[1] };
  const blog = pathname.match(/^\/blog\/(.+)/);
  if (blog) return { name: 'blog', slug: blog[1] };
  return { name: 'home' };
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  // Initialise from history state (back/forward cache) or from the current URL.
  const [route, setRoute] = React.useState(() => {
    const st = window.history.state;
    return st?.name ? st : routeFromUrl();
  });

  // On mount: stamp the initial history entry with a state object so that
  // pressing Back from the very first page still has something to pop to.
  React.useEffect(() => {
    if (!window.history.state?.name) {
      window.history.replaceState(route, '', routeToUrl(route));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally runs once

  // Keep React state in sync with browser back / forward buttons.
  React.useEffect(() => {
    const onPop = (e) => {
      setRoute(e.state || { name: 'home' });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Navigate: update both the browser history stack AND React state.
  const navigate = React.useCallback((next) => {
    window.history.pushState(next, '', routeToUrl(next));
    setRoute(next);
  }, []);

  // Scroll to anchor after returning to home (e.g. "← Retour aux projets").
  React.useEffect(() => {
    if (route.name === 'home' && route.scrollTo) {
      const id = route.scrollTo;
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
      });
    }
  }, [route]);

  const { name } = route;

  return (
    <>
      <Nav onNavigate={navigate} route={name} />

      {name === 'home' && (
        <main>
          <Hero />
          <hr className="section-divider" />
          <About />
          <hr className="section-divider" />
          <Projects onOpenProject={(id) => navigate({ name: 'project', id })} />
          <hr className="section-divider" />
          <CV onOpenProject={(id) => navigate({ name: 'project', id })} />
          <hr className="section-divider" />
          <Blog onOpenPost={(slug) => navigate({ name: 'blog', slug })} />
          <hr className="section-divider" />
          <Contact />
        </main>
      )}

      {name === 'project' && (
        <ProjectDetailInner id={route.id} onNavigate={navigate} />
      )}

      {name === 'blog' && (
        <BlogDetail slug={route.slug} onNavigate={navigate} />
      )}

      {name === 'home' && <Footer onNavigate={navigate} />}

      <CookieBanner />
    </>
  );
}
