import { AppLink } from "../components/navigation/AppLink.jsx";
import { Reveal } from "../components/ledger/Reveal.jsx";
import { Stamp } from "../components/ledger/Stamp.jsx";
import { claimKindLabel } from "../utils/claim-presentation.js";
import { projectTitleZh } from "../utils/presentation.js";
import { CAPABILITY_LABELS } from "../utils/editorial.js";

const SHOWN_CAPABILITIES = ["product-framing", "rule-structuring", "ai-assisted-workflow", "project-operations", "full-stack-delivery"];

export function Brief({ proofs, experience, capabilities }) {
  const shown = SHOWN_CAPABILITIES.map((id) => capabilities.find((item) => item.id === id)).filter(Boolean);
  return (
    <section className="brief wrap" id="brief" aria-labelledby="brief-title">
      <header className="section-head">
        <p className="eyebrow">00 / 速读</p>
        <h2 id="brief-title">30 秒了解我</h2>
        <p className="section-head__lede">2027 届本科生，两年内容运营，目前在企业里做项目与人才运营，同时参与内部产品、流程自动化和网站交付。</p>
      </header>

      <div className="brief__grid">
        <Reveal className="brief__block brief__numbers">
          <h3 className="label">关键数字 <small>均附口径说明</small></h3>
          <ul>
            {proofs.map((proof) => (
              <li key={proof.id}>
                <strong>{proof.value}</strong>
                <span>{proof.label}</span>
                <small><Stamp tone="muted">{claimKindLabel(proof.kind)}</Stamp>{proof.publicCaption}</small>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="brief__block brief__timeline" delay={0.08}>
          <h3 className="label">经历</h3>
          <ol>
            {experience.map((item) => (
              <li key={item.id}>
                <time>{item.start} — {item.end === "Present" ? "至今" : item.end}</time>
                <strong>{item.publicLabel}</strong>
                <span>{item.role}</span>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="brief__block brief__skills" delay={0.16}>
          <h3 className="label">我擅长解决的问题</h3>
          <ul>
            {shown.map((capability) => (
              <li key={capability.id}>
                <strong>{CAPABILITY_LABELS[capability.label] ?? capability.label}</strong>
                <span>
                  {capability.projects.slice(0, 3).map((project) => (
                    <AppLink key={project.id} to={`/work/${project.slug}`}>{projectTitleZh(project)}</AppLink>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
