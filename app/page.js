"use client";

import { useEffect, useRef, useState } from "react";

const T = {
  fr: {
    navLinks:   ["Services", "Implantations", "À propos", "Carrières"],
    navAnchors: ["services", "implantations", "a-propos", "carrieres"],
    navCta: "Devis gratuit",
    eyebrowHero: "Centre d'appel international · 15 ans d'excellence",
    heroTitle1: "Votre Succès,",
    heroTitle2: "commence ici.",
    heroSub: "Nous mettons en relation nos partenaires avec des prospects ciblés et qualifiés selon des critères précis afin d'optimiser leur taux de transformation.",
    heroCta1: "Demander un devis",
    heroCta2: "Découvrir nos services",
    stats: ["ans d'expérience", "pays d'implantation", "collaborateurs", "disponibilité"],
    eyebrowServices: "Ce que nous faisons",
    titleServices: "Nos prestations",
    services: [
      { icon: "📞", title: "Réception d'appels",  desc: "Accueil téléphonique professionnel, gestion des demandes et orientation client 24h/24." },
      { icon: "🎯", title: "Téléprospection",     desc: "Campagnes outbound ciblées, qualification de leads et prise de rendez-vous." },
      { icon: "🛠️", title: "Support client",      desc: "Assistance technique et SAV multicanal pour fidéliser vos clients." },
      { icon: "📋", title: "Back-office",         desc: "Traitement des données, saisie, gestion administrative et suivi dossiers." },
    ],
    eyebrowCountries: "Nos partenaires",
    titleCountries: "Ils nous font confiance",
    countries: [
      { name: "Île Maurice", code: "mu", role: "Siège régional" },
      { name: "France",      code: "fr", role: "Marché européen" },
      { name: "Belgique",    code: "be", role: "Support et expansion" },
    ],
    eyebrowWhy: "Pourquoi Agapecazel",
    titleWhy: "Centre d'appel spécialisé\nen génération de rendez-vous qualifiés",
    whyDesc: "Chez AgapeCazel, nous aidons les entreprises à développer leur activité grâce à une prospection ciblée et une génération de rendez-vous hautement qualifiés. Basé à l'île Maurice, notre centre d'appel est spécialisé dans :",
    whyList: [
      "Équipes francophones et anglophones",
      "La prise de rendez-vous en énergies renouvelables",
      "La vente et la prospection commerciale",
      "La prise de rendez-vous pour audit patrimonial",
    ],
    whyCta: "Parlons de votre projet",
    whyCards: [
      { label: "Satisfaction client", value: "98%", sub: "taux de satisfaction moyen" },
      { label: "Langues couvertes",   value: "2",   sub: "Français & Anglais" },
    ],
    eyebrowContact: "Prêt à démarrer ?",
    titleContact:   "Obtenez votre devis\nen 24 heures",
    contactSub: "Décrivez-nous vos besoins et notre équipe vous recontacte sous 24h avec une proposition sur mesure.",
    formNom: "Votre nom", formEmail: "Email professionnel",
    formSociete: "Société", formMessage: "Décrivez votre besoin…",
    formError: "Une erreur s'est produite. Veuillez réessayer.",
    formBtn: "Envoyer la demande", formLoading: "Envoi en cours…",
    successTitle: "Message envoyé !",
    successSub: "Notre équipe vous contacte sous 24h.",
    successBtn: "Envoyer une autre demande",
    footerLinks: ["Services", "Implantations", "À propos", "Carrières", "Contact"],
    footerSub:  "Centre d'appel international · Depuis 2009",
    footerCopy: "© 2025 Agapecazel. Tous droits réservés.",
  },
  en: {
    navLinks:   ["Services", "Locations", "About", "Careers"],
    navAnchors: ["services", "implantations", "a-propos", "carrieres"],
    navCta: "Free Quote",
    eyebrowHero: "International call centre · 15 years of excellence",
    heroTitle1: "Your Success,",
    heroTitle2: "starts here.",
    heroSub: "We connect our partners with targeted and qualified prospects based on precise criteria to optimise their conversion rate.",
    heroCta1: "Request a quote",
    heroCta2: "Discover our services",
    stats: ["years of experience", "countries", "team members", "availability"],
    eyebrowServices: "What we do",
    titleServices: "Our services",
    services: [
      { icon: "📞", title: "Inbound calls",    desc: "Professional telephone reception, request management and 24/7 customer support." },
      { icon: "🎯", title: "Teleprospecting",  desc: "Targeted outbound campaigns, lead qualification and appointment setting." },
      { icon: "🛠️", title: "Customer support", desc: "Technical assistance and multichannel after-sales service to retain your clients." },
      { icon: "📋", title: "Back-office",      desc: "Data processing, entry, administrative management and file tracking." },
    ],
    eyebrowCountries: "Our partners",
    titleCountries: "They trust us",
    countries: [
      { name: "Mauritius", code: "mu", role: "Regional headquarters" },
      { name: "France",    code: "fr", role: "European market" },
      { name: "Belgium",   code: "be", role: "Support & expansion" },
    ],
    eyebrowWhy: "Why Agapecazel",
    titleWhy: "Specialised call centre\nfor qualified lead generation",
    whyDesc: "At AgapeCazel, we help businesses grow through targeted prospecting and highly qualified appointment generation. Based in Mauritius, our call centre specialises in:",
    whyList: [
      "French and English-speaking teams",
      "Appointment setting in renewable energy",
      "Sales and commercial prospecting",
      "Appointment setting for wealth audits",
    ],
    whyCta: "Let's talk about your project",
    whyCards: [
      { label: "Client satisfaction", value: "98%", sub: "average satisfaction rate" },
      { label: "Languages covered",  value: "2",   sub: "French & English" },
    ],
    eyebrowContact: "Ready to start?",
    titleContact:   "Get your quote\nwithin 24 hours",
    contactSub: "Tell us about your needs and our team will get back to you within 24h with a tailored proposal.",
    formNom: "Your name", formEmail: "Business email",
    formSociete: "Company", formMessage: "Describe your need…",
    formError: "An error occurred. Please try again.",
    formBtn: "Send request", formLoading: "Sending…",
    successTitle: "Message sent!",
    successSub: "Our team will contact you within 24h.",
    successBtn: "Send another request",
    footerLinks: ["Services", "Locations", "About", "Careers", "Contact"],
    footerSub:  "International call centre · Since 2009",
    footerCopy: "© 2025 Agapecazel. All rights reserved.",
  },
};

const STATS_VALUES = [
  { value: 15,  suffix: "+" },
  { value: 6,   suffix: ""  },
  { value: 300, suffix: "+" },
  { value: 24,  suffix: "/7"},
];

function useCounter(target, duration = 1800, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return value;
}

function Flag({ code, w = 32, h = 22 }) {
  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      srcSet={`https://flagcdn.com/w160/${code}.png 2x`}
      width={w} height={h} alt={code.toUpperCase()}
      style={{ objectFit: "cover", borderRadius: 3, display: "block", flexShrink: 0 }}
    />
  );
}

function StatCard({ value, suffix, label, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 52, fontWeight: 700, color: "#1558B0", lineHeight: 1, letterSpacing: "-1px" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 12, color: "#8A9BB8", letterSpacing: "0.09em", textTransform: "uppercase", marginTop: 10, fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

function Logo({ height = 44 }) {
  return <img src="/logo.png" alt="AgapeCazel" style={{ height, width: "auto", display: "block" }} />;
}

function LangSwitcher({ lang, setLang, size = 28 }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {[["fr", "fr", "Français"], ["en", "gb", "English"]].map(([code, flag, title]) => (
        <button key={code}
          className={`lang-btn${lang === code ? " active" : ""}`}
          onClick={() => setLang(code)} title={title}>
          <Flag code={flag} w={size} h={Math.round(size * 0.67)} />
        </button>
      ))}
    </div>
  );
}

// Shared style tokens
const eyebrowStyle = {
  display: "block", fontSize: 11, letterSpacing: "0.2em",
  color: "#1558B0", textTransform: "uppercase", fontWeight: 600, marginBottom: 14,
};
const secTitleStyle = {
  fontFamily: "'DM Serif Display', serif", fontSize: 44, fontWeight: 400,
  color: "#0D1B35", lineHeight: 1.15, letterSpacing: "-0.3px",
};
const inputDarkStyle = {
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.11)",
  borderRadius: 6, padding: "14px 18px", color: "#E8F0FC",
  fontSize: 14, width: "100%", transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "'DM Sans', sans-serif",
};

export default function Home() {
  const [lang, setLang]            = useState("fr");
  const [scrolled, setScrolled]    = useState(false);
  const [statsStarted, setStats]   = useState(false);
  const [menuOpen, setMenu]        = useState(false);
  const [form, setForm]            = useState({ nom: "", email: "", societe: "", message: "" });
  const [formState, setFormState]  = useState("idle");
  const statsRef = useRef(null);
  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStats(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch("https://formspree.io/f/xwvyrjod", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
      setForm({ nom: "", email: "", societe: "", message: "" });
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        a { text-decoration: none; color: inherit; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }

        .nav-link { color: #546070; font-size: 14px; font-weight: 400; transition: color 0.2s; }
        .nav-link:hover { color: #1558B0; }

        .btn-fill {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1558B0; color: #fff;
          padding: 12px 26px; border-radius: 4px;
          font-size: 14px; font-weight: 500; letter-spacing: 0.02em;
          transition: background 0.2s, transform 0.15s;
          cursor: pointer; border: none; font-family: inherit;
        }
        .btn-fill:hover { background: #0D409A; transform: translateY(-1px); }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #1558B0;
          padding: 11px 26px; border-radius: 4px; font-size: 14px;
          font-weight: 500; border: 1.5px solid rgba(21,88,176,0.28);
          transition: border-color 0.2s, background 0.2s;
        }
        .btn-outline:hover { border-color: #1558B0; background: rgba(21,88,176,0.04); }

        .service-card {
          background: #fff; border: 1px solid #E4EBF5;
          border-radius: 10px; padding: 32px 26px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .service-card:hover {
          border-color: #1558B0;
          box-shadow: 0 12px 48px rgba(21,88,176,0.10);
          transform: translateY(-5px);
        }

        .country-card {
          background: #fff; border: 1px solid #E4EBF5; border-radius: 10px;
          padding: 36px 20px; display: flex; flex-direction: column;
          align-items: center; gap: 12px; text-align: center;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .country-card:hover { border-color: rgba(21,88,176,0.35); box-shadow: 0 4px 24px rgba(21,88,176,0.07); }

        .lang-btn { background: transparent; border: 1.5px solid transparent; border-radius: 4px; cursor: pointer; padding: 3px; transition: border-color 0.2s; display: inline-flex; align-items: center; }
        .lang-btn:hover { border-color: #BFCFE8; }
        .lang-btn.active { border-color: #1558B0; }

        .hamburger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:4px; }
        .hamburger span { display:block; width:22px; height:1.5px; background:#1558B0; transition:transform 0.25s,opacity 0.25s; }
        .mobile-menu { display:none; position:fixed; top:68px; left:0; right:0; z-index:190; background:rgba(255,255,255,0.98); backdrop-filter:blur(16px); border-bottom:1px solid #E4EBF5; flex-direction:column; padding:16px 24px 28px; animation:slideDown 0.2s ease; }
        .mobile-link { color: #546070; font-size:15px; padding:14px 0; border-bottom:1px solid #F0F4FA; display:block; }
        .mobile-link:hover { color:#1558B0; }
        .mobile-lang { display:none; }

        input, textarea { font-family: 'DM Sans', sans-serif; }
        input::placeholder, textarea::placeholder { color: #7A9AC5; }
        input:focus, textarea:focus { outline: none; border-color: rgba(77,163,245,0.6) !important; box-shadow: 0 0 0 3px rgba(21,88,176,0.10) !important; }

        @media(max-width:900px){
          .why-grid { grid-template-columns: 1fr !important; gap:40px !important; }
          .services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media(max-width:768px){
          .hamburger { display:flex !important; }
          .desktop-nav { display:none !important; }
          .mobile-lang { display:block !important; }
          .mobile-menu.open { display:flex !important; }
          .hero-wrap { padding: 100px 24px 64px !important; }
          .hero-title { font-size: 40px !important; }
          .stats-bar { padding: 36px 24px !important; flex-wrap: wrap !important; }
          .stat-col { width: 50% !important; border-right: none !important; border-bottom: 1px solid #E4EBF5 !important; padding: 20px 0 !important; }
          .sec-pad { padding: 64px 24px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .countries-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .form-row { grid-template-columns: 1fr !important; }
          .footer-inner { flex-direction: column !important; gap: 24px !important; }
          .footer-pad { padding: 40px 24px 24px !important; }
          .nav-bar { padding: 0 20px !important; }
          .sec-title { font-size: 30px !important; }
        }
        @media(max-width:480px){
          .hero-title { font-size: 32px !important; }
          .stat-col { width: 100% !important; }
        }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFFFF", color: "#1A2540", minHeight: "100vh", overflowX: "hidden" }}>

        {/* NAV */}
        <nav className="nav-bar" style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 60px", height: 68,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.90)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${scrolled ? "#E4EBF5" : "transparent"}`,
          transition: "border-color 0.3s, background 0.3s",
          boxShadow: scrolled ? "0 1px 24px rgba(0,0,0,0.06)" : "none",
        }}>
          <a href="#"><Logo height={36} /></a>

          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 34 }}>
            {t.navLinks.map((l, i) => (
              <a key={l} href={`#${t.navAnchors[i]}`} className="nav-link">{l}</a>
            ))}
            <a href="#contact" className="btn-fill" style={{ padding: "9px 20px", fontSize: 13 }}>{t.navCta}</a>
            <LangSwitcher lang={lang} setLang={setLang} size={26} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="mobile-lang"><LangSwitcher lang={lang} setLang={setLang} size={22} /></div>
            <button className="hamburger" onClick={() => setMenu(!menuOpen)} aria-label="Menu">
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(4.5px,4.5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4.5px,-4.5px)" : "none" }} />
            </button>
          </div>
        </nav>

        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {t.navLinks.map((l, i) => (
            <a key={l} href={`#${t.navAnchors[i]}`} className="mobile-link" onClick={() => setMenu(false)}>{l}</a>
          ))}
          <a href="#contact" className="btn-fill" style={{ marginTop: 16, justifyContent: "center" }} onClick={() => setMenu(false)}>{t.navCta}</a>
        </div>

        {/* HERO */}
        <section style={{ background: "#FFFFFF", position: "relative", overflow: "hidden" }}>
          {/* Dot pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#D8E5F5 1.3px, transparent 1.3px)", backgroundSize: "26px 26px", opacity: 0.65, pointerEvents: "none" }} />
          {/* Blue glow top-right */}
          <div style={{ position: "absolute", top: -150, right: -150, width: 750, height: 750, borderRadius: "50%", background: "radial-gradient(circle, rgba(21,88,176,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
          {/* Thin blue horizontal line accent */}
          <div style={{ position: "absolute", top: 68, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(21,88,176,0.12), transparent)", pointerEvents: "none" }} />

          <div className="hero-wrap" style={{ maxWidth: 1160, margin: "0 auto", padding: "138px 60px 100px", position: "relative" }}>
            {/* Eyebrow */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#EDF3FF", border: "1px solid #C5D8F5", borderRadius: 40, padding: "6px 18px", marginBottom: 30, animation: "fadeUp 0.55s ease both" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#1558B0", flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, color: "#1558B0", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>{t.eyebrowHero}</span>
            </div>

            <h1 className="hero-title" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 74, fontWeight: 400, lineHeight: 1.07, color: "#0B1729", marginBottom: 26, letterSpacing: "-0.5px", maxWidth: 740, animation: "fadeUp 0.7s 0.08s ease both", opacity: 0, animationFillMode: "forwards" }}>
              {t.heroTitle1}<br />
              <em style={{ color: "#1558B0", fontStyle: "italic" }}>{t.heroTitle2}</em>
            </h1>

            <p style={{ fontSize: 17, color: "#5D6E88", lineHeight: 1.82, maxWidth: 540, marginBottom: 38, fontWeight: 300, animation: "fadeUp 0.7s 0.16s ease both", opacity: 0, animationFillMode: "forwards" }}>
              {t.heroSub}
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp 0.7s 0.24s ease both", opacity: 0, animationFillMode: "forwards" }}>
              <a href="#contact" className="btn-fill">{t.heroCta1} →</a>
              <a href="#services" className="btn-outline">{t.heroCta2}</a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section ref={statsRef} style={{ background: "#F5F8FD", borderTop: "1px solid #E4EBF5", borderBottom: "1px solid #E4EBF5" }}>
          <div className="stats-bar" style={{ maxWidth: 1060, margin: "0 auto", padding: "48px 60px", display: "flex", justifyContent: "space-around" }}>
            {STATS_VALUES.map((st, i) => (
              <div key={i} className="stat-col" style={{ flex: 1, padding: "0 28px", textAlign: "center", borderRight: i < STATS_VALUES.length - 1 ? "1px solid #E4EBF5" : "none" }}>
                <StatCard value={st.value} suffix={st.suffix} label={t.stats[i]} started={statsStarted} />
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="sec-pad" style={{ padding: "92px 60px", background: "#FFFFFF" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={eyebrowStyle}>{t.eyebrowServices}</p>
            <h2 className="sec-title" style={secTitleStyle}>{t.titleServices}</h2>
            <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginTop: 48 }}>
              {t.services.map((sv) => (
                <div key={sv.title} className="service-card">
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: "#EDF3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 20 }}>{sv.icon}</div>
                  <h3 style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 17, fontWeight: 600, color: "#0B1729", marginBottom: 10, lineHeight: 1.3 }}>{sv.title}</h3>
                  <p style={{ fontSize: 13.5, color: "#7A8FA8", lineHeight: 1.78, marginBottom: 22 }}>{sv.desc}</p>
                  <span style={{ fontSize: 13, color: "#1558B0", fontWeight: 500 }}>Découvrir →</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPLANTATIONS */}
        <section id="implantations" className="sec-pad" style={{ padding: "92px 60px", background: "#F5F8FD" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={eyebrowStyle}>{t.eyebrowCountries}</p>
            <h2 className="sec-title" style={secTitleStyle}>{t.titleCountries}</h2>
            <div className="countries-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginTop: 48 }}>
              {t.countries.map((c) => (
                <div key={c.name} className="country-card">
                  <Flag code={c.code} w={72} h={50} />
                  <p style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 17, fontWeight: 600, color: "#0B1729" }}>{c.name}</p>
                  <p style={{ fontSize: 11.5, color: "#8A9BB8", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 500 }}>{c.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section id="a-propos" className="sec-pad" style={{ padding: "92px 60px", background: "#FFFFFF" }}>
          <div className="why-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 320px", gap: 80, alignItems: "center" }}>
            <div>
              <p style={eyebrowStyle}>{t.eyebrowWhy}</p>
              <h2 className="sec-title" style={{ ...secTitleStyle, whiteSpace: "pre-line" }}>{t.titleWhy}</h2>
              <p style={{ color: "#7A8FA8", lineHeight: 1.88, marginBottom: 28, fontSize: 15, marginTop: 16 }}>{t.whyDesc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 38 }}>
                {t.whyList.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start", color: "#4A5C72", fontSize: 14.5, lineHeight: 1.65 }}>
                    <span style={{ flexShrink: 0, marginTop: 2, width: 22, height: 22, borderRadius: "50%", background: "#EDF3FF", border: "1.5px solid #C5D8F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#1558B0" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-fill">{t.whyCta} →</a>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {t.whyCards.map((card) => (
                <div key={card.label} style={{ background: "#F5F8FD", border: "1px solid #E4EBF5", borderRadius: 10, padding: "28px 26px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#1558B0", borderRadius: "10px 0 0 10px" }} />
                  <p style={{ fontSize: 11, color: "#8A9BB8", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, marginBottom: 10 }}>{card.label}</p>
                  <p style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 54, fontWeight: 700, color: "#1558B0", lineHeight: 1, letterSpacing: "-1px" }}>{card.value}</p>
                  <p style={{ fontSize: 13, color: "#8A9BB8", marginTop: 8 }}>{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT — dark navy for contrast */}
        <section id="contact" className="sec-pad" style={{ padding: "92px 60px", background: "#0B1729" }}>
          <div style={{ maxWidth: 620, margin: "0 auto" }}>
            <p style={{ ...eyebrowStyle, color: "#4DA3F5", textAlign: "center" }}>{t.eyebrowContact}</p>
            <h2 className="sec-title" style={{ fontFamily: "'DM Serif Display',serif", fontSize: 44, fontWeight: 400, color: "#FFFFFF", lineHeight: 1.15, letterSpacing: "-0.3px", textAlign: "center", whiteSpace: "pre-line", marginBottom: 16 }}>{t.titleContact}</h2>
            <p style={{ color: "#6A85A8", textAlign: "center", fontSize: 15, lineHeight: 1.8, marginBottom: 44 }}>{t.contactSub}</p>

            {formState === "success" ? (
              <div style={{ textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "56px 32px" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#EDF3FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none"><path d="M2 10L9 17L24 2" stroke="#1558B0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 28, color: "#FFFFFF", marginBottom: 10 }}>{t.successTitle}</p>
                <p style={{ color: "#6A85A8", fontSize: 14, marginBottom: 28 }}>{t.successSub}</p>
                <button onClick={() => setFormState("idle")} className="btn-fill">{t.successBtn}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <input style={inputDarkStyle} placeholder={t.formNom} required value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
                  <input style={inputDarkStyle} type="email" placeholder={t.formEmail} required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <input style={inputDarkStyle} placeholder={t.formSociete} value={form.societe} onChange={e => setForm({ ...form, societe: e.target.value })} />
                <textarea style={{ ...inputDarkStyle, resize: "vertical" }} rows={4} placeholder={t.formMessage} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                {formState === "error" && <p style={{ color: "#F87171", fontSize: 13 }}>{t.formError}</p>}
                <button className="btn-fill" type="submit" disabled={formState === "loading"} style={{ opacity: formState === "loading" ? 0.6 : 1, justifyContent: "center", marginTop: 6, width: "100%" }}>
                  {formState === "loading" ? t.formLoading : `${t.formBtn} →`}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer-pad" style={{ background: "#060E1E", padding: "52px 60px 28px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="footer-inner" style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
            <div>
              <Logo height={32} />
              <p style={{ color: "#253650", fontSize: 12, marginTop: 10 }}>{t.footerSub}</p>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
              {t.footerLinks.map((l) => (
                <a key={l} href="#" style={{ color: "#253650", fontSize: 13, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color="#4DA3F5"}
                  onMouseLeave={e => e.target.style.color="#253650"}>{l}</a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[["LinkedIn","https://www.linkedin.com/in/agapecazel-call-center-a103773bb"],["Facebook","https://www.facebook.com/share/18PgV2ZUAC/"]].map(([name, href]) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#4DA3F5", fontSize: 12, border: "1px solid rgba(77,163,245,0.2)", padding: "7px 18px", borderRadius: 4 }}>{name}</a>
              ))}
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#162030", fontSize: 11, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, maxWidth: 1100, margin: "0 auto" }}>
            {t.footerCopy}
          </p>
        </footer>

      </div>
    </>
  );
}
