import { AppLink } from "../navigation/AppLink.jsx";
import { projectTitleZh } from "../../utils/presentation.js";

const capabilityLabels = {
  "Product Framing": "产品框架",
  "Rule Structuring": "规则结构化",
  "AI-assisted Workflow": "AI 辅助工作流",
  "Project Operations": "项目运营",
  "Content & Growth": "内容与增长",
  "Prototype to Evidence": "原型到证据",
};

export function CapabilityEvidence({ capabilities }) {
  if (!capabilities.length) return null;

  return (
    <section className="production-capability" aria-labelledby="capability-evidence-title">
      <header>
        <span>能力 → 项目 → 证据</span>
        <h2 id="capability-evidence-title">能力由公开工作证明。</h2>
        <p>这里不是技能评分。每条能力只做轻量连接，直接指向可阅读的案例与公开证据。</p>
      </header>
      <div className="production-capability__list">
        {capabilities.map((capability) => (
          <article key={capability.id}>
            <div>
              <h3>{capabilityLabels[capability.label] || capability.label}</h3>
              <p>{capability.why}</p>
            </div>
            <ul>
              {capability.projects.map((project) => (
                <li key={project.id}>
                  <strong>{projectTitleZh(project)}</strong>
                  <span>
                    {project.evidence.slice(0, 2).map((evidence, evidenceIndex) => (
                      <AppLink key={evidence.id} to={`/work/${project.slug}#evidence-${evidence.id}`}>
                        证据 {String(evidenceIndex + 1).padStart(2, "0")} · {evidence.provenanceLabel}
                      </AppLink>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
