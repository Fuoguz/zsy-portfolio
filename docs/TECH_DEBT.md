# ZSY Portfolio V2 — Technical Debt Register

> 审计日期：2026-09-01  
> 说明：本文件记录债务与后续建议，不在 G0 直接实施重构

## 1. Executive Technical Assessment

当前应用规模不大、构建稳定、运行时无明显 console error，适合作为 V2 内容基线；但架构已经超过“单文件 Demo”的合理边界。最大的工程风险是：内容、路由、页面、动效和详情模板全部集中在 `src/App.jsx`，导致新增项目、独立 metadata、岗位视图、懒加载和稳定 URL 都需要跨越同一文件。

## 2. Current Strengths

- `npm install` 与 `npm run build` 均通过。
- `npx eslint src --max-warnings=0` 通过。
- 当前 public 资源使用 `import.meta.env.BASE_URL` 拼接，适配现有 GitHub Pages 子路径。
- Hash route 让现有 GitHub Pages 详情刷新不产生 path 404。
- 基础语义 HTML 较完整，已使用的图片均有 alt。
- 375–1440 px 未检测到横向滚动。
- 组件内部已有 `SectionHeader`、`DetailHero`、`DetailCard`、`EvidenceImages` 等可复用起点。

## 3. Priority Definitions

- **P0**：进入对应的工程 / 发布 Gate 前必须解决，否则会造成错误导航、事实风险或部署失败；不等于阻塞 G1 概念探索。
- **P1**：V2 主体重构必须解决，直接影响招聘体验、可扩展性或质量目标。
- **P2**：维护性与完善项，可在不阻塞主路径的前提下处理。

### Current Gate Priority

```text
Content Positioning
→ Visual Direction
→ Homepage Prototype
→ Design System
→ Engineering Refactor
```

以下内容明确**不作为 G1 blocker**，留到 G4 / G6：

- dependency audit
- unused template assets
- package metadata
- minor `rel` attribute cleanup
- Tailwind docs scanning

G1 只需要尊重这些已知约束，不在视觉方向阶段实施工程修复。

## 4. Debt Register

### P0 — Navigation Correctness（G4 integration blocker，不阻塞 G1）

#### TD-01 Hash route preserves scroll position

- Evidence：`src/App.jsx:1043-1077` 只监听 `hashchange` 并切换组件，没有 scroll restoration。
- Runtime：从首页 Works 区点击项目后，移动端可停在详情约 2,097 px，中途内容先出现，Hero / Back to Home 在视口上方。
- Impact：用户会误以为链接打开错误；详情页身份和返回路径不可见。
- Future fix：路由层统一 scroll restoration；为 anchor 与 page route 分离行为，并加入自动化测试。

### P0 — Deployment Portability（G7 deployment blocker，不阻塞 G1）

#### TD-02 Base path is hard-coded

- Evidence：`vite.config.js:7` 固定 `base: '/zsy-portfolio/'`。
- Related：`src/App.jsx:235`、`:614`、`:1016` 依赖 `BASE_URL`。
- Current：GitHub Pages 项目站点正确。
- Impact：迁移根域时若不改 base，JS / CSS / favicon / PDF 请求路径错误。
- Future fix：用部署环境配置 base；至少建立 GitHub Pages `/zsy-portfolio/` 与 root `/` 两种 production build 验证。

#### TD-03 Deployment is manual and production has drifted

- Evidence：只有 `gh-pages -d dist`；无 workflow / preview / CNAME。
- Runtime：`gh-pages` 早于 `main` 两个姓名文案提交，线上仍显示旧 Hero。
- Impact：Repository 与招聘方看到的 Production 不一致。
- Future fix：G7 建立 push / PR 自动 build、preview、production；部署记录关联 source commit。

### P1 — Application Architecture

#### TD-04 Monolithic App.jsx

- Evidence：`src/App.jsx` 1,080 行、约 41 KB。
- Responsibilities：项目数据、能力数据、模拟脚本、路由、Home、五个详情、共享组件、动效全部同文件。
- Impact：内容编辑冲突、难以测试、无法页面级 code split、新增项目需复制 JSX。
- Future target：

```text
src/
  app/
  components/
  pages/
  sections/
  data/
  motion/
  styles/
  utils/
```

主代理应维护 application architecture、router 和 global design system；模块拆分可在 G4 定义 file ownership 后执行。

#### TD-05 Project data is embedded and coupled by display title

- Evidence：`works` 在 `src/App.jsx:13-70`；`detailLinks[work.title]` 在 `:199-205`、`:875`。
- Impact：改标题 / 翻译可能悄悄破坏链接；数据无法共享给 work index、岗位视图和 metadata。
- Future fix：统一稳定 `id` / `slug` / `type` / `featuredFor` / `evidence` / `media` / `caseStudy` schema。

#### TD-06 Hand-written exact hash routing

- Evidence：`src/App.jsx:1043-1077` 五个 if 分支。
- Missing：not-found、route map、参数、document title、metadata、scroll restoration、route tests、nested URLs。
- Impact：不符合 `/work/project-slug`；未知 hash 静默回首页。
- Future fix：在兼容静态部署的前提下引入集中式 routing；明确 GitHub Pages fallback 策略。

#### TD-07 Duplicate detail structure

- Evidence：`BackHomeButton` / `DetailHero` 与 `GameAdsDetail` 的独立 Hero 重复（`src/App.jsx:238-279`、`:450-494`）。
- Impact：修复焦点、动效、间距时容易漏掉某页。
- Future fix：统一 Case Study template，按可选 section 渲染真实内容。

#### TD-08 Static content created inside render

- Evidence：`ContentGrowthDetail` 内部每次 render 创建 `results` 数组（`src/App.jsx:496-504`）。
- Impact：规模扩大后数据责任更混乱。
- Future fix：迁入 project data / case study content。

### P1 — Responsive and Navigation

#### TD-09 Mobile navigation is absent

- Evidence：nav items 使用 `hidden ... md:flex`（`src/App.jsx:770`）；唯一 mobile media query 不包含 menu。
- Impact：<768 px 不能使用 Works / Matrix / Workflow / Contact 的导航入口。
- Future fix：语义 button + `aria-expanded` + Escape + focus management；不得让 hover 承载核心信息。

#### TD-10 Hero and cards are too tall for recruiter scan

- Evidence：首页 Hero `min-h-screen`；移动首页约 9,300 px；五张信息密集卡。
- Impact：20–30 秒内的项目判断成本高。
- Future fix：属于 G1/G2 设计原型内容，不在 G0 直接改 CSS。

### P1 — Accessibility and Motion

#### TD-11 No visible focus system

- Evidence：`src/index.css` 无 `:focus-visible`；运行时默认 outline 为 1 px 深色，在黑底上不可见。
- Impact：键盘用户无法可靠定位当前焦点。
- Future fix：Design System 统一 focus ring token，并覆盖 nav、按钮、整卡链接、菜单。

#### TD-12 No reduced-motion strategy

- Evidence：`scroll-behavior: smooth`（`src/index.css:23-25`）与多处 Framer Motion；无 `prefers-reduced-motion`。
- Runtime：reduce 环境仍检测到 28 个具有 animation / transition 的元素。
- Impact：不满足 Master Brief；进入视口前 opacity 0 也可能影响打印 / 自动化截图。
- Future fix：CSS media query + Framer Motion reduced-motion config；保证内容在禁用动画时直接可见。

#### TD-13 Heading order is inconsistent on detail pages

- Evidence：共享 `DetailCard` 使用 h3，而部分详情在后面才出现 h2。
- Runtime：Digest Lighthouse Accessibility 96，`heading-order` 失败。
- Future fix：Case Study 模板统一 h1 → h2 section → h3 card 的层级。

#### TD-14 Document language is wrong for primary content

- Evidence：`index.html:2` 是 `lang="en"`，主体大量中文。
- Impact：屏幕阅读器发音与语言识别错误。
- Future fix：确认中文 / 双语策略后使用 `zh-CN` 或按页面切换准确 lang。

### P1 — SEO and Metadata

#### TD-15 Template metadata remains

- Evidence：title 为 `zsy-portfolio`，无 description / canonical / theme-color / OG / Twitter。
- Impact：搜索与微信 / LinkedIn / 邮件分享预览不专业。
- Future fix：全局 metadata + project-specific metadata + OG image；避免 hash-only metadata 限制。

#### TD-16 Client-rendered hash pages share metadata

- Impact：招聘方分享单个项目时仍显示首页通用预览。
- Future fix：路由方案与部署方案一起决定静态预渲染、per-route head 或构建期页面。

### P1 — Performance and Assets

#### TD-17 Images are not lazy or responsive

- Evidence：`EvidenceImages` 的 `<img>` 只有 src / alt / class（`src/App.jsx:297-310`）。
- Missing：loading、decoding、width / height、srcset / sizes、WebP / AVIF。
- Runtime：Digest mobile transfer 约 1,383 KiB；Lighthouse 估计图片可节省约 1,236 KiB。
- Future fix：保留截图可读性前提下生成现代格式与 responsive variants；非首屏 lazy load。

#### TD-18 Bundle cannot split by route

- Build：JS 348.29 kB（gzip 110.39 kB），首页估算约 60 KiB unused JS。
- Impact：访问首页也下载全部详情与 Game Ads 草稿内容 / 逻辑。
- Future fix：page-level lazy import、评估 Framer Motion 使用面，避免为少量动效付出全局成本。

#### TD-19 Unused assets are copied or retained — G4/G6, not G1 blocker

- Unused：`src/assets/hero.png`、`react.svg`、`vite.svg`、`public/icons.svg`、`memory-museum-03.png`。
- `public` 中未引用文件仍会复制到 dist。
- Future fix：用户确认后清理，或显式纳入内容数据。

### Deferred to G4/G6 — Dependency Security（不阻塞 G1）

#### TD-20 npm audit reports known issues

- `npm audit`：5 个（1 low、4 high）。
- 包含：Vite `8.0.12`、PostCSS `8.5.14`、nanoid `3.3.12`、brace-expansion、Babel。
- Vite 当前命中 Windows dev-server path / UNC 相关 advisory；fix available。
- `npm audit --omit=dev` 仍报告 3 high，因为 Tailwind Vite integration 等构建工具被列为 production dependency / 依赖链。
- Static GitHub Pages 不直接暴露 Node server，但本地 / CI build tool 仍应升级。
- Future fix：在独立依赖更新提交中升级到 patched versions，重新 build / lint / visual QA；不要在 G0 直接 `npm audit fix`。

### P1 — Quality Automation

#### TD-21 Missing scripts and tests

- `package.json` 有 dev / build / preview / deploy，无 lint / test / typecheck / linkcheck。
- 无 component test、routing test、Playwright test 或 screenshot baseline。
- Future fix：至少补 build + lint + smoke + link + key viewport checks。

#### TD-22 No CI workflow

- `.github/workflows` 不存在。
- Impact：broken build / link / metadata 只能人工发现。
- Future fix：PR checks 与 deployment workflow 分离；部署前记录 build artifact。

### P2 — CSS and Maintainability（不阻塞 G1）

#### TD-23 Mixed Tailwind and global CSS lacks boundary

- `src/index.css` 472 行，既包含 tokens、reset、background、component classes、responsive rules。
- JSX 同时大量使用 Tailwind utility。
- Future fix：G3 决定 tokens / utilities / component CSS 的职责；不要继续无边界追加。

#### TD-24 Incomplete design tokens

- 已有 colors 与部分 transition，但 spacing、type scale、grid、breakpoint、radius、shadow、motion 没有统一 token。
- Future fix：G3 由主代理单点维护 Design System。

#### TD-25 Empty, template, and package metadata — G4/G6, not G1 blocker

- `src/App.css` 为 0 bytes。
- README 是 Vite 默认文本。
- `package.json` name / version 仍为模板级信息。
- Future fix：在 G4 / README 阶段清理并记录 architecture / development / deployment。

#### TD-26 Tailwind auto-detection scans documentation — G4/G6, not G1 blocker

- Runtime evidence：加入四份 G0 Markdown 文档后，CSS 从 24.14 kB 增至 25.86 kB（gzip 5.70 → 5.94 kB），尽管 Production JSX / CSS 没有修改。
- Current-only generated rules：`.absolute`、`.container`、`.underline`、`.ring`、`.outline` 等词来自文档文本。
- Impact：随着 docs / changelog 增长，production CSS 可能被无关文本持续污染，hash 也会因文档变化而改变。
- Future fix：为 Tailwind v4 明确 source scope / ignore；只扫描实际 UI source，并保留 build-size regression check。

## 5. Build and Runtime Baseline

```text
npm install        PASS
npm run build      PASS
npx eslint src     PASS
homepage console   PASS
five hash routes   PASS when opened directly
horizontal overflow PASS at 375/390/430/768/1024/1440
```

Build output：

```text
dist/index.html                   0.50 kB
dist/assets/index-*.css          24.14 kB / gzip 5.70 kB（应用基线）
                                   25.86 kB / gzip 5.94 kB（加入 G0 docs 后）
dist/assets/index-*.js          348.29 kB / gzip 110.39 kB
dist total                        3.17 MiB
```

## 6. Recommended G4 Ownership Boundaries

当用户批准进入 G4 时，建议：

- 主代理：router、application architecture、global Design System、integration。
- 子任务 A（明确 file ownership）：`src/data/`、project schema、project sections。
- 子任务 B（明确 file ownership）：image pipeline、lazy / responsive assets、performance checks。
- QA 子代理：只读 link / metadata / responsive / accessibility report。

禁止多个代理同时定义 colors / spacing / typography / motion / grid，禁止同时编辑同一 Production Files。

## 7. Exit Criteria for Engineering Refactor

- 新增一个项目不需要复制完整 JSX。
- 所有项目有稳定 slug、分类、角色、evidence、media、status。
- 路由支持稳定 URL、404、滚动复位、页面 title / metadata。
- base path 可在 GitHub Pages 子路径与根域之间配置。
- mobile nav、focus-visible、reduced motion 有自动 / 人工检查。
- 图片有 lazy、尺寸、responsive source 与可读性 QA。
- build / lint / smoke / primary link checks 进入 CI。
- production deployment 可追溯到 source commit。
