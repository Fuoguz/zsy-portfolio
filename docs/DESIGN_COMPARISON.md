# ZSY Portfolio V2 — G2 Design Comparison and Final Direction Lock

> 日期：2026-09-02  
> 依据：三个真实可运行 Homepage Prototype、1440×900 / 390×844 截图与浏览器 QA  
> 文档范围：保留 G2 比较证据，并记录 G2.5 Final Hybrid 的最终锁定结果

## FINAL DIRECTION LOCKED

G2.5 Final Hybrid Homepage 已完成并正式验收。自 G3 起停止探索新的整体视觉方向；不创建 Direction D，不重新设计 Hero，不重新进行 A/B/C 竞争。

最终方向的主次关系为：

```text
B — PROOF CIRCUIT
作为信息架构、项目浏览逻辑与页面骨架

+ A — PROOFROOM
提供 editorial typography、留白、caption 与 evidence discipline

+ C — CUT TO OUTCOME
提供受控的大字号、高对比节奏与 Problem → Decision → Outcome 叙事
```

C 的表达只用于重点项目和转场，不作为全站主风格。最终方向不再是早期比较阶段提出的 “C-led Hybrid”；G2.5 的实际页面验证已经取代该假设。

最终验证截图：

- [Final Hybrid Desktop 1440×900](../artifacts/design/g2.5/final-hybrid-1440x900.png)
- [Final Hybrid Mobile 390×844](../artifacts/design/g2.5/final-hybrid-390x844.png)

选择该 Hybrid 的原因：

1. B 最适合承载未来新增的高优先级真实项目和多岗位推荐关系。
2. A 解决职业可信度、长内容阅读和真实证据图注问题。
3. C 提供足够的视觉记忆点，但被限制在不会压过项目事实的层级。
4. G2.5 已验证 Start Here、轻量 Role Lens、Quick Proof 与 Featured Project Opening 能在同一系统中共存。
5. Desktop 与 Mobile 均保持清晰、可操作、无横向溢出，且不依赖 WebGL 或生成式项目视觉。

## 1. Tested Prototypes

| Direction | Route | Signature interaction | Primary visual logic |
| --- | --- | --- | --- |
| A — PROOFROOM 2027 | `/experiment/a` | Proof Lens | Editorial hierarchy + screenshot plate + natural evidence caption |
| B — PROOF CIRCUIT | `/experiment/b` | Role Lens | Capability → Project → Evidence relationship |
| C — CUT TO OUTCOME | `/experiment/c` | Three-Act Scrubber | Problem → Decision → Outcome scene rhythm |

三个页面使用相同内容基线：AI Content Growth Workflow、Digest、Memory Museum、Game Ads Simulation，以及不含项目事实的 `FUTURE_CASE_STUDY` 内部结构占位。

前台没有把 evidence status 做成审计面板。首页使用“后台脱敏截图 · 2025.10”“本人确认 · 口径待补”等自然图注；内部数据状态仍可在后续内容模型中保留。

## 2. Screenshot Evidence

### A — PROOFROOM 2027

- [Desktop 1440×900](../artifacts/design/g2/a-1440x900.png)
- [Mobile 390×844](../artifacts/design/g2/a-390x844.png)
- [Selected Work QA capture](../artifacts/design/g2/qa-a-selected-work.png)

### B — PROOF CIRCUIT

- [Desktop 1440×900](../artifacts/design/g2/b-1440x900.png)
- [Mobile 390×844](../artifacts/design/g2/b-390x844.png)
- [Selected Work QA capture](../artifacts/design/g2/qa-b-selected-work.png)

### C — CUT TO OUTCOME

- [Desktop 1440×900](../artifacts/design/g2/c-1440x900.png)
- [Mobile 390×844](../artifacts/design/g2/c-390x844.png)
- [Selected Work QA capture](../artifacts/design/g2/qa-c-selected-work.png)

完整自动化结果见 [qa-results.json](../artifacts/design/g2/qa-results.json)。

## 3. Comparative Result

评分为本次 Prototype 的相对结果，5 分最高；不是抽象方向的理论上限。

| Criterion | A | B | C | Prototype-based finding |
| --- | ---: | ---: | ---: | --- |
| Recruiter clarity | **5.0** | 4.7 | 4.6 | A 的姓名、事实栏、CTA 与 Quick Proof 形成最稳的线性扫读；C 在移动端压缩后已能同屏看到四个 CTA 与下一段入口。 |
| Visual distinction | 4.4 | 4.2 | **5.0** | C 的日间高色彩、压缩 Typography 与场景分带最容易被记住，也最远离当前黑底荧光绿。 |
| Professionalism | **4.9** | 4.5 | 4.6 | A 最像经过编辑的职业材料；B 稍像工具界面；C 需要严格控制色彩和标题尺度，但当前没有滑向影视作品集。 |
| AI Product fit | 4.2 | **4.9** | 4.8 | B 的 Role Lens 最直接说明岗位—项目—证据关系；C 的 Problem → Decision → Outcome 对产品与运营同样自然。 |
| Content scalability | 4.6 | **4.8** | 4.4 | B 的统一项目关系模型最容易增加岗位视图；C 的 Scene Band 可扩展，但所有项目都做三幕会导致页面过长。 |
| Interaction value | 4.5 | **4.9** | 4.8 | Role Lens 改变理解路径而不改变事实；Three-Act 让项目决策快速可读；Proof Lens 核验价值高但更适合少量强 claim。 |
| Mobile quality | 4.5 | 4.2 | **4.8** | C 的 Hero 修正后在 844px 内展示身份、方向、四个 CTA 与 Quick Proof 开头；B 当前移动页面最长。 |
| Performance risk | **4.8** | 4.5 | 4.5 | 三者均无 WebGL、视频或循环动画。A 状态最少；B/C 的交互也只使用 React state + CSS。 |
| Implementation simplicity | **4.6** | 4.0 | 4.3 | A 的信息模型最直接；B 需要岗位映射和排序纪律；C 需要为不同 Case 编辑场景节奏与媒体比例。 |

## 4. Direction A Findings — PROOFROOM 2027

### What the running page proved

- 首屏招聘清晰度最高。Desktop 同屏展示姓名、学校、届别、主投方向、四个 CTA 与三条 Quick Proof。
- Serif 标题、纸色底、细网格和蓝色校样标记形成了明确的编辑识别，但没有变成新闻报纸仿制。
- Proof Lens 的“结果 → 真实截图 → 来源说明”关系一眼可懂；没有依赖大量 Evidence ID。
- Digest 与 Memory Museum 的图版秩序能包容不同风格的真实 screenshot。
- 移动端排版稳定、按钮完整、无横向溢出；但 Candidate Docket 把 Quick Proof 推到更靠后位置。

### Weakness exposed by the prototype

- Selected Work 进入后，较多分隔线、图注和 serif 会逐渐积累“文档感”。
- 如果未来每个 Case 都复制 Proof Lens，首页会显得像核验材料而非个人产品作品集。
- AI Product 气质主要来自内容纪律，交互与系统关系弱于 B/C。

### Best material to retain

- Evidence caption 的自然语言规则。
- Screenshot plate、来源日期、脱敏说明与 claim 同区呈现。
- 清晰的 Hero 事实栏与编辑层级。

## 5. Direction B Findings — PROOF CIRCUIT

### What the running page proved

- Role Lens 是三套中最直接的岗位适配交互。选择 Growth、AI Product 等视角后，项目事实保持不变，只更新相关性强调与解释。
- `Capability → Project → Evidence` 在实际页面中成立，不需要 Network Graph 或复杂连线。
- 页面没有成为 Dashboard / BI Tool：主要内容仍是大截图与项目叙述，Role Lens 只是一个局部控制面。
- “Start Here”让招聘者在首屏快速看到三个重点项目。
- 新真实项目可进入统一 relationship model，最适合未来多岗位 Portfolio View。

### Weakness exposed by the prototype

- 五个 Role button 加项目关系说明，已经比 A/C 带来更多操作与维护成本。
- 390px 页面高度约 5,899px，是三套中最长；所有项目保留 relation panel 会产生重复。
- Visual identity 更像高质量产品工具，个人气质和情绪记忆点弱于 C。
- 如果未来再加入 Claim Trace、Graph 或 Command Palette，会快速越过“克制关系”边界。

### Best material to retain

- Role Lens 的共享数据逻辑。
- `Why this work matters for this role` 的解释方式。
- 能力必须指向真实项目与材料，而不是技能条。

## 6. Direction C Findings — CUT TO OUTCOME

### What the running page proved

- C 是视觉辨识度最强的方向。黄色、cobalt、persimmon、高压缩大标题和 Scene Band 在不依赖生成图片的情况下已经形成记忆点。
- Three-Act Scrubber 使用 `Problem → Decision → Outcome` 后，页面明确指向产品与运营判断，不像影视 Showreel。
- 大尺寸真实 screenshot 在项目场景中承担主要视觉，Digest 与 Memory Museum 的不同界面风格仍能被统一。
- 短信息块明显减少首页阅读压力；三个 Prototype 中 C 的主文本最短。
- 移动端压缩后，390×844 截图内可看到身份、学校、求职方向、四个 CTA 与 Quick Proof 的开头。

### Weakness exposed by the prototype

- 对每个项目都要求完整 Three-Act 会造成内容模板化，也会让页面长度迅速增长。
- 高色彩和超大标题必须在 G3 建立严格比例，否则容易压过真实 Case。
- 当前项目 screenshot 的清晰度与比例差异会在大画面中被放大。
- C 自身的 capability mapping 不如 B 明确；只靠场景叙事不足以支持岗位定向视图。

### Best material to retain

- 日间高色彩视觉系统与强 Typography。
- Scene Band 的页面节奏和大尺寸真实 screenshot。
- `Problem → Decision → Outcome` 只用于最重要 Case 的 progressive summary，而不是强制模板。

## 7. Runtime and QA Evidence

### Browser checks

- 三条实验路径均能直接打开。
- 1440×900 与 390×844 均无横向溢出。
- 六个 viewport 检查均无 console error、page error、失败请求或图片加载失败。
- A Proof Lens、B Role Lens、C Three-Act Scrubber 均通过实际点击状态验证。
- 三个方向均有 visible focus，并在 `prefers-reduced-motion: reduce` 下保持主内容可见、无溢出。

### Measured page height

| Direction | Desktop body height | Mobile body height | Interpretation |
| --- | ---: | ---: | --- |
| A | 3,754px | 5,260px | 最紧凑；移动端 Docket 仍可继续压缩。 |
| B | 4,241px | 5,899px | 最长；relationship copy 需要在 G3/G4 去重。 |
| C | 4,491px | 5,407px | Desktop Scene Bands 较长，但移动端节奏优于 B。 |

### Build output

`npm run build` 已通过。三个 Prototype 使用 route-level lazy chunk，不进入彼此的页面资源：

| Direction | CSS gzip | JS gzip |
| --- | ---: | ---: |
| A | 3.99 kB | 4.00 kB |
| B | 3.07 kB | 3.74 kB |
| C | 3.44 kB | 3.63 kB |
| Final Hybrid + G3 tokens | 5.44 kB | 4.31 kB |

当前风险主要来自原始项目图片，而不是 Prototype 交互代码。G3/G4 仍需建立 responsive image pipeline。

## 8. Historical G2 Hybrid Hypothesis

### Hypothesis

> 以 C 作为主要视觉与页面节奏；吸收 B 的 capability / role-based 信息关系；吸收 A 的 evidence discipline 与 editorial details。

### G2-stage decision

**G2 已证明 Hybrid 优于单独采用 A、B 或 C，但当时的主次仍属于待验证假设。G2.5 的实际实现已将主骨架正式调整为 B-led。**

原因：

1. C 解决了最难替代的问题：视觉辨识度与个人记忆点。
2. B 补上 C 当前最弱的岗位适配与 capability mapping。
3. A 补上 C 高色彩视觉可能缺失的来源、日期、脱敏和结果口径纪律。
4. 三者的优势可以处于不同层级，不必把三套 UI 堆在一个页面：C 管视觉与节奏，B 管信息关系，A 管内容可信度。

### Hybrid boundaries

进入 G3 时应保留：

- C：日间高色彩、强 Typography、Scene Band、大 screenshot、短文本。
- B：一个克制的 Role / Capability mapping 区，不引入网络图、流程图或第二套 dashboard navigation。
- A：自然 evidence caption、日期、来源和 disclosure；不引入 Evidence ID 墙或大面积脚注。

应明确拒绝：

- 同时保留 Proof Lens、Role Lens 和 Three-Act 三个首页交互。
- 让所有项目强制使用三幕结构。
- 把 Role Lens 做成全站 Dashboard。
- 把 evidence status 直接当作视觉品牌。
- 把 A 的完整 dossier、B 的完整 circuit 和 C 的完整 scene frame 叠加。

## 9. Final Hybrid Selected in G2.5

进入 G3 的正式方向为：

## **B-led Final Hybrid — PROOF CIRCUIT as the structure**

正式组合定义：

```text
B 的信息架构与项目浏览骨架
+ A 的 editorial typography、留白与 Evidence Caption 纪律
+ C 的受控高冲击 Typography 与重点 Case narrative
```

Final Hybrid 保留轻量 Role Lens 作为岗位相关性机制；Problem → Decision → Outcome 只服务重点项目叙事。Proof Lens 不作为第二套大型交互，只保留自然截图图注、日期、来源和必要 disclosure。

这个选择同时满足：

- 20–30 秒求职信息清晰
- 不像普通 Portfolio Template
- 能服务 AI Product / Product Ops / Project Ops
- 真实 Case Study 可扩展
- Mobile 和性能风险可控
- Creative Technology 成为差异化，而不是主叙事干扰

## 10. Content and Asset Notes Before G3

- 未生成任何 AI 图片，也没有假 screenshot。
- 当前 Prototype 不需要 neutral visual placeholder；`FUTURE_CASE_STUDY` 只是内部结构测试，正式公开时隐藏。
- 未来最有价值的素材不是装饰 Hero 图，而是实习中真实、脱敏的 AI Product / Workflow / Automation / Internal Tool / Project Operations 截图、流程材料和结果证据。
- Digest 的团队性质和个人职责仍未确认；三个 Prototype 均未把它定性为个人独立项目。
- Game Ads 始终处于 Lab / Simulation，未进入默认 Featured Work。
- 当前 `resume.pdf` 仍是 G0 发现的旧公开资产；G2 只验证入口位置，正式发布前仍需移除出生日期和手机号，并统一校名与届别。

## 11. G2 / G2.5 Exit Decision

G2 与 G2.5 已获得足够的实际页面证据支持 B-led Final Hybrid 进入 G3 Design System。

G2/G2.5 范围到此锁定：

- 不再创建新的视觉方向
- 不重新设计 Hero
- 不重启 A/B/C 比较
- G3 只建立 Design Tokens、规则与验证
- Deployment / README / CI 继续留到后续 Gate
