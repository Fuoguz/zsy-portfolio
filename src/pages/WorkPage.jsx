import { ProjectCollection } from "../components/project/ProjectCollection.jsx";
import { CapabilityEvidence } from "../components/project/CapabilityEvidence.jsx";
import { SystemVisual } from "../components/visual/SystemVisual.jsx";
import { getCapabilityEvidenceMap, getPublicProjectSlugs, getWorkIndexContent } from "../content/public.js";

const work = getWorkIndexContent();
const caseStudySlugs = new Set(getPublicProjectSlugs());
const capabilities = getCapabilityEvidenceMap();

export function WorkPage() {
  return (
    <main className="production-route" id="main-content">
      <header className="production-route__hero production-route__hero--visual">
        <div className="production-route__hero-copy">
          <p>项目档案 / 全部项目</p>
          <h1>以真实工作为主，<br /><em>按证据组织阅读。</em></h1>
          <span>真实业务与产品工作优先；更多工作与 Lab 使用更轻的视觉权重。</span>
          <dl className="vo-route-stats">
            <div><dt>重点案例</dt><dd>{String(work.featured.length).padStart(2, "0")}</dd></div>
            <div><dt>更多工作</dt><dd>{String(work.business.length).padStart(2, "0")}</dd></div>
            <div><dt>实验项目</dt><dd>{String(work.lab.length).padStart(2, "0")}</dd></div>
          </dl>
        </div>
        <SystemVisual variant="work" caption="项目索引抽象图 · 非项目证据" />
      </header>
      <ProjectCollection label="重点案例 / 精选" title="建议先从这里开始。" projects={work.featured} variant="featured" caseStudySlugs={caseStudySlugs} />
      <ProjectCollection label="真实业务 / 更多工作" title="运营、协作与交付。" projects={work.business} variant="business" caseStudySlugs={caseStudySlugs} />
      <CapabilityEvidence capabilities={capabilities} />
      <ProjectCollection label="实验 / 创意扩展" title="创意能力的扩展区。" projects={work.lab} variant="lab" caseStudySlugs={caseStudySlugs} />
    </main>
  );
}
