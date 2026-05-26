# Portfolio Alexandre MATHIEU — Instructions Claude Code

## Contexte projet
Site portfolio statique one-page scrollable.
Déployé sur GitHub Pages via build React.
Stack : React + Vite + CSS.

## Source de vérité design
Les fichiers dans `src/components/` sont les composants React générés par Claude Design.
`_reference/Portfolio.html` est la page HTML de référence visuelle — snapshot initial, ne pas modifier.
Les fichiers vivants sont dans `src/components/` — c'est là qu'on fait évoluer le design.
Le contenu rédactionnel dans les composants JSX est la version à jour — source de vérité pour le texte.

## Phase 1 — Scope
Implémenter toutes les sections SAUF le digital twin.
`src/components/digital-twin.jsx` existe mais est hors scope Phase 1 — ne pas intégrer.
`src/components/tweaks-panel.jsx` est un panneau de debug Claude Design — ne pas intégrer.

## Structure cible
index.html
src/
main.jsx          ← point d'entrée React
App.jsx           ← composant racine
styles.css        ← styles globaux
components/
home-top.jsx
home-bottom.jsx
components.jsx
detail-pages.jsx
digital-twin.jsx    ← hors scope Phase 1
tweaks-panel.jsx    ← hors scope Phase 1
public/
assets/
_reference/
Portfolio.html    ← jamais modifier

## Déploiement
GitHub Pages depuis le dossier `dist/` via GitHub Actions.
Commande de build : `npm run build`.

## Conventions
- Pas de réécriture du contenu textuel — utiliser exactement le texte des composants JSX
- Nommage fichiers : kebab-case
- Pas de librairies UI externes (pas de MUI, pas de Chakra)

## Ce qu'on ne veut pas
- Pas de réécriture du design — reproduire fidèlement les composants Claude Design
- Pas de digital twin en Phase 1
- Pas de tweaks-panel en Phase 1
- Pas de backend