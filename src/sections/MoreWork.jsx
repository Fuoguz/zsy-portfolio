import { AppLink } from "../components/navigation/AppLink.jsx";
import { FlowLine } from "../components/ledger/FlowLine.jsx";
import { Reveal } from "../components/ledger/Reveal.jsx";
import { ProjectStamps } from "../components/ledger/Stamp.jsx";
import { editorialFor } from "../utils/editorial.js";
import { projectTitleZh } from "../utils/presentation.js";

export function MoreWork({ projects, caseStudySlugs }) {
  if (!projects.length) return null;
  return (
    <section className="more wrap" id="experience" aria-labelledby="more-title">
      <header className="section-head">
        <p className="eyebrow">02 / 更多真实工作</p>
        <h2 id="more-title">大规模集训里的执行与工具</h2>
        <p className="section-head__lede">它们不是独立的产品故事，但说明了我在人数、期限和现场约束下怎样推进事情。</p>
      </header>
      <div className="more__grid">
        {projects.map((project, index) => {
          const copy = editorialFor(project);
          const linkable = caseStudySlugs.has(project.slug);
          return (
            <Reveal as="article" className="more__item" key={project.id} delay={index * 0.08}>
              <ProjectStamps project={project} />
              <h3>{projectTitleZh(project)}</h3>
              <p className="more__headline">{copy.headline ?? project.summary}</p>
              <FlowLine steps={copy.flow} label={`${projectTitleZh(project)}的工作内容`} />
              <p className="more__role"><span>我的角色</span>{project.publicRole}</p>
              {copy.flowNote ? <p className="more__note">{copy.flowNote}</p> : null}
              {linkable
                ? <AppLink to={`/work/${project.slug}`} className="text-link">阅读案例 →</AppLink>
                : <span className="more__nolink">作为经历佐证，暂无独立案例页</span>}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
