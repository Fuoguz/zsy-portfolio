import { getAboutPageContent } from "../content/public.js";
import { PortfolioSignalVisual } from "../components/visual/PortfolioSignalVisual.jsx";
import { publicResumeHref } from "../utils/paths.js";

const { profile, experience } = getAboutPageContent();
const resumeHref = publicResumeHref(profile.resume);

export function AboutPage() {
  return (
    <main className="production-route production-about-page" id="main-content">
      <header className="production-route__hero production-route__hero--visual">
        <div className="production-route__hero-copy">
          <p>关于我 / {profile.name}</p>
          <h1>从业务问题出发，<br /><em>把协作组织成系统。</em></h1>
          <span>{profile.positioning}</span>
          <p className="portfolio-about-intro">先理解流程、角色和约束，再决定形成运营方案、产品原型，还是 AI 辅助工具。我的工作横跨内容、项目运营与产品实践。</p>
          <dl className="vo-route-stats">
            <div><dt>方向</dt><dd>产品 × 运营</dd></div>
            <div><dt>方法</dt><dd>证据优先</dd></div>
            <div><dt>状态</dt><dd>{profile.graduation.zh}</dd></div>
          </dl>
        </div>
        <PortfolioSignalVisual variant="about" priority />
      </header>
      <section className="production-about-page__method">
        <span>工作方法 / 方法</span>
        <h2>从业务问题开始，<br />用产品化思维组织协作。</h2>
        <p>我倾向先理解流程、角色、约束与真实证据，再决定应该形成运营方案、产品原型，还是 AI 辅助工具。跨内容、项目运营和创意技术的经历，让我能同时关注表达质量与落地细节。</p>
      </section>
      <section className="production-about-page__experience" aria-labelledby="about-experience-title">
        <header><span>经历 / 时间线</span><h2 id="about-experience-title">关键经历时间线</h2></header>
        <div>{experience.map((item) => (
          <article key={item.id}><h3>{item.publicLabel}</h3><p>{item.role}</p><time>{item.start} — {item.end === "Present" ? "至今" : item.end}</time></article>
        ))}</div>
      </section>
      <section className="production-about-page__contact">
        <h2>聊聊真实工作，<br />也聊下一步。</h2>
        <a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
        <a href={resumeHref}>公开简历</a>
        <a href={profile.publicLinks.github} target="_blank" rel="noreferrer">GitHub ↗</a>
      </section>
    </main>
  );
}
