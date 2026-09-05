import { AppLink } from "../components/navigation/AppLink.jsx";
import { EvidenceFigure } from "../components/project/EvidenceFigure.jsx";
import { ProjectClassification } from "../components/project/ProjectClassification.jsx";
import { formatDeliveryStatus } from "../components/project/project-labels.js";
import { Arrow } from "../components/ui/Arrow.jsx";
import { SystemVisual } from "../components/visual/SystemVisual.jsx";
import { getPublicProject } from "../content/public.js";
import { projectTitleEn, projectTitleZh } from "../utils/presentation.js";

function NarrativeList({ title, items }) {
  if (!items.length) return null;
  return (
    <section className="production-case__narrative">
      <h2>{title}</h2>
      <ol>{items.map((item) => <li key={item}>{item}</li>)}</ol>
    </section>
  );
}

function EditorialNote({ eyebrow, title, text }) {
  if (!text) return null;
  return (
    <section className="production-case__note">
      <header><span>{eyebrow}</span><h2>{title}</h2></header>
      <p>{text}</p>
    </section>
  );
}

function ContributionBoundary({ boundary }) {
  const groups = [
    ["我负责", boundary.owned],
    ["我参与", boundary.contributed],
    ["协作边界", boundary.collaborated],
    ["不归因于本人", boundary.notClaimed],
  ].filter(([, items]) => items.length);
  if (!groups.length) return null;
  return (
    <section className="production-case__boundary">
      <header><span>贡献边界</span><h2>我的工作范围</h2></header>
      <div>
        {groups.map(([label, items]) => (
          <article key={label}><h3>{label}</h3><p>{items.join("；")}</p></article>
        ))}
      </div>
    </section>
  );
}

export function ProjectPage({ slug }) {
  const project = getPublicProject(slug);
  if (!project) return null;
  const heroClaims = project.claims.slice(0, 2);
  return (
    <main className="production-route production-case" id="main-content" data-project={project.slug}>
      <div className="production-case__opening">
      <header className="production-case__hero">
        <div className="production-case__hero-copy">
          <div className="production-case__hero-topline">
            <AppLink to="/work">← 返回项目索引</AppLink>
            <ProjectClassification values={project.classification} />
          </div>
          <p className="production-case__hero-kicker">案例研究 / 公开案例</p>
          <h1>{projectTitleZh(project)}<small>{projectTitleEn(project)}</small></h1>
          <p className="production-case__hero-summary"><strong>一句话结论</strong>{project.summary}</p>
          <dl className="production-case__hero-meta">
            <div><dt>角色</dt><dd>{project.publicRole}</dd></div>
            <div><dt>状态</dt><dd>{formatDeliveryStatus(project.deliveryStatus)}</dd></div>
            {heroClaims.map((claim) => <div key={claim.id}><dt>{claim.label}</dt><dd>{claim.value}<small className="production-case__claim-scope">{claim.publicCaption}</small></dd></div>)}
            {project.evidence[0] ? <div><dt>公开证据</dt><dd><a href={`#evidence-${project.evidence[0].id}`}>{project.evidence.length} 条 ↓</a></dd></div> : null}
          </dl>
        </div>
        <div className="production-case__hero-visual-stack">
          {project.evidence[0] ? <div className="production-case__hero-evidence"><EvidenceFigure evidence={project.evidence[0]} zoom index={1} total={project.evidence.length} /></div> : null}
          <SystemVisual variant={project.slug} slot="project-cover" caption="工作结构示意 · 非项目证据" />
        </div>
      </header>

      <EditorialNote eyebrow="项目背景" title="工作场景" text={project.context} />
      </div>

      {project.problem ? (
        <section className="production-case__problem">
          <span>问题 / 要解决什么</span><h2>{project.problem}</h2>
        </section>
      ) : null}
      <NarrativeList title="约束条件" items={project.constraints} />
      <ContributionBoundary boundary={project.contributionBoundary} />
      <NarrativeList title="关键决策" items={project.decisions} />
      <NarrativeList title="结果与影响" items={project.outcomes} />

      {project.claims.length ? (
        <section className="production-case__claims">
          <header><span>结果与口径</span><h2>关键结果</h2></header>
          <div>{project.claims.map((claim) => (
            <article key={claim.id}>
              <strong>{claim.value}</strong><span>{claim.label}</span><small>{claim.publicCaption}</small>
            </article>
          ))}</div>
        </section>
      ) : null}

      {project.evidence.length > 1 ? (
        <section className="production-case__evidence-section" aria-labelledby="case-evidence-title">
          <header><span>公开证据 / 来源</span><h2 id="case-evidence-title">项目材料</h2></header>
          <div className="production-case__evidence-grid">
            {project.evidence.slice(1).map((item, itemIndex) => (
              <EvidenceFigure evidence={item} key={item.id} zoom index={itemIndex + 2} total={project.evidence.length} />
            ))}
          </div>
        </section>
      ) : null}

      <EditorialNote eyebrow="复盘 / 反思" title="经验与判断" text={project.reflection} />

      {project.relatedProjects.length ? (
        <nav className="production-case__related" aria-label="相关项目">
          <span>相关项目</span>
          {project.relatedProjects.map((related) => (
            <AppLink to={`/work/${related.slug}`} key={related.id}>{projectTitleZh(related)} <Arrow /></AppLink>
          ))}
        </nav>
      ) : null}
    </main>
  );
}
