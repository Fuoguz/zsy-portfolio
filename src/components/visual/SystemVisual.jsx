const VARIANTS = Object.freeze({
  home: {
    kicker: "BUSINESS → SYSTEM",
    title: "把模糊问题组织成可验证的工作系统",
    nodes: ["业务问题", "规则结构", "协作节点", "公开证据"],
  },
  work: {
    kicker: "PROJECT ATLAS / 07",
    title: "项目、决策与证据的公开索引",
    nodes: ["真实业务", "产品框架", "运营流程", "创意实验"],
  },
  about: {
    kicker: "WORKING METHOD",
    title: "观察、拆解、验证、交付",
    nodes: ["流程", "角色", "约束", "结果"],
  },
  role: {
    kicker: "ROLE LENS",
    title: "同一组事实，不同的阅读入口",
    nodes: ["AI 产品", "产品运营", "项目运营", "增长"],
  },
  eaglehub: {
    kicker: "SYSTEM / TALENT OPS",
    title: "多角色人才培养系统",
    nodes: ["学员", "导师", "运营", "培养闭环"],
  },
  "onboarding-automation": {
    kicker: "SYSTEM / AUTOMATION",
    title: "可检查的入职规则链路",
    nodes: ["规则输入", "只读执行", "逐字段 Diff", "人工复核"],
  },
  "ai-content-growth-workflow": {
    kicker: "SYSTEM / CONTENT",
    title: "AI 辅助与人工判断的内容循环",
    nodes: ["选题", "生成", "编辑判断", "发布复盘"],
  },
  "team-formation-platform": {
    kicker: "SYSTEM / COORDINATION",
    title: "规模化组队与规则校验",
    nodes: ["成员", "队伍", "约束", "异常处理"],
  },
});

const FALLBACK = {
  kicker: "SYSTEM / PRACTICE",
  title: "从创意假设到公开作品",
  nodes: ["输入", "结构", "表达", "输出"],
};

export function SystemVisual({ variant = "home", caption = "抽象系统图 · 非项目证据" }) {
  const content = VARIANTS[variant] || FALLBACK;

  return (
    <figure className="system-visual" data-variant={variant}>
      <svg viewBox="0 0 720 520" role="img" aria-label={content.title}>
        <rect className="system-visual__frame" x="1" y="1" width="718" height="518" />
        <path className="system-visual__path is-primary" pathLength="1" d="M84 128 H268 C315 128 310 260 360 260 H614" />
        <path className="system-visual__path" pathLength="1" d="M84 392 H244 C305 392 298 260 360 260" />
        <path className="system-visual__path" pathLength="1" d="M360 260 C420 260 416 116 486 116 H614" />
        <path className="system-visual__path is-dashed" pathLength="1" d="M360 260 C424 260 426 402 496 402 H614" />

        <g className="system-visual__node" transform="translate(84 128)">
          <circle r="42" /><circle className="system-visual__core" r="9" />
          <text x="0" y="72" textAnchor="middle">01 · {content.nodes[0]}</text>
        </g>
        <g className="system-visual__node" transform="translate(84 392)">
          <rect x="-42" y="-42" width="84" height="84" />
          <circle className="system-visual__core" r="9" />
          <text x="0" y="72" textAnchor="middle">02 · {content.nodes[1]}</text>
        </g>
        <g className="system-visual__node is-hub" transform="translate(360 260)">
          <circle r="66" /><circle className="system-visual__core" r="15" />
          <text x="0" y="98" textAnchor="middle">03 · {content.nodes[2]}</text>
        </g>
        <g className="system-visual__node" transform="translate(614 116)">
          <rect x="-42" y="-42" width="84" height="84" />
          <circle className="system-visual__core" r="9" />
        </g>
        <g className="system-visual__node" transform="translate(614 402)">
          <circle r="42" /><circle className="system-visual__core" r="9" />
          <text x="0" y="72" textAnchor="middle">04 · {content.nodes[3]}</text>
        </g>

        <text className="system-visual__kicker" x="34" y="38">{content.kicker}</text>
        <text className="system-visual__axis" x="686" y="38" textAnchor="end">INPUT / DECISION / PROOF</text>
      </svg>
      <figcaption><span>{caption}</span><small>PROCEDURAL VECTOR / NOT EVIDENCE</small></figcaption>
    </figure>
  );
}
