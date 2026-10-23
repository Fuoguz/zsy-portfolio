// A project's working sequence drawn as a signal line. Purely presentational:
// the steps come from editorial.js, which only restates recorded facts.
export function FlowLine({ steps = [], tone = "paper", label, animate = true }) {
  if (!steps.length) return null;
  return (
    <ol className={`flowline flowline--${tone}${animate ? " is-animated" : ""}`} aria-label={label}>
      {steps.map((step, index) => (
        <li key={step} style={{ "--i": index, "--n": steps.length }}>
          <span className="flowline__index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="flowline__node" aria-hidden="true" />
          <span className="flowline__label">{step}</span>
        </li>
      ))}
    </ol>
  );
}
