import { useState } from "react";
import "./proof-circuit.css";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const lenses = [
  { id: "ai-product", label: "AI Product", brief: "关注问题定义、AI workflow 与可运行原型。" },
  { id: "product-ops", label: "Product Ops", brief: "关注内容机制、产品材料与持续迭代。" },
  { id: "project-ops", label: "Project Ops", brief: "关注流程拆解、稳定交付与协作边界。" },
  { id: "growth", label: "Growth", brief: "关注真实业务规模、内容表现与生产效率。" },
  { id: "ai-native", label: "AI Native", brief: "关注 AI 如何进入实际工作，而不是停留在工具列表。" },
];

const projects = [
  {
    id: "growth",
    type: "REAL PROJECT",
    title: "AI Content Growth Workflow",
    description: "把选题、提纲、扩写、修改与发布节奏整理成可复用的 AI 辅助内容流程。",
    role: "内容策划 · AI 工作流搭建 · 运营",
    output: "稳定内容生产流程与真实后台记录",
    image: "assets/wechat-growth-02.png",
    alt: "脱敏后的公众号流量趋势截图",
    evidence: "约 5k 阅读峰值 · 后台脱敏截图 · 2025.08—10",
    fits: ["ai-product", "product-ops", "project-ops", "growth", "ai-native"],
    fitCopy: {
      "ai-product": "Workflow 设计把模糊的内容任务转化为可复用步骤。",
      "product-ops": "展示内容机制、节奏控制与持续运营。",
      "project-ops": "展示从判断到稳定交付的流程组织。",
      growth: "当前最强的真实业务规模与内容表现证据。",
      "ai-native": "AI 被嵌入实际生产流程，而不是单次生成。",
    },
  },
  {
    id: "digest",
    type: "PRODUCT PROTOTYPE",
    title: "Digest 内化",
    description: "围绕信息导入、AI 拆解、间隔复习与知识关联的产品提案和可运行原型。",
    role: "团队性质与个人职责待确认",
    output: "产品提案 · 交互原型 · 前端页面",
    image: "assets/digest-02.png",
    alt: "Digest 产品原型界面截图",
    evidence: "真实产品界面 · 项目分工将在正式 Case 中说明",
    fits: ["ai-product", "product-ops", "ai-native"],
    fitCopy: {
      "ai-product": "现有材料可用于验证产品问题与原型表达，职责仍待确认。",
      "product-ops": "现有提案呈现产品流程；不据此推断个人分工。",
      "ai-native": "原型探索 AI 辅助阅读与知识处理的产品形态。",
    },
  },
  {
    id: "memory",
    type: "EXPERIMENT",
    title: "Memory Museum",
    description: "围绕记忆、空间与个人叙事的交互网页实验。",
    role: "创意方向 · 视觉叙事 · Web 原型",
    output: "可运行交互网页",
    image: "assets/memory-museum-01.png",
    alt: "Memory Museum 交互网页首页截图",
    evidence: "真实界面 · 可运行 Prototype",
    fits: ["ai-product", "ai-native"],
    fitCopy: {
      "ai-product": "以可运行界面证明快速原型与交互表达。",
      "ai-native": "证明 Creative Technology 与 AI-assisted prototyping 的差异化。",
    },
  },
];

const proof = [
  ["55 万+", "公众号用户规模", "后台脱敏截图 · 2025.10"],
  ["2h → 20min", "单篇内容生产周期", "本人确认 · 统计口径待补"],
  ["7 篇 / 周", "稳定内容产出", "本人确认 · 时间范围待补"],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ProofCircuitPrototype() {
  const [activeLens, setActiveLens] = useState(lenses[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="circuit">
      <a className="circuit__skip" href="#circuit-work">Skip to work</a>
      <header className="circuit__nav">
        <a className="circuit__brand" href="#circuit-top">ZSY <span>/ PROOF CIRCUIT</span></a>
        <nav className="circuit__nav-links" aria-label="Prototype navigation">
          <a href="#circuit-work">Work</a><a href="#circuit-lens">Role lens</a><a href="#circuit-lab">Lab</a>
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:fuoguzz@gmail.com">Contact</a>
        </nav>
        <div className="circuit__mobile-nav">
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <button type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>Menu</button>
        </div>
        {menuOpen && (
          <nav className="circuit__menu" aria-label="Mobile prototype navigation">
            <a href="#circuit-work" onClick={() => setMenuOpen(false)}>Work</a>
            <a href="#circuit-lens" onClick={() => setMenuOpen(false)}>Role lens</a>
            <a href="#circuit-lab" onClick={() => setMenuOpen(false)}>Lab</a>
            <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
            <a href="mailto:fuoguzz@gmail.com">Contact</a>
          </nav>
        )}
      </header>

      <main id="circuit-top">
        <section className="circuit__hero">
          <div className="circuit__hero-main">
            <p className="circuit__eyebrow">Prototype B / Relationship-led portfolio</p>
            <h1>Zhang Shaoyi</h1>
            <p className="circuit__identity">2027 Graduate · 上海政法学院</p>
            <p className="circuit__positioning">将模糊的内容与产品问题，转化为可执行工作流、可运行原型与可解释结果。</p>
            <p className="circuit__roles">AI 产品 <i /> 产品运营 <i /> 项目运营 <i /> Content / Growth <i /> AI Native</p>
            <div className="circuit__actions">
              <a className="circuit__primary" href="#circuit-work">View work <Arrow /></a>
              <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume <Arrow /></a>
              <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
              <a href="mailto:fuoguzz@gmail.com">Contact</a>
            </div>
          </div>
          <aside className="circuit__start">
            <p>START HERE / CURRENT SIGNAL</p>
            {projects.map((project, index) => (
              <a href={`#circuit-${project.id}`} key={project.id}>
                <span>0{index + 1}</span><strong>{project.title}</strong><small>{project.type}</small>
              </a>
            ))}
            <div className="circuit__start-note">核心信息保持静态可读；交互只改变项目与岗位的关系说明。</div>
          </aside>
        </section>

        <section className="circuit__proof" aria-label="Quick proof">
          <div className="circuit__proof-intro"><span>QUICK PROOF</span><strong>Evidence, in human language.</strong></div>
          {proof.map(([value, label, note]) => (
            <article key={value}><strong>{value}</strong><p>{label}</p><small>{note}</small></article>
          ))}
        </section>

        <section className="circuit__work" id="circuit-work">
          <header className="circuit__section-head">
            <p>SELECTED WORK / SAME TEST CONTENT</p>
            <h2>能力不是标签。<br />它由项目关系证明。</h2>
          </header>

          <div className="circuit__lens" id="circuit-lens">
            <div className="circuit__lens-copy">
              <span>Signature interaction</span>
              <h3>Role Lens</h3>
              <p>选择岗位视角，查看哪些真实材料与它相关。项目事实不随视角改变。</p>
            </div>
            <div className="circuit__lens-controls" role="group" aria-label="Choose a role lens">
              {lenses.map((lens) => (
                <button key={lens.id} type="button" aria-pressed={activeLens.id === lens.id} onClick={() => setActiveLens(lens)}>{lens.label}</button>
              ))}
            </div>
            <p className="circuit__lens-result" aria-live="polite"><span>{activeLens.label}</span>{activeLens.brief}</p>
          </div>

          <div className="circuit__project-list">
            {projects.map((project) => {
              const related = project.fits.includes(activeLens.id);
              return (
                <article className={`circuit__project${related ? " is-related" : ""}`} id={`circuit-${project.id}`} key={project.id}>
                  <div className="circuit__project-media">
                    <img src={assetPath(project.image)} alt={project.alt} loading={project.id === "growth" ? "eager" : "lazy"} />
                    <span>{project.evidence}</span>
                  </div>
                  <div className="circuit__project-copy">
                    <div className="circuit__project-topline"><span>{project.type}</span><span>{related ? `Relevant to ${activeLens.label}` : "Supporting work"}</span></div>
                    <h3>{project.title}</h3>
                    <p className="circuit__project-desc">{project.description}</p>
                    <dl><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Output</dt><dd>{project.output}</dd></div></dl>
                    <div className="circuit__relation">
                      <span>CAPABILITY → PROJECT → EVIDENCE</span>
                      <p>{related ? project.fitCopy[activeLens.id] : "这项工作不是当前岗位视角的主要证据，仍保留在完整作品序列中。"}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="circuit__future">
            <span>STRUCTURE RESERVED</span><strong>FUTURE_CASE_STUDY</strong>
            <p>未来真实、脱敏的 AI Product / Workflow / Automation / Internal Tool / Project Operations Case 可按优先级插入。当前不填充任何项目事实。</p>
          </aside>
        </section>

        <section className="circuit__lab" id="circuit-lab">
          <span>LAB / SIMULATION</span><h2>Game Ads Script Demo</h2>
          <p>游戏广告脚本与前三秒 hook 的模拟练习。用于展示创意拆解，不是商业项目，也没有真实投放结果。</p>
        </section>
      </main>

      <footer className="circuit__footer">
        <p>Prototype B / Proof Circuit</p><h2>Find the work behind the capability.</h2>
        <div><a href="mailto:fuoguzz@gmail.com">Email</a><a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a><a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a></div>
      </footer>
    </div>
  );
}
