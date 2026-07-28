# 🚀 BuildWise

BuildWise is an AI-powered startup validation and market research platform designed to help founders audit and stress-test their startup concepts in seconds. 

By simply inputting a startup concept, BuildWise leverages state-of-the-art LLMs via **Groq** to execute comprehensive market analysis, competitor audit, risk assessments, and interactive advisory chat.

---

## ✨ Features

- 📊 **Dynamic TAM / SAM / SOM Calculator**: Realistic, mathematically sound market sizing tailored to regional data, average contract values, and target user demographics.
- 🎯 **Target Region Localization (e.g. India & Global)**: Custom market sizing, competitor indexing (Swiggy, Paytm, Zerodha, Zoho, etc.), and local PPP pricing structures (INR ₹).
- 💬 **Interactive AI Co-Founder Chat**: High-speed, responsive chat interface (`< 1.5s` latency) using optimized 8B LLM models to discuss, refine, and plan your business.
- 🚦 **Critical Idea Auditing**: Realistic validation scoring (30-100) that flags high-barrier or low-defensibility businesses (like standard agencies or dropshipping) with actionable verdicts (`Go`, `Caution`, `Pivot`).
- ⭐ **Starred Ideas Dashboard**: Toggle, bookmark, and manage your favorite startup ideas in a dedicated workspace.
- 🗑️ **Workspace Deletion Flow**: Remove previous validation records instantly with cascading database cleanups.
- 📜 **MVP Roadmap & GTM Strategy**: Generate structured launch milestones, feature priority lists (P0/P1/P2), and marketing strategies.
- 💎 **Premium Dark Theme**: Sleek glassmorphism dashboards, smooth GSAP scrolling, responsive interactive charts, and animations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Database**: [Prisma ORM](https://www.prisma.io/) with SQLite (Local & Serverless ready)
- **Styling**: Tailwind CSS & Modern Glassmorphism
- **Animations**: GSAP (GreenSock) & Lenis Scroll Engine
- **AI Integration**: Groq API (`llama-3.1-8b-instant` / `llama-3.3-70b-versatile`)
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/sahajjj/buildwise-startup-validator.git
cd buildwise-startup-validator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
GROQ_API_KEY="your_groq_api_key_here"
```

### 4. Initialize the Database
Run Prisma migrations to create your local SQLite schema:
```bash
npx prisma db push
```

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to explore BuildWise!

---

## 🤝 Credits
Created by [Sahaj Sharma](https://github.com/sahajjj).
