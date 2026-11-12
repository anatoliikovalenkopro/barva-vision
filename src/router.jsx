import { useEffect, useState } from "react";

// Tiny path router: each menu item is its own page (/music-videos, /weddings, …).
// Both hosts (Render's Express server and Cloudflare) already send every path to index.html.
const listeners = new Set();

export function navigate(to) {
  const [target, hash] = to.split("#");
  const changed = target && target !== location.pathname + location.search;
  if (changed) {
    history.pushState(null, "", target);
    listeners.forEach((fn) => fn());
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }
  if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }), changed ? 60 : 0);
}

export function usePath() {
  const [path, setPath] = useState(location.pathname);
  useEffect(() => {
    const update = () => setPath(location.pathname);
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => {
      listeners.delete(update);
      window.removeEventListener("popstate", update);
    };
  }, []);
  return path;
}

export function Link({ to, onClick, children, ...rest }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onClick?.(e);
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export const contactLink = (service) => `/contact${service ? `?service=${encodeURIComponent(service)}` : ""}`;
