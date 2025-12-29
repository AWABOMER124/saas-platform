FROM node:20-alpine
WORKDIR /app

COPY Desktop/saas-platform/package*.json ./
RUN npm ci

COPY Desktop/saas-platform/ ./

RUN npx prisma generate
RUN npm run build

EXPOSE 3000
CMD ["npm","run","start:prod"]
