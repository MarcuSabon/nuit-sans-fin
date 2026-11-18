# Nuit de l'Info — base du projet

Stack 100 % gratuite :

| Rôle            | Outil                                 | Offre gratuite                           |
| --------------- | ------------------------------------- | ---------------------------------------- |
| Front           | React 19 + Vite + React Router        | —                                        |
| Base de données | Firebase Firestore (+ Auth si besoin) | Plan Spark, sans carte bancaire          |
| Hébergement     | Firebase Hosting                      | 10 Go stockage, 360 Mo/jour de transfert |
| CI / CD         | GitHub Actions                        | Gratuit pour les dépôts publics          |
| Qualité         | oxlint + Prettier                     | —                                        |

> ⚠️ Firebase **Storage** (upload d'images) n'est plus disponible sur le plan gratuit.
> Les images de la charte vont dans `public/` ou `src/assets/`.

## Démarrer (chaque membre de l'équipe)

```bash
git clone <url-du-depot> && cd <dossier>
npm install
cp .env.example .env.local   # puis coller la config Firebase (demander à l'équipe)
npm run dev                  # http://localhost:5173
```

## Scripts

| Commande               | Effet                                         |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Serveur de dev avec rechargement à chaud      |
| `npm run build`        | Build de production dans `dist/`              |
| `npm run check`        | Lint + format + build (à lancer avant une PR) |
| `npm run format`       | Formate tout le code                          |
| `npm run deploy`       | Déploiement manuel sur Firebase Hosting       |
| `npm run deploy:rules` | Publie les règles de sécurité Firestore       |

## Organisation du code

```
src/
  styles/theme.css     ← CHARTE GRAPHIQUE (couleurs, polices, espacements) : seul fichier à toucher
  styles/base.css      ← styles communs (boutons, champs, mise en page)
  lib/firebase.js      ← connexion Firebase, importer { db, auth } depuis ici
  hooks/               ← hooks réutilisables (useCollection = lecture Firestore temps réel)
  components/          ← composants partagés (Layout = header + footer)
  pages/               ← une page = un fichier, déclarée dans App.jsx
  assets/              ← images importées dans le code
public/                ← fichiers servis tels quels (favicon, images, polices)
firestore.rules        ← règles de sécurité de la base (fermée par défaut)
```

## Workflow d'équipe (3 à 6 personnes)

1. Une tâche = une branche : `git switch -c feat/nom-de-la-tache`
2. Commits petits et fréquents, push régulier.
3. Ouvrir une **pull request** vers `main` → la CI vérifie le code et Firebase poste
   une **URL d'aperçu** du site dans la PR.
4. Une autre personne relit → merge → le site en ligne est mis à jour automatiquement.

Ne jamais pousser `.env.local` (il est ignoré par Git).

## Mise en place unique (à faire avant le jour J)

### 1. Projet Firebase

1. <https://console.firebase.google.com> → **Ajouter un projet** (Analytics inutile).
2. **Build > Firestore Database** → Créer → mode production, région `eur3` (Europe).
3. **Paramètres du projet > Vos applications** → icône `</>` (Web) → copier la config
   dans `.env.local`.
4. Mettre l'ID du projet dans `.firebaserc`.
5. `npx firebase login` puis `npm run deploy:rules` et `npm run deploy`.

### 2. Déploiement automatique depuis GitHub

À lancer **une seule fois, dans un terminal sur ton PC**, depuis le dossier du projet :

```bash
npx firebase init hosting:github
```

Cette commande ouvre le navigateur pour autoriser Firebase sur GitHub, puis ajoute
automatiquement le secret `FIREBASE_SERVICE_ACCOUNT_NUIT_SANS_FIN` au dépôt (déjà utilisé
par `deploy.yml`). Elle génère aussi deux fichiers `.github/workflows/firebase-hosting-*.yml` :
**les supprimer**, `deploy.yml` fait déjà le travail.

Ajouter ensuite dans **GitHub > Settings > Secrets and variables > Actions** les six
variables de `.env.example` (`VITE_FIREBASE_API_KEY`, …) avec les mêmes valeurs que `.env.local`.

> La config Web Firebase n'est pas un vrai secret (elle finit dans le JS du site) :
> la sécurité repose sur `firestore.rules`. Ajouter une règle pour chaque nouvelle collection.

## Check-list du jour J

- [ ] Lire le sujet et les défis choisis
- [ ] Remplir `theme.css` avec la charte graphique
- [ ] Renommer le site (titre dans `index.html` et `Layout.jsx`, favicon)
- [ ] Supprimer ou transformer la page Démo
- [ ] Une règle Firestore par collection
- [ ] Tester sur mobile et au clavier (accessibilité)
