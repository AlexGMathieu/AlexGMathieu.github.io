---
slug: rag-probleme-de-donnees
titre: "Pourquoi un pipeline RAG, c'est d'abord un problème de données"
categories: [IA, Projets]
date: "2026 · à paraître"
lecture: 14 min
---

## 01 · Le malentendu · On parle d'IA, on devrait parler de plomberie.

Sur 4 mois de développement, 80% du temps a été consommé par le
parsing et la normalisation des données. 20% par les choix de
modèles, de stratégies de recherche, de prompts. C'est l'opposé
de la narrative dominante.

## 02 · Exemple · Un parser, c'est une décision produit.

Voici un extrait simplifié du parser de sorts du projet DnD :

```python
# parsers/spell.py
def parse_spell(raw: dict) -> Spell:
    # Décision : on garde les composantes M en français
    # même quand la source les met en anglais —
    # sinon les requêtes FR ne matchent plus.
    components = normalize_components(
        raw.get("components", {}),
        lang="fr",
    )
    return Spell(...)
```

Chaque ligne de parsing est un choix sémantique. Et chaque choix
fait ou défait une catégorie de requêtes utilisateur.
