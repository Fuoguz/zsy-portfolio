import { ProjectIndexItem } from "./ProjectIndexItem.jsx";

export function ProjectCollection({ label, title, projects, variant, caseStudySlugs }) {
  if (!projects.length) return null;
  return (
    <section className={`production-collection is-${variant}`}>
      <header><span>{label}</span><h2>{title}</h2></header>
      <div className="production-collection__items">
        {projects.map((project, index) => (
          <ProjectIndexItem
            key={project.id}
            project={project}
            variant={variant}
            linkable={caseStudySlugs.has(project.slug)}
            index={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
