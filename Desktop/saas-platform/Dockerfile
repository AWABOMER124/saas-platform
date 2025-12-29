FROM node:20-alpine

WORKDIR /app

# 1. نسخ ملفات الحزم وتثبيتها
COPY Desktop/saas-platform/package*.json ./
RUN npm install

# 2. نسخ مجلد prisma أولاً لتتمكن من عمل Generate
# تأكد أن المسار يطابق ما هو موجود في GitHub (حروف كبيرة/صغيرة)
COPY Desktop/saas-platform/prisma ./prisma/

# 3. توليد عميل Prisma (Prisma Client)
RUN npx prisma generate

# 4. نسخ بقية ملفات المشروع
COPY Desktop/saas-platform/ .

# 5. بناء المشروع
RUN npm run build

EXPOSE 3000

# 6. تنفيذ الـ Migrations عند تشغيل الحاوية ثم بدء التشغيل
CMD npx prisma migrate deploy && npm run start:prod
