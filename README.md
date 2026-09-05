# Zhang Shaoyi — Portfolio V2

A recruiter-facing portfolio for product operations, project operations, AI applications and business digitalization. The site prioritizes real work, contribution boundaries and public-safe evidence over decorative interaction.

## Live site

[fuoguz.github.io/zsy-portfolio](https://fuoguz.github.io/zsy-portfolio/)

The Release Candidate is developed on `portfolio-v2`. Production deployment remains on GitHub Pages until the final release review.

## What is included

- Recruiter-oriented homepage with Role Lens, Quick Proof and selected work
- Shared data-driven Work index and Case Study shell
- EagleHub, Onboarding Automation, Team Formation and AI Content Growth cases
- Public-safe Evidence Viewer with provenance captions
- Capability → Project → Evidence mapping
- Privacy-safe public resume
- GitHub Pages and root-domain build targets

## Tech stack

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- GitHub Pages

## Architecture

Production UI lives under `src/pages`, `src/sections` and `src/components`. Raw content is maintained in `src/data` and filtered through the validation/selectors layer. Before development and builds, `scripts/generate-public-content.js` creates a sanitized public snapshot; Production components never consume raw project arrays.

Historical visual prototypes remain under `src/experiments` as regression references and are not imported into the Production homepage.

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm test
npm run lint
npm run validate:content
npm run validate:public-assets
npm run build
```

Deployment builds:

```bash
npm run build:github
npm run build:root
```

`build:github` uses `/zsy-portfolio/`; `build:root` targets a future custom-domain root. Both emit public route entry documents with page-specific share metadata, plus a `404.html` SPA fallback for unknown paths. Publish the built `dist` directory to the existing `gh-pages` branch using `npm run deploy -- --nojekyll`; never include local artifacts or unrelated workspace files.

## Design philosophy

The visual system combines editorial typography, product-oriented navigation and evidence-led case storytelling. Reconstructed diagrams, real screenshots and anonymous demo data are explicitly distinguished. Internal notes, credentials, employee data and unredacted assets are blocked from public output.

## Evidence and privacy

See [Evidence Strategy](docs/EVIDENCE_STRATEGY.md), [Redaction Guide](docs/REDACTION_GUIDE.md) and [Missing Inputs](MISSING_INPUTS.md).
