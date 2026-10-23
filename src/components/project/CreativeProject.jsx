import { AppLink } from "../navigation/AppLink.jsx";
import { ProjectClassification } from "./ProjectClassification.jsx";
import { ResponsiveImage } from "./ResponsiveImage.jsx";
import { assetPath } from "../../utils/paths.js";
import { getCreativePresentation } from "../../utils/creative-presentation.js";
import { projectTitleZh } from "../../utils/presentation.js";

export function CreativeProject({ project }) {
  const { preview, experience, video, hasMaterials } = getCreativePresentation(project);
  return <article className={`creative-project${hasMaterials ? "" : " creative-project--note"}`} data-project={project.slug}>
    {preview && <figure className="creative-project__preview">
      <ResponsiveImage src={assetPath(preview.asset)} sources={(preview.sources || []).map(source => ({ ...source, srcSet: assetPath(source.srcSet) }))} alt={preview.alt} width={preview.width} height={preview.height} sizes="(max-width: 767px) 100vw, 50vw" />
      <figcaption>{preview.caption}</figcaption>
    </figure>}
    <div className="creative-project__copy">
      <ProjectClassification values={project.classification} />
      <h3>{projectTitleZh(project)}</h3>
      <p>{project.summary}</p>
      <p className="creative-project__role">我的工作 · {project.publicRole}</p>
      {project.creativeDrafts && <p className="creative-project__role">{project.creativeDrafts.hookGroups.reduce((count, group) => count + group.hooks.length, 0)} 条开头 · {project.creativeDrafts.scripts.length} 组脚本 · 模拟练习</p>}
      {hasMaterials && <div className="creative-project__actions">
        {experience && <a href={experience.asset} target="_blank" rel="noreferrer" aria-label={`体验${projectTitleZh(project)}（新窗口）`}>体验交互网页 ↗</a>}
        {video && <a href={video.asset} target="_blank" rel="noreferrer" aria-label={`观看${projectTitleZh(project)}成片（Bilibili，新窗口）`}>观看成片 ↗</a>}
        <AppLink to={`/work/${project.slug}`}>{project.creativeDrafts ? "阅读脚本草稿 →" : "查看作品介绍 →"}</AppLink>
      </div>}
    </div>
  </article>;
}
