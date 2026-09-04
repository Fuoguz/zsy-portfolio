import { assetPath } from "../../utils/paths.js";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import { NeutralProjectVisual } from "./NeutralProjectVisual.jsx";

const isImage = (evidence) => ["SCREENSHOT", "PROCESS_DIAGRAM"].includes(evidence?.type);

export function ProjectVisual({ project, compact = false, eager = false }) {
  const visual = project.evidence.find((item) => item.publicSafe === true && isImage(item));
  if (!visual) return <NeutralProjectVisual project={project} compact={compact} />;

  return (
    <ResponsiveImage
      src={assetPath(visual.asset)}
      sources={(visual.sources ?? []).map((source) => ({ ...source, srcSet: assetPath(source.srcSet) }))}
      alt={visual.alt}
      width={visual.width}
      height={visual.height}
      aspectRatio={visual.width && visual.height ? `${visual.width} / ${visual.height}` : undefined}
      sizes={compact ? "(max-width: 767px) 100vw, 34vw" : "(max-width: 1023px) 100vw, 56vw"}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
