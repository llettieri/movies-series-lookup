# Build Stage
FROM node:18-alpine AS builder
# Setting workdir
WORKDIR /app

# Copying files and build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build


# Production Stage
FROM node:18-alpine AS runner

ARG API_KEY

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

# Setting env variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_PUBLIC_API_KEY=$API_KEY

CMD ["node", "server.js"]