# Règles du projet — à respecter par TOUS les modèles et agents

Ce fichier est la source de vérité partagée. Chaque session Claude (Opus, Sonnet, Haiku),
chaque agent de `.claude/agents/` et chaque membre de l'équipe le suit. Si une règle
change, on la change ICI, pas dans un prompt.

## Contexte

Site web réalisé en équipe (3 à 6 personnes) pendant la Nuit de l'Info 2026.
Le thème est révélé le jour J. Code en français (textes, commentaires, commits).

## Stack (ne pas en changer sans accord de l'équipe)

- React 19 + Vite + React Router (`react-router`, pas `react-router-dom`)
- JavaScript (pas de TypeScript), composants fonctionnels uniquement
- CSS simple avec variables : pas de Tailwind, pas de CSS-in-JS, pas de librairie UI
- Firebase : Firestore (+ Auth si besoin). Pas de Firebase Storage (payant)
- Hébergement Firebase Hosting, déployé par GitHub Actions

Ne pas ajouter de dépendance npm sans le signaler dans le résumé final.

## Zones du code et propriétaires

Chaque zone a un agent responsable. Un agent ne modifie pas la zone d'un autre :
il signale le besoin dans son résumé final.

| Zone                                                              | Agent      |
| ----------------------------------------------------------------- | ---------- |
| `src/styles/`, `public/`, `src/assets/`, `src/components/` (look) | `designer` |
| `src/pages/`, `src/App.jsx`, `src/components/` (logique)          | `frontend` |
| `src/lib/`, `src/hooks/`, `firestore.rules`, `firebase.json`      | `data`     |
| Lecture seule sur tout le projet                                  | `reviewer` |

## Contrats entre zones (les interfaces que tout le monde respecte)

1. **Couleurs, polices, espacements** : uniquement via les variables de
   `src/styles/theme.css`. Jamais de couleur ou de taille en dur dans un composant.
   Besoin d'une nouvelle variable → le `designer` l'ajoute.
2. **Accès à la base** : les pages n'importent jamais `firebase/firestore` directement.
   Elles passent par un hook de `src/hooks/` (ex. `useCollection`) ou une fonction de
   `src/lib/`. Besoin d'une nouvelle requête → le `data` l'ajoute.
3. **Nouvelle collection Firestore** = une règle dans `firestore.rules` dans le même
   changement. La base est fermée par défaut.
4. **Nouvelle page** = un fichier dans `src/pages/`, une `<Route>` dans `App.jsx`
   et un lien dans `src/components/Layout.jsx`.
5. **Schéma des données** : documenté ci-dessous, mis à jour par le `data`.

## Schéma Firestore

| Collection | Champs                                    | Accès                      |
| ---------- | ----------------------------------------- | -------------------------- |
| `messages` | `text` (string ≤ 280), `createdAt` (date) | lecture publique, création |

## Qualité (obligatoire avant de dire « terminé »)

- `npm run check` doit passer (lint + format + build).
- Accessibilité : HTML sémantique, `alt` sur les images, labels sur les champs,
  navigable au clavier, contrastes suffisants.
- Responsive : tester à 375 px de large.

## Git

- Une tâche = une branche `feat/…` ou `fix/…`, puis pull request vers `main`.
- Messages de commit courts, en français, à l'impératif.
- **Jamais de ligne `Co-Authored-By` ni d'attribution Claude dans les commits ou PR.**
- Ne jamais commiter `.env.local`. Ne jamais faire `git push --force` sur `main`.

## Commandes

`npm run dev` · `npm run check` · `npm run format` · `npm run deploy` (secours)
