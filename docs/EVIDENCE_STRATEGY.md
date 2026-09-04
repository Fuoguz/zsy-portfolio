# ZSY Portfolio V2 — Evidence Strategy

> Gate：G5A  
> 更新日期：2026-09-03  
> 原则：证据要帮助招聘者判断真实工作、决策与贡献边界，不把“可视化”伪装成“原始记录”。

## 1. Evidence hierarchy

公开 Case Study 按以下优先级组织证据：

1. **真实脱敏截图**：直接证明真实界面、业务规模或交付结果。
2. **真实公开作品 / 链接**：证明可访问的实际输出。
3. **结构化 Claim**：用户确认或已由附件支持的事实；必须保留口径与范围。
4. **基于真实流程重新绘制**：解释系统、规则、流程与决策，不替代原始截图或数据证明。
5. **DEMO DATA · 匿名示例**：仅演示输出结构或交互逻辑，不代表真实员工记录。

叙事不能提升证据等级。流程图能证明“工作如何被组织”，不能单独证明 KPI、上线状态或独立归因。

## 2. Public evidence contract

每条公开 Evidence 必须具备：

- 稳定 `id`、`projectId`、`type`、`asset`；
- `origin`，区分真实截图、重绘流程、Demo Data 或真实公开作品；
- 公开安全 `visibility` 与已完成的 `redactionStatus`；
- 明确 `alt`、尺寸和自然语言 caption；
- `supportsClaims` 只连接它真正支持的 Claim。

Public selector 将内部 `origin` 转换为自然标签：

| Internal origin | Public label |
| --- | --- |
| `REAL_SCREENSHOT` | 真实脱敏截图 |
| `RECONSTRUCTED_PROCESS_DIAGRAM` | 基于真实流程重新绘制 |
| `DEMO_DATA` | DEMO DATA · 匿名示例 |
| `PUBLIC_ARTIFACT` | 真实公开作品 |

Production UI 不暴露内部可见性、脱敏状态、source note 或 restricted fields。

为避免这些 raw governance 字符串仅因运行时过滤而进入浏览器 bundle，`scripts/generate-public-content.js` 在 dev / test / build 前生成公开快照；Production facade 只导入该快照。Raw Project / Claim / Evidence 仍是唯一 Source of Truth，不手工维护第二份事实。

## 3. Current evidence set

| Project | Real evidence | Reconstructed / demo evidence | Current judgment |
| --- | --- | --- | --- |
| EagleHub | 暂无可公开真实截图 | 系统概览、角色模型、变化闭环 | Case 可公开；数字仍为用户确认，不把图当 KPI 证明 |
| Onboarding Automation | 暂无可公开真实截图 | Before / After、规则路由、匿名 Dry-run Demo | Case 可公开为 Validated Prototype / Dry-run |
| Team Formation | 暂无可公开真实截图 | 约束图、组队流程 | Case 可公开；真实使用截图仍是高优先级缺口 |
| AI Content Growth | 2 张真实脱敏后台截图 | AI / Human 工作流 | 当前证据最完整；效率统计口径仍需补 |
| Eagle Training | 暂无公开活动或项目记录 | 运营协作链 | 继续作为 Experience Evidence，不升级为独立 Case |

详细映射见 [docs/evidence](./evidence/) 下五份项目清单。

## 4. Homepage evidence policy

- Start Here / Featured Work 只读取 Public Selector 返回的第一条公开安全视觉。
- EagleHub 与 Onboarding 当前使用重绘流程图，caption 必须明确其性质。
- AI Content Growth 优先使用真实脱敏截图。
- 首页只承担快速建立可信度；完整流程、边界和证据组合留在 Case Study。
- 无安全视觉时继续使用 neutral visual，不生成假 UI。

## 5. Case Study evidence pattern

共享 Case Study 依次支持：Context、Problem、Constraints、Contribution Boundary、Key Decisions、Outcome、Claims、Evidence 与 Reflection。字段缺失时不渲染。

建议阅读顺序：

```text
业务场景
→ 约束与问题
→ 本人负责 / 参与 / 不归因
→ 决策与流程
→ 真实截图、重绘流程或 Demo Data
→ 结果口径与证据缺口
→ 可由现有过程支持的反思
```

## 6. Capability evidence mapping

G5A 只准备数据，不实现交互图。当前映射覆盖：

- Product Framing
- Rule Structuring
- AI-assisted Workflow
- Project Operations
- Content & Growth
- Prototype to Evidence

映射复用同一 Project Source of Truth；Public selector 自动排除 Globridge、Digest 等未公开项目。

## 7. Evidence gaps that remain

- EagleHub：公开安全真实界面、迭代记录、本人实现范围的可展示材料。
- Onboarding：真实但脱敏的 Dry-run 输出、11 / 11 对应字段范围和测试条件。
- Team Formation：脱敏移动端页面、上线前交付或真实使用记录。
- Content Growth：2 万+、每周约 7 篇、2h → 20–30min 的统计周期与测量方式。
- Eagle Training：活动 / 运营记录及可公开的项目协作材料。

这些缺口不以假截图、模拟 KPI 或无来源口径补齐。
