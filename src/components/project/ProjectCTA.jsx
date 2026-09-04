import { Button } from "../ui/Button.jsx";

export function ProjectCTA({ slug, children = "View case" }) {
  return <Button to={`/work/${slug}`}>{children} <span aria-hidden="true">↗</span></Button>;
}

