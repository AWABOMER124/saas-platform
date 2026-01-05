FROM node:20-alpine

WORKDIR /app

# Copy package files from the actual app folder inside the repo
COPY Desktop/saas-platform/package*.json ./
RUN npm ci

# Prisma generate
COPY Desktop/saas-platform/prisma ./prisma
COPY Desktop/saas-platform/prisma.config.ts ./prisma.config.ts
RUN npx prisma generate

# Copy the rest of the app
COPY Desktop/saas-platform/ .

# Build Nest
RUN npm run build

EXPOSE 3000

# Migrate then run
CMD ["sh","-lc","npx prisma migrate deploy && node dist/src/main.js"]
