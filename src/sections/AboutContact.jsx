import { AppLink } from "../components/navigation/AppLink.jsx";
import { Arrow } from "../components/ui/Arrow.jsx";
import { publicResumeHref } from "../utils/paths.js";

export function AboutContact({ profile }) {
  const resumeHref = publicResumeHref(profile.resume);
  return (
    <section className="production-about" id="about" aria-labelledby="about-title">
      <div>
        <span>关于 / 联系</span>
        <h2 id="about-title">把工作讲清楚，<br /><em>把证据边界守真实。</em></h2>
      </div>
      <div>
        <p>我关注 AI、产品与运营如何进入真实业务流程：先理解问题和协作边界，再把它转化为可以验证、交付和持续迭代的方案。</p>
        <nav aria-label="Contact actions">
          <AppLink to="/about">关于我 <Arrow /></AppLink>
          <a href={`mailto:${profile.contact.email}`}>邮件 <Arrow /></a>
          <a href={resumeHref}>公开简历 <Arrow /></a>
        </nav>
      </div>
    </section>
  );
}
