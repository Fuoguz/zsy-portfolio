import { useEffect, useRef, useState } from "react";

import { getHomePageContent } from "../../content/public.js";
import { AppLink } from "./AppLink.jsx";
import { publicResumeHref } from "../../utils/paths.js";

const { profile } = getHomePageContent();
const resumeHref = publicResumeHref(profile.resume);

const PRIMARY = [
  ["作品", "/work", ["work", "project", "product", "growth", "creative", "ai-native"]],
  ["关于", "/about", ["about"]],
];

const MOBILE = [
  ["代表项目", "/#work"],
  ["全部作品", "/work"],
  ["按岗位看", "/work#lens"],
  ["创意实验", "/creative"],
  ["关于我", "/about"],
];

export function Navigation({ route }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuRoute, setMenuRoute] = useState(route);
  if (menuRoute !== route) { setMenuRoute(route); setOpen(false); }
  const onDarkHero = route?.id === "home" && !solid;

  const closeMenu = ({ restoreFocus = false } = {}) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setSolid(y > 24);
      setHidden(y > 320 && y > last + 4 ? true : y < last - 4 ? false : (current) => current);
      last = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, [route]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add("has-menu");
    menuRef.current?.querySelector("a[href]")?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") { event.preventDefault(); closeMenu({ restoreFocus: true }); return; }
      if (event.key !== "Tab") return;
      const items = [triggerRef.current, ...menuRef.current.querySelectorAll("a[href]")];
      const first = items[0];
      const lastItem = items.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); lastItem.focus(); }
      else if (!event.shiftKey && document.activeElement === lastItem) { event.preventDefault(); first.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const onResize = () => { if (desktop.matches) closeMenu(); };
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.classList.remove("has-menu");
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);


  return (
    <>
      <a className="skip" href="#main-content" onClick={() => {
        const main = document.getElementById("main-content");
        main?.setAttribute("tabindex", "-1");
        main?.focus();
      }}>跳到主要内容</a>
      <header className={`nav${solid ? " is-solid" : ""}${hidden && !open ? " is-hidden" : ""}${onDarkHero && !open ? " is-on-dark" : ""}${open ? " is-open" : ""}`}>
        <div className="nav__inner wrap">
          <AppLink className="nav__brand" to="/" aria-label={`${profile.name}的作品集首页`}>
            <span className="nav__mark" aria-hidden="true">ZSY</span>
            <span className="nav__name">{profile.name}<small>{profile.englishName}</small></span>
          </AppLink>
          <nav className="nav__links" aria-label="主导航">
            {PRIMARY.map(([label, to, ids]) => (
              <AppLink key={to} to={to} aria-current={ids.includes(route?.id) ? "page" : undefined}>{label}</AppLink>
            ))}
            <a href={resumeHref} download>简历 <span aria-hidden="true">↓</span></a>
            <a href="#contact" className="nav__cta">联系我</a>
          </nav>
          <button
            ref={triggerRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? closeMenu({ restoreFocus: true }) : setOpen(true))}
          >
            <span>{open ? "关闭" : "菜单"}</span>
            <i aria-hidden="true" />
          </button>
        </div>
        <nav
          ref={menuRef}
          id="mobile-menu"
          className={`sheet-menu${open ? " is-open" : ""}`}
          aria-label="移动端导航"
          aria-hidden={!open}
          inert={!open}
        >
          <ol>
            {MOBILE.map(([label, to], index) => (
              <li key={to} style={{ "--i": index }}>
                <AppLink to={to} onClick={() => closeMenu()}><span>{String(index + 1).padStart(2, "0")}</span>{label}</AppLink>
              </li>
            ))}
          </ol>
          <div className="sheet-menu__foot">
            <a href={resumeHref} download onClick={() => closeMenu()}>下载简历 PDF</a>
            <a href={`mailto:${profile.contact.email}`} onClick={() => closeMenu()}>{profile.contact.email}</a>
            <a href={profile.publicLinks.github} target="_blank" rel="noreferrer" onClick={() => closeMenu()}>GitHub ↗</a>
          </div>
        </nav>
      </header>
    </>
  );
}
