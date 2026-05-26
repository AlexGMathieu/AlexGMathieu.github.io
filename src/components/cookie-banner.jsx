import React from 'react';

const STORAGE_KEY = 'ga_consent';

export const CookieBanner = () => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'granted') {
      // Choix précédent : activer GA4 silencieusement
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    } else if (!stored) {
      // Aucun choix enregistré : afficher le bandeau
      setVisible(true);
    }
    // stored === 'denied' → rien à faire, le défaut reste 'denied'
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
    setVisible(false);
  };

  const refuse = () => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Consentement cookies">
      <p className="cookie-text">
        Ce site utilise Google Analytics pour mesurer l'audience. Acceptez-vous ?
      </p>
      <div className="cookie-actions">
        <button className="btn btn-primary" onClick={accept}>
          Accepter
        </button>
        <button className="btn btn-secondary" onClick={refuse}>
          Refuser
        </button>
      </div>
    </div>
  );
};
