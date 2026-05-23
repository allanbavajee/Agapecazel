"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// ── Translations ─────────────────────────────────────────────────────
const T = {
  fr: {
    navLinks:   ["Services", "Implantations", "À propos", "Carrières"],
    navAnchors: ["services", "implantations", "a-propos", "carrieres"],
    navCta: "Devis gratuit",
    eyebrowHero: "Centre d'appel · 14 ans d'excellence",
    heroTitle1: "Votre Succès,",
    heroTitle2: "commence ici.",
    heroSub: "Nous mettons en relation nos partenaires avec des prospects ciblés et qualifiés selon des critères précis afin d'optimiser leur taux de transformation.",
    heroCta1: "Demander un devis",
    heroCta2: "Découvrir nos services",
    stats: ["ans d'expérience", "pays d'implantation", "disponibilité"],
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
      { name: "Canada",      code: "ca", role: "Marché nord-américain" },
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
      { label: "SATISFACTION CLIENT", value: "98%", sub: "taux de satisfaction moyen" },
      { label: "LANGUES COUVERTES",   value: "2",   sub: "Français, Anglais" },
    ],
    eyebrowContact: "Prêt à démarrer ?",
    titleContact:   "Obtenez votre devis\nen 24 heures",
    contactSub: "Décrivez-nous vos besoins et notre équipe vous recontacte sous 24h avec une proposition sur mesure.",
    formNom: "Votre nom", formEmail: "Email professionnel",
    formSociete: "Société", formMessage: "Décrivez votre besoin…",
    formError: "Une erreur s'est produite. Veuillez réessayer.",
    formBtn: "Envoyer la demande →", formLoading: "Envoi en cours…",
    successTitle: "Message envoyé !",
    successSub: "Notre équipe vous contacte sous 24h.",
    successBtn: "Envoyer une autre demande",
    footerLinks: ["Services", "Implantations", "À propos", "Carrières", "Contact"],
    footerSub:  "Centre d'appel international · Depuis 2012",
    footerCopy: "© 2025 Agapecazel. Tous droits réservés.",
  },
  en: {
    navLinks:   ["Services", "Locations", "About", "Careers"],
    navAnchors: ["services", "implantations", "a-propos", "carrieres"],
    navCta: "Free Quote",
    eyebrowHero: "International call centre · 14 years of excellence",
    heroTitle1: "Your Success,",
    heroTitle2: "starts here.",
    heroSub: "We connect our partners with targeted and qualified prospects based on precise criteria to optimise their conversion rate.",
    heroCta1: "Request a quote",
    heroCta2: "Discover our services",
    stats: ["years of experience", "countries", "availability"],
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
      { name: "Canada",    code: "ca", role: "North American market" },
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
      { label: "CLIENT SATISFACTION", value: "98%", sub: "average satisfaction rate" },
      { label: "LANGUAGES COVERED",  value: "2",   sub: "French, English" },
    ],
    eyebrowContact: "Ready to start?",
    titleContact:   "Get your quote\nwithin 24 hours",
    contactSub: "Tell us about your needs and our team will get back to you within 24h with a tailored proposal.",
    formNom: "Your name", formEmail: "Business email",
    formSociete: "Company", formMessage: "Describe your need…",
    formError: "An error occurred. Please try again.",
    formBtn: "Send request →", formLoading: "Sending…",
    successTitle: "Message sent!",
    successSub: "Our team will contact you within 24h.",
    successBtn: "Send another request",
    footerLinks: ["Services", "Locations", "About", "Careers", "Contact"],
    footerSub:  "International call centre · Since 2012",
    footerCopy: "© 2025 Agapecazel. All rights reserved.",
  },
};

// ── 3 stats: 14 ans, 4 pays, 7/7 ────────────────────────────────────
const STATS_VALUES = [
  { value: 14, suffix: "+" },
  { value: 4,  suffix: ""  },
  { value: 7,  suffix: "/7"},
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
    <div style={s.statCard}>
      <span style={s.statNum}>{count}{suffix}</span>
      <span style={s.statLabel}>{label}</span>
    </div>
  );
}

function LangSwitcher({ lang, setLang, size = 28 }) {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <button
        className={`lang-btn${lang === "fr" ? " active" : ""}`}
        onClick={() => setLang("fr")}
        title="Français"
      >
        <Flag code="fr" w={size} h={Math.round(size * 0.67)} />
      </button>
      <button
        className={`lang-btn${lang === "en" ? " active" : ""}`}
        onClick={() => setLang("en")}
        title="English"
      >
        <Flag code="gb" w={size} h={Math.round(size * 0.67)} />
      </button>
    </div>
  );
}

function HomeComponent() {
  const [lang, setLang]            = useState("fr");
  const [mounted, setMounted]      = useState(false);
  const [scrolled, setScrolled]    = useState(false);
  const [statsStarted, setStats]   = useState(false);
  const [activeService, setActive] = useState(null);
  const [menuOpen, setMenu]        = useState(false);
  const [form, setForm]            = useState({ nom: "", email: "", societe: "", message: "" });
  const [formState, setFormState]  = useState("idle");
  const statsRef = useRef(null);
  const t = T[lang];

  useEffect(() => {
    setMounted(true);
    // Fallback : démarre les compteurs après 800 ms si l'observer ne se déclenche pas
    const timer = setTimeout(() => setStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStats(true); },
      { threshold: 0.3 }
    );
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
      if (!res.ok) throw new Error("Formspree error");
      setFormState("success");
      setForm({ nom: "", email: "", societe: "", message: "" });
    } catch {
      setFormState("error");
    }
  }

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}

        :root {
          --gold:       #C8A650;
          --gold-light: #F0E4B8;
          --gold-dark:  #9A7C30;
          --navy:       #0D2B5E;
          --navy-mid:   #1A3F80;
          --navy-light: #E8EEF8;
          --white:      #FFFFFF;
          --off-white:  #F7F5F0;
          --text-main:  #0D2B5E;
          --text-muted: #6B7A99;
          --border:     rgba(13,43,94,0.12);
          --border-gold:rgba(200,166,80,0.35);
        }

        .nav-link:hover{color:var(--gold)!important}
        .service-card:hover{
          border-color:var(--gold)!important;
          box-shadow:0 8px 32px rgba(200,166,80,0.15)!important;
          transform:translateY(-4px)!important;
        }
        .country-card:hover{border-color:var(--gold)!important;box-shadow:0 4px 20px rgba(200,166,80,0.12)!important}
        .btn-primary:hover{background:var(--navy-mid)!important;color:#fff!important}
        .btn-gold:hover{opacity:0.88!important}
        .submit-btn:hover{opacity:0.88!important}
        input:focus,textarea:focus{border-color:var(--gold)!important;outline:none;box-shadow:0 0 0 3px rgba(200,166,80,0.12)!important}

        .lang-btn{background:transparent;border:2px solid transparent;border-radius:4px;cursor:pointer;padding:3px 3px 1px;transition:border-color 0.2s,transform 0.15s;display:inline-flex;align-items:center;line-height:1}
        .lang-btn:hover{transform:scale(1.1)}
        .lang-btn.active{border-color:var(--gold)}

        .mobile-lang{display:none}
        .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
        .hamburger span{display:block;width:22px;height:2px;background:var(--navy);border-radius:2px;transition:transform 0.25s,opacity 0.25s}
        .mobile-menu{display:none;position:relative;left:0;right:0;z-index:190;background:#fff;flex-direction:column;padding:18px 22px 26px;gap:2px;border-bottom:1px solid var(--border);box-shadow:0 8px 24px rgba(13,43,94,0.1);animation:slideDown 0.2s ease}
        .mobile-link{color:var(--text-muted);font-size:15px;padding:12px 0;border-bottom:1px solid var(--border)}

        .gold-line::before{content:'';display:block;width:40px;height:3px;background:var(--gold);margin-bottom:12px;border-radius:2px}

        .hero-img{transition:transform 0.6s ease}
        .hero-img:hover{transform:scale(1.03)}

        .why-photo{transition:transform 0.4s ease,box-shadow 0.4s ease}
        .why-photo:hover{transform:scale(1.02);box-shadow:0 12px 40px rgba(13,43,94,0.2)!important}

        @media(max-width:768px){
          .hamburger{display:flex!important}
          .hero-agapecazel { font-size: 44px !important; }
          .desktop-nav{display:none!important}
          .mobile-lang{display:block!important}
          .mobile-menu.open{display:flex!important}
          .hero-section{flex-direction:column!important;min-height:auto!important}
          .hero-text-col{padding:48px 22px 40px!important}
          .hero-img-col{min-height:280px!important;flex:none!important;width:100%!important}
          .hero-title{font-size:44px!important}
          .hero-sub{font-size:14px!important}
          .stats-section{padding:28px 22px!important}
          .stats-grid{grid-template-columns:repeat(3,1fr)!important;gap:16px!important}
          .section-inner{padding:48px 22px!important}
          .services-grid{grid-template-columns:1fr 1fr!important;gap:12px!important}
          .countries-grid{grid-template-columns:repeat(2,1fr)!important;gap:10px!important}
          .why-grid{grid-template-columns:1fr!important;gap:32px!important}
          .why-photos-col{flex-direction:row!important}
          .why-photos-col > div{flex:1!important}
          .form-row{grid-template-columns:1fr!important}
          .footer-inner{flex-direction:column!important;gap:18px!important}
          .footer-pad{padding:40px 22px 22px!important}
          .sec-title{font-size:32px!important;margin-bottom:24px!important}
          .nav-bar{padding:8px 20px!important}
        }
        @media(max-width:480px){
          .hero-title{font-size:34px!important}
          .hero-agapecazel { font-size: 34px !important; }
          .services-grid{grid-template-columns:1fr!important}
          .countries-grid{grid-template-columns:1fr!important}
          .why-photos-col{flex-direction:column!important}
          .stats-grid{grid-template-columns:repeat(3,1fr)!important;gap:8px!important}
        }
      `}</style>

      <div style={s.root}>

        {/* ── NAV ── */}
        <nav
          className="nav-bar"
          style={{
            ...s.nav,
            boxShadow: scrolled ? "0 2px 20px rgba(13,43,94,0.10)" : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          <a href="#">
            <img src="/logoAG.png" alt="AgapeCazel" style={{ height: 150, width: "auto", display: "block" }} />
          </a>

          <div className="desktop-nav" style={s.navLinks}>
            {t.navLinks.map((l, i) => (
              <a key={l} href={`#${t.navAnchors[i]}`} className="nav-link" style={s.navLink}>{l}</a>
            ))}
            <a href="#contact" className="btn-gold" style={s.navCta}>{t.navCta}</a>
            <LangSwitcher lang={lang} setLang={setLang} size={28} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="mobile-lang">
              <LangSwitcher lang={lang} setLang={setLang} size={24} />
            </div>
            <button className="hamburger" onClick={() => setMenu(!menuOpen)} aria-label="Menu">
              <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
          {t.navLinks.map((l, i) => (
            <a key={l} href={`#${t.navAnchors[i]}`} className="mobile-link" onClick={() => setMenu(false)}>{l}</a>
          ))}
          <a href="#contact" className="btn-gold"
            style={{ ...s.btnGold, textAlign: "center", marginTop: 12 }}
            onClick={() => setMenu(false)}>{t.navCta}</a>
        </div>

        {/* ── HERO ── */}
        <section
          className="hero-section"
          style={{
            display: "flex",
            flexDirection: "row",
            minHeight: "90vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Colonne texte */}
          <div
            className="hero-text-col"
            style={{
              flex: "1 1 55%",
              padding: "60px 60px 60px 60px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              background: "#F7F5F0",
              overflow: "hidden",
            }}
          >
            <div style={s.heroPattern} />
            <div style={s.heroAccentBar} />
            <div style={s.heroGlow} />

            <div style={{ ...s.heroContent, animation: "fadeUp 0.85s ease both", position: "relative" }}>
              <p className="hero-agapecazel" style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 72, fontWeight: 700, color: "#0D2B5E", lineHeight: 1.05, marginBottom: 0 }}>AGAPECAZEL</p>
              <p style={s.eyebrow} className="gold-line">{t.eyebrowHero}</p>
              <h1 className="hero-title" style={s.heroTitle}>
                {t.heroTitle1}<br />
                <span style={{ color: "var(--gold)" }}>{t.heroTitle2}</span>
              </h1>
              <p className="hero-sub" style={s.heroSub}>{t.heroSub}</p>
              <div style={s.heroCtas}>
                <a href="#contact" className="btn-primary" style={s.btnPrimary}>{t.heroCta1}</a>
                <a href="#services" style={s.btnSecondary}>{t.heroCta2}</a>
              </div>
            </div>
          </div>

          {/* Colonne image */}
          <div
            className="hero-img-col"
            style={{
              flex: "1 1 45%",
              position: "relative",
              minHeight: 480,
              overflow: "hidden",
            }}
          >
            <img
              src="/agapeazel4.png"
              alt="Agent centre d'appel AgapeCazel"
              className="hero-img"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to right, rgba(247,245,240,0.45) 0%, transparent 35%)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              bottom: 32,
              left: 24,
              background: "rgba(13,43,94,0.92)",
              borderLeft: "4px solid #C8A650",
              padding: "14px 20px",
              borderRadius: 3,
              backdropFilter: "blur(6px)",
            }}>
              <p style={{ color: "#C8A650", fontSize: 11, letterSpacing: "0.12em", marginBottom: 4 }}>
                CENTRE D'APPEL
              </p>
              <p style={{ color: "#fff", fontSize: 15, fontFamily: "'Cormorant Garamond',serif", fontWeight: 600 }}>
                Île Maurice · Depuis 2012
              </p>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section ref={statsRef} className="stats-section" style={s.stats}>
          <div className="stats-grid" style={s.statsGrid}>
            {STATS_VALUES.map((st, i) => (
              <StatCard key={i} value={st.value} suffix={st.suffix} label={t.stats[i]} started={statsStarted} />
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="section-inner" style={s.section}>
          <div style={s.inner}>
            <p style={s.eyebrow} className="gold-line">{t.eyebrowServices}</p>
            <h2 className="sec-title" style={s.secTitle}>{t.titleServices}</h2>
            <div className="services-grid" style={s.servicesGrid}>
              {t.services.map((sv, i) => (
                <div key={sv.title} className="service-card"
                  style={{ ...s.serviceCard, ...(activeService === i ? s.serviceCardActive : {}) }}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                  <div style={{ height: 3, background: activeService === i ? "var(--gold)" : "var(--gold-light)", borderRadius: "2px 2px 0 0", margin: "-24px -20px 20px" }} />
                  <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{sv.icon}</span>
                  <h3 style={s.serviceTitle}>{sv.title}</h3>
                  <p style={s.serviceDesc}>{sv.desc}</p>
                  <span style={{ color: "var(--gold)", fontSize: 18 }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPLANTATIONS ── */}
        <section id="implantations" className="section-inner" style={{ ...s.section, background: "var(--navy-light)" }}>
          <div style={s.inner}>
            <p style={s.eyebrow} className="gold-line">{t.eyebrowCountries}</p>
            <h2 className="sec-title" style={s.secTitle}>{t.titleCountries}</h2>
            <div className="countries-grid" style={s.countriesGrid}>
              {t.countries.map((c) => (
                <div key={c.name} className="country-card" style={s.countryCard}>
                  <Flag code={c.code} w={64} h={44} />
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 18, fontWeight: 600, color: "var(--navy)" }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.05em" }}>{c.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section id="a-propos" className="section-inner" style={s.section}>
          <div
            className="why-grid"
            style={{
              ...s.inner,
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 60,
              alignItems: "center",
            }}
          >
            <div>
              <p style={s.eyebrow} className="gold-line">{t.eyebrowWhy}</p>
              <h2 className="sec-title" style={{ ...s.secTitle, whiteSpace: "pre-line" }}>{t.titleWhy}</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 22, fontSize: 15 }}>{t.whyDesc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 30 }}>
                {t.whyList.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: "var(--gold)", fontSize: 7, marginTop: 7, flexShrink: 0 }}>◆</span>{item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary" style={s.btnPrimary}>{t.whyCta}</a>
            </div>

            <div className="why-photos-col" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="why-photo" style={{ position: "relative", borderRadius: 4, overflow: "hidden", boxShadow: "0 6px 28px rgba(13,43,94,0.13)" }}>
                <img src="/agapeazel5.png" alt="Équipe AgapeCazel"
                  style={{ width: "100%", height: 190, objectFit: "cover", objectPosition: "center top", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,43,94,0.3) 0%, transparent 55%)", pointerEvents: "none" }} />
                <p style={{ position: "absolute", bottom: 10, left: 12, color: "#fff", fontSize: 11, letterSpacing: "0.1em", fontWeight: 500 }}>NOTRE ÉQUIPE</p>
              </div>

              <div className="why-photo" style={{ position: "relative", borderRadius: 4, overflow: "hidden", boxShadow: "0 6px 28px rgba(13,43,94,0.13)" }}>
                <img src="/agapeazel6.png" alt="Conseiller AgapeCazel"
                  style={{ width: "100%", height: 190, objectFit: "cover", objectPosition: "center top", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,43,94,0.3) 0%, transparent 55%)", pointerEvents: "none" }} />
                <p style={{ position: "absolute", bottom: 10, left: 12, color: "#fff", fontSize: 11, letterSpacing: "0.1em", fontWeight: 500 }}>NOS CONSEILLERS</p>
              </div>

              {t.whyCards.map((card) => (
                <div key={card.label} style={s.whyCard}>
                  <p style={{ color: "var(--gold-dark)", fontSize: 11, letterSpacing: "0.12em", marginBottom: 6 }}>{card.label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 700, color: "var(--navy)", lineHeight: 1 }}>{card.value}</p>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section-inner" style={{ ...s.section, background: "var(--navy)" }}>
          <div style={{ ...s.inner, maxWidth: 620 }}>
            <p style={{ ...s.eyebrow, textAlign: "center", color: "var(--gold)" }}>{t.eyebrowContact}</p>
            <h2 className="sec-title" style={{ ...s.secTitle, textAlign: "center", whiteSpace: "pre-line", color: "#fff" }}>{t.titleContact}</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", textAlign: "center", fontSize: 15, lineHeight: 1.7, marginBottom: 32, marginTop: -14 }}>{t.contactSub}</p>

            {formState === "success" ? (
              <div style={s.successBox}>
                <span style={{ fontSize: 32 }}>✅</span>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#fff" }}>{t.successTitle}</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>{t.successSub}</p>
                <button onClick={() => setFormState("idle")}
                  style={{ ...s.btnGold, marginTop: 8, border: "none", cursor: "pointer" }}>{t.successBtn}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={s.form}>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input style={s.input} placeholder={t.formNom} required
                    value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                  <input style={s.input} type="email" placeholder={t.formEmail} required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <input style={s.input} placeholder={t.formSociete}
                  value={form.societe} onChange={(e) => setForm({ ...form, societe: e.target.value })} />
                <textarea style={{ ...s.input, resize: "vertical" }} rows={4} placeholder={t.formMessage} required
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {formState === "error" && <p style={{ color: "#F4855A", fontSize: 13 }}>{t.formError}</p>}
                <button className="submit-btn btn-gold" type="submit" disabled={formState === "loading"}
                  style={{ ...s.btnGold, border: "none", cursor: "pointer", opacity: formState === "loading" ? 0.6 : 1 }}>
                  {formState === "loading" ? t.formLoading : t.formBtn}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="footer-pad" style={s.footer}>
          <div className="footer-inner" style={s.footerInner}>
            <div>
              <p style={s.navLogo}>AGAPECAZEL</p>
              <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 6 }}>Centre d'appel international · Depuis 2012</p>
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {t.footerLinks.map((l) => (
                <a key={l} href="#" style={{ color: "var(--text-muted)", fontSize: 13, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >{l}</a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="https://www.linkedin.com/in/agapecazel-call-center-a103773bb" target="_blank" rel="noopener noreferrer" style={s.socialLink}>LinkedIn</a>
              <a href="https://www.facebook.com/share/18PgV2ZUAC/" target="_blank" rel="noopener noreferrer" style={s.socialLink}>Facebook</a>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "var(--text-muted)", fontSize: 11, borderTop: "1px solid var(--border)", paddingTop: 20, maxWidth: 1100, margin: "0 auto" }}>
            {t.footerCopy}
          </p>
        </footer>

      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(HomeComponent), { ssr: false });

// ── Styles ──────────────────────────────────────────────────────────────────
const s = {
  root: {
    fontFamily: "'DM Sans',sans-serif",
    background: "#FFFFFF",
    color: "#0D2B5E",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 200,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 60px",
    background: "#FFFFFF",
    borderBottom: "1px solid rgba(13,43,94,0.08)",
  },
  navLinks: { display: "flex", alignItems: "center", gap: 26 },
  navLink:  { color: "#6B7A99", fontSize: 13, letterSpacing: "0.04em", transition: "color 0.2s" },
  navCta:   {
    background: "#C8A650",
    color: "#fff",
    padding: "9px 20px",
    borderRadius: 2,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.06em",
    transition: "opacity 0.2s",
  },
  navLogo: { fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 700, color: "#0D2B5E", letterSpacing: "0.12em" },
  heroPattern: {
    position: "absolute",
    inset: 0,
    backgroundImage: "repeating-linear-gradient(45deg, rgba(13,43,94,0.025) 0, rgba(13,43,94,0.025) 1px, transparent 0, transparent 50%)",
    backgroundSize: "28px 28px",
    pointerEvents: "none",
  },
  heroAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 6,
    height: "100%",
    background: "linear-gradient(180deg, #0D2B5E 0%, #C8A650 100%)",
    pointerEvents: "none",
  },
  heroGlow: {
    position: "absolute",
    bottom: -80,
    right: -80,
    width: 480,
    height: 480,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(200,166,80,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroContent: { maxWidth: 680 },
  eyebrow: {
    fontSize: 11,
    letterSpacing: "0.2em",
    color: "#9A7C30",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 72,
    fontWeight: 700,
    lineHeight: 1.05,
    color: "#0D2B5E",
    marginBottom: 16,
  },
  heroSub: {
    fontSize: 16,
    color: "#6B7A99",
    lineHeight: 1.75,
    maxWidth: 520,
    marginBottom: 28,
    fontWeight: 300,
  },
  heroCtas: { display: "flex", gap: 12, flexWrap: "wrap" },
  btnPrimary: {
    background: "#0D2B5E",
    color: "#FFFFFF",
    padding: "13px 26px",
    borderRadius: 2,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.07em",
    display: "inline-block",
    transition: "background 0.2s, color 0.2s",
  },
  btnGold: {
    background: "#C8A650",
    color: "#FFFFFF",
    padding: "13px 26px",
    borderRadius: 2,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.07em",
    display: "inline-block",
    transition: "opacity 0.2s",
  },
  btnSecondary: {
    border: "1.5px solid rgba(13,43,94,0.25)",
    color: "#0D2B5E",
    padding: "13px 26px",
    borderRadius: 2,
    fontSize: 13,
    letterSpacing: "0.05em",
    display: "inline-block",
    transition: "border-color 0.2s",
  },
  stats: {
    background: "#0D2B5E",
    padding: "36px 60px",
  },
  statsGrid: {
    maxWidth: 860,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 28,
  },
  statCard:  { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  statNum:   { fontFamily: "'Cormorant Garamond',serif", fontSize: 54, fontWeight: 700, color: "#C8A650", lineHeight: 1 },
  statLabel: { fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: "0.07em", textAlign: "center" },
  section: { padding: "64px 60px", background: "#FFFFFF" },
  inner:   { maxWidth: 1060, margin: "0 auto" },
  secTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 44,
    fontWeight: 700,
    color: "#0D2B5E",
    lineHeight: 1.1,
    marginBottom: 32,
  },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 },
  serviceCard: {
    background: "#FFFFFF",
    border: "1px solid rgba(13,43,94,0.1)",
    borderRadius: 4,
    padding: "24px 20px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 2px 12px rgba(13,43,94,0.05)",
  },
  serviceCardActive: {
    border: "1px solid #C8A650",
    boxShadow: "0 8px 32px rgba(200,166,80,0.15)",
    transform: "translateY(-4px)",
  },
  serviceTitle: {
    fontFamily: "'Cormorant Garamond',serif",
    fontSize: 19,
    fontWeight: 600,
    color: "#0D2B5E",
    marginBottom: 9,
  },
  serviceDesc: { fontSize: 13, color: "#6B7A99", lineHeight: 1.7, marginBottom: 16 },
  countriesGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 },
  countryCard: {
    background: "#FFFFFF",
    border: "1px solid rgba(13,43,94,0.1)",
    borderRadius: 4,
    padding: "28px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    textAlign: "center",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: "0 2px 12px rgba(13,43,94,0.04)",
  },
  whyCard: {
    background: "#F7F5F0",
    border: "1px solid rgba(200,166,80,0.25)",
    borderLeft: "4px solid #C8A650",
    borderRadius: 4,
    padding: "24px",
  },
  form:  { display: "flex", flexDirection: "column", gap: 12 },
  input: {
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 2,
    padding: "13px 16px",
    color: "#FFFFFF",
    fontSize: 14,
    width: "100%",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  successBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: "40px 24px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(200,166,80,0.3)",
    borderRadius: 4,
    textAlign: "center",
  },
  footer: {
    background: "#F7F5F0",
    padding: "48px 60px 28px",
    borderTop: "1px solid rgba(13,43,94,0.08)",
  },
  footerInner: {
    maxWidth: 1060,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 24,
    marginBottom: 36,
  },
  socialLink: {
    color: "#0D2B5E",
    fontSize: 12,
    border: "1px solid rgba(13,43,94,0.2)",
    padding: "5px 14px",
    borderRadius: 2,
    transition: "border-color 0.2s, color 0.2s",
  },
};
