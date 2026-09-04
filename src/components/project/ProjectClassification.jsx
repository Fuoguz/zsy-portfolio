import { formatProjectClassification } from "./project-labels.js";

export function ProjectClassification({ values }) {
  return <span className="project-classification">{formatProjectClassification(values)}</span>;
}
