export function CreativeDrafts({ drafts }) {
  if (!drafts) return null;
  return <section className="case-section" id="case-drafts" aria-labelledby="case-drafts-title">
    <header className="case-section__head">
      <p className="eyebrow">自主练习 · 模拟</p>
      <h2 id="case-drafts-title">开头与脚本草稿</h2>
    </header>
    <div className="case-section__body creative-drafts">
      <p className="creative-drafts__scope">{drafts.publicCaption}</p>
      <h3 className="label">前三秒开头</h3>
      <div className="creative-drafts__hooks">{drafts.hookGroups.map((group) => <div className="creative-drafts__group" key={group.category}>
        <h4>{group.category}<span>{group.hooks.length} 条</span></h4>
        <ol>{group.hooks.map(hook => <li key={hook}>“{hook}”</li>)}</ol>
      </div>)}</div>
      <h3 className="label">短视频脚本与画面节奏</h3>
      <div className="creative-drafts__scripts">{drafts.scripts.map((script, index) => <details key={script.title} open={index === 0}>
        <summary><span>{script.type}</span><strong>{script.title}</strong><i aria-hidden="true">+</i></summary>
        <div className="creative-drafts__script-body">
          <p><strong>呈现形式</strong>{script.format}</p>
          <ol>{script.beats.map(beat => {
            const split = beat.indexOf("：");
            return <li key={beat}><span>{split === -1 ? "" : beat.slice(0, split)}</span><p>{split === -1 ? beat : beat.slice(split + 1)}</p></li>;
          })}</ol>
          <p><strong>创意重点</strong>{script.note}</p>
        </div>
      </details>)}</div>
    </div>
  </section>;
}
