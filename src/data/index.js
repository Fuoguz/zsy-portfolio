import { experience } from "./experience.js";
import { capabilities } from "./capabilities.js";
import { profile } from "./profile.js";
import { claims, evidence, projects } from "./projects.js";
import { quickProofClaimIds } from "./quick-proofs.js";
import { roleLenses } from "./role-lenses.js";

export { capabilities, experience, profile, claims, evidence, projects, quickProofClaimIds, roleLenses };

export const contentData = Object.freeze({
  projects,
  claims,
  evidence,
  quickProofClaimIds,
});
