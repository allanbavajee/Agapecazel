test
# Agapecazel — Site web

Site vitrine du centre d'appel Agapecazel.  
**Stack :** Next.js 14 · Supabase · Vercel · GitHub

---

## 🚀 Démarrage rapide

### 1. Cloner et installer

```bash
git clone https://github.com/VOTRE_USER/agapecazel.git
cd agapecazel
npm install
```

### 2. Configurer Supabase

Allez sur [app.supabase.com](https://app.supabase.com), créez un projet, puis :

- **SQL Editor → New query** → collez le contenu de `supabase-schema.sql` → Run
- **Settings → API** → copiez `Project URL` et `anon public key`

Créez le fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 3. Lancer en local

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## 📁 Structure du projet

```
agapecazel/
├── app/
│   ├── layout.jsx        # Layout racine (metadata, fonts)
│   ├── globals.css       # Reset CSS global
│   └── page.jsx          # Page d'accueil
├── lib/
│   └── supabase.js       # Client Supabase
├── supabase-schema.sql   # Tables à créer dans Supabase
├── .env.local            # Variables d'environnement (non commité)
├── .env.example          # Template pour les autres développeurs
└── next.config.js
```

---

## 🗃️ Tables Supabase

| Table | Description |
|-------|-------------|
| `contacts` | Formulaire de contact (page d'accueil) |
| `offres` | Offres d'emploi (page Carrières) |
| `temoignages` | Avis clients (modérés avant publication) |

---

## ☁️ Déploiement sur Vercel

1. Poussez votre code sur GitHub
2. Allez sur [vercel.com](https://vercel.com) → **New Project** → importez votre repo
3. Dans **Environment Variables**, ajoutez :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Cliquez **Deploy** ✅

---

## 📄 Pages à venir

- [ ] `/services` — Détail des prestations
- [ ] `/implantations` — Carte interactive des pays
- [ ] `/carrieres` — Offres d'emploi depuis Supabase
- [ ] `/a-propos` — Histoire et équipe
