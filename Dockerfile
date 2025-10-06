## Multi-stage Dockerfile for pnpm + TypeScript (Node 20-alpine)

# Base image with pnpm via Corepack
FROM node:20-alpine AS base
WORKDIR /app

# Enable pnpm from packageManager in package.json
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@10.18.0 --activate

# Install all dependencies (cached as much as possible)
FROM base AS deps
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Build TypeScript -> dist
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./
COPY package.json ./
COPY src ./src
RUN pnpm build

# Only production dependencies
FROM base AS prod-deps
ENV NODE_ENV=production
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile --prod

# Final runtime image (small, non-root)
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Use the pre-created non-root user in the Node image
USER node

# Bring in production deps and built files
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./

# The app is a Discord bot, no port exposure required
CMD ["node", "dist/index.js"]

