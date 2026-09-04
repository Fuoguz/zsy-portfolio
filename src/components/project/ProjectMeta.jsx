import { formatDeliveryStatus } from "./project-labels.js";

export function ProjectMeta({ role, status }) {
  return (
    <dl className="project-meta">
      {role ? <div><dt>Role</dt><dd>{role}</dd></div> : null}
      {status ? <div><dt>Status</dt><dd>{formatDeliveryStatus(status)}</dd></div> : null}
    </dl>
  );
}
