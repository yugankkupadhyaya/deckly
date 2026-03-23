# 🎴 Deckly

**Deckly** is a cutting-edge, AI-powered presentation ecosystem. It empowers creators to bridge the gap between complex ideas and visual excellence.

---

## 🚀 Key Features

- 🪄 **AI Presentation Engine** – Generate slides from prompts using OpenRouter  
- 🛒 **Template Marketplace** – Buy & sell templates  
- 🎨 **Dynamic Theme Engine** – Switch themes easily  
- ⚡ **Uploadcare Storage** – Fast media handling  
- 🛡️ **Clerk Auth** – Secure authentication  
- 🌓 **Minimal UI** – Clean dark interface  

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|----------|------------------------|
| Frontend | Next.js 15             |
| Styling  | Tailwind CSS           |
| Database | PostgreSQL (Neon)      |
| ORM      | Prisma                 |
| Auth     | Clerk                  |
| AI       | OpenRouter             |
| Storage  | Uploadcare             |

---

## 🚦 Getting Started

### 1. Clone Repo

```bash
git clone https://github.com/yugankkkupadhyaya/deckly.git
cd deckly
2. Install
npm install
3. Setup Environment

Create .env file:

NEXT_PUBLIC_APP_URL=http://localhost:3000

DATABASE_URL=""

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""

NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY=""
UPLOADCARE_SECRET_KEY=""

OPEN_ROUTER_API_KEY=""
4. Setup DB
npx prisma generate
npx prisma db push
5. Run App
npm run dev
👨‍💻 Author

Yugank Upadhyaya
📍 Ghaziabad, India
