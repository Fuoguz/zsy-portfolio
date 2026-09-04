import { assetPath } from "../../utils/paths.js";
import { Caption } from "../ui/Caption.jsx";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import { EvidenceViewer } from "./EvidenceViewer.jsx";

const publicSources = (sources = []) => sources.map((source) => ({
  ...source,
  srcSet: assetPath(source.srcSet),
}));

export function EvidenceFigure({ evidence, zoom = false, index, total }) {
  if (
    !evidence
    || evidence.publicSafe !== true
    || !evidence.asset
  ) return null;

  if (evidence.type !== "SCREENSHOT" && evidence.type !== "PROCESS_DIAGRAM") {
    return (
      <figure className="evidence-figure" id={`evidence-${evidence.id}`}>
        <a href={evidence.asset} target="_blank" rel="noreferrer">{evidence.alt || evidence.caption}</a>
        <Caption><strong>{evidence.provenanceLabel}</strong><span>{evidence.caption}</span></Caption>
      </figure>
    );
  }

  const image = <ResponsiveImage src={assetPath(evidence.asset)} sources={publicSources(evidence.sources)} alt={evidence.alt} width={evidence.width} height={evidence.height} sizes="(max-width: 767px) 100vw, 72vw" zoom={zoom} />;
  return (
    <figure className="evidence-figure" id={`evidence-${evidence.id}`}>
      {zoom ? <EvidenceViewer evidence={evidence} index={index} total={total} /> : image}
      <Caption>
        <strong>{index && total ? `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")} · ` : ""}{evidence.provenanceLabel}</strong>
        <span>{evidence.caption}</span>
        {evidence.dateRange ? <small>{evidence.dateRange}</small> : null}
      </Caption>
    </figure>
  );
}
