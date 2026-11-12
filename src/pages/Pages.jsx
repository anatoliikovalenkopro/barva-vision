import { FILMS, PHOTOS, WEDDING_SERVICES } from "../../shared/siteData.js";
import PhotoGallery from "../components/PhotoGallery.jsx";
import { Link } from "../router.jsx";
import { SERVICE_PAGES } from "./servicePages.js";
import Reveal from "../components/Reveal.jsx";
import { GroovyHero, ServicesBand, FeaturedBand } from "../components/GroovyHome.jsx";
import PricingPoster from "../components/PricingPoster.jsx";
import PageHero from "../components/PageHero.jsx";
import { MusicHero, LiveHero, EventsHero } from "../components/ThemedHeroes.jsx";
import Services from "../components/Services.jsx";
import Work from "../components/Work.jsx";
import Process, { WEDDING_STEPS } from "../components/Process.jsx";
import Prices from "../components/Prices.jsx";
import Contact from "../components/Contact.jsx";
import CtaBand from "../components/CtaBand.jsx";
import WeddingHero from "../components/WeddingHero.jsx";
import Booking from "../components/Booking.jsx";
import Plan from "../components/Plan.jsx";


export function HomePage() {
  return (
    <>
      <GroovyHero />
      <ServicesBand />
      <FeaturedBand />
      <Process />
      <CtaBand />
    </>
  );
}

export function ServicePage({ path }) {
  const p = SERVICE_PAGES[path];
  const Hero = { music: MusicHero, live: LiveHero, events: EventsHero }[p.theme];
  return (
    <>
      <Hero {...p} />
      {p.photos?.first && <PhotoGallery photos={PHOTOS[p.photos.key]} title={p.photos.title} em={p.photos.em} lead={p.photos.lead} />}
      {p.kinds && <Services items={p.kinds} eyebrow={p.eyebrow} title={p.kindsTitle} em={p.kindsEm} />}
      {(FILMS.some((f) => f.cat === p.cat) || !p.photos) && (
        <Work cat={p.cat} tint="tint-sage" title="Recent" em="work" reelName={`${p.eyebrow.toLowerCase()} reel`} service={p.service} />
      )}
      {p.photos && !p.photos.first && <PhotoGallery photos={PHOTOS[p.photos.key]} title={p.photos.title} em={p.photos.em} lead={p.photos.lead} />}
      <Process />
      <Prices ids={[p.priceId]} title="Pricing" em="" lead="Starting price below — we confirm the final quote after a quick chat." />
      <CtaBand service={p.service} />
    </>
  );
}

export function WeddingsPage({ onPrefill }) {
  return (
    <>
      <WeddingHero />
      <Booking />
      <Services
        items={WEDDING_SERVICES}
        title="Everything your day"
        em="deserves"
        lead="From the first look to the last dance — wedding films made with care, colour and a lot of heart."
      />
      <Plan onPrefill={onPrefill} />
      <Work cat="Wedding Film" title="Stories we've" em="filmed" reelName="wedding reel" service="Wedding Film" />
      <Process steps={WEDDING_STEPS} />
      <Prices
        ids={["wedding-films", "addons"]}
        lead="Starting rates — every wedding is a little different, so every project is quoted to fit."
      />
      <CtaBand title="Tell us about" em="your day." service="Wedding Film" button="Check your date" />
    </>
  );
}

export function PricesPage() {
  return (
    <>
      <PricingPoster />
      <Prices title="The" em="details" lead="Everything included in each package. Every project is a little different, so we confirm the final quote with you." tint="" />
      <CtaBand />
    </>
  );
}

export function ContactPage({ prefill }) {
  return (
    <>
      <PageHero eyebrow="ABOUT & CONTACT" title="Let's make it" em="happen." visual={false} small
        lead="A small, hands-on studio based in Alberta, filming across Canada. Tell us the idea and the date — we reply personally, usually within a day or two." />
      <Contact prefill={prefill} about />
    </>
  );
}
