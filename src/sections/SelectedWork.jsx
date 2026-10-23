import { LayoutGroup, motion } from "framer-motion";

import { AppLink } from "../components/navigation/AppLink.jsx";
import { ProjectSheet } from "../components/ledger/ProjectSheet.jsx";
import { EASE } from "../components/ledger/Reveal.jsx";
import { ProjectStamps, ProvenanceStamp } from "../components/ledger/Stamp.jsx";
import { primaryVisual } from "../utils/visuals.js";
import { editorialFor, lensLabel, pad } from "../utils/editorial.js";
import { projectTitleEn, projectTitleZh } from "../utils/presentation.js";

export function LensChips({ lenses, active, onSelect, label = "按岗位视角排序", labelFor = lensLabel }) {
  return (
    <div className="lens" role="group" aria-label={label}>
      <span className="lens__label" aria-hidden="true">{label}</span>
      <div className="lens__chips">
        {lenses.map((lens) => (
          <button key={lens.id} type="button" aria-pressed={active === lens.id} onClick={() => onSelect(lens.id)}>
            {labelFor(lens.id)}
          </button>
        ))}
      </div>
    </div>
  );
}

const coverLabel = (project) => project.slug === "globridge" ? "真实公开作品 · 官网首页" : primaryVisual(project)?.provenanceLabel;

function CaseRow({ project, index, matched, lensId }) {
  const copy = editorialFor(project);
  return (
    <motion.article
      layout="position"
      transition={{ duration: 0.55, ease: EASE }}
      className={`case-row${matched ? "" : " is-dimmed"}`}
      data-project={project.slug}
    >
      <AppLink to={`/work/${project.slug}`} className="case-row__link" aria-label={`阅读案例：${projectTitleZh(project)}`}>
        <span className="case-row__index">{pad(index + 1)}</span>
        <div className="case-row__head">
          <ProjectStamps project={project} />
          <h3>{projectTitleZh(project)}<small lang="en">{projectTitleEn(project)}</small></h3>
          <p className="case-row__headline">{copy.headline}</p>
        </div>
        <dl className="case-row__story">
          <div><dt>问题</dt><dd>{copy.problem}</dd></div>
          <div><dt>我的做法</dt><dd>{copy.move}</dd></div>
          <div><dt>结果</dt><dd>{copy.result}</dd></div>
        </dl>
        <div className="case-row__role"><span>我的角色</span>{project.publicRole}</div>
        <figure className="case-row__visual">
          <ProjectSheet project={project} sizes="(max-width: 900px) 100vw, 40vw" />
          <figcaption><ProvenanceStamp label={coverLabel(project)} /></figcaption>
        </figure>
        <span className="case-row__cta" aria-hidden="true">阅读案例 →</span>
        {lensId !== "all" && matched ? <span className="case-row__match">匹配 · {lensLabel(lensId)}</span> : null}
      </AppLink>
    </motion.article>
  );
}

export function SelectedWork({ projects, lenses, lensId, onLens, total }) {
  return (
    <section className="selected wrap" id="work" aria-labelledby="work-title">
      <header className="section-head section-head--split">
        <div>
          <p className="eyebrow">01 / 代表项目</p>
          <h2 id="work-title">四个项目，看我怎么把问题做成系统</h2>
        </div>
        <AppLink to="/work" className="text-link">全部 {total} 个项目 →</AppLink>
      </header>
      <div id="role-lens">
        <LensChips lenses={lenses} active={lensId} onSelect={onLens} />
      </div>
      <p className="lens__status" role="status">
        {lensId === "all"
          ? "默认顺序：先看产品与流程，再看内容与全栈交付。"
          : `已按「${lensLabel(lensId)}」相关度重排，首项：${projectTitleZh(projects[0])}。`}
      </p>
      <LayoutGroup>
        <div className="selected__list">
          {projects.map((project, index) => (
            <CaseRow
              key={project.id}
              project={project}
              index={index}
              lensId={lensId}
              matched={lensId === "all" || (project.roleLensRelevance[lensId] ?? 0) > 0}
            />
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}
