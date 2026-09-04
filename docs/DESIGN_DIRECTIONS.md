# ZSY Portfolio V2 — Design Directions

> 阶段：G1 Visual Direction Exploration  
> 日期：2026-09-01  
> 状态：方向提案，不是最终 Design System，也不代表已选定方案  
> 边界：本文件只定义三套首页视觉与交互方向；不开发 Production，不制作完整 Case Study

## 0. G1 任务定义

本轮要回答的不是“网站换成什么颜色”，而是：招聘者应通过什么信息组织方式，在 20–30 秒内理解 Zhang Shaoyi 的求职定位、重点项目与可信 evidence。

三套方向分别采用不同的核心对象、阅读路径和交互机制：

| 方向 | 核心对象 | 招聘者的主要行为 | 信息组织轴 | 核心交互 |
| --- | --- | --- | --- | --- |
| A — PROOFROOM 2027 | 一份可核验的招聘校样 | 扫读、对读 | Claim → Source → Decision | Proof Lens |
| B — PROOF CIRCUIT | 一条可追溯的能力证据链 | 选择、追踪 | Capability → Project → Action → Evidence | Claim Trace |
| C — CUT TO OUTCOME | 一段被编辑过的项目决策叙事 | 观看、推进 | Signal → Decision → Outcome | Three-Act Scrubber |

因此它们不是同一模板的浅色版、深色版和彩色版：

- A 是线性的 editorial dossier，排版与证据边栏承担识别。
- B 是可操作的 evidence browser，用户主动选择能力或主张再追踪证据。
- C 是时间性的 storyboard，项目按问题、决策、结果形成连续场景。

本阶段不评分、不选定最终方向。最终比较与 Hybrid 决策应在 G2 Prototype 获得 1440px 与 390px 实测结果后写入 `DESIGN_COMPARISON.md`。

## 1. 三个方向共同遵守的事实与产品底线

### 1.1 首屏必须直接回答

- Zhang Shaoyi
- 上海政法学院
- 2027 Graduate / 2027 届本科毕业生
- 主投顺序：AI 产品 → 产品运营 → 项目运营 → Content / Growth → AI Native
- 一句清楚、不过度承诺的 Positioning
- View Work / Resume / GitHub / Contact
- 至少一部分 Quick Proof 或第一个 Selected Work 预览

Hero 不使用 `100vh` 作为默认目标。1440×900 的普通笔记本视口中必须能看到下一部分的一部分。

### 1.2 项目真实性与优先级

- AI Content Growth Workflow 是当前证据最完整的 `REAL PROJECT`，G2 可作为首个验证项目。
- Digest 的团队性质、本人职责与独立开发部分保持 `TODO_USER_CONFIRM`，任何方向都不得把它定性为个人独立项目。
- Game Ads Script Demo 只作为 `SIMULATION / LAB` 候选，不进入默认首页 Featured Case Study。
- Memory Museum 与 Creative Work 负责差异化证明，不压过真实业务、产品与运营案例。
- 当前五个项目只用于验证结构，不是未来 Portfolio 的固定全集。

### 1.3 Evidence 不是“有截图 / 无截图”二元制

三套方向统一使用 claim-level 状态：

- `EVIDENCE_ATTACHED`：已有可公开或已脱敏附件直接支持。
- `USER_VERIFIED`：用户已经确认，可以保留；当前仓库未必已有公开附件。
- `NEEDS_VERIFICATION`：尚待确认或口径不完整，不作为首页正式结论。

当前可用于 G2 的示例只来自已确认内容：

- 约 55 万用户量级：`EVIDENCE_ATTACHED`
- 约 5k 峰值：`EVIDENCE_ATTACHED`，正式展示时标明截图日期区间
- 2h → 20min：`USER_VERIFIED`，后续补准确统计周期与测量方法
- 每周 7 篇：`USER_VERIFIED`，后续补时间范围

状态必须与 claim 同屏，不能只依赖颜色，也不能藏在 hover 中。`NEEDS_VERIFICATION` 不进入首页 Quick Proof。

### 1.4 FUTURE_CASE_STUDIES 是结构能力，不是虚构内容

未来将增加真实、脱敏的：

- AI Product
- AI Workflow
- Automation
- Internal Product / Tool
- Project Operations

所有方向必须允许这些项目按真实价值插入最高优先级，而不需要重做首页结构。G2 可以使用只写 `FUTURE_CASE_STUDY — structure reserved` 的内部结构占位；不得补项目名称、公司、职责、时间、团队、截图、数据或结果。正式公开版本在没有内容时应隐藏该占位。

### 1.5 通用体验底线

- 真实 screenshot 优先，不生成假产品界面、假 KPI、假用户或假办公场景。
- Resume 正式公开版移除出生日期和手机号；所在地继续等待确认。
- 核心导航和信息不依赖 hover、Command Palette、动画或 JavaScript 才能理解。
- 支持键盘、Visible Focus、触摸替代、语义 HTML 与 `prefers-reduced-motion`。
- 不使用 Three.js / WebGL 作为默认方案。
- 非首屏图片 lazy load，真实截图提供 responsive variants，并保持小字可读。
- 每个方向只定义色彩与字体假设；正式 token 在 G3 统一建立。

---

# Direction A — PROOFROOM 2027 / 招聘校样

## A1. 核心概念

把 Portfolio 设计成一份正在被编辑、核验、交付的“招聘校样”。它不是简历排版、复古报纸或杂志拼贴，而是一套事实先行的 editorial interface：每个重要陈述都能在同一视野内找到项目性质、本人角色、结果、证据状态与来源说明。

核心组织轴是：

```text
CLAIM → SOURCE → DECISION
```

识别来自四个稳定元素：浅纸色底、清楚的黑色排版、校样蓝标记、正文旁的 Evidence Margin。真实截图是“图版”，排版负责让事实更可信，而不是替代事实。

## A2. Recruiter First View

1440×900 的建议节奏：

- 0–5 秒：姓名、学校、2027 届。
- 5–12 秒：主投顺序、定位句、四个主要入口。
- 12–20 秒：2–3 条 Quick Proof，以及各自 evidence status。
- 20–30 秒：视口下沿出现第一张真实项目图和 AI Content Growth 标题。

建议高度控制：56px masthead + 430–480px Hero + 140–170px proof strip，不使用全屏 Hero。

## A3. Layout

- 桌面采用 12 栏“正文 + 证据边栏”的非对称编辑网格。
- 正文占 8–9 栏；右侧 3–4 栏作为 Candidate Docket / Evidence Margin。
- Hero 左侧放姓名、定位与岗位顺序，右侧放学校、届别、Resume、GitHub、Contact 等事实栏。
- Quick Proof 是有分隔线的横向排版，不做三个圆角 KPI 卡。
- Selected Work 使用 `Lead Story + Supporting Features`：一个真实项目主专题，加若干不同权重的支持专题。
- Section 使用 folio、横线、标题与一句说明划分；不形成满屏 Bento。
- Lab 是独立尾部索引，视觉权重显著低于 Selected Work。

## A4. Typography

- Display：中文 serif + 拉丁 editorial serif，用于姓名、章节与项目标题。
- Body / UI：高可读 sans-serif。
- Metadata / Evidence ID：克制的 mono，仅用于状态、编号与图注。
- 姓名建议 64–88px `clamp()`；项目标题 36–56px；正文 16–18px、约 1.6 行高。
- 中文不做过度字距，元信息不回到当前 11px 全大写的可读性问题。
- 性能上只保留两种实质字体角色；CJK serif 只用于短标题，正文优先系统字体。

## A5. Color Hypothesis

这是方向验证用的色彩角色，不是 G3 最终 token：

- Paper：暖灰纸色
- Ink：近黑
- Graphite：次级说明
- Proof Blue：链接、Focus、引用关系和 `EVIDENCE_ATTACHED`
- Vermilion：极少量校样批注，不承担主 CTA

`USER_VERIFIED` 与 `NEEDS_VERIFICATION` 同时使用完整文字、图标和不同线型，不以颜色作为唯一判断。

## A6. Image Strategy

- 真实截图按 Plate 编号，不套设备 mockup。
- AI Content Growth 使用真实后台趋势图作主图，数据截图作为 inset；图注包含日期区间、脱敏说明和 evidence status。
- Digest 使用真实产品界面，不用纯概念封面替代功能；项目性质与职责保持未确认。
- Memory Museum 以真实界面承担 `EXPERIMENT` 差异化。
- Video 只有获得真实截帧或正式封面后才使用。
- Game Ads 不生成封面，只进入 Lab 文本索引或真实脚本材料。
- 小屏截图提供明确的放大按钮与准确 alt，不能把含小字的截图缩成不可读邮票。

## A7. Navigation

桌面使用 56px 细 masthead：

```text
ZSY / PROOFROOM 2027 | Work | Experience | Evidence | Lab | About | Resume | GitHub | Contact
```

- 提供 Skip to Work。
- Resume、GitHub、Contact 始终处于顶层。
- 岗位视图只重排共享项目与能力顺序，不复制网站。
- 移动端使用可键盘操作的 menu sheet，并保留 Resume 与 Contact 的快速入口。

## A8. Project Presentation

每个 Featured Project 是一篇紧凑编辑专题，而不是统一卡片。固定事实顺序：

```text
Classification / Status
→ Name
→ Problem
→ My Role
→ Result or Output
→ Main Plate
→ Representative Evidence
→ Read Case
```

- AI Content Growth 作为当前 lead story。
- Digest 只使用中性 `PROJECT / PROTOTYPE` 描述；G2 内部可标记 `TODO_USER_CONFIRM`，正式公开前不得留下未完成标签或擅自补结论。
- Memory Museum 使用 `EXPERIMENT`。
- Game Ads 只出现在 Lab，并明确 `SIMULATION`。
- 未来真实 AI Product / Workflow / Operations Case 可直接替换 lead 或插入前列。

## A9. Evidence Presentation

Evidence Margin 给 claim 分配引用编号，例如 `[E-01]`，边栏显示：

- Evidence status
- Source type
- Date range / Scope
- Public / Redacted note
- 可公开附件入口

Claim 的核心数字、状态和来源摘要必须静态可读；边栏展开只做增强。Digest 的 `TODO_USER_CONFIRM` 是内容事实状态，不是第四种 evidence status。

## A10. Motion Language

动效像“编辑翻校”：

- 160–240ms 的轻微淡入、裁切揭示与横线绘制。
- 位移控制在 8–12px。
- Focus 某条 evidence 时，引用线与图注短暂增强。
- 不做持续 loop、鼠标追随、粒子、3D、强视差或长 page transition。
- Reduced Motion 下所有内容初始可见，引用关系即时出现。

## A11. Signature Interaction — Proof Lens

当招聘者 focus 或点击一条 claim 时，同步强调：

1. 正文中的 claim
2. 右侧对应 Evidence ID
3. 真实截图中的相关区域
4. 来源与统计区间说明

桌面通过边栏完成对读；移动端变为 claim 下方的 inline disclosure。它的目的不是制造“连线动画”，而是缩短从结论到证据的核验路径。

## A12. Mobile Strategy

- 桌面 12 栏不直接缩小，移动端重排为单列。
- Evidence Margin 移到各 claim 下方的 accordion。
- Hero 控制在约 620px 内；姓名 44–56px。
- Quick Proof 变为三行，数字、口径和状态同屏。
- Project 顺序为标题 → Problem / Role / Result → image → evidence。
- 所有核心信息不依赖 hover；触摸目标至少 44px。
- Resume、GitHub、Contact 在 Hero、menu 与 footer 均可达。

## A13. FUTURE_CASE_STUDIES Scalability

- Featured Work 基于 priority 和 classification 生成，不按当前 `01–05` 写死。
- 新真实项目可插入首位，Experiment 与 Simulation 自动下沉到 Lab。
- Case template 的 Context、Problem、Role、Constraints、Decisions、Evidence、Results、Reflection 均为可选模块。
- 首页的 lead/supporting 关系来自内容优先级，不来自固定项目名称。

## A14. Performance Risk

主要风险：CJK serif、详情大图与证据放大交互。

控制方式：标题字体子集化；正文使用系统 CJK；仅首张必要图片 eager；其余 lazy；输出 AVIF/WebP 与 `srcset`；原始大图按需加载；Proof Lens 使用 CSS 和轻量状态，不引入图表或 3D 库。

## A15. 优点

- 招聘信息清晰度和线性扫读能力最强。
- “校样 + Evidence Margin”有明确识别，不像普通模板或 SaaS 页面。
- 能把 AI Native 转译为可核验的方法，而不是 AI cliché。
- 对截图风格不统一有容错，图版与图注可建立秩序。
- 对未来真实 Case 的插入和扩展友好。

## A16. 缺点

- 第一眼的实验性比 B、C 克制，需要依靠优秀排版和真实内容取胜。
- 执行不当会像论文、政府报告或复古假杂志。
- Evidence 标记过密会让页面出现“审核表”压力。
- Proof Lens 如果发展成复杂连线图，会破坏移动端与职业感。

## A17. G2 Minimum Prototype

只验证：

1. Masthead 与 mobile menu
2. 完整身份 Hero 与四个 CTA
3. 三条 Quick Proof 及正确 evidence status
4. AI Content Growth lead story 与两条 Proof Lens
5. Digest、Memory Museum 各一个精简 supporting feature
6. 一个内部 `FUTURE_CASE_STUDY` 结构占位
7. Lab 中一行 Game Ads `SIMULATION`
8. 1440px、390px、键盘 focus 与 reduced-motion 静态态

不做完整详情页、复杂岗位重排或全站路由。

---

# Direction B — PROOF CIRCUIT / 证据回路

## B1. 核心概念

把 Portfolio 设计成一条可追溯的能力证据链。招聘者可以从岗位能力或一条真实 claim 出发，沿着项目、本人行动、产出和附件完成核验。

核心组织轴是：

```text
CAPABILITY → PROJECT → DECISION / ACTION → OUTPUT → EVIDENCE → RESULT
```

视觉母题来自克制的线路图、测试记录和真实界面标本，但不做 Dashboard、终端、桌面 OS 或赛博控制中心。实验性来自“证据如何连接”，不是来自粒子和装饰。

## B2. Recruiter First View

Hero 建议 580–640px，加 64px 导航。桌面使用 12 栏：

- 左 7 栏：姓名、学校、届别、完整主投顺序、定位和四个 CTA。
- 右 5 栏：`START HERE`，静态列出当前三个推荐入口及项目分类。
- Hero 下缘：三条 Quick Proof，状态直接显示。

即使招聘者完全不操作，也能在 20–30 秒内看到身份、岗位、重点项目、evidence、Resume、GitHub 与联系方式。交互只是提供第二层理解效率。

## B3. Layout

- 首页顺序：Compact Nav → Identity Hero / Start Here → Quick Proof → Proof Browser → Experience → Capability Evidence → Lab → About → Contact。
- Selected Work 由纵向“线路段”组成，不做满屏 Bento。
- 首个真实项目以大图 + 证据摘要构成主要线路段。
- 后续项目共享可扩展数据结构，但允许不同图片比例与阅读节奏。
- Work 与 Lab 明确分区，Simulation 不使用和真实结果相同的样式。
- Case Study 沿 `Context → Problem → Role → Constraint → Decision → Output → Evidence → Result → Reflection` 展开；空模块不渲染。

## B4. Typography

- Display / UI：现代、略紧凑的 grotesk。
- 中文：高可读系统或本地 sans-serif。
- Metadata：mono，只用于分类、时间、Evidence Status 和口径。
- 数字使用 tabular numerals，但不做夸张 KPI 墙。
- 姓名桌面 56–72px，移动端 38–46px；元信息至少 12–13px。
- 正文不使用 mono，避免把实验界面做成终端模拟器。

## B5. Color Hypothesis

- Warm Paper：中性暖底
- Ink：近黑
- Evidence Surface：白色
- Signal Cobalt：能力与可点击线路
- Process Orange：关键决策与行动
- Muted Graphite：上下文和非活动线路

不使用蓝紫渐变、荧光泛光和大面积黑底。状态同时依赖文字、图标与边框模式。

## B6. Image Strategy

- 真实截图处于 evidence tray 中，网站 UI 主动退后。
- AI Content Growth 的两张后台图同时承担项目主图和附件来源，提供明确裁切与放大查看。
- Digest 使用真实产品截图与 Deck，不生成假 AI 界面，也不从截图推断本人职责。
- Memory Museum 使用真实界面图。
- Video 必须使用真实成片截帧或公开海报。
- Game Ads 无视觉资产时使用真实脚本结构，不生成广告投放截图。
- 图片不是唯一信息载体；状态、结论和 alt 在图片外保持可读。

## B7. Navigation

```text
ZSY / 2027 | Work | Experience | Capabilities | Lab | About | Resume | GitHub | Contact
```

- Resume、GitHub、Contact 始终在顶层。
- 移动端顶栏保留 `ZSY / 2027`、Resume、Menu；Menu 中直接提供 GitHub 和 Contact。
- `/product`、`/growth`、`/creative` 共享项目数据，只改变 Positioning、推荐顺序与 capability emphasis。
- Command Palette 若未来加入，只能作为增强，不是本方向的核心或唯一导航。

## B8. Project Presentation

每个 Project Segment 至少包含：

- Classification / Status
- My Role
- Problem
- Action / Decision
- Output / Result
- Capability mapping
- 2–3 条 representative claim
- Evidence status 与详情入口

AI Content Growth 作为当前默认首项。Digest 在 G2 仅用中性类别，事实未确认处不下结论；正式发布前不公开内部 TODO 标签。Game Ads 只在 Lab，并明确没有真实 campaign result。

## B9. Evidence System

Evidence 必须是 claim-level，而不是给整个项目笼统盖章。建议内容模型：

```text
claim
wording / value
evidenceStatus
sourceType
attachment
dateRange / scope
disclosureNote
capabilities[]
verificationNote
```

`USER_VERIFIED` 不能伪装成已有附件；`NEEDS_VERIFICATION` 不进入首页结果标题。Digest 的项目性质 TODO 继续作为独立的 content fact 状态。

## B10. Motion Language

动效像信号完成一次传递：

- 选中 claim 后，连接线在 250–400ms 内完成一次描边。
- Evidence panel 短距离 reveal。
- Role Lens 在 180–240ms 内改变强调，不让项目突然消失。
- 项目图片最多执行一次轻量 clip reveal。
- 无持续动画、鼠标追随、3D、粒子循环或视差背景。
- 内容初始存在于 DOM，不依赖动画解除透明。

## B11. Signature Interaction — Claim Trace

招聘者选择一条 claim 后，同区展开完整证据回路：

```text
Claim
→ Evidence Status
→ Source / Attachment
→ Date or Scope
→ What It Proves
```

例如，`EVIDENCE_ATTACHED` 可以打开真实脱敏截图；`USER_VERIFIED` 清楚说明当前没有公开附件，并保留待补口径；`NEEDS_VERIFICATION` 不伪装成结果。

次级交互是 Role Lens：

```text
All / AI Product / Product Ops / Project Ops / Growth / AI Native
```

它只调整强调和推荐顺序，并解释 `Why this work matters for this role`；不改变项目事实、不删除其余项目，并始终提供 Show All Work。

## B12. Keyboard, Touch and Mobile

- Role Lens 使用原生 button / radio pattern。
- Claim Trace 使用 tabs 或 accordion pattern，支持 Tab、Enter / Space、方向键、Home / End。
- 触摸目标至少 44×44px；截图缩放是明确按钮。
- 移动端把桌面线路图改写为线性证据链：截图 → 摘要 → claim → Trace Evidence。
- Role Lens 可换行，不依赖横向 carousel。
- `prefers-reduced-motion` 下线路即时出现，项目不重排动画，Trace 变为静态完整链条。
- Focus 使用明确的高对比外描边，并提供 Skip Link。

## B13. FUTURE_CASE_STUDIES Scalability

项目模型至少支持：

```text
classification
status
priorityByTrack
capabilities[]
claims[]
evidence[]
visibility
disclosure
recommendedFor[]
```

新真实 AI Product、Workflow、Automation、Internal Tool 或 Project Operations Case 可以直接插入默认首位，现有 Experiment 与 Simulation 自动下沉。结构不依赖当前项目数量或固定编号。

## B14. Performance Risk

主要风险：SVG 连接线持续测量 DOM、Role Lens 重排、证据原图加载、多字体和全量详情进入首屏 bundle。

控制方式：使用 CSS grid 与预定义 SVG，不做每帧坐标追踪；非活动线路不动画；图片 responsive + lazy；原图按需加载；字体子集化；Case route code split；不用 Canvas、WebGL 或 3D 库。

## B15. 优点

- 交互实验性直接服务于岗位匹配和可信度判断。
- 能清楚区分附件证据、用户确认与待核验内容。
- Capability 与项目的关系比普通技能列表更有说服力。
- 面向不同岗位的共享数据视图自然成立。
- 当前 Growth evidence 与未来 AI Product / Operations Case 都能进入同一系统。

## B16. 缺点

- Claim-level 数据与公开口径需要长期维护，编辑成本最高。
- 标签与线路过多会快速变成流程图噪音。
- Role Lens 排序变化过强，可能让招聘者误认为存在多版事实。
- 键盘、读屏、触摸与 reduced-motion 的实现和 QA 成本高于 A、C。
- 如果视觉控制不足，可能像数据产品或研究工具，而不像个人作品集。

## B17. G2 Minimum Prototype

只验证一个闭环：

1. 完整身份 Hero、Start Here 与四个 CTA
2. 三条 Quick Proof 及正确状态
3. AI Content Growth、Digest、Memory Museum 三条 Project Segment
4. 一条 `EVIDENCE_ATTACHED` 与一条 `USER_VERIFIED` 的 Claim Trace
5. 一个可工作的 Role Lens，但不做独立岗位网站
6. Evidence status legend
7. 一个内部 `FUTURE_CASE_STUDY` 结构占位
8. Game Ads 仅在 Lab 标为 `SIMULATION`
9. 1440px、390px、键盘与 reduced-motion 验证

不做完整详情页、Command Palette、3D 或所有项目的完整 Trace。

---

# Direction C — CUT TO OUTCOME / 日光分镜

## C1. 核心概念

把 Portfolio 设计成一套明亮的“产品分镜系统”。项目不是档案卡片或证据节点，而是一段从问题信号、关键决策到可见产出的连续叙事。

核心组织轴是：

```text
SIGNAL → DECISION → OUTCOME
```

C 主动舍弃当前的黑底、荧光绿、Archive、OS、命令行、仪表盘和实验室语言。视觉世界来自日光下的 storyboard、broadcast title card 与剪辑节奏：大画面、短字幕、明确转场。AI Native 气质通过“把复杂过程编辑成清楚的决策链”体现，而不是通过 AI cliché。

## C2. Recruiter First View

1440×900 下 opening 控制在约 620–680px，底部直接露出第一个 Featured Project 的真实截图。

信息顺序：

1. Zhang Shaoyi
2. 2027 Graduate / 2027 届本科毕业生 · 上海政法学院
3. AI 产品 → 产品运营 → 项目运营
4. Content / Growth · AI Native
5. 一句定位
6. View Work / Resume / GitHub / Contact
7. 紧凑 Quick Proof 字幕带

阅读节奏：0–5 秒识别身份；5–12 秒理解方向并看到 CTA；12–25 秒看到证据和 Selected Work；随后进入项目决策过程。

## C3. Layout

首页由纵向连续的 Scene Bands 组成：

```text
Opening Title
→ Quick Proof Caption Bar
→ Selected Work Scenes
→ Experience
→ Capability Evidence
→ Lab / Closing Credits
→ About / Resume / Contact
```

- Featured Project 使用交替的 60/40 大画面构图，而不是同质卡片。
- 一侧是真实 screenshot，另一侧只保留 Project Type、Role、Problem、Decision、Result 和 Evidence Caption。
- 每个重点项目是一段可独立阅读的场景，不使用固定 `01–05` 作为结构依赖。
- Lab 采用较小的 closing credits 形式，明显降级。
- Case Study 沿 Opening Frame → Context → Signal → Decisions → Shipped Output → Evidence → Reflection 展开；无内容的章节不出现。

## C4. Typography

- Display：厚重、略窄的 grotesk，形成 broadcast title 感。
- Body：高可读现代 CJK sans-serif。
- Metrics：tabular numerals，但不模拟终端。
- Evidence Caption：中等字重的小型 sans，不用过细 11px 全大写。
- 项目叙事以大标题、一句字幕和大图为主，减少长段落。
- 网络字体仅加载必要的 Latin display 子集；中文正文优先系统字体。

## C5. Color Hypothesis

这是三套中最明确的日间高色彩方向：

- Paper：暖米白
- Ink：深蓝黑
- Cobalt：结构与主 CTA
- Persimmon：关键决策与跳转
- Butter：场景切换与节奏
- Soft White：图片承托面

无蓝紫 AI 渐变、荧光、黑色满屏背景。色彩不承担 evidence 真假含义；状态仍同时依赖文字和图形。

## C6. Image Strategy

真实 screenshot 是“场景”，不是卡片缩略图：

- AI Content Growth 的趋势图作为宽幅主画面，数据截图以接近原生尺寸的 inset 呈现。
- Digest 的概念封面与产品界面可以形成两个连续 frame，但项目性质仍不下结论。
- Memory Museum 作为 `EXPERIMENT`，利用真实浅色界面形成节奏变化。
- Video 只使用真实成片截帧或正式封面。
- Game Ads 只进入 `SIMULATION / LAB`。
- 允许使用纯排版色块、简洁矢量遮罩与 title card；禁止假 screenshot、假 KPI 和假办公场景。
- 截图裁切必须保留理解指标所需的日期、轴线或上下文。

## C7. Navigation

桌面使用轻薄固定导航：

```text
Zhang Shaoyi | Work | Experience | About | Resume | GitHub | Contact
```

- Resume 是明确入口，不藏在页尾。
- 当前章节用短色条提示，不使用终端状态。
- 岗位视图入口可放入 Work 区，不需要挤满顶栏。
- 移动端 56px 紧凑栏保留 `ZSY`、Work、Resume、Menu；Menu 直接露出 GitHub 与 Contact。

## C8. Project Presentation

每个场景首层只回答：

- 它是什么
- 项目分类
- 我承担什么
- 面对什么问题
- 做了哪个关键决策
- 有什么输出或结果

当前 G2 内容可使用 AI Content Growth、Digest、Memory Museum 验证节奏，但这不是未来固定排序。任何更高价值的真实 AI Product / Workflow / Automation / Internal Tool / Project Operations Case 都可以插入首位并替代当前主场景。

Digest 不使用“独立完成”或“个人产品”等暗示。Game Ads 只在 Lab，以较小条目出现。

## C9. Evidence Presentation — Claim Captions

Evidence 不做边栏或线路图，而像字幕一样紧贴结果：

```text
约 55 万用户量级
● EVIDENCE_ATTACHED · 脱敏后台截图 · 日期说明
```

```text
2h → 20min
◐ USER_VERIFIED · 统计周期与测量方法待补
```

- 有附件的 Caption 可以打开轻量 evidence drawer。
- 无附件的状态不能伪装成可点击证据。
- `NEEDS_VERIFICATION` 不进入 Quick Proof，也不作为 Outcome 标题。
- Evidence drawer 是增强；Claim Caption 本身已经包含必要含义。

## C10. Motion Language

动效来自“剪辑”：

- 160–260ms 的硬切、短滑动或遮罩 wipe。
- 标题与截图错开半拍进入，形成节奏而非漂浮。
- 项目状态只在用户操作时切换。
- CTA 以快速色块交换反馈。
- 不做粒子、3D、无限 loop、滚动劫持或大面积 parallax。
- 普通内容初始可见，避免滚动触发前的空白。

## C11. Signature Interaction — Three-Act Scrubber

每个 Featured Project 提供三段式控制：

```text
SIGNAL → DECISION → OUTCOME
```

切换后同步改变：

- 主截图或真实过程画面
- 一句阶段摘要
- 对应 Evidence Caption

初始状态仍显示项目总览，核心信息不依赖交互。桌面支持点击与方向键；移动端不强制横向 scrub，改为三个纵向段落或 accordion；Reduced Motion 下直接替换内容，不使用 wipe。

## C12. Mobile Strategy

- 390×844 下 Hero 控制在约 620–700px，身份、方向和四个入口在第一屏或紧邻第一屏。
- Quick Proof 为两到三行，不做跑马灯。
- Featured Work 使用全宽截图 + 纵向三幕。
- 默认展开 Outcome，并同时保留 Signal 与 Decision 的明确入口。
- 不依赖 hover；Evidence status 常驻。
- Sticky nav 始终可达 Resume 和 Menu。
- 图片保持原始比例，无横向滚动。
- Reduced Motion 下所有场景即时显示，不启用 smooth scroll。

## C13. FUTURE_CASE_STUDIES Scalability

项目数据支持：

```text
classification
status
priorityByTrack
role
problem / signal
decisions[]
outputs[]
claims[]
evidence[]
media[]
```

新真实项目可以按优先级插入 Featured Work，不需要重新编号或重建网格。没有量化结果的真实项目可以用可核验的 shipped output、决策和过程材料承担 Outcome，不硬造数字。Experiment 与 Simulation 自动下沉到 Lab。

## C14. Performance Risk

主要风险：大图、遮罩动画、中文标题换行与过多 scene media。

控制方式：AVIF/WebP + `srcset`；只让首个必要截图 eager；其余 lazy；CJK 正文使用系统字体；wipe 限制为短时 transform / opacity / 谨慎的 clip-path；Scrubber 使用 React 状态与 CSS，不引入视频时间轴或 3D 库；首页不自动播放视频。

## C15. 优点

- 与当前黑底荧光绿语言最彻底地拉开距离。
- 通过叙事机制而不是装饰建立辨识度。
- 能统一产品、运营、增长与创意项目的阅读方法。
- 大尺寸真实 screenshot 能快速证明产出。
- 视觉活力高于 A，认知负担低于复杂 evidence graph。
- 未来新增真实 Case 不会破坏结构。

## C16. 缺点

- 分镜隐喻过强时，可能被误解为偏视频或 Creative 岗位。
- 每个项目都需要提炼出准确的 Signal、Decision、Outcome，内容编辑成本高。
- 大画面容易放大当前 screenshot 分辨率和风格差异。
- Evidence Caption 过多会形成字幕噪音。
- 大标题与场景色块需要认真校准中文换行和移动端高度。

## C17. G2 Minimum Prototype

只验证：

1. Sticky Navigation
2. 完整身份 Hero 与四个 CTA
3. Quick Proof Caption Bar
4. AI Content Growth 的完整 Three-Act Scrubber
5. Digest 与 Memory Museum 各一个静态 teaser
6. 一个内部 `FUTURE_CASE_STUDY` 结构占位
7. Lab 中一行 Game Ads `SIMULATION`
8. 一次轻量 Evidence drawer
9. 1440px、390px、键盘与 reduced-motion 验证

不做完整详情页、视频播放、3D、全站 Resume 改版或所有项目迁移。

---

## 2. G2 前的验证问题

三个 Prototype 必须用同一组真实内容和同一组任务验证，不能让某个方向靠更多内容取胜。

### 招聘信息清晰度

- 5 秒内能否看到姓名、2027 届与学校？
- 12 秒内能否说出主投前三个方向？
- 20–30 秒内能否找到三项重点 Work、evidence、Resume、GitHub 与 Contact？

### 真实性与证据

- 招聘者能否区分 `EVIDENCE_ATTACHED`、`USER_VERIFIED` 和 `NEEDS_VERIFICATION`？
- Digest 是否完全没有被暗示为个人独立项目？
- Game Ads 是否明确处于 Simulation / Lab，而不是默认 Featured？

### 扩展性

- 加入一个不含任何虚构内容的 `FUTURE_CASE_STUDY` 结构测试后，页面是否仍成立？
- 如果未来真实 AI Product Case 取代当前首项，视觉系统是否无需重做？
- 项目数量从 5 增长到 8–10 时，导航和 Selected Work 是否仍清楚？

### Interaction and Accessibility

- 不操作交互时，核心信息是否仍完整？
- Keyboard、Touch 与 Reduced Motion 是否传达相同信息？
- 交互是否帮助理解，还是只增加等待与认知负担？

### Mobile and Performance

- 390px 下是否无横向滚动、无不可读截图、无过长 Hero？
- 首个真实项目能否在约 1–1.5 屏内出现？
- 是否不依赖持续 animation loop、3D 或首屏大视频？

## 3. G1 Exit Boundary

本文件完成后仍未发生以下事项：

- 未选择最终方向或 Hybrid
- 未建立正式 Design Tokens
- 未开发 `/experiment/a`、`/experiment/b`、`/experiment/c`
- 未修改 Production UI
- 未实现 Case Study、Routing 或 Engineering Refactor
- 未生成视觉素材
- 未创建 `DESIGN_COMPARISON.md`

下一 Gate 只有在用户确认进入 G2 后，才应为三个方向制作受控首页 Prototype，并以相同内容、相同断点和相同测试问题进行比较。
