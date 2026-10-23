import { useMemo, useState } from "react";

import {
  getCapabilityEvidenceMap,
  getHomeFeaturedProjects,
  getHomePageContent,
  getPublicProjectSlugs,
} from "../content/public.js";
import { Brief } from "../sections/Brief.jsx";
import { Hero } from "../sections/Hero.jsx";
import { LabSection } from "../sections/LabSection.jsx";
import { MoreWork } from "../sections/MoreWork.jsx";
import { SelectedWork } from "../sections/SelectedWork.jsx";

const home = getHomePageContent();
const capabilities = getCapabilityEvidenceMap();
const caseStudySlugs = new Set(getPublicProjectSlugs());

export function HomePage() {
  const [lensId, setLensId] = useState("all");
  const featured = useMemo(() => getHomeFeaturedProjects(lensId), [lensId]);

  return (
    <main id="main-content" className="page page--home">
      <Hero profile={home.profile} projects={home.featuredProjects} />
      <Brief proofs={home.quickProofs} experience={home.experience} capabilities={capabilities} />
      <SelectedWork
        projects={featured}
        lenses={home.roleLenses}
        lensId={lensId}
        onLens={setLensId}
        total={home.allProjects.length}
      />
      <MoreWork projects={home.supportingProjects} caseStudySlugs={caseStudySlugs} />
      <LabSection projects={home.labProjects} />
    </main>
  );
}
