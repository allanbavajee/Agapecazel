"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

// ── Animated counter hook ──────────────────────────────────────────────────
function useCounter(target, duration = 2000, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return value;
}

// ── Data ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: 15, suffix: "+", label: "ans d'expérience" },
  { value: 6,  suffix: "",  label: "pays d'implantation" },
  { value: 500,suffix: "+", label: "collaborateurs" },
  { value: 24, suffix: "/7",label: "disponibilité" },
];

const COUNTRIES = [
  { name: "Île Maurice",  flag: "🇲🇺", role: "Siège régional" },
  { name: "France", flag: "🇫🇷", role: "Marché européen" },
  { name: "Belgique", flag: "🇧🇪", role: "Support et expansion" },
];

const SERVICES = [
  { icon: "📞", title: "Réception d'appels", desc: "Accueil téléphonique professionnel, gestion des demandes et orientation client 24h/24." },
  { icon: "🎯", title: "Téléprospection",    desc: "Campagnes outbound ciblées, qualification de leads et prise de rendez-vous." },
  { icon: "🛠️", title: "Support client",     desc: "Assistance technique et SAV multicanal pour fidéliser vos clients." },
  { icon: "📋", title: "Back-office",        desc: "Traitement des données, saisie, gestion administrative et suivi dossiers." },
];

// ── StatCard ───────────────────────────────────────────────────────────────
function StatCard({ value, suffix, label, started }) {
  const count = useCounter(value, 1800, started);
  return (
    <div style={s.statCard}>
      <span style={s.statNum}>{count}{suffix}</span>
      <span style={s.statLabel}>{label}</span>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled]       = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [form, setForm]               = useState({ nom: "", email: "", societe: "", message: "" });
  const [formState, setFormState]     = useState("idle"); // idle | loading | success | error
  const statsRef = useRef(null);

  // Sticky nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Submit contact form → Supabase
  async function handleSubmit(e) {
    e.preventDefault();
    setFormState("loading");
    try {
      const { data, error } = await supabase
  .from("contacts")
  .insert([
    {
      nom: form.nom,
      email: form.email,
      societe: form.societe,
      message: form.message,
    },
  ]);

console.log("DATA:", data);
console.log("ERROR:", error);

      console.log("DATA:", data);
      console.log("ERROR:", error);
      
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
        @keyframes fadeUp { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pillIn { from { opacity:0; transform:translateX(-10px); } to { opacity:1; transform:translateX(0); } }
        .nav-link:hover { color: #C8A96E !important; }
        .service-card:hover { background: rgba(200,169,110,0.07) !important; border-color: rgba(200,169,110,0.4) !important; transform: translateY(-5px) !important; }
        .country-card:hover { border-color: rgba(200,169,110,0.35) !important; }
        .btn-primary:hover { opacity: 0.86 !important; }
        .submit-btn:hover { opacity: 0.88 !important; }
        input:focus, textarea:focus { border-color: rgba(200,169,110,0.5) !important; outline: none; }
      `}</style>

      <div style={s.root}>

        {/* ── NAV ── */}
        <nav style={{ ...s.nav, background: scrolled ? "rgba(6,14,35,0.97)" : "transparent" }}>
          <span style={s.navLogo}>AGAPECAZEL</span>
          <div style={s.navLinks}>
            {["Services", "Implantations", "À propos", "Carrières"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "-").replace("à", "a")}`}
                className="nav-link" style={s.navLink}>{l}</a>
            ))}
            <a href="#contact" className="btn-primary" style={s.navCta}>Devis gratuit</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={s.hero}>
          <div style={s.heroGrid} />
          <div style={s.heroGlow1} />
          <div style={s.heroGlow2} />
          <div style={{ ...s.heroContent, animation: "fadeUp 0.85s ease both" }}>
            <p style={s.eyebrow}>Centre d'appel international · 15 ans d'excellence</p>
            <h1 style={s.heroTitle}>
              Votre voix,<br />
              <span style={{ color: "#C8A96E" }}>notre expertise.</span>
            </h1>
            <p style={s.heroSub}>
              Agapecazel connecte les entreprises du monde entier à des équipes expertes
              implantées au cœur de l'Afrique et de l'océan Indien.
            </p>
            <div style={s.heroCtas}>
              <a href="#contact" className="btn-primary" style={s.btnPrimary}>Demander un devis</a>
              <a href="#services" style={s.btnSecondary}>Découvrir nos services</a>
            </div>
          </div>
          <div style={s.pills}>
            {COUNTRIES.map((c, i) => (
              <div key={c.name} style={{ ...s.pill, animation: `pillIn 0.5s ease ${i * 0.12}s both` }}>
                <span>{c.flag}</span>
                <span style={{ fontSize: 13, color: "#C8A96E" }}>{c.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── STATS ── */}
        <section ref={statsRef} style={s.stats}>
          <div style={s.statsGrid}>
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} started={statsStarted} />
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" style={s.section}>
          <div style={s.inner}>
            <p style={s.eyebrow}>Ce que nous faisons</p>
            <h2 style={s.secTitle}>Nos prestations</h2>
            <div style={s.servicesGrid}>
              {SERVICES.map((sv, i) => (
                <div key={sv.title} className="service-card"
                  style={{ ...s.serviceCard, ...(activeService === i ? s.serviceCardActive : {}) }}
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}>
                  <span style={{ fontSize: 30, display: "block", marginBottom: 18 }}>{sv.icon}</span>
                  <h3 style={s.serviceTitle}>{sv.title}</h3>
                  <p style={s.serviceDesc}>{sv.desc}</p>
                  <span style={{ color: "#C8A96E", fontSize: 18 }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IMPLANTATIONS ── */}
        <section id="implantations" style={{ ...s.section, background: "#0A1628" }}>
          <div style={s.inner}>
            <p style={s.eyebrow}>Notre présence mondiale</p>
            <h2 style={s.secTitle}>6 pays, une seule mission</h2>
            <div style={s.countriesGrid}>
              {COUNTRIES.map((c) => (
                <div key={c.name} className="country-card" style={s.countryCard}>
                  <span style={{ fontSize: 38 }}>{c.flag}</span>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, fontWeight: 600, color: "#F0E6D0" }}>{c.name}</p>
                  <p style={{ fontSize: 11, color: "#8896B0", letterSpacing: "0.05em" }}>{c.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section id="a-propos" style={s.section}>
          <div style={{ ...s.inner, display: "grid", gridTemplateColumns: "1fr 340px", gap: 72, alignItems: "center" }}>
            <div>
              <p style={s.eyebrow}>Pourquoi Agapecazel</p>
              <h2 style={s.secTitle}>L'expertise africaine<br />au service de vos clients</h2>
              <p style={{ color: "#8896B0", lineHeight: 1.8, marginBottom: 28, fontSize: 15 }}>
                Depuis plus de 15 ans, nous accompagnons des entreprises en France, en Europe et à
                l'international avec des équipes multilingues, formées aux standards les plus exigeants
                de la relation client.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
                {["Équipes francophones, anglophones et arabophones",
                  "Tarifs compétitifs, qualité premium",
                  "Technologie de pointe & reporting en temps réel",
                  "Flexibilité : scale-up rapide selon vos besoins"].map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start", color: "#8896B0", fontSize: 14, lineHeight: 1.6 }}>
                    <span style={{ color: "#C8A96E", fontSize: 7, marginTop: 7, flexShrink: 0 }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="btn-primary" style={s.btnPrimary}>Parlons de votre projet</a>
            </div>
            <div>
              {[{ label: "SATISFACTION CLIENT", value: "98%", sub: "taux de satisfaction moyen" },
                { label: "LANGUES COUVERTES",   value: "8+",  sub: "français, anglais, arabe, malgache…" }]
                .map((card) => (
                <div key={card.label} style={s.whyCard}>
                  <p style={{ color: "#C8A96E", fontSize: 11, letterSpacing: "0.12em", marginBottom: 6 }}>{card.label}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 44, fontWeight: 700, color: "#F0E6D0", lineHeight: 1 }}>{card.value}</p>
                  <p style={{ fontSize: 12, color: "#8896B0", marginTop: 4 }}>{card.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ ...s.section, background: "#0A1628", borderTop: "1px solid rgba(200,169,110,0.1)" }}>
          <div style={{ ...s.inner, maxWidth: 640 }}>
            <p style={{ ...s.eyebrow, textAlign: "center" }}>Prêt à démarrer ?</p>
            <h2 style={{ ...s.secTitle, textAlign: "center" }}>Obtenez votre devis<br />en 24 heures</h2>
            <p style={{ color: "#8896B0", textAlign: "center", fontSize: 15, lineHeight: 1.7, marginBottom: 40, marginTop: -20 }}>
              Décrivez-nous vos besoins et notre équipe vous recontacte sous 24h avec une proposition sur mesure.
            </p>

            {formState === "success" ? (
              <div style={s.successBox}>
                <span style={{ fontSize: 32 }}>✅</span>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: "#F0E6D0" }}>Message envoyé !</p>
                <p style={{ color: "#8896B0", fontSize: 14 }}>Notre équipe vous contacte sous 24h.</p>
                <button onClick={() => setFormState("idle")} style={{ ...s.btnPrimary, marginTop: 8, border: "none", cursor: "pointer" }}>
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={s.form}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input style={s.input} placeholder="Votre nom" required
                    value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} />
                  <input style={s.input} type="email" placeholder="Email professionnel" required
                    value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <input style={s.input} placeholder="Société"
                  value={form.societe} onChange={(e) => setForm({ ...form, societe: e.target.value })} />
                <textarea style={{ ...s.input, resize: "vertical" }} rows={4} placeholder="Décrivez votre besoin…" required
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {formState === "error" && (
                  <p style={{ color: "#E24B4A", fontSize: 13 }}>Une erreur s'est produite. Veuillez réessayer.</p>
                )}
                <button className="submit-btn" type="submit" disabled={formState === "loading"}
                  style={{ ...s.btnPrimary, border: "none", cursor: "pointer", opacity: formState === "loading" ? 0.6 : 1 }}>
                  {formState === "loading" ? "Envoi en cours…" : "Envoyer la demande →"}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={s.footer}>
          <div style={s.footerInner}>
            <div>
              <p style={s.navLogo}>AGAPECAZEL</p>
              <p style={{ color: "#4A5568", fontSize: 12, marginTop: 6 }}>Centre d'appel international · Depuis 2009</p>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {["Services", "Implantations", "À propos", "Carrières", "Contact"].map((l) => (
                <a key={l} href="#" style={{ color: "#4A5568", fontSize: 13 }}>{l}</a>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                style={{ color: "#C8A96E", fontSize: 12, border: "1px solid rgba(200,169,110,.18)", padding: "5px 14px", borderRadius: 2 }}>
                LinkedIn
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                style={{ color: "#C8A96E", fontSize: 12, border: "1px solid rgba(200,169,110,.18)", padding: "5px 14px", borderRadius: 2 }}>
                Facebook
              </a>
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#2D3748", fontSize: 11, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, maxWidth: 1100, margin: "0 auto" }}>
            © 2025 Agapecazel. Tous droits réservés.
          </p>
        </footer>

      </div>
    </>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s = {
  root:       { fontFamily: "'DM Sans', sans-serif", background: "#060E23", color: "#F0E6D0", minHeight: "100vh", overflowX: "hidden" },
  nav:        { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 60px", transition: "background 0.3s ease", backdropFilter: "blur(10px)" },
  navLogo:    { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, letterSpacing: "0.2em", color: "#C8A96E" },
  navLinks:   { display: "flex", alignItems: "center", gap: 32 },
  navLink:    { color: "#8896B0", fontSize: 13, letterSpacing: "0.04em", transition: "color 0.2s" },
  navCta:     { background: "#C8A96E", color: "#060E23", padding: "9px 22px", borderRadius: 2, fontSize: 13, fontWeight: 500, letterSpacing: "0.06em" },
  hero:       { minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 60px 80px", position: "relative", overflow: "hidden" },
  heroGrid:   { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)", backgroundSize: "56px 56px", pointerEvents: "none" },
  heroGlow1:  { position: "absolute", top: -180, right: -180, width: 650, height: 650, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,169,110,0.08) 0%,transparent 70%)", pointerEvents: "none" },
  heroGlow2:  { position: "absolute", bottom: -100, left: -100, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(26,58,110,0.28) 0%,transparent 70%)", pointerEvents: "none" },
  heroContent:{ maxWidth: 700 },
  eyebrow:    { fontSize: 11, letterSpacing: "0.2em", color: "#C8A96E", textTransform: "uppercase", marginBottom: 20 },
  heroTitle:  { fontFamily: "'Cormorant Garamond', serif", fontSize: 76, fontWeight: 700, lineHeight: 1.04, color: "#F0E6D0", marginBottom: 26 },
  heroSub:    { fontSize: 16, color: "#8896B0", lineHeight: 1.75, maxWidth: 540, marginBottom: 42, fontWeight: 300 },
  heroCtas:   { display: "flex", gap: 14, flexWrap: "wrap" },
  btnPrimary: { background: "#C8A96E", color: "#060E23", padding: "13px 28px", borderRadius: 2, fontSize: 13, fontWeight: 500, letterSpacing: "0.07em", display: "inline-block", transition: "opacity 0.2s" },
  btnSecondary:{ border: "1px solid rgba(200,169,110,.28)", color: "#C8A96E", padding: "13px 28px", borderRadius: 2, fontSize: 13, letterSpacing: "0.05em", display: "inline-block" },
  pills:      { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 56 },
  pill:       { display: "flex", alignItems: "center", gap: 7, background: "rgba(200,169,110,0.06)", border: "1px solid rgba(200,169,110,0.14)", padding: "7px 14px", borderRadius: 40 },
  stats:      { background: "#0A1628", borderTop: "1px solid rgba(200,169,110,0.1)", borderBottom: "1px solid rgba(200,169,110,0.1)", padding: "56px 60px" },
  statsGrid:  { maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 },
  statCard:   { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  statNum:    { fontFamily: "'Cormorant Garamond', serif", fontSize: 60, fontWeight: 700, color: "#C8A96E", lineHeight: 1 },
  statLabel:  { fontSize: 12, color: "#8896B0", letterSpacing: "0.07em", textAlign: "center" },
  section:    { padding: "96px 60px" },
  inner:      { maxWidth: 1080, margin: "0 auto" },
  secTitle:   { fontFamily: "'Cormorant Garamond', serif", fontSize: 50, fontWeight: 700, color: "#F0E6D0", lineHeight: 1.1, marginBottom: 52 },
  servicesGrid:{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 },
  serviceCard:{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,169,110,0.1)", borderRadius: 4, padding: "28px 22px", cursor: "pointer", transition: "all 0.25s ease" },
  serviceCardActive:{ background: "rgba(200,169,110,0.07)", borderColor: "rgba(200,169,110,0.4)", transform: "translateY(-5px)" },
  serviceTitle:{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#F0E6D0", marginBottom: 10 },
  serviceDesc:{ fontSize: 13, color: "#8896B0", lineHeight: 1.7, marginBottom: 20 },
  countriesGrid:{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 },
  countryCard:{ background: "rgba(200,169,110,0.04)", border: "1px solid rgba(200,169,110,0.12)", borderRadius: 4, padding: "28px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", transition: "border-color 0.2s", cursor: "default" },
  whyCard:    { background: "rgba(200,169,110,0.04)", border: "1px solid rgba(200,169,110,0.14)", borderRadius: 4, padding: "28px", marginBottom: 14 },
  form:       { display: "flex", flexDirection: "column", gap: 12 },
  input:      { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: 2, padding: "13px 16px", color: "#F0E6D0", fontSize: 14, width: "100%", transition: "border-color 0.2s" },
  successBox: { display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "48px 32px", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 4, textAlign: "center" },
  footer:     { background: "#030A18", padding: "52px 60px 28px", borderTop: "1px solid rgba(200,169,110,0.07)" },
  footerInner:{ maxWidth: 1080, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 28, marginBottom: 44 },
};
