const PATHS = {
  movie: <><circle cx="7" cy="6" r="2.6" /><circle cx="13" cy="6" r="2.6" /><rect x="3" y="10" width="13" height="9" rx="1.5" /><path d="m16 13 5-3v9l-5-3" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4M7 14h2M11 14h2M15 14h2M7 17h2M11 17h2" /></>,
  live: <><circle cx="12" cy="12" r="2" /><path d="M8.5 15.5a5 5 0 0 1 0-7M15.5 8.5a5 5 0 0 1 0 7M5.6 18.4a9 9 0 0 1 0-12.8M18.4 5.6a9 9 0 0 1 0 12.8M12 14v7" /></>,
  rings: <><circle cx="9" cy="14" r="5.5" /><circle cx="15" cy="14" r="5.5" /><path d="M10.5 5.5 12 3l1.5 2.5" /></>,
  clapper: <><rect x="3" y="9" width="18" height="12" rx="1.5" /><path d="M3 9 5 4l16 0-2 5M8 4l-2 5M13 4l-2 5M18 4l-2 5M12 13v4" /></>,
  layers: <><path d="M12 3 2 8l10 5 10-5-10-5z" /><path d="m2 13 10 5 10-5M2 17.5l10 5 10-5" /></>,
  play: <path d="M8 5.5v13l11-6.5z" />,
  arrowUR: <path d="M7 17 17 7M9 7h8v8" />,
  note: <><path d="M9 18V5l11-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="17" cy="16" r="3" /></>,
  stage: <><path d="M12 3 7 14M12 3l5 11" opacity=".5" /><circle cx="12" cy="3" r="1.2" /><path d="M3 18h18M5 18v3M19 18v3" /><circle cx="12" cy="13" r="1.8" /><path d="M10 18c0-1.5.9-2.6 2-2.6s2 1.1 2 2.6" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /><circle cx="12" cy="12" r="2" /></>,
  film: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 5v14M17 5v14M3 10h4M3 14h4M17 10h4M17 14h4" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  camera: <><path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13" r="3.5" /></>,
  drone: <><rect x="9" y="10" width="6" height="4" rx="1" /><path d="M9 10 5 6M15 10l4-4M9 14l-4 4M15 14l4 4" /><circle cx="4" cy="5" r="2" /><circle cx="20" cy="5" r="2" /><circle cx="4" cy="19" r="2" /><circle cx="20" cy="19" r="2" /></>,
  heart: <path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20z" />,
  people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M15 14.5c3 0 6 1.5 6 5.5" /></>,
};

export default function Icon({ name }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
