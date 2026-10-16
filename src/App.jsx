import { useEffect, useState } from "react";
import Header, { Announce } from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Booking from "./components/Booking.jsx";
import Services from "./components/Services.jsx";
import Plan from "./components/Plan.jsx";
import Work from "./components/Work.jsx";
import Process from "./components/Process.jsx";
import Prices from "./components/Prices.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import ChatWidget from "./components/ChatWidget.jsx";
import Admin from "./components/Admin.jsx";

export default function App() {
  const [hash, setHash] = useState(location.hash);
  const [prefill, setPrefill] = useState("");

  useEffect(() => {
    const onHash = () => setHash(location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (hash === "#admin") return <Admin />;

  return (
    <>
      <Announce />
      <Header />
      <Hero />
      <Booking />
      <Services />
      <Plan onPrefill={setPrefill} />
      <Work />
      <Process />
      <Prices />
      <About />
      <Contact prefill={prefill} />
      <Footer />
      <ChatWidget />
    </>
  );
}
