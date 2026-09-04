# ZSY Portfolio V2 — Redaction Guide

> 更新日期：2026-09-03  
> 适用范围：企业内部项目的截图、表格、流程图、导出结果、视频、文档与 Demo Data。

## 1. Never publish

- 员工姓名、工号、内部邮箱、电话、头像、通讯录；
- 部门成员关系、精确组织树、真实导师 / 学员对应关系；
- App ID、App Secret、Token、Table ID、Cookie、请求头；
- 内部 URL、域名、二维码、群号、文件路径；
- 未脱敏测试数据、导出表、日志和异常栈；
- 公司敏感源码、数据库结构、权限配置细节；
- 出生日期、手机号等个人隐私；
- 仍含敏感信息的旧 Resume PDF。

## 2. Internal asset handling

- 原始素材只放入仓库根目录 `internal-assets/`；该目录已加入 `.gitignore`。
- 禁止把原始素材复制到 `public/`、`src/assets/`、文档附件或构建产物。
- 脱敏输出必须生成新文件，不能覆盖原始文件后凭记忆判断。
- 每次公开前同时检查画面、文件名、EXIF / 元数据、链接目标与 SVG 文本。

## 3. Screenshot redaction checklist

1. 裁掉浏览器地址栏、内部导航、账号信息与通知区域。
2. 对姓名、工号、邮箱、电话、头像、部门、项目群和唯一标识做不可逆遮挡。
3. 检查 hover、tooltip、弹窗、图表标签、下载文件名与背景中的次要信息。
4. 不使用半透明模糊；应使用实色覆盖或重新裁切。
5. 缩略图和放大原图必须来自同一已审查文件。
6. 用 OCR / 文本扫描辅助检查，但最终仍需人工逐图确认。
7. 通过后标记 `REDACTED_APPROVED`，否则保持 `REDACTION_REQUIRED` 或 `RAW_INTERNAL`。

## 4. Reconstructed diagrams

- 只使用已确认的角色、步骤、约束、状态和结果口径。
- 图内与 caption 同时写明“基于真实流程重新绘制”。
- 不复制内部 UI 皮肤、表结构、组织名称或字段名。
- 不让流程图承担其不能证明的 KPI、上线状态或归因。
- 重要边界直接写入图中，例如“read-only”“不代表生产上线”“不含员工数据”。

## 5. Demo data

- 图内必须显著标注 `DEMO DATA · ANONYMOUS EXAMPLE`。
- 使用通用字段名与样例值，不模仿真实员工编码规则。
- 不使用真实姓名的变体、真实部门、真实日期或真实内部路径。
- Demo 只演示结构；与真实验证结果并列时，必须说明两者不是同一份记录。

## 6. Onboarding-specific guardrails

公开版本只允许表达：

- Validated Prototype / Dry-run；
- 花名册与业务数据读取、规则路由、字段 Diff、人工 Review / Export；
- 特定测试样本的目标字段曾达到 11 / 11 一致。

禁止表达：

- Fully Automated / Fully Shipped；
- 生产环境自动写入已经上线；
- 100% accuracy 或生产准确率；
- 真实人员、字段、路径、密钥、接口和源代码。

## 7. Release review

发布候选必须通过：内容 validation、公开 selector 泄漏测试、公开资源扫描、页面文本扫描、图片地址扫描和人工视觉检查。任何一项失败都阻止发布。
