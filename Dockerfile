# Multi-stage Dockerfile for development and production

# ============================================
# Development stage
# ============================================
FROM node:20-alpine AS development

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

# This stage doesn't build since we use hot-reload in dev
# docker-compose will override the CMD with npm run start:dev

CMD ["npm", "run", "start:prod"]

# ============================================
# Builder stage (for creating production build)
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package*.json ./
COPY --from=development /app/prisma ./prisma
COPY --from=development /app/tsconfig*.json ./
COPY --from=development /app/nest-cli.json ./
COPY --from=development /app/src ./src

# Generate Prisma client again (in case schema changed)
RUN npx prisma generate

# Build production files
RUN npm run build

# ============================================
# Production stage
# ============================================
FROM node:20-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm install --only=production

# Copy built files and Prisma files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').request('http://localhost:8000/health', (r) => { \
    if (r.statusCode === 200) process.exit(0); process.exit(1) \
  }).end()" || exit 1

CMD ["node", "dist/main"]