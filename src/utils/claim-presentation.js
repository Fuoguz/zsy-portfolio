import { CLAIM_KIND } from "../content/schema.js";

const kindLabels = {
  [CLAIM_KIND.EFFICIENCY]: "效率改善",
  [CLAIM_KIND.WORK_OUTPUT]: "持续产出",
  [CLAIM_KIND.CONTENT_RESULT]: "内容表现",
  [CLAIM_KIND.TEST_RESULT]: "样本验证",
  [CLAIM_KIND.BUSINESS_CONTEXT]: "业务背景",
  [CLAIM_KIND.BUSINESS_RULE]: "业务规则",
};

export const claimKindLabel = kind => kindLabels[kind];

export function getCaseClaimGroups(project) {
  const context = project.claims.filter(claim => [CLAIM_KIND.BUSINESS_CONTEXT, CLAIM_KIND.BUSINESS_RULE].includes(claim.kind));
  const results = project.claims.filter(claim => !context.includes(claim));
  return { context, hero: results.slice(0, 2), remainingResults: results.slice(2) };
}

export function projectOutcomeLabel(project, index = 0) {
  const labels = {
    eaglehub: ["实际使用"],
    "team-formation-platform": ["实际使用"],
    "onboarding-automation": ["样本验证"],
    "ai-content-growth-workflow": ["效率改善", "产出节奏"],
    globridge: ["网站交付", "参与范围"],
  };
  return labels[project.slug]?.[index] || (project.placement === "LAB" ? "作品产出" : "交付说明");
}
