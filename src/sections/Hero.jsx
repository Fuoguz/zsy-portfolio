import { AppLink } from "../components/navigation/AppLink.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { SystemVisual } from "../components/visual/SystemVisual.jsx";
import { publicResumeHref } from "../utils/paths.js";

export function Hero({ profile, proofs }) {
  const resumeHref = publicResumeHref(profile.resume);
  return (
    <section className="final-hybrid__hero-copy" aria-labelledby="home-title">
      <div className="vo-hero__identity">
        <p className="final-hybrid__eyebrow">
          {profile.graduation.zh} · {profile.school} · {profile.major}
        </p>
        <h1 id="home-title"><span>{profile.name}</span><small>{profile.englishName}</small></h1>
        <p className="final-hybrid__positioning">{profile.positioning}</p>
        <p className="final-hybrid__focus-line">
          {profile.primaryDirections.map((direction) => <span key={direction}>{direction}</span>)}
        </p>
        <div className="final-hybrid__actions" aria-label="主要操作">
          <AppLink className="final-hybrid__primary" to="/work">查看项目 <Arrow /></AppLink>
          <a href={resumeHref}>公开简历 <Arrow /></a>
          <a className="vo-hero__minor-action" href={profile.publicLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="vo-hero__minor-action" href={`mailto:${profile.contact.email}`}>联系</a>
        </div>
      </div>
      <SystemVisual variant="home" caption="工作方法抽象图 · 非项目证据" />
      <div className="vo-hero__proofs" aria-label="关键工作证明">
        {proofs.map((proof) => (
          <article key={proof.id}>
            <strong>{proof.value}</strong>
            <span>{proof.label}</span>
            <small>{proof.publicCaption}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
