---
slug: dnd-ai-companion
titre: DnD AI Companion
numero: "01"
statut: En cours — Phase 1
domaine: RAG · D&D 5e
cover: "/assets/images/projets/dnd-ai-companion/cover.webp"
lede: >
  Moteur de recherche sémantique pour Maîtres du Jeu D&D 5e. Retrouvez
  n'importe quelle règle, monstre ou sort en langage naturel — en français
  ou en anglais — sans connaître le nom exact de l'entité.
tags: [RAG, Python, ChromaDB, NLP, Streamlit, OpenAI]

meta:
  role: Conception · Dev solo
  periode: Q1 — Q2 2026
  stack: Python · ChromaDB · Streamlit
  code_url: https://github.com/AlexGMathieu/dnd-ai-companion
  code_label: github.com/AlexGMathieu →

callout_hypothese:
  label: "// hypothèse"
  corps: >
    La recherche sémantique multilingue devrait permettre de retrouver
    l'entité juste à partir d'une description en langage naturel, sans
    connaître le terme exact ni la langue d'origine.

architecture:
  - num: "01"
    nom: Données sources
    detail: "5etools JSON · ~12k entrées"
  - num: "02"
    nom: Parsers
    detail: 14 parsers spécialisés par type d'entité
  - num: "03"
    nom: Normalisation
    detail: FR ↔ EN, schéma unifié
  - num: "04"
    nom: Embeddings
    detail: text-embedding-3-small · OpenAI
  - num: "05"
    nom: Vector store
    detail: ChromaDB · 11 collections
  - num: "06"
    nom: Recherche
    detail: similarité cosinus + reranking
  - num: "07"
    nom: UI
    detail: Streamlit · filtres · preview

resultats:
  lignes:
    - cat: Sorts
      mrr: "0.71"
      ndcg: "0.78"
      coverage: "88%"
      q: 42
    - cat: Monstres
      mrr: "0.66"
      ndcg: "0.74"
      coverage: "84%"
      q: 38
    - cat: Règles
      mrr: "0.58"
      ndcg: "0.65"
      coverage: "76%"
      q: 30
    - cat: "Objets / équip."
      mrr: "0.55"
      ndcg: "0.62"
      coverage: "72%"
      q: 24
    - cat: Conditions
      mrr: "0.62"
      ndcg: "0.69"
      coverage: "80%"
      q: 16
  global:
    mrr: "0.627"
    ndcg: "0.71"
    coverage: "81%"
    q: 150
  note: >
    La perte de performance sur "Règles" et "Objets" reflète une réalité
    de la donnée source : les descriptions de règles sont plus longues et
    moins canoniques, ce qui dilue le signal sémantique.

lecons:
  - num: "01"
    titre: Le RAG n'est pas un problème d'IA, c'est un problème de données.
    corps: >
      80% du temps a été consommé par le parsing et la normalisation
      FR/EN — pas par le choix d'embeddings ou de stratégie de recherche.
      Les modèles sont bons. Les données rarement.
  - num: "02"
    titre: Évaluer vite, évaluer souvent.
    corps: >
      Construire les 150 questions d'éval AVANT d'optimiser le pipeline
      a évité trois fausses pistes (reranking inutile, chunking trop fin,
      prompt engineering prématuré). On ne sait pas si on s'améliore
      tant qu'on ne mesure pas.
  - num: "03"
    titre: L'utilité prime sur l'élégance.
    corps: >
      Une interface Streamlit moche mais qui répond en 800ms vaut mieux
      qu'une UI soignée qui met 4s. Sur du gameplay temps réel,
      la latence est une feature.

phase2:
  items:
    - priorite: P2
      texte: Agent conversationnel multi-tour (LangGraph)
    - priorite: P2
      texte: Génération de rencontres à difficulté calibrée (CR)
    - priorite: P2
      texte: "Mémoire de campagne — PNJs, lieux, événements joueurs"
    - priorite: P3
      texte: Mode \"co-MJ\" temps réel pendant la session
  cta_url: https://github.com/AlexGMathieu/dnd-ai-companion
---

## 01 · Contexte · Diriger une partie de D&D, c'est jongler en temps réel.

Diriger une partie de D&D nécessite de consulter en temps réel des
dizaines de sources : règles officielles, bestiaires, sorts,
conditions, équipement, suppléments, notes de campagne. Chaque
vérification coupe la dynamique de jeu et casse l'immersion des
joueurs autour de la table.

Un MJ expérimenté finit avec entre 5 et 10 ressources ouvertes en
parallèle. Chercher la bonne information au bon moment devient un
métier en soi.

## 02 · Problème · Trois minutes pour retrouver un sort, c'est trois minutes de trop.

Chercher "le sort que peut lancer ce sorcier au niveau 3" dans
5 onglets de navigateur ouverts, c'est 3 minutes perdues à chaque
fois. Multiplié par 8 ou 10 vérifications par session, ça représente
près d'une demi-heure de jeu perdue.

Les outils existants imposent de connaître le nom exact en anglais. Si
un joueur demande "le truc qui paralyse les morts-vivants", il faut
déjà avoir fait la traduction mentale vers *Turn Undead* avant
même de pouvoir chercher.

<!-- callout_hypothese -->

## 03 · Solution · Recherche sémantique en langage naturel, FR ou EN.

Un moteur de recherche qui comprend le sens de la requête plutôt que
de matcher des mots-clés. Vous tapez ce que vous voulez trouver, le
système vous renvoie les entités les plus proches sémantiquement, avec
leur source et leur contexte.

Interface Streamlit volontairement minimale : champ de recherche,
filtres par catégorie (sorts, monstres, objets…), résultats avec
extrait et bouton "voir plus". L'objectif est zéro friction entre la
question du MJ et la réponse.

## 04 · Architecture · Pipeline RAG, 14 parsers, 11 collections.

Sept étapes, du JSON brut à la requête utilisateur.

<!-- architecture -->

Le choix de séparer en 11 collections (une par grande catégorie
d'entité) au lieu d'un index unique vient d'un constat : les MJs
cherchent presque toujours dans une catégorie connue. Un filtre
structurel en amont divise le bruit par 10.

## 05 · Résultats · 0.627 MRR, 81% de coverage sur 150 questions.

Évaluation manuelle sur 150 questions réelles, formulées telles qu'un
MJ les poserait pendant une partie. Chaque question a une vérité
terrain (l'entité attendue), comparée au top-5 retourné par le
système.

<!-- resultats -->

## 06 · Leçons · Ce que ce projet m'a appris.

<!-- lecons -->

## 07 · Phase 2 · Limitations connues et prochaines étapes.

Les limitations actuelles sont assumées. Phase 1 cible la preuve de
valeur sur la recherche pure ; Phase 2 ouvrira sur des cas d'usage
conversationnels.

<!-- phase2 -->
