export function NeutralProjectVisual({ project, compact = false }) {
  return (
    <div className={`final-hybrid__neutral-evidence${compact ? " is-compact" : ""}`}>
      <span>Public case summary</span>
      <strong>{project.shortTitle}</strong>
      <p>{project.summary}</p>
      <small>Internal interface intentionally omitted</small>
    </div>
  );
}
