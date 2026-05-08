import "./globals.css";

export const metadata = {
  title: "Agapecazel — Centre d'appel international",
  description:
    "Expert en relation client depuis plus de 15 ans, présent à l'Île Maurice, en Tunisie, à Madagascar, au Cameroun et au Nigeria.",
  keywords: "centre d'appel, call center, externalisation, relation client, Afrique, Maurice, Tunisie",
  openGraph: {
    title: "Agapecazel — Centre d'appel international",
    description: "15 ans d'expertise, 6 pays, 500+ collaborateurs.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
