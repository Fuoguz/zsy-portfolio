import assert from "node:assert/strict";
import test from "node:test";

import { claims, evidence, projects } from "../src/data/projects.js";
import { experience } from "../src/data/experience.js";
import { quickProofClaimIds } from "../src/data/quick-proofs.js";
import {
  selectHomepageProjects,
  selectPublicExperience,
  selectProjectsForRoleLens,
  selectPublicProjectBySlug,
  selectPublicProjects,
  selectQuickProofs,
} from "../src/content/selectors.js";
import { assertValidContent, validateContent } from "../src/content/validation.js";
import {
  CONTENT_STATUS,
  EVIDENCE_ORIGIN,
  EVIDENCE_STATUS,
  EVIDENCE_TYPE,
  REDACTION_STATUS,
  VISIBILITY,
} from "../src/content/schema.js";

const content = { projects, claims, evidence, quickProofClaimIds };

test("canonical content passes validation", () => {
  assert.deepEqual(validateContent(content), []);
});

test("public project selectors strip internal governance fields and unsafe evidence", () => {
  const publicProjects = selectPublicProjects(content);

  assert.ok(publicProjects.length > 0);
  assert.equal(publicProjects.some((project) => project.slug === "globridge"), false);
  assert.equal(publicProjects.some((project) => project.slug === "digest"), false);

  for (const project of publicProjects) {
    assert.equal("internalNotes" in project, false);
    assert.equal("restrictedFields" in project, false);
    assert.equal("sourceNote" in project, false);
    assert.ok(project.evidence.every((item) => item.publicSafe === true));
    assert.ok(project.evidence.every((item) => !("visibility" in item)));
    assert.ok(project.evidence.every((item) => !("redactionStatus" in item)));
  }
});

test("homepage selection requires safe visibility, readiness and explicit priority", () => {
  const homepageProjects = selectHomepageProjects(content);

  assert.deepEqual(homepageProjects.map((project) => project.slug), [
    "eaglehub",
    "onboarding-automation",
    "ai-content-growth-workflow",
  ]);
  assert.ok(homepageProjects.every((project) =>
    ![CONTENT_STATUS.NEEDS_CONTENT, CONTENT_STATUS.NEEDS_REDACTION, CONTENT_STATUS.DRAFT]
      .includes(project.contentStatus),
  ));
});

test("public evidence explains whether it is a real screenshot, a reconstructed diagram, or demo data", () => {
  const publicProjects = selectPublicProjects(content);
  const publicEvidence = publicProjects.flatMap((project) => project.evidence);

  assert.ok(publicEvidence.some((item) => item.provenanceLabel === "真实脱敏截图"));
  assert.ok(publicEvidence.some((item) => item.provenanceLabel === "基于真实流程重新绘制"));
  assert.ok(publicEvidence.some((item) => item.provenanceLabel === "DEMO DATA · 匿名示例"));
  assert.ok(publicEvidence.every((item) => !("origin" in item)));
});

test("quick proof is derived from eligible public claims and excludes verification TODOs", () => {
  const quickProofs = selectQuickProofs(content);

  assert.deepEqual(quickProofs.map((claim) => claim.value), [
    "400–500 人",
    "≈480 对",
    "2h → 20–30min",
  ]);
  assert.ok(quickProofs.every((claim) => claim.evidenceStatus !== EVIDENCE_STATUS.NEEDS_VERIFICATION));
  assert.ok(quickProofs.every((claim) => !("sourceNote" in claim)));
});

test("role lenses sort the same public project source without duplicating facts", () => {
  const aiProduct = selectProjectsForRoleLens("aiProduct", content);
  const growth = selectProjectsForRoleLens("growth", content);

  assert.equal(aiProduct[0].id, "eaglehub");
  assert.equal(growth[0].id, "ai-content-growth");
  assert.equal(projects.filter((project) => project.id === aiProduct[0].id).length, 1);
});

test("known public project resolves by stable slug", () => {
  const project = selectPublicProjectBySlug("ai-content-growth-workflow", content);
  assert.equal(project?.id, "ai-content-growth");
});

test("public experience strips unresolved organization labels and internal notes", () => {
  const publicExperience = selectPublicExperience(experience);

  assert.equal(publicExperience[0].publicLabel, "TRANSSION");
  assert.equal("internalLabel" in publicExperience[0], false);
  assert.equal("internalNotes" in publicExperience[0], false);
});

test("validation catches duplicate ids and slugs", () => {
  const duplicate = { ...projects[0] };
  const errors = validateContent({ ...content, projects: [...projects, duplicate] });

  assert.ok(errors.some((error) => error.code === "DUPLICATE_PROJECT_ID"));
  assert.ok(errors.some((error) => error.code === "DUPLICATE_PROJECT_SLUG"));
});

test("validation blocks public projects from referencing internal evidence", () => {
  const unsafeEvidence = {
    id: "internal-test-evidence",
    type: "SCREENSHOT",
    asset: null,
    caption: "Internal",
    dateRange: null,
    projectId: projects[0].id,
    supportsClaims: [],
    visibility: VISIBILITY.INTERNAL_ONLY,
    redactionStatus: "RAW_INTERNAL",
    alt: "",
  };
  const unsafeProject = {
    ...projects[0],
    evidenceIds: [...projects[0].evidenceIds, unsafeEvidence.id],
  };
  const errors = validateContent({
    ...content,
    projects: [unsafeProject, ...projects.slice(1)],
    evidence: [...evidence, unsafeEvidence],
  });

  assert.ok(errors.some((error) => error.code === "PUBLIC_PROJECT_INTERNAL_EVIDENCE"));
});

test("validation blocks featured projects with missing content", () => {
  const incompleteProject = {
    ...projects[0],
    contentStatus: CONTENT_STATUS.NEEDS_CONTENT,
  };
  const errors = validateContent({
    ...content,
    projects: [incompleteProject, ...projects.slice(1)],
  });

  assert.ok(errors.some((error) => error.code === "FEATURED_PROJECT_NOT_READY"));
});

test("validation blocks unverified claims from Quick Proof", () => {
  const claimId = quickProofClaimIds[0];
  const unverifiedClaims = claims.map((claim) =>
    claim.id === claimId
      ? { ...claim, evidenceStatus: EVIDENCE_STATUS.NEEDS_VERIFICATION }
      : claim,
  );
  const errors = validateContent({ ...content, claims: unverifiedClaims });

  assert.ok(errors.some((error) => error.code === "QUICK_PROOF_UNVERIFIED"));
});

test("validation requires alt text for public visual evidence", () => {
  const evidenceWithMissingAlt = evidence.map((item) =>
    item.id === "content-growth-readership"
      ? { ...item, alt: "" }
      : item,
  );
  const errors = validateContent({ ...content, evidence: evidenceWithMissingAlt });

  assert.ok(errors.some((error) => error.code === "PUBLIC_EVIDENCE_ALT_MISSING"));
});

test("validation rejects public evidence that still requires redaction", () => {
  const unsafe = {
    ...evidence[0],
    id: "public-but-unredacted",
    redactionStatus: REDACTION_STATUS.REDACTION_REQUIRED,
  };
  const errors = validateContent({ ...content, evidence: [...evidence, unsafe] });
  assert.ok(errors.some((error) => error.code === "PUBLIC_EVIDENCE_NOT_REDACTED"));
});

test("validation requires structured provenance for public evidence", () => {
  const missingOrigin = {
    ...evidence.find((item) => item.id === "content-growth-account-overview"),
    id: "public-evidence-without-origin",
  };
  delete missingOrigin.origin;
  const errors = validateContent({ ...content, evidence: [...evidence, missingOrigin] });
  assert.ok(errors.some((error) => error.code === "PUBLIC_EVIDENCE_ORIGIN_MISSING"));
});

test("validation keeps reconstructed and demo evidence labels explicit", () => {
  const ambiguousDiagram = {
    id: "ambiguous-reconstruction",
    type: EVIDENCE_TYPE.PROCESS_DIAGRAM,
    origin: EVIDENCE_ORIGIN.RECONSTRUCTED_PROCESS_DIAGRAM,
    asset: "assets/evidence/ambiguous.svg",
    caption: "流程概览",
    dateRange: null,
    projectId: "eaglehub",
    supportsClaims: [],
    visibility: VISIBILITY.PUBLIC_REDACTED,
    redactionStatus: REDACTION_STATUS.REDACTED_APPROVED,
    alt: "流程概览",
    width: 1600,
    height: 1000,
  };
  const errors = validateContent({ ...content, evidence: [...evidence, ambiguousDiagram] });
  assert.ok(errors.some((error) => error.code === "PUBLIC_EVIDENCE_PROVENANCE_AMBIGUOUS"));
});

test("validation reports missing identities and invalid relationship references", () => {
  const brokenProject = {
    ...projects[0],
    id: "",
    slug: "Invalid Slug",
    title: "",
    claimIds: ["missing-claim"],
    evidenceIds: ["missing-evidence"],
  };
  const brokenClaim = {
    ...claims[0],
    id: "broken-claim",
    projectId: "missing-project",
    evidenceIds: ["missing-evidence"],
  };
  const brokenEvidence = {
    ...evidence[0],
    id: "broken-evidence",
    projectId: "missing-project",
    supportsClaims: ["missing-claim"],
  };
  const errors = validateContent({
    projects: [brokenProject],
    claims: [brokenClaim],
    evidence: [brokenEvidence],
    quickProofClaimIds: ["missing-quick-proof"],
  });
  const codes = new Set(errors.map((error) => error.code));

  assert.ok(codes.has("PROJECT_IDENTITY_MISSING"));
  assert.ok(codes.has("CLAIM_PROJECT_MISSING"));
  assert.ok(codes.has("CLAIM_EVIDENCE_MISSING"));
  assert.ok(codes.has("EVIDENCE_PROJECT_MISSING"));
  assert.ok(codes.has("EVIDENCE_CLAIM_MISSING"));
  assert.ok(codes.has("QUICK_PROOF_CLAIM_MISSING"));
});

test("validation rejects invalid slugs when project identity exists", () => {
  const invalidSlugProject = { ...projects[0], slug: "Invalid Slug" };
  const errors = validateContent({ ...content, projects: [invalidSlugProject, ...projects.slice(1)] });
  assert.ok(errors.some((error) => error.code === "PROJECT_SLUG_INVALID"));
});

test("assertValidContent throws a readable aggregate error", () => {
  assert.throws(
    () => assertValidContent({ ...content, quickProofClaimIds: ["missing"] }),
    /QUICK_PROOF_CLAIM_MISSING/,
  );
});
