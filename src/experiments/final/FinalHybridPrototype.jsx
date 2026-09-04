import { useMemo, useState } from "react";
import "./final-hybrid.css";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const roleViews = [
  {
    id: "ai-product",
    label: "AI Product",
    summary: "关注需求框架、业务规则与可验证原型。",
    recommended: ["eaglehub", "onboarding"],
    startWith: "EagleHub · Onboarding Automation · Globridge · Digest",
  },
  {
    id: "product-ops",
    label: "Product Ops",
    summary: "关注产品落地、流程协作与持续运营。",
    recommended: ["eaglehub", "onboarding", "growth", "team"],
    startWith: "EagleHub · Onboarding · Team Formation · Content Growth",
  },
  {
    id: "project-ops",
    label: "Project Ops",
    summary: "关注规模化执行、交付节奏与异常处理。",
    recommended: ["eaglehub", "onboarding", "team"],
    startWith: "Eagle Training · Team Formation · EagleHub · Onboarding",
  },
  {
    id: "growth",
    label: "Growth",
    summary: "关注内容机制、业务规模与生产效率。",
    recommended: ["growth"],
    startWith: "AI Content Growth · 新通教育相关经历",
  },
  {
    id: "ai-native",
    label: "AI Native",
    summary: "关注 AI 如何进入真实业务流程并形成可验证输出。",
    recommended: ["eaglehub", "onboarding"],
    startWith: "EagleHub · Onboarding Automation · Globridge · Digest",
  },
];

const startProjects = [
  {
    id: "eaglehub",
    number: "01",
    title: "EagleHub",
    type: "Internal product",
    href: "#final-featured",
    placeholder: "企业人才培养管理平台",
  },
  {
    id: "onboarding",
    number: "02",
    title: "Onboarding Automation",
    type: "Validated dry-run",
    href: "#final-onboarding",
    placeholder: "新人入职流程自动化",
  },
  {
    id: "growth",
    number: "03",
    title: "AI Content Growth",
    type: "Real project",
    href: "#final-growth",
    image: "assets/wechat-growth-02.png",
    alt: "脱敏后的公众号阅读趋势截图",
  },
];

const quickProof = [
  ["400–500 人", "大型新人培养项目规模", "雏鹰专项集训 · 5 个班级"],
  ["≈480 对", "师徒培养管理场景", "人才培养场景 · 约 6 个月"],
  ["2h → 20–30min", "AI 内容工作流生产周期", "内容生产流程 · 口径待补"],
];

const acts = [
  {
    id: "problem",
    label: "Problem",
    title: "约 480 对师徒，不应靠分散信息维持关系。",
    text: "约 6 个月培养周期中，师徒关系、角色权限、部门层级和导师变更需要持续同步；异常数据会直接影响项目运营。",
    caption: "内部产品材料待脱敏 · 当前不展示系统 UI",
    placeholderTitle: "Public visual pending",
    placeholderText: "需要可公开的脱敏截图，验证多角色关系与培养管理场景。",
    tone: "cobalt",
  },
  {
    id: "decision",
    label: "Decision",
    title: "先定义多角色框架，再推进功能实现。",
    text: "早期由本人主导产品方案、核心功能框架和学员 / 导师 / HRBP 多角色需求梳理，并借助 AI 完成原型与本人参与部分的实现、迭代和排查。",
    caption: "职责边界：早期方案、核心框架与本人参与功能",
    placeholderTitle: "No generated interface",
    placeholderText: "原型与系统材料仅在完成公开脱敏后替换此中性占位。",
    tone: "vermilion",
  },
  {
    id: "outcome",
    label: "Outcome",
    title: "框架进入约 480 对师徒的培养管理场景。",
    text: "本人继续参与部门筛选、权限同步、导师变更、师徒关系和异常数据处理。后续正式工程成果由软件工程同事共同完成。",
    caption: "场景规模为用户确认 · 公开 evidence 待补",
    placeholderTitle: "Evidence required",
    placeholderText: "后续只替换为真实、脱敏并能说明个人贡献范围的材料。",
    tone: "paper",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function NeutralEvidence({ title, text, compact = false }) {
  return (
    <div className={`final-hybrid__neutral-evidence${compact ? " is-compact" : ""}`}>
      <span>Neutral placeholder</span>
      <strong>{title}</strong>
      <p>{text}</p>
      <small>No internal UI shown</small>
    </div>
  );
}

export default function FinalHybridPrototype() {
  const [activeRole, setActiveRole] = useState(roleViews[0]);
  const [activeStart, setActiveStart] = useState(startProjects[0]);
  const [activeAct, setActiveAct] = useState(acts[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const recommendedTitles = useMemo(
    () => startProjects
      .filter((project) => activeRole.recommended.includes(project.id))
      .map((project) => project.title)
      .join(" · "),
    [activeRole],
  );

  return (
    <div className="final-hybrid">
      <a className="final-hybrid__skip" href="#final-work">Skip to work</a>

      <header className="final-hybrid__nav">
        <a className="final-hybrid__brand" href="#final-top">
          <strong>ZSY</strong>
          <span>Portfolio / 2027</span>
        </a>
        <nav className="final-hybrid__nav-links" aria-label="Final prototype navigation">
          <a href="#final-work">Work</a>
          <a href="#final-role-lens">Role Lens</a>
          <a href="#final-lab">Lab</a>
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:fuoguzz@gmail.com">Contact</a>
        </nav>
        <div className="final-hybrid__mobile-actions">
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="final-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav
          id="final-mobile-menu"
          className={`final-hybrid__mobile-menu${menuOpen ? " is-open" : ""}`}
          aria-label="Mobile final prototype navigation"
        >
          <a href="#final-work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#final-role-lens" onClick={() => setMenuOpen(false)}>Role Lens</a>
          <a href="#final-lab" onClick={() => setMenuOpen(false)}>Lab</a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:fuoguzz@gmail.com">Contact</a>
        </nav>
      </header>

      <main id="final-top">
        <section className="final-hybrid__hero" aria-labelledby="final-title">
          <div className="final-hybrid__hero-copy">
            <p className="final-hybrid__eyebrow">2027 Graduate · 上海政法学院 · 网络与新媒体</p>
            <h1 id="final-title">Zhang Shaoyi</h1>
            <p className="final-hybrid__positioning">
              把业务中的流程、数据与协作问题，转化为可执行的运营方案、产品原型和 AI 辅助工具。
            </p>
            <p className="final-hybrid__focus-line">
              产品运营 <i /> 项目运营 <i /> AI 应用 <i /> 业务数字化
            </p>
            <div className="final-hybrid__actions" aria-label="Primary actions">
              <a className="final-hybrid__primary" href="#final-work">View work <Arrow /></a>
              <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume <Arrow /></a>
              <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
              <a href="mailto:fuoguzz@gmail.com">Contact</a>
            </div>
          </div>

          <aside className="final-hybrid__start" aria-label="Start here project navigation">
            <div className="final-hybrid__start-heading">
              <p>Start here</p>
              <span>Selected work / 03</span>
            </div>
            <figure className="final-hybrid__start-preview" id="final-start-preview" aria-live="polite">
              {activeStart.image ? (
                <img
                  key={activeStart.image}
                  src={assetPath(activeStart.image)}
                  alt={activeStart.alt}
                />
              ) : (
                <NeutralEvidence
                  compact
                  title={activeStart.title}
                  text={`${activeStart.placeholder} · 可公开脱敏视觉待补充`}
                />
              )}
              <figcaption>
                <span><b>Preview</b>{activeStart.title}</span>
                <a href={activeStart.href}>Open project <Arrow /></a>
              </figcaption>
            </figure>
            <div className="final-hybrid__start-list">
              {startProjects.map((project) => {
                const recommended = activeRole.recommended.includes(project.id);
                return (
                  <button
                    type="button"
                    className={recommended ? "is-recommended" : ""}
                    key={project.id}
                    aria-controls="final-start-preview"
                    aria-pressed={activeStart.id === project.id}
                    onClick={() => setActiveStart(project)}
                    onFocus={() => setActiveStart(project)}
                    onMouseEnter={() => setActiveStart(project)}
                  >
                    <span>{project.number}</span>
                    <strong>{project.title}</strong>
                    <small>{project.type}</small>
                    <i>{recommended ? "Recommended" : "Explore"}</i>
                  </button>
                );
              })}
            </div>
          </aside>
        </section>

        <section className="final-hybrid__role-lens" id="final-role-lens" aria-labelledby="role-lens-title">
          <div className="final-hybrid__lens-title">
            <span>Portfolio view</span>
            <h2 id="role-lens-title">Role Lens</h2>
          </div>
          <div className="final-hybrid__lens-controls" role="group" aria-label="Choose a target role">
            {roleViews.map((role) => (
              <button
                type="button"
                key={role.id}
                aria-pressed={activeRole.id === role.id}
                onClick={() => setActiveRole(role)}
              >
                {role.label}
              </button>
            ))}
          </div>
          <p className="final-hybrid__lens-summary" aria-live="polite">
            <strong>{activeRole.label}</strong>
            {activeRole.summary}
            <span>Start with: {recommendedTitles || activeRole.startWith}</span>
            <small>Full mapping: {activeRole.startWith}</small>
          </p>
        </section>

        <section className="final-hybrid__quick-proof" aria-label="Quick proof">
          <p><span>Quick proof</span> Range across real work.</p>
          {quickProof.map(([value, label, note]) => (
            <article className={value.includes("20–30") ? "is-long" : ""} key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <section className="final-hybrid__work" id="final-work">
          <article className={`final-hybrid__featured is-${activeAct.tone}`} id="final-featured">
            <div className="final-hybrid__featured-opening">
              <div className="final-hybrid__featured-narrative">
                <header className="final-hybrid__featured-heading">
                  <p>01 / Real project · Internal product</p>
                  <h2>EagleHub<br />Talent Platform</h2>
                  <div>
                    <span>Role</span>
                    <strong>早期产品方案与核心框架 · AI 辅助实现</strong>
                  </div>
                </header>

                <div className="final-hybrid__story-tabs" role="group" aria-label="Featured project story">
                  {acts.map((act, index) => (
                    <button
                      type="button"
                      key={act.id}
                      aria-pressed={activeAct.id === act.id}
                      onClick={() => setActiveAct(act)}
                    >
                      <span>0{index + 1}</span>
                      <strong>{act.label}</strong>
                    </button>
                  ))}
                </div>

                <div className="final-hybrid__story-copy" aria-live="polite">
                  <p>{activeAct.label}</p>
                  <h3>{activeAct.title}</h3>
                  <span>{activeAct.text}</span>
                  <small>
                    Role Lens: {activeRole.label} — {activeRole.summary}
                  </small>
                </div>
              </div>
              <figure className="final-hybrid__featured-evidence" aria-live="polite">
                <NeutralEvidence title={activeAct.placeholderTitle} text={activeAct.placeholderText} />
                <figcaption>{activeAct.caption}</figcaption>
              </figure>
            </div>
          </article>

          <section className="final-hybrid__supporting" aria-labelledby="supporting-title">
            <header>
              <p>Further evidence</p>
              <h2 id="supporting-title">Automation, delivery<br />and real operations.</h2>
            </header>

            <article className={`final-hybrid__project ${activeRole.recommended.includes("onboarding") ? "is-recommended" : ""}`} id="final-onboarding">
              <figure>
                <NeutralEvidence
                  title="Public flow pending"
                  text="新人入职流程自动化 · 脱敏流程、匿名 UI 与测试边界待补充"
                />
                <figcaption>Validated Prototype / Dry-run · 不展示内部员工或系统数据</figcaption>
              </figure>
              <div className="final-hybrid__project-copy">
                <p>02 / Internal automation · Validated dry-run</p>
                <h3>Onboarding Automation</h3>
                <span>把花名册解析、人员路由、导航映射与已有记录 Diff 组织为可验证的 read-only 流程。</span>
                <dl>
                  <div><dt>Validation</dt><dd>测试样本目标字段曾达到 11 / 11 一致</dd></div>
                  <div><dt>Boundary</dt><dd>自动写入未描述为已上线</dd></div>
                </dl>
                <a href="#final-onboarding">Review public scope <Arrow /></a>
              </div>
            </article>

            <article className={`final-hybrid__project final-hybrid__project--reverse ${activeRole.recommended.includes("growth") ? "is-recommended" : ""}`} id="final-growth">
              <figure>
                <img src={assetPath("assets/wechat-growth-02.png")} alt="脱敏后的公众号阅读趋势截图" loading="lazy" />
                <figcaption>真实后台脱敏截图 · Content Growth evidence</figcaption>
              </figure>
              <div className="final-hybrid__project-copy">
                <p>03 / Real project · Content Growth</p>
                <h3>AI Content Growth</h3>
                <span>围绕约 55 万规模公众号，将选题、资料、结构、初稿与人工校验组织为 Claude + Gemini 内容工作流。</span>
                <dl>
                  <div><dt>Outcome</dt><dd>单篇最高阅读 2 万+ · 长期每周约 7 篇</dd></div>
                  <div><dt>Cycle</dt><dd>约 2 小时 → 20–30 分钟</dd></div>
                </dl>
                <a href="#final-growth">View evidence summary <Arrow /></a>
              </div>
            </article>

            <article className={`final-hybrid__project ${activeRole.recommended.includes("team") ? "is-recommended" : ""}`} id="final-team">
              <figure>
                <NeutralEvidence
                  title="Redacted visual required"
                  text="自由组队平台 · 实际使用截图与本人搭建边界待公开脱敏"
                />
                <figcaption>Real internal tool · Shipped / used before training</figcaption>
              </figure>
              <div className="final-hybrid__project-copy">
                <p>Supporting / Real project · Internal tool</p>
                <h3>Team Formation</h3>
                <span>服务约 400–500 人、5 个班级的新人集训，支持信息卡片、建队 / 入队、人数限制、班级展示、移动端适配与数据匹配。</span>
                <dl>
                  <div><dt>Scale</dt><dd>每班约 90 人 · 每队约 10–12 人</dd></div>
                  <div><dt>Status</dt><dd>集训前投入使用</dd></div>
                </dl>
                <a href="#final-team">Supporting work <Arrow /></a>
              </div>
            </article>

            <aside className="final-hybrid__future">
              <div><span>Potential featured case</span><strong>Globridge</strong></div>
              <p>AI 辅助全栈业务系统。项目背景、本人职责、时间、截图、交付结果与公开范围补齐后，再决定是否提升权重。</p>
              <small>Content boundary pending</small>
            </aside>
          </section>
        </section>

        <section className="final-hybrid__lab" id="final-lab">
          <div><span>Lab / Experiments</span><h2>Digest · Memory<br />Video · Game Ads</h2></div>
          <p>保留产品实验、交互网页、影像与脚本模拟作为差异化能力证明；不与真实业务项目同级。Digest 的团队性质与本人职责仍待确认。</p>
          <strong>Creative range,<br />not primary proof.</strong>
        </section>
      </main>

      <footer className="final-hybrid__footer">
        <p>Final Hybrid Homepage Prototype / G3.5 content stress test</p>
        <h2>Build the work.<br /><em>Show the reasoning.</em></h2>
        <nav aria-label="Footer links">
          <a href="mailto:fuoguzz@gmail.com">Email</a>
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
        </nav>
      </footer>
    </div>
  );
}
