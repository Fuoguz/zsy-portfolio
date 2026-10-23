import { AppLink } from "../components/navigation/AppLink.jsx";
import { FlowLine } from "../components/ledger/FlowLine.jsx";

export function NotFoundPage({ reason }) {
  const project = reason === "unknown-project";
  return (
    <main className="page page--status wrap" id="main-content">
      <p className="eyebrow">404 / {project ? "项目未公开" : "页面不存在"}</p>
      <h1 className="status-title">路由没有匹配到记录。</h1>
      <p className="status-lede">
        {project ? "这个项目当前没有公开页面，可能仍在脱敏或核对中。" : "这个地址不存在，或页面已经调整。"}
        可以从作品台账或首页继续浏览。
      </p>
      <div className="status-flow" aria-hidden="true">
        <FlowLine steps={["请求地址", "匹配路由", "未找到", "返回作品台账"]} />
      </div>
      <div className="status-actions">
        <AppLink to="/work" className="btn btn--ink">浏览全部作品 →</AppLink>
        <AppLink to="/" className="btn btn--line">返回首页</AppLink>
      </div>
    </main>
  );
}
