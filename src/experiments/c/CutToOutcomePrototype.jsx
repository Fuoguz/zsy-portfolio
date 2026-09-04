import { useState } from "react";
import "./cut-to-outcome.css";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const acts = [
  {
    id: "problem",
    number: "01",
    label: "Problem",
    title: "高频更新，不等于高质量生产。",
    body: "内容团队需要同时处理选题判断、稳定更新和生产效率。重复劳动挤压了真正用于判断与修改的时间。",
    caption: "真实业务背景 · 内容生产与增长",
    image: "assets/wechat-growth-02.png",
    alt: "脱敏后的公众号阅读趋势截图",
    tone: "cobalt",
  },
  {
    id: "decision",
    number: "02",
    label: "Decision",
    title: "把一次写作，拆成可重复的 workflow。",
    body: "将选题、提纲、扩写、修改与发布节奏拆开：AI 负责发散和初稿，人负责判断、筛选与最终表达。",
    caption: "工作方法 · Observe → Structure → Refine → Ship",
    tone: "orange",
    steps: ["Observe", "Structure", "Generate", "Refine", "Ship"],
  },
  {
    id: "outcome",
    number: "03",
    label: "Outcome",
    title: "稳定交付，也留下可核验的结果。",
    body: "单篇内容生产周期由约 2 小时缩短至约 20 分钟，并保持每周 7 篇的内容节奏。两项均为用户确认，统计周期与测量方法将在正式 Case 中补充。",
    caption: "业务规模：55 万+ · 后台脱敏截图 · 2025.10",
    image: "assets/wechat-growth-01.png",
    alt: "脱敏后的公众号用户总览截图，显示总用户数 549,944",
    tone: "butter",
  },
];

const proof = [
  ["55 万+", "公众号用户规模", "后台脱敏截图 · 2025.10"],
  ["2h → 20min", "单篇内容生产周期", "本人确认 · 口径待补"],
  ["7 篇 / 周", "稳定内容产出", "本人确认 · 时间范围待补"],
];

function CornerArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function CutToOutcomePrototype() {
  const [activeAct, setActiveAct] = useState(acts[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="cutoutcome">
      <a className="cutoutcome__skip" href="#cut-work">Skip to work</a>
      <header className="cutoutcome__nav">
        <a className="cutoutcome__brand" href="#cut-top"><span>ZSY</span><small>Cut to Outcome / 2027</small></a>
        <nav className="cutoutcome__nav-links" aria-label="Prototype navigation">
          <a href="#cut-work">Work</a><a href="#cut-lab">Lab</a>
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:fuoguzz@gmail.com">Contact</a>
        </nav>
        <div className="cutoutcome__mobile-actions">
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <button type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>Menu</button>
        </div>
        {menuOpen && <nav className="cutoutcome__menu" aria-label="Mobile prototype navigation"><a href="#cut-work" onClick={() => setMenuOpen(false)}>Work</a><a href="#cut-lab" onClick={() => setMenuOpen(false)}>Lab</a><a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a><a href="mailto:fuoguzz@gmail.com">Contact</a></nav>}
      </header>

      <main id="cut-top">
        <section className="cutoutcome__hero">
          <div className="cutoutcome__hero-copy">
            <p className="cutoutcome__eyebrow">Portfolio prototype C · Product work in three acts</p>
            <h1><span>Zhang</span><span>Shaoyi</span></h1>
            <p className="cutoutcome__identity">2027 Graduate / 2027 届本科毕业生<br />上海政法学院</p>
          </div>
          <div className="cutoutcome__hero-statement">
            <span className="cutoutcome__asterisk" aria-hidden="true">✳</span>
            <p>把复杂信息转化为可执行工作流、产品原型与可解释结果。</p>
            <div className="cutoutcome__focus"><strong>Primary</strong><span>AI 产品 → 产品运营 → 项目运营</span><strong>Adjacent</strong><span>Content / Growth · AI Native</span></div>
            <div className="cutoutcome__actions"><a className="cutoutcome__primary" href="#cut-work">View work <CornerArrow /></a><a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a><a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a><a href="mailto:fuoguzz@gmail.com">Contact</a></div>
          </div>
        </section>

        <section className="cutoutcome__proof" aria-label="Quick proof">
          <header><span>QUICK PROOF</span><strong>Results, with context.</strong></header>
          {proof.map(([value, label, note], index) => <article key={value} data-index={`0${index + 1}`}><strong>{value}</strong><p>{label}</p><small>{note}</small></article>)}
        </section>

        <section className="cutoutcome__work" id="cut-work">
          <header className="cutoutcome__section-head"><p>SELECTED WORK</p><h2>Three projects.<br />Three kinds of proof.</h2><span>同一组真实内容，用场景、决策与结果建立阅读节奏。</span></header>

          <article className={`cutoutcome__feature is-${activeAct.tone}`}>
            <div className="cutoutcome__feature-title"><span>REAL PROJECT / CONTENT GROWTH</span><h3>AI Content<br />Growth Workflow</h3><p>内容策划 · AI 工作流搭建 · 运营</p></div>
            <div className="cutoutcome__scrubber">
              <div className="cutoutcome__act-tabs" role="tablist" aria-label="Project story stages">
                {acts.map((act) => <button key={act.id} type="button" role="tab" aria-selected={activeAct.id === act.id} aria-controls="cut-act-panel" onClick={() => setActiveAct(act)}><span>{act.number}</span><strong>{act.label}</strong></button>)}
              </div>
              <div className="cutoutcome__act-panel" id="cut-act-panel" role="tabpanel" aria-live="polite">
                <div className="cutoutcome__act-copy"><p>{activeAct.number} / {activeAct.label}</p><h4>{activeAct.title}</h4><span>{activeAct.body}</span></div>
                <figure>
                  {activeAct.image ? <img key={activeAct.image} src={assetPath(activeAct.image)} alt={activeAct.alt} /> : <div className="cutoutcome__workflow" aria-label="Observe, Structure, Generate, Refine, Ship workflow">{activeAct.steps.map((step, index) => <span key={step}><i>0{index + 1}</i>{step}</span>)}</div>}
                  <figcaption>{activeAct.caption}</figcaption>
                </figure>
              </div>
            </div>
          </article>

          <div className="cutoutcome__project-scenes">
            <article className="cutoutcome__scene cutoutcome__scene--digest">
              <div className="cutoutcome__scene-media"><img src={assetPath("assets/digest-02.png")} alt="Digest 产品原型界面截图" loading="lazy" /><span>真实产品界面 · 项目分工待确认</span></div>
              <div className="cutoutcome__scene-copy"><span>PRODUCT PROTOTYPE</span><h3>Digest<br />内化</h3><p>围绕信息导入、AI 拆解、间隔复习与知识关联的产品提案与原型。</p><dl><div><dt>Context</dt><dd>信息碎片难以再次使用</dd></div><div><dt>Output</dt><dd>产品提案 · 交互原型 · 前端页面</dd></div><div><dt>Disclosure</dt><dd>团队性质与个人职责将在正式 Case 中说明</dd></div></dl><a href="https://fuoguz.github.io/digest/" target="_blank" rel="noreferrer">Open prototype <CornerArrow /></a></div>
            </article>
            <article className="cutoutcome__scene cutoutcome__scene--memory">
              <div className="cutoutcome__scene-copy"><span>EXPERIMENT / INTERACTIVE WEB</span><h3>Memory<br />Museum</h3><p>把记忆、空间与个人叙事转化成一套可运行的交互网页。</p><dl><div><dt>Role</dt><dd>创意方向 · 视觉叙事 · Web 原型</dd></div><div><dt>Outcome</dt><dd>可运行的交互体验</dd></div></dl><a href="https://memory-museum-pi.vercel.app/" target="_blank" rel="noreferrer">Visit experiment <CornerArrow /></a></div>
              <div className="cutoutcome__scene-media"><img src={assetPath("assets/memory-museum-01.png")} alt="Memory Museum 人生博物馆首页截图" loading="lazy" /><span>真实界面 · Experiment</span></div>
            </article>
          </div>

          <aside className="cutoutcome__future"><div><span>STRUCTURE TEST</span><strong>FUTURE_<br />CASE_STUDY</strong></div><p>为未来真实脱敏的 AI Product / AI Workflow / Automation / Internal Product / Project Operations Case 预留场景结构。</p><small>NO PROJECT FACTS ADDED</small></aside>
        </section>

        <section className="cutoutcome__lab" id="cut-lab"><div><span>LAB / SIMULATION</span><h2>Game Ads<br />Script Demo</h2></div><p>游戏广告脚本与前三秒 hook 的模拟练习，用于展示创意拆解能力。不是商业项目，也没有真实投放结果。</p><strong>Creative difference,<br />not featured proof.</strong></section>
      </main>

      <footer className="cutoutcome__footer"><p>G2 Prototype C / Production homepage unchanged</p><h2>Context.<br />Decision.<br /><em>Outcome.</em></h2><nav><a href="mailto:fuoguzz@gmail.com">Email</a><a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a><a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a></nav></footer>
    </div>
  );
}
