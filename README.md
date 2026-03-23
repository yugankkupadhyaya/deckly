# 🎴 Deckly

**Deckly** is a cutting-edge, AI-powered presentation ecosystem. It empowers creators to bridge the gap between complex ideas and visual excellence. Whether you're generating a full deck from a single prompt, building from scratch, or leveraging a community-driven marketplace, Deckly is built for speed and aesthetic precision.

---

## 🚀 Key Features

* **🪄 AI Presentation Engine:** Leverage **OpenRouter** to transform prompts into structured, professional slide decks instantly.
* **🛒 Template Marketplace:** A native ecosystem to browse, buy, and sell high-fidelity presentation templates.
* **🎨 Dynamic Theme Engine:** Seamlessly toggle between curated professional themes to match your brand identity.
* **⚡ High-Performance Assets:** Instant image processing and lightning-fast delivery powered by **Uploadcare**.
* **🛡️ Enterprise Security:** Robust user authentication and session management via **Clerk**.
* **🌓 Minimalist UI:** A distraction-free, modern dark-mode interface designed for deep work.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) via [Neon](https://neon.tech/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Auth** | [Clerk](https://clerk.com/) |
| **AI Integration** | [OpenRouter](https://openrouter.ai/) |
| **Storage** | [Uploadcare](https://uploadcare.com/) |

---

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/yugankkkupadhyaya/deckly.git](https://github.com/yugankkkupadhyaya/deckly.git)
cd deckly


2. Install Dependencies
npm install


3. Environment Configuration

Create a .env file in the root directory:

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (Neon)
DATABASE_URL="your_neon_postgres_url"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Uploadcare
NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=your_key
UPLOADCARE_SECRET_KEY=your_secret_key

# OpenRouter AI
OPEN_ROUTER_API_KEY=your_key


4. Database Initialization
npx prisma generate
npx prisma db push
5. Run Development Server
npm run dev
👨‍💻 Author

Yugank Upadhyaya
Full Stack Developer & AI Enthusiast
📍 Ghaziabad, Uttar Pradesh, India

📧 yugankkupadhyaya@gmail.com


