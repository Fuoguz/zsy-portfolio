# ZSY Portfolio V2 — Routing and Base Path Strategy

> Stage: G4A Foundation  
> Router: lightweight pathname resolver + History API

## 1. Route Contract

| Route | Current G4A behavior | G4B/G7 target |
| --- | --- | --- |
| `/` | Minimal Production architecture smoke page | Final Hybrid Homepage |
| `/work` | Public-ready Work index foundation | Full Work index |
| `/work/:slug` | Minimal selector-driven project page | Case Study template |
| `/product` | Shared-data Product lens view | Refined role view |
| `/growth` | Shared-data Growth lens view | Refined role view |
| `/creative` | Public-ready Lab view | Full Lab |
| `/about` | Profile and public experience foundation | About / Contact |
| `/experiment/a` | Preserved Prototype A | Remove or hide after migration approval |
| `/experiment/b` | Preserved Prototype B | Remove or hide after migration approval |
| `/experiment/c` | Preserved Prototype C | Remove or hide after migration approval |
| `/experiment/final` | Final Hybrid visual reference | Preserve through G4B approval |
| unknown | 404 foundation | Production 404 |

Unknown `/work/:slug` routes resolve to 404 before a page can read raw project data.

## 2. Technical Choice

G4A uses a small custom router because the required contract is static and modest, and current GitHub Pages hosting does not yet provide clean-route fallback. This avoids introducing a dependency before the deployment strategy is chosen.

The router provides:

- centralized route definitions and pure resolver
- stable slug parameters
- History API navigation
- `popstate` handling
- scroll-to-top restoration
- route title and description updates
- lazy experiment chunks
- explicit 404 and unknown-project handling

React Router can still be adopted later if nested layouts, loaders or more complex route transitions justify it. Route contracts and path helpers are designed so that change would not require rewriting project data.

## 3. Base Path Authority

`src/utils/paths.js` is the only component-facing path authority:

- `BASE_PATH`
- `withBasePath`
- `stripBasePath`
- `assetPath`
- `resumePath`
- `projectPath`

Components must not contain `/zsy-portfolio/`.

## 4. Supported Builds

```bash
npm run build:github   # base /zsy-portfolio/
npm run build:root     # base /
```

The default `npm run build` retains the current GitHub Pages base from `vite.config.js` and runs content validation first.

## 5. GitHub Pages Compatibility

Assets and in-app navigation work under `/zsy-portfolio/`. However, GitHub Pages does not automatically rewrite a direct request such as `/zsy-portfolio/work/eaglehub` to `index.html`.

G4A does not modify deployment. Before clean routes become Production, G7 must choose one of:

1. a reviewed `404.html` SPA fallback for GitHub Pages;
2. hash routing while GitHub Pages remains primary;
3. Azure Static Web Apps or another host with an explicit rewrite to `/index.html`.

The recommended future state is clean browser routes on a host with configured fallback, with GitHub Pages retaining an explicit fallback strategy.

## 6. Root Domain Migration

For a custom root domain, build with `base=/`. Because components consume path helpers, the change does not touch project cards, media, Resume links or navigation.

Azure / static hosting must include a rewrite similar in meaning to:

```text
/* → /index.html
```

The exact platform configuration belongs to G7.

## 7. Metadata

`src/utils/metadata.js` applies route title and description. G4B should extend it with project-specific canonical and social metadata after the final hosting origin is known.

## 8. Route Testing

Pure tests cover:

- `/` under GitHub and root base
- known project slug
- unknown project slug
- unknown route
- Final Hybrid experiment route

Browser smoke must additionally cover internal link navigation and direct dev-server loads for `/`, known project, unknown project and 404.

