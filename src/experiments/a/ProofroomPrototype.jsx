import { useState } from "react";
import "./proofroom.css";

const assetPath = (path) => `${import.meta.env.BASE_URL}${path}`;

const proofItems = [
  {
    id: "audience",
    value: "55 万+",
    label: "公众号用户规模",
    source: "后台脱敏截图 · 2025.10",
    image: "assets/wechat-growth-01.png",
    alt: "脱敏后的公众号用户总览截图，显示总用户数 549,944",
    plate: "用户总览",
    description:
      "截图直接记录 549,944 的总用户数，为项目所处的真实业务规模提供背景。",
    note: "公开图已脱敏，不展示账号名称与敏感信息。",
  },
  {
    id: "peak",
    value: "5,000+",
    label: "单日阅读峰值",
    source: "后台趋势截图 · 2025.08—10",
    image: "assets/wechat-growth-02.png",
    alt: "公众号流量分析趋势截图，时间范围为 2025 年 8 月至 10 月",
    plate: "流量趋势",
    description:
      "趋势图显示统计周期内的阅读波动与约 5,000 的峰值，用于说明选题表现，而不是装饰性 KPI。",
    note: "图表保留日期与坐标，避免脱离统计范围解读数字。",
  },
];

const quickProof = [
  {
    value: "55 万+",
    label: "公众号用户规模",
    note: "后台脱敏截图 · 2025.10",
  },
  {
    value: "2h → 20min",
    label: "单篇内容生产周期",
    note: "本人确认 · 暂无公开附件",
  },
  {
    value: "7 篇 / 周",
    label: "稳定内容产出节奏",
    note: "本人确认 · 暂无公开附件",
  },
];

function EditorialArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M6 3h7v7" />
    </svg>
  );
}

function ProofroomPrototype() {
  const [activeProof, setActiveProof] = useState(proofItems[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="proofroom">
      <a className="proofroom__skip" href="#proofroom-work">
        跳到精选项目
      </a>

      <header className="proofroom__masthead">
        <a className="proofroom__wordmark" href="#proofroom-top" onClick={closeMenu}>
          <span>ZSY</span>
          <small>Proofroom / 2027</small>
        </a>

        <nav className="proofroom__desktop-nav" aria-label="Prototype navigation">
          <a href="#proofroom-work">Work</a>
          <a href="#proofroom-proof">Proof Lens</a>
          <a href="#proofroom-lab">Lab</a>
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">
            Resume
          </a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="mailto:fuoguzz@gmail.com">Contact</a>
        </nav>

        <div className="proofroom__mobile-actions">
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">
            Resume
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="proofroom-mobile-menu"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <nav
          id="proofroom-mobile-menu"
          className={`proofroom__mobile-menu${menuOpen ? " is-open" : ""}`}
          aria-label="Mobile prototype navigation"
        >
          <a href="#proofroom-work" onClick={closeMenu}>Work</a>
          <a href="#proofroom-proof" onClick={closeMenu}>Proof Lens</a>
          <a href="#proofroom-lab" onClick={closeMenu}>Lab</a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:fuoguzz@gmail.com">Contact</a>
        </nav>
      </header>

      <main id="proofroom-top">
        <section className="proofroom__hero" aria-labelledby="proofroom-title">
          <div className="proofroom__hero-copy">
            <p className="proofroom__kicker">
              Portfolio prototype A <span>·</span> Candidate edition
            </p>
            <h1 id="proofroom-title">
              <span>Zhang</span>
              <span>Shaoyi.</span>
            </h1>
            <p className="proofroom__positioning">
              用产品思维，把内容增长、AI workflow 与交互原型整理成可理解、可验证的工作成果。
            </p>
            <div className="proofroom__cta-row" aria-label="Primary actions">
              <a className="proofroom__button proofroom__button--primary" href="#proofroom-work">
                View work <EditorialArrow />
              </a>
              <a className="proofroom__button" href="mailto:fuoguzz@gmail.com?subject=Resume%20request">
                Resume <EditorialArrow />
              </a>
              <a className="proofroom__text-link" href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="proofroom__text-link" href="mailto:fuoguzz@gmail.com">
                Contact
              </a>
            </div>
          </div>

          <aside className="proofroom__docket" aria-label="Candidate facts">
            <div className="proofroom__docket-heading">
              <span>Candidate note</span>
              <span>01 / 03</span>
            </div>
            <dl>
              <div>
                <dt>Graduation</dt>
                <dd>2027 Graduate<br />2027 届本科毕业生</dd>
              </div>
              <div>
                <dt>School</dt>
                <dd>上海政法学院</dd>
              </div>
              <div>
                <dt>Primary focus</dt>
                <dd>AI 产品 → 产品运营 → 项目运营</dd>
              </div>
              <div>
                <dt>Adjacent</dt>
                <dd>Content / Growth · AI Native</dd>
              </div>
            </dl>
            <p className="proofroom__margin-note">
              求职信息先于视觉实验；结果与项目截图先于工具列表。
            </p>
          </aside>
        </section>

        <section className="proofroom__quick-proof" aria-labelledby="quick-proof-title">
          <div className="proofroom__proof-label">
            <span>Quick proof</span>
            <h2 id="quick-proof-title">先看事实，再看叙事。</h2>
          </div>
          <div className="proofroom__proof-grid">
            {quickProof.map((item) => (
              <article key={item.value}>
                <strong>{item.value}</strong>
                <h3>{item.label}</h3>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="proofroom__work" id="proofroom-work" aria-labelledby="proofroom-work-title">
          <div className="proofroom__section-heading">
            <p>Selected work / 现阶段同一组测试内容</p>
            <h2 id="proofroom-work-title">工作的价值，应该在打开详情前就能被判断。</h2>
            <span>真实业务优先；实验与模拟内容明确降级。</span>
          </div>

          <article className="proofroom__lead-story">
            <div className="proofroom__story-meta">
              <p className="proofroom__classification">Real project · Content / Growth</p>
              <h3>AI Content<br />Growth Workflow</h3>
              <p className="proofroom__story-deck">
                在高频内容生产中，把选题、提纲、扩写、修改与发布节奏整理成可复用的 AI 辅助工作流。
              </p>
              <dl className="proofroom__story-facts">
                <div>
                  <dt>Role</dt>
                  <dd>内容策划 · AI 工作流搭建 · 运营</dd>
                </div>
                <div>
                  <dt>Problem</dt>
                  <dd>在稳定产出的同时，提高选题判断与生产效率。</dd>
                </div>
                <div>
                  <dt>Output</dt>
                  <dd>标准化内容流程，并形成可核验的增长与效率记录。</dd>
                </div>
              </dl>
            </div>

            <div className="proofroom__lens" id="proofroom-proof">
              <div className="proofroom__lens-header">
                <div>
                  <p>Signature interaction</p>
                  <h4>Proof Lens</h4>
                </div>
                <span>选择一句结果，对读它的真实来源。</span>
              </div>

              <div className="proofroom__lens-tabs" role="group" aria-label="选择要查看的项目证据">
                {proofItems.map((proof) => (
                  <button
                    key={proof.id}
                    type="button"
                    aria-pressed={activeProof.id === proof.id}
                    onClick={() => setActiveProof(proof)}
                  >
                    <strong>{proof.value}</strong>
                    <span>{proof.label}</span>
                  </button>
                ))}
              </div>

              <div className="proofroom__plate" aria-live="polite">
                <figure>
                  <div className="proofroom__plate-frame">
                    <img
                      key={activeProof.image}
                      src={assetPath(activeProof.image)}
                      alt={activeProof.alt}
                    />
                    <span className="proofroom__plate-mark" aria-hidden="true">
                      {activeProof.value}
                    </span>
                  </div>
                  <figcaption>
                    <span>{activeProof.plate}</span>
                    {activeProof.source}
                  </figcaption>
                </figure>
                <div className="proofroom__plate-copy">
                  <p className="proofroom__plate-number">Plate / {activeProof.id === "audience" ? "01" : "02"}</p>
                  <h5>这张图证明了什么</h5>
                  <p>{activeProof.description}</p>
                  <small>{activeProof.note}</small>
                </div>
              </div>
            </div>
          </article>

          <div className="proofroom__supporting-grid">
            <article className="proofroom__supporting-story proofroom__supporting-story--digest">
              <div className="proofroom__supporting-image">
                <img
                  src={assetPath("assets/digest-02.png")}
                  alt="Digest 产品原型界面截图"
                  loading="lazy"
                />
              </div>
              <div className="proofroom__supporting-copy">
                <p className="proofroom__classification">Product prototype · Project nature pending</p>
                <h3>Digest 内化</h3>
                <p>
                  围绕信息导入、AI 拆解、间隔复习与知识图谱的移动端 Web 产品提案与原型。
                </p>
                <dl>
                  <div><dt>材料涵盖</dt><dd>产品定义 · 交互原型 · 前端页面</dd></div>
                  <div><dt>说明</dt><dd>正式 Case 将区分团队协作与个人贡献。</dd></div>
                </dl>
                <a href="https://fuoguz.github.io/digest/" target="_blank" rel="noreferrer">
                  View live prototype <EditorialArrow />
                </a>
              </div>
            </article>

            <article className="proofroom__supporting-story proofroom__supporting-story--memory">
              <div className="proofroom__supporting-image">
                <img
                  src={assetPath("assets/memory-museum-01.png")}
                  alt="Memory Museum 人生博物馆首页截图"
                  loading="lazy"
                />
              </div>
              <div className="proofroom__supporting-copy">
                <p className="proofroom__classification">Experiment · Interactive web</p>
                <h3>Memory Museum</h3>
                <p>
                  围绕记忆、空间与个人叙事的网页原型，验证如何把抽象概念转化成可交互体验。
                </p>
                <dl>
                  <div><dt>Role</dt><dd>创意方向 · 视觉叙事 · Web 原型</dd></div>
                  <div><dt>Output</dt><dd>可运行的交互网页与视觉叙事结构</dd></div>
                </dl>
                <a href="https://memory-museum-pi.vercel.app/" target="_blank" rel="noreferrer">
                  Visit experiment <EditorialArrow />
                </a>
              </div>
            </article>
          </div>

          <aside className="proofroom__future" aria-label="Future case study structure placeholder">
            <div>
              <p>Structure test / not public content</p>
              <h3>FUTURE_CASE_STUDY</h3>
            </div>
            <p>
              为未来真实、脱敏的 AI Product / AI Workflow / Automation / Internal Tool / Project Operations Case 预留结构。
            </p>
            <span>内容、职责与结果均未填充</span>
          </aside>
        </section>

        <section className="proofroom__lab" id="proofroom-lab" aria-labelledby="proofroom-lab-title">
          <div>
            <p>Lab / lower-priority index</p>
            <h2 id="proofroom-lab-title">Game Ads Script Demo</h2>
          </div>
          <div className="proofroom__lab-copy">
            <strong>Simulation</strong>
            <p>
              游戏广告脚本与前三秒 hook 的模拟练习，用于证明创意拆解能力；不是商业项目，也不代表真实投放结果。
            </p>
          </div>
        </section>
      </main>

      <footer className="proofroom__footer">
        <div>
          <p>Open to AI Product / Product Operations opportunities.</p>
          <h2>让项目继续说话。</h2>
        </div>
        <div className="proofroom__footer-links">
          <a href="mailto:fuoguzz@gmail.com">fuoguzz@gmail.com</a>
          <a href="mailto:fuoguzz@gmail.com?subject=Resume%20request">Resume</a>
          <a href="https://github.com/Fuoguz" target="_blank" rel="noreferrer">GitHub</a>
        </div>
        <small>G2 Prototype A · Production homepage remains unchanged.</small>
      </footer>
    </div>
  );
}

export default ProofroomPrototype;
