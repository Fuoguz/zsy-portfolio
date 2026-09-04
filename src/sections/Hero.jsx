import { AppLink } from "../components/navigation/AppLink.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { SystemVisual } from "../components/visual/SystemVisual.jsx";
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
        <p className="vo-home-hero__label">个人工作档案 / PRODUCT OPS × AI</p>
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
            <Arrow />
          </AppLink>
        ) : null}
      </div>
      <div className="vo-home-hero__visual-column">
        <div className="vo-home-hero__visual-label"><span>01</span><strong>把问题变成下一步</strong><small>PROCESS / SIGNAL / OUTCOME</small></div>
        <SystemVisual variant="home" slot="home-hero" caption="主视觉 · 抽象工作方法，不是项目证据" />
        <p className="vo-home-hero__visual-note">从业务问题、协作关系到可验证输出，视觉化呈现我的工作路径。</p>
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
