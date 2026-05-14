import { useEffect, useState } from "react";
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
    intro:
      "针对游戏投放脚本岗位准备的模拟 Demo。围绕休闲、策略、卡牌等方向，练习把玩法卖点、玩家情绪、前三秒开头和可拍画面拆出来。",
    role: "脚本创意练习 / 游戏卖点拆解 / AI 辅助起稿",
    tools: "ChatGPT, Claude, 素材拆解, CapCut 剪辑逻辑",
    proof: "计划输出 3 类游戏方向 / 6 条短视频脚本 / 3 条图文素材创意",
    status: "Building / Demo in Progress",
  },
  {
    number: "02",
    title: "AI Content Growth Workflow",
    tags: ["Content Growth", "Workflow", "Case"],
    intro:
      "公众号内容增长与 AI 内容生产工作流案例。独立主导 55 万粉公众号内容策划，判断高流量选题，并将选题、提纲、扩写、修改和发布节奏标准化。",
    role: "内容策划 / AI 工作流搭建 / 独立运营",
    tools: "Claude, Gemini, 微信公众号, 选题研究",
    proof:
      "单篇阅读最高 2w+ / 本月峰值 5000+ / 平均阅读 1000+ / 生产周期 2 小时到 20 分钟 / 每周 7 篇稳定产出 / 粉丝净增约 3 万",
    status: "Case Study",
  },
  {
    number: "03",
    title: "Digest 内化",
    tags: ["AI Product", "Knowledge Tool", "Vibe Coding"],
    intro:
      "个人知识管理工具实验，尝试把碎片化信息整理成之后还能继续使用的知识结构，也顺便练习 AI 辅助阅读和前端实现。",
    role: "需求定义 / 交互设计 / 前端实现 / 持续迭代",
    tools: "VS Code, Copilot, React, GitHub Pages, AI 辅助开发",
    proof: "需求定义 / 交互原型 / 前端页面 / 持续迭代",
    status: "Project",
  },
  {
    number: "04",
    title: "Memory Museum / Web Experiments",
    tags: ["Interactive Web", "Prototype", "Archive"],
    intro:
      "个人交互网页与创意原型实验，围绕记忆、空间、个人叙事和网页交互，试着把网页做成个人档案和非线性叙事的容器。",
    role: "创意方向 / 视觉叙事 / Web 原型",
    tools: "HTML, CSS, JavaScript, AI Assisted Coding",
    proof: "交互网页 / 视觉叙事 / 个人档案结构实验",
    status: "Prototype",
  },
  {
    number: "05",
    title: "Video / Motion Practice",
    tags: ["Video", "Motion", "Editing"],
    intro:
      "《照见痕迹》是一支个人视频 / 动态视觉练习，用来补充呈现我的视频表达、剪辑节奏、视觉组织和情绪叙事能力。",
    role: "创意构思 / 素材组织 / 剪辑节奏 / 视觉呈现 / 后期制作",
    tools: "Premiere, After Effects, Photoshop",
    proof: "个人视频作品 / 动态视觉练习 / 外链观看",
    status: "Practice",
  },
];

const capabilities = [
  {
    title: "AI 内容生产",
    desc: "ChatGPT / Claude / Gemini / Copilot，选题发散、提纲、初稿、改稿和流程整理。",
    icon: Cpu,
  },
  {
    title: "内容增长",
    desc: "公众号选题策划、小红书评论区引流沟通、用户兴趣判断、内容节奏控制。",
    icon: Sparkles,
  },
  {
    title: "创意脚本",
    desc: "游戏投放脚本 Demo、短视频前三秒开头、图文素材创意、玩家反应设计。",
    icon: FileText,
  },
  {
    title: "原型落地",
    desc: "Vibe Coding、GitHub Pages、交互网页、个人工具项目、快速原型验证。",
    icon: Layers,
  },
];

const workflow = [
  ["Observe", "观察平台内容、用户兴趣和传播趋势。"],
  ["Deconstruct", "拆解产品卖点、玩家为什么想继续看、内容结构。"],
  ["Generate", "借助 AI 批量生成创意方向、标题、脚本和素材想法。"],
  ["Refine", "人工筛选、压缩表达、改开头和结尾动作。"],
  ["Ship", "整理成能打开、能投递、后面还能继续改的作品。"],
];

const hookGroups = [
  {
    category: "休闲解压类",
    hooks: [
      "我发誓我只想玩一关。",
      "这游戏看起来像给小学生玩的，然后我卡了 40 分钟。",
      "别急着笑，你上你也不一定行。",
      "我现在知道为什么它没有退出按钮了。",
    ],
  },
  {
    category: "策略 / SLG 类",
    hooks: [
      "联盟群刚说和平发育，我家已经冒烟了。",
      "他问我为什么不反击，因为我在等他全军出门。",
      "这游戏最恐怖的地方：昨晚还叫你兄弟的人。",
      "我装了三天死人，今天地图该换颜色了。",
    ],
  },
  {
    category: "卡牌 / 二次元类",
    hooks: [
      "我差点把这张卡分解了。",
      "主播说这阵容没用，然后他被控到没说话。",
      "抽卡前：最后一次。抽卡后：再充一次也行吧。",
      "这角色看着像仓管，结果一上场全队变正常了。",
    ],
  },
];

const creativeDrafts = [
  {
    title: "这游戏看着不难，直到我朋友开始不说话",
    type: "休闲解压 / 朋友破防型",
    format: "手机录屏 + 朋友反应 + 大字字幕",
    beats: [
      "0-2s：朋友：“这不有手就行？”",
      "2-6s：第一次失败，笑。",
      "6-12s：第二次失败，不笑了。",
      "12-18s：第三次只差一点，手停在屏幕上。",
      "18-24s：字幕：“这把不算。”",
      "24-30s：画面切到他还在玩，时间已经过去 28 分钟。",
    ],
    note: "重点放在朋友从轻松到较真的变化，不急着解释全部玩法。",
  },
  {
    title: "评论区说第一关闭眼过",
    type: "休闲解压 / 评论区挑战型",
    format: "假评论 + 实机录屏 + 失败合集",
    beats: [
      "0-3s：评论弹出：“第一关闭眼都能过。”",
      "3-8s：玩家真的闭眼操作，立刻翻车。",
      "8-15s：正常玩也翻车。",
      "15-22s：终于过关，结果下一关更离谱。",
      "22-30s：字幕：“闭眼过的那位，出来一下。”",
    ],
    note: "用评论区制造参与感，适合做系列。",
  },
  {
    title: "成年人最脆弱的关系：游戏里的临时联盟",
    type: "SLG / 群聊背刺型",
    format: "群聊截图 + 地图红线 + 战报弹窗",
    beats: [
      "0-3s：群聊：“今晚都别打，和平发育。”",
      "3-5s：地图上三条红线同时飞向我家。",
      "5-10s：我：“收到。”",
      "10-18s：镜头切资源、迁城、集结，假装没反应。",
      "18-25s：对方主力出门后，我绕后偷家。",
      "25-30s：群聊安静，只剩系统战报。",
    ],
    note: "别写成热血反杀，写成人情世故翻车现场。",
  },
  {
    title: "他说低星卡没用，然后被低星队教育了",
    type: "卡牌 / 主播沉默型",
    format: "主播切片 + 战斗录屏 + 表情定格",
    beats: [
      "0-3s：主播：“这队能赢我直接下播。”",
      "3-8s：对面低星角色先手控制。",
      "8-15s：主播还在解释：“没事，他没伤害。”",
      "15-22s：连击触发，血条消失。",
      "22-26s：主播沉默，鼠标不动。",
      "26-30s：弹幕：“还下播吗？”",
    ],
    note: "卡牌广告不要只写抽卡，配队反差更容易显得懂游戏。",
  },
];

const iterationNotes = [
  "先写 20 个开头，不急着写完整脚本。",
  "每个方向都要能拍：录屏、字幕、反应、群聊、弹幕。",
  "AI 用来发散，不直接交稿。",
  "人工筛掉太像广告、太像作文、太像 AI 的句子。",
  "后续根据完播率、点击率、评论内容继续改开头。",
];

const detailLinks = {
  "Game Ads Script Demo": "#/game-ads",
  "AI Content Growth Workflow": "#/content-growth",
  "Digest 内化": "#/digest",
  "Memory Museum / Web Experiments": "#/memory-museum",
  "Video / Motion Practice": "#/video-work",
};

const projectUrls = {
  digest: "https://fuoguz.github.io/digest/",
  memoryMuseum: "https://memory-museum-pi.vercel.app/",
  videoWork: "https://www.bilibili.com/video/BV1B6qMBmECG/",
};

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

function assetPath(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

function BackHomeButton() {
  return (
    <a href="#home" className="secondary-action mb-10 w-fit">
      ← Back to Home
    </a>
  );
}

function DetailHero({ eyebrow, title, desc, tag }) {
  return (
    <section className="hero-shell archive-surface">
      <div className="mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-24 md:px-8 md:pb-20">
        <BackHomeButton />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <StatusTag>{tag}</StatusTag>
            <span className="font-mono text-xs uppercase text-[var(--muted)]">
              Detail Page
            </span>
          </div>

          <p className="mb-4 font-mono text-sm uppercase text-[var(--acid)]">
            {eyebrow}
          </p>
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] text-[var(--paper)] md:text-7xl lg:text-8xl">
            {title}
          </h1>

          <div className="mt-8 grid gap-5 border-l border-[var(--line)] pl-5 text-base leading-8 text-[var(--silver)] md:max-w-3xl md:text-lg">
            <p>{desc}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DetailCard({ label, title, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="matrix-card"
    >
      {label && <span className="font-mono text-xs text-[var(--acid)]">{label}</span>}
      <h3>{title}</h3>
      <div className="mt-4 leading-7 text-[var(--paper-soft)]">{children}</div>
    </motion.article>
  );
}

function EvidenceImages({ images, caption }) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {images.map((image) => (
          <figure
            key={image.src}
            className="overflow-hidden rounded-lg border border-[var(--line)] bg-[rgba(244,240,230,0.025)]"
          >
            <img src={assetPath(image.src)} alt={image.alt} className="block w-full" />
          </figure>
        ))}
      </div>
      {caption && <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{caption}</p>}
    </div>
  );
}

function GameAdsDraftsSection() {
  return (
    <section id="game-ads-drafts" className="section-shell">
      <SectionHeader
        eyebrow="Simulated Demo / 自主练习"
        title="Game Ads Creative Drafts"
        desc="一些针对游戏投放脚本岗位准备的模拟素材草稿。它们属于自主练习，重点是记录我怎么起开头、怎么写玩家反应、怎么把玩法变成短视频画面。"
      />

      <div className="mb-10 border-l border-[var(--line)] pl-5 text-base leading-8 text-[var(--silver)] md:max-w-4xl">
        <p>
          我现在先做素材方向，不急着写完整广告片。先把开头三秒、评论区话题、玩家反应、反转点和可拍画面列出来。很多投放素材前几秒就决定用户会不会继续看，所以我会先把开头写扎实。
        </p>
      </div>

      <div className="mb-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold text-[var(--paper)]">
            Hook Bank / 开头钩子库
          </h3>
          <StatusTag>12 draft hooks</StatusTag>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {hookGroups.map((group, index) => (
            <motion.article
              key={group.category}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="matrix-card"
            >
              <span className="font-mono text-xs text-[var(--acid)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{group.category}</h3>
              <ol className="mt-5 space-y-4 text-sm leading-7 text-[var(--paper-soft)]">
                {group.hooks.map((hook, hookIndex) => (
                  <li key={hook} className="grid grid-cols-[2rem_1fr] gap-3">
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {String(index * 4 + hookIndex + 1).padStart(2, "0")}
                    </span>
                    <span>“{hook}”</span>
                  </li>
                ))}
              </ol>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-2xl font-semibold text-[var(--paper)]">
            Short Video Drafts / 短视频草稿
          </h3>
          <StatusTag>模拟素材草稿</StatusTag>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {creativeDrafts.map((draft, index) => (
            <motion.article
              key={draft.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.06, duration: 0.55 }}
              className="evidence-card"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="card-number">
                  Draft {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mini-tag">{draft.type}</span>
              </div>

              <div className="mt-8">
                <h3>{draft.title}</h3>
              </div>

              <dl className="evidence-list">
                <div>
                  <dt>形式</dt>
                  <dd>{draft.format}</dd>
                </div>
                <div>
                  <dt>节奏</dt>
                  <dd>
                    <ol className="space-y-2">
                      {draft.beats.map((beat) => (
                        <li key={beat}>{beat}</li>
                      ))}
                    </ol>
                  </dd>
                </div>
                <div>
                  <dt>备注</dt>
                  <dd>{draft.note}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="workflow-rail">
        <div className="mb-8 flex items-center gap-3 text-[var(--acid)]">
          <FileText size={21} />
          <span className="font-mono text-xs uppercase">Iteration Notes</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {iterationNotes.map((note, index) => (
            <motion.article
              key={note}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="workflow-card"
            >
              <p className="workflow-number">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-5 text-[var(--paper-soft)]">{note}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <p className="mt-10 max-w-4xl border-l border-[var(--line-strong)] pl-5 text-sm leading-7 text-[var(--muted)]">
        这些是模拟素材草稿，不代表真实投放数据。我把它们放在这里，是想说明自己会先从“用户会不会停下来看”这个问题开始，再去拆开头、反应、画面和完整脚本。
      </p>
    </section>
  );
}

function GameAdsDetail() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--paper)]">
      <section id="game-ads" className="hero-shell archive-surface">
        <div className="mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-end px-5 pb-14 pt-24 md:px-8 md:pb-20">
          <a href="#home" className="secondary-action mb-10 w-fit">
            ← Back to Home
          </a>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <StatusTag>Simulated Demo</StatusTag>
              <span className="font-mono text-xs uppercase text-[var(--muted)]">
                Game Ads Script Demo
              </span>
            </div>

            <p className="mb-4 font-mono text-sm uppercase text-[var(--acid)]">
              Detail Page
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] text-[var(--paper)] md:text-7xl lg:text-8xl">
              Game Ads Creative Drafts
            </h1>

            <div className="mt-8 grid gap-5 border-l border-[var(--line)] pl-5 text-base leading-8 text-[var(--silver)] md:max-w-3xl md:text-lg">
              <p>
                这里单独放游戏投放脚本方向的模拟练习。内容不是商业项目，也不代表真实投放数据。
              </p>
              <p>
                我主要记录自己怎么写前三秒、怎么找玩家反应、怎么把玩法变成能拍出来的短视频素材。
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <GameAdsDraftsSection />
    </main>
  );
}

function ContentGrowthDetail() {
  const results = [
    "单篇阅读最高 2w+",
    "本月峰值 5000+",
    "平均阅读 1000+",
    "单篇生产周期从约 2 小时压缩至 20 分钟",
    "支撑每周 7 篇稳定产出",
    "粉丝从 52 万增长至 55 万，净增约 3 万",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--paper)]">
      <DetailHero
        eyebrow="Content Growth"
        title="AI Content Growth Workflow"
        tag="Case Study"
        desc="公众号内容增长与 AI 内容生产工作流案例。这里放的是我做选题、搭流程和整理后台数据的部分记录。"
      />

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-2">
          <DetailCard label="Background" title="项目背景">
            独立负责 55 万粉公众号内容策划，需要稳定产出，同时提升选题判断和生产效率。
          </DetailCard>
          <DetailCard label="Workflow" title="工作流程">
            选题池 → 标题测试 → 提纲 → 初稿 → 改写 → 发布
          </DetailCard>
        </div>

        <div className="mt-12">
          <SectionHeader
            eyebrow="Evidence"
            title="后台数据截图"
            desc="以下截图用于说明项目背景和结果，只保留适合公开展示的部分。"
          />
          <EvidenceImages
            images={[
              {
                src: "assets/wechat-growth-01.png",
                alt: "微信公众号增长数据截图 01",
              },
              {
                src: "assets/wechat-growth-02.png",
                alt: "微信公众号增长数据截图 02",
              },
            ]}
            caption="部分后台数据截图，已根据公开展示需要做脱敏处理。"
          />
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <DetailCard label="Results" title="结果记录">
            <ul className="space-y-3">
              {results.map((result) => (
                <li key={result}>{result}</li>
              ))}
            </ul>
          </DetailCard>
          <DetailCard label="Transfer" title="可以迁移的经验">
            这段经历让我更熟悉选题判断、内容开头、AI 批量起稿和发布节奏。后面做游戏投放脚本、海外社媒运营和 AI 产品内容时，这些方法可以继续复用。
          </DetailCard>
        </div>
      </section>
    </main>
  );
}

function DigestDetail() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--paper)]">
      <DetailHero
        eyebrow="Product Prototype"
        title="Digest 内化"
        tag="Project"
        desc="个人知识管理工具实验。这个项目从自己的阅读和整理需求出发，尝试把碎片信息整理成之后还能继续使用的结构。"
      />

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-2">
          <DetailCard label="Project Brief" title="项目简述">
            尝试把碎片化信息转化为可复用的知识结构，探索 AI 辅助阅读、整理和内化的产品形态。
          </DetailCard>
          <DetailCard label="My Role" title="我负责的部分">
            需求定义 / 交互设计 / 前端实现 / AI 辅助开发 / 持续迭代
          </DetailCard>
        </div>

        <div className="mt-12">
          <SectionHeader
            eyebrow="Screenshots"
            title="页面截图"
            desc="两张截图记录了当前原型状态，后续还会继续补功能和交互。"
          />
          <EvidenceImages
            images={[
              { src: "assets/digest-01.png", alt: "Digest 项目截图 01" },
              { src: "assets/digest-02.png", alt: "Digest 项目截图 02" },
            ]}
          />
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <DetailCard label="Process" title="过程">
            从个人需求出发，先定义信息整理流程，再用 Vibe Coding 快速完成页面原型和功能迭代。
          </DetailCard>
          <div className="matrix-card">
            <span className="font-mono text-xs text-[var(--acid)]">Links</span>
            <h3>项目材料</h3>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href={projectUrls.digest}
                target="_blank"
                rel="noreferrer"
                className="primary-action"
              >
                Visit Digest <ArrowUpRight size={16} />
              </a>
              <a
                href={assetPath("assets/digest-deck.pdf")}
                target="_blank"
                rel="noreferrer"
                className="secondary-action"
              >
                View Project Deck <FileText size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function MemoryMuseumDetail() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--paper)]">
      <DetailHero
        eyebrow="Web Experiment"
        title="Memory Museum"
        tag="Prototype"
        desc="个人交互网页与创意原型实验。这个项目更偏个人表达，记录我怎么把记忆、空间和网页交互放在一起试。"
      />

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-2">
          <DetailCard label="Concept" title="概念">
            围绕记忆、空间、个人叙事和网页交互，探索网页作为个人档案、非线性叙事和创意展示容器的可能性。
          </DetailCard>
          <DetailCard label="My Role" title="我负责的部分">
            创意方向 / 视觉叙事 / Web 原型 / AI Assisted Coding
          </DetailCard>
        </div>

        <div className="mt-12">
          <SectionHeader
            eyebrow="Screenshots"
            title="页面截图"
            desc="目前先放两张主要截图，说明页面氛围和交互方向。"
          />
          <EvidenceImages
            images={[
              {
                src: "assets/memory-museum-01.png",
                alt: "Memory Museum 项目截图 01",
              },
              {
                src: "assets/memory-museum-02.png",
                alt: "Memory Museum 项目截图 02",
              },
            ]}
          />
        </div>

        <div className="mt-12">
          <a
            href={projectUrls.memoryMuseum}
            target="_blank"
            rel="noreferrer"
            className="primary-action"
          >
            Visit Project <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

function VideoWorkDetail() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--paper)]">
      <DetailHero
        eyebrow="Video / Motion Practice"
        title="《照见痕迹》"
        tag="Practice"
        desc="一支个人视频练习作品，用于探索画面节奏、视觉叙事和情绪表达。它补充展示我在影像感、节奏感和视觉执行上的练习痕迹。"
      />

      <section className="section-shell">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="evidence-card flex min-h-[390px] flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-5">
              <span className="card-number">VIDEO 01</span>
              <StatusTag>个人练习</StatusTag>
            </div>

            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="mini-tag">Premiere</span>
                <span className="mini-tag">After Effects</span>
                <span className="mini-tag">Photoshop</span>
              </div>
              <h3>照见痕迹</h3>
              <p className="mt-5 max-w-xl leading-7 text-[var(--silver)]">
                文字型封面占位。后续如果整理出封面图，可以直接替换为截图或海报。
              </p>
            </div>
          </motion.article>

          <div className="grid gap-4">
            <DetailCard label="Intro" title="简介">
              《照见痕迹》是一支个人视频 / 动态视觉练习，用于展示我的视频表达、剪辑节奏、视觉组织和情绪叙事能力。
            </DetailCard>
            <DetailCard label="My Role" title="我负责的部分">
              创意构思 / 素材组织 / 剪辑节奏 / 视觉呈现 / 后期制作
            </DetailCard>
            <DetailCard label="Tools" title="使用工具">
              Premiere / After Effects / Photoshop
            </DetailCard>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <DetailCard label="Creative Note" title="创作说明">
            我希望通过素材组织、剪辑节奏和后期处理，建立一种“痕迹被看见”的情绪线索。它不是商业视频项目，更多是一次个人表达和动态视觉练习。
          </DetailCard>

          <div className="matrix-card">
            <span className="font-mono text-xs text-[var(--acid)]">External Link</span>
            <h3>观看视频</h3>
            <p className="mt-4 leading-7 text-[var(--muted)]">
              视频目前放在 Bilibili 外链，不直接放入项目文件。
            </p>
            <div className="mt-6">
              <a
                href={projectUrls.videoWork}
                target="_blank"
                rel="noreferrer"
                className="primary-action"
              >
                Watch Video <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden text-[var(--paper)]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[rgba(5,5,5,0.76)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#home" className="font-mono text-sm uppercase text-[var(--paper)]">
            Zhang Shaoyi / Evidence Lab
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
              Zhang Shaoyi builds proof of creative process.
            </h1>

            <div className="mt-8 grid gap-5 border-l border-[var(--line)] pl-5 text-base leading-8 text-[var(--silver)] md:max-w-3xl md:text-lg">
              <p>简历负责概括经历，这里放一些更具体的过程、草稿和项目记录。</p>
              <p>
                这个网站是我的简历补充页，主要记录我在 AI 内容生产、内容增长、游戏投放脚本和交互网页里的练习与项目。
              </p>
              <p>
                我目前更关注能落到实际材料里的创意：一条选题、一个脚本开头、一个页面原型，或者一套可以反复使用的内容流程。
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
              <strong>上海政法大学 网络与新媒体 大三在读</strong>
            </div>
            <div className="ledger-row">
              <span>Portfolio Focus</span>
              <strong>AI 内容创意 / 内容增长 / 游戏投放脚本</strong>
            </div>
            <div className="ledger-row">
              <span>Core Method</span>
              <strong>{"Observe -> Deconstruct -> Ship"}</strong>
            </div>
            <div className="ledger-mark">
              <span>04</span>
              <p>scripts, workflows and prototypes collected for job applications.</p>
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
            最近在补游戏投放脚本作品集，也在整理公众号内容增长、Digest 项目和一些交互网页实验。我希望这里能比简历多一点细节：我怎么观察平台、怎么拆题、怎么起稿，以及最后做出了什么。
          </motion.p>
        </div>
      </section>

      <section id="works" className="section-shell">
        <SectionHeader
          eyebrow="Selected Works"
          title="项目记录卡"
          desc="这里先放几个方向，方便快速扫一眼：我做过什么、负责哪部分、用了哪些工具、目前整理到什么程度。"
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {works.map((work, index) => {
            const detailHref = detailLinks[work.title];
            const Card = detailHref ? motion.a : motion.article;

            return (
              <Card
                key={work.title}
                href={detailHref}
                aria-label={detailHref ? `Open ${work.title} detail page` : undefined}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                className={`evidence-card group block ${
                  detailHref ? "cursor-pointer no-underline" : ""
                }`}
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
                    <dt>简介</dt>
                    <dd>{work.intro}</dd>
                  </div>
                  <div>
                    <dt>角色</dt>
                    <dd>{work.role}</dd>
                  </div>
                  <div>
                    <dt>工具</dt>
                    <dd>{work.tools}</dd>
                  </div>
                  <div>
                    <dt>产出</dt>
                    <dd>{work.proof}</dd>
                  </div>
                </dl>

                <ArrowUpRight
                  className="absolute bottom-5 right-5 text-[var(--muted)] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--acid)]"
                  size={22}
                />
              </Card>
            );
          })}
        </div>
      </section>

      <section id="abilities" className="section-shell">
        <SectionHeader
          eyebrow="Capability Matrix"
          title="我目前能做的几类事情"
          desc="这部分不按技能清单写，直接列我在项目和练习里经常会用到的几种做法。"
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
          desc="我通常会先自己判断方向，再用 AI 帮忙扩写和发散，最后人工筛选、修改和整理。"
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
              简历看经历，这里看细节。
            </h2>
          </div>

          <div className="contact-panel">
            <p>
              这个网站是简历的补充材料。我把一些项目记录、脚本草稿和页面实验放在这里，方便你看到简历之外的细节。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <a href="mailto:fuoguzz@gmail.com" className="primary-action">
                Email Me <Mail size={16} />
              </a>
              <a
                href={`${import.meta.env.BASE_URL}resume.pdf`}
                target="_blank"
                rel="noreferrer"
                className="secondary-action"
              >
                查看简历 PDF <FileText size={16} />
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

function App() {
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash,
  );

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (hash === "#/game-ads") {
    return <GameAdsDetail />;
  }

  if (hash === "#/content-growth") {
    return <ContentGrowthDetail />;
  }

  if (hash === "#/digest") {
    return <DigestDetail />;
  }

  if (hash === "#/memory-museum") {
    return <MemoryMuseumDetail />;
  }

  if (hash === "#/video-work") {
    return <VideoWorkDetail />;
  }

  return <HomePage />;
}

export default App;
