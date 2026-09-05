import { AppLink } from "../components/navigation/AppLink.jsx";
import { formatProjectClassification } from "../components/project/project-labels.js";
import { ProjectVisual } from "../components/project/ProjectVisual.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { projectTitleZh } from "../utils/presentation.js";

export function StartHere({ projects, activeProject, recommendedIds, onSelect }) {
  return (
    <aside className="final-hybrid__start" aria-label="重点项目导航">
      <div className="final-hybrid__start-heading">
        <p><span>精选入口 / 建议先看</span>从这里开始</p>
        <span>{String(projects.length).padStart(2, "0")} 个重点项目</span>
      </div>
      <figure className="final-hybrid__start-preview" id="start-preview" aria-live="polite">
        <ProjectVisual key={activeProject.id} project={activeProject} compact eager />
        <figcaption>
          <span><b>预览</b>{projectTitleZh(activeProject)}</span>
          <AppLink to={`/work/${activeProject.slug}`}>查看项目 <Arrow /></AppLink>
        </figcaption>
      </figure>
      <div className="final-hybrid__start-list">
        {projects.map((project, index) => {
          const recommended = recommendedIds.has(project.id);
          return (
            <AppLink
              to={`/work/${project.slug}`}
              className={recommended ? "is-recommended" : ""}
              key={project.id}
              onFocus={() => onSelect(project)}
              onMouseEnter={() => onSelect(project)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{projectTitleZh(project)}</strong>
              <small>{formatProjectClassification(project.classification)}</small>
              <i>查看案例 ↗</i>
            </AppLink>
          );
        })}
      </div>
    </aside>
  );
}
