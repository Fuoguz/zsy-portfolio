import { stripBasePath } from "../utils/paths.js";

export const routeDefinitions = Object.freeze([
  { id: "ai-native", path: "/ai-native", title: "AI 应用与开发项目 — 张少毅", description: "从代码理解、需求拆解到联调与上线，查看 AI 辅助构建中的具体工作与人工判断。" },
  { id: "home", path: "/", title: "张少毅 — 产品运营、项目运营与 AI 应用作品集", description: "张少毅，2027 届本科毕业生。浏览企业人才培养平台、AI 内容工作流与网站交付案例，了解具体工作、方案取舍与结果。" },
  { id: "work", path: "/work", title: "项目作品 — 张少毅", description: "浏览张少毅的产品、运营与 AI 应用项目，以及交互网页、影像和广告脚本练习。" },
  { id: "project", path: "/work/:slug", title: "项目案例 — 张少毅", description: "项目背景、要解决的问题、我的工作、方案取舍与结果。" },
  { id: "product", path: "/product", title: "产品与运营项目 — 张少毅", description: "需求梳理、业务规则、流程协作与产品落地的具体案例。" },
  { id: "growth", path: "/growth", title: "内容与增长项目 — 张少毅", description: "内容策划、AI 辅助生产与效率改善的具体案例。" },
  { id: "creative", path: "/creative", title: "交互与影像实验 — 张少毅", description: "体验记忆博物馆、观看《照见痕迹》，阅读游戏广告脚本模拟草稿。" },
  { id: "about", path: "/about", title: "关于与联系 — 张少毅", description: "张少毅的教育背景、工作经历、公开简历与联系方式。" },
  { id: "experiment", path: "/experiment/:experimentId", title: "Prototype — ZSY Portfolio", description: "Archived visual direction prototype." },
  { id: "not-found", path: "*", title: "页面未找到 — 张少毅", description: "该内容当前没有公开页面，或请求的地址不存在。浏览全部项目或返回首页继续了解。" },
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
  if (["/work", "/product", "/growth", "/creative", "/about", "/ai-native"].includes(path)) {
    return result(path.slice(1));
  }

  const projectMatch = path.match(/^\/work\/([^/]+)$/);
  if (projectMatch) {
    let slug;
    try { slug = decodeURIComponent(projectMatch[1]); }
    catch { return result("not-found", { reason: "unknown-project" }); }
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
