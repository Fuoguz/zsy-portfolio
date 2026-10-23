// Editorial layer for the public site. Every line here is a compression of facts
// already recorded in src/data and docs/CONTENT_SOURCE_OF_TRUTH.md — no new claims.

const EDITORIAL = Object.freeze({
  eaglehub: {
    kicker: "多角色产品 · 人才培养",
    headline: "师徒、部门、权限一起变化时，系统也要说得通。",
    problem: "导师变更、部门层级调整时，学员、导师和 HRBP 看到的信息与可做的操作必须保持一致。",
    move: "先分角色梳理“看什么、做什么”，再把师徒关系、部门层级与权限放进同一框架。",
    result: "功能框架后续用于约 480 对师徒、约 6 个月的培养场景。",
    flow: ["三类角色", "权限与部门", "师徒关系", "培养计划", "进度同步"],
    flowNote: "早期方案与核心框架由我主导；后续正式系统开发不归为我的独立成果。",
  },
  "onboarding-automation": {
    kicker: "规则结构化 · 入职流程",
    headline: "先只读，再 Diff，最后交给人复核。",
    problem: "花名册、人员类型、导航路径和已有记录之间，存在大量重复的人工核对。",
    move: "按职级与员工类型路由，逐字段比对已有记录，把差异交给人工复核；不直接写入生产。",
    result: "Dry-run 测试样本中，目标字段 11 / 11 一致。",
    flow: ["读取花名册", "人员解析", "职级 / 类型路由", "逐字段 Diff", "人工复核 / 导出"],
    flowNote: "已验证原型 · 只读试跑；11 / 11 不代表生产准确率。",
  },
  "ai-content-growth-workflow": {
    kicker: "内容运营 · AI 工作流",
    headline: "一篇内容拆成五步：AI 负责发散，人负责收口。",
    problem: "高频更新、选题质量与生产效率需要同时成立。",
    move: "把选题、资料、结构、初稿与校验拆成独立步骤；Claude + Gemini 辅助，判断与终稿由人负责。",
    result: "单篇约 2 小时缩短到 20–30 分钟，长期保持每周约 7 篇。",
    flow: ["选题分析", "资料整理", "内容结构", "AI 初稿", "人工校验"],
    flowNote: "约 55 万是账号总规模，不归因为我的增长成果。",
  },
  globridge: {
    kicker: "全栈交付 · AI 辅助开发",
    headline: "交接不完整，就保留能用的后端，把沙盘接进官网。",
    problem: "沙盘已能独立运行，但原站的服务器部署、Nginx 与构建方式交接信息并不完整。",
    move: "比较三种方案后，保留已验证的 CloudBase 后端，以独立模块接入，并在接入前逐项核对。",
    result: "官网已上线；我参与代码理解、页面迭代、API 联调、问题排查与部署维护。",
    flow: ["接手", "理解", "拆解", "构建", "联调", "调试", "上线"],
    flowNote: "在已有代码上迭代；官网业务数字与客户案例不归因于我。",
  },
  "team-formation-platform": {
    kicker: "内部工具 · 大型集训",
    headline: "约 400–500 人、5 个班级，在手机上完成自由组队。",
    problem: "大规模学员需要在班级、队伍人数和移动端操作的约束下完成组队。",
    move: "先把班级与人数规则定清楚，再搭信息卡片、建队 / 入队和数据匹配。",
    result: "平台在集训开始前投入使用。",
    flow: ["班级规则", "信息卡片", "建队 / 入队", "人数校验", "数据匹配"],
    flowNote: "每班约 90 人，每队约 10–12 人。",
  },
  "eagle-training-operations": {
    kicker: "项目运营 · 新人培养",
    headline: "约 400–500 人、5 个班级的集训，靠一条连续的协作链落地。",
    problem: "线上信息与线下执行需要连续衔接。",
    move: "参与人员信息、学员沟通、现场执行、测试问卷、数据统计、项目收尾与数字化工具支持。",
    result: "作为团队项目的一员参与执行；不独立负责全部项目。",
    flow: ["人员信息", "学员沟通", "现场执行", "问卷与数据", "项目收尾"],
    flowNote: "团队项目，我的工作是其中的运营支持。",
  },
  "memory-museum": {
    kicker: "交互网页 · 实验",
    headline: "从一个童年片段开始，走进一座个人记忆展厅。",
  },
  "video-motion": {
    kicker: "影像 · 创意练习",
    headline: "从构思、素材到剪辑与后期的一部完整短片。",
  },
  "game-ads-simulation": {
    kicker: "脚本模拟 · 无投放数据",
    headline: "前三秒的冲突，怎样变成可以拍的画面。",
  },
});

export function editorialFor(project) {
  return EDITORIAL[project?.slug] ?? {};
}

export const LENS_LABELS = Object.freeze({
  all: "全部",
  aiProduct: "AI 产品",
  productOps: "产品运营",
  projectOps: "项目运营",
  growth: "内容增长",
  aiNative: "AI 原生",
});

export const lensLabel = (id) => LENS_LABELS[id] ?? id;

export const pad = (value) => String(value).padStart(2, "0");

export const CAPABILITY_LABELS = Object.freeze({
  "Full-stack Delivery": "网站开发与交付",
  "Product Framing": "把多角色问题整理成产品框架",
  "Rule Structuring": "把人工判断变成可验证的规则",
  "AI-assisted Workflow": "让 AI 进入流程，人负责收口",
  "Project Operations": "在规模与期限下推进执行",
  "Content & Growth": "内容判断与生产节奏",
  "Prototype to Evidence": "用原型和试跑检验想法",
});
