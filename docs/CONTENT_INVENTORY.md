# ZSY Portfolio V2 — Content Inventory

> 版本：G5A Evidence Refresh  
> 更新日期：2026-09-03  
> Canonical facts：[CONTENT_SOURCE_OF_TRUTH.md](./CONTENT_SOURCE_OF_TRUTH.md)  
> 原则：旧项目保留但重新分层；没有公开证据不等于删除用户已确认事实，没有用户确认也不因现有截图而自行推断。

## 1. Governance Labels

### Content state

- `CONFIRMED`：稳定规范信息，可作为公开内容基础。
- `USER_VERIFIED`：用户已确认，但不一定已有公开附件。
- `NEEDS_CONTENT`：存在真实项目，公开叙事 / 截图 / 结果仍不完整。
- `NEEDS_VERIFICATION`：口径、事实或可公开性仍需确认。
- `REDACT_REQUIRED`：公开前必须脱敏。
- `INTERNAL_ONLY`：只用于内部治理，禁止公开。

### Editorial action

- **KEEP / PROMOTE**：保留并提升优先级。
- **KEEP / REWRITE**：事实有价值，需要重写结构、职责或证据说明。
- **DEMOTED**：保留，但不再占据默认首页优先位置。
- **LAB**：移入实验 / 创意区，不与真实业务 Case 同级。
- **NEEDS REVIEW**：在证据、隐私或事实冲突处理前不进入正式发布。

旧版 `EVIDENCE_ATTACHED / USER_VERIFIED / NEEDS_VERIFICATION` 不再作为单一内容状态。当前统一把“事实状态”“附件是否存在”“公开是否需脱敏”分别记录。

## 2. Canonical Identity Inventory

| Field | Current value | State | Action |
| --- | --- | --- | --- |
| 中文姓名 | 张少毅 | `CONFIRMED` | KEEP |
| English name | Zhang Shaoyi | `CONFIRMED` | KEEP |
| 学校 | 上海政法学院 | `CONFIRMED` | KEEP；旧“上海政法大学”已过时 |
| 专业 | 网络与新媒体 | `CONFIRMED` | KEEP |
| 届别 | 2027 届本科 / 2027 Graduate | `CONFIRMED` | KEEP；移除“大三在读” |
| 默认定位 | 产品运营 → 项目运营 → AI 应用 → 业务数字化 | `CONFIRMED` | REPLACE old priority |
| Email | `fuoguzz@gmail.com` | `CONFIRMED` | KEEP |
| GitHub | `https://github.com/Fuoguz` | `CONFIRMED` | KEEP |
| 所在地 | 暂不展示 | `NEEDS_VERIFICATION` | HIDE |
| 手机号 / 出生日期 | 不公开 | `INTERNAL_ONLY` | REMOVE from future public Resume |

## 3. Current Project Inventory

| Priority | Project | Classification / status | Evidence and assets now | Editorial action |
| --- | --- | --- | --- | --- |
| Featured 01 | EagleHub / 企业人才培养管理平台 | REAL PROJECT / INTERNAL PRODUCT | 用户确认事实 + 3 张公开安全重绘图；仍无真实公开截图 | **PROMOTE + EVIDENCE HARDENED** |
| Featured 02 | TEX AI Onboarding Automation | REAL BUSINESS WORK / INTERNAL AUTOMATION / Validated Prototype / Dry-run | 用户确认流程 + 2 张重绘图 + 1 张匿名 Demo Data | **PROMOTE + PUBLIC REDACTED** |
| Featured 03 | AI Content Growth Workflow | REAL PROJECT | 两张脱敏后台截图、真实内容工作流、用户确认指标 | **KEEP + DEMOTED from 01** |
| Supporting | 自由组队平台 | REAL PROJECT / INTERNAL TOOL / SHIPPED / USED | 用户确认事实 + 2 张公开安全重绘图；仍无真实截图 | **PROMOTE AS SUPPORTING + EVIDENCE HARDENED** |
| Experience evidence | 雏鹰专项集训 | REAL BUSINESS / PROJECT OPS | 用户确认事实 + 1 张运营协作重绘图 | **KEEP IN EXPERIENCE / ROLE LENS** |
| Potential | Globridge | AI-assisted full-stack business system | 现有范围为用户确认；背景、角色、时间、截图、结果、公开边界缺失 | **NEEDS_CONTENT / DO NOT TOP 3 YET** |
| Lab | Digest 内化 | LAB / EXPERIMENT；性质与职责待确认 | 两张真实界面、10 页 Deck、Live Demo | **DEMOTED TO LAB + NEEDS_VERIFICATION** |
| Lab | Memory Museum | EXPERIMENT | 三张真实截图、Live Project | **DEMOTED TO LAB** |
| Lab | Video / Motion《照见痕迹》 | CREATIVE WORK / LAB | Bilibili 成片；站内缺真实封面 | **LAB + NEEDS CONTENT ASSET** |
| Lab | Game Ads Script Demo | SIMULATION | 文案草稿；无真实投放数据 | **LAB / NEVER DEFAULT FEATURED** |

## 4. Featured and Supporting Detail

### 4.1 EagleHub

- **Problem space**：新人带教 / 人才培养中的多角色、师徒关系、培养计划、任务反馈、进度、部门隔离与权限协作。
- **User contribution**：早期产品方案、核心功能框架、多角色需求；AI 辅助原型与本人参与部分的功能实现、迭代和问题排查。
- **Continued involvement**：部门层级筛选、权限同步、导师变更、师徒关系、异常数据。
- **Scale**：相关框架后续用于约 480 对师徒、约 6 个月培养场景。
- **Boundary**：不得声称独立完成整个最终 Production System 或软件工程同事的全部后续成果。
- **Public visual**：系统概览、角色模型与变化闭环重绘图；均明确标注，不伪装成内部 UI。
- **Remaining gap**：真实脱敏 UI、迭代记录与本人实现范围材料。

### 4.2 Onboarding Automation

- **Workflow**：Roster → parsing → grade / employee type routing → navigation mapping → record comparison → review / export。
- **Validated**：读取花名册 / 业务数据、规则路由、P2 / P3 导航、逐字段 Diff；测试样本目标字段曾达到 11 / 11 一致。
- **Current status**：Validated Prototype / Dry-run / read-only first；不描述为 Fully Shipped 或已自动写入生产。
- **Public value**：识别重复劳动、结构化人工规则、形成可验证的自动化流程。
- **Public visual**：Before / After、规则路由与明确标注的匿名 Demo Data。
- **Remaining gap**：真实脱敏 Dry-run 输出、11 / 11 字段范围与测试条件。

### 4.3 AI Content Growth Workflow

保留内容：

- 约 55 万粉丝公众号
- 单篇最高阅读量 2 万+
- 长期每周约 7 篇
- Claude + Gemini 内容工作流
- 选题分析、资料整理、内容结构、初稿、人工校验
- 单篇约 2 小时 → 20–30 分钟

该项目主要证明 Growth、Content Operations、AI Workflow、Process Optimization。不再独占 Homepage 的三个 Quick Proof。

现有截图：

- `public/assets/wechat-growth-01.png`：用户规模后台脱敏图
- `public/assets/wechat-growth-02.png`：阅读趋势后台脱敏图

仍需：2 万+、每周 7 篇、效率变化的统计周期与证据映射。

### 4.4 自由组队平台

- 约 400–500 人、5 个班级、每班约 90 人、每队约 10–12 人。
- 用户参与需求、页面 / 功能、信息卡片、建队 / 入队、人数限制、班级、移动端和数据匹配。
- 集训前投入使用。
- 作为 Supporting Work；在 Product Ops / Project Ops Lens 下可以提升相关性。
- 需要公开脱敏截图或交付材料。

### 4.5 Globridge

已知内容：AI 辅助全栈业务系统；涉及存量代码理解、需求拆解、功能迭代、前后端接口联调、排查、云部署维护，并使用 Codex 等 AI 开发工具。

缺少：项目背景、本人真实职责、时间、系统截图、交付结果、可公开范围。当前状态 `NEEDS_CONTENT`，不进入 Top 3。

## 5. Experience Inventory

| Organization | Public role | Time | Homepage use | State |
| --- | --- | --- | --- | --- |
| TRANSSION / TEX AI / 传音学院 | 项目与人才运营 | 2026.06 — Present | 未来 Experience 摘要；关联 EagleHub、Onboarding、Team Formation、Eagle Training | `CONFIRMED` |
| UNICAREER | 财经与求职内容运营 | 2024.07 — 2026.07 | 摘要；关联 AI Content Growth | `CONFIRMED` |
| 新通教育 | 新媒体运营 | 2025.12 — 2026.03 | 摘要；Growth Lens supporting evidence | `CONFIRMED`；量化结果 `NEEDS_VERIFICATION` |

## 6. Role Lens Inventory

| Lens | Canonical mapping | Prototype constraint |
| --- | --- | --- |
| AI Product | EagleHub、Onboarding Automation、Globridge、Digest | Start Here 先突出 EagleHub / Onboarding |
| Product Ops | EagleHub、Onboarding、自由组队平台、AI Content Growth | 共享事实，只改变强调 |
| Project Ops | 雏鹰专项集训、自由组队平台、EagleHub、新人入职流程 | 允许指向 Experience / Supporting Work |
| Growth | AI Content Growth、新通教育经历 | 不改项目结果 |
| AI Native | EagleHub、Onboarding、Globridge、Digest | 不等同“AI Product Manager”头衔 |

## 7. Metric Inventory

| Metric | Meaning | State | Evidence availability | Public placement |
| --- | --- | --- | --- | --- |
| 400–500 人 | 大型新人培养项目规模 | `USER_VERIFIED` | 当前无公开附件 | Quick Proof / Experience |
| 5 个班级 | 雏鹰专项集训规模 | `USER_VERIFIED` | 当前无公开附件 | Experience / supporting case |
| 每班约 90 人、每队约 10–12 人 | 自由组队规则 | `USER_VERIFIED` | 当前无公开附件 | Team Formation case |
| ≈480 对 | 师徒培养管理场景 | `USER_VERIFIED` | 当前无公开附件 | Quick Proof / EagleHub |
| 约 6 个月 | 培养周期 | `USER_VERIFIED` | 当前无公开附件 | EagleHub context |
| 11 / 11 | Dry-run 测试样本目标字段一致 | `USER_VERIFIED` | 当前无公开附件 | Onboarding Case；不可写成生产准确率 |
| 约 55 万 | 公众号用户规模 | `USER_VERIFIED` | 有脱敏截图 | Content Growth Case |
| 2 万+ | 单篇最高阅读量 | `USER_VERIFIED` | 映射待整理 | Content Growth Case |
| 每周约 7 篇 | 长期内容节奏 | `USER_VERIFIED` | 映射待整理 | Content Growth Case |
| 2h → 20–30min | 单篇生产周期 | `USER_VERIFIED` | 口径待补 | Quick Proof / Content Growth |

## 8. Homepage Inventory After Refresh

### Hero

- Zhang Shaoyi / 张少毅
- 上海政法学院 · 网络与新媒体 · 2027 Graduate
- 产品运营 / 项目运营 / AI 应用 / 业务数字化
- Positioning：把业务中的流程、数据与协作问题，转化为可执行的运营方案、产品原型和 AI 辅助工具。

### Start Here / Top 3

1. EagleHub
2. TEX AI Onboarding Automation
3. AI Content Growth Workflow

### Quick Proof

1. 400–500 人 — 大型新人培养项目规模
2. ≈480 对 — 师徒培养管理场景
3. 2h → 20–30min — AI 内容工作流生产周期

### Lower hierarchy

- Supporting：自由组队平台、雏鹰专项集训
- Potential：Globridge
- Lab：Digest、Memory Museum、Video / Motion、Game Ads Simulation

## 9. Image / Document Asset Inventory

### Existing project visuals

| Asset | Public content | Current use |
| --- | --- | --- |
| `public/assets/wechat-growth-01.png` | 脱敏公众号用户规模 | Content Growth evidence |
| `public/assets/wechat-growth-02.png` | 脱敏阅读趋势 | Content Growth evidence |
| `public/assets/digest-01.png` / `digest-02.png` | Digest 真实界面 | Lab only; project nature still needs confirmation |
| `public/assets/memory-museum-01.png` / `02.png` / `03.png` | Memory Museum 真实界面 | Lab / Experiment |
| `public/assets/digest-deck.pdf` | Digest product deck | Source material; public cleanup still required |

### Missing public visuals

| Project | Current public asset | Requirement |
| --- | --- | --- |
| EagleHub | 3 张 public-safe reconstructed diagrams | 仍需真实脱敏 UI / iteration evidence |
| Onboarding Automation | 2 张 reconstructed diagrams + 1 张 Demo Data | 仍需真实脱敏 Dry-run 输出 |
| 自由组队平台 | 2 张 public-safe reconstructed diagrams | 仍需真实移动端 / delivery evidence |
| Globridge | None in portfolio | Background, screenshots, outputs and disclosure scope |
| Video / Motion | Bilibili link only | Real still / cover |

禁止生成假项目 UI、假数据、假员工、假业务结果。

### Resume

旧 Resume 已移至 gitignored `internal-assets/resume-non-final.pdf`，Production 只提供邮件索取入口。`public/resume.pdf` 不存在；本阶段不生成替代 PDF。

## 10. Links

| Link | Use | Current decision |
| --- | --- | --- |
| `https://fuoguz.github.io/zsy-portfolio/` | Production | G3.5 不部署 |
| `/zsy-portfolio/resume.pdf` | Existing resume | 入口可测试；发布前必须替换为 public-safe version |
| `https://fuoguz.github.io/digest/` | Digest demo | KEEP in Lab after project nature disclosure |
| `https://memory-museum-pi.vercel.app/` | Memory Museum | KEEP in Lab; availability recheck in QA |
| `https://www.bilibili.com/video/BV1B6qMBmECG/` | Video | KEEP in Lab |
| `https://github.com/Fuoguz` | GitHub | KEEP |
| `mailto:fuoguzz@gmail.com` | Contact | KEEP |

## 11. Deprecated / Demoted / Needs Review Register

| Old content | New state | Reason |
| --- | --- | --- |
| AI Product first as public job positioning | **deprecated** | Default position now begins with 产品运营 / 项目运营 |
| AI Content Growth as Featured 01 | **demoted to Featured 03** | Newer real internal product / automation work is more relevant |
| Digest as Featured 02 | **lab + needs review** | Team nature and contribution unresolved |
| Memory Museum as Featured 03 | **lab** | Difference proof, not primary business evidence |
| 55 万+ / 2h→20min / 7篇 per week as all Quick Proof | **deprecated as set** | Over-concentrated on one Content case |
| “Building / Demo in Progress / Coming Soon” | **hide / rewrite** | Creates unfinished impression |
| Game Ads beside real projects | **lab / simulation** | No real commercial delivery or performance data |
| Current `resume.pdf` as final public resume | **needs review** | Contains outdated / private content |
| Old school or relative grade wording | **deprecated** | Conflicts with confirmed canonical identity |

## 12. Outstanding Inputs

- EagleHub：公开标题、脱敏截图、具体功能与本人实现边界、可公开 outcome 材料。
- Onboarding：可公开流程 / 测试证据、11 / 11 测试范围、下一阶段状态。
- 自由组队：脱敏截图 / 使用证明、本人搭建边界。
- Globridge：背景、职责、时间、截图、结果、公开范围。
- AI Content Growth：各指标时间范围、统计方式、证据对应关系。
- Digest：团队性质、本人职责、独立开发部分。
- 传音公开组织命名：TRANSSION / TEX AI / 传音学院在 Resume 与 Portfolio 中的标准层级。
- 新通教育：可公开职责和量化结果口径。
- 公开 Resume：替换 PDF；所在地是否展示。
