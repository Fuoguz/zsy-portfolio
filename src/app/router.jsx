import { lazy, Suspense, useEffect, useState } from "react";

import { Navigation } from "../components/navigation/Navigation.jsx";
import { getPublicProject, getPublicProjectSlugs } from "../content/public.js";
import { HomePage } from "../pages/HomePage.jsx";
import { applyRouteMetadata } from "../utils/metadata.js";
import { BASE_PATH } from "../utils/paths.js";
import { resolveRoute } from "./route-config.js";

const experimentPages = {
  a: lazy(() => import("../experiments/a/ProofroomPrototype.jsx")),
  b: lazy(() => import("../experiments/b/ProofCircuitPrototype.jsx")),
  c: lazy(() => import("../experiments/c/CutToOutcomePrototype.jsx")),
  final: lazy(() => import("../experiments/final/FinalHybridPrototype.jsx")),
};

const WorkPage = lazy(() => import("../pages/WorkPage.jsx").then((module) => ({ default: module.WorkPage })));
const ProjectPage = lazy(() => import("../pages/ProjectPage.jsx").then((module) => ({ default: module.ProjectPage })));
const RoleViewPage = lazy(() => import("../pages/RoleViewPage.jsx").then((module) => ({ default: module.RoleViewPage })));
const AboutPage = lazy(() => import("../pages/AboutPage.jsx").then((module) => ({ default: module.AboutPage })));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage.jsx").then((module) => ({ default: module.NotFoundPage })));

const publicProjectSlugs = getPublicProjectSlugs();

const getCurrentRoute = () => resolveRoute(window.location.pathname, {
  basePath: BASE_PATH,
  knownProjectSlugs: publicProjectSlugs,
});

function LoadingPage() {
  return (
    <main className="production-page production-loading" aria-live="polite" aria-label="页面加载中">
      <div className="production-loading__mark"><span>01</span><i /><b /></div>
      <p>正在整理工作档案</p>
      <small>加载页面与公开证据</small>
    </main>
  );
}

function ProductionRoute({ route }) {
  if (route.id === "home") return <HomePage />;
  if (route.id === "work") return <WorkPage />;
  if (route.id === "project") return <ProjectPage slug={route.params.slug} />;
  if (["product", "growth", "creative"].includes(route.id)) return <RoleViewPage mode={route.id} />;
  if (route.id === "about") return <AboutPage />;
  return <NotFoundPage reason={route.reason} slug={route.params.slug} />;
}

export function AppRouter() {
  const [route, setRoute] = useState(getCurrentRoute);

  useEffect(() => {
    const handleLocationChange = () => setRoute(getCurrentRoute());
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  useEffect(() => {
    const project = route.id === "project" ? getPublicProject(route.params.slug) : null;
    applyRouteMetadata(route, project);
    const targetId = window.location.hash.slice(1);
    if (targetId) {
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [route]);

  useEffect(() => {
    const preloadRoutes = () => {
      if (navigator.connection?.saveData) return;
      // Opportunistic requests must not turn offline navigation into an unhandled rejection.
      void Promise.allSettled([
        import("../pages/WorkPage.jsx"),
        import("../pages/AboutPage.jsx"),
        import("../pages/ProjectPage.jsx"),
      ]);
    };
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preloadRoutes, { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }
    const timeoutId = window.setTimeout(preloadRoutes, 800);
    return () => window.clearTimeout(timeoutId);
  }, []);

  if (route.id === "experiment") {
    const Experiment = experimentPages[route.params.experimentId];
    return (
      <Suspense fallback={<LoadingPage />}>
        <Experiment />
      </Suspense>
    );
  }

  return (
    <div className="production-shell">
      <Navigation />
      <Suspense fallback={<LoadingPage />}>
        <ProductionRoute route={route} />
      </Suspense>
    </div>
  );
}
