import { projectTitleZh } from "../utils/presentation.js";
import { AppLink } from "../components/navigation/AppLink.jsx";

const lensLabels = {
  all: "全部",
  aiProduct: "AI 产品",
  productOps: "产品运营",
  projectOps: "项目运营",
  growth: "增长",
  aiNative: "AI 原生",
};

export function RoleLens({ lenses, activeLens, onSelect, projects }) {
  return (
    <div className="portfolio-work-sort" id="role-lens">
      <span id="role-lens-title">可选：按岗位排序</span>
      <div className="portfolio-work-sort__controls" role="group" aria-labelledby="role-lens-title">
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
      <p className="portfolio-work-sort__status" role="status">
        {activeLens.id === "all" ? `默认顺序 · ${projects.length} 个代表项目` : `已按${lensLabels[activeLens.id] || activeLens.label}相关性排序 · 首项：${projectTitleZh(projects[0])}`}
        {activeLens.id === "aiNative" ? <AppLink to="/ai-native">查看 AI 应用与开发项目 ↗</AppLink> : null}
      </p>
    </div>
  );
}
