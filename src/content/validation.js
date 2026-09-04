import {
  CONTENT_STATUS,
  EVIDENCE_ORIGIN,
  EVIDENCE_STATUS,
  EVIDENCE_TYPE,
  PUBLIC_VISIBILITIES,
  REDACTION_STATUS,
} from "./schema.js";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VISUAL_EVIDENCE_TYPES = new Set([
  EVIDENCE_TYPE.SCREENSHOT,
  EVIDENCE_TYPE.PROCESS_DIAGRAM,
  EVIDENCE_TYPE.VIDEO,
]);

const createError = (code, message, id = null) => ({ code, message, id });

function collectDuplicateErrors(items, field, code, label) {
  const seen = new Set();
  const errors = [];

  for (const item of items) {
    const value = item?.[field];
    if (seen.has(value)) errors.push(createError(code, `Duplicate ${label}: ${value}`, value));
    seen.add(value);
  }

  return errors;
}

export function validateContent({ projects = [], claims = [], evidence = [], quickProofClaimIds = [] }) {
  const errors = [
    ...collectDuplicateErrors(projects, "id", "DUPLICATE_PROJECT_ID", "project id"),
    ...collectDuplicateErrors(projects, "slug", "DUPLICATE_PROJECT_SLUG", "project slug"),
    ...collectDuplicateErrors(claims, "id", "DUPLICATE_CLAIM_ID", "claim id"),
    ...collectDuplicateErrors(evidence, "id", "DUPLICATE_EVIDENCE_ID", "evidence id"),
  ];

  const projectById = new Map(projects.map((project) => [project.id, project]));
  const claimById = new Map(claims.map((claim) => [claim.id, claim]));
  const evidenceById = new Map(evidence.map((item) => [item.id, item]));

  for (const project of projects) {
    if (!project.id || !project.title || !project.slug) {
      errors.push(createError("PROJECT_IDENTITY_MISSING", "Project id, title and slug are required", project.id));
      continue;
    }

    if (!SLUG_PATTERN.test(project.slug)) {
      errors.push(createError("PROJECT_SLUG_INVALID", `Invalid project slug: ${project.slug}`, project.id));
    }

    if (
      Number.isInteger(project.homepagePriority)
      && [CONTENT_STATUS.NEEDS_CONTENT, CONTENT_STATUS.DRAFT].includes(project.contentStatus)
    ) {
      errors.push(createError("FEATURED_PROJECT_NOT_READY", "Featured project cannot be missing content", project.id));
    }

    for (const claimId of project.claimIds ?? []) {
      if (!claimById.has(claimId)) {
        errors.push(createError("PROJECT_CLAIM_MISSING", `Unknown claim: ${claimId}`, project.id));
      }
    }

    for (const evidenceId of project.evidenceIds ?? []) {
      const item = evidenceById.get(evidenceId);
      if (!item) {
        errors.push(createError("PROJECT_EVIDENCE_MISSING", `Unknown evidence: ${evidenceId}`, project.id));
        continue;
      }

      if (PUBLIC_VISIBILITIES.includes(project.visibility) && !PUBLIC_VISIBILITIES.includes(item.visibility)) {
        errors.push(createError(
          "PUBLIC_PROJECT_INTERNAL_EVIDENCE",
          `Public project ${project.id} references non-public evidence ${evidenceId}`,
          project.id,
        ));
      }
    }
  }

  for (const claim of claims) {
    if (!projectById.has(claim.projectId)) {
      errors.push(createError("CLAIM_PROJECT_MISSING", `Claim references unknown project: ${claim.projectId}`, claim.id));
    }
    for (const evidenceId of claim.evidenceIds ?? []) {
      if (!evidenceById.has(evidenceId)) {
        errors.push(createError("CLAIM_EVIDENCE_MISSING", `Claim references unknown evidence: ${evidenceId}`, claim.id));
      }
    }
  }

  for (const item of evidence) {
    if (!projectById.has(item.projectId)) {
      errors.push(createError("EVIDENCE_PROJECT_MISSING", `Evidence references unknown project: ${item.projectId}`, item.id));
    }
    for (const claimId of item.supportsClaims ?? []) {
      if (!claimById.has(claimId)) {
        errors.push(createError("EVIDENCE_CLAIM_MISSING", `Evidence references unknown claim: ${claimId}`, item.id));
      }
    }
    if (
      PUBLIC_VISIBILITIES.includes(item.visibility)
      && [REDACTION_STATUS.REDACTION_REQUIRED, REDACTION_STATUS.RAW_INTERNAL].includes(item.redactionStatus)
    ) {
      errors.push(createError("PUBLIC_EVIDENCE_NOT_REDACTED", "Public evidence must be redacted and approved", item.id));
    }
    if (
      PUBLIC_VISIBILITIES.includes(item.visibility)
      && VISUAL_EVIDENCE_TYPES.has(item.type)
      && !item.alt?.trim()
    ) {
      errors.push(createError("PUBLIC_EVIDENCE_ALT_MISSING", "Public visual evidence requires alt text", item.id));
    }
    if (PUBLIC_VISIBILITIES.includes(item.visibility) && !Object.values(EVIDENCE_ORIGIN).includes(item.origin)) {
      errors.push(createError("PUBLIC_EVIDENCE_ORIGIN_MISSING", "Public evidence requires a declared origin", item.id));
    }
    if (
      PUBLIC_VISIBILITIES.includes(item.visibility)
      && item.origin === EVIDENCE_ORIGIN.RECONSTRUCTED_PROCESS_DIAGRAM
      && !item.caption?.includes("重新绘制")
    ) {
      errors.push(createError(
        "PUBLIC_EVIDENCE_PROVENANCE_AMBIGUOUS",
        "Reconstructed process evidence must be labelled as redrawn",
        item.id,
      ));
    }
    if (
      PUBLIC_VISIBILITIES.includes(item.visibility)
      && item.origin === EVIDENCE_ORIGIN.DEMO_DATA
      && !item.caption?.includes("DEMO DATA")
    ) {
      errors.push(createError(
        "PUBLIC_EVIDENCE_PROVENANCE_AMBIGUOUS",
        "Demo evidence must be labelled as demo data",
        item.id,
      ));
    }
  }

  for (const claimId of quickProofClaimIds) {
    const claim = claimById.get(claimId);
    if (!claim) {
      errors.push(createError("QUICK_PROOF_CLAIM_MISSING", `Unknown Quick Proof claim: ${claimId}`, claimId));
    } else if (claim.evidenceStatus === EVIDENCE_STATUS.NEEDS_VERIFICATION) {
      errors.push(createError("QUICK_PROOF_UNVERIFIED", "Quick Proof cannot use an unverified claim", claimId));
    }
  }

  return errors;
}

export function assertValidContent(content) {
  const errors = validateContent(content);
  if (errors.length > 0) {
    const detail = errors.map((error) => `[${error.code}] ${error.message}`).join("\n");
    throw new Error(`Content validation failed:\n${detail}`);
  }
  return true;
}
