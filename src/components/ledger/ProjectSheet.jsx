import { assetPath } from "../../utils/paths.js";
import { editorialFor } from "../../utils/editorial.js";
import { projectTitleEn } from "../../utils/presentation.js";
import { GlobridgePreview } from "../project/GlobridgePreview.jsx";
import { ResponsiveImage } from "../project/ResponsiveImage.jsx";
import { primaryVisual } from "../../utils/visuals.js";

// The visual "sheet" for a project: real material when it exists, otherwise a
// typographic plate built from the project's own working sequence.
export function ProjectSheet({ project, eager = false, sizes = "(max-width: 900px) 100vw, 50vw", live = false }) {
  if (project.slug === "globridge" && live) return <GlobridgePreview project={project} />;
  const visual = project.slug === "globridge"
    ? project.evidence.find((item) => item.id === "globridge-home")
    : primaryVisual(project);
  if (visual) {
    return (
      <div className="sheet sheet--image">
        <ResponsiveImage
          src={assetPath(visual.asset)}
          sources={(visual.sources ?? []).map((source) => ({ ...source, srcSet: assetPath(source.srcSet) }))}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
        />
      </div>
    );
  }
  const { flow = [], kicker } = editorialFor(project);
  const hook = project.creativeDrafts?.hookGroups[0]?.hooks[0];
  const video = project.evidence.find((item) => item.type === "VIDEO" && item.publicSafe);
  return (
    <div className={`sheet sheet--plate${hook ? " sheet--script" : ""}${video ? " sheet--film" : ""}`} role="img" aria-label={`${projectTitleEn(project)} 文字示意`}>
      <span className="sheet__kicker">{kicker || "项目说明"}</span>
      <strong className="sheet__title">{projectTitleEn(project)}</strong>
      {flow.length ? <ol className="sheet__steps">{flow.map((step) => <li key={step}>{step}</li>)}</ol> : null}
      {hook ? <blockquote className="sheet__quote">“{hook}”<small>开头草稿 01 · 模拟练习</small></blockquote> : null}
      {video ? <span className="sheet__play" aria-hidden="true">▶</span> : null}
      <span className="sheet__note">文字示意 · 非项目截图</span>
    </div>
  );
}
