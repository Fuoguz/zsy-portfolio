import { AppLink } from "../components/navigation/AppLink.jsx";
import { WorkLedger } from "../components/ledger/WorkLedger.jsx";
import { LabCard } from "../sections/LabSection.jsx";
import { getPublicProjectSlugs, getRolePageContent } from "../content/public.js";

const caseStudySlugs = new Set(getPublicProjectSlugs());

const VIEWS = {
  product: {
    eyebrow: "岗位视角 / 产品与运营",
    title: "从业务规则，到可用的系统",
    lede: "适合产品运营、AI 产品方向的读者：需求怎样被拆成角色、规则与流程，又怎样被原型和试跑验证。",
  },
  growth: {
    eyebrow: "岗位视角 / 内容与增长",
    title: "稳定产出背后的内容流程",
    lede: "适合内容运营与增长方向的读者：选题判断、生产节奏，以及 AI 在流程里承担的那一部分。",
  },
  "ai-native": {
    eyebrow: "岗位视角 / AI 应用",
    title: "让 AI 进入真实交付",
    lede: "从代码理解、需求拆解到联调与上线：AI 辅助了什么，我又在哪里做判断和收口。",
  },
  creative: {
    eyebrow: "创意实验",
    title: "交互、影像与脚本练习",
    lede: "这些是工作之外的个人实验与模拟练习，与业务案例分开呈现；脚本草稿没有真实投放数据。",
  },
};

const OTHER_VIEWS = [
  ["/product", "产品与运营"],
  ["/ai-native", "AI 应用"],
  ["/growth", "内容与增长"],
  ["/creative", "创意实验"],
];

export function RoleViewPage({ mode }) {
  const view = getRolePageContent(mode);
  const copy = VIEWS[mode] ?? { eyebrow: view.eyebrow, title: view.title, lede: view.description };
  return (
    <main className="page page--role" id="main-content">
      <header className="page-head wrap">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="page-title">{copy.title}</h1>
        <p className="page-lede">{copy.lede}</p>
        <nav className="role-switch" aria-label="其他视角">
          {OTHER_VIEWS.map(([to, label]) => (
            <AppLink key={to} to={to} aria-current={to === `/${mode}` ? "page" : undefined}>{label}</AppLink>
          ))}
          <AppLink to="/work">全部作品 →</AppLink>
        </nav>
      </header>
      <div className="wrap">
        {mode === "creative" ? (
          <div className="lab__grid lab__grid--page">
            {view.projects.map((project, index) => <LabCard key={project.id} project={project} index={index} />)}
          </div>
        ) : (
          <WorkLedger
            groups={[{ id: "role", title: `${view.projects.length} 个相关项目`, note: "按与该视角的相关度排序；项目事实与其他页面完全一致。", projects: view.projects }]}
            caseStudySlugs={caseStudySlugs}
          />
        )}
      </div>
    </main>
  );
}
