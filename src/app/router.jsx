import { Component, lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";

import { Navigation } from "../components/navigation/Navigation.jsx";
import { getHomePageContent, getPublicProject, getPublicProjectSlugs } from "../content/public.js";
import { HomePage } from "../pages/HomePage.jsx";
import { SiteFooter } from "../sections/SiteFooter.jsx";
import { applyRouteMetadata } from "../utils/metadata.js";
import { BASE_PATH, withBasePath } from "../utils/paths.js";
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
    <main id="main-content" className="page page--loading" aria-live="polite" aria-label="页面加载中">
      <div className="loading-line" aria-hidden="true"><i /></div>
      <p>正在载入…</p>
    </main>
  );
}

class PageErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main id="main-content" className="page page--status wrap" role="alert">
        <p className="eyebrow">ERROR / 页面未能加载</p>
        <h1 className="status-title">请再试一次。</h1>
        <p className="status-lede">网络连接或页面资源可能尚未就绪。</p>
        <div className="status-actions"><button type="button" className="btn btn--ink" onClick={() => window.location.reload()}>重新加载</button><a className="btn btn--line" href={withBasePath("/")}>返回首页</a></div>
      </main>
    );
  }
}

// Runs only after the lazy page commits, so cross-route anchors exist before scrolling.
function RouteReady({ route, previousPathRef }) {
  useLayoutEffect(() => {
    const pathname = window.location.pathname;
    const target = document.getElementById(window.location.hash.slice(1));
    const main = document.getElementById("main-content");
    if (pathname !== previousPathRef.current || target) {
      const focusTarget = target || main;
      focusTarget?.setAttribute("tabindex", "-1");
      focusTarget?.focus({ preventScroll: true });
    }
    previousPathRef.current = pathname;
    if (target) target.scrollIntoView({ behavior: "instant" });
    else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [route, previousPathRef]);
  return null;
}

function ProductionRoute({ route }) {
  if (route.id === "home") return <HomePage />;
  if (route.id === "work") return <WorkPage />;
  if (route.id === "project") return <ProjectPage slug={route.params.slug} />;
  if (["product", "growth", "creative", "ai-native"].includes(route.id)) return <RoleViewPage mode={route.id} />;
  if (route.id === "about") return <AboutPage />;
  return <NotFoundPage reason={route.reason} slug={route.params.slug} />;
}

export function AppRouter() {
  const [route, setRoute] = useState(getCurrentRoute);
  const previousPathRef = useRef(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => setRoute(getCurrentRoute());
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const project = route.id === "project" ? getPublicProject(route.params.slug) : null;
    applyRouteMetadata(route, project);
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
    <MotionConfig reducedMotion="user">
      <div className="shell" data-route={route.id}>
        <Navigation route={route} />
        <PageErrorBoundary key={`${route.id}/${route.params.slug || ""}`}>
          <Suspense fallback={<LoadingPage />}>
            <motion.div
              key={`${route.id}/${route.params.slug || ""}`}
              className="route-frame"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.1, 1] }}
            >
              <ProductionRoute route={route} />
            </motion.div>
            <RouteReady route={route} previousPathRef={previousPathRef} />
            <SiteFooter profile={getHomePageContent().profile} />
          </Suspense>
        </PageErrorBoundary>
      </div>
    </MotionConfig>
  );
}
