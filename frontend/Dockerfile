# ----------- Build Stage -----------
FROM node:20-bullseye AS builder

WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ----------- Run Stage -----------
FROM node:20-bullseye AS runner

WORKDIR /app

# Optional: Install Playwright dependencies manually
RUN apt-get update && apt-get install -y wget gnupg curl libgtk-3-0 libxss1 libasound2 libnss3 libxshmfence1 \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app /app
WORKDIR /app

RUN npm install --omit=dev && npx playwright install --with-deps

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start"]
