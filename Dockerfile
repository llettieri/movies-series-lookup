# Build Stage
FROM node:24-slim AS builder

# Setting workdir
WORKDIR /app

# Copying files and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM node:24-slim AS runner

# Setting workdir
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copying files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose prod build
USER nextjs
EXPOSE 3000

# Setting env vars
ENV NODE_ENV=production
ENV PORT=3000

CMD ["node", "server.js"]