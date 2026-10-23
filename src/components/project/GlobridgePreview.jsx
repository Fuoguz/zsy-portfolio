import { useEffect, useRef, useState } from "react";
import { assetPath } from "../../utils/paths.js";

export function GlobridgePreview({ project }) {
  const poster = project.evidence.find(item => item.id === "globridge-home" && item.publicSafe);
  const clip = project.evidence.find(item => item.id === "globridge-preview" && item.publicSafe);
  const video = useRef(null);
  const manuallyPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 768px)");
    const update = () => setAllowed(preference.matches && !navigator.connection?.saveData);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element || !allowed || failed) return;
    let visible = false;
    const updatePlayback = () => {
      if (visible && !document.hidden && !manuallyPaused.current) element.play().catch(() => setPlaying(false));
      else element.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updatePlayback();
    }, { threshold: 0.4 });
    observer.observe(element);
    document.addEventListener("visibilitychange", updatePlayback);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", updatePlayback); element.pause(); };
  }, [allowed, failed]);
  if (!poster) return null;
  return <div className="globridge-preview">
    <div className="globridge-preview__bar"><span aria-hidden="true">● ● ●</span><span>globridge.cn</span><span>LIVE SITE</span></div>
    {allowed && clip && !failed ? <video ref={video} poster={assetPath(poster.asset)} src={assetPath(clip.asset)} muted loop playsInline preload="none" aria-label="Globridge 官网实际运行录屏，7 秒静音" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} /> : <img src={assetPath(poster.asset)} alt={poster.alt} width={poster.width} height={poster.height} />}
    {allowed && clip && !failed ? <button type="button" className="globridge-preview__control" onClick={() => {
      manuallyPaused.current = playing;
      if (playing) video.current.pause();
      else video.current.play().catch(() => setFailed(true));
    }}>{playing ? "暂停预览" : "播放预览"}</button> : null}
  </div>;
}
