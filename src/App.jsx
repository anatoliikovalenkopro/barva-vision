import { useEffect, useState } from "react";
import Header, { Announce } from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import Admin from "./components/Admin.jsx";
import { isServerMode } from "./api.js";
import { usePath } from "./router.jsx";
import { SERVICE_PAGES } from "./pages/servicePages.js";
import { HomePage, ServicePage, WeddingsPage, PricesPage, ContactPage } from "./pages/Pages.jsx";
import WorkPage from "./pages/WorkPage.jsx";

const TITLES = {
  "/": "Barva Vision — Video Production Company | Alberta & Canada",
  "/music-videos": "Music Video — Barva Vision",
  "/live-shows": "Live Shows & Concert Videography — Barva Vision",
  "/events": "Event Videography — Barva Vision",
  "/weddings": "Wedding Films — Barva Vision",
  "/prices": "Prices — Barva Vision",
  "/work": "Work — Barva Vision",
  "/about": "About & Contact — Barva Vision",
  "/contact": "About & Contact — Barva Vision",
};

export default function App() {
  const path = usePath();
  const [hash, setHash] = useState(location.hash);
  const [prefill, setPrefill] = useState("");
  const wedding = path === "/weddings";

  useEffect(() => {
    const onHash = () => setHash(location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const theme = SERVICE_PAGES[path]?.theme;
    const root = document.documentElement.classList;
    root.toggle("theme-studio", true);
    for (const t of ["music", "live", "events"]) root.toggle(`theme-${t}`, theme === t);
    root.toggle("theme-neutral", !theme);
    root.toggle("theme-wedding", wedding);
    document.title = TITLES[path] || TITLES["/"];
  }, [path, wedding]);

  if (hash === "#admin" && isServerMode) return <Admin />;

  let page;
  if (SERVICE_PAGES[path]) page = <ServicePage key={path} path={path} />;
  else if (wedding) page = <WeddingsPage onPrefill={setPrefill} />;
  else if (path === "/prices") page = <PricesPage />;
  else if (path === "/work") page = <WorkPage />;
  else if (path === "/contact" || path === "/about") page = <ContactPage prefill={prefill} />;
  else page = <HomePage />;

  return (
    <>
      {wedding && <Announce />}
      <Header path={path} wedding={wedding} />
      <main key={path}>{page}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
