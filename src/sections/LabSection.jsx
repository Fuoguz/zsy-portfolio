import { AppLink } from "../components/navigation/AppLink.jsx";
import { ProjectClassification } from "../components/project/ProjectClassification.jsx";
import { projectTitleZh } from "../utils/presentation.js";

export function LabSection({ projects }) {
  if (!projects.length) return null;
  return (
    <section className="final-hybrid__lab production-lab" id="lab" aria-labelledby="lab-title">
      <div><span>实验 / 创意扩展</span><h2 id="lab-title">扩展创意边界，<br />不替代真实业务证据。</h2></div>
      <p>产品实验、交互网页、影像与脚本模拟作为差异化能力证明，与真实业务项目保持清晰层级。</p>
      <div className="production-lab__list">
        {projects.map((project) => (
          <AppLink to={`/work/${project.slug}`} key={project.id}>
            <ProjectClassification values={project.classification} />
            <strong>{projectTitleZh(project)}</strong>
          </AppLink>
        ))}
      </div>
    </section>
  );
}
