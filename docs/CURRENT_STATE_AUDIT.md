# ZSY Portfolio V2 — Current State Audit

> 审计日期：2026-09-01（Asia/Shanghai）  
> 审计范围：当前 `main` 基线、GitHub Pages 线上版本、`portfolio-v2` 分支上的只读运行验证  
> 阶段边界：仅 G0；本文件不包含 G1 视觉方向，也不授权修改未经确认的事实

## 1. Executive Summary

当前站点可以安装、构建和运行，暗黑档案式视觉语言也已经形成；但它尚未达到正式秋招投递标准。主要阻塞不是“页面不够漂亮”，而是：

1. Hero 未明确写出 `2027 Graduate`、主投岗位优先级和一句可验证的核心定位。
2. 首页把未完成的 Simulation 放在第一位，把唯一有量化结果和后台截图的真实业务案例放在第二位，违反 `Evidence > Decoration` 与 `Real Project > Simulation`。
3. 公开简历含敏感个人信息；学校正式名称已经确认，但当前页面 / Resume 仍保留待更新旧文案；Digest 项目性质与职责继续待确认。
4. 从首页中段打开 hash 详情页时会保留原滚动位置，用户可能直接落到详情页中段，看不到项目标题和返回入口。
5. `src/App.jsx` 集中承载内容、路由和全部页面，移动端没有导航替代，SEO、焦点可见性和 reduced-motion 支持不足。

结论：**G0 审计完成；当前版本可作为内容与工程基线，但不应直接作为 2027 秋招最终投递版本。**

### Confirmed Source of Truth

- 学校：上海政法学院。
- 届别：2027 Graduate / 2027 届本科毕业生。
- 主投方向：AI 产品 → 产品运营 → 项目运营 → Content / Growth → AI Native。
- Game Ads：SIMULATION / LAB，不是默认首页 Featured Case Study。
- Resume：正式公开版移除出生日期与手机号；所在地继续待确认。
- Digest：项目性质继续 `TODO_USER_CONFIRM`。

## 2. Baseline Verification

| 检查 | 结果 | 证据 / 备注 |
|---|---|---|
| 分支保护 | PASS | 从 `main` 当前 HEAD `e6a908a` 创建 `portfolio-v2`；未改动 `main` |
| 用户现有文件保护 | PASS | 进入任务前已有未跟踪文件 `sine_wave_player.html`；保持未跟踪且未修改 |
| `npm install` | PASS | Node `v24.14.0`、npm `11.11.0`；200 个包已是最新锁定状态 |
| `npm run build` | PASS | Vite `8.0.12`；应用基线约 0.6 s，加入 G0 docs 后最终复核约 0.46 s |
| 首页运行 | PASS | 本地 `/zsy-portfolio/` 返回 200，无 console error / page error |
| Hash 详情页 | PARTIAL | 五个详情页直接访问均可渲染；从首页中段点击进入时存在滚动位置保留问题 |
| Resume | PASS / CONTENT RISK | 本地与线上 `resume.pdf` 均返回 200；但公开内容包含敏感信息与需确认事实 |
| 响应式 | PARTIAL | 375/390/430/768/1024/1440 无横向滚动；移动端主导航缺失、页面过长 |
| 外链 | PARTIAL | Digest、Bilibili、GitHub 可达；Memory Museum 在本环境 DNS 可解析但 443 连接失败，需用户侧复核 |
| Lint | PASS / SCRIPT MISSING | `npx eslint src --max-warnings=0` 通过；`package.json` 没有 `lint` script |

## 3. Current Repository and Stack

- React `19.2.6`
- Vite `8.0.12`
- Tailwind CSS `4.3.0`
- Framer Motion `12.38.0`
- Lucide React `1.14.0`
- `gh-pages` `6.3.0`
- 单入口客户端渲染；无 React Router、测试、CI workflow 或服务端渲染
- `vite.config.js` 固定 `base: '/zsy-portfolio/'`
- `dist/` 被忽略，由 `npm run deploy` 重新构建后推送 `gh-pages`

## 4. Current Page Structure

### 首页

当前顺序：

1. Fixed Navigation
2. Hero / Evidence Lab
3. Current Focus
4. Selected Works
5. Capability Matrix
6. Workflow
7. Resume & Contact
8. Footer

该结构逻辑清楚，但招聘信息密度与排序有问题：

- Hero 使用 `min-h-screen`（`src/App.jsx:780-846`、`src/index.css:100-103`），与 Master Brief“首屏应看到下一部分”的要求相反。
- 1440×900 下 Hero 约占满首屏，Selected Works 需继续滚动；390×844 下 Selected Works 顶部约在 1,800 px 后。
- `Current Focus` 与 Hero 正文重复，并使用“最近在补 / 在整理”等过程态文案（`src/App.jsx:849-864`）。
- Resume、Email、GitHub 主要集中在页面底部；桌面导航没有 Resume / GitHub，移动端导航项完全隐藏。

### 项目详情

当前以 hash 选择五个组件：

- `#/game-ads`
- `#/content-growth`
- `#/digest`
- `#/memory-museum`
- `#/video-work`

优点是 GitHub Pages 刷新不会产生普通 SPA path 的 404；缺点是所有页面共享同一 HTML metadata，URL 不符合未来 `/work/project-slug` 目标，也没有 404、路由参数、页面标题、滚动复位、上一项 / 下一项等能力。

## 5. Information Architecture Audit

### 首屏能回答什么

当前首屏能较快识别：

- 姓名：Zhang Shaoyi
- 学校 / 专业 / 当前年级（但文案可能过时，且校名待确认）
- 宽泛方向：AI 内容创意 / 内容增长 / 游戏投放脚本
- 查看 Works 与 Contact 的入口

当前首屏不能可靠回答：

- 是否明确为 2027 届
- 主投岗位优先级
- 最强的真实业务证据是什么
- 哪三个项目最值得先看
- Resume / GitHub 的直接入口
- 项目属于真实业务、独立项目、实验还是模拟

### 项目排序与分类

当前顺序是：Game Ads Simulation → AI Content Growth → Digest → Memory Museum → Video Practice。

问题：

- 未完成 Simulation 排第一，真实量化案例排第二。
- 五类项目以相近视觉权重混排，没有 `REAL PROJECT / INDEPENDENT PROJECT / EXPERIMENT / SIMULATION` 的统一分类。
- 首页项目卡没有截图；“产出”与“工具”同等呈现，真实 evidence 没有被视觉提取。
- `hero-ledger` 显示大号 `04`，但首页已有 5 个作品条目（`src/App.jsx:841-844`）。

当前五个项目不是未来 Portfolio 的完整内容集合。后续将加入 AI Product、AI Workflow、Automation、Internal Product / Tool、Project Operations 方向的真实脱敏 Case Study。G1 信息架构必须支持未来项目插入更高优先级位置，并以 `FUTURE_CASE_STUDIES` 作为纯结构占位，禁止编造项目事实。

## 6. Visual System Audit

### 已有优势

- 暗黑网格、米白正文、荧光黄绿色强调形成统一的 Evidence Lab / Interactive Archive 气质。
- Mono eyebrow、状态标签、细边框和数据卡具有较强识别度。
- 标题、按钮、卡片、Detail Hero 已有可复用视觉模式。
- 当前设计不属于普通 SaaS、蓝紫 AI 渐变或玻璃拟态模板。

### 主要问题

- 视觉主角是抽象英文口号，而不是“2027 届 + 主投方向 + 最强证据”。
- 背景网格、巨大标题和长篇入场节奏比项目证据更早占据注意力。
- 首页没有任何项目图像，无法满足 `Screenshot > Long Paragraph`。
- 大量卡片使用相似结构和 hover 位移，项目之间缺少视觉层级与真实 / 实验分类差异。
- 11 px uppercase 状态在移动端可读性较弱。
- 当前风格已经成型，但不应被视为 G1 的默认最终方向。

## 7. Interaction Audit

### 当前交互

- Fixed nav + anchor smooth scroll
- Framer Motion 首屏入场和 `whileInView` 卡片显现
- 整张项目卡可点击进入 hash 详情
- Hover card lift、按钮位移、导航 underline
- 外链打开新标签

### 明显问题

1. **详情页滚动落点错误**：从首页 Works 区域点击项目时，组件切换但没有 `scrollTo(0, 0)`。运行时检查中移动端打开第一个项目后仍停留在约 2,097 px，Hero 与返回按钮位于视口上方。代码只监听 hash 并替换组件（`src/App.jsx:1043-1077`）。
2. **初始透明内容依赖滚动触发**：自动全页截图在未实际滚动时会出现大面积空白；逐屏滚动后内容正常显示。此行为对截图、打印、部分自动化工具以及 reduced-motion 场景存在风险。
3. **移动端没有导航替代**：`navItems` 容器为 `hidden ... md:flex`（`src/App.jsx:770-776`），没有 menu button / drawer。
4. **详情页缺少持续导航**：只有 Hero 顶部的 Back to Home；深处没有上一项 / 下一项、目录或返回入口。
5. **Hover 优化没有 focus 对应**：卡片和按钮的主要强调只写了 `:hover`。

## 8. Responsive Audit

运行时检查视口：375、390、430、768、1024、1440 px。

通过项：

- 所有检查视口的 `scrollWidth === clientWidth`，未发现横向滚动。
- 首页与五个详情页没有 console error / page error。
- 项目图片在 390 和 1440 下未溢出。
- CTA 高度约 48 px，基础触摸目标可用。

风险项：

- 390 px 首页约 9,300 px 高，主要联系入口接近页尾。
- Hero 在移动端约 1,300 px 高，第二个 CTA 在 844 px 首屏边缘。
- 移动端只能看到品牌链接，看不到 Works / Matrix / Workflow / Contact 导航。
- 五张项目卡移动端内容很长；首页扫读成本高。
- 详情页 Hero 的 68vh + 下方间距造成较长空档。
- 依赖 hover 的反馈在触屏上无等价强调。

## 9. SEO and Social Sharing Audit

当前 `index.html` 只有：

- `lang="en"`
- charset / viewport
- favicon
- `<title>zsy-portfolio</title>`

缺失：

- 专业 title
- meta description
- canonical
- theme-color
- Open Graph
- Twitter Card
- OG image
- 每个项目独立 metadata

页面主体以中文为主，而 `html lang` 为英文。Hash 详情页共享相同 title / meta，不利于搜索和转发预览。

Lighthouse production preview：

- 首页 desktop SEO：90（主要扣分项：无 meta description）
- 首页 mobile SEO：90
- Digest mobile SEO：91

这些自动分数不代表社交分享已合格；当前仍没有 OG / Twitter / canonical。

## 10. Performance Audit

### Build

- JS：348.29 kB，gzip 110.39 kB
- 应用基线 CSS：24.14 kB，gzip 5.70 kB
- 加入 G0 Markdown 文档后的最终 CSS：25.86 kB，gzip 5.94 kB
- `dist/`：3.17 MiB，共 14 个文件
- 最大资源：`digest-01.png` 965,078 bytes；`resume.pdf` 637,387 bytes；`digest-deck.pdf` 500,403 bytes

CSS 增长并非 UI 修改。Tailwind v4 的自动内容检测扫描到 `docs/` 中的 utility-like 文本，额外生成了 `.absolute`、`.container`、`.underline`、`.ring`、`.outline` 等规则。这次只增加约 1.72 kB，但说明当前 content source 没有明确排除文档目录；项目文档继续增长会产生不可预测的 CSS 膨胀。

### Lighthouse Baseline

本地 production preview 单次基线（仅用于 G0 对比，不等同线上真实用户数据）：

| 页面 / 环境 | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| 首页 desktop 1440×900 | 87 | 100 | 100 | 90 |
| 首页 mobile 390×844 | 99 | 100 | 100 | 90 |
| Digest mobile 390×844 | 100 | 96 | 100 | 91 |

首页没有图片，因此网络载荷约 116 KiB；Digest 详情约 1,383 KiB。Lighthouse 对 Digest 报告约 1,236 KiB 的图片传输优化空间。

主要债务：

- 所有项目 `<img>` 缺少 `loading="lazy"`、`decoding="async"`、尺寸、`srcset` 与现代格式。
- `digest-01.png` 约 0.92 MiB。
- 首页 bundle 估算有约 60 KiB unused JavaScript；Framer Motion 是明显候选之一。
- 所有详情页面与内容进入同一 JS bundle，无法 route-level code split。
- `src/assets` 与 `public` 中存在未使用资源，虽然不会全部进入运行时请求，但增加维护噪音。
- Tailwind 自动扫描 `docs/`，文档中的 class-like 词会进入 production CSS。

## 11. Accessibility Audit

已有优势：

- 使用 `main`、`nav`、`section`、`footer`、`dl`、`ol`、`ul` 等基础语义结构。
- 实际使用的项目图片都有非空 alt。
- 项目卡是原生 anchor，可通过键盘进入。
- 自动化首页 Accessibility 得分 100。

人工检查发现：

- 没有显式 `:focus-visible`；运行时默认 outline 为 1 px 深色 `rgb(16,16,16)`，在黑色背景上几乎不可见。
- 没有 skip link。
- 没有 `prefers-reduced-motion` CSS 或 Framer Motion 降级；reduce 环境仍检测到 28 个具有动画 / transition 的元素。
- `html lang="en"` 与主要中文内容不匹配。
- Digest 详情存在 heading order 问题，Lighthouse Accessibility 为 96。
- 移动端主导航缺失，键盘 / 触摸用户不能使用桌面导航路径。
- 小号 muted 标签与半透明 surface 的对比度仍需在 G6 使用 axe / 实机复核。

## 12. Deployment Audit

### Current GitHub Pages

- Live URL 返回 200。
- `resume.pdf` 返回 200，Content-Type 为 `application/pdf`。
- 远端存在 `gh-pages` 分支。
- `npm run deploy` 使用 `gh-pages -d dist`。
- Hash 详情页可规避 GitHub Pages 的 path refresh 404。

### Deployment Drift

- `gh-pages` 最新提交：2026-05-14 01:28 +08:00。
- `main` 最新提交：2026-05-14 15:02 +08:00。
- 线上 bundle 仍包含旧 Hero `ZSY builds proof of creative process.`；当前源码为 `Zhang Shaoyi builds proof of creative process.`。
- 线上 nav 同样落后于当前源码的姓名展开更新。

因此当前“Repository main”与“Production live”并非完全一致。

### Migration Risk

- `vite.config.js` 固定 `base: '/zsy-portfolio/'`。迁移到根域后若不改配置，JS / CSS / favicon / PDF 会继续请求 `/zsy-portfolio/*`。
- 没有 `CNAME`、`.github/workflows`、preview deployment 或环境化 base 配置。
- 当前 URL 是 hash route，不符合未来稳定路径目标。
- GitHub Pages 仍可保留为 fallback，但部署逻辑需要在 G4/G7 抽象。

## 13. Current Bugs and Risks

### G1 前应先确认 / 记录的 Blockers

1. 详情页 hash 切换不复位滚动位置。
2. 当前 Hero 尚未落实已确认的 `2027 Graduate / 2027 届本科毕业生` 与主投方向排序。
3. Game Ads “Building / Demo in Progress” 排在唯一真实量化案例之前；后续应固定下沉为 `SIMULATION / LAB`，不作为默认 Featured Case Study。
4. 当前 Resume 公开敏感信息；正式公开版已确定移除出生日期和手机号，所在地继续待确认。
5. Digest 在网站与项目 Deck 中的项目性质 / 分工不一致，继续 `TODO_USER_CONFIRM`，不得定性为个人独立项目。

### High Priority

1. 移动端导航缺失。
2. Project classification 不统一。
3. 首页 Selected Work 没有截图。
4. Focus / Hero 文案重复且有“正在整理”感。
5. Metadata、social preview、document lang 不完整。
6. Focus visible 与 reduced motion 缺失。
7. 项目图片无 lazy / responsive loading。
8. `src/App.jsx` 单体与手写路由阻碍扩展。
9. 当前 production 落后于 main。

### Medium Priority

1. `hero-ledger` 的 `04` 与 5 个项目不一致。
2. `App.css` 为空；React/Vite 模板资产未清理。
3. README 仍是 Vite 默认模板。
4. 无 lint script、测试或 CI。
5. 外链 `rel="noreferrer"` 可显式改为 `noopener noreferrer`；属于 G4/G6 cleanup，不是 G1 blocker。
6. Memory Museum 外链需用户侧确认可达性。

## 14. Stale / Unfinished Wording

公开页面仍包含：

- `Building / Demo in Progress`
- `计划输出 3 类游戏方向...`
- `最近在补...也在整理...`
- `后续还会继续补功能和交互`
- `目前先放两张主要截图`
- `文字型封面占位。后续...替换`
- `本月峰值 5000+`（没有月份）
- `大三在读`（已确认为应移除的过期表达；正式统一为 `2027 Graduate / 2027 届本科毕业生`）

这些内容应在后续改为明确的 `Experiment / Prototype / Independent Project / Simulation`，或在正式投递视图隐藏，而不是继续表现为未完成。

## 15. Fact and Privacy Risks

- 学校正式中文名称已确认为“上海政法学院”；页面与 Resume 中的“上海政法大学”是待后续 Production 更新的旧文案，不再保留校名冲突 TODO。
- 当前 Resume 公开出生日期、手机号和所在地；正式公开版移除出生日期与手机号，所在地是否展示继续 `TODO_USER_CONFIRM`。
- Resume PDF Title 元数据为“黑白色极简风视觉设计师求职简历”，与 AI Product / Growth 定位不一致。
- Digest 网站描述偏个人项目；Deck 显示课程项目与团队分工。需确认真实项目性质与个人职责。
- AI Content Growth 指标不再使用“有截图 / 无截图”的二元判断：约 55 万用户量级与约 5k 峰值为 `EVIDENCE_ATTACHED`；2w+、平均 1000+、2h→20min、每周 7 篇、净增约 3 万为 `USER_VERIFIED`；需要进一步确认的口径才标记 `NEEDS_VERIFICATION`。缺少当前仓库附件不构成删除指标的理由。
- Digest Deck 的市场数据和价格意愿缺少可点击来源，并保留 `¥XX / 人 / 年` 占位。

## 16. G0 Exit Decision

G0 的 Repository Audit 已完成。校名、届别、主投方向、Resume 基本隐私原则与 Game Ads 的 Lab 定位已确认，文档可进入 G1 视觉方向探索。

仍保留的 `TODO_USER_CONFIRM` 主要包括 Digest 团队性质 / 本人职责 / 独立开发部分、部分统计口径、所在地公开范围与未来真实脱敏 Case Study 内容。G1 只能为 `FUTURE_CASE_STUDIES` 预留结构，不能编造内容。

本阶段没有修改 Production UI，也没有进入 Design Direction Exploration。
