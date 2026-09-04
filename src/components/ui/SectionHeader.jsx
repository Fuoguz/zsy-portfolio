import { Label } from "./Label.jsx";

export function SectionHeader({ label, title, description }) {
  return (
    <header className="ui-section-header">
      {label ? <Label>{label}</Label> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </header>
  );
}

