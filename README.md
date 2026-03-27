<div align="center">

# 🍽️ AlgoTaste

### AI-Powered Culinary Intelligence Platform

**Transform ingredients into culinary art** — Photograph your pantry, receive chef-curated recipes, and elevate every meal effortlessly.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Strapi](https://img.shields.io/badge/Strapi-5-4945FF?logo=strapi)](https://strapi.io/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?logo=google)](https://ai.google.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?logo=clerk)](https://clerk.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)](https://www.postgresql.org/)

[Live Demo](https://algotaste.vercel.app) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🧠 About

**AlgoTaste** is a full-stack AI-powered recipe platform that uses **Google Gemini Vision** to scan your pantry, identify ingredients from photos, and generate personalized recipes — all in real time. Built with a modern **Next.js 16** frontend and a **Strapi 5** headless CMS backend, it delivers a premium culinary experience with dark mode, PDF export, and a freemium subscription model powered by **Clerk Billing**.

### The Problem

Every day, home cooks struggle with the same question: _"What can I make with what I have?"_ Food goes to waste, creativity stalls, and meal planning becomes a chore.

### The Solution

AlgoTaste bridges the gap between your pantry and your plate. Snap a photo of your ingredients, and AI handles the rest — delivering chef-quality recipes complete with nutritional data, cooking tips, and ingredient substitutions.

---

## ✨ Features

### 🔍 AI-Powered Pantry Scanning
- Upload a photo of your fridge or pantry
- **Gemini Vision AI** identifies every visible ingredient with confidence scores
- Detected items are saved to your personal digital pantry
- Add or remove items manually anytime

### 🍳 Intelligent Recipe Generation
- Generate detailed recipes from any dish name using **Gemini AI**
- Get step-by-step instructions, prep/cook times, servings, and nutritional info
- Recipes include pro tips, ingredient substitutions, and categorized ingredients
- Auto-fetches beautiful recipe images from **Unsplash**

### 🥘 Pantry-Based Meal Recommendations
- AI analyzes your pantry and suggests **5 recipes** you can cook right now
- Each suggestion shows a **match percentage** based on available ingredients
- Lists any missing ingredients you might need
- Sorted by best match for maximum convenience

### 🌍 Global Recipe Explorer
- Browse recipes from **30+ world cuisines** via TheMealDB integration
- Filter by category (Beef, Seafood, Vegan, Dessert, etc.) or by country
- Discover new dishes with the **Recipe of the Day** feature
- Full recipe details with cooking instructions and video tutorials

### 📑 Recipe Management
- **Bookmark** favorite recipes to your personal collection
- **Export recipes as PDF** — beautifully formatted for printing or sharing
- View detailed recipe pages with ingredients, instructions, nutrition, and tips
- Access your saved recipes anytime from the dashboard

### 🔐 Authentication & Security
- **Clerk** handles sign-up, sign-in, and session management
- Protected routes for dashboard, pantry, and recipe pages
- **Arcjet** provides bot detection, shield protection, and rate limiting
- Secure API token-based communication with the backend

### 💳 Freemium Subscription Model
| Feature | Essentials (Free) | Premier ($7.99/mo) |
|---|---|---|
| Pantry Scans | 10/month | Unlimited |
| AI Recipe Generations | 5/month | Unlimited |
| Recipe Search | Unlimited | Unlimited |
| Nutritional Analysis | Basic | Full |
| Chef's Tips | — | ✅ |
| Ingredient Substitutions | — | ✅ |
| Priority Support | — | ✅ |

### 🌙 Dark Mode
- Automatic detection of system preference
- Manual toggle with persistent localStorage setting
- Elegant gold-accented design in both themes

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router & Server Actions |
| [React 19](https://react.dev/) | UI library |
| [TailwindCSS v4](https://tailwindcss.com/) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.dev/) | Radix-based UI component library |
| [Clerk](https://clerk.com/) | Authentication, user management & billing |
| [Google Gemini AI](https://ai.google.dev/) | Vision-based ingredient scanning & recipe generation |
| [Arcjet](https://arcjet.com/) | Rate limiting, bot detection & security |
| [Unsplash API](https://unsplash.com/developers) | Dynamic recipe imagery |
| [TheMealDB](https://www.themealdb.com/) | Global recipe database |
| [React PDF](https://react-pdf.org/) | PDF recipe export |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| [Lucide React](https://lucide.dev/) | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| [Strapi 5](https://strapi.io/) | Headless CMS & REST API |
| [PostgreSQL](https://www.postgresql.org/) | Primary database |
| [Node.js ≥20](https://nodejs.org/) | Runtime environment |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                 │
│                                                      │
│   Next.js 16 App Router (React 19 + Server Actions)  │
│   ┌────────────┐  ┌──────────┐  ┌────────────────┐  │
│   │ Clerk Auth │  │ Arcjet   │  │  Dark Mode     │  │
│   │ & Billing  │  │ Security │  │  (next-themes) │  │
│   └────────────┘  └──────────┘  └────────────────┘  │
│                                                      │
│   Server Actions Layer                               │
│   ┌──────────────┐ ┌──────────────┐ ┌────────────┐  │
│   │recipe.actions│ │pantry.actions│ │mealdb.acts │  │
│   └──────┬───────┘ └──────┬───────┘ └─────┬──────┘  │
└──────────┼────────────────┼───────────────┼──────────┘
           │                │               │
     ┌─────▼─────┐   ┌─────▼─────┐   ┌─────▼──────┐
     │ Gemini AI │   │ Gemini    │   │ TheMealDB  │
     │ (Text)    │   │ Vision    │   │ Public API │
     └───────────┘   └───────────┘   └────────────┘
           │                │
     ┌─────▼────────────────▼─────┐
     │    Unsplash API            │
     │    (Recipe Images)         │
     └────────────────────────────┘
           │
     ┌─────▼──────────────────────┐
     │    Strapi 5 (REST API)     │
     │    ┌─────────────────────┐ │
     │    │  Content Types:     │ │
     │    │  • recipe           │ │
     │    │  • pantry-item      │ │
     │    │  • saved-recipe     │ │
     │    │  • user (extended)  │ │
     │    └─────────────────────┘ │
     │             │              │
     │    ┌────────▼────────┐     │
     │    │   PostgreSQL    │     │
     │    └─────────────────┘     │
     └────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **npm** ≥ 6.x
- **PostgreSQL** (for production) or SQLite (for local development)
- API keys for: [Clerk](https://clerk.com/), [Google Gemini](https://ai.google.dev/), [Unsplash](https://unsplash.com/developers), [Arcjet](https://arcjet.com/) (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-recipe-platform.git
cd ai-recipe-platform
```

### 2. Backend Setup (Strapi)

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=<your-app-keys>
API_TOKEN_SALT=<your-token-salt>
ADMIN_JWT_SECRET=<your-admin-jwt-secret>
TRANSFER_TOKEN_SALT=<your-transfer-token-salt>
JWT_SECRET=<your-jwt-secret>

# Database (PostgreSQL)
DATABASE_CLIENT=postgres
DATABASE_URL=<your-postgres-connection-string>

# Or use individual fields:
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=algotaste
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=strapi
```

Start the backend:

```bash
npm run develop
```

The Strapi admin panel will be available at `http://localhost:1337/admin`. Create the following content types through the admin panel:

- **Recipe** — title, description, category, cuisine, ingredients (JSON), instructions (JSON), prepTime, cookTime, servings, nutrition (JSON), tips (JSON), substitutions (JSON), imageUrl, isPublic, author (relation to User)
- **Pantry Item** — name, quantity, imageUrl, owner (relation to User)
- **Saved Recipe** — user (relation to User), recipe (relation to Recipe), savedAt

Generate a full-access API token from **Settings → API Tokens** for use in the frontend.

### 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

Create a `.env.local` file in `frontend/`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Strapi Backend
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<your-strapi-api-token>

# Google Gemini AI
GEMINI_API_KEY=<your-gemini-api-key>

# Unsplash (for recipe images)
UNSPLASH_ACCESS_KEY=<your-unsplash-access-key>

# Arcjet (optional — rate limiting)
ARCJET_KEY=<your-arcjet-key>
```

Start the frontend:

```bash
npm run dev
```

Visit `http://localhost:3000` to see the app.

---

## 🔑 Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | ✅ | Clerk publishable key |
| `CLERK_SECRET_KEY` | ✅ | Clerk secret key |
| `NEXT_PUBLIC_STRAPI_URL` | ✅ | Strapi backend URL |
| `STRAPI_API_TOKEN` | ✅ | Strapi full-access API token |
| `GEMINI_API_KEY` | ✅ | Google Gemini API key |
| `UNSPLASH_ACCESS_KEY` | ⚠️ | Unsplash API key (images won't load without it) |
| `ARCJET_KEY` | ❌ | Arcjet key for rate limiting (gracefully degrades) |

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `APP_KEYS` | ✅ | Strapi application keys |
| `API_TOKEN_SALT` | ✅ | Salt for API token hashing |
| `ADMIN_JWT_SECRET` | ✅ | Admin panel JWT secret |
| `JWT_SECRET` | ✅ | JWT secret for user auth |
| `DATABASE_CLIENT` | ✅ | `postgres` or `sqlite` |
| `DATABASE_URL` | ✅* | PostgreSQL connection string |

---

## 📁 Project Structure

```
ai-recipe-platform/
├── frontend/                    # Next.js 16 Application
│   ├── app/
│   │   ├── (auth)/              # Auth routes (sign-in, sign-up)
│   │   ├── (main)/              # Protected app routes
│   │   │   ├── dashboard/       # User dashboard
│   │   │   ├── pantry/          # Pantry management
│   │   │   ├── recipe/          # Individual recipe view
│   │   │   └── recipes/         # Recipe explorer & search
│   │   ├── api/                 # API routes
│   │   ├── layout.js            # Root layout with Clerk & theme
│   │   ├── page.js              # Landing page
│   │   └── globals.css          # Global styles & design tokens
│   ├── actions/
│   │   ├── recipe.actions.js    # Recipe generation & management
│   │   ├── pantry.actions.js    # Pantry scanning & CRUD
│   │   └── mealdb.actions.js    # TheMealDB API integration
│   ├── components/
│   │   ├── Header.jsx           # Navigation bar
│   │   ├── RecipeCard.jsx       # Recipe display card
│   │   ├── RecipeGrid.jsx       # Recipe grid layout
│   │   ├── ImageUploader.jsx    # Drag-and-drop image upload
│   │   ├── AddToPantryModal.jsx # Pantry item modal
│   │   ├── NavSearch.jsx        # Search component
│   │   ├── PricingSection.jsx   # Subscription pricing
│   │   ├── RecipePDF.jsx        # PDF export component
│   │   ├── ThemeToggle.jsx      # Dark/light mode toggle
│   │   └── ui/                  # shadcn/ui primitives
│   ├── lib/
│   │   ├── arcjet.js            # Arcjet rate limiting config
│   │   ├── checkUser.js         # User sync (Clerk ↔ Strapi)
│   │   ├── data.js              # Static data & constants
│   │   └── utils.js             # Utility functions
│   ├── middleware.js             # Clerk auth middleware
│   ├── next.config.mjs          # Next.js configuration
│   └── package.json
│
├── backend/                     # Strapi 5 CMS
│   ├── config/
│   │   ├── database.js          # DB config (Postgres/SQLite/MySQL)
│   │   ├── server.js            # Server configuration
│   │   └── middlewares.js       # CORS & security middleware
│   ├── src/
│   │   ├── api/
│   │   │   ├── recipe/          # Recipe content type
│   │   │   ├── pantry-item/     # Pantry item content type
│   │   │   └── saved-recipe/    # Saved recipe content type
│   │   ├── admin/               # Admin panel customization
│   │   └── extensions/          # Plugin extensions
│   └── package.json
│
└── README.md
```

---

## 🔌 API Integration

### Google Gemini AI

AlgoTaste uses two Gemini AI capabilities:

| Model | Use Case |
|---|---|
| `gemini-2.5-flash-lite` (Text) | Recipe generation from dish names, pantry-based meal suggestions |
| `gemini-2.5-flash-lite` (Vision) | Ingredient detection from pantry/fridge photos |

### TheMealDB

The public [TheMealDB API](https://www.themealdb.com/api.php) powers the recipe explorer with:
- Random recipe of the day
- Browse by category (Beef, Seafood, Dessert, etc.)
- Browse by cuisine/area (Italian, Japanese, Mexican, etc.)

### Strapi REST API

All user data is managed through Strapi's auto-generated REST endpoints:

| Endpoint | Description |
|---|---|
| `GET /api/recipes` | List/search recipes |
| `POST /api/recipes` | Create AI-generated recipe |
| `GET /api/pantry-items` | Get user's pantry items |
| `POST /api/pantry-items` | Add item to pantry |
| `DELETE /api/pantry-items/:id` | Remove pantry item |
| `GET /api/saved-recipes` | Get user's bookmarked recipes |
| `POST /api/saved-recipes` | Bookmark a recipe |
| `DELETE /api/saved-recipes/:id` | Remove bookmark |

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
npx vercel
```

Set all `frontend/.env.local` variables in the Vercel dashboard under **Settings → Environment Variables**.

### Backend → Render

1. Create a new **Web Service** on [Render](https://render.com/)
2. Connect your GitHub repository
3. Set the root directory to `backend/`
4. Build command: `npm install && npm run build`
5. Start command: `npm run start`
6. Add all backend environment variables
7. Provision a **PostgreSQL** database on Render and set `DATABASE_URL`

> **Note:** Update `NEXT_PUBLIC_STRAPI_URL` in your Vercel environment to point to your Render backend URL (e.g., `https://algotaste.onrender.com`).

---

## 📄 License

This project is built for educational and portfolio purposes.

---

<div align="center">

*AlgoTaste — Crafted with Precision*

</div>
