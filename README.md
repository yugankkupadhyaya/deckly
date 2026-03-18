# Deckly

AI-powered presentation builder that transforms your ideas into beautiful, well-structured slides in minutes.

## Features

- **AI-Powered Generation** - Create presentations from prompts using OpenAI or Groq
- **Drag & Drop Editor** - Intuitive slide editor with drag-and-drop reordering
- **Rich Components** - Headings, paragraphs, images, tables, lists, and columns
- **Theme System** - Multiple built-in themes with light/dark variants
- **Project Management** - Create, edit, delete, and organize presentations
- **Authentication** - Secure user accounts via Clerk
- **Real-time Preview** - Live preview of your slides as you edit

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Styling**: Tailwind CSS with Radix UI components
- **Animations**: Framer Motion
- **State Management**: Zustand
- **AI**: OpenAI & Groq SDK
- **Image Upload**: Uploadcare

## Getting Started

1. Clone the repository:
```bash
git clone <repo-url>
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Configure your database, Clerk, and AI API keys
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode

## Project Structure

- `src/app` - Next.js App Router pages and API routes
- `src/components` - Reusable UI components
- `src/store` - Zustand state management
- `src/lib` - Utilities, types, and constants
- `prisma` - Database schema and migrations

## License

MIT
