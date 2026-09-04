import { publicResumeHref } from "../utils/paths.js";

export function SiteFooter({ profile }) {
  const resumeHref = publicResumeHref(profile.resume);
  return (
    <footer className="final-hybrid__footer">
      <p>张少毅 / PORTFOLIO 2027</p>
      <h2>做出可用的工作，<br /><em>也展示其中的判断。</em></h2>
      <nav aria-label="Footer links">
        <a href={`mailto:${profile.contact.email}`}>邮件</a>
        <a href={resumeHref}>简历</a>
        <a href={profile.publicLinks.github} target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </footer>
  );
}
