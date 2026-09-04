import { projectTitleZh } from "../utils/presentation.js";

const lensLabels = {
  all: "全部",
  aiProduct: "AI 产品",
  productOps: "产品运营",
  projectOps: "项目运营",
  growth: "增长",
  aiNative: "AI 原生",
};

export function RoleLens({ lenses, activeLens, onSelect, recommendedProjects }) {
  return (
    <section className="final-hybrid__role-lens" id="role-lens" aria-labelledby="role-lens-title">
      <div className="final-hybrid__lens-title">
        <span>岗位路径 / ROLE LENS</span>
        <h2 id="role-lens-title">按岗位阅读</h2>
        <p>同一组真实项目，按你关心的工作方式重新排序。</p>
      </div>
      <div className="final-hybrid__lens-controls" role="group" aria-label="选择目标岗位">
        {lenses.map((lens) => (
          <button
            type="button"
            key={lens.id}
            aria-pressed={activeLens.id === lens.id}
            onClick={() => onSelect(lens)}
          >
            <span>{lensLabels[lens.id] || lens.label}</span>
          </button>
        ))}
      </div>
      <p className="final-hybrid__lens-summary" aria-live="polite">
        <strong>{lensLabels[activeLens.id] || activeLens.label}</strong>
        {activeLens.why}
        <span>建议先看：{recommendedProjects.map((project) => projectTitleZh(project)).slice(0, 4).join(" · ")}</span>
        <small>事实保持不变；这里只改变阅读顺序和相关性提示。</small>
      </p>
    </section>
  );
}
