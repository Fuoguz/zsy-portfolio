import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { AppLink } from "../components/navigation/AppLink.jsx";
import { FlowLine } from "../components/ledger/FlowLine.jsx";
import { EASE } from "../components/ledger/Reveal.jsx";
import { editorialFor, pad } from "../utils/editorial.js";
import { publicResumeHref } from "../utils/paths.js";
import { projectTitleZh } from "../utils/presentation.js";

const CYCLE_MS = 7000;

function FlowConsole({ projects }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  // Auto-advance only where the panel sits beside the copy; on narrow screens a
  // changing panel height would shift the content the reader is looking at.
  const [paused, setPaused] = useState(() => !window.matchMedia("(min-width: 1100px)").matches);
  const consoleRef = useRef(null);
  const project = projects[active];
  const copy = editorialFor(project);

  useEffect(() => {
    if (reduceMotion || paused) return undefined;
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % projects.length), CYCLE_MS);
    return () => window.clearTimeout(timer);
  }, [active, paused, reduceMotion, projects.length]);

  return (
    <div
      ref={consoleRef}
      className={`console${paused || reduceMotion ? " is-paused" : ""}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setPaused(false); }}
      onFocus={() => setPaused(true)}
      onBlur={(event) => { if (!consoleRef.current?.contains(event.relatedTarget) && window.matchMedia("(min-width: 1100px)").matches) setPaused(false); }}
    >
      <div className="console__bar">
        <span>运行台账 / WORK LOG</span>
        <span aria-hidden="true">{pad(active + 1)} — {pad(projects.length)}</span>
      </div>
      <div className="console__tabs" role="tablist" aria-label="代表项目的工作流程">
        {projects.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`console-tab-${item.id}`}
            aria-selected={index === active}
            aria-controls="console-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
              if (!step) return;
              event.preventDefault();
              const next = (active + step + projects.length) % projects.length;
              setActive(next);
              consoleRef.current?.querySelector(`#console-tab-${projects[next].id}`)?.focus();
            }}
          >
            <span>{pad(index + 1)}</span>{item.shortTitle}
            {index === active && !paused && !reduceMotion ? <i className="console__timer" style={{ animationDuration: `${CYCLE_MS}ms` }} /> : null}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={project.id}
          id="console-panel"
          role="tabpanel"
          aria-labelledby={`console-tab-${project.id}`}
          className="console__panel"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <p className="console__kicker">{copy.kicker}</p>
          <h2 className="console__title">{projectTitleZh(project)}</h2>
          <FlowLine steps={copy.flow} tone="ink" label={`${projectTitleZh(project)}的工作流程`} />
          <dl className="console__io">
            <div><dt>输入 / 问题</dt><dd>{copy.problem}</dd></div>
            <div><dt>输出 / 结果</dt><dd>{copy.result}</dd></div>
          </dl>
          <div className="console__foot">
            <small>{copy.flowNote}</small>
            <AppLink to={`/work/${project.slug}`} className="console__link">阅读案例 <span aria-hidden="true">→</span></AppLink>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function Hero({ profile, projects }) {
  const reduceMotion = useReducedMotion();
  const rise = (delay) => reduceMotion ? {} : {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: EASE, delay },
  };
  return (
    <section className="hero" aria-labelledby="home-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <motion.p className="hero__meta" {...rise(0)}>
            <span>个人作品集</span><span>{profile.graduation.zh}</span><span>{profile.school} · {profile.major}</span>
          </motion.p>
          <motion.h1 id="home-title" className="hero__name" {...rise(0.08)}>
            {profile.name}<span lang="en">{profile.englishName}</span>
          </motion.h1>
          <motion.p className="hero__statement" {...rise(0.16)}>
            把业务中的<em>流程</em>、<em>数据</em>与<em>协作</em>问题，转化为可执行的运营方案、产品原型和 AI 辅助工具。
          </motion.p>
          <motion.ul className="hero__directions" aria-label="求职方向" {...rise(0.24)}>
            {profile.primaryDirections.map((item, index) => <li key={item}><span>{pad(index + 1)}</span>{item}</li>)}
          </motion.ul>
          <motion.div className="hero__actions" {...rise(0.32)}>
            <AppLink to="/#work" className="btn btn--signal">看代表项目 <span aria-hidden="true">↓</span></AppLink>
            <a href={publicResumeHref(profile.resume)} className="btn btn--ghost" download>下载简历 <span aria-hidden="true">PDF</span></a>
          </motion.div>
        </div>
        <motion.div className="hero__console" {...rise(0.2)}>
          <FlowConsole projects={projects} />
        </motion.div>
      </div>
    </section>
  );
}
