import { useMemo, useState } from "react";

import { AppLink } from "../components/navigation/AppLink.jsx";
import { ProjectClassification } from "../components/project/ProjectClassification.jsx";
import { ProjectVisual } from "../components/project/ProjectVisual.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { projectTitleEn, projectTitleZh, roleLabelZh } from "../utils/presentation.js";
import { projectOutcomeLabel } from "../utils/claim-presentation.js";

const storyTitles = {
  eaglehub: { problem: "关系变化时，权限与进度也要同步。", decision: "先理清角色，再组织关系与权限。" },
  "onboarding-automation": { problem: "入职信息，需要反复核对。", decision: "先只读验证，再由人工确认。" },
  "ai-content-growth-workflow": { problem: "内容生产，需要稳定且可重复的流程。", decision: "分开选题、初稿与人工校验。" },
  globridge: { problem: "交接不完整，沙盘仍需要接入官网。", decision: "保留可用后端，以独立模块接入。" },
};
const buildStory = (project) => [
  project.problem ? {
    id: "problem",
    label: "问题",
    title: storyTitles[project.slug]?.problem || project.problem,
    text: storyTitles[project.slug]?.problem ? project.problem : project.summary,
    tone: "cobalt",
  } : null,
  project.decisions[0] ? {
    id: "decision",
    label: "决策",
    title: storyTitles[project.slug]?.decision || project.decisionStory?.title || project.decisions[0],
    text: project.decisionStory?.rationale || project.decisions.join("；") || project.summary,
    tone: "vermilion",
  } : null,
  project.outcomes[0] ? {
    id: "outcome",
    label: projectOutcomeLabel(project),
    title: project.outcomes[0],
    text: project.outcomes.slice(1).join("；"),
    tone: "paper",
  } : null,
].filter(Boolean);

function FeaturedOpening({ project, activeLens }) {
  const story = useMemo(() => buildStory(project), [project]);
  const [activeStory, setActiveStory] = useState(story[0]);

  return (
    <article className={`final-hybrid__featured is-${activeStory.tone}`} data-project={project.slug}>
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
            {activeStory.text && <span>{activeStory.text}</span>}
            {activeLens.id !== "all" && <small>岗位视角：{roleLabelZh(activeLens)} — {activeLens.why}</small>}
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
    <article className={`final-hybrid__project final-hybrid__project--reverse${recommended ? " is-recommended" : ""}`} data-project={project.slug}>
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
            <div key={item}><dt>{projectOutcomeLabel(project, index)}</dt><dd>{item}</dd></div>
          ))}
        </dl>
        <AppLink to={`/work/${project.slug}`}>查看案例 <Arrow /></AppLink>
      </div>
    </article>
  );
}

export function FeaturedWork({ projects, activeLens, recommendedIds, children }) {
  if (!projects.length) return null;
  const [primary, ...secondary] = projects;
  return (
    <section className="final-hybrid__work" id="work" aria-labelledby="featured-work-title">
      <header className="portfolio-work-heading">
        <div><p>SELECTED WORK / {projects.length} 个项目</p><h2 id="featured-work-title">代表项目</h2></div>
        <AppLink to="/work">查看全部项目 <Arrow /></AppLink>
      </header>
      {children}
      <FeaturedOpening key={primary.id} project={primary} activeLens={activeLens} />
      {secondary.length ? (
        <section className="final-hybrid__supporting final-hybrid__featured-secondary">
          {secondary.map((project) => (
            <SecondaryFeature key={project.id} project={project} recommended={recommendedIds.has(project.id)} />
          ))}
        </section>
      ) : null}
    </section>
  );
}
