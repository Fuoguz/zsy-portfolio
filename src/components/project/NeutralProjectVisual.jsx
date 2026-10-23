import { ProjectClassification } from "./ProjectClassification.jsx";
import { projectTitleZh } from "../../utils/presentation.js";

export function NeutralProjectVisual({ project, compact = false }) {
  return (
    <div className={`final-hybrid__neutral-evidence${compact ? " is-compact" : ""}`}>
      <span>项目概览</span>
      <strong>{projectTitleZh(project)}</strong>
      <p>{project.summary}</p>
      <small><ProjectClassification values={project.classification} /></small>
    </div>
  );
}
