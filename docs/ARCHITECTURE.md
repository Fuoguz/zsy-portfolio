# ZSY Portfolio V2 — Production Architecture

> Updated: 2026-09-03  
> Stage: G4B Production Migration complete  
> Branch: `portfolio-v2`

## 1. Architecture Goal

Production is now the real portfolio application. The Final Hybrid experiment remains a visual-regression reference, while all recruiter-facing routes consume allow-listed Public selector output.

The architecture separates:

- canonical facts and internal governance;
- public serialization and validation;
- reusable visual components;
- page composition and routing;
- archived experiments.

## 2. Production Structure

```text
src/
  app/
    App.jsx
    router.jsx               # route rendering, lazy loading, metadata, scroll
    route-config.js          # pure route contract
    navigation.js            # base-aware History API navigation

  components/
    navigation/
      AppLink.jsx
      Navigation.jsx         # desktop + accessible mobile menu
    project/
      EvidenceFigure.jsx
      NeutralProjectVisual.jsx
      ProjectClassification.jsx
      ProjectCollection.jsx
      ProjectIndexItem.jsx
      ProjectMeta.jsx
      ProjectVisual.jsx
      ResponsiveImage.jsx
    ui/
      Arrow.jsx
      Button.jsx
      Caption.jsx
      Label.jsx
      SectionHeader.jsx
      TextLink.jsx

  sections/
    Hero.jsx
    StartHere.jsx
    RoleLens.jsx
    QuickProof.jsx
    FeaturedWork.jsx
    Experience.jsx
    SupportingWork.jsx
    LabSection.jsx
    AboutContact.jsx
    SiteFooter.jsx

  pages/
    HomePage.jsx
    WorkPage.jsx
    ProjectPage.jsx
    RoleViewPage.jsx
    AboutPage.jsx
    NotFoundPage.jsx

  content/
    schema.js                # internal enum vocabulary
    selectors.js             # build-time public allow-list serialization
    generated-public-data.js # generated sanitized Production snapshot
    public.js                # only data facade allowed in Production UI
    validation.js            # relationship, readiness and safety invariants

  data/
    profile.js
    experience.js
    projects.js              # projects + claims + evidence
    role-lenses.js
    quick-proofs.js
    index.js

  styles/
    tokens.css               # locked G3 tokens
    portfolio.css            # Final Hybrid Production visual grammar
    globals.css
    typography.css
    motion.css

  utils/
    metadata.js
    paths.js

  experiments/
    a/ b/ c/ final/          # lazy-loaded visual references
```

## 3. Data Flow and Public Boundary

```text
G3.5 source-of-truth documents
          ↓ reviewed transcription
src/data/* canonical records
          ↓ validation
src/content/selectors.js
          ↓ allow-listed public shapes
src/content/public.js
          ↓
pages / sections / components
          ↓
rendered public UI
```

Production components under `src/pages`, `src/sections` and `src/components` are regression-tested to prevent imports from `data/projects.js` or `data/index.js`. `scripts/generate-public-content.js` runs the selectors before dev, test and build, then writes a sanitized snapshot. The browser bundle imports that snapshot rather than the raw governance records.

Public serialization removes:

- `internalNotes`;
- `restrictedFields`;
- `sourceNote`;
- visibility, redaction and content-readiness enum values;
- unsafe evidence records.

## 4. Content Safety

Defense in depth:

1. raw records carry visibility, readiness and disclosure policies;
2. selectors require public visibility, acceptable readiness and `publicSafe` disclosure;
3. evidence additionally requires `NOT_REQUIRED` or `REDACTED_APPROVED` redaction state;
4. Public selector output is serialized through field allow-lists into `generated-public-data.js`;
5. the Production bundle never imports raw project, claim, evidence, profile or experience records;
6. `EvidenceFigure` rejects anything without the selector-issued `publicSafe: true` marker;
7. validation rejects public evidence that is still raw or requires redaction;
7. route tests hide non-public and non-routable projects behind the same 404-safe state;
8. browser QA scans rendered HTML, visible text and image URLs for internal status labels;
9. public-asset validation prevents the non-final Resume from returning to `public/`.

The old Resume was moved locally to ignored `internal-assets/resume-non-final.pdf`. Production uses a mailto request until a privacy-safe public PDF is supplied.

## 5. Page and Component Boundaries

- `HomePage` composes Final Hybrid sections from `getHomePageContent()`.
- `WorkPage` consumes grouped public index output; it does not re-filter raw projects.
- `ProjectPage` is one shared Case Study shell with optional sections.
- `RoleViewPage` reorders shared public records without maintaining parallel project datasets.
- `AboutPage` consumes public profile and experience only.
- Project visuals use public evidence or a neutral, non-simulated treatment.

## 6. Routing and Performance

The custom History API router remains appropriate for the small route contract. Home is eagerly loaded; Work, Project, Role View, About, Not Found and every experiment are route-level lazy chunks.

Base-path handling remains centralized in `src/utils/paths.js`, supporting both `/zsy-portfolio/` and `/` builds. GitHub Pages clean-route refresh fallback remains a G7 deployment responsibility.

## 7. Experiment / Production Separation

- Production never imports `FinalHybridPrototype.jsx`.
- `/experiment/a|b|c|final` remains lazy and available for visual regression.
- Production copied the approved visual grammar into `src/styles/portfolio.css`; the experiment stylesheet remains unchanged.
- G3 Design Tokens remain the shared visual authority.
- Historical `src/App.jsx` remains as a migration record but is not imported by Production.

## 8. Testing and QA

- unit/contract tests cover selectors, routing, paths, redaction and public facades;
- browser QA covers desktop/mobile routes, interactions, metadata and screenshots;
- multi-size Homepage screenshots cover 1440, 1024, 768, 430, 390 and 375;
- Reduced Motion, keyboard menu behavior and horizontal overflow are explicitly checked;
- default, GitHub Pages and root-domain builds are separate commands.

## 9. Deferred Beyond G4B

- privacy-safe public Resume PDF;
- approved EagleHub / Team Formation redacted evidence;
- Onboarding public redaction package;
- Digest contribution confirmation;
- Globridge content package;
- final OG image;
- GitHub Pages clean-route fallback and deployment;
- image format conversion and performance measurement in G6.
