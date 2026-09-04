import {
  EVIDENCE_ORIGIN,
  EVIDENCE_STATUS,
  PUBLIC_READY_STATUSES,
  PUBLIC_VISIBILITIES,
  REDACTION_STATUS,
  ROLE_LENS_IDS,
} from "./schema.js";

const EVIDENCE_PROVENANCE_LABELS = Object.freeze({
  [EVIDENCE_ORIGIN.REAL_SCREENSHOT]: "真实脱敏截图",
  [EVIDENCE_ORIGIN.RECONSTRUCTED_PROCESS_DIAGRAM]: "基于真实流程重新绘制",
  [EVIDENCE_ORIGIN.DEMO_DATA]: "DEMO DATA · 匿名示例",
  [EVIDENCE_ORIGIN.PUBLIC_ARTIFACT]: "真实公开作品",
});

const isPublicVisibility = (visibility) => PUBLIC_VISIBILITIES.includes(visibility);
const isPublicSafeEvidence = (item) => Boolean(
  item
  && isPublicVisibility(item.visibility)
  && [REDACTION_STATUS.NOT_REQUIRED, REDACTION_STATUS.REDACTED_APPROVED].includes(item.redactionStatus),
);

export function isPublicReadyProject(project) {
  return Boolean(
    project
    && isPublicVisibility(project.visibility)
    && PUBLIC_READY_STATUSES.includes(project.contentStatus)
    && project.disclosure?.publicSafe,
  );
}

function sanitizeEvidence(item) {
  return {
    id: item.id,
    type: item.type,
    asset: item.asset,
    caption: item.caption,
    dateRange: item.dateRange,
    projectId: item.projectId,
    supportsClaims: [...item.supportsClaims],
    alt: item.alt,
    width: item.width,
    height: item.height,
    sources: (item.sources ?? []).map((source) => ({ ...source })),
    publicSafe: true,
    provenanceLabel: EVIDENCE_PROVENANCE_LABELS[item.origin],
  };
}

function sanitizeClaim(claim) {
  return {
    id: claim.id,
    projectId: claim.projectId,
    label: claim.label,
    value: claim.value,
    context: claim.context,
    evidenceIds: [...claim.evidenceIds],
    publicCaption: claim.publicCaption,
  };
}

function sanitizeContributionBoundary(boundary) {
  return {
    owned: [...boundary.owned],
    contributed: [...boundary.contributed],
    collaborated: [...boundary.collaborated],
    notClaimed: [...boundary.notClaimed],
  };
}

function toPublicProject(project, { claims, evidence }) {
  const projectClaims = claims
    .filter((claim) => project.claimIds.includes(claim.id) && isPublicVisibility(claim.visibility))
    .map(sanitizeClaim);
  const projectEvidence = evidence
    .filter((item) => project.evidenceIds.includes(item.id) && isPublicSafeEvidence(item))
    .map(sanitizeEvidence);

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    shortTitle: project.shortTitle,
    englishTitle: project.englishTitle,
    classification: [...project.classification],
    deliveryStatus: project.deliveryStatus,
    homepagePriority: project.homepagePriority,
    placement: project.placement,
    roleLensRelevance: { ...project.roleLensRelevance },
    publicRole: project.publicRole,
    contributionBoundary: sanitizeContributionBoundary(project.contributionBoundary),
    summary: project.summary,
    context: project.context ?? null,
    problem: project.problem,
    constraints: [...(project.constraints ?? [])],
    decisions: [...project.decisions],
    outcomes: [...project.outcomes],
    reflection: project.reflection ?? null,
    claims: projectClaims,
    evidence: projectEvidence,
    caseStudy: { ...project.caseStudy, sections: [...project.caseStudy.sections] },
  };
}

export function selectCapabilityEvidenceMap(capabilities, content) {
  const publicProjects = selectPublicProjects(content);
  const publicById = new Map(publicProjects.map((project) => [project.id, project]));

  return capabilities
    .map((capability) => {
      const projectIds = capability.projectIds.filter((projectId) => publicById.has(projectId));
      return {
        id: capability.id,
        label: capability.label,
        why: capability.why,
        projectIds,
      };
    })
    .filter((capability) => capability.projectIds.length > 0);
}

export function selectPublicProjects({ projects, claims, evidence }) {
  return projects
    .filter(isPublicReadyProject)
    .map((project) => toPublicProject(project, { claims, evidence }));
}

export function selectPublicProjectBySlug(slug, content) {
  return selectPublicProjects(content).find((project) => project.slug === slug) ?? null;
}

export function selectHomepageProjects(content) {
  return selectPublicProjects(content)
    .filter((project) => Number.isInteger(project.homepagePriority))
    .sort((a, b) => a.homepagePriority - b.homepagePriority);
}

export function selectProjectsForRoleLens(roleLensId, content) {
  if (roleLensId === "all") {
    return selectPublicProjects(content).sort((a, b) =>
      (a.homepagePriority ?? Number.MAX_SAFE_INTEGER) - (b.homepagePriority ?? Number.MAX_SAFE_INTEGER),
    );
  }
  if (!ROLE_LENS_IDS.includes(roleLensId)) return [];

  return selectPublicProjects(content)
    .filter((project) => (project.roleLensRelevance[roleLensId] ?? 0) > 0)
    .sort((a, b) =>
      (b.roleLensRelevance[roleLensId] ?? 0) - (a.roleLensRelevance[roleLensId] ?? 0)
      || (a.homepagePriority ?? Number.MAX_SAFE_INTEGER) - (b.homepagePriority ?? Number.MAX_SAFE_INTEGER),
    );
}

export function selectQuickProofs({ projects, claims, evidence, quickProofClaimIds }) {
  const readyProjectIds = new Set(selectPublicProjects({ projects, claims, evidence }).map((project) => project.id));
  const claimsById = new Map(claims.map((claim) => [claim.id, claim]));

  return quickProofClaimIds
    .map((id) => claimsById.get(id))
    .filter((claim) =>
      claim
      && claim.homepageEligible
      && isPublicVisibility(claim.visibility)
      && claim.evidenceStatus !== EVIDENCE_STATUS.NEEDS_VERIFICATION
      && readyProjectIds.has(claim.projectId),
    )
    .map(sanitizeClaim);
}

export function selectPublicExperience(experience) {
  return experience
    .filter((item) => isPublicVisibility(item.visibility))
    .map((item) => ({
      id: item.id,
      publicLabel: item.publicLabel,
      role: item.role,
      start: item.start,
      end: item.end,
    }));
}

export function selectPublicProfile(profile) {
  const resumeAvailable = profile.resume?.publicSafe === true;
  const resumeRequest = `mailto:${profile.contact.email}?subject=${encodeURIComponent("Resume request")}`;
  return {
    name: profile.name,
    englishName: profile.englishName,
    school: profile.school,
    major: profile.major,
    graduation: { ...profile.graduation },
    positioning: profile.positioning,
    primaryDirections: [...profile.primaryDirections],
    adjacentDirections: [...profile.adjacentDirections],
    contact: { email: profile.contact.email },
    publicLinks: { github: profile.publicLinks.github },
    resume: {
      available: resumeAvailable,
      href: resumeAvailable ? profile.resume.asset : resumeRequest,
      label: resumeAvailable ? "Resume" : "Request resume",
    },
  };
}

export function selectPublicRoleLenses(roleLenses) {
  return [
    { id: "all", label: "All", why: "按当前公开优先级浏览全部项目" },
    ...roleLenses.map((lens) => ({ id: lens.id, label: lens.label, why: lens.why })),
  ];
}

export function selectPublicCaseStudyProjects(content) {
  return selectPublicProjects(content).filter((project) => project.caseStudy.enabled);
}

export function selectPublicCaseStudyBySlug(slug, content) {
  return selectPublicCaseStudyProjects(content).find((project) => project.slug === slug) ?? null;
}

export function selectWorkIndex(content) {
  const projects = selectPublicProjects(content);
  return {
    featured: projects
      .filter((project) => project.placement === "FEATURED")
      .sort((a, b) => a.homepagePriority - b.homepagePriority),
    business: projects.filter((project) => ["SUPPORTING", "EXPERIENCE_EVIDENCE"].includes(project.placement)),
    lab: projects.filter((project) => project.placement === "LAB"),
  };
}

export function selectRelatedProjects(projectId, content, limit = 3) {
  const source = selectPublicCaseStudyProjects(content);
  const current = source.find((project) => project.id === projectId);
  if (!current) return [];
  return source
    .filter((project) => project.id !== projectId)
    .map((project) => ({
      project,
      relevance: ROLE_LENS_IDS.reduce(
        (total, lens) => total + Math.min(
          current.roleLensRelevance[lens] ?? 0,
          project.roleLensRelevance[lens] ?? 0,
        ),
        0,
      ),
    }))
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit)
    .map(({ project }) => project);
}
