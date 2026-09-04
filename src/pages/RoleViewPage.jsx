import { ProjectIndexItem } from "../components/project/ProjectIndexItem.jsx";
import { SystemVisual } from "../components/visual/SystemVisual.jsx";
import { getPublicProjectSlugs, getRolePageContent } from "../content/public.js";

const caseStudySlugs = new Set(getPublicProjectSlugs());
const rolePresentation = {
  product: { eyebrow: "AI 产品 / 产品运营", title: "从业务规则到可用系统。" },
  growth: { eyebrow: "增长 / 内容运营", title: "让内容生产成为稳定机制。" },
  creative: { eyebrow: "创意实验", title: "扩展表达能力，不替代业务证据。" },
};

export function RoleViewPage({ mode }) {
  const view = getRolePageContent(mode);
  const presentation = rolePresentation[mode] || { eyebrow: view.eyebrow, title: view.title };
  return (
    <main className="production-route production-role-view" id="main-content">
      <header className="production-route__hero production-route__hero--visual">
        <div className="production-route__hero-copy">
          <p>{presentation.eyebrow} / 岗位视角</p>
          <h1>{presentation.title}</h1>
          <span>{view.description}</span>
          <dl className="vo-route-stats">
            <div><dt>项目</dt><dd>{String(view.projects.length).padStart(2, "0")}</dd></div>
            <div><dt>排序</dt><dd>相关性</dd></div>
          </dl>
        </div>
        <SystemVisual variant="role" caption="岗位阅读路径 · 非项目证据" />
      </header>
      <section className="production-role-view__projects" aria-label={`${view.eyebrow} projects`}>
        {view.projects.map((project, index) => (
          <ProjectIndexItem
            key={project.id}
            project={project}
            variant={index === 0 ? "featured" : "business"}
            linkable={caseStudySlugs.has(project.slug)}
            index={index + 1}
          />
        ))}
      </section>
    </main>
  );
}
