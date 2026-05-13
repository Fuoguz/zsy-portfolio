import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  FileText,
  Sparkles,
  Layers,
  Workflow,
  Cpu,
} from "lucide-react";

const works = [
  {
    title: "Game Ads Script Demo",
    tag: "Game Ads / Script / AI Workflow",
    desc: "针对游戏投放岗位准备的模拟短视频与图文脚本作品，展示玩法拆解、用户爽点提炼与 AI 辅助创作流程。",
    status: "Preparing",
  },
  {
    title: "AI Content Growth Workflow",
    tag: "Content Growth / AI Workflow",
    desc: "55 万粉公众号内容策划与 AI 内容生产流程案例，展示从选题判断到内容提效的完整方法。",
    status: "Case Study",
  },
  {
    title: "Digest 内化",
    tag: "AI Product / Knowledge Tool",
    desc: "个人知识管理工具，基于 VS Code 与 AI 辅助开发，完成需求定义、交互设计与前端实现。",
    status: "Project",
  },
  {
    title: "Memory Museum / Web Experiments",
    tag: "Interactive Web / Prototype",
    desc: "个人交互网页与创意原型实验，展示视觉表达、网页实现和快速原型能力。",
    status: "Archive",
  },
];

const abilities = [
  {
    title: "AI 内容生产",
    desc: "ChatGPT / Claude / Gemini / Copilot，Prompt 设计、内容生成、脚本发散与工作流搭建。",
    icon: Cpu,
  },
  {
    title: "内容与增长",
    desc: "公众号内容策划、小红书评论区转化、选题判断、用户兴趣分析与内容节奏把控。",
    icon: Sparkles,
  },
  {
    title: "创意脚本",
    desc: "游戏投放脚本 Demo、短视频开头钩子、图文素材创意与传播角度设计。",
    icon: FileText,
  },
  {
    title: "原型落地",
    desc: "Vibe Coding、GitHub Pages、交互网页、个人工具项目与快速原型验证。",
    icon: Layers,
  },
];

const workflow = [
  ["Observe", "观察用户、平台内容和传播趋势"],
  ["Deconstruct", "拆解产品卖点、用户爽点和内容结构"],
  ["Generate", "借助 AI 批量生成创意方向和脚本草案"],
  ["Refine", "人工筛选、压缩表达、强化钩子和转化路径"],
  ["Ship", "整理为可展示、可投递、可继续迭代的作品"],
];

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mb-10">
      <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
          {desc}
        </p>
      )}
    </div>
  );
}

function App() {
  return (
    <main className="min-h-screen overflow-hidden text-slate-100">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#home" className="text-sm font-semibold tracking-[0.25em] text-white">
            ZSY
          </a>
          <div className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="#works" className="hover:text-cyan-300">Works</a>
            <a href="#abilities" className="hover:text-cyan-300">Matrix</a>
            <a href="#workflow" className="hover:text-cyan-300">Workflow</a>
            <a href="#contact" className="hover:text-cyan-300">Contact</a>
          </div>
        </div>
      </nav>

      <section id="home" className="relative mx-auto flex min-h-screen max-w-6xl items-center px-5 pt-12">
        <div className="absolute right-10 top-32 hidden h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl md:block" />
        <div className="absolute bottom-24 left-8 hidden h-56 w-56 rounded-full bg-blue-500/10 blur-3xl md:block" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-sm text-cyan-200">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            status: open to internship
          </div>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white md:text-7xl">
            ZSY Creative
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400">
              Evidence Lab
            </span>
          </h1>

<p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
  简历负责概括经历，这里展示过程、方法与作品证据。
  我关注 AI 内容生产、游戏投放脚本、海外社媒运营与交互项目原型，并尝试把创意快速转化为可展示、可迭代的作品。
</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#works"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200"
            >
              View Selected Works <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-300/60 hover:text-cyan-200"
            >
              Resume & Contact
            </a>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-3 text-sm text-slate-400 md:grid-cols-4">
            {["AI Native", "Content Growth", "Game Ads", "Vibe Coding"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="works" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle
          eyebrow="Selected Works"
          title="四个求职证据入口"
          desc="第一版先不追求大而全，只展示最能支撑当前实习投递的项目和案例。"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {works.map((work, index) => (
            <motion.article
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 transition duration-300 hover:-translate-y-2 hover:border-cyan-300/40 hover:bg-white/[0.07]"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl transition group-hover:bg-cyan-300/20" />
              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                    {work.status}
                  </span>
                  <ArrowUpRight className="text-slate-500 transition group-hover:text-cyan-200" size={20} />
                </div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">
                  {work.tag}
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  {work.title}
                </h3>
                <p className="mt-4 leading-7 text-slate-400">
                  {work.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="abilities" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle
          eyebrow="Capability Matrix"
          title="不是技能堆砌，而是能力证据"
          desc="把简历里的关键词转化为更清晰的求职能力模块。"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {abilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-slate-900/50 p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-200">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-6xl px-5 py-24">
        <SectionTitle
          eyebrow="Workflow"
          title="我的创意工作流"
          desc="从观察到落地，把 AI 作为放大器，而不是替代思考。"
        />

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-8">
          <div className="mb-8 flex items-center gap-3 text-cyan-200">
            <Workflow size={22} />
            <span className="text-sm uppercase tracking-[0.3em]">Observe to Ship</span>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {workflow.map(([title, desc], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-slate-950/50 p-4"
              >
                <p className="mb-3 text-sm text-cyan-200">
                  0{index + 1}
                </p>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 md:p-12">
          <SectionTitle
            eyebrow="Resume & Contact"
            title="需要完整背景，请查看简历"
            desc="这个网站只作为简历补充，展示作品、过程和方法。"
          />

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:fuoguzz@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-white"
            >
              <Mail size={16} /> Email Me
            </a>
<a
  href="https://github.com/Fuoguz"
  target="_blank"
  rel="noreferrer"
  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-300/60"
>
  GitHub ↗
</a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-300/60"
            >
              <FileText size={16} /> Resume PDF Coming Soon
            </a>
          </div>
        </div>

        <footer className="py-10 text-center text-sm text-slate-500">
          © 2026 ZSY Creative Evidence Lab. Built with React, Tailwind and AI-assisted workflow.
        </footer>
      </section>
    </main>
  );
}

export default App;