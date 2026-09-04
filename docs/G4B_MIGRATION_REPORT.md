# ZSY Portfolio V2 — G4B Migration Report

> Date: 2026-09-03  
> Branch: `portfolio-v2`  
> Status: Production Migration complete; not deployed

## 1. Outcome

The approved Final Hybrid has been migrated from a prototype into the Production application. G4B was completed through two sequential checkpoints: Homepage first, then Work, Case Study, Role Views and About.

No new visual direction or Design System was introduced.

## 2. Prototype → Production Mapping

| Final Hybrid reference | Production implementation |
| --- | --- |
| Navigation | `components/navigation/Navigation.jsx` |
| Hero | `sections/Hero.jsx` |
| Start Here | `sections/StartHere.jsx` |
| Role Lens | `sections/RoleLens.jsx` |
| Quick Proof | `sections/QuickProof.jsx` |
| Featured opening | `sections/FeaturedWork.jsx` |
| Supporting project rhythm | `sections/SupportingWork.jsx` |
| Lab hierarchy | `sections/LabSection.jsx` |
| Footer language | `sections/SiteFooter.jsx` |
| Prototype CSS grammar | `styles/portfolio.css` |

Production additions that were not fully present in the prototype:

- Experience;
- About / Contact;
- Work Index;
- reusable Case Study shell;
- Role View routes;
- safe 404 and hidden-project behavior.

## 3. Production Routes

| Route | Status |
| --- | --- |
| `/` | Production Homepage |
| `/work` | Grouped Work Index |
| `/work/:slug` | Shared public Case Study shell |
| `/product` | AI Product / Product Ops view |
| `/growth` | Growth / Content Operations view |
| `/creative` | Public Lab view |
| `/about` | About, experience and contact |
| unknown / hidden project | safe 404 |
| `/experiment/a|b|c|final` | preserved visual references |

## 4. Public Selector Usage

Production UI imports `src/content/public.js`, never raw project arrays. The public facade provides:

- Homepage content;
- grouped Work Index;
- routable public projects;
- related projects;
- route-level role views;
- public profile and experience.

A regression test scans every Production page, section and component for forbidden raw project imports.

## 5. Public and Hidden Projects

Public Case Study routes:

- EagleHub;
- AI Content Growth Workflow;
- 自由组队平台;
- Memory Museum;
- Video / Motion;
- Game Ads Script Demo, explicitly labelled `SIMULATION`.

Public index evidence without a Case Study route:

- 雏鹰专项集训.

Hidden from Production routes:

- TEX AI Onboarding Automation — requires public redaction;
- Globridge — needs content;
- Digest — needs team/contribution confirmation.

Direct access to hidden slugs returns the same safe unavailable state without revealing project details.

## 6. Visual Regression

Homepage Production retains the Final Hybrid relationships for typography, grid, spacing, cobalt/vermilion accents, restrained borders, Start Here, Role Lens, Quick Proof and Featured Project narrative.

Material difference:

- Prototype Start Here showed three projects;
- Production shows two because Onboarding is not public-ready.

This is an intentional content-safety difference, not visual drift.

Screenshots are stored in:

- `artifacts/design/g4b/home/`
- `artifacts/design/g4b/routes/`

## 7. Responsive and Accessibility

Homepage checked at 1440×900, 1024, 768, 430, 390×844 and 375, plus a 390 full-page capture.

Verified:

- no horizontal overflow;
- mobile hierarchy remains naturally scrollable;
- menu uses `aria-expanded` and `aria-controls`;
- opening the menu moves focus inside;
- Escape closes and returns focus to the trigger;
- focus cycles inside the open mobile menu;
- Start Here supports hover, keyboard focus and touch;
- focus-visible styles and 44px minimum targets remain token-driven;
- Reduced Motion exposes all content and sets motion tokens to zero.

## 8. Content and Asset Safety

Public outputs, HTML, visible page text and image URLs were checked for internal status names and restricted terminology. No leaks were found.

The non-final Resume contained a birth date and phone number. It was moved unchanged from `public/resume.pdf` to ignored local storage at `internal-assets/resume-non-final.pdf`; Production Resume actions now request the document by email. A build-time public-asset validator prevents the old filename from being published again.

## 9. Performance Foundation

- Home is eager; all secondary Production pages are route-level lazy chunks.
- Experiments remain lazy chunks.
- non-critical screenshots use `loading="lazy"` and `decoding="async"`;
- public screenshots now provide width and height attributes;
- Production entry JS: 212.24 kB / 66.50 kB gzip.
- Public content chunk: 25.76 kB / 8.54 kB gzip.
- Shared Project Page chunk: 3.82 kB / 1.38 kB gzip.
- Production CSS: 73.94 kB / 13.16 kB gzip.
- Historical experiments remain independent lazy chunks and do not block the Production entry render.

No large image conversion was performed in G4B. Format conversion and measured Lighthouse work remain G6.

## 10. Known Issues and Deferred Items

- GitHub Pages needs a clean-route fallback before deployment.
- A privacy-safe public Resume is missing.
- EagleHub and Team Formation still lack approved redacted visual evidence.
- Onboarding cannot be public until its flow and assets pass redaction.
- Some Case Studies are structurally complete but content-light because the Source of Truth lacks fuller process/reflection material.
- final OG image and social card production remain deferred.
- the current CSS includes the complete approved visual grammar; later cleanup should preserve screenshot parity.

## 11. G5 Recommendation

G5 should add only the approved high-value interactions and real visual assets:

1. refine the Interactive Project Browser using current public-safe media;
2. build the Capability Evidence mapping from shared selectors;
3. consider Command Palette as progressive enhancement;
4. prepare approved redacted evidence and image treatments;
5. avoid Three.js and fabricated project visuals.
