import { useCallback, useEffect, useRef, useState } from 'react';
import { AppLink } from '../navigation/AppLink.jsx';
import { assetPath, publicResumeHref } from '../../utils/paths.js';

const chapters = [
  { id: 'hero', label: '工作室全景', en: '个人简介 / PORTFOLIO', description: '我参与过企业人才培养平台、AI 内容工作流和公开网站交付，工作包括需求梳理、运营流程与 AI 辅助构建。', link: '/#work', cta: '查看代表项目', note: '把复杂问题，做成可用的系统。' },
  { id: 'eagle', label: '产品与系统', en: '01 / EAGLE HUB', title: <>让人才培养，<br />有一套清晰的<span>路径。</span></>, description: '从 Mentor、Trainee 到 OJT Plan，把培养流程和数据关系组织成可操作的产品。', link: '/work/eaglehub', cta: '查看 Eagle Hub 案例', note: 'Mentor → Trainee → OJT Plan' },
  { id: 'automation', label: '流程自动化', en: '02 / AUTOMATION', title: <>少一点重复，<br />多一点有效<span>协作。</span></>, description: '梳理新人入职过程中的名单、规则与消息路由，让重复执行的步骤变成可复用的流程。', link: '/work/onboarding-automation', cta: '查看自动化案例', note: 'Roster → Rules → Routing → Welcome' },
  { id: 'build', label: '原型与构建', en: '03 / BUILD & PROTOTYPE', title: <>让一个想法，<br />成为可以体验的<span>原型。</span></>, description: '用 React、AI 与代码把思路做出来，再通过真实交互验证它。这间工作室，也是一次从想法到体验的构建。', link: '/work', cta: '查看项目与实验', note: 'React / AI / Codex / Three.js' },
];

export function SystemRoomExperience({ profile }) {
  const canvasHost = useRef(null), engine = useRef(null), progress = useRef(0), selectRef = useRef(null);
  const [active, setActive] = useState(0), [enabled, setEnabled] = useState(false), [status, setStatus] = useState('poster'), [failed, setFailed] = useState(false);
  const chapter = chapters[active];
  const select = useCallback((index) => {
    progress.current = index; engine.current?.setProgress(index); setActive(index);
  }, []);
  useEffect(() => { selectRef.current = select; }, [select]);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false, instance;
    import('./systemRoomRenderer.js').then(({ createSystemRoom }) => {
      if (cancelled || !canvasHost.current) return;
      setStatus('loading');
      instance = createSystemRoom(canvasHost.current, assetPath('models/system-room.glb'), {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        onReady: () => { if (!cancelled) { setStatus('ready'); setFailed(false); } },
        onError: () => { if (!cancelled) { setFailed(true); setEnabled(false); setStatus('poster'); } },
        onSelect: index => selectRef.current?.(index),
      });
      engine.current = instance; instance.setProgress(progress.current);
    }).catch(() => { if (!cancelled) { setFailed(true); setEnabled(false); setStatus('poster'); } });
    return () => { cancelled = true; instance?.dispose(); engine.current = null; };
  }, [enabled]);
  const toggle = () => { setFailed(false); setStatus(enabled ? 'poster' : 'loading'); setEnabled(value => !value); };
  return (
    <section className="system-room" aria-labelledby="home-title" data-chapter={chapter.id}>
      <div className="system-room__sticky">
        <header className="system-room__masthead"><span><i aria-hidden="true" />个人作品集 <small>/ SYSTEM ROOM</small></span><span>{profile.englishName}</span></header>
        <div className="system-room__layout">
          <div className="system-room__copy">
            <p className="system-room__eyebrow">{chapter.en}</p>
            <div className="system-room__identity">
              <h1 id="home-title">{profile.name}</h1>
              <p className="system-room__direction">{profile.primaryDirections.slice(0, 2).join(' / ')}</p>
              <p className="system-room__practice">AI 应用与业务数字化实践</p>
              <p className="system-room__education"><span>{profile.graduation.zh}</span><span>{profile.school} · {profile.major}</span></p>
            </div>
            {active > 0 && <h2 className="system-room__chapter-title">{chapter.title}</h2>}
            <p className="system-room__description">{chapter.description || profile.positioning}</p>
            <div className="system-room__actions"><AppLink to="/#work" className="system-room__cta">查看代表项目<span aria-hidden="true">↗</span></AppLink><a href={publicResumeHref(profile.resume)}>公开简历 <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="system-room__stage" aria-label="交互式微缩工作室">
            <span className="system-room__axis" aria-hidden="true">WORKSPACE — {String(active).padStart(2, '0')}</span>
            <img className={`system-room__poster ${status === 'ready' && enabled ? 'is-hidden' : ''}`} src={assetPath(`models/system-room-${chapter.id}.webp`)} alt={`${chapter.label}：暖色微缩工作室，包含中央产品屏幕、左侧自动化屏幕和右侧原型设备`} width="1280" height="880" fetchPriority="high" />
            <div ref={canvasHost} aria-hidden="true" className={`system-room__canvas ${status === 'ready' && enabled ? 'is-ready' : ''}`} />
            <div className="system-room__tools"><span role="status">{failed ? '已切换为静态预览' : enabled ? status === 'ready' ? '点击屏幕，探索工作区' : '正在打开工作室…' : '工作室静态预览'}</span><button type="button" onClick={toggle} aria-pressed={enabled}>{enabled ? '关闭 3D' : '探索 3D'}<span aria-hidden="true">{enabled ? 'Ⅱ' : '↗'}</span></button></div>
            <div className="system-room__caption"><span aria-hidden="true">↳</span> {chapter.note}{active > 0 && <AppLink to={chapter.link}>{chapter.cta} ↗</AppLink>}<small>概念场景 · 项目事实见案例</small></div>
          </div>
        </div>
        <nav className="system-room__chapters" aria-label="工作室镜头">{chapters.map((item, index) => <button key={item.id} type="button" aria-pressed={index === active} onClick={() => select(index)}><span>0{index}</span><strong>{item.label}</strong><span aria-hidden="true">{index === active ? '↗' : '+'}</span></button>)}</nav>
        <div className="system-room__footnote"><span>可点击切换工作区</span><AppLink to="/#work">继续看代表项目 ↓</AppLink></div>
      </div>
    </section>
  );
}
