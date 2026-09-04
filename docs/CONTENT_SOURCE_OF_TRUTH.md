# ZSY Portfolio V2 — Content Source of Truth

> 版本：G5A Evidence Refresh  
> 更新日期：2026-09-03  
> 用途：G4 及之后所有公开文案、项目数据、Resume 对齐与 Case Study 写作的唯一事实基线。若其他文档与本文件冲突，以本文件为准。  
> 边界：本文件记录用户确认事实与公开规则，不补全未确认信息，不把内部状态直接显示给招聘者。

## 1. Content State Model

| State | 含义 | 公开使用规则 |
| --- | --- | --- |
| `CONFIRMED` | 稳定身份、分类或用户明确指定的规范信息 | 可直接作为公开基础 |
| `USER_VERIFIED` | 用户已确认的经历、职责、规模或结果 | 可使用；若缺公开附件，应以自然语言说明来源或范围 |
| `NEEDS_CONTENT` | 项目存在，但公开叙事、截图、结果或职责仍不完整 | 只做内部候选或自然占位，不补写事实 |
| `NEEDS_VERIFICATION` | 口径、时间、证据或可公开性仍需确认 | 不作为无条件结论发布 |
| `REDACT_REQUIRED` | 内容可用于 Portfolio，但公开前必须脱敏 | 只展示脱敏版本 |
| `INTERNAL_ONLY` | 敏感信息或只供内容治理使用 | 禁止进入公开页面、截图、源码与附件 |

状态与证据附件是两个维度：`USER_VERIFIED` 不等于仓库已有可公开截图；有截图也不等于截图足以证明所有结果。

## 2. Identity and Education

| Field | Source of truth | State | Public rule |
| --- | --- | --- | --- |
| 中文姓名 | 张少毅 | `CONFIRMED` | 可公开 |
| English name | Zhang Shaoyi | `CONFIRMED` | 可公开 |
| 学校 | 上海政法学院 | `CONFIRMED` | 统一使用，不保留旧校名冲突 |
| 专业 | 网络与新媒体 | `CONFIRMED` | 可公开 |
| 届别 | 2027 届本科 / 2027 Graduate | `CONFIRMED` | 不使用“大三在读”等易过期表述 |
| Email | `fuoguzz@gmail.com` | `CONFIRMED` | 可公开 |
| GitHub | `https://github.com/Fuoguz` | `CONFIRMED` | 可公开 |
| 所在地 | 暂不展示 | `NEEDS_VERIFICATION` | 不是 Homepage 核心信息 |
| 手机号、出生日期 | 不公开 | `INTERNAL_ONLY` | 从未来公开 Resume 移除 |

## 3. Public Positioning

### Default recruiting position

```text
产品运营 → 项目运营 → AI 应用 → 业务数字化
```

状态：`CONFIRMED`

这是一条公开定位顺序，不把用户包装成正式“AI Product Manager”，也不夸大为战略负责人、技术负责人或独立工程负责人。

### Homepage positioning statement

> 把业务中的流程、数据与协作问题，转化为可执行的运营方案、产品原型和 AI 辅助工具。

状态：`CONFIRMED`。后续只允许编辑性压缩，不改变职责边界。

### Role Lens

Role Lens 是招聘者浏览视图，不是职位头衔。它只改变推荐顺序、强调与 `Why it matters`，不修改项目事实，也不隐藏其他项目。

- AI Product
- Product Ops
- Project Ops
- Growth
- AI Native

## 4. Experience

### 4.1 传音控股 / TEX AI / 传音学院

| Field | Source of truth | State |
| --- | --- | --- |
| Organization | 传音控股 / TEX AI / 传音学院 | `CONFIRMED` |
| Role | 项目与人才运营 | `CONFIRMED` |
| Time | 2026.06 — 至今 | `CONFIRMED` |

用户已确认参与内容：

1. 雏鹰专项集训：约 400–500 人、5 个班级；参与人员信息、学员沟通、现场执行、测试问卷、数据统计、项目收尾与数字化工具支持。`USER_VERIFIED`
2. 自由组队平台：面向约 5 个班级、每班约 90 人、每队约 10–12 人；参与需求梳理、页面 / 功能搭建、信息卡片、建队 / 入队、人数限制、班级展示、移动端适配与数据匹配；集训前投入使用。`USER_VERIFIED` + `REDACT_REQUIRED`
3. 人才培养 / 带教管理：约 480 对师徒、约 6 个月培养周期；参与产品需求梳理、部门层级筛选、角色权限、师徒关系、导师变更、数据同步与异常处理。`USER_VERIFIED` + `REDACT_REQUIRED`
4. 转入 TEX AI HRBP 相关工作后，承接新人入职、培养、转正相关运营流程，并持续识别流程自动化机会。`USER_VERIFIED`

责任边界：后续软件工程同事完成的全部系统开发、正式生产成果或持续维护，不得归为用户独立成果。

### 4.2 UNICAREER

| Field | Source of truth | State |
| --- | --- | --- |
| Organization | UNICAREER | `CONFIRMED` |
| Role | 财经与求职内容运营 | `CONFIRMED` |
| Time | 2024.07 — 2026.07 | `CONFIRMED` |

详细职责与可公开结果由 AI Content Growth Case 承载；其他 Resume 文案在 G4 前继续核对。

### 4.3 新通教育

| Field | Source of truth | State |
| --- | --- | --- |
| Organization | 新通教育 | `CONFIRMED` |
| Role | 新媒体运营 | `CONFIRMED` |
| Time | 2025.12 — 2026.03 | `CONFIRMED` |

“约 10% 转化”等旧量化口径仍为 `NEEDS_VERIFICATION`，不得直接进入公开 Homepage。

## 5. Project Priority

### Homepage Top 3

1. **EagleHub / 企业人才培养管理平台** — `REAL PROJECT / INTERNAL PRODUCT`
2. **TEX AI Onboarding Automation / 新人入职流程自动化** — `REAL BUSINESS WORK / INTERNAL AUTOMATION`
3. **AI Content Growth Workflow** — `REAL PROJECT`

### Supporting Real Work

- 自由组队平台 — `REAL PROJECT / INTERNAL TOOL / SHIPPED / USED`
- 雏鹰专项集训 — 作为 Project Ops / Experience evidence，不伪装成软件产品

### Potential Featured Case

- Globridge — `NEEDS_CONTENT`；未补齐公开内容前不进入默认 Top 3

### Lab / Experiments

- Digest — `LAB / EXPERIMENT`；团队性质、本人职责与独立开发部分仍需确认
- Memory Museum — `EXPERIMENT`
- Video / Motion — `CREATIVE WORK / LAB`
- Game Ads Script Demo — `SIMULATION`，不得与真实业务 Case 同级

## 6. Project Records

### 6.1 EagleHub / 企业人才培养管理平台

| Field | Source of truth | State |
| --- | --- | --- |
| Classification | REAL PROJECT / INTERNAL PRODUCT | `CONFIRMED` |
| Public role | 早期产品方案与核心框架、AI 辅助实现 | `CONFIRMED` |
| Context | 新人带教 / 人才培养管理 | `CONFIRMED` |
| Roles | 学员、导师、HRBP / 管理员 | `USER_VERIFIED` |
| Core modules | 师徒关系、培养计划、任务反馈、进度跟踪、部门数据隔离、角色权限 | `USER_VERIFIED` |
| User contribution | 早期主导产品方案、核心功能框架和多角色需求；借助 AI 完成原型、本人参与部分的功能实现、迭代和问题排查 | `USER_VERIFIED` |
| Continued involvement | 部门层级筛选、权限同步、导师变更、师徒关系、异常数据处理 | `USER_VERIFIED` |
| Scale | 功能框架后续用于约 480 对师徒的人才培养场景 | `USER_VERIFIED` |
| Public screenshot | 当前仓库无可公开截图 | `NEEDS_CONTENT` + `REDACT_REQUIRED` |

禁止表述：用户独立完成整个最终 Production System、所有后续开发或全部正式工程成果。

### 6.2 TEX AI Onboarding Automation

| Field | Source of truth | State |
| --- | --- | --- |
| Classification | REAL BUSINESS WORK / INTERNAL AUTOMATION | `CONFIRMED` |
| Status | Validated Prototype / Dry-run | `CONFIRMED` |
| Workflow | Roster → employee parsing → grade / employee type routing → navigation mapping → existing record comparison → review / export | `USER_VERIFIED` |
| Validated scope | 读取花名册与相关业务数据；按规则路由；P2 / P3 导航；已有记录逐字段 Diff | `USER_VERIFIED` |
| Test result | 测试样本中目标字段曾达到 11 / 11 一致 | `USER_VERIFIED` |
| Current boundary | 以 read-only / dry-run 为主，自动写入未描述为已上线 | `CONFIRMED` |
| Public screenshot | 当前仓库无可公开截图 | `NEEDS_CONTENT` + `REDACT_REQUIRED` |

公开重点是把重复 HR / Onboarding 规则结构化并转化为可验证流程，不是“写了一个 Python 工具”。

### 6.3 自由组队平台

| Field | Source of truth | State |
| --- | --- | --- |
| Classification | REAL PROJECT / INTERNAL TOOL | `CONFIRMED` |
| Status | SHIPPED / USED | `CONFIRMED` |
| Context | 大型新人集训中的自由组队 | `CONFIRMED` |
| Scale | 约 400–500 人、5 个班级、每班约 90 人、每队约 10–12 人 | `USER_VERIFIED` |
| User contribution | 需求梳理、页面 / 功能搭建、信息卡片、建队 / 入队、人数限制、班级展示、移动端适配、数据匹配 | `USER_VERIFIED` |
| Public screenshot | 当前仓库无可公开截图 | `NEEDS_CONTENT` + `REDACT_REQUIRED` |

### 6.4 AI Content Growth Workflow

| Field | Source of truth | State |
| --- | --- | --- |
| Classification | REAL PROJECT | `CONFIRMED` |
| Account scale | 约 55 万粉丝公众号 | `USER_VERIFIED`；仓库有脱敏后台截图 |
| Peak article | 单篇最高阅读量 2 万+ | `USER_VERIFIED`；公开证据映射仍需整理 |
| Cadence | 长期每周约 7 篇 | `USER_VERIFIED` |
| Workflow | Claude + Gemini；选题分析、资料整理、内容结构、初稿、人工校验 | `USER_VERIFIED` |
| Production cycle | 约 2 小时 → 20–30 分钟 | `USER_VERIFIED`；统计口径仍需说明 |
| Primary proof | Growth、Content Operations、AI Workflow、Process Optimization | `CONFIRMED` |

该项目保留为重要 Case，但不再是默认 Featured 01。55 万账号规模与 2 万+阅读量保留在 Case 内，不占据跨项目 Quick Proof。

### 6.5 Globridge

| Field | Source of truth | State |
| --- | --- | --- |
| Candidate type | AI 辅助全栈业务系统 | `USER_VERIFIED` |
| Existing scope | 存量代码理解、需求拆解、功能迭代、前后端接口联调、问题排查、云部署维护；使用 Codex 等 AI 开发工具 | `USER_VERIFIED` |
| Missing | 项目背景、真实职责、时间、截图、交付结果、可公开范围 | `NEEDS_CONTENT` |

未补齐前只作为 Potential Featured Case，不自动进入 Top 3。

### 6.6 Lab records

| Project | Classification | State | Public boundary |
| --- | --- | --- | --- |
| Digest | LAB / EXPERIMENT | `NEEDS_VERIFICATION` | 保留现有真实截图与 Demo；不得写成纯个人独立商业产品 |
| Memory Museum | EXPERIMENT | `CONFIRMED` | 可展示真实界面与可运行原型 |
| Video / Motion | CREATIVE WORK / LAB | `CONFIRMED` | 使用真实成片 / 截帧，不用文字占位封面 |
| Game Ads Script Demo | SIMULATION | `CONFIRMED` | 明确无真实投放结果，不进入默认 Featured Work |

## 7. Role Lens Mapping

| Lens | Recommended evidence order |
| --- | --- |
| AI Product | EagleHub → Onboarding Automation → Globridge → Digest |
| Product Ops | EagleHub → Onboarding Automation → 自由组队平台 → AI Content Growth |
| Project Ops | 雏鹰专项集训 → 自由组队平台 → EagleHub → 新人入职流程 |
| Growth | AI Content Growth → 新通教育相关经历 |
| AI Native | EagleHub → Onboarding Automation → Globridge → Digest |

Prototype 的 Start Here 只显示当前 Top 3；Role Lens 可以在说明中指向未进入 Start Here 的 supporting / potential work。

## 8. Metrics and Evidence Register

| Metric / claim | Context | Content state | Current public evidence | Use |
| --- | --- | --- | --- | --- |
| 约 400–500 人 | 雏鹰专项集训总体规模 | `USER_VERIFIED` | 当前仓库未附公开材料 | Homepage Quick Proof；自然说明范围 |
| 5 个班级 | 雏鹰专项集训 | `USER_VERIFIED` | 当前仓库未附公开材料 | Case / Experience |
| 每班约 90 人；每队约 10–12 人 | 自由组队平台 | `USER_VERIFIED` | 当前仓库未附公开材料 | Supporting Work |
| 约 480 对 | 师徒培养管理场景 | `USER_VERIFIED` | 当前仓库未附公开材料 | Homepage Quick Proof / EagleHub |
| 约 6 个月 | 培养周期 | `USER_VERIFIED` | 当前仓库未附公开材料 | EagleHub context |
| 测试样本目标字段 11 / 11 一致 | Onboarding Dry-run | `USER_VERIFIED` | 当前仓库未附公开材料 | Case evidence；不能延伸为生产准确率 |
| 约 55 万 | 公众号账号规模 | `USER_VERIFIED` | `wechat-growth-01.png` | Content Growth Case |
| 单篇最高 2 万+ | Content Growth | `USER_VERIFIED` | 公开证据映射待整理 | Content Growth Case |
| 长期每周约 7 篇 | Content Growth | `USER_VERIFIED` | 公开证据映射待整理 | Content Growth Case |
| 约 2h → 20–30min | 单篇内容生产周期 | `USER_VERIFIED` | 用户确认；测量口径待补 | Homepage Quick Proof / Case |

任何指标均不得从“场景规模”偷换为“用户独立管理人数”“上线用户数”或“商业转化”。

## 9. Disclosure and Redaction Rules

### Public by default

- Email、GitHub
- 学校、专业、届别
- 已确认且完成脱敏的项目描述、流程、职责与结果
- 真实公开链接与公开截图

### Redaction required before publication

- 内部产品截图、流程图、表格与业务字段
- 组织结构、角色权限、部门层级和人员关系材料
- 任何含员工数据的测试 / 导出 / Diff 结果
- EagleHub、Onboarding、自由组队平台的所有内部视觉材料

### Internal only / never publish

- 手机号、出生日期、身份证信息
- 员工工号、内部人员姓名、内部邮箱、真实通讯录
- App ID、App Secret、Token、Table ID
- 内部系统地址、未脱敏员工数据、公司敏感源代码

对外可以展示：脱敏流程图、匿名 UI、合成测试数据、字段映射概念、Before / After Workflow 与经过脱敏的结果证据。不得生成假系统截图。

## 10. Homepage Content Model

```text
Hero identity + public positioning
→ Start Here: EagleHub / Onboarding Automation / AI Content Growth
→ Role Lens: shared facts, role-specific emphasis
→ Quick Proof: cross-project breadth
→ Featured 01: EagleHub with Problem / Decision / Outcome
→ Supporting Real Work: Onboarding / Team Formation / Content Growth
→ Experience summary
→ Potential Case: Globridge
→ Lab: Digest / Memory Museum / Video / Game Ads
→ Resume & Contact
```

Quick Proof canonical draft：

1. `400–500 人` — 大型新人培养项目规模
2. `≈480 对` — 师徒培养管理场景
3. `2h → 20–30min` — AI 内容工作流生产周期

## 11. Resume Status

旧 `resume.pdf` 已从 `public/` 移出并保存在 gitignored `internal-assets/resume-non-final.pdf`，不进入 Production build。

后续 Resume 必须：

- 移除手机号与出生日期
- 使用“上海政法学院”“网络与新媒体”“2027 届本科 / 2027 Graduate”
- 与本 Source of Truth 的经历、项目分类、职责边界和时间一致
- 所在地继续省略，除非用户后续明确确认

G3.5 不生成新 PDF。

## 12. Outstanding TODO

### Evidence / content required

- EagleHub：可公开项目背景、脱敏截图、本人功能范围、关键迭代与结果材料
- Onboarding Automation：脱敏流程 / 匿名 UI / 测试数据、11 / 11 的字段与测试边界、下一阶段状态
- 自由组队平台：可公开截图、使用过程或交付证据、本人搭建范围
- Globridge：项目背景、本人职责、时间、截图、交付结果、公开范围
- AI Content Growth：2 万+、每周 7 篇与效率变化的统计周期 / 证据映射
- 新通教育：可公开职责、结果及旧“约 10%”口径

### User confirmation required

- Digest 的团队性质、本人职责与独立开发部分
- EagleHub “早期产品方案与核心框架、AI 辅助实现”最终公开职位标签的中文 / 英文写法
- 传音、TEX AI、传音学院三个组织名称在公开 Portfolio 中的标准层级写法
- 内部项目可公开的截图、流程字段和组织名称范围
- Globridge 是否及何时升级为 Featured Case
- 未来公开 Resume 是否展示所在地

## 13. Superseded Content

以下旧内容不删除原始项目，但不再作为当前默认结构：

- `AI 产品 → 产品运营 → 项目运营 → Content / Growth → AI Native`：**deprecated as default public positioning**；Role Lens 术语仍保留。
- `AI Content Growth → Digest → Memory Museum`：**demoted as old Homepage Top 3**。
- Digest / Memory Museum / Video / Game Ads：**moved to Lab / Experiments**。
- `55 万+ / 2h → 20min / 7 篇每周`：**deprecated as Homepage Quick Proof set**；指标仍保留在 Content Growth Case。
- 旧 Resume：**internal only / not final public resume**；公开入口暂为邮件索取。

## 14. G5A Public Evidence Decisions

以下决定在不改变原始事实等级的前提下，更新公开呈现状态：

- **EagleHub**：加入系统概览、角色模型与变化闭环三张公开安全重绘图。它们解释结构和过程，不作为约 480 对或约 6 个月的原始证明。
- **Onboarding Automation**：加入 Before / After、规则路由和匿名 Dry-run Demo；项目可公开为 `Validated Prototype / Dry-run`，仍不得描述为生产自动化已上线。
- **Onboarding 11 / 11**：只指特定 Dry-run 测试样本中目标字段一致，不是 100% accuracy，不代表生产稳定性。
- **Team Formation**：加入约束图与用户流程重绘图；真实移动端截图和交付记录仍待补。
- **AI Content Growth**：两张真实脱敏后台截图继续作为最高等级视觉证据；新增工作流图只解释 AI 与人工判断的分工。
- **Eagle Training**：加入运营协作链重绘图，继续作为 Experience / Project Ops evidence，不升级为软件产品或独立 Case。

公开 Evidence 必须在数据层标记来源：真实脱敏截图、基于真实流程重新绘制、Demo Data 或真实公开作品。前台使用自然语言标签，不显示内部 enum。

## 15. G5A Content Gaps

- EagleHub 的真实脱敏界面、关键迭代记录与可核验的本人实现范围。
- Onboarding 的真实脱敏 Dry-run 输出、11 / 11 字段范围与测试条件。
- Team Formation 的真实移动端界面和使用 / 交付记录。
- Content Growth 的 2 万+、每周约 7 篇、2h → 20–30min 的统计周期与测量方法。
- Eagle Training 的公开项目记录或工作样例。

以上缺口继续标记为用户补充项，不生成假 UI、假记录或假 KPI。
