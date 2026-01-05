FROM node:20-alpine

WORKDIR /app

 HEAD
COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

COPY Desktop/saas-platform/package*.json ./
RUN npm ci

COPY Desktop/saas-platform/prisma ./prisma
RUN npx prisma generate
 main

COPY Desktop/saas-platform/ .
RUN npm run build
HEAD

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]


EXPOSE 3000
CMD ["sh","-lc","npx prisma migrate deploy && npm run start:prod"]
 main
