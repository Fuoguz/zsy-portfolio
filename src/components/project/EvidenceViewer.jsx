import { useId, useRef, useState } from "react";

import { assetPath } from "../../utils/paths.js";
import { ResponsiveImage } from "./ResponsiveImage.jsx";

const publicSources = (sources = []) => sources.map((source) => ({
  ...source,
  srcSet: assetPath(source.srcSet),
}));

const publicScope = (evidence) => {
  if (evidence.dateRange) return `时间范围 · ${evidence.dateRange}`;
  if (evidence.provenanceLabel.includes("重新绘制")) return "范围 · 公开安全的流程重绘";
  if (evidence.provenanceLabel.includes("DEMO DATA")) return "范围 · 匿名演示数据";
  return "范围 · 公开项目证据";
};

export function EvidenceViewer({ evidence, index, total }) {
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const descriptionId = useId();

  const close = () => dialogRef.current?.close();
  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setIsOpen(true);
    dialog.showModal();
    document.body.classList.add("has-evidence-viewer");
    requestAnimationFrame(() => dialog.querySelector("button")?.focus());
  };
  const handleClose = () => {
    document.body.classList.remove("has-evidence-viewer");
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) close();
  };

  const triggerImage = (
    <ResponsiveImage
      src={assetPath(evidence.asset)}
      sources={publicSources(evidence.sources)}
      alt={evidence.alt}
      width={evidence.width}
      height={evidence.height}
      sizes="(max-width: 767px) 100vw, 72vw"
      zoom
    />
  );

  return (
    <>
      <button
        ref={triggerRef}
        className="evidence-figure__zoom"
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={`查看完整证据：${evidence.alt}`}
      >
        {triggerImage}
        <span>查看完整证据</span>
      </button>
      <dialog
        ref={dialogRef}
        className="evidence-viewer"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClose={handleClose}
        onClick={handleBackdrop}
      >
        <div className="evidence-viewer__panel">
          <header>
            <div>
              <span>{index && total ? `证据 ${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}` : "证据"}</span>
              <h2 id={titleId}>{evidence.provenanceLabel}</h2>
            </div>
            <button type="button" onClick={close} aria-label="关闭证据查看器">关闭 ×</button>
          </header>
          <div className="evidence-viewer__media">
            {isOpen ? (
              <ResponsiveImage
                src={assetPath(evidence.asset)}
                sources={publicSources(evidence.sources)}
                alt={evidence.alt}
                width={evidence.width}
                height={evidence.height}
                sizes="92vw"
                loading="eager"
                zoom
              />
            ) : null}
          </div>
          <footer id={descriptionId}>
            <p>{evidence.caption}</p>
            <span>{publicScope(evidence)}</span>
          </footer>
        </div>
      </dialog>
    </>
  );
}
