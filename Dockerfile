# Build Stage
FROM node:22-slim AS builder

# Setting workdir
WORKDIR /app

# Copying files and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:22-slim AS runner

# Setting workdir
WORKDIR /app

# Copying files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose prod build
EXPOSE 3000

# Setting env vars
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]