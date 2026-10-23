# Globridge public evidence

Captured 2026-09-10 from https://www.globridge.cn/ using headless Chrome / Playwright. Capture script: `scripts/capture-globridge.cjs`.

| Asset | Capture | What it proves |
| --- | --- | --- |
| home.jpg | 1440 × 900 desktop homepage | Public homepage was rendered |
| services.jpg | Same viewport, after clicking 探索我们的服务 | Public services anchor navigation and rendered section |
| mobile.jpg | 390 × 844 mobile homepage | Public mobile rendering |
| preview.webm | 1280 × 800, VP9, 24 fps, 7 seconds, no audio, 277693 bytes | Real homepage animation and services navigation |
| Live link | https://www.globridge.cn/ | Current public website; may change after capture |

Assets live in `public/assets/evidence/globridge/`. All are PUBLIC / NOT_REQUIRED / PUBLIC_ARTIFACT and pass the existing public selector. Frames were resized/encoded, not recreated or synthesized. No admin page was opened; no contact form was submitted. Public website business statements visible in the captures belong to the site and are not attributed to the developer.

Contribution source: Content Source of Truth section 6.5, also present in repository commit `62338e3`, plus the user's 2026-09-10 confirmation of the public role, website URL and SHIPPED classification. This Portfolio repository does not contain Globridge implementation history sufficient to identify individual backend changes, bugs, infrastructure choices or development dates. None are invented in the Case. Website captures do not independently establish authorship or backend behavior.

Delivery narrative uses the confirmed scope: take over existing code → understand → decompose → build → integrate APIs → debug → deploy and maintain. AI assistance is described at this supported level; no fictional prompts, code diffs, incidents, benchmarks or customer outcomes are used.

Playback: desktop in-view autoplay, muted, looping, pause/resume control. Mobile, reduced motion and Save-Data show the real screenshot without loading the video. Video request/codec failure also falls back to the screenshot. Local media URLs use the shared base-path helper. The live CTA opens the public website.

## Sandbox integration decision — user confirmation 2026-10-03

The user supplied a specific integration episode in this conversation. A working sandbox frontend and Tencent CloudBase cloud-function backend needed to join globridge.cn while server deployment, Nginx and build handover information remained incomplete. The user considered rebuilding against the original website architecture, migrating functions and data logic to the website server, or retaining CloudBase and integrating the sandbox as a separate module. They chose the third option to limit changes and avoid depending on an incompletely understood server environment or rebuilding working backend logic for technical uniformity.

Before integration, they checked /sandbox/ static asset paths, CloudBase Web security domains, cloud-function HTTP addresses and actual frontend/backend calls. They confirmed page access and core calls before continuing integration and iteration. The public narrative labels this as a personal project account. Existing September website captures do not independently prove this sandbox integration; no endpoint, environment identifier, code diff, log, benchmark or deployment date is invented.
