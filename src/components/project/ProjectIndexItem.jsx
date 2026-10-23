import { AppLink } from "../navigation/AppLink.jsx";
import { Arrow } from "../ui/Arrow.jsx";
import { ProjectClassification } from "./ProjectClassification.jsx";
import { ProjectVisual } from "./ProjectVisual.jsx";
import { projectTitleEn, projectTitleZh } from "../../utils/presentation.js";
import { projectOutcomeLabel } from "../../utils/claim-presentation.js";
import { CreativeProject } from "./CreativeProject.jsx";

export function ProjectIndexItem({ project, variant = "business", linkable = true, index }) {
  if (project.placement === "LAB") return <CreativeProject project={project} />;
  return (
    <article className={`production-index-item is-${variant}`} data-project={project.slug}>
      {variant === "featured" ? (
        <figure>
          <ProjectVisual project={project} />
          <figcaption><strong>项目材料</strong>{project.evidence[0]?.caption || "项目概览"}</figcaption>
        </figure>
      ) : null}
      <div className="production-index-item__copy">
        <p>{index ? `${String(index).padStart(2, "0")} / ` : ""}<ProjectClassification values={project.classification} /></p>
        <h2>{projectTitleZh(project)}{variant === "featured" ? <small>{projectTitleEn(project)}</small> : null}</h2>
        <p>{project.summary}</p>
        <dl>
          <div><dt>角色</dt><dd>{project.publicRole}</dd></div>
          {project.outcomes[0] ? <div><dt>{projectOutcomeLabel(project)}</dt><dd>{project.outcomes[0]}</dd></div> : null}
        </dl>
        {linkable ? <AppLink to={`/work/${project.slug}`}>查看完整案例 <Arrow /></AppLink> : null}
      </div>
    </article>
  );
}
