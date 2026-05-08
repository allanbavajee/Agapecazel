"use client";

import { useEffect, useRef, useState } from "react";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

// ── Stats data ─────────────────────────────────────────────────────────────
const STATS = [
  { value: 15, suffix: "+", label: "ans d'expérience" },
  { value: 6,  suffix: "",  label: "pays d'implantation" },
  { value: 500,suffix: "+", label: "collaborateurs" },
  { value: 24, suffix: "/7",label: "disponibilité" },
];

// ── Countries ──────────────────────────────────────────────────────────────
const COUNTRIES = [
  { name: "Île Maurice",  flag: "🇲🇺", role: "Siège régional" },
  { name: "Tunisie",      flag: "🇹🇳", role: "Hub Maghreb" },
  { name: "Madagascar",   flag: "🇲🇬", role: "Centre opérationnel" },
  { name: "Cameroun",     flag: "🇨🇲", role: "Hub Afrique centrale" },
  { name: "Nigeria",      flag: "🇳🇬", role: "Hub Afrique de l'ouest" },
];

// ── Services ───────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "📞",
    title: "Réception d'appels",
    desc: "Accueil téléphonique professionnel, gestion des demandes et orientation client 24h/24.",
  },
  {
    icon: "🎯",
    title: "Téléprospection",
    desc: "Campagnes outbound ciblées, qualification de leads et prise de rendez-vous.",
  },
  {
    icon: "🛠️",
    title: "Support client",
    desc: "Assistance technique et SAV multicanal pour fidéliser vos clients.",
  },
  {
    icon: "📋",
    title: "Back-office",
    desc: "Traitement des données, saisie, gestion administrative et suivi dossiers.",
  },
];

// ── StatCard ───────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div style={styles.statCard}>
      <span style={styles.statNumber}>
        {count}{suffix}
      </span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function AgapecazelHome() {
  const [statsStarted, setStatsStarted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={styles.root}>
      {/* ── NAV ── */}
      <nav style={{ ...styles.nav, background: scrollY > 60 ? "rgba(6,14,35,0.97)" : "transparent" }}>
        <span style={styles.navLogo}>AGAPECAZEL</span>
        <div style={styles.navLinks}>
          {["Services", "Implantations", "À propos", "Carrières"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={styles.navLink}>{l}</a>
          ))}
          <a href="#contact" style={styles.navCta}>Devis gratuit</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        {/* geometric background shapes */}
        <div style={styles.heroBgCircle1} />
        <div style={styles.heroBgCircle2} />
        <div style={styles.heroGrid} />

        <div style={styles.heroContent}>
          <p style={styles.heroEyebrow}>Centre d'appel international · 15 ans d'excellence</p>
          <h1 style={styles.heroTitle}>
            Votre voix,<br />
            <span style={styles.heroGold}>notre expertise.</span>
          </h1>
          <p style={styles.heroSub}>
            Agapecazel connecte les entreprises du monde entier à des équipes expertes
            implantées au cœur de l'Afrique et de l'océan Indien.
          </p>
          <div style={styles.heroCtas}>
            <a href="#contact" style={styles.ctaPrimary}>Demander un devis</a>
            <a href="#services" style={styles.ctaSecondary}>Découvrir nos services</a>
          </div>
        </div>

        {/* floating country pills */}
        <div style={styles.heroCountries}>
          {COUNTRIES.map((c, i) => (
            <div key={c.name} style={{ ...styles.countryPill, animationDelay: `${i * 0.15}s` }}>
              <span>{c.flag}</span>
              <span style={{ fontSize: 13, color: "#C8A96E" }}>{c.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section ref={statsRef} style={styles.statsSection}>
        <div style={styles.statsInner}>
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} started={statsStarted} />
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={styles.section}>
        <div style={styles.sectionInner}>
          <p style={styles.sectionEyebrow}>Ce que nous faisons</p>
          <h2 style={styles.sectionTitle}>Nos prestations</h2>
          <div style={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                style={{
                  ...styles.serviceCard,
                  ...(activeService === i ? styles.serviceCardActive : {}),
                }}
                onMouseEnter={() => setActiveService(i)}
                onMouseLeave={() => setActiveService(null)}
              >
                <span style={styles.serviceIcon}>{s.icon}</span>
                <h3 style={styles.serviceTitle}>{s.title}</h3>
                <p style={styles.serviceDesc}>{s.desc}</p>
                <span style={styles.serviceArrow}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTRIES ── */}
      <section id="implantations" style={styles.countriesSection}>
        <div style={styles.sectionInner}>
          <p style={styles.sectionEyebrow}>Notre présence mondiale</p>
          <h2 style={{ ...styles.sectionTitle, color: "#F0E6D0" }}>
            6 pays, une seule mission
          </h2>
          <div style={styles.countriesGrid}>
            {COUNTRIES.map((c) => (
              <div key={c.name} style={styles.countryCard}>
                <span style={{ fontSize: 40 }}>{c.flag}</span>
                <p style={styles.countryName}>{c.name}</p>
                <p style={styles.countryRole}>{c.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={styles.section}>
        <div style={styles.whyInner}>
          <div style={styles.whyText}>
            <p style={styles.sectionEyebrow}>Pourquoi Agapecazel</p>
            <h2 style={styles.sectionTitle}>L'expertise africaine<br />au service de vos clients</h2>
            <p style={{ color: "#8896B0", lineHeight: 1.8, marginBottom: 32 }}>
              Depuis plus de 15 ans, nous accompagnons des entreprises en France, en Europe
              et à l'international avec des équipes multilingues, formées aux standards les plus
              exigeants de la relation client.
            </p>
            <ul style={styles.whyList}>
              {[
                "Équipes francophones, anglophones et arabophones",
                "Tarifs compétitifs, qualité premium",
                "Technologie de pointe & reporting en temps réel",
                "Flexibilité : scale-up rapide selon vos besoins",
              ].map((item) => (
                <li key={item} style={styles.whyItem}>
                  <span style={styles.whyDot}>◆</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" style={styles.ctaPrimary}>Parlons de votre projet</a>
          </div>
          <div style={styles.whyVisual}>
            <div style={styles.whyCard}>
              <p style={{ color: "#C8A96E", fontSize: 13, letterSpacing: "0.1em", marginBottom: 8 }}>SATISFACTION CLIENT</p>
              <p style={{ fontSize: 48, fontWeight: 700, color: "#F0E6D0", margin: "0 0 4px" }}>98%</p>
              <p style={{ color: "#8896B0", fontSize: 14 }}>taux de satisfaction moyen</p>
            </div>
            <div style={{ ...styles.whyCard, marginTop: 16 }}>
              <p style={{ color: "#C8A96E", fontSize: 13, letterSpacing: "0.1em", marginBottom: 8 }}>LANGUES COUVERTES</p>
              <p style={{ fontSize: 48, fontWeight: 700, color: "#F0E6D0", margin: "0 0 4px" }}>8+</p>
              <p style={{ color: "#8896B0", fontSize: 14 }}>français, anglais, arabe, malgache…</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section id="contact" style={styles.ctaSection}>
        <div style={styles.ctaInner}>
          <p style={styles.sectionEyebrow}>Prêt à démarrer ?</p>
          <h2 style={{ ...styles.sectionTitle, color: "#F0E6D0", textAlign: "center" }}>
            Obtenez votre devis<br />en 24 heures
          </h2>
          <p style={{ color: "#8896B0", textAlign: "center", maxWidth: 480, margin: "0 auto 40px" }}>
            Décrivez-nous vos besoins et notre équipe vous recontacte sous 24h avec une proposition sur mesure.
          </p>
          <form style={styles.contactForm} onSubmit={(e) => e.preventDefault()}>
            <div style={styles.formRow}>
              <input style={styles.input} placeholder="Votre nom" type="text" required />
              <input style={styles.input} placeholder="Email professionnel" type="email" required />
            </div>
            <input style={{ ...styles.input, width: "100%", boxSizing: "border-box" }} placeholder="Société" type="text" />
            <textarea style={styles.textarea} placeholder="Décrivez votre besoin…" rows={4} />
            <button style={styles.submitBtn} type="submit">Envoyer la demande →</button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>
            <p style={styles.footerLogo}>AGAPECAZEL</p>
            <p style={{ color: "#4A5568", fontSize: 13, marginTop: 6 }}>
              Centre d'appel international · Depuis 2009
            </p>
          </div>
          <div style={styles.footerLinks}>
            {["Services", "Implantations", "À propos", "Carrières", "Contact"].map((l) => (
              <a key={l} href="#" style={styles.footerLink}>{l}</a>
            ))}
          </div>
          <div style={styles.footerSocials}>
            <a href="https://linkedin.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://facebook.com" style={styles.socialLink} target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
        <p style={styles.footerCopy}>© 2025 Agapecazel. Tous droits réservés.</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #060E23; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pillFloat {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        a { text-decoration: none; }
      `}</style>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#060E23",
    color: "#F0E6D0",
    minHeight: "100vh",
    overflowX: "hidden",
  },

  // NAV
  nav: {
    position: "fixed",
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 60px",
    transition: "background 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  navLogo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#C8A96E",
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: 36,
  },
  navLink: {
    color: "#8896B0",
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.05em",
    transition: "color 0.2s",
  },
  navCta: {
    background: "#C8A96E",
    color: "#060E23",
    padding: "10px 24px",
    borderRadius: 2,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "0.08em",
  },

  // HERO
  hero: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "120px 60px 80px",
    position: "relative",
    overflow: "hidden",
  },
  heroBgCircle1: {
    position: "absolute",
    top: -200,
    right: -200,
    width: 700,
    height: 700,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroBgCircle2: {
    position: "absolute",
    bottom: -100,
    left: -100,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(26,58,110,0.3) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.04) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    pointerEvents: "none",
  },
  heroContent: {
    maxWidth: 720,
    animation: "fadeUp 0.9s ease both",
  },
  heroEyebrow: {
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#C8A96E",
    textTransform: "uppercase",
    marginBottom: 24,
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 80,
    fontWeight: 700,
    lineHeight: 1.05,
    color: "#F0E6D0",
    marginBottom: 28,
  },
  heroGold: {
    color: "#C8A96E",
  },
  heroSub: {
    fontSize: 17,
    color: "#8896B0",
    lineHeight: 1.7,
    maxWidth: 560,
    marginBottom: 44,
    fontWeight: 300,
  },
  heroCtas: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },
  ctaPrimary: {
    background: "#C8A96E",
    color: "#060E23",
    padding: "14px 32px",
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.08em",
    display: "inline-block",
    transition: "opacity 0.2s",
  },
  ctaSecondary: {
    border: "1px solid rgba(200,169,110,0.3)",
    color: "#C8A96E",
    padding: "14px 32px",
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.05em",
    display: "inline-block",
  },
  heroCountries: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 64,
  },
  countryPill: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(200,169,110,0.07)",
    border: "1px solid rgba(200,169,110,0.15)",
    padding: "8px 16px",
    borderRadius: 40,
    animation: "pillFloat 0.6s ease both",
  },

  // STATS
  statsSection: {
    background: "#0A1628",
    borderTop: "1px solid rgba(200,169,110,0.1)",
    borderBottom: "1px solid rgba(200,169,110,0.1)",
    padding: "60px 60px",
  },
  statsInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 32,
  },
  statCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  statNumber: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 64,
    fontWeight: 700,
    color: "#C8A96E",
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 13,
    color: "#8896B0",
    letterSpacing: "0.08em",
    textAlign: "center",
  },

  // SECTIONS
  section: {
    padding: "100px 60px",
  },
  sectionInner: {
    maxWidth: 1100,
    margin: "0 auto",
  },
  sectionEyebrow: {
    fontSize: 12,
    letterSpacing: "0.2em",
    color: "#C8A96E",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 52,
    fontWeight: 700,
    color: "#F0E6D0",
    lineHeight: 1.1,
    marginBottom: 56,
  },

  // SERVICES
  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
  },
  serviceCard: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(200,169,110,0.1)",
    borderRadius: 4,
    padding: "32px 28px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    position: "relative",
  },
  serviceCardActive: {
    background: "rgba(200,169,110,0.06)",
    border: "1px solid rgba(200,169,110,0.35)",
    transform: "translateY(-4px)",
  },
  serviceIcon: {
    fontSize: 32,
    display: "block",
    marginBottom: 20,
  },
  serviceTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 22,
    fontWeight: 600,
    color: "#F0E6D0",
    marginBottom: 12,
  },
  serviceDesc: {
    fontSize: 14,
    color: "#8896B0",
    lineHeight: 1.7,
    marginBottom: 24,
  },
  serviceArrow: {
    color: "#C8A96E",
    fontSize: 18,
  },

  // COUNTRIES
  countriesSection: {
    background: "#0A1628",
    padding: "100px 60px",
  },
  countriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: 16,
  },
  countryCard: {
    background: "rgba(200,169,110,0.04)",
    border: "1px solid rgba(200,169,110,0.12)",
    borderRadius: 4,
    padding: "32px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    textAlign: "center",
  },
  countryName: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 18,
    fontWeight: 600,
    color: "#F0E6D0",
  },
  countryRole: {
    fontSize: 12,
    color: "#8896B0",
    letterSpacing: "0.05em",
  },

  // WHY US
  whyInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 80,
    alignItems: "center",
  },
  whyText: {},
  whyList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    marginBottom: 40,
  },
  whyItem: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    color: "#8896B0",
    fontSize: 15,
    lineHeight: 1.6,
  },
  whyDot: {
    color: "#C8A96E",
    fontSize: 8,
    marginTop: 7,
    flexShrink: 0,
  },
  whyVisual: {
    display: "flex",
    flexDirection: "column",
  },
  whyCard: {
    background: "rgba(200,169,110,0.04)",
    border: "1px solid rgba(200,169,110,0.15)",
    borderRadius: 4,
    padding: "32px 28px",
  },

  // CONTACT
  ctaSection: {
    background: "#0A1628",
    padding: "100px 60px",
    borderTop: "1px solid rgba(200,169,110,0.1)",
  },
  ctaInner: {
    maxWidth: 680,
    margin: "0 auto",
  },
  contactForm: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 14,
  },
  input: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,169,110,0.15)",
    borderRadius: 2,
    padding: "14px 18px",
    color: "#F0E6D0",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
  },
  textarea: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(200,169,110,0.15)",
    borderRadius: 2,
    padding: "14px 18px",
    color: "#F0E6D0",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    resize: "vertical",
    outline: "none",
  },
  submitBtn: {
    background: "#C8A96E",
    color: "#060E23",
    border: "none",
    padding: "16px 32px",
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.08em",
    cursor: "pointer",
    alignSelf: "flex-start",
  },

  // FOOTER
  footer: {
    background: "#030A18",
    padding: "60px 60px 32px",
    borderTop: "1px solid rgba(200,169,110,0.08)",
  },
  footerInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: 32,
    marginBottom: 48,
  },
  footerLogo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: "0.2em",
    color: "#C8A96E",
  },
  footerLinks: {
    display: "flex",
    gap: 28,
    flexWrap: "wrap",
  },
  footerLink: {
    color: "#4A5568",
    fontSize: 13,
  },
  footerSocials: {
    display: "flex",
    gap: 16,
  },
  socialLink: {
    color: "#C8A96E",
    fontSize: 13,
    border: "1px solid rgba(200,169,110,0.2)",
    padding: "6px 16px",
    borderRadius: 2,
  },
  footerCopy: {
    textAlign: "center",
    color: "#2D3748",
    fontSize: 12,
    maxWidth: 1100,
    margin: "0 auto",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    paddingTop: 24,
  },
};
