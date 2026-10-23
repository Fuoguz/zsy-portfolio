import { AppLink } from "../components/navigation/AppLink.jsx";
import { Reveal } from "../components/ledger/Reveal.jsx";
import { getAboutPageContent, getPublicProject } from "../content/public.js";
import { pad } from "../utils/editorial.js";
import { publicResumeHref } from "../utils/paths.js";
import { projectTitleZh } from "../utils/presentation.js";

const { profile, experience } = getAboutPageContent();
const resumeHref = publicResumeHref(profile.resume);

// Which public cases grew out of each period. Facts live in the case pages.
const EXPERIENCE_DETAIL = {
  "transsion-talent-ops": {
    text: "参与约 400–500 人的雏鹰专项集训执行，参与搭建自由组队工具，主导人才培养平台的早期产品方案；之后承接新人入职、培养与转正相关的运营流程，并持续寻找可以自动化的环节。",
    slugs: ["eaglehub", "onboarding-automation", "team-formation-platform"],
  },
  "unicareer-content-ops": {
    text: "做财经与求职方向的内容运营，把选题、资料、结构、初稿与人工校验整理成可重复的 AI 辅助工作流。",
    slugs: ["ai-content-growth-workflow"],
  },
  "xintong-social-ops": {
    text: "",
    slugs: [],
  },
};

const PRINCIPLES = [
  { slug: "team-formation-platform", title: "先把规则定清楚，再做页面。" },
  { slug: "onboarding-automation", title: "先只读验证，再谈自动写入。" },
  { slug: "ai-content-growth-workflow", title: "AI 做可复用的部分，判断留给人。" },
  { slug: "globridge", title: "生成代码只是交付的一部分。" },
].map((item) => ({ ...item, project: getPublicProject(item.slug) })).filter((item) => item.project?.reflection);

export function AboutPage() {
  return (
    <main className="page page--about" id="main-content">
      <header className="about-hero wrap">
        <p className="eyebrow">关于 / About</p>
        <h1 className="about-hero__name">{profile.name}<span lang="en">{profile.englishName}</span></h1>
        <p className="about-hero__lede">我从内容运营起步，现在做项目与人才运营。工作里反复出现的问题，往往不是缺一个功能，而是流程、数据和协作没有对齐。我习惯先把规则理清楚，再借助原型和 AI 工具把它做出来、验证它。</p>
        <dl className="about-hero__facts">
          <div><dt>教育</dt><dd>{profile.school}<br />{profile.major} · {profile.graduation.zh}</dd></div>
          <div><dt>方向</dt><dd>{profile.primaryDirections.join(" / ")}</dd></div>
          <div><dt>联系</dt><dd><a href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a></dd></div>
        </dl>
        <div className="about-hero__actions">
          <a className="btn btn--ink" href={resumeHref} download>下载简历 <span aria-hidden="true">PDF ↓</span></a>
          <a className="btn btn--line" href={profile.publicLinks.github} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="about-path wrap" aria-labelledby="path-title">
        <header className="section-head">
          <p className="eyebrow">01 / 经历</p>
          <h2 id="path-title">从内容，到流程与工具</h2>
        </header>
        <ol className="timeline">
          {experience.map((item, index) => {
            const detail = EXPERIENCE_DETAIL[item.id];
            return (
              <Reveal as="li" key={item.id} delay={index * 0.06}>
                <time>{item.start} — {item.end === "Present" ? "至今" : item.end}</time>
                <div>
                  <h3>{item.publicLabel}<span>{item.role}</span></h3>
                  {detail?.text ? <p>{detail.text}</p> : null}
                  {detail?.slugs.length ? (
                    <p className="timeline__links">
                      {detail.slugs.map((slug) => getPublicProject(slug)).filter(Boolean).map((project) => (
                        <AppLink key={project.id} to={`/work/${project.slug}`}>{projectTitleZh(project)} →</AppLink>
                      ))}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
          <Reveal as="li" delay={0.2}>
            <time>项目</time>
            <div>
              <h3>Globridge 出海咨询官网<span>全栈开发</span></h3>
              <p>在已有代码上推进页面迭代、API 联调、问题排查与部署维护，并把已能独立运行的沙盘接入官网。</p>
              <p className="timeline__links"><AppLink to="/work/globridge">阅读案例 →</AppLink></p>
            </div>
          </Reveal>
        </ol>
      </section>

      <section className="about-method wrap" aria-labelledby="method-title">
        <header className="section-head">
          <p className="eyebrow">02 / 工作方式</p>
          <h2 id="method-title">四条从项目里得到的经验</h2>
          <p className="section-head__lede">下面的引文来自各案例的复盘，点进去可以看到它们发生的具体场景。</p>
        </header>
        <div className="principles">
          {PRINCIPLES.map((item, index) => (
            <Reveal as="article" className="principle" key={item.slug} delay={index * 0.06}>
              <span className="principle__no">{pad(index + 1)}</span>
              <h3>{item.title}</h3>
              <p>{item.project.reflection}</p>
              <AppLink to={`/work/${item.slug}`} className="text-link">{projectTitleZh(item.project)} →</AppLink>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
