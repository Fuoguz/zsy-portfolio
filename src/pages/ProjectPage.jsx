import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

import { AppLink } from "../components/navigation/AppLink.jsx";
import { EvidenceFigure } from "../components/project/EvidenceFigure.jsx";
import { GlobridgePreview } from "../components/project/GlobridgePreview.jsx";
import { CreativeDrafts } from "../components/project/CreativeDrafts.jsx";
import { formatDeliveryStatus } from "../components/project/project-labels.js";
import { FlowLine } from "../components/ledger/FlowLine.jsx";
import { primaryVisual } from "../utils/visuals.js";
import { Reveal } from "../components/ledger/Reveal.jsx";
import { ProjectStamps, Stamp } from "../components/ledger/Stamp.jsx";
import { getPublicProject, getPublicProjectSlugs, getWorkIndexContent } from "../content/public.js";
import { claimKindLabel, getCaseClaimGroups } from "../utils/claim-presentation.js";
import { getCreativePresentation } from "../utils/creative-presentation.js";
import { editorialFor, pad } from "../utils/editorial.js";
import { projectTitleEn, projectTitleZh } from "../utils/presentation.js";

const caseSlugs = new Set(getPublicProjectSlugs());
const indexContent = getWorkIndexContent();
const READING_ORDER = [...indexContent.featured, ...indexContent.business, ...indexContent.lab]
  .filter((project) => caseSlugs.has(project.slug));

function Section({ id, index, label, title, children }) {
  return (
    <Reveal as="section" className="case-section" id={id} aria-labelledby={`${id}-title`}>
      <header className="case-section__head">
        <span className="case-section__index">{pad(index)}</span>
        <p className="eyebrow">{label}</p>
        <h2 id={`${id}-title`}>{title}</h2>
      </header>
      <div className="case-section__body">{children}</div>
    </Reveal>
  );
}

function Contribution({ boundary }) {
  const groups = [
    ["owned", "我负责", "●", boundary.owned],
    ["contributed", "我参与", "◐", boundary.contributed],
    ["collaborated", "协作推进", "○", boundary.collaborated],
    ["not-claimed", "不归因于我", "×", boundary.notClaimed],
  ].filter(([, , , items]) => items.length);
  return (
    <div className="contribution">
      {groups.map(([key, label, mark, items]) => (
        <div className={`contribution__col contribution__col--${key}`} key={key}>
          <h3><span aria-hidden="true">{mark}</span>{label}</h3>
          <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}

function DecisionStory({ story }) {
  return (
    <div className="decision">
      <p className="decision__problem">{story.problem}</p>
      <h3 className="label">考虑过的 {story.options.length} 种方案</h3>
      <ol className="decision__options">
        {story.options.map((option, index) => (
          <li key={option} className={index === story.selectedOption ? "is-selected" : undefined}>
            <span className="decision__tag">方案 {String.fromCharCode(65 + index)}{index === story.selectedOption ? " · 最终采用" : ""}</span>
            <p>{option}</p>
          </li>
        ))}
      </ol>
      <div className="decision__why">
        <h3 className="label">为什么这样选</h3>
        <p>{story.rationale}</p>
      </div>
      <div className="decision__checks">
        <h3 className="label">接入前逐项核对</h3>
        <ul>{story.validation.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
        <p className="decision__after">{story.outcome}</p>
      </div>
      <small className="decision__source"><Stamp tone="ok">{story.publicCaption}</Stamp>不含提交记录或量化效果</small>
    </div>
  );
}

function Outline({ items }) {
  const [active, setActive] = useState(items[0]?.id);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });
  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-20% 0px -60% 0px" });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);
  return (
    <nav className="outline" aria-label="案例目录">
      <motion.span className="outline__progress" style={{ scaleY: progress }} aria-hidden="true" />
      <p className="eyebrow">目录</p>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}><span>{pad(index + 1)}</span>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function HeroVisual({ project }) {
  if (project.slug === "globridge") {
    return (
      <figure className="case-visual case-visual--browser" id="evidence-globridge-home">
        <GlobridgePreview project={project} />
        <figcaption><Stamp tone="ok">真实公开作品</Stamp>官网录屏 / 截图 · 2026-09-10 · 证明页面在运行，不代表官网商业数据或我的全部开发范围。</figcaption>
      </figure>
    );
  }
  const visual = primaryVisual(project);
  if (!visual) return null;
  const index = project.evidence.findIndex((item) => item.id === visual.id) + 1;
  return (
    <div className="case-visual">
      <EvidenceFigure evidence={visual} zoom index={index} total={project.evidence.length} />
    </div>
  );
}

export function ProjectPage({ slug }) {
  const project = getPublicProject(slug);
  if (!project) return null;
  const copy = editorialFor(project);
  const isLab = project.placement === "LAB";
  const { hero: heroClaims, remainingResults, context: contextClaims } = getCaseClaimGroups(project);
  const { video, experience } = isLab ? getCreativePresentation(project) : {};
  const liveDemo = project.evidence.find((item) => item.type === "LIVE_DEMO" && item.publicSafe);
  const heroVisual = project.slug === "globridge" ? project.evidence.find((item) => item.id === "globridge-home") : primaryVisual(project);
  const materials = project.evidence.filter((item) =>
    ["SCREENSHOT", "PROCESS_DIAGRAM"].includes(item.type) && item.id !== heroVisual?.id,
  );

  const hasContext = Boolean(project.context || project.problem || project.constraints.length || contextClaims.length);
  const hasContribution = Object.values(project.contributionBoundary).some((items) => items.length);
  const hasProcess = Boolean(project.decisionStory || project.decisions.length || project.reflection);
  const hasResults = project.outcomes.length > 0 || remainingResults.length > 0;

  const sections = [
    hasContext && { id: "case-context", label: "背景与问题" },
    hasContribution && { id: "case-contribution", label: "我的工作范围" },
    hasProcess && { id: "case-process", label: project.decisionStory ? "关键取舍" : "做法与判断" },
    project.creativeDrafts && { id: "case-drafts", label: "脚本草稿" },
    hasResults && { id: "case-results", label: "结果" },
    materials.length > 0 && { id: "case-materials", label: "项目材料" },
  ].filter(Boolean);
  const number = (id) => sections.findIndex((item) => item.id === id) + 1;

  const position = READING_ORDER.findIndex((item) => item.slug === project.slug);
  const next = READING_ORDER[(position + 1) % READING_ORDER.length];
  const previous = position > 0 ? READING_ORDER[position - 1] : null;

  return (
    <main className={`page page--case${isLab ? " is-lab" : ""}`} id="main-content" data-project={project.slug}>
      <header className="case-hero wrap">
        <div className="case-hero__top">
          <AppLink to="/work" className="back-link">← 作品台账</AppLink>
          <ProjectStamps project={project} />
        </div>
        <p className="eyebrow">{copy.kicker ?? (isLab ? "创意实验" : "案例")}</p>
        <h1 className="case-hero__title">{projectTitleZh(project)}<small lang="en">{projectTitleEn(project)}</small></h1>
        {copy.headline ? <p className="case-hero__headline">{copy.headline}</p> : null}
        <div className="case-hero__grid">
          <p className="case-hero__summary">{project.summary}</p>
          <dl className="case-hero__meta">
            <div><dt>我的角色</dt><dd>{project.publicRole}</dd></div>
            <div><dt>状态</dt><dd>{formatDeliveryStatus(project.deliveryStatus)}</dd></div>
            {heroClaims.map((claim) => (
              <div key={claim.id} className="is-metric">
                <dt>{claimKindLabel(claim.kind)} · {claim.label}</dt>
                <dd><strong>{claim.value}</strong><small>{claim.publicCaption}</small></dd>
              </div>
            ))}
          </dl>
        </div>
        {(liveDemo || video || experience) ? (
          <div className="case-hero__actions">
            {liveDemo ? <a className="btn btn--signal" href={liveDemo.asset} target="_blank" rel="noreferrer">{liveDemo.caption.replace(" ↗", "")} <span aria-hidden="true">↗</span></a> : null}
            {video ? <a className="btn btn--signal" href={video.asset} target="_blank" rel="noreferrer">在 Bilibili 观看成片 <span aria-hidden="true">↗</span></a> : null}
          </div>
        ) : null}
      </header>

      <div className="wrap"><HeroVisual project={project} /></div>

      {copy.flow?.length ? (
        <section className="wrap" aria-labelledby="case-flow-title"><div className="case-flow">
          <h2 id="case-flow-title" className="label">工作流程</h2>
          <FlowLine steps={copy.flow} label={`${projectTitleZh(project)}的工作流程`} />
          {copy.flowNote ? <p className="case-flow__note">{copy.flowNote}</p> : null}
        </div></section>
      ) : null}

      <div className="case-body wrap">
        {sections.length > 1 ? <aside className="case-body__aside"><Outline items={sections} /></aside> : null}
        <div className="case-body__main">
          {hasContext ? (
            <Section id="case-context" index={number("case-context")} label="背景 / 问题" title="要解决什么">
              <div className="prose-grid">
                {project.context ? <div><h3 className="label">场景</h3><p>{project.context}</p></div> : null}
                {project.problem ? <div><h3 className="label">问题</h3><p className="lead">{project.problem}</p></div> : null}
              </div>
              {contextClaims.length ? (
                <dl className="figures">
                  {contextClaims.map((claim) => (
                    <div key={claim.id}>
                      <dt>{claim.label}</dt>
                      <dd><strong>{claim.value}</strong><small>{claimKindLabel(claim.kind)} · {claim.publicCaption}</small></dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {project.constraints.length ? (
                <div className="constraints">
                  <h3 className="label">约束</h3>
                  <ul>{project.constraints.map((item, index) => <li key={item}><span>{pad(index + 1)}</span>{item}</li>)}</ul>
                </div>
              ) : null}
            </Section>
          ) : null}

          {hasContribution ? (
            <Section id="case-contribution" index={number("case-contribution")} label="贡献边界" title="哪些是我做的">
              <Contribution boundary={project.contributionBoundary} />
            </Section>
          ) : null}

          {hasProcess ? (
            <Section
              id="case-process"
              index={number("case-process")}
              label="推进过程"
              title={project.decisionStory ? project.decisionStory.title : "我是怎么做的"}
            >
              {project.decisionStory ? <DecisionStory story={project.decisionStory} /> : null}
              {project.decisions.length ? (
                <div className={project.decisionStory ? "steps steps--compact" : "steps"}>
                  {project.decisionStory ? <h3 className="label">整个交付过程</h3> : null}
                  <ol>{project.decisions.map((item, index) => {
                    const split = item.indexOf("：");
                    return (
                      <li key={item}>
                        <span className="steps__no">{pad(index + 1)}</span>
                        {split > 0 && split < 6
                          ? <p><strong>{item.slice(0, split)}</strong>{item.slice(split + 1)}</p>
                          : <p>{item}</p>}
                      </li>
                    );
                  })}</ol>
                </div>
              ) : null}
              {project.reflection ? (
                <blockquote className="reflection">
                  <p>{project.reflection}</p>
                  <cite>复盘</cite>
                </blockquote>
              ) : null}
            </Section>
          ) : null}

          {project.creativeDrafts ? <CreativeDrafts drafts={project.creativeDrafts} /> : null}

          {hasResults ? (
            <Section id="case-results" index={number("case-results")} label="结果" title="交付了什么">
              {remainingResults.length ? (
                <dl className="figures figures--results">
                  {remainingResults.map((claim) => (
                    <div key={claim.id}>
                      <dt>{claim.label}</dt>
                      <dd><strong>{claim.value}</strong><small>{claimKindLabel(claim.kind)} · {claim.publicCaption}</small></dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {project.outcomes.length ? (
                <ul className="outcomes">{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : null}
            </Section>
          ) : null}

          {materials.length ? (
            <Section id="case-materials" index={number("case-materials")} label="材料 / 来源" title="项目材料">
              <p className="materials__note">每张材料都标明来源：真实脱敏截图、基于真实流程的重绘，或匿名演示数据。点击可查看大图。</p>
              <div className="materials">
                {materials.map((item) => (
                  <EvidenceFigure
                    key={item.id}
                    evidence={item}
                    zoom
                    index={project.evidence.findIndex((entry) => entry.id === item.id) + 1}
                    total={project.evidence.length}
                  />
                ))}
              </div>
            </Section>
          ) : null}
        </div>
      </div>

      <nav className="case-next wrap" aria-label="继续阅读">
        {previous ? (
          <AppLink to={`/work/${previous.slug}`} className="case-next__prev">
            <span className="eyebrow">上一个</span>
            <strong>{projectTitleZh(previous)}</strong>
          </AppLink>
        ) : (
          <AppLink to="/work" className="case-next__prev">
            <span className="eyebrow">返回</span>
            <strong>作品台账</strong>
          </AppLink>
        )}
        <AppLink to={`/work/${next.slug}`} className="case-next__next">
          <span className="eyebrow">{position === READING_ORDER.length - 1 ? "回到第一个案例" : "下一个"}</span>
          <strong>{projectTitleZh(next)}</strong>
          <span className="case-next__headline">{editorialFor(next).headline ?? next.summary}</span>
          <span className="case-next__arrow" aria-hidden="true">→</span>
        </AppLink>
      </nav>
    </main>
  );
}
