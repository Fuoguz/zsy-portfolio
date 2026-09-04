import { AppLink } from "../components/navigation/AppLink.jsx";

export function NotFoundPage({ reason }) {
  return (
    <main className="production-route production-not-found" id="main-content">
      <p>404 / Not Found</p>
      <h1>{reason === "unknown-project" ? "Project not available." : "Page not found."}</h1>
      <span>该内容当前没有公开页面，或请求的地址不存在。</span>
      <AppLink to="/">Return home ↗</AppLink>
    </main>
  );
}
