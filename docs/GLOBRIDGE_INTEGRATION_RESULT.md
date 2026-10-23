# Globridge integration — 2026-09-10

Completed in the current Production Portfolio code on `portfolio-v2`. Remote deployment completed on 2026-09-11 after user authorization; no source-branch commit was performed. Existing System Room, package and other unrelated working-tree changes were preserved.

- Globridge is PUBLIC / READY / SHIPPED, with the user-confirmed full-stack role. Existing public sanitization remains the only route into the UI.
- Homepage fourth featured entry, Work index, Role Lens, Capability mapping and `/ai-native` reuse the same project record. The AI Native View link appears when selecting AI 原生 on the homepage.
- `/work/globridge` includes context, constraints, contribution boundary, seven delivery steps, AI-versus-human judgment, outcomes and evidence. Commercial metrics and unverified engineering details are not claimed.
- Three real website screenshots and a silent 7-second WebM were captured. Hero uses actual website footage; mobile/reduced-motion/Save-Data use a real poster. Desktop has pause/resume and viewport-aware playback; a manual pause persists. Media failure falls back to the image.
- Globridge-specific dark violet browser framing and real website imagery replace the generic system diagram in this Case Hero. Existing Portfolio layouts remain in place.
- Public website CTA, media base-path handling, sitemap and generated route documents are included.

Validation:

- `npm run build`: PASS (GitHub Pages base); final production output includes 14 route documents.
- `npm run build:root`: PASS; root portability build checked during integration.
- `npm run lint`: PASS.
- `npm test`: 42 / 42 PASS, including Globridge promotion, provenance, contribution boundary and role mapping.
- Content validation: PASS, 10 raw projects / 10 claims / 21 evidence records; public asset privacy validation PASS.
- `node scripts/qa-globridge.cjs`: 21 checks PASS across 1440px, 1024px, 390px, reduced motion, routes and video failure fallback. No page errors in the route matrix.
- Visual inspection: desktop and mobile Case, Work entry and homepage entry. Fixed CTA contrast and compact preview cropping. Final CTA white on #352855; compact media fits its 126px inner viewport without horizontal overflow.
- `git diff --check`: PASS.
- Media probe: VP9, 1280 × 800, exactly 7 seconds, no audio stream, approximately 278 KB.

Evidence sources and authorship limitations: `docs/evidence/globridge.md`. Screenshots and browser results: `artifacts/globridge/` (gitignored).

Existing build warning: the System Room renderer chunk exceeds 500 KB. This integration did not alter that renderer. Browser QA uses Chrome emulation; physical-device testing was not performed. Public website capture proves visible rendering and navigation, not private backend behavior.

## Remote deployment — 2026-09-11

`npm run deploy -- --nojekyll` returned Published. Remote gh-pages commit: `3f1805cd1b15e67fc4ce53166d3ec170800f7a30`. Build, content and public asset validation passed. After Pages propagation, all 21 browser checks passed against https://fuoguz.github.io/zsy-portfolio. Case, AI Native route and WebM return HTTP 200; WebM is served as video/webm. Source working tree remains preserved and uncommitted.
