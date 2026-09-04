# ZSY Portfolio V2 — Design System

> Status: **FINAL VISUAL DIRECTION LOCKED**  
> Gate: G3  
> Updated: 2026-09-02  
> Implementation source: [`src/styles/tokens.css`](../src/styles/tokens.css)  
> Reference route: `/experiment/final`

## 1. Purpose and boundaries

This system turns the accepted Final Hybrid Homepage into a reusable visual language for the future portfolio. It does not reopen visual direction exploration.

The locked direction is:

```text
PROOF CIRCUIT information architecture and product browsing logic
+ PROOFROOM editorial typography, whitespace, captions and evidence discipline
+ CUT TO OUTCOME display impact and Problem → Decision → Outcome narration
```

The resulting qualities are:

- Typography-led
- Information-driven
- Evidence-aware
- Editorial precision
- Product-oriented
- Real project first
- Restrained interaction

G3 establishes shared tokens and visual grammar. G3 does not rebuild routing, migrate all case studies, refactor the project data model, redesign the Hero, or create another direction.

## 2. Design principles

1. **Evidence before decoration.** Real screenshots, outputs and captions carry the visual argument.
2. **Hierarchy before motion.** A static page must remain clear before interaction is added.
3. **Alignment first, whitespace second, divider third, full border last.** Grid discipline must not become a dashboard frame.
4. **Shared grammar, variable composition.** Projects share classification, role, problem and evidence language without copying one rigid template.
5. **Facts are invariant.** Role Lens may change emphasis and recommendation order, never project facts.
6. **Mobile scroll is intentional.** The first 844px does not need to contain every homepage module.

## 3. Color system

### 3.1 Primitive palette

| Token | Value | Responsibility |
| --- | --- | --- |
| `--palette-paper-0` | `#fffdf7` | Evidence and elevated editorial surface |
| `--palette-paper-100` | `#f2efe7` | Primary warm paper background |
| `--palette-paper-200` | `#e8e4d9` | Muted surface / Start Here field |
| `--palette-paper-300` | `#d8d3c7` | Optional quiet structural tone |
| `--palette-navy-900` | `#172137` | Primary ink and strong border |
| `--palette-navy-700` | `#465064` | Secondary text |
| `--palette-navy-600` | `#606a79` | Muted text with AA contrast on paper |
| `--palette-line-300` | `#c1beb5` | Hairline divider |
| `--palette-cobalt-600` | `#2454d6` | Primary accent |
| `--palette-cobalt-100` | `#dfe6f8` | Featured / selected blue surface |
| `--palette-vermilion-600` | `#c43b22` | Secondary accent with AA contrast on paper |
| `--palette-vermilion-100` | `#f2dfd8` | Secondary selected surface |

### 3.2 Semantic color tokens

Components consume semantic tokens rather than primitive palette values:

- `--color-bg`
- `--color-bg-muted`
- `--color-surface`
- `--color-surface-highlight`
- `--color-surface-selected`
- `--color-evidence-surface`
- `--color-text`
- `--color-text-secondary`
- `--color-text-muted`
- `--color-border`
- `--color-border-strong`
- `--color-accent`
- `--color-accent-secondary`
- `--color-focus`
- `--color-selection`
- `--color-selection-text`

### 3.3 Usage rules

- Cobalt is the default action, selected-state and recommendation accent.
- Vermilion is a secondary signal for editorial contrast, focus and limited emphasis. It must not compete with cobalt across every module.
- Cobalt and vermilion are not project categories. Category meaning comes from labels, not color alone.
- Do not add a third persistent accent without a necessary semantic reason.
- No acid green, purple AI gradient, glass surface, neon glow or decorative gradient system.
- Navy on paper measures approximately `13.96:1`; cobalt on paper `5.51:1`; the revised vermilion on paper `4.57:1`; muted navy on paper `4.77:1`.

## 4. Typography system

Typography uses three explicit roles. Typeface usage is based on responsibility, not visual variety.

### 4.1 Display / Grotesk

Token: `--font-display`

Current stack:

```css
"Bahnschrift Condensed", "Aptos Display", sans-serif
```

Use for:

- Candidate identity
- Featured project title
- Major outcome
- Major metric when it acts as a visual node
- Rare high-impact transitions

Do not use for every section heading. Display type creates impact through scarcity.

### 4.2 Editorial Serif

Token: `--font-editorial`

Current stack:

```css
Georgia, "Songti SC", serif
```

Use for:

- Concept and narrative heading
- Section transition such as “Start here” or “Role Lens”
- Problem / decision / reflection headline
- Editorial annotation or deliberate emphasis

Do not use for navigation, arbitrary project metadata or all body text.

### 4.3 UI / Metadata Grotesk

Token: `--font-ui`

Current stack:

```css
"Aptos", "PingFang SC", "Microsoft YaHei", sans-serif
```

Use for:

- Navigation and controls
- Buttons and links
- Project type, role, date and state
- Body copy
- Captions and evidence information

The formal label and caption minimum is `0.75rem / 12px`. Small uppercase text must use weight and spacing carefully; the system must not return to pervasive 10–11px labels.

### 4.4 Type tokens

| Token | Value | Use |
| --- | --- | --- |
| `--font-size-label` | `0.75rem` | UI labels and compact controls |
| `--font-size-caption` | `0.75rem` | Caption and evidence source |
| `--font-size-body-sm` | `0.8125rem` | Compact explanation |
| `--font-size-body` | `0.9375rem` | Standard body |
| `--font-size-body-lg` | `1.0625rem` | Lead body copy |
| `--font-size-section` | fluid `1.75–3.5rem` | Editorial section heading |
| `--font-size-display-sm` | fluid `3–5.5rem` | Project-level display |
| `--font-size-display-lg` | fluid `4.5–8.4rem` | Candidate identity |

Line-height and tracking tokens are defined for display, heading, body, caption and label contexts. Do not apply display tracking to Chinese body text.

### 4.5 Typeface risk

Bahnschrift and Aptos are not guaranteed on every recruiter device. G4 must either bundle appropriately licensed webfonts or validate a stable cross-platform fallback. This is a fidelity risk, not permission to change the typography roles.

## 5. Chinese and English rules

Chinese is the primary content language. English supports interface, classification and established industry terminology.

Use Chinese for:

- Project problem and context
- Process, decision explanation and responsibility
- Results, reflection and case-study body

Use English for:

- Navigation and short interface labels
- Section labels and project classification
- Role Lens values: AI Product, Product Ops, Project Ops, Growth, AI Native
- Established labels: Start Here, Quick Proof, Problem, Decision, Outcome

Rules:

- Do not alternate languages sentence by sentence for style.
- Do not duplicate every label in both languages.
- Keep product names and established technical terms in their original language where clearer.
- Full bilingual switching is not part of G3.

## 6. Spacing system

The spacing scale uses a 4px base and semantic aliases.

| Semantic token | Value |
| --- | ---: |
| `--space-micro` | 4px |
| `--space-xs` | 8px |
| `--space-sm` | 12px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--space-3xl` | 72px |

Extended scale tokens cover 20, 40, 64, 80, 96 and 128px.

Responsibilities:

- Page gutter: `--page-gutter`
- Section gap: `--section-gap`
- Project gap: `--project-gap`
- Image gap: `--image-gap`
- Metadata gap: `--metadata-gap`

Mobile and desktop share the same scale. Responsive values change through a small number of semantic tokens rather than isolated component hacks.

## 7. Grid system

| Range | Columns | Outer gutter | Behavior |
| --- | ---: | --- | --- |
| Mobile: `0–767px` | 4 | 20px | Natural vertical flow; no page overflow |
| Tablet: `768–1023px` | 8 | fluid | Split layouts collapse selectively |
| Desktop: `1024–1599px` | 12 | fluid `20–68px` | Final Hybrid desktop composition |
| Wide: `1600px+` | 12 | centered within `1600px` content max | Avoid uncontrolled line length |

Grid gutter uses `--grid-gutter`. The grid aligns content; it does not require every column or region to be outlined.

Full-bleed background and divider treatments may extend beyond the content max while text and evidence remain aligned to the content grid.

## 8. Border philosophy

Priority order:

```text
Alignment → Whitespace → Single divider → Full border
```

Use hairline dividers for:

- Section transition
- Evidence caption separation
- Relationship between two editorial regions

Use strong divider for:

- Active narrative state
- A major section boundary where whitespace is insufficient

Use a full border only when the object must read as one interactive or evidence container. Avoid nested full borders, dashboard grids and wireframe-like panels.

Tokens:

- `--border-hairline: 1px`
- `--border-emphasis: 2px`
- `--radius-none: 0`
- `--radius-subtle: 2px`

The default system is square and editorial. Rounded card systems are not a portfolio primitive.

## 9. Surface system

| Surface | Token | Use |
| --- | --- | --- |
| Page Surface | `--color-bg` | Main canvas |
| Muted Surface | `--color-bg-muted` | Start Here and quiet grouping |
| Featured Project Surface | `--color-surface-highlight` | Selected flagship narrative |
| Interactive Surface | `--color-surface` | Preview, menu or evidence interaction |
| Selected Surface | `--color-surface-selected` | Secondary selection state |
| Evidence Surface | `--color-evidence-surface` | Screenshot and proof presentation |

Surfaces may be split layouts, full-width sections or editorial blocks. They are not synonymous with cards.

## 10. Navigation pattern

Desktop retains the current compact horizontal navigation. Mobile retains:

```text
ZSY | Resume | Menu
```

Required states:

- Default: ink text, no decorative container
- Hover: short underline or color feedback
- Focus-visible: system focus ring
- Active: immediate press feedback without layout movement
- Current section: cobalt text plus a non-color indicator

Formal mobile menu behavior for G4:

- `aria-expanded` and `aria-controls`
- Escape closes the menu
- Opening moves focus to the first menu item
- Closing returns focus to the trigger
- Focus stays within an open modal-style drawer when applicable
- Every touch target is at least 44px

G3 defines this behavior; G4 owns the final reusable implementation and router-aware current-section state.

## 11. Button and link system

### Primary CTA

- Cobalt fill, high-contrast light text
- Used once per local action group
- Hover may use vermilion if contrast remains valid

### Secondary CTA

- Transparent paper surface with strong hairline
- Equal height to Primary CTA

### Text Link

- No card container
- Visible underline, arrow or positional affordance

### Inline Project Link

- Vermilion or cobalt emphasis plus underline
- Appears after enough project context to make the destination clear

### Icon Action

- Icon cannot be the only accessible name
- Minimum 44px target

All variants define default, hover, focus-visible, active and disabled states. Disabled controls use both semantic state and visual treatment; opacity alone is insufficient.

The mobile 2 × 2 CTA group remains valid and must not be removed to compress the first viewport.

## 12. Start Here pattern

Locked structure:

```text
Preview
+ Project list
+ Explicit project destination
```

Desktop:

- Hover and keyboard focus may change Preview.
- Focus change must provide the same information as hover.

Mobile:

- Tap may update Preview; a separate explicit link opens the project.
- A future implementation may make a second tap open the project only if the state is obvious and documented.
- The project list remains vertical.

Preview is a navigation enhancement, not the main evidence surface. It uses a bounded wide crop and must not grow into a second Hero.

## 13. Role Lens pattern

Supported values:

- AI Product
- Product Ops
- Project Ops
- Growth
- AI Native
- Future optional value: All

Role Lens may:

- Change recommendation weight or order
- Highlight related work
- Explain why a project matters for the selected role

Role Lens must not:

- Change facts, outcomes or classifications
- Create different versions of project data
- Hide all non-selected projects

Desktop uses lightweight text tabs. Mobile may wrap or use an internally scrollable tab row, but the page itself must never overflow horizontally. Selected state uses `aria-pressed` or an appropriate tab pattern plus a visible non-color indicator.

## 14. Quick Proof pattern

Quick Proof is a compact editorial evidence row, never a KPI dashboard.

Required anatomy:

```text
Metric
+ Meaning
+ Natural evidence caption
```

Do not add decorative sequence numbers or give every metric a unique accent color. Internal states such as `EVIDENCE_ATTACHED`, `USER_VERIFIED` and `NEEDS_VERIFICATION` remain in the content model; the public UI uses natural language.

## 15. Featured Project Opening

The current AI Content Growth Workflow opening defines reusable grammar:

- Classification
- Project title
- Role
- Problem
- Decision
- Outcome
- Real screenshot
- Evidence caption
- Case Study CTA

The grammar is reusable; its exact composition is not mandatory. A project without credible result data must omit or rename the Outcome claim rather than filling it with invented content.

The first Featured Project should place a meaningful portion of real evidence near the opening. At 1440 × 900, the accepted composition shows title, role, Problem and real screenshot together.

## 16. Problem → Decision → Outcome

This sequence is a narrative tool for flagship work, case-study process and selected project summaries. It is not the global portfolio navigation.

Desktop may use tabs or segmented narrative. Mobile may use:

- Vertical narrative
- Accessible accordion
- Segmented control

Core facts must remain understandable without activating every segment. Interactive summaries enhance scan speed; they cannot conceal required project context.

## 17. Image system

Real project screenshots are product evidence.

| Role | Treatment |
| --- | --- |
| Thumbnail | 4:3 or 3:2 crop; navigation only; `object-fit: cover` allowed |
| Preview | Bounded wide crop; top-biased crop; explicit destination |
| Featured screenshot | Original ratio inside Evidence Surface; `object-fit: contain` |
| Supporting screenshot | Original ratio unless crop does not remove meaning |
| Evidence screenshot | Preserve labels and relevant data; caption required |
| Detail image | Full readable width; may open a larger view |

Caption rules:

- Identify what is shown.
- Include source/date or anonymization context when relevant.
- Use natural language rather than internal evidence-status codes.
- Never imply that a generated or decorative image is a product screenshot.

Loading rules:

- First visible Preview and first Featured evidence load eagerly.
- Below-the-fold project images use `loading="lazy"`.
- Provide intrinsic width and height when final assets are prepared.
- WebP/AVIF may be added if screenshot text remains readable.
- Lightbox/zoom is optional and must have keyboard close, focus return and a non-zoom fallback.
- Avoid cheap device mockups and generated dashboards.

## 18. Motion system

| Token | Duration | Use |
| --- | ---: | --- |
| `--motion-fast` | 150ms | Button, underline, press feedback |
| `--motion-normal` | 220ms | Preview and tab change |
| `--motion-slow` | 360ms | Drawer or small page micro-transition |

Easing:

- `--ease-standard`: routine interface response
- `--ease-emphasized`: contextual reveal or drawer

Allowed:

- Hover transition
- Preview switch
- Tab selection
- Image reveal
- Drawer
- Small page transition

Disallowed:

- Continuous particles
- Infinite ambient animation
- Large parallax
- Scroll hijacking
- Ubiquitous cursor followers
- Floating elements without information value

Motion must support hierarchy, feedback, navigation or context.

## 19. Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Motion durations resolve to `0ms`.
- All content is initially visible.
- Smooth scrolling is disabled.
- Preview and tab changes are immediate.
- Drawer transitions are removed or made effectively instant.
- Information and interaction remain complete.

No content may depend on a reveal animation to enter the accessibility tree or become readable.

## 20. Accessibility system

### Focus

- `3px` visible focus ring with `4px` offset
- Focus color uses the accessible vermilion token
- Focus must not be clipped by `overflow`

### Keyboard and selection

- Every hover interaction has a focus path.
- Selected state uses semantic attributes such as `aria-pressed` or the appropriate tab semantics.
- Skip link remains available.
- Escape and focus return are required for dismissible overlays.

### Touch

- Minimum touch target: `44 × 44px`
- Adjacent controls retain enough separation to prevent accidental activation.

### Links

- Links are identifiable by underline, arrow, placement or more than color alone.
- External links retain descriptive accessible names.

### Semantics

- One page-level `h1`.
- Section headings descend in order; visual size does not dictate heading level.
- Figures use `figure` and `figcaption` for evidence.
- Decorative images use empty alt text; evidence images require descriptive alt text.
- Dynamic Role Lens, Start Here and narrative changes announce concise updates without repeating an entire region.

### Contrast

- Normal text target: WCAG AA `4.5:1`.
- Large text target: `3:1`.
- UI boundaries and focus indicators target `3:1` against adjacent colors.
- Lighthouse is a diagnostic, not the acceptance definition.

## 21. Responsive system

Required QA widths:

- 375
- 390
- 430
- 768
- 1024
- 1440

Rules:

- Do not create a breakpoint for every device.
- Mobile Hero keeps its accepted information and CTA structure.
- Role Lens, Quick Proof and Featured Project may enter through natural scrolling below 844px.
- Hover-only information always has focus and touch alternatives.
- No page-level horizontal overflow.
- Images preserve meaning rather than a uniform crop.
- Tablet is a real intermediate layout, not stretched mobile.

## 22. G3 mobile below-the-fold validation

Required captures:

- [`mobile-top.png`](../artifacts/design/g3/mobile-top.png)
- [`mobile-role-proof.png`](../artifacts/design/g3/mobile-role-proof.png)
- [`mobile-featured-project.png`](../artifacts/design/g3/mobile-featured-project.png)
- [`mobile-full-page.png`](../artifacts/design/g3/mobile-full-page.png), when practical

Acceptance checks:

- Role tabs wrap without page overflow.
- Quick Proof remains an editorial list rather than metric cards.
- Featured title, role and active narrative remain readable.
- Screenshot and caption remain paired.
- Problem / Decision / Outcome remains operable through touch and keyboard.
- Sticky navigation does not obscure the selected section after scrolling.

### G3 validation result

Status: **PASS**

| Check | Result |
| --- | --- |
| 375 / 390 / 430 mobile width | No page-level horizontal overflow |
| 768 tablet | Tablet navigation, Preview, Role Lens and project layout remain within viewport |
| 1024 / 1440 desktop | Desktop navigation and split layouts remain active without overflow |
| Role Lens | Wraps naturally on mobile; all roles remain visible and selectable |
| Quick Proof | Renders as three compact editorial rows, not cards |
| Featured opening | Classification, title, role, narrative control and real evidence remain readable |
| Start Here | Hover, keyboard focus and touch Preview paths pass |
| Problem / Decision / Outcome | Selection state and content update pass |
| Mobile menu baseline | `aria-expanded`, visible state and 44px trigger pass |
| Reduced motion | Content remains visible; interaction state changes remain complete |
| Browser diagnostics | No console error, page error, failed request or critical image failure |

The final 390px full-page capture is 5,245px high after below-the-fold images settle. Its length is accepted because the page uses natural scroll and keeps real project evidence in the reading flow. G3 does not compress the Hero to force Role Lens or Quick Proof into the first 844px.

## 23. Initial implementation mapping

Implemented in G3:

- Global primitive and semantic tokens in `src/styles/tokens.css`
- Final Hybrid aliases mapped to semantic tokens
- Formal typography minimums for labels and captions
- Shared page gutter, touch target, focus, motion and reduced-motion tokens
- Responsive column and spacing tokens

Deferred to G4:

- Reusable React Button, SectionHeader, Caption and Label components
- Router-aware navigation
- Project data and evidence model
- Reusable StartHere, RoleLens, QuickProof and FeaturedProject components
- Case-study layout variants
- Image pipeline and optional lightbox

## 24. G4 component candidates

Recommended extraction candidates, in dependency order:

1. `Button`, `TextLink`, `Label`, `Caption`, `SectionHeader`
2. `ResponsiveImage`, `EvidenceFigure`
3. `ProjectClassification`, `ProjectMeta`, `ProjectCTA`
4. `StartHere`
5. `RoleLens`
6. `QuickProof`
7. `ProjectNarrative` for Problem / Decision / Outcome
8. `FeaturedProjectOpening`
9. Navigation and Mobile Menu after router decisions

## 25. Known risks and missing inputs

Design risks:

- Cross-platform display-font metrics may change wrapping.
- Real screenshots have inconsistent resolution and aspect ratios.
- Condensed display type can become repetitive if used for every project.
- Role Lens recommendation logic can become difficult to maintain without a structured data model.
- Large full-page mobile captures may reveal excessive project spacing once more real cases are added.
- The current prototype mobile menu does not yet implement Escape close and formal focus management; G4 must complete the documented navigation pattern.

Content still missing or unresolved:

- Digest team structure, personal responsibility and independent-development boundary
- Formal evidence periods and measurement methods for some AI Content Growth metrics
- Sanitized future AI Product / Workflow / Automation / Internal Tool / Project Operations case studies
- Final public resume with birth date and phone removed
- Decision on whether location appears publicly
- Final project-specific case-study CTAs and URLs

These gaps must remain TODOs. The design system does not invent facts to fill them.
