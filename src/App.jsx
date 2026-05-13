import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Cpu,
  FileText,
  Layers,
  Mail,
  Sparkles,
  Workflow,
} from "lucide-react";

const works = [
  {
    number: "01",
    title: "Game Ads Script Demo",
    tags: ["Game Ads", "Script", "AI Workflow"],
    role: "Script Strategy / Creative Demo",
    tools: "ChatGPT, Claude, CapCut Logic, Ad Creative Research",
    proof: "3 类游戏方向 / 6 条短视频脚本 / 3 条图文素材创意",
    status: "Building",
  },
  {
    number: "02",
    title: "AI Content Growth Workflow",
    tags: ["Content Growth", "Workflow", "Case"],
    role: "Content Planner / Workflow Builder",
    tools: "Claude, Gemini, WeChat OA, Topic Research",
    proof: "55 万粉公众号 / 单篇最高 2w+ / 生产周期 2h -> 20min / 粉丝净增 3w",
    status: "Case Study",
  },
  {
    number: "03",
    title: "Digest 内化",
    tags: ["AI Product", "Knowledge Tool", "Vibe Coding"],
    role: "Product Thinking / Vibe Coding",
    tools: "VS Code, Copilot, React, GitHub Pages",
    proof: "需求定义 / 交互原型 / 前端页面 / 持续迭代",
    status: "Project",
  },
  {
    number: "04",
    title: "Memory Museum / Web Experiments",
    tags: ["Interactive Web", "Prototype", "Archive"],
    role: "Creative Direction / Web Prototype",
    tools: "HTML, CSS, JavaScript, AI Assisted Coding",
    proof: "交互网页 / 视觉叙事 / 个人档案结构实验",
    status: "Prototype",
  },
];

const capabilities = [
  {
    title: "AI 内容生产",
    desc: "把模型能力转化为可复用的选题、脚本、素材与内容生产流程。",
    icon: Cpu,
  },
  {
    title: "创意脚本拆解",
    desc: "从产品卖点、用户爽点和投放语境中提炼短视频与图文创意。",
    icon: FileText,
  },
  {
    title: "增长观察与判断",
    desc: "基于平台反馈、评论区信号与传播节奏，判断内容方向和迭代重点。",
    icon: Sparkles,
  },
  {
    title: "快速原型落地",
    desc: "用 AI assisted coding 把想法快速做成可访问、可展示、可迭代的网页作品。",
    icon: Layers,
  },
];

const workflow = [
  ["Observe", "观察用户、平台内容、评论区信号和传播趋势。"],
  ["Deconstruct", "拆解产品卖点、用户爽点、叙事结构和转化路径。"],
  ["Generate", "借助 AI 批量生成创意方向、脚本草案与页面原型。"],
  ["Refine", "人工筛选、压缩表达、强化钩子、校准作品证据。"],
  ["Ship", "整理为可展示、可投递、可持续迭代的作品资产。"],
];

const navItems = [
  ["Works", "#works"],
  ["Matrix", "#abilities"],
  ["Workflow", "#workflow"],
  ["Contact", "#contact"],
];

function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {desc && <p className="section-desc">{desc}</p>}
    </div>
  );
}

function StatusTag({ children }) {
  return <span className="status-tag">{children}</span>;
}

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--paper)]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(5,5,5,0.76)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="font-mono text-sm uppercase text-[var(--paper)]">
            ZSY / Evidence Lab
          </a>
          <div className="hidden items-center gap-7 text-sm text-[var(--muted)] md:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="hero-shell archive-surface">
        <div className="mx-auto grid min-h-screen max-w-7xl items-end gap-12 px-5 pb-14 pt-28 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <StatusTag>Resume Supplement</StatusTag>
              <span className="font-mono text-xs uppercase text-[var(--muted)]">
                AI Native Creative Portfolio
              </span>
            </div>

            <p className="mb-4 font-mono text-sm uppercase text-[var(--acid)]">
              Creative Evidence Lab
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] text-[var(--paper)] md:text-7xl lg:text-8xl">
              ZSY builds proof of creative process.
            </h1>

            <div className="mt-8 grid gap-5 border-l border-[var(--line)] pl-5 text-base leading-8 text-[var(--silver)] md:max-w-3xl md:text-lg">
              <p>简历负责概括经历，这里展示过程、方法与作品证据。</p>
              <p>
                我关注 AI 内容生产、游戏投放脚本、海外社媒运营与交互项目原型，并尝试把创意快速转化为可展示、可迭代的作品。
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#works" className="primary-action">
                View Evidence <ArrowUpRight size={17} />
              </a>
              <a href="#contact" className="secondary-action">
                Resume & Contact <FileText size={16} />
              </a>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.7, ease: "easeOut" }}
            className="hero-ledger"
            aria-label="Portfolio index"
          >
            <div className="ledger-row">
              <span>Current State</span>
              <strong>Open to Internship</strong>
            </div>
            <div className="ledger-row">
              <span>Evidence Types</span>
              <strong>Scripts / Workflows / Prototypes</strong>
            </div>
            <div className="ledger-row">
              <span>Core Method</span>
              <strong>{"Observe -> Deconstruct -> Ship"}</strong>
            </div>
            <div className="ledger-mark">
              <span>04</span>
              <p>selected evidence entries prepared for resume context.</p>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="focus-band">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-[0.42fr_1fr] md:px-8">
          <div>
            <p className="section-eyebrow">Current Focus</p>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl text-2xl leading-10 text-[var(--paper)] md:text-4xl md:leading-[1.25]"
          >
            正在准备游戏投放脚本作品集，同时整理 AI 内容增长案例、Digest 项目与交互网页实验。我希望这个网站作为简历背后的证据层，展示我如何从观察、拆解到生成和落地。
          </motion.p>
        </div>
      </section>

      <section id="works" className="section-shell">
        <SectionHeader
          eyebrow="Selected Works"
          title="作品证据卡"
          desc="每一张卡片都不是普通简介，而是把角色、工具、结果和状态压缩成可被招聘方快速判断的证据。"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {works.map((work, index) => (
            <motion.article
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06, duration: 0.55 }}
              className="evidence-card group"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="card-number">{work.number}</span>
                <StatusTag>{work.status}</StatusTag>
              </div>

              <div className="mt-10">
                <div className="mb-4 flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <span key={tag} className="mini-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3>{work.title}</h3>
              </div>

              <dl className="evidence-list">
                <div>
                  <dt>Role</dt>
                  <dd>{work.role}</dd>
                </div>
                <div>
                  <dt>Tools</dt>
                  <dd>{work.tools}</dd>
                </div>
                <div>
                  <dt>Proof</dt>
                  <dd>{work.proof}</dd>
                </div>
              </dl>

              <ArrowUpRight
                className="absolute bottom-5 right-5 text-[var(--muted)] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--acid)]"
                size={22}
              />
            </motion.article>
          ))}
        </div>
      </section>

      <section id="abilities" className="section-shell">
        <SectionHeader
          eyebrow="Capability Matrix"
          title="能力不是关键词，而是工作方式"
          desc="把简历里的能力标签拆成可以被验证的创意、内容、增长和原型能力。"
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="matrix-card"
              >
                <div className="matrix-icon">
                  <Icon size={22} />
                </div>
                <span className="font-mono text-xs text-[var(--muted)]">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="workflow" className="section-shell">
        <SectionHeader
          eyebrow="Workflow"
          title="从观察到落地"
          desc="我把 AI 当作放大器，而不是替代思考的按钮。关键仍然是判断、筛选、组织和交付。"
        />

        <div className="workflow-rail">
          <div className="mb-8 flex items-center gap-3 text-[var(--acid)]">
            <Workflow size={21} />
            <span className="font-mono text-xs uppercase">Observe to Ship</span>
          </div>
          <div className="grid gap-3 lg:grid-cols-5">
            {workflow.map(([title, desc], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="workflow-card"
              >
                <p className="workflow-number">{String(index + 1).padStart(2, "0")}</p>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact-band">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:grid-cols-[1fr_0.72fr] md:px-8">
          <div>
            <p className="section-eyebrow">Resume & Contact</p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight text-[var(--paper)] md:text-6xl">
              简历给出概括，作品给出证据。
            </h2>
          </div>

          <div className="contact-panel">
            <p>
              这个网站作为简历补充，展示我如何把 AI、内容增长和交互原型转化为可检查的作品资产。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <a href="mailto:fuoguzz@gmail.com" className="primary-action">
                Email Me <Mail size={16} />
              </a>
              <a
                href="/zsy-portfolio/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="secondary-action"
              >
                查看简历 PDF <ArrowUpRight size={16} />
              </a>
              <a
                href="https://github.com/Fuoguz"
                target="_blank"
                rel="noreferrer"
                className="secondary-action"
              >
                GitHub <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>

        <footer className="border-t border-white/10 px-5 py-7 text-center font-mono text-xs uppercase text-[var(--muted)]">
          © 2026 ZSY Creative Evidence Lab. Built with React, Tailwind and AI-assisted workflow.
        </footer>
      </section>
    </main>
  );
}

export default App;
