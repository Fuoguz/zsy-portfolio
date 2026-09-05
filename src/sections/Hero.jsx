import { AppLink } from "../components/navigation/AppLink.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { PortfolioSignalVisual } from "../components/visual/PortfolioSignalVisual.jsx";
import { publicResumeHref } from "../utils/paths.js";
import { projectTitleZh } from "../utils/presentation.js";

export function Hero({ profile, proofs, featuredProject }) {
  const resumeHref = publicResumeHref(profile.resume);
  return (
    <section className="final-hybrid__hero-copy vo-home-hero" aria-labelledby="home-title">
      <div className="vo-home-hero__identity">
        <p className="final-hybrid__eyebrow">
          {profile.graduation.zh} · {profile.school} · {profile.major}
        </p>
        <p className="vo-home-hero__label">个人工作档案 / 产品运营 × AI</p>
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
        {featuredProject ? (
          <AppLink className="vo-home-hero__project" to={`/work/${featuredProject.slug}`}>
            <span className="vo-home-hero__project-kicker">当前重点项目 / 01</span>
            <strong>{projectTitleZh(featuredProject)}</strong>
            <span>{featuredProject.summary}</span>
            <span className="vo-home-hero__project-arrow" aria-hidden="true">↗</span>
          </AppLink>
        ) : null}
      </div>
      <div className="vo-home-hero__visual-column">
        <div className="vo-home-hero__visual-label"><span>01</span><strong>把问题变成下一步</strong><small>问题 / 判断 / 输出</small></div>
        <PortfolioSignalVisual variant="home" priority />
      </div>
      <div className="vo-hero__proofs" aria-label="关键工作证明">
        {proofs.map((proof, index) => (
          <article key={proof.id}>
            <span className="vo-proof__index">0{index + 1} / 关键证明</span>
            <strong>{proof.value}</strong>
            <span>{proof.label}</span>
            <small>{proof.publicCaption}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
