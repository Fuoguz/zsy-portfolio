import { stripBasePath } from "../utils/paths.js";

export const routeDefinitions = Object.freeze([
  { id: "home", path: "/", title: "Zhang Shaoyi — Product Operations & AI Portfolio", description: "张少毅的产品运营、项目运营、AI 应用与业务数字化作品集：真实项目、职责边界与公开证据。" },
  { id: "work", path: "/work", title: "Selected Work — Zhang Shaoyi", description: "浏览张少毅的真实业务项目、内部产品、AI 工作流与公开 Case Study。" },
  { id: "project", path: "/work/:slug", title: "Case Study — Zhang Shaoyi", description: "项目背景、问题、关键决策、贡献边界与公开证据。" },
  { id: "product", path: "/product", title: "AI Product & Product Ops — Zhang Shaoyi", description: "从业务规则到可验证产品方案的 AI Product 与 Product Operations 项目视图。" },
  { id: "growth", path: "/growth", title: "Content & Growth — Zhang Shaoyi", description: "真实内容运营、AI 工作流、业务规模与生产效率案例。" },
  { id: "creative", path: "/creative", title: "Creative Technology Lab — Zhang Shaoyi", description: "交互网页、影像与创意实验；与真实业务项目保持清晰分类。" },
  { id: "about", path: "/about", title: "About & Contact — Zhang Shaoyi", description: "张少毅的工作方式、经历、公开简历与联系方式。" },
  { id: "experiment", path: "/experiment/:experimentId", title: "Prototype — ZSY Portfolio", description: "Archived visual direction prototype." },
  { id: "not-found", path: "*", title: "Page not found — Zhang Shaoyi", description: "The requested portfolio page could not be found." },
]);

const definitionById = new Map(routeDefinitions.map((route) => [route.id, route]));
const normalizeRoutePath = (path) => {
  const withoutQuery = String(path || "/").split(/[?#]/, 1)[0];
  if (withoutQuery === "/") return "/";
  return withoutQuery.replace(/\/+$/, "") || "/";
};

const result = (id, extra = {}) => ({ ...definitionById.get(id), params: {}, ...extra });

export function resolveRoute(pathname, { basePath = "/", knownProjectSlugs = [] } = {}) {
  const path = normalizeRoutePath(stripBasePath(pathname, basePath));

  if (path === "/") return result("home");
  if (["/work", "/product", "/growth", "/creative", "/about"].includes(path)) {
    return result(path.slice(1));
  }

  const projectMatch = path.match(/^\/work\/([^/]+)$/);
  if (projectMatch) {
    const slug = decodeURIComponent(projectMatch[1]);
    if (knownProjectSlugs.length > 0 && !knownProjectSlugs.includes(slug)) {
      return result("not-found", { reason: "unknown-project", params: { slug } });
    }
    return result("project", { params: { slug } });
  }

  const experimentMatch = path.match(/^\/experiment\/(a|b|c|final)$/);
  if (experimentMatch) {
    return result("experiment", { params: { experimentId: experimentMatch[1] } });
  }

  return result("not-found", { reason: "unknown-route" });
}
