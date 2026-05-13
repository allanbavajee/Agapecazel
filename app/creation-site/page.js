"use client";

import { useState } from "react";
import supabase from "../lib/supabaseClient";

export default function CreationSitePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    nom: "",
    email: "",
    telephone: "",
    entreprise: "",
    type_site: "",
    budget: "",
    delai: "",
    nombre_pages: "",
    multilingue: false,
    paiement_en_ligne: false,
    espace_client: false,
    reservation: false,
    maintenance: false,
    description: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("demandes_sites_web")
      .insert([
        {
          ...form,
          nombre_pages: form.nombre_pages
            ? parseInt(form.nombre_pages)
            : null,
        },
      ]);

    setLoading(false);

    if (error) {
      alert("Erreur lors de l'envoi");
      console.error(error);
      return;
    }

    setSuccess(true);

    setForm({
      nom: "",
      email: "",
      telephone: "",
      entreprise: "",
      type_site: "",
      budget: "",
      delai: "",
      nombre_pages: "",
      multilingue: false,
      paiement_en_ligne: false,
      espace_client: false,
      reservation: false,
      maintenance: false,
      description: "",
    });
  }

  function updateField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay} />

        <div style={styles.heroContent}>
          <p style={styles.eyebrow}>AGAPECAZEL DIGITAL</p>

          <h1 style={styles.title}>
            Création de
            <br />
            <span style={{ color: "#C8A650" }}>
              Sites Internet Professionnels
            </span>
          </h1>

          <p style={styles.subtitle}>
            Sites vitrines, e-commerce, plateformes sur mesure et solutions
            digitales modernes pour développer votre activité.
          </p>

          <a href="#demande" style={styles.heroBtn}>
            Demander un devis
          </a>
        </div>
      </section>

      {/* TYPES */}
      <section style={styles.section}>
        <div style={styles.container}>
          <p style={styles.sectionEyebrow}>NOS SOLUTIONS</p>

          <h2 style={styles.sectionTitle}>
            Des sites adaptés à vos besoins
          </h2>

          <div style={styles.cardsGrid}>
            {services.map((service) => (
              <div key={service.title} style={styles.card}>
                <div style={styles.cardIcon}>{service.icon}</div>

                <h3 style={styles.cardTitle}>{service.title}</h3>

                <p style={styles.cardDesc}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        style={{
          ...styles.section,
          background: "#F7F5F0",
        }}
      >
        <div style={styles.container}>
          <p style={styles.sectionEyebrow}>PROCESSUS</p>

          <h2 style={styles.sectionTitle}>
            Comment se déroule votre projet
          </h2>

          <div style={styles.processGrid}>
            {steps.map((step, i) => (
              <div key={step.title} style={styles.processCard}>
                <div style={styles.stepNumber}>0{i + 1}</div>

                <h3 style={styles.processTitle}>{step.title}</h3>

                <p style={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="demande" style={styles.section}>
        <div style={styles.formContainer}>
          <p style={styles.sectionEyebrow}>VOTRE PROJET</p>

          <h2 style={styles.sectionTitle}>
            Demandez votre devis gratuitement
          </h2>

          {success ? (
            <div style={styles.successBox}>
              <div style={{ fontSize: 50 }}>✅</div>

              <h3 style={styles.successTitle}>
                Votre demande a été envoyée
              </h3>

              <p style={styles.successText}>
                Notre équipe vous contactera rapidement.
              </p>

              <button
                onClick={() => setSuccess(false)}
                style={styles.submitBtn}
              >
                Nouvelle demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="Votre nom"
                  required
                  value={form.nom}
                  onChange={(e) => updateField("nom", e.target.value)}
                />

                <input
                  style={styles.input}
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div style={styles.row}>
                <input
                  style={styles.input}
                  placeholder="Téléphone"
                  value={form.telephone}
                  onChange={(e) => updateField("telephone", e.target.value)}
                />

                <input
                  style={styles.input}
                  placeholder="Entreprise"
                  value={form.entreprise}
                  onChange={(e) => updateField("entreprise", e.target.value)}
                />
              </div>

              <div style={styles.row}>
                <select
                  style={styles.input}
                  required
                  value={form.type_site}
                  onChange={(e) =>
                    updateField("type_site", e.target.value)
                  }
                >
                  <option value="">Type de site</option>
                  <option>Site vitrine</option>
                  <option>Site e-commerce</option>
                  <option>Landing page</option>
                  <option>Plateforme web</option>
                  <option>Application métier</option>
                  <option>Refonte de site</option>
                </select>

                <select
                  style={styles.input}
                  value={form.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                >
                  <option value="">Budget estimé</option>
                  <option>Moins de 500€</option>
                  <option>500€ - 1500€</option>
                  <option>1500€ - 5000€</option>
                  <option>5000€+</option>
                </select>
              </div>

              <div style={styles.row}>
                <select
                  style={styles.input}
                  value={form.delai}
                  onChange={(e) => updateField("delai", e.target.value)}
                >
                  <option value="">Délai souhaité</option>
                  <option>Urgent</option>
                  <option>1 mois</option>
                  <option>2-3 mois</option>
                  <option>Flexible</option>
                </select>

                <input
                  style={styles.input}
                  type="number"
                  placeholder="Nombre de pages"
                  value={form.nombre_pages}
                  onChange={(e) =>
                    updateField("nombre_pages", e.target.value)
                  }
                />
              </div>

              {/* OPTIONS */}
              <div style={styles.optionsGrid}>
                <Checkbox
                  label="Site multilingue"
                  checked={form.multilingue}
                  onChange={() =>
                    updateField("multilingue", !form.multilingue)
                  }
                />

                <Checkbox
                  label="Paiement en ligne"
                  checked={form.paiement_en_ligne}
                  onChange={() =>
                    updateField(
                      "paiement_en_ligne",
                      !form.paiement_en_ligne
                    )
                  }
                />

                <Checkbox
                  label="Espace client"
                  checked={form.espace_client}
                  onChange={() =>
                    updateField(
                      "espace_client",
                      !form.espace_client
                    )
                  }
                />

                <Checkbox
                  label="Système réservation"
                  checked={form.reservation}
                  onChange={() =>
                    updateField("reservation", !form.reservation)
                  }
                />

                <Checkbox
                  label="Maintenance"
                  checked={form.maintenance}
                  onChange={() =>
                    updateField("maintenance", !form.maintenance)
                  }
                />
              </div>

              <textarea
                style={styles.textarea}
                rows={6}
                required
                placeholder="Décrivez votre projet..."
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
              />

              <button
                type="submit"
                disabled={loading}
                style={styles.submitBtn}
              >
                {loading
                  ? "Envoi en cours..."
                  : "Envoyer ma demande"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label style={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />

      <span>{label}</span>
    </label>
  );
}

const services = [
  {
    icon: "💻",
    title: "Site vitrine",
    desc: "Présentez votre entreprise avec un site moderne et professionnel.",
  },
  {
    icon: "🛒",
    title: "E-commerce",
    desc: "Vendez vos produits en ligne avec paiement sécurisé.",
  },
  {
    icon: "📱",
    title: "Landing page",
    desc: "Pages optimisées pour générer plus de prospects.",
  },
  {
    icon: "⚙️",
    title: "Plateforme web",
    desc: "Solutions métiers et outils sur mesure.",
  },
  {
    icon: "📅",
    title: "Réservation",
    desc: "Systèmes de prise de rendez-vous et réservation.",
  },
  {
    icon: "🚀",
    title: "Refonte",
    desc: "Modernisez votre ancien site internet.",
  },
];

const steps = [
  {
    title: "Analyse du besoin",
    desc: "Nous étudions votre activité et vos objectifs.",
  },
  {
    title: "Design UX/UI",
    desc: "Création d'une interface moderne et professionnelle.",
  },
  {
    title: "Développement",
    desc: "Développement rapide avec technologies modernes.",
  },
  {
    title: "Mise en ligne",
    desc: "Publication sécurisée et accompagnement.",
  },
];

const styles = {
  page: {
    background: "#fff",
    color: "#0D2B5E",
    fontFamily: "sans-serif",
  },

  hero: {
    minHeight: "80vh",
    background:
      "linear-gradient(135deg, #0D2B5E 0%, #1A3F80 100%)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    overflow: "hidden",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top right, rgba(200,166,80,0.25), transparent 35%)",
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 900,
    textAlign: "center",
  },

  eyebrow: {
    color: "#C8A650",
    letterSpacing: "0.2em",
    fontSize: 12,
    marginBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: "clamp(42px, 7vw, 78px)",
    lineHeight: 1.05,
    marginBottom: 24,
    fontWeight: 700,
  },

  subtitle: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 18,
    lineHeight: 1.8,
    maxWidth: 700,
    margin: "0 auto 40px",
  },

  heroBtn: {
    background: "#C8A650",
    color: "#fff",
    padding: "16px 32px",
    borderRadius: 4,
    textDecoration: "none",
    fontWeight: 600,
    display: "inline-block",
  },

  section: {
    padding: "90px 20px",
  },

  container: {
    maxWidth: 1200,
    margin: "0 auto",
  },

  sectionEyebrow: {
    color: "#C8A650",
    fontSize: 12,
    letterSpacing: "0.18em",
    marginBottom: 14,
    textTransform: "uppercase",
    textAlign: "center",
  },

  sectionTitle: {
    fontSize: "clamp(34px,5vw,52px)",
    textAlign: "center",
    marginBottom: 60,
    color: "#0D2B5E",
    lineHeight: 1.1,
    fontWeight: 700,
  },

  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 24,
  },

  card: {
    border: "1px solid rgba(13,43,94,0.1)",
    borderRadius: 10,
    padding: 30,
    background: "#fff",
    transition: "0.2s",
  },

  cardIcon: {
    fontSize: 42,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 24,
    marginBottom: 14,
    color: "#0D2B5E",
  },

  cardDesc: {
    color: "#6B7A99",
    lineHeight: 1.7,
  },

  processGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 24,
  },

  processCard: {
    background: "#fff",
    padding: 28,
    borderRadius: 10,
  },

  stepNumber: {
    color: "#C8A650",
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 14,
  },

  processTitle: {
    fontSize: 22,
    marginBottom: 10,
    color: "#0D2B5E",
  },

  processDesc: {
    color: "#6B7A99",
    lineHeight: 1.7,
  },

  formContainer: {
    maxWidth: 900,
    margin: "0 auto",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 18,
  },

  input: {
    width: "100%",
    padding: "15px 18px",
    border: "1px solid rgba(13,43,94,0.12)",
    borderRadius: 6,
    fontSize: 15,
  },

  textarea: {
    width: "100%",
    padding: "18px",
    border: "1px solid rgba(13,43,94,0.12)",
    borderRadius: 6,
    fontSize: 15,
    resize: "vertical",
  },

  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: 12,
  },

  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#0D2B5E",
    fontSize: 14,
  },

  submitBtn: {
    background: "#C8A650",
    color: "#fff",
    border: "none",
    padding: "16px 28px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
  },

  successBox: {
    textAlign: "center",
    padding: 60,
    borderRadius: 12,
    background: "#F7F5F0",
  },

  successTitle: {
    fontSize: 34,
    marginTop: 20,
    marginBottom: 10,
    color: "#0D2B5E",
  },

  successText: {
    color: "#6B7A99",
    marginBottom: 30,
  },
};
