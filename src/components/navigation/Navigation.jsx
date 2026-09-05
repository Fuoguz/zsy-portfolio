import { useEffect, useRef, useState } from "react";

import { getHomePageContent } from "../../content/public.js";
import { AppLink } from "./AppLink.jsx";
import { publicResumeHref } from "../../utils/paths.js";

const { profile } = getHomePageContent();
const resumeHref = publicResumeHref(profile.resume);
const menuItems = [
  ["项目", "/work"],
  ["经历", "/#experience"],
  ["岗位视角", "/#role-lens"],
  ["实验", "/#lab"],
  ["关于", "/about"],
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const closeMenu = ({ restoreFocus = false } = {}) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!open) return undefined;
    const focusable = [...menuRef.current.querySelectorAll("a[href], button:not([disabled])")];
    focusable[0]?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu({ restoreFocus: true });
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <>
      <a className="final-hybrid__skip" href="#main-content">跳到主要内容</a>
      <header className="final-hybrid__nav">
        <AppLink className="final-hybrid__brand" to="/" aria-label={`${profile.name}的作品集首页`}>
          <strong>ZSY</strong><span>个人作品集 / 2027</span>
        </AppLink>
        <nav className="final-hybrid__nav-links" aria-label="作品集导航">
          <AppLink to="/work">项目</AppLink>
          <AppLink to="/about">关于我</AppLink>
          <AppLink to="/#role-lens">岗位视角</AppLink>
          <AppLink to="/#lab">实验</AppLink>
          <a href={resumeHref}>简历</a>
          <a href={profile.publicLinks.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${profile.contact.email}`}>联系</a>
        </nav>
        <div className="final-hybrid__mobile-actions">
          <a href={resumeHref}>简历</a>
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="production-mobile-menu"
            onClick={() => open ? closeMenu({ restoreFocus: true }) : setOpen(true)}
          >
            {open ? "关闭" : "菜单"}
          </button>
        </div>
        <nav
          ref={menuRef}
          id="production-mobile-menu"
          className={`final-hybrid__mobile-menu${open ? " is-open" : ""}`}
          aria-label="移动端作品集导航"
          aria-hidden={!open}
        >
          {menuItems.map(([label, to]) => (
            <AppLink key={to} to={to} onClick={() => closeMenu()}>{label}</AppLink>
          ))}
          <a href={resumeHref} onClick={() => closeMenu()}>简历</a>
          <a href={profile.publicLinks.github} target="_blank" rel="noreferrer" onClick={() => closeMenu()}>GitHub</a>
          <a href={`mailto:${profile.contact.email}`} onClick={() => closeMenu()}>联系</a>
        </nav>
      </header>
    </>
  );
}
