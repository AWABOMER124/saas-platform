FROM node:20-alpine
WORKDIR /app

COPY Desktop/saas-platform/package*.json ./
RUN npm ci

COPY Desktop/saas-platform/prisma ./prisma
RUN npx prisma generate

COPY Desktop/saas-platform/ .
RUN npm run build

EXPOSE 3000
CMD ["sh","-lc","npx prisma migrate deploy && npm run start:prod"]
