import { AppLink } from "../components/navigation/AppLink.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { publicResumeHref } from "../utils/paths.js";

export function AboutContact({ profile }) {
  const resumeHref = publicResumeHref(profile.resume);
  return (
    <section className="production-about" id="about" aria-labelledby="about-title">
      <div>
        <span>关于 / 联系</span>
        <h2 id="about-title">了解我，<br /><em>欢迎联系。</em></h2>
      </div>
      <div>
        <p>我关注 AI 应用、产品与运营。可以查看我的教育背景、项目经历与公开简历，也可以通过邮件联系我。</p>
        <nav aria-label="Contact actions">
          <AppLink to="/about">关于我 <Arrow /></AppLink>
          <a href={`mailto:${profile.contact.email}`}>邮件 <Arrow /></a>
          <a href={resumeHref}>公开简历 <Arrow /></a>
        </nav>
      </div>
    </section>
  );
}
