import { useMemo, useState } from "react";

import {
  getHomePageContent,
  getPublicProjectSlugs,
  getRoleViewContent,
} from "../content/public.js";
import { AboutContact } from "../sections/AboutContact.jsx";
import { Experience } from "../sections/Experience.jsx";
import { FeaturedWork } from "../sections/FeaturedWork.jsx";
import { Hero } from "../sections/Hero.jsx";
import { LabSection } from "../sections/LabSection.jsx";
import { RoleLens } from "../sections/RoleLens.jsx";
import { SiteFooter } from "../sections/SiteFooter.jsx";
import { StartHere } from "../sections/StartHere.jsx";
import { SupportingWork } from "../sections/SupportingWork.jsx";

const home = getHomePageContent();
const caseStudySlugs = new Set(getPublicProjectSlugs());

export function HomePage() {
  const [activeLens, setActiveLens] = useState(
    home.roleLenses.find((lens) => lens.id === "aiProduct") ?? home.roleLenses[0],
  );
  const [activeStart, setActiveStart] = useState(home.startProjects[0]);
  const recommendedProjects = useMemo(
    () => getRoleViewContent(activeLens.id).projects,
    [activeLens.id],
  );
  const recommendedIds = useMemo(
    () => new Set(recommendedProjects.map((project) => project.id)),
    [recommendedProjects],
  );

  return (
    <>
      <main id="main-content">
        <section className="final-hybrid__hero">
          <Hero
            profile={home.profile}
            proofs={home.quickProofs}
            featuredProject={home.startProjects[0]}
          />
        </section>
        <section className="vo-start-shell" aria-label="精选项目入口">
          <StartHere
            projects={home.startProjects}
            activeProject={activeStart}
            recommendedIds={recommendedIds}
            onSelect={setActiveStart}
          />
        </section>
        <RoleLens
          lenses={home.roleLenses}
          activeLens={activeLens}
          onSelect={setActiveLens}
          recommendedProjects={recommendedProjects}
        />
        <FeaturedWork
          projects={home.featuredProjects}
          activeLens={activeLens}
          recommendedIds={recommendedIds}
        />
        <Experience items={home.experience} />
        <SupportingWork projects={home.supportingProjects} caseStudySlugs={caseStudySlugs} />
        <LabSection projects={home.labProjects} />
        <AboutContact profile={home.profile} />
      </main>
      <SiteFooter profile={home.profile} />
    </>
  );
}
