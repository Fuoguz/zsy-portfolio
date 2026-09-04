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
  return <main className="production-page production-loading" aria-live="polite">Loading…</main>;
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
