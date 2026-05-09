"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

// ── Translations ────────────────────────────────────────────────────────────
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
    eyebrowCountries: "Notre présence mondiale",
    titleCountries: "3 pays, une seule mission",
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
    eyebrowCountries: "Our global presence",
    titleCountries: "3 countries, one mission",
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

// ── Animated counter ────────────────────────────────────────────────────────
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

// ── Flag image ──────────────────────────────────────────────────────────────
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

// ── StatCard ────────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div style={s.statCard}>
      <span style={s.statNum}>{count}{suffix}</span>
      <span style={s.statLabel}>{label}</span>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang]               = useState("fr");
  const [scrolled, setScrolled]       = useState(false);
  const [statsStarted, setStats]      = useState(false);
  const [activeService, setActive]    = useState(null);
  const [menuOpen, setMenu]           = useState(false);
  const [form, setForm]               = useState({ nom: "", email: "", societe: "", message: "" });
  const [formState, setFormState]     = useState("idle");
  const statsRef = useRef(null);
  const t = T[lang];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
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
      const { data, error } = await supabase
        .from("contacts")
        .insert([{ nom: form.nom, email: form.email, societe: form.societe, message: form.message }]);
      console.log("DATA:", data, "ERROR:", error);
      if (error) throw error;
      setFormState("success");
      setForm({ nom: "", email: "", societe: "", message: "" });
    } catch (err) {
      console.error(err);
      setFormState("error");
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pillIn    { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        *{box-sizing:border-box;margin:0;padding:0}
        a{text-decoration:none}
        .nav-link:hover{color:#C8A96E!important}
        .service-card:hover{background:rgba(200,169,110,0.07)!important;border-color:rgba(200,169,110,0.4)!important;transform:translateY(-4px)!important}
        .country-card:hover{border-color:rgba(200,169,110,0.35)!important}
        .btn-primary:hover{opacity:0.86!important}
        .submit-btn:hover{opacity:0.88!important}
        input:focus,textarea:focus{border-color:rgba(200,169,110,0.5)!important;outline:none}
        /* Lang button */
        .lang-btn{background:transparent;border:2px solid transparent;border-radius:4px;cursor:pointer;padding:3px 3px 1px;transition:border-color 0.2s,transform 0.15s;display:inline-flex;align-items:center;line-height:1}
        .lang-btn:hover{transform:scale(1.1)}
        .lang-btn.active{border-color:#C8A96E}
        /* Hamburger — hidden on desktop */
        .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:4px}
        .hamburger span{display:block;width:22px;height:2px;background:#C8A96E;border-radius:2px;transition:transform 0.25s,opacity 0.25s}
        /* Mobile menu — hidden by default */
        .mobile-menu{display:none;position:fixed;top:62px;left:0;right:0;z-index:190;background:rgba(6,14,35,0.98);backdrop-filter:blur(14px);flex-direction:column;padding:18px 22px 26px;gap:2px;border-bottom:1px solid rgba(200,169,110,0.1);animation:slideDown 0.2s ease}
        .mobile-link{color:#8896B0;font-size:15px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05)}

        /* ── RESPONSIVE ── */
        @media(max-width:768px){
          .hamburger{display:flex!important}
          .desktop-nav{display:none!important}
          .mobile-menu.open{display:flex!important}
          .hero-section{padding:100px 22px 60px!important}
          .hero-title{font-size:46px!important}
          .hero-sub{font-size:14px!important}
          .stats-section{padding:44px 22px!important}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;gap:24px!important}
          .section-inner{padding:64px 22px!important}
          .services-grid{grid-template-columns:1fr 1fr!important;gap:12px!important}
          .countries-grid{grid-template-columns:repeat(3,1fr)!important;gap:10px!important}
          .why-grid{grid-template-columns:1fr!important;gap:32px!important}
          .form-row{grid-template-columns:1fr!important}
          .footer-inner{flex-direction:column!important;gap:18px!important}
          .footer-pad{padding:40px 22px 22px!important}
          .sec-title{font-size:34px!important;margin-bottom:28px!important}
          .nav-bar{padding:14px 20px!important}
        }
        @media(max-width:480px){
          .hero-title{font-size:36px!important}
          .services-grid{grid-template-columns:1fr!important}
          .countries-grid{grid-template-columns:1fr!important}
          .stat-num-span{font-size:44px!important}
        }
      `}</style>

      <div style={s.root}>

        {/* ── NAV ── */}
        <nav className="nav-bar" style={{ ...s.nav, background: scrolled ? "rgba(6,14,35,0.97)" : "transparent" }}>
          <span style={s.navLogo}>AGAPECAZEL</span>

          {/* Desktop links */}
          <div className="desktop-nav" style={s.navLinks}>
            {t.navLinks.map((l, i) => (
              <a key={l} href={`#${t.navAnchors[i]}`} className="nav-link" style={s.navLink}>{l}</a>
            ))}
            <a href="#contact" className="btn-primary" style={s.navCta}>{t.navCta}</a>
            <LangSwitcher lang={lang} setLang={setLang} size={28} />
          </div>

          {/* Mobile right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <LangSwitcher lang={lang} setLang={setLang} size={24} />
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
            <a key={l} href={`#${t.navAnchors[i]}`} className="mobile-link"
              onClick={() => setMenu(false)}>{l}</a>
          ))}
          <a href="#contact" className="btn-primary"
            style={{ ...s.btnPrimary, textAlign: "center", marginTop: 12 }}
            onClick={() => setMenu(false)}>{t.navCta}</a>
        </div>

        {/* ── HERO ── */}
        <section className="hero-section" style={s.hero}>
          <div style={s.heroGrid} />
          <div style={s.heroGlow1} />
          <div style={s.heroGlow2} />
          <div style={{ ...s.heroContent, animation: "fadeUp 0.85s ease both" }}>
            <p style={s.eyebrow}>{t.eyebrowHero}</p>
            <h1 className="hero-title" style={s.heroTitle}>
              {t.heroTitle1}<br />
              <span style={{ color: "#C8A96E" }}>{t.heroTitle2}</span>
            </h1>
            <p className="hero-sub" style={s.heroSub}>{t.heroSub}</p>
            <div style={s.heroCtas}>
              <a href="#contact" className="btn-primary" style={s.btnPrimary}>{t.heroCta1}</a>
              <a href="#services" style={s.btnSecondary}>{t.heroCta2}</a>
            </div>
          </div>
          <div style={s.pills}>
            {t.countries.map((c, i) => (
              <div key={c.name} style={{ ...s.pill, animation: `pillIn 0.5s ease ${i * 0.12}s both` }}>
                <Flag code={c.code} w={22} h={15} />
                <span style={{ fontSize: 13, color: "#C8A96E" }}>{c.name}</span>
              </div>
            ))}
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
            <p style={s.eyebrow}>{t.eyebrowServices}</p>
            <h2 className="sec-title" style={s.secTitle}>{t.titleServices}</h2>
            <div className="services-grid" style={s.servicesGrid}>
              {t.services.map((sv, i) => (
                <div key={sv.title} className="service-card"
                  style={{ ...s.serviceCard, ...(activeService === i ? s.serviceCardActive : {}) }}
                  onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 12 }}>{sv.icon}</span>
                  <h3 style={s.serviceTitle}>{sv.title}</h3>
                  <p style={s.serviceDesc}>{sv.desc}</p>
                  <span style={{ color: "#C8A96E", fontSize: 18 }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPLANTATIONS ── */}
        <section id="implantations" className="section-inner" style={{ ...s.section, background: "#0A1628" }}>
          <div style={s.inner}>
            <p style={s.eyebrow}>{t.eyebrowCountries}</p>
            <h2 className="sec-title" style={s.secTitle}>{t.titleCountries}</h2>
            <div className="countries-grid" style={s.countriesGrid}>
              {t.countries.map((c) => (
                <div key={c.name} className="country-card" style={s.countryCard}>
                  <Flag code={c.code} w={64} h={44} />
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 17, fontWeight: 600, color: "#F0E6D0" }}>{c.name}</p>
                  <p style={{ fontSize: 11, color: "#8896B0", letterSpacing: "0.05em" }}>{c.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section id="a-propos" className="section-inner" style={s.section}>
          <div className="why-grid" style={{ ...s.inner, display: "grid", gridTemplateColumns: "1fr 300px", gap: 60, alignItems: "center" }}>
            <div>
              <p style={s.eyebrow}>{t.eyebrowWhy}</p>
              <h2 className="sec-title" style={{ ...s.secTitle, whiteSpace: "pre-line" }}>{t.titleWhy}</h2>
              <p style={{ color: "#8896B0", lineHeight: 1.8, marginBottom: 22, fontSize: 15 }}>{t.whyDesc}</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11, marginBottom: 30 }}>
                {t.whyList.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "#8896B0", fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: "#C8A96E", fontSize: 7, marginTop: 7, flexShrink: 0 }}>◆</span>{item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary" style={s.btnPrimary}>{t.whyCta}</a>
            </div>
            <div>
              {t.whyCards.map((card) => (
                <div key={card.label} style={s.whyCard}>
                  <p style={{ color: "#C8A96E", fontSize: 11, letterSpacing: "0.12em", marginBottom: 6 }}>{card.label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 44, fontWeight: 700, color: "#F0E6D0", lineHeight: 1 }}>{card.value}</p>
                  <p style={{ fontSize: 12, color: "#8896B0", marginTop: 4 }}>{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section-inner" style={{ ...s.section, background: "#0A1628", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
          <div style={{ ...s.inner, maxWidth: 620 }}>
            <p style={{ ...s.eyebrow, textAlign: "center" }}>{t.eyebrowContact}</p>
            <h2 className="sec-title" style={{ ...s.secTitle, textAlign: "center", whiteSpace: "pre-line" }}>{t.titleContact}</h2>
            <p style={{ color: "#8896B0", textAlign: "center", fontSize: 15, lineHeight: 1.7, marginBottom: 32, marginTop: -14 }}>{t.contactSub}</p>

            {formState === "success" ? (
              <div style={s.successBox}>
                <span style={{ fontSize: 32 }}>✅</span>
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 24, color: "#F0E6D0" }}>{t.successTitle}</p>
                <p style={{ color: "#8896B0", fontSize: 14 }}>{t.successSub}</p>
                <button onClick={() => setFormState("idle")}
                  style={{ ...s.btnPrimary, marginTop: 8, border: "none", cursor: "pointer" }}>{t.successBtn}</button>
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
                {formState === "error" && <p style={{ color: "#E24B4A", fontSize: 13 }}>{t.formError}</p>}
                <button className="submit-btn" type="submit" disabled={formState === "loading"}
                  style={{ ...s.btnPrimary, border: "none", cursor: "pointer", opacity: formState === "loading" ? 0.6 : 1 }}>
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
              <p style={{ color: "#4A5568", fontSize: 12, marginTop: 6 }}>{t.footerSub}</p>
            </div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {t.footerLinks.map((l) => (
                <a key={l} href="#" style={{ color: "#4A5568", fontSize: 13 }}>{l}</a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="https://www.linkedin.com/in/agapecazel-call-center-a103773bb" target="_blank" rel="noopener noreferrer" style={s.socialLink}>LinkedIn</a>
              <a href="https://www.facebook.com/share/18PgV2ZUAC/" target="_blank" rel="noopener noreferrer" style={s.socialLink}>Facebook</a>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#2D3748", fontSize: 11, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, maxWidth: 1100, margin: "0 auto" }}>
            {t.footerCopy}
          </p>
        </footer>

      </div>
    </>
  );
}

// ── Language switcher component ─────────────────────────────────────────────
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

// ── Styles ──────────────────────────────────────────────────────────────────
const s = {
  root:        { fontFamily: "'DM Sans',sans-serif", background: "#060E23", color: "#F0E6D0", minHeight: "100vh", overflowX: "hidden" },
  nav:         { position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 60px", transition: "background 0.3s ease", backdropFilter: "blur(10px)" },
  navLogo:     { fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.2em", color: "#C8A96E" },
  navLinks:    { display: "flex", alignItems: "center", gap: 26 },
  navLink:     { color: "#8896B0", fontSize: 13, letterSpacing: "0.04em", transition: "color 0.2s" },
  navCta:      { background: "#C8A96E", color: "#060E23", padding: "9px 20px", borderRadius: 2, fontSize: 13, fontWeight: 500, letterSpacing: "0.06em" },
  hero:        { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 60px 80px", position: "relative", overflow: "hidden" },
  heroGrid:    { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)", backgroundSize: "56px 56px", pointerEvents: "none" },
  heroGlow1:   { position: "absolute", top: -180, right: -180, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)", pointerEvents: "none" },
  heroGlow2:   { position: "absolute", bottom: -100, left: -100, width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,58,110,0.28) 0%,transparent 70%)", pointerEvents: "none" },
  heroContent: { maxWidth: 680, position: "relative" },
  eyebrow:     { fontSize: 11, letterSpacing: "0.2em", color: "#C8A96E", textTransform: "uppercase", marginBottom: 18 },
  heroTitle:   { fontFamily: "'Cormorant Garamond',serif", fontSize: 74, fontWeight: 700, lineHeight: 1.05, color: "#F0E6D0", marginBottom: 24 },
  heroSub:     { fontSize: 16, color: "#8896B0", lineHeight: 1.75, maxWidth: 520, marginBottom: 36, fontWeight: 300 },
  heroCtas:    { display: "flex", gap: 12, flexWrap: "wrap" },
  btnPrimary:  { background: "#C8A96E", color: "#060E23", padding: "13px 26px", borderRadius: 2, fontSize: 13, fontWeight: 500, letterSpacing: "0.07em", display: "inline-block", transition: "opacity 0.2s" },
  btnSecondary:{ border: "1px solid rgba(200,169,110,.28)", color: "#C8A96E", padding: "13px 26px", borderRadius: 2, fontSize: 13, letterSpacing: "0.05em", display: "inline-block" },
  pills:       { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 44, position: "relative" },
  pill:        { display: "flex", alignItems: "center", gap: 8, background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.14)", padding: "7px 14px", borderRadius: 40 },
  stats:       { background: "#0A1628", borderTop: "1px solid rgba(200,169,110,0.1)", borderBottom: "1px solid rgba(200,169,110,0.1)", padding: "52px 60px" },
  statsGrid:   { maxWidth: 1060, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 },
  statCard:    { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  statNum:     { fontFamily: "'Cormorant Garamond',serif", fontSize: 54, fontWeight: 700, color: "#C8A96E", lineHeight: 1 },
  statLabel:   { fontSize: 12, color: "#8896B0", letterSpacing: "0.07em", textAlign: "center" },
  section:     { padding: "84px 60px" },
  inner:       { maxWidth: 1060, margin: "0 auto" },
  secTitle:    { fontFamily: "'Cormorant Garamond',serif", fontSize: 46, fontWeight: 700, color: "#F0E6D0", lineHeight: 1.1, marginBottom: 40 },
  servicesGrid:{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 },
  serviceCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,169,110,0.1)", borderRadius: 4, padding: "24px 20px", cursor: "pointer", transition: "all 0.25s ease" },
  serviceCardActive: { background: "rgba(200,169,110,0.07)", borderColor: "rgba(200,169,110,0.4)", transform: "translateY(-4px)" },
  serviceTitle:{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, fontWeight: 600, color: "#F0E6D0", marginBottom: 9 },
  serviceDesc: { fontSize: 13, color: "#8896B0", lineHeight: 1.7, marginBottom: 16 },
  countriesGrid:{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 },
  countryCard: { background: "rgba(200,169,110,0.04)", border: "1px solid rgba(200,169,110,0.12)", borderRadius: 4, padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", transition: "border-color 0.2s" },
  whyCard:     { background: "rgba(200,169,110,0.04)", border: "1px solid rgba(200,169,110,0.14)", borderRadius: 4, padding: "24px", marginBottom: 14 },
  form:        { display: "flex", flexDirection: "column", gap: 12 },
  input:       { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 2, padding: "13px 16px", color: "#F0E6D0", fontSize: 14, width: "100%", transition: "border-color 0.2s" },
  successBox:  { display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "40px 24px", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 4, textAlign: "center" },
  footer:      { background: "#030A18", padding: "48px 60px 28px", borderTop: "1px solid rgba(200,169,110,0.07)" },
  footerInner: { maxWidth: 1060, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24, marginBottom: 36 },
  socialLink:  { color: "#C8A96E", fontSize: 12, border: "1px solid rgba(200,169,110,.18)", padding: "5px 14px", borderRadius: 2 },
};
