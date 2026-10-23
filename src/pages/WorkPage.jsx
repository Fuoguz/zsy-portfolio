import { useEffect, useMemo, useState } from "react";

import { WorkLedger } from "../components/ledger/WorkLedger.jsx";
import { LensChips } from "../sections/SelectedWork.jsx";
import { getHomePageContent, getPublicProjectSlugs, getRoleViewContent, getWorkIndexContent } from "../content/public.js";
import { lensLabel } from "../utils/editorial.js";

const work = getWorkIndexContent();
const { roleLenses, allProjects } = getHomePageContent();
const caseStudySlugs = new Set(getPublicProjectSlugs());
const FILTERS = [...roleLenses, { id: "lab", label: "Lab" }];
const LABELS = { lab: "创意实验" };
const validFilter = (value) => FILTERS.some((item) => item.id === value) ? value : "all";

const readFilter = () => validFilter(new URLSearchParams(window.location.search).get("lens"));

export function WorkPage() {
  const [filter, setFilter] = useState(readFilter);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (filter === "all") url.searchParams.delete("lens");
    else url.searchParams.set("lens", filter);
    window.history.replaceState(window.history.state, "", url);
  }, [filter]);

  const groups = useMemo(() => {
    if (filter === "all") return [
      { id: "featured", title: "代表案例", note: "建议从这里开始：问题、取舍与结果都写清楚的四个项目。", projects: work.featured },
      { id: "business", title: "更多真实工作", note: "大规模集训中的工具与执行。", projects: work.business },
      { id: "lab", title: "创意实验", note: "交互网页、影像和脚本练习，与业务案例分开看。", projects: work.lab },
    ];
    if (filter === "lab") return [{ id: "filtered", projects: work.lab }];
    return [{ id: "filtered", projects: getRoleViewContent(filter).projects.filter((project) => project.placement !== "LAB") }];
  }, [filter]);

  const count = groups.reduce((sum, group) => sum + group.projects.length, 0);

  return (
    <main className="page page--work" id="main-content">
      <header className="page-head wrap">
        <p className="eyebrow">作品 / 全部项目</p>
        <h1 className="page-title">作品台账</h1>
        <p className="page-lede">
          {allProjects.length} 个公开项目：{work.featured.length} 个代表案例、{work.business.length} 项更多真实工作、{work.lab.length} 个创意实验。每一条都标注了项目性质、交付状态和我的角色。
        </p>
      </header>
      <div className="wrap work-filter" id="lens">
        <LensChips
          lenses={FILTERS.map((item) => ({ ...item }))}
          active={filter}
          onSelect={setFilter}
          label="按岗位视角筛选"
          labelFor={(id) => LABELS[id] ?? lensLabel(id)}
        />
        <p className="lens__status" role="status">
          {filter === "all" ? `显示全部 ${count} 项` : `「${LABELS[filter] ?? lensLabel(filter)}」相关 · ${count} 项，按相关度排序`}
        </p>
      </div>
      <div className="wrap">
        <WorkLedger groups={groups} caseStudySlugs={caseStudySlugs} />
      </div>
    </main>
  );
}
