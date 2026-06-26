# 🌍 FlagReact — React World

Petite application **React** en deux volets :

- **Accueil** — une galerie des drapeaux du monde, filtrable par région et limitable
  via un curseur, triée par ordre alphabétique (capitale et population au survol).
- **News** — un mini-blog (ajout / édition / suppression d'articles) adossé à une
  API REST locale ([json-server](https://github.com/typicode/json-server)).
- **À propos** — une page de présentation statique.

> Projet historique entièrement modernisé : migration de Create React App vers
> **Vite**, passage à **React 19** et **React Router 7**, remplacement d'`axios`
> par `fetch`, et abandon de l'API REST Countries (dépréciée) au profit d'un jeu
> de données embarqué.

---

## 🧰 Stack technique

| Domaine        | Technologie                          |
| -------------- | ------------------------------------ |
| Build / dev    | [Vite](https://vite.dev/) 6          |
| UI             | [React](https://react.dev/) 19       |
| Routing        | React Router 7                       |
| Notifications  | react-toastify 11                    |
| Styles         | Sass (modules `@use`)                |
| API News (dev) | json-server                          |
| Qualité        | ESLint 9 (flat config) + Prettier    |

---

## 🚀 Démarrage

### Prérequis

- **Node.js ≥ 20** (voir `.nvmrc`)

### Installation

```bash
npm install
```

### Développement

Une seule commande lance **le front (Vite, port 3000)** et **l'API News
(json-server, port 3003)** simultanément :

```bash
npm run dev
```

➡️ Application : <http://localhost:3000>
➡️ API News : <http://localhost:3003/articles>

En développement, les appels `/api/*` du front sont automatiquement proxifiés
vers json-server (voir `vite.config.js`).

---

## 📜 Scripts npm

| Script             | Description                                          |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Lance Vite **et** json-server en parallèle           |
| `npm run vite`     | Lance uniquement le serveur de développement Vite    |
| `npm run server`   | Lance uniquement l'API json-server                   |
| `npm run build`    | Build de production dans `dist/`                      |
| `npm run preview`  | Sert le build de production en local                  |
| `npm run lint`     | Analyse le code avec ESLint                           |
| `npm run format`   | Formate le code avec Prettier                         |

---

## 📁 Structure

```
flagreact/
├── index.html              # Point d'entrée Vite
├── vite.config.js          # Config Vite + proxy /api -> json-server
├── eslint.config.js        # Config ESLint (flat)
├── public/img/             # Images statiques (logo, favicon, bannière)
└── src/
    ├── main.jsx            # Bootstrap React (createRoot)
    ├── App.jsx             # Routes de l'application
    ├── pages/              # Home, About, NotFound
    ├── components/         # Navigation, Logo, Countries, Card, News, Posts…
    ├── services/           # Accès données (countriesAPI, postsApi)
    ├── assets/             # countries.json (dataset pays) + db.json (News)
    └── styles/             # Feuilles Sass (@use)
```

---

## 🗺️ Données pays

Les API REST Countries publiques ont été successivement dépréciées (v2, v3.1) et
la v5 exige désormais une clé d'API. L'application embarque donc un jeu de données
statique (`src/assets/countries.json`) construit à partir de :

- [mledoze/countries](https://github.com/mledoze/countries) — noms, capitales, régions ;
- [Banque Mondiale](https://data.worldbank.org/indicator/SP.POP.TOTL) — populations ;
- [flagcdn.com](https://flagcdn.com/) — images des drapeaux.

Résultat : aucune dépendance réseau à l'exécution, un chargement instantané et
une fiabilité totale dans le temps.

---

## 🏗️ Build de production

```bash
npm run build      # génère dist/
npm run preview    # prévisualise le build
```

> ⚠️ En production, la page News nécessite que les requêtes `/api/*` soient
> routées vers une instance json-server (ou une API équivalente).
