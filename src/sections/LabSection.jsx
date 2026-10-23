import { AppLink } from "../components/navigation/AppLink.jsx";
import { Reveal } from "../components/ledger/Reveal.jsx";
import { ProjectSheet } from "../components/ledger/ProjectSheet.jsx";
import { Stamp } from "../components/ledger/Stamp.jsx";
import { editorialFor } from "../utils/editorial.js";
import { getCreativePresentation } from "../utils/creative-presentation.js";
import { projectTitleZh } from "../utils/presentation.js";
import { formatProjectClassification } from "../components/project/project-labels.js";

export function LabCard({ project, index = 0 }) {
  const { experience, video } = getCreativePresentation(project);
  const copy = editorialFor(project);
  const drafts = project.creativeDrafts;
  return (
    <Reveal as="article" className="lab-card" delay={index * 0.06} data-project={project.slug}>
      <AppLink to={`/work/${project.slug}`} className="lab-card__visual" tabIndex={-1} aria-hidden="true">
        <ProjectSheet project={project} sizes="(max-width: 900px) 100vw, 33vw" />
      </AppLink>
      <div className="lab-card__body">
        <Stamp tone={project.classification.includes("SIMULATION") ? "dashed" : "muted"}>{formatProjectClassification(project.classification)}</Stamp>
        <h3><AppLink to={`/work/${project.slug}`}>{projectTitleZh(project)}</AppLink></h3>
        <p>{copy.headline ?? project.summary}</p>
        <p className="lab-card__role">{project.publicRole}</p>
        {drafts ? <p className="lab-card__role">{drafts.hookGroups.reduce((sum, group) => sum + group.hooks.length, 0)} 条开头 · {drafts.scripts.length} 组脚本 · 无真实投放数据</p> : null}
        <div className="lab-card__actions">
          {experience ? <a href={experience.asset} target="_blank" rel="noreferrer">体验网页 ↗</a> : null}
          {video ? <a href={video.asset} target="_blank" rel="noreferrer">观看成片 ↗</a> : null}
        </div>
      </div>
    </Reveal>
  );
}

export function LabSection({ projects }) {
  if (!projects.length) return null;
  return (
    <section className="lab wrap" id="lab" aria-labelledby="lab-title">
      <header className="section-head section-head--split">
        <div>
          <p className="eyebrow">03 / 创意实验</p>
          <h2 id="lab-title">工作之外，我也在做的东西</h2>
        </div>
        <AppLink to="/creative" className="text-link">实验页 →</AppLink>
      </header>
      <div className="lab__grid">
        {projects.map((project, index) => <LabCard key={project.id} project={project} index={index} />)}
      </div>
    </section>
  );
}
