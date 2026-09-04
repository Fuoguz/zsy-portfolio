# ZSY Portfolio V2 — G5A Case Study Content Report

> 更新日期：2026-09-03  
> 范围：EagleHub、Onboarding Automation、Team Formation、AI Content Growth、Eagle Training。

## 1. Outcome

G5A 将四个公开 Case 从“项目摘要 + 数字”增强为可阅读的业务叙事，并为五个优先项目建立证据清单。视觉方向、Router 与基础内容架构保持不变。

## 2. Case readiness

| Project | Public route | Current depth | Evidence | Remaining gap |
| --- | --- | --- | --- | --- |
| EagleHub | `/work/eaglehub` | Context、Problem、Constraints、Contribution、Decision、Outcome、Reflection | 3 张公开安全重绘图 | 真实脱敏 UI、迭代记录、实现范围材料 |
| Onboarding Automation | `/work/onboarding-automation` | Context、规则、Dry-run 边界、Decision、11 / 11 口径、Reflection | 2 张重绘流程 + 1 张匿名 Demo Data | 真实 Dry-run 输出、字段范围与测试条件 |
| Team Formation | `/work/team-formation-platform` | Context、约束、贡献、交付、Reflection | 2 张重绘图 | 真实移动端截图或使用 / 交付记录 |
| AI Content Growth | `/work/ai-content-growth-workflow` | Context、流程、贡献、结果、Reflection | 2 张真实脱敏截图 + 1 张重绘流程 | 2 万+、7 篇 / 周与效率的统计周期 |
| Eagle Training | 无独立 Case | Experience / Project Ops evidence | 1 张重绘协作图 | 真实项目记录；当前不升级为软件项目 |

## 3. Shared rendering changes

- Case Study Shell 新增可选 Context、Constraints 与 Reflection。
- EvidenceFigure 显示自然语言来源标签。
- 字段缺失时继续不渲染空区块。
- Start Here 与 Featured Work 自动从 public-safe Evidence 取得视觉；没有绕过 selector。
- Onboarding 在具备三项公开安全证据后从 `NEEDS_REDACTION` 调整为 `PARTIAL`，仍保留 `VALIDATED_PROTOTYPE`。
- Production 改为消费构建前生成的 selector-sanitized snapshot，raw governance notes 不再进入主浏览器 bundle。

## 4. Content boundaries

- 重绘图不被连接到数量 Claim，因此不会被误当成 KPI 原始证明。
- `11 / 11` 只描述特定 Dry-run 测试样本目标字段一致，不描述准确率。
- EagleHub 明确区分“我负责”“我参与”“协作边界”“不归因于本人”。
- Team Formation 的 400–500 人是业务规模，不是个人独立管理人数。
- Eagle Training 继续作为运营协作证据，而非独立开发的软件产品。

## 5. Data preparation for G5B

新增 Capability Evidence Mapping 数据与公开 selector。它只返回当前公开项目 ID，并自动排除未公开的 Globridge / Digest。G5A 不实现 Evidence Graph 或新交互。

## 6. Deferred

- 真实内部截图的用户提供、逐图脱敏和批准。
- 最终公开 Resume PDF。
- Lightbox 体验增强。
- Capability Evidence Graph / Command Palette 等 G5B 交互。
- G5A 范围外的 Lab 深度内容。

## 7. Final verification

- 浏览器 QA：四个 Case 在 `1440 × 900` 与 `390 × 844` 均通过；共输出 16 张顶部 / Evidence 截图与 1 份结构化结果。无横向溢出、控制台错误、页面错误或失败请求。
- Evidence QA：EagleHub 3 项重绘证据；Onboarding 2 项重绘 + 1 项 Demo Data；Team Formation 2 项重绘；AI Content Growth 2 项真实脱敏截图 + 1 项重绘。全部显示自然语言来源标签。
- 内容安全：Production 页面、Public Selector 快照、公开图片路径与非 Prototype production chunks 未出现内部治理状态、敏感字段、旧简历手机号 / 出生日期或公开“待补”文案。
- 自动化：41 / 41 tests PASS；coverage 为 lines 96.55%、branches 84.47%、functions 90.70%。
- 工程验证：`lint`、`validate:content`、`validate:public-assets`、默认 build、GitHub Pages base build、root-domain build 全部 PASS。
- Bundle：主 JS 约 236.14 kB，gzip 约 74.14 kB；G5A 未新增大型运行时依赖。
- 截图与机器结果：`artifacts/design/g5a/cases/`。

## 7. Verification record

- `npm test`：41 / 41 PASS。
- `npm run test:coverage`：Lines 96.55%、Branches 84.47%、Functions 90.70%。
- `npm run lint`：PASS。
- `npm run validate:content`：PASS（10 projects、10 claims、16 evidence records）。
- `npm run validate:public-assets`：PASS（扫描 13 个公开文本资产；非最终 Resume 已排除）。
- `npm run build`、`npm run build:github`、`npm run build:root`：PASS。
- Production 主包约 236.14 kB，gzip 约 74.14 kB；Project Page 保持独立 lazy chunk。
- Production chunks 与生成的公开快照未发现内部治理字段、未验证状态、敏感凭据提示、旧手机号 / 出生日期或公开内容中的“待补”措辞。
- 浏览器 QA：EagleHub、Onboarding Automation、Team Formation、AI Content Growth 在 1440 × 900 与 390 × 844 均通过；无横向溢出、控制台错误、页面错误或失败资源请求。
- 共输出 16 张案例截图（每个 Case 的顶部与 Evidence viewport，各含桌面和移动端），机器结果见 `artifacts/design/g5a/cases/qa-results.json`。
- 人工检查了四个 Case 的顶部和 Evidence 截图；重绘图、Demo Data 与真实脱敏截图的来源标签可辨认，Onboarding 图中文字裁切已修复。

## 8. Known boundary

历史 Prototype chunks 继续按 G4B 决策保留为 Visual Regression Reference，其中仍可能出现当时的内容占位描述；它们不被 Production 页面或 Public Selector 消费，也未发现敏感字段或凭据。是否在正式部署前将 experiment routes 限制为 development-only，留给 G6 / Deployment Gate 决定。
