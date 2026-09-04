export function Experience({ items }) {
  return (
    <section className="production-experience" id="experience" aria-labelledby="experience-title">
      <header><span>经历 / EXPERIENCE</span><h2 id="experience-title">跨越内容、运营，<br /><em>并进入 AI 产品实践。</em></h2></header>
      <div className="production-experience__list">
        {items.map((item) => (
          <article key={item.id}>
            <h3>{item.publicLabel}</h3>
            <p>{item.role}</p>
            <time>{item.start} — {item.end === "Present" ? "至今" : item.end}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
