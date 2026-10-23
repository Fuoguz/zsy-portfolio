import { AppLink } from "../navigation/AppLink.jsx";
import { projectTitleZh } from "../../utils/presentation.js";

const capabilityLabels = {
  "Full-stack Delivery": "网站开发与交付",
  "Product Framing": "产品框架",
  "Rule Structuring": "规则结构化",
  "AI-assisted Workflow": "AI 辅助工作流",
  "Project Operations": "项目运营",
  "Content & Growth": "内容与增长",
  "Prototype to Evidence": "原型与验证",
};

const materialTitles = {
  "globridge-home": "官网首页",
  "globridge-services": "咨询服务页面",
  "eaglehub-system-overview": "培养平台系统概览",
  "eaglehub-role-model": "角色与权限模型",
  "team-formation-constraints": "组队规则与约束",
  "team-formation-flow": "建队与入队流程",
  "onboarding-before-after": "入职流程 Before / After",
  "onboarding-routing": "规则路由与人工复核",
  "content-growth-account-overview": "公众号用户总览",
  "content-growth-workflow": "AI 内容生产流程",
};

export function CapabilityEvidence({ capabilities }) {
  if (!capabilities.length) return null;

  return (
    <section className="production-capability" aria-labelledby="capability-evidence-title">
      <header>
        <span>工作方式 / 相关项目</span>
        <h2 id="capability-evidence-title">我如何推进工作</h2>
        <p>从需求梳理、流程协作到 AI 辅助构建，查看相关项目中的具体做法。</p>
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
                    {project.evidence.slice(0, 2).map((evidence) => (
                      <AppLink key={evidence.id} to={`/work/${project.slug}#evidence-${evidence.id}`}>
                        {materialTitles[evidence.id] || evidence.caption}
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
