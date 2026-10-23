import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import { AppLink } from "../navigation/AppLink.jsx";
import { ProjectSheet } from "./ProjectSheet.jsx";
import { ProjectStamps } from "./Stamp.jsx";
import { EASE } from "./Reveal.jsx";
import { editorialFor, pad } from "../../utils/editorial.js";
import { projectTitleEn, projectTitleZh } from "../../utils/presentation.js";

function LedgerRow({ project, index, linkable, onPreview }) {
  const copy = editorialFor(project);
  const body = (
    <>
      <span className="ledger__index">{pad(index)}</span>
      <span className="ledger__title">
        <strong>{projectTitleZh(project)}</strong>
        <small lang="en">{projectTitleEn(project)}</small>
      </span>
      <span className="ledger__headline">{copy.headline ?? project.summary}</span>
      <span className="ledger__role">{project.publicRole}</span>
      <span className="ledger__stamps"><ProjectStamps project={project} /></span>
      <span className="ledger__thumb" aria-hidden="true"><ProjectSheet project={project} sizes="40vw" /></span>
      <span className="ledger__go" aria-hidden="true">{linkable ? "→" : "—"}</span>
    </>
  );
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`ledger__row${linkable ? "" : " is-static"}`}
      onPointerEnter={() => onPreview(project)}
      onPointerLeave={() => onPreview(null)}
      data-project={project.slug}
    >
      {linkable
        ? <AppLink to={`/work/${project.slug}`} className="ledger__cell" onFocus={() => onPreview(project)} onBlur={() => onPreview(null)}>{body}</AppLink>
        : <div className="ledger__cell">{body}<span className="visually-hidden">（暂无独立案例页）</span></div>}
    </motion.li>
  );
}

// Desktop-only floating preview that trails the pointer across the ledger.
export function WorkLedger({ groups, caseStudySlugs }) {
  const [preview, setPreview] = useState(null);
  const floatRef = useRef(null);
  const frame = useRef(0);
  const onMove = (event) => {
    if (event.pointerType !== "mouse" || !floatRef.current) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      floatRef.current?.style.setProperty("--x", `${clientX}px`);
      floatRef.current?.style.setProperty("--y", `${clientY}px`);
    });
  };
  const offsets = groups.map((_, index) => groups.slice(0, index).reduce((sum, group) => sum + group.projects.length, 0));
  return (
    <div className="ledger" onPointerMove={onMove}>
      {groups.map((group, groupIndex) => (
        <section className="ledger__group" key={group.id} aria-labelledby={`ledger-${group.id}`}>
          {group.title ? (
            <header className="ledger__group-head">
              <h2 id={`ledger-${group.id}`}>{group.title}</h2>
              {group.note ? <p>{group.note}</p> : null}
              <span>{pad(group.projects.length)}</span>
            </header>
          ) : <h2 id={`ledger-${group.id}`} className="visually-hidden">筛选结果</h2>}
          <ol className="ledger__list">
            <AnimatePresence initial={false}>
              {group.projects.map((project, index) => (
                  <LedgerRow
                    key={project.id}
                    project={project}
                    index={offsets[groupIndex] + index + 1}
                    linkable={caseStudySlugs.has(project.slug)}
                    onPreview={setPreview}
                  />
              ))}
            </AnimatePresence>
          </ol>
        </section>
      ))}
      <div ref={floatRef} className={`ledger__float${preview ? " is-visible" : ""}`} aria-hidden="true">
        {preview ? <ProjectSheet key={preview.id} project={preview} sizes="420px" /> : null}
      </div>
    </div>
  );
}
