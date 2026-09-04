const VARIANTS = Object.freeze({
  home: {
    kicker: "WORK / SIGNAL / OUTCOME",
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
    kicker: "RELATION / PERMISSION / LOOP",
    title: "多角色人才培养系统",
    nodes: ["学员", "导师", "运营", "培养闭环"],
  },
  "onboarding-automation": {
    kicker: "BRANCH / ROUTE / REVIEW",
    title: "可检查的入职规则链路",
    nodes: ["规则输入", "人员路由", "人工复核", "安全输出"],
  },
  "ai-content-growth-workflow": {
    kicker: "EDIT / PUBLISH / LEARN",
    title: "AI 辅助与人工判断的内容循环",
    nodes: ["选题", "资料", "编辑判断", "发布复盘"],
  },
  "team-formation-platform": {
    kicker: "PEOPLE / GROUP / CONSTRAINT",
    title: "规模化组队与规则校验",
    nodes: ["成员", "队伍", "约束", "异常处理"],
  },
});

const FALLBACK = {
  kicker: "SYSTEM / PRACTICE",
  title: "从创意假设到公开作品",
  nodes: ["输入", "结构", "表达", "输出"],
};

function NetworkGrammar({ content }) {
  return (
    <g className="system-visual__grammar system-visual__grammar--network">
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
    </g>
  );
}

function BranchingGrammar({ content }) {
  return (
    <g className="system-visual__grammar system-visual__grammar--branching">
      <path className="system-visual__branch-line is-primary" pathLength="1" d="M84 260 H240 L356 112 M240 260 H356 M240 260 L356 408" />
      <path className="system-visual__branch-line" pathLength="1" d="M356 112 H620 M356 260 H620 M356 408 H620" />
      <rect className="system-visual__branch-card is-input" x="46" y="206" width="126" height="108" rx="4" />
      <rect className="system-visual__branch-card is-decision" x="204" y="224" width="72" height="72" transform="rotate(45 240 260)" />
      <rect className="system-visual__branch-card" x="488" y="70" width="148" height="84" rx="4" />
      <rect className="system-visual__branch-card" x="488" y="218" width="148" height="84" rx="4" />
      <rect className="system-visual__branch-card" x="488" y="366" width="148" height="84" rx="4" />
      <circle className="system-visual__core" cx="84" cy="260" r="10" />
      <circle className="system-visual__core" cx="240" cy="260" r="14" />
      <text className="system-visual__branch-label" x="62" y="238">01</text>
      <text className="system-visual__branch-label" x="62" y="278">{content.nodes[0]}</text>
      <text className="system-visual__branch-label" x="362" y="102">IF / THEN</text>
      <text className="system-visual__branch-label" x="512" y="105">02 · {content.nodes[1]}</text>
      <text className="system-visual__branch-label" x="512" y="253">03 · {content.nodes[2]}</text>
      <text className="system-visual__branch-label" x="512" y="401">04 · {content.nodes[3]}</text>
      <text className="system-visual__branch-note" x="512" y="128">可追溯路由</text>
      <text className="system-visual__branch-note" x="512" y="276">先读 / 再审</text>
      <text className="system-visual__branch-note" x="512" y="424">不写入生产</text>
    </g>
  );
}

function GrowthGrammar({ content }) {
  return (
    <g className="system-visual__grammar system-visual__grammar--growth">
      <path className="system-visual__growth-baseline" d="M72 432 H650" />
      <path className="system-visual__growth-curve is-primary" pathLength="1" d="M74 368 C164 356 170 248 254 276 S358 360 432 214 S548 190 648 88" />
      <path className="system-visual__growth-curve" pathLength="1" d="M74 388 C184 390 220 326 304 348 S446 330 526 238 S602 184 648 168" />
      <g className="system-visual__growth-bars">
        <rect x="74" y="312" width="42" height="120" />
        <rect x="134" y="274" width="42" height="158" />
        <rect x="194" y="334" width="42" height="98" />
        <rect x="254" y="230" width="42" height="202" />
        <rect x="314" y="288" width="42" height="144" />
        <rect x="374" y="196" width="42" height="236" />
      </g>
      <circle className="system-visual__core" cx="74" cy="368" r="9" />
      <circle className="system-visual__core" cx="648" cy="88" r="12" />
      <text className="system-visual__growth-label" x="72" y="60">内容节奏 / 生产循环</text>
      <text className="system-visual__growth-label" x="72" y="104">01 · {content.nodes[0]}</text>
      <text className="system-visual__growth-label" x="224" y="104">02 · {content.nodes[1]}</text>
      <text className="system-visual__growth-label" x="376" y="104">03 · {content.nodes[2]}</text>
      <text className="system-visual__growth-label" x="528" y="104">04 · {content.nodes[3]}</text>
      <text className="system-visual__growth-note" x="526" y="148">反馈让下一轮更快</text>
    </g>
  );
}

function TeamGrammar({ content }) {
  return (
    <g className="system-visual__grammar system-visual__grammar--team">
      <rect className="system-visual__team-zone" x="56" y="86" width="250" height="344" rx="6" />
      <rect className="system-visual__team-zone is-group" x="356" y="86" width="292" height="154" rx="6" />
      <rect className="system-visual__team-zone is-group" x="356" y="276" width="292" height="154" rx="6" />
      <path className="system-visual__team-rule" d="M306 170 H356 M306 345 H356" />
      <circle className="system-visual__core" cx="116" cy="144" r="10" />
      <circle className="system-visual__core" cx="196" cy="144" r="10" />
      <circle className="system-visual__core" cx="116" cy="224" r="10" />
      <circle className="system-visual__core" cx="196" cy="224" r="10" />
      <circle className="system-visual__core" cx="116" cy="304" r="10" />
      <circle className="system-visual__core" cx="196" cy="304" r="10" />
      <circle className="system-visual__core" cx="116" cy="384" r="10" />
      <circle className="system-visual__core" cx="196" cy="384" r="10" />
      <path className="system-visual__team-grid" d="M356 170 H648 M356 360 H648" />
      <text className="system-visual__team-label" x="76" y="116">01 · {content.nodes[0]}</text>
      <text className="system-visual__team-label" x="376" y="116">02 · {content.nodes[1]}</text>
      <text className="system-visual__team-label" x="376" y="306">03 · {content.nodes[2]}</text>
      <text className="system-visual__team-note" x="376" y="210">人数 / 班级 / 移动端</text>
      <text className="system-visual__team-note" x="376" y="400">04 · {content.nodes[3]}</text>
    </g>
  );
}

function renderGrammar(variant, content) {
  if (variant === "onboarding-automation") return <BranchingGrammar content={content} />;
  if (variant === "ai-content-growth-workflow") return <GrowthGrammar content={content} />;
  if (variant === "team-formation-platform") return <TeamGrammar content={content} />;
  return <NetworkGrammar content={content} />;
}

export function SystemVisual({ variant = "home", slot = "project-cover", caption = "抽象系统图 · 非项目证据" }) {
  const content = VARIANTS[variant] || FALLBACK;

  return (
    <figure className="system-visual" data-variant={variant} data-asset-slot={slot}>
      <svg viewBox="0 0 720 520" role="img" aria-label={content.title}>
        <title>{content.title}</title>
        <rect className="system-visual__frame" x="1" y="1" width="718" height="518" />
        {renderGrammar(variant, content)}
        <text className="system-visual__kicker" x="34" y="38">{content.kicker}</text>
        <text className="system-visual__axis" x="686" y="38" textAnchor="end">ABSTRACT / NOT EVIDENCE</text>
      </svg>
      <figcaption><span>{caption}</span><small>PROCEDURAL VECTOR / NOT EVIDENCE</small></figcaption>
    </figure>
  );
}
