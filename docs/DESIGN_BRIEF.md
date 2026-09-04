# ZSY Portfolio V2 — Design Brief

> 版本：G3.5 Content Refresh  
> 更新日期：2026-09-02  
> 事实来源：[CONTENT_SOURCE_OF_TRUTH.md](./CONTENT_SOURCE_OF_TRUTH.md)  
> 视觉基线：[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) 与 [DESIGN_COMPARISON.md](./DESIGN_COMPARISON.md)  
> 状态：**FINAL VISUAL DIRECTION LOCKED**。本 Brief 只更新内容定位，不重新开启视觉探索。

## 1. Product Definition

ZSY Portfolio V2 是：

1. 个人作品集
2. 求职第二简历
3. Interactive Portfolio
4. Product / Operations Case Study Archive

它首先服务 2027 届秋招判断，其次才承担视觉实验。Homepage 的任务是 **Convince**；Case Study 的任务是 **Prove**。

## 2. Canonical Candidate Profile

- 张少毅 / Zhang Shaoyi
- 上海政法学院
- 网络与新媒体
- 2027 届本科 / 2027 Graduate

公开默认求职定位：

```text
产品运营 → 项目运营 → AI 应用 → 业务数字化
```

Hero positioning：

> 把业务中的流程、数据与协作问题，转化为可执行的运营方案、产品原型和 AI 辅助工具。

禁止把用户包装成正式“AI Product Manager”、战略负责人、技术负责人或整个内部系统的独立开发者。

## 3. Primary Goal

招聘者在 20–30 秒内应能回答：

1. Zhang Shaoyi 是谁、哪届、什么专业
2. 主投产品运营 / 项目运营，并能处理 AI 应用与业务数字化问题
3. 最新、最重要的三项真实工作是什么
4. 哪些能力由真实规模、实际使用、验证结果或真实截图证明
5. 哪些内容属于 Supporting Work、Potential Case 或 Lab
6. Resume、GitHub 与 Contact 在哪里

## 4. Audience

### Primary

- 产品运营、项目运营、AI 应用与业务数字化相关校招招聘者
- 需要判断业务流程、项目执行、数据协作与工具落地能力的 hiring manager
- AI Product / Product Ops / Project Ops / Growth / AI Native 相邻岗位面试官

### Secondary

- 深读 Case Study 的业务、产品、运营与工程协作者
- 通过 Lab 评估 Creative Technology 差异化能力的访问者
- 查看代码组织与部署质量的 GitHub 访问者

## 5. Core Principles

- **Evidence > Decoration**
- **Real Project > Simulation**
- **Result > Tool List**
- **Screenshot > Long Paragraph**
- **Clarity > Fancy Interaction**
- **Shared Facts > Role-specific Rewriting**
- **Responsibility Boundary > Inflated Ownership**

没有可公开截图时，保留用户已确认事实并使用自然 disclosure；不得生成假系统 UI。内部数据状态不作为前台视觉品牌。

## 6. Locked Visual Direction

最终方向是 B-led Final Hybrid：

```text
PROOF CIRCUIT 的信息架构与项目浏览骨架
+ PROOFROOM 的 editorial typography、留白、caption 与证据纪律
+ CUT TO OUTCOME 的受控高冲击 Typography 与 Problem → Decision → Outcome
```

锁定语言：Typography-led、Information-driven、Evidence-aware、Editorial precision、Product-oriented、Real project first、Restrained interaction。

本阶段及 G4 不应：

- 创建 Direction D 或重开 A / B / C 比较
- 重做 Hero、Color System 或 Design Tokens
- 恢复 black + acid green
- 引入 WebGL、Three.js、假项目视觉或新大型交互
- 把页面重新做成 Dashboard、BI interface、满屏卡片或普通 SaaS Landing Page

## 7. Current Homepage Hierarchy

```text
Navigation
→ Hero
→ Start Here
→ Role Lens
→ Quick Proof
→ Featured Project Opening
→ Supporting Real Work
→ Experience summary
→ Potential Case
→ Lab / Experiments
→ Resume & Contact
```

Mobile 允许自然滚动，不要求 Role Lens、Quick Proof 和 Featured Project 全部进入 390×844 首屏。

## 8. Hero Requirements

必须直接出现：

- Zhang Shaoyi
- 上海政法学院 · 网络与新媒体 · 2027 Graduate
- 产品运营 / 项目运营 / AI 应用 / 业务数字化
- 新 positioning statement
- View Work、Resume、GitHub、Contact

当前 Hero 信息结构和移动端 2×2 CTA 保留。不得为塞入更多模块继续压缩 mobile Hero。

## 9. Project Priority and Homepage Content

### Start Here / Featured Top 3

1. **EagleHub / 企业人才培养管理平台**
2. **TEX AI Onboarding Automation / 新人入职流程自动化**
3. **AI Content Growth Workflow**

### Supporting Real Work

- 自由组队平台
- 雏鹰专项集训（Experience / Project Ops evidence）

### Potential Case

- Globridge — `NEEDS_CONTENT`，不自动进入 Top 3

### Lab

- Digest — 团队性质与本人职责待确认
- Memory Museum
- Video / Motion
- Game Ads Simulation

旧项目不删除，只做 **demoted / lab / needs review** 标记。

## 10. Quick Proof

Homepage 使用跨项目 proof：

1. `400–500 人` — 大型新人培养项目规模
2. `≈480 对` — 师徒培养管理场景
3. `2h → 20–30min` — AI 内容工作流生产周期

55 万账号规模、2 万+最高阅读量与每周约 7 篇保留在 AI Content Growth Case 内。Quick Proof 是短结果 + 意义 + 自然 evidence caption，不是 KPI Dashboard。

## 11. Featured Project Opening: EagleHub

EagleHub 是当前 Featured 01，也是重点 Case Study 共享语法的压力测试。

### Classification

`REAL PROJECT / INTERNAL PRODUCT`

### Public role

“早期产品方案与核心框架 · AI 辅助实现”是当前安全工作文案。它描述早期主导范围，不等于独立完成最终生产系统。

### Problem → Decision → Outcome

- **Problem**：约 480 对师徒、约 6 个月培养周期中的关系、权限、部门层级和变化需要持续同步。
- **Decision**：先梳理学员 / 导师 / HRBP 多角色需求与核心功能框架，再借助 AI 推进原型及本人参与部分的实现、迭代和排查。
- **Outcome**：相关框架后续进入约 480 对师徒的人才培养场景；用户持续参与筛选、权限、导师变更、师徒关系和异常数据处理。

必须同时说明：后续正式工程成果由软件工程同事共同完成，不能归为用户独立成果。

### Evidence treatment

当前没有可公开 EagleHub 截图。Prototype 使用明确的 neutral placeholder，写明“无内部 UI 展示 / 脱敏材料待补”，不生成界面、不模拟数据、不把功能列表伪装成产品截图。

## 12. Supporting Work Grammar

### Onboarding Automation

- 分类：REAL BUSINESS WORK / INTERNAL AUTOMATION
- 状态：Validated Prototype / Dry-run
- 重点：人工规则结构化、read-only 验证、字段 Diff、review / export
- 11 / 11 只描述测试样本目标字段一致，不写成生产准确率
- 不描述自动写入已经上线

### Team Formation

- 分类：REAL PROJECT / INTERNAL TOOL / SHIPPED / USED
- 重点：大型新人集训中的需求、页面 / 功能、规则、移动端与数据匹配
- 规模是业务背景，不偷换为用户独立管理人数

### AI Content Growth

- 分类：REAL PROJECT
- 重点：Growth、Content Operations、AI Workflow、Process Optimization
- 使用现有真实脱敏截图；它仍是重要 evidence，但不再定义整个首页身份

## 13. Role Lens

Role Lens 保留以下视图：AI Product、Product Ops、Project Ops、Growth、AI Native。它是信息浏览层，不是公开职称。

| Lens | Priority mapping |
| --- | --- |
| AI Product | EagleHub → Onboarding → Globridge → Digest |
| Product Ops | EagleHub → Onboarding → 自由组队平台 → Content Growth |
| Project Ops | 雏鹰专项集训 → 自由组队平台 → EagleHub → 新人入职流程 |
| Growth | Content Growth → 新通教育经历 |
| AI Native | EagleHub → Onboarding → Globridge → Digest |

Role Lens 只调整推荐、强调和说明，不改事实，不创造不同项目版本，也不让其他内容无法访问。

## 14. Experience Section

未来 Homepage 正式加入紧凑摘要：

1. TRANSSION / TEX AI / 传音学院 — 项目与人才运营 — 2026.06 — Present
2. UNICAREER — 财经与求职内容运营 — 2024.07 — 2026.07
3. 新通教育 — 新媒体运营 — 2025.12 — 2026.03

Homepage 只给判断所需摘要；详细职责进入 Resume 或相关 Case Study。

## 15. Content Data and Architecture Requirements

G4 必须把以下维度拆开：

```text
project identity
classification / delivery status
priority / placement
role-lens relevance
facts / claims / metrics
user contribution / responsibility boundary
evidence assets
disclosure / redaction
public copy
content completeness
```

允许一个项目关联多个 Role Lens，但只有一套共享事实。内容状态使用：`CONFIRMED / USER_VERIFIED / NEEDS_CONTENT / NEEDS_VERIFICATION / REDACT_REQUIRED / INTERNAL_ONLY`。

## 16. Case Study Content Model

重点 Case 可支持：Overview、Context、Problem、My Role、Constraints、Process、Key Decisions、Solution、Evidence、Results、Reflection、What I Would Improve。

没有内容的模块不硬填。Problem → Decision → Outcome 是重点项目摘要工具，不是所有项目必须复制的模板。

## 17. Language Rules

- 中文：问题、过程、职责、结果、Reflection 与正文。
- 英文：Navigation、Project classification、Role Lens、短标签与行业通用术语。
- 允许 Start Here、Quick Proof、Problem、Decision、Outcome 等已锁定短标签。
- 不做无规则中英混排，不在 G3.5 建完整双语切换。

## 18. Visual and Interaction Rules

- 真实截图是项目 evidence，不是装饰图。
- Start Here preview 是导航增强；真实 Evidence 位于 Featured / Case Study。
- Desktop 支持 hover / focus 更新 Preview；Mobile 通过 touch 更新或打开项目，不依赖 hover。
- Cobalt 是 primary accent，Vermilion 是 secondary accent；不新增第三主色。
- Alignment first、Whitespace second、Divider third、Full border last。
- Motion 只帮助 hierarchy、feedback、navigation 与 context；reduced motion 下内容初始可见。

完整规则以 `docs/DESIGN_SYSTEM.md` 为准。

## 19. Responsive, Accessibility and Performance

验证尺寸：375、390、430、768、1024、1440。

- 无页面横向滚动
- Touch target ≥ 44px
- Navigation / menu 可键盘与触摸操作
- Visible focus，正确 heading hierarchy 与 alt / caption
- Hover 信息有触摸替代
- `prefers-reduced-motion` 下信息不丢失
- 非首屏图片 lazy load
- 不因内部素材缺失引入大图、WebGL 或持续动画

## 20. Privacy and Disclosure

公开允许：Email、GitHub、学校、专业、届别、公开 / 脱敏项目。

默认不展示：手机号、出生日期、身份证、员工工号、内部人员姓名、内部邮箱、通讯录、App ID / Secret、Token、内部系统地址、表格 ID、未脱敏员工数据与敏感源代码。

所在地暂不展示。EagleHub、Onboarding、自由组队平台的视觉材料公开前全部 `REDACT_REQUIRED`。

## 21. Resume

当前 `public/resume.pdf` 不是最终 `PUBLIC PORTFOLIO RESUME`。未来版本必须移除手机号 / 出生日期，统一学校 / 专业 / 届别，并与 Content Source of Truth 对齐。本阶段只记录 TODO，不生成 PDF。

## 22. G3.5 Success Criteria

- 最新身份与定位进入唯一 Source of Truth
- EagleHub 成为 Featured 01
- Onboarding Automation 进入正式 Case Inventory
- 自由组队平台进入 Supporting Work
- Content Growth 不再垄断 Homepage proof
- Digest / Memory / Video / Game Ads 下沉 Lab
- Role Lens 与 Quick Proof 更新
- Prototype 保持 Final Hybrid Design System 稳定
- 内部视觉缺失时只使用明确 neutral placeholder
- `npm run build` 通过

## 23. Gate Boundary

G3.5 允许更新内容、排序、Prototype 数据与小范围排版；不允许重构 Router、全面组件化、部署、CI/CD 或进入 G4。

完成 G3.5 后停止。下一阶段只有在用户明确授权后才开始 G4。

