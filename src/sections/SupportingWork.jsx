import { AppLink } from "../components/navigation/AppLink.jsx";
import { ProjectClassification } from "../components/project/ProjectClassification.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { projectTitleZh } from "../utils/presentation.js";

export function SupportingWork({ projects, caseStudySlugs }) {
  if (!projects.length) return null;
  return (
    <section className="production-supporting" aria-labelledby="supporting-title">
      <header><span>更多真实工作 / 实际交付</span><h2 id="supporting-title">规模化执行，<br />也把细节交付。</h2></header>
      <div className="production-supporting__list">
        {projects.map((project) => (
          <article key={project.id}>
            <ProjectClassification values={project.classification} />
            <h3>{projectTitleZh(project)}</h3>
            <p>{project.summary}</p>
            <dl><div><dt>角色</dt><dd>{project.publicRole}</dd></div></dl>
            {caseStudySlugs.has(project.slug) ? (
              <AppLink to={`/work/${project.slug}`}>阅读案例 <Arrow /></AppLink>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
