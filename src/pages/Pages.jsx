import { FILMS, PHOTOS, WEDDING_SERVICES } from "../../shared/siteData.js";
import PhotoGallery from "../components/PhotoGallery.jsx";
import { Link } from "../router.jsx";
import { SERVICE_PAGES } from "./servicePages.js";
import Reveal from "../components/Reveal.jsx";
import HomeHero from "../components/HomeHero.jsx";
import FeaturedWork from "../components/FeaturedWork.jsx";
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

const EQ = [40, 70, 55, 90, 62, 100, 48, 76, 58, 84, 44, 66];

export function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedWork />

      <section className="section" id="what-we-film">
        <div className="wrap">
          <Reveal className="section-head center">
            <div className="eyebrow"><span className="rule" />WHAT WE FILM<span className="rule" /></div>
            <h2>What are we <em>making?</em></h2>
          </Reveal>
          <div className="bento">
            <Link to="/music-videos" className="bento-tile b-music">
              <span className="bento-n">01</span>
              <div className="bento-eq" aria-hidden="true">{EQ.map((h, i) => <i key={i} style={{ "--h": `${h}%`, animationDelay: `${(i % 5) * -0.2}s` }} />)}</div>
              <h3>Music Video</h3>
              <p>Performance, story and visual-led videos that look like your sound.</p>
              <span className="bento-go">Explore →</span>
            </Link>
            <Link to="/live-shows" className="bento-tile b-live">
              <span className="bento-n">02</span>
              <span className="b-live-word" aria-hidden="true">LIVE</span>
              <h3>Live Shows</h3>
              <p>Concerts, gigs and festivals — multi-angle, synced with your mix.</p>
              <span className="bento-go">Explore →</span>
            </Link>
            <Link to="/events" className="bento-tile b-events">
              <span className="bento-n">03</span>
              <h3>Events</h3>
              <p>Launches, parties and corporate nights.</p>
              <span className="bento-go">Explore →</span>
            </Link>
            <Link to="/weddings" className="bento-tile b-wedding">
              <span className="bento-n">04</span>
              <h3>Weddings</h3>
              <p>Soft, honest films. 2027 launch rates.</p>
              <span className="bento-go">Explore →</span>
            </Link>
            <Link to="/contact" className="bento-tile b-else">
              <div>
                <h3>Something else in mind?</h3>
                <p>Documentary, content for socials, a creative idea — if it needs a camera, tell us about it.</p>
              </div>
              <span className="btn">Tell us your idea</span>
            </Link>
          </div>
        </div>
      </section>

      <Process />
      <CtaBand />
    </>
  );
}

export function ServicePage({ path }) {
  const p = SERVICE_PAGES[path];
  const hasPhotos = (PHOTOS[p.photos?.key] || []).length > 0;
  const Hero = { music: MusicHero, live: LiveHero, events: EventsHero }[p.theme];
  return (
    <>
      <Hero {...p} />
      {(FILMS.some((f) => f.cat === p.cat) || !hasPhotos) && (
        <Work cat={p.cat} tint="tint-sage" title="Recent" em="work" reelName={`${p.eyebrow.toLowerCase()} reel`} service={p.service} />
      )}
      {hasPhotos && p.photos.first && <PhotoGallery photos={PHOTOS[p.photos.key]} title={p.photos.title} em={p.photos.em} lead={p.photos.lead} />}
      {p.kinds && <Services items={p.kinds} eyebrow={p.eyebrow} title={p.kindsTitle} em={p.kindsEm} />}
      {hasPhotos && !p.photos.first && <PhotoGallery photos={PHOTOS[p.photos.key]} title={p.photos.title} em={p.photos.em} lead={p.photos.lead} showPrice={!p.morePhotos} />}
      {p.morePhotos && PHOTOS[p.morePhotos.key]?.length > 0 && (
        <PhotoGallery photos={PHOTOS[p.morePhotos.key]} id={p.morePhotos.key} title={p.morePhotos.title} em={p.morePhotos.em} lead={p.morePhotos.lead} />
      )}
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
      {PHOTOS.weddings?.length > 0 && (
        <PhotoGallery photos={PHOTOS.weddings} id="photos" title="Wedding" em="moments" lead="Photos from weddings we have filmed and photographed." />
      )}
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
      <PageHero eyebrow="PRICES" title="Clear, honest" em="pricing." visual={false}
        lead="Special prices right now: music videos from C$400, live shows from C$250, events C$200/hour. Photography C$150/hour, and wedding films from C$400 at 2027 launch rates." />
      <Prices title="All" em="services" lead="" tint="" />
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
