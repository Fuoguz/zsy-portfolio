export function QuickProof({ proofs }) {
  return (
    <section className="final-hybrid__quick-proof" aria-label="Quick proof">
      <p><span>Quick proof</span> Range across real work.</p>
      {proofs.map((proof) => (
        <article className={proof.value.length > 10 ? "is-long" : ""} key={proof.id}>
          <strong>{proof.value}</strong>
          <span>{proof.label}</span>
          <small>{proof.publicCaption}</small>
        </article>
      ))}
    </section>
  );
}
