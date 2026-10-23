import { useState } from "react";

import { AppLink } from "../components/navigation/AppLink.jsx";
import { publicResumeHref } from "../utils/paths.js";

export function SiteFooter({ profile }) {
  const resumeHref = publicResumeHref(profile.resume);
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.contact.email}`;
    }
  };
  return (
    <footer className="footer" id="contact" aria-labelledby="contact-title">
      <div className="wrap footer__inner">
        <p className="eyebrow eyebrow--light">联系</p>
        <h2 id="contact-title" className="footer__title">流程、数据或协作上<br />有问题？<span>聊聊。</span></h2>
        <div className="footer__mail">
          <a href={`mailto:${profile.contact.email}`} className="footer__email">{profile.contact.email}</a>
          <button type="button" className="footer__copy" onClick={copyEmail} aria-live="polite">{copied ? "已复制 ✓" : "复制邮箱"}</button>
        </div>
        <nav className="footer__links" aria-label="简历与链接">
          <a href={resumeHref} download>下载简历 <span aria-hidden="true">PDF ↓</span></a>
          <a href={profile.publicLinks.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          <AppLink to="/work">全部项目 <span aria-hidden="true">→</span></AppLink>
          <AppLink to="/about">关于我 <span aria-hidden="true">→</span></AppLink>
        </nav>
        <div className="footer__base">
          <span>© {profile.name} · {profile.englishName}</span>
          <span>{profile.graduation.zh} · {profile.school} {profile.major}</span>
          <span>内部项目材料均已脱敏；流程图为基于真实流程的重绘，示例数据为匿名演示。</span>
        </div>
      </div>
    </footer>
  );
}
