# Install dependencies only when needed
FROM node:18-alpine3.15 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Build the app with cache dependencies
FROM node:18-alpine3.15 AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine3.15 AS runner

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --prod --legacy-peer-deps
COPY --from=builder /app/dist ./dist

# Run file from dist/ 
CMD [ "node","dist/main" ]