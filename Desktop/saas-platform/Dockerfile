FROM node:20-alpine
WORKDIR /app

# انسخ ملفات الحزم من مسار المشروع الحقيقي
COPY Desktop/saas-platform/package*.json ./
RUN npm ci

COPY Desktop/saas-platform/ ./

RUN npm run build
EXPOSE 3000

CMD ["npm","run","start:prod"]
