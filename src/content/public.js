import { publicContent } from "./generated-public-data.js";

const ROLE_LENS_IDS = Object.freeze(["aiProduct", "productOps", "projectOps", "growth", "aiNative"]);
const byHomepagePriority = (a, b) =>
  (a.homepagePriority ?? Number.MAX_SAFE_INTEGER) - (b.homepagePriority ?? Number.MAX_SAFE_INTEGER);

function selectProjectsForRole(roleLensId) {
  if (roleLensId === "all") return [...publicContent.projects].sort(byHomepagePriority);
  if (!ROLE_LENS_IDS.includes(roleLensId)) return [];
  return publicContent.projects
    .filter((project) => (project.roleLensRelevance[roleLensId] ?? 0) > 0)
    .sort((a, b) =>
      (b.roleLensRelevance[roleLensId] ?? 0) - (a.roleLensRelevance[roleLensId] ?? 0)
      || byHomepagePriority(a, b),
    );
}

function selectCaseStudies() {
  return publicContent.projects.filter((project) => project.caseStudy.enabled);
}

function selectRelatedProjects(projectId, limit = 3) {
  const source = selectCaseStudies();
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

function selectWorkIndex() {
  return {
    featured: publicContent.projects.filter((project) => project.placement === "FEATURED").sort(byHomepagePriority),
    business: publicContent.projects.filter((project) => ["SUPPORTING", "EXPERIENCE_EVIDENCE"].includes(project.placement)),
    lab: publicContent.projects.filter((project) => project.placement === "LAB"),
  };
}

export function getHomePageContent() {
  const homepageProjects = publicContent.projects
    .filter((project) => Number.isInteger(project.homepagePriority))
    .sort(byHomepagePriority);
  return {
    profile: publicContent.profile,
    roleLenses: publicContent.roleLenses,
    startProjects: homepageProjects,
    featuredProjects: homepageProjects,
    supportingProjects: publicContent.projects.filter((project) => ["SUPPORTING", "EXPERIENCE_EVIDENCE"].includes(project.placement)),
    labProjects: publicContent.projects.filter((project) => project.placement === "LAB"),
    quickProofs: publicContent.quickProofs,
    experience: publicContent.experience,
    allProjects: publicContent.projects,
  };
}

export function getWorkIndexContent() {
  return selectWorkIndex();
}

export function getPublicProject(slug) {
  const project = selectCaseStudies().find((item) => item.slug === slug);
  if (!project) return null;
  return { ...project, relatedProjects: selectRelatedProjects(project.id) };
}

export function getPublicProjectSlugs() {
  return selectCaseStudies().map((project) => project.slug);
}

export function getRoleViewContent(roleLensId) {
  return {
    lens: publicContent.roleLenses.find((lens) => lens.id === roleLensId) ?? publicContent.roleLenses[0],
    projects: selectProjectsForRole(roleLensId),
    allProjects: selectProjectsForRole("all"),
  };
}

export function getRolePageContent(mode) {
  if (mode === "creative") {
    return {
      eyebrow: "Creative Lab",
      title: "Creative range, not primary proof.",
      description: "实验、交互与影像展示跨媒介能力，并与真实业务项目保持清晰层级。",
      projects: selectWorkIndex().lab,
    };
  }

  const lensIds = mode === "growth" ? ["growth"] : ["aiProduct", "productOps"];
  const seen = new Map();
  for (const lensId of lensIds) {
    for (const project of selectProjectsForRole(lensId)) {
      const score = project.roleLensRelevance[lensId] ?? 0;
      const existing = seen.get(project.id);
      if (!existing || score > existing.score) seen.set(project.id, { project, score });
    }
  }
  const projects = [...seen.values()].sort((a, b) => b.score - a.score).map(({ project }) => project);

  return mode === "growth"
    ? {
        eyebrow: "Growth / Content Operations",
        title: "Systems behind consistent content.",
        description: "聚焦内容机制、业务规模与生产效率，项目事实与主 Portfolio 完全共享。",
        projects,
      }
    : {
        eyebrow: "AI Product / Product Ops",
        title: "From business rules to usable systems.",
        description: "聚焦需求框架、流程协作、可验证原型与持续运营。",
        projects,
      };
}

export function getAboutPageContent() {
  return { profile: publicContent.profile, experience: publicContent.experience };
}

export function getCapabilityEvidenceMap() {
  const projectsById = new Map(
    selectCaseStudies().map((project) => [project.id, project]),
  );
  return publicContent.capabilities
    .map((capability) => ({
      ...capability,
      projects: capability.projectIds
        .map((projectId) => projectsById.get(projectId))
        .filter((project) => project?.evidence.length)
        .map((project) => ({
          id: project.id,
          slug: project.slug,
          shortTitle: project.shortTitle,
          evidence: project.evidence.map((item) => ({
            id: item.id,
            caption: item.caption,
            provenanceLabel: item.provenanceLabel,
          })),
        })),
    }))
    .filter((capability) => capability.projects.length);
}
