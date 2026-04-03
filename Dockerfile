FROM node:20
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy full project (needed for prisma)
COPY . .

# Install dependencies using pnpm
RUN pnpm install

# Build Next.js app
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
