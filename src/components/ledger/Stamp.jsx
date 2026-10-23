import { formatDeliveryStatus, formatProjectClassification } from "../project/project-labels.js";

const DELIVERY_TONES = Object.freeze({
  SHIPPED: "ok",
  ACTIVE: "ok",
  VALIDATED_PROTOTYPE: "signal",
  PROTOTYPE: "muted",
  EXPERIMENT: "muted",
  SIMULATION: "dashed",
});

export function Stamp({ children, tone = "ink" }) {
  return <span className={`stamp stamp--${tone}`}>{children}</span>;
}

export function ProjectStamps({ project }) {
  const kind = formatProjectClassification(project.classification);
  const status = formatDeliveryStatus(project.deliveryStatus);
  return (
    <span className="stamps">
      <Stamp tone={project.classification.includes("SIMULATION") ? "dashed" : "ink"}>{kind}</Stamp>
      {status !== kind ? <Stamp tone={DELIVERY_TONES[project.deliveryStatus] ?? "muted"}>{status}</Stamp> : null}
    </span>
  );
}

const PROVENANCE_TONES = [
  ["真实脱敏截图", "ok"],
  ["真实公开作品", "ok"],
  ["DEMO DATA", "dashed"],
  ["重新绘制", "signal"],
];

export function ProvenanceStamp({ label }) {
  if (!label) return null;
  const tone = PROVENANCE_TONES.find(([needle]) => label.includes(needle))?.[1] ?? "ink";
  return <Stamp tone={tone}>{label}</Stamp>;
}
