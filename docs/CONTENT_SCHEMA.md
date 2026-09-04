# ZSY Portfolio V2 — Content Schema

> Stage: G4A  
> Runtime definitions: `src/content/schema.js`  
> Canonical facts: `docs/CONTENT_SOURCE_OF_TRUTH.md`

## 1. Core Principle

Raw content may contain governance notes. Public UI never receives raw project objects directly; it consumes allow-listed selector output.

## 2. Project Record

```js
{
  id,                         // stable internal key
  slug,                       // stable URL key
  title,
  shortTitle,
  englishTitle,
  classification: [],
  deliveryStatus,
  visibility,
  homepagePriority,
  placement,
  roleLensRelevance: {
    aiProduct,
    productOps,
    projectOps,
    growth,
    aiNative,
  },
  publicRole,
  contributionBoundary: {
    owned: [],
    contributed: [],
    collaborated: [],
    notClaimed: [],
  },
  summary,
  context,
  problem,
  constraints: [],
  decisions: [],
  outcomes: [],
  reflection,
  claimIds: [],
  evidenceIds: [],
  media: [],
  caseStudy: { enabled, sections: [] },
  disclosure: {
    redactionRequired,
    publicSafe,
    internalNotes,
    restrictedFields: [],
    evidenceVisibility,
  },
  contentStatus,
  contentFlags: [],
  internalNotes,
}
```

Titles are presentation content; `id` and `slug` are identity. Titles can change without breaking selectors or URLs.

## 3. Classification and Delivery

Internal classification enums:

- `REAL_PROJECT`
- `REAL_BUSINESS_WORK`
- `INTERNAL_PRODUCT`
- `INTERNAL_AUTOMATION`
- `INTERNAL_TOOL`
- `EXPERIMENT`
- `SIMULATION`
- `CREATIVE_WORK`

UI maps these to public labels. Delivery status is separate: `ACTIVE`, `SHIPPED`, `VALIDATED_PROTOTYPE`, `PROTOTYPE`, `EXPERIMENT`, `SIMULATION`, `ARCHIVED`.

This prevents “Internal Product” from being confused with “Shipped” and prevents a Simulation from looking like a commercial project.

## 4. Visibility

| Value | Meaning | Public selector |
| --- | --- | --- |
| `PUBLIC` | Public record | Eligible |
| `PUBLIC_REDACTED` | Public-safe text or approved redacted material | Eligible |
| `DRAFT` | Work-in-progress content | Excluded |
| `INTERNAL_ONLY` | Governance or sensitive record | Excluded |
| `HIDDEN` | Deliberately unavailable | Excluded |

Adding a project to `projects[]` does not publish it.

## 5. Content Status

- `READY`
- `PARTIAL`
- `NEEDS_CONTENT`
- `NEEDS_EVIDENCE`
- `NEEDS_REDACTION`
- `DRAFT`

The public selector currently accepts `READY`, `PARTIAL` and `NEEDS_EVIDENCE` only when `disclosure.publicSafe` is true. `NEEDS_CONTENT`, `NEEDS_REDACTION` and `DRAFT` are excluded.

Homepage selection additionally requires an integer `homepagePriority`. Validation rejects a Featured project with `NEEDS_CONTENT` or `DRAFT`.

## 6. Claim / Metric

```js
{
  id,
  projectId,
  label,
  value,
  context,
  evidenceStatus,
  evidenceIds: [],
  publicCaption,
  sourceNote,
  visibility,
  homepageEligible,
}
```

Evidence status:

- `CONFIRMED`
- `USER_VERIFIED`
- `NEEDS_VERIFICATION`

`sourceNote` is governance-only and stripped by selectors. Quick Proof is an ordered list of claim IDs, not duplicated values. The selector excludes `NEEDS_VERIFICATION` automatically.

## 7. Evidence

```js
{
  id,
  type,
  origin,
  asset,
  caption,
  dateRange,
  projectId,
  supportsClaims: [],
  visibility,
  redactionStatus,
  alt,
}
```

Types: `SCREENSHOT`, `DECK`, `LIVE_DEMO`, `VIDEO`, `PROCESS_DIAGRAM`, `DOCUMENT`.

Origins: `REAL_SCREENSHOT`, `RECONSTRUCTED_PROCESS_DIAGRAM`, `DEMO_DATA`, `PUBLIC_ARTIFACT`. Public selectors replace these internal values with a readable `provenanceLabel`; raw origin enums do not enter UI.

Redaction states:

- `NOT_REQUIRED`
- `REDACTED_APPROVED`
- `REDACTION_REQUIRED`
- `RAW_INTERNAL`

Public visual evidence requires alt text. `EvidenceFigure` refuses to render `RAW_INTERNAL` or `REDACTION_REQUIRED` assets.

## 8. Disclosure and Restricted Fields

Project disclosure can record that text is public-safe while screenshots remain internal. `restrictedFields` covers categories such as employee names, employee IDs, organization relationships, App credentials, tokens, internal URLs, table IDs, employee data and sensitive source code.

These fields stay in raw data for governance but are not included in public selector output.

Important limitation: files under `public/` are directly addressable. An internal file must never be copied into `public/`, regardless of model visibility.

## 9. Contribution Boundary

- `owned`: personally led or owned
- `contributed`: directly implemented or delivered parts
- `collaborated`: shared work or ongoing participation
- `notClaimed`: explicit non-attribution boundary

Case Study `My Role` and `Contribution Boundary` must be generated from these fields, not handwritten independently in page JSX.

## 10. Role Lens

Each project stores numeric relevance for the five canonical lenses. Selectors filter public readiness first, then sort the same project records by relevance.

Role Lens changes ordering, highlight and explanation only. It cannot create different facts or results.

## 11. Current Readiness Decisions

| Project | Visibility | Content status | Public selector |
| --- | --- | --- | --- |
| EagleHub | PUBLIC_REDACTED | PARTIAL | Included with reconstructed public-safe evidence |
| Onboarding Automation | PUBLIC_REDACTED | PARTIAL | Included as Validated Prototype / Dry-run with redrawn and Demo Data evidence |
| AI Content Growth | PUBLIC_REDACTED | READY | Included |
| Team Formation | PUBLIC_REDACTED | PARTIAL | Included with reconstructed public-safe evidence |
| Eagle Training | PUBLIC_REDACTED | PARTIAL | Included as experience evidence; no independent case route |
| Globridge | DRAFT | NEEDS_CONTENT | Excluded |
| Digest | DRAFT | NEEDS_CONTENT | Excluded pending role confirmation |
| Memory Museum | PUBLIC | READY | Included in Lab |
| Video / Motion | PUBLIC | PARTIAL | Included in Lab |
| Game Ads | PUBLIC | READY | Included in Lab as Simulation |

The G3.5 visual prototype may still display neutral placeholders for content stress testing. Production selectors are intentionally stricter.

## 12. Validation Invariants

- unique project id and slug
- valid slug format
- required project id/title/slug
- referenced claim/evidence exists
- public project cannot reference non-public evidence
- Featured project cannot be content-missing
- Quick Proof cannot use unverified claim
- public visual evidence must have alt
- public evidence must declare its origin
- reconstructed and Demo Data evidence must state its nature in the caption
- claim/evidence project references must exist
