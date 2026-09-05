import { useMemo, useState } from "react";

import { AppLink } from "../components/navigation/AppLink.jsx";
import { ProjectClassification } from "../components/project/ProjectClassification.jsx";
import { ProjectVisual } from "../components/project/ProjectVisual.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { projectTitleEn, projectTitleZh, roleLabelZh } from "../utils/presentation.js";

const buildStory = (project) => [
  project.problem ? {
    id: "problem",
    label: "问题",
    title: project.problem,
    text: project.summary,
    tone: "cobalt",
  } : null,
  project.decisions[0] ? {
    id: "decision",
    label: "决策",
    title: project.decisions[0],
    text: project.decisions.slice(1).join("；") || project.summary,
    tone: "vermilion",
  } : null,
  project.outcomes[0] ? {
    id: "outcome",
    label: "结果",
    title: project.outcomes[0],
    text: project.outcomes.slice(1).join("；") || "结果仅按当前公开、可验证的边界呈现。",
    tone: "paper",
  } : null,
].filter(Boolean);

function FeaturedOpening({ project, activeLens }) {
  const story = useMemo(() => buildStory(project), [project]);
  const [activeStory, setActiveStory] = useState(story[0]);

  return (
    <article className={`final-hybrid__featured is-${activeStory.tone}`}>
      <div className="final-hybrid__featured-opening">
        <div className="final-hybrid__featured-narrative">
          <header className="final-hybrid__featured-heading">
            <p>01 / <ProjectClassification values={project.classification} /></p>
            <h2>{projectTitleZh(project)}<small>{projectTitleEn(project)}</small></h2>
            <div><span>我的角色</span><strong>{project.publicRole}</strong></div>
          </header>
          <div className="final-hybrid__story-tabs" role="group" aria-label={`${projectTitleZh(project)} 项目叙事`}>
            {story.map((item, index) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={activeStory.id === item.id}
                onClick={() => setActiveStory(item)}
              >
                <span>0{index + 1}</span><strong>{item.label}</strong>
              </button>
            ))}
          </div>
          <div className="final-hybrid__story-copy" aria-live="polite">
            <p>{activeStory.label}</p>
            <h3>{activeStory.title}</h3>
            <span>{activeStory.text}</span>
            <small>岗位视角：{roleLabelZh(activeLens)} — {activeLens.why}</small>
          </div>
          <AppLink className="final-hybrid__case-link" to={`/work/${project.slug}`}>查看完整案例 <Arrow /></AppLink>
        </div>
        <figure className="final-hybrid__featured-evidence">
          <ProjectVisual project={project} eager />
          <figcaption>{project.evidence[0]?.caption || "公开界面涉及内部信息，当前以事实摘要代替视觉材料。"}</figcaption>
        </figure>
      </div>
    </article>
  );
}

function SecondaryFeature({ project, recommended }) {
  return (
    <article className={`final-hybrid__project final-hybrid__project--reverse${recommended ? " is-recommended" : ""}`}>
      <figure>
        <ProjectVisual project={project} />
        <figcaption>{project.evidence[0]?.caption || "公开案例摘要"}</figcaption>
      </figure>
      <div className="final-hybrid__project-copy">
        <p>重点项目 / <ProjectClassification values={project.classification} /></p>
        <h3>{projectTitleZh(project)}</h3>
        <span>{project.summary}</span>
        <dl>
          {project.outcomes.slice(0, 2).map((item, index) => (
            <div key={item}><dt>{index === 0 ? "结果" : "证据"}</dt><dd>{item}</dd></div>
          ))}
        </dl>
        <AppLink to={`/work/${project.slug}`}>查看案例 <Arrow /></AppLink>
      </div>
    </article>
  );
}

export function FeaturedWork({ projects, activeLens, recommendedIds }) {
  if (!projects.length) return null;
  const [primary, ...secondary] = projects;
  return (
    <section className="final-hybrid__work" id="work" aria-labelledby="featured-work-title">
      <h2 className="visually-hidden" id="featured-work-title">重点项目</h2>
      <FeaturedOpening project={primary} activeLens={activeLens} />
      {secondary.length ? (
        <section className="final-hybrid__supporting final-hybrid__featured-secondary">
          <header><p>精选项目 / 值得先看</p><h2>真实工作，<br />看得见结果。</h2></header>
          {secondary.map((project) => (
            <SecondaryFeature key={project.id} project={project} recommended={recommendedIds.has(project.id)} />
          ))}
        </section>
      ) : null}
    </section>
  );
}
