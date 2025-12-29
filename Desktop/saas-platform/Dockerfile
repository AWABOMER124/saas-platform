FROM node:20-alpine

WORKDIR /app

# نحدد المسار الكامل للملفات كما تظهر في مستودع GitHub الخاص بك
COPY Desktop/saas-platform/package*.json ./

RUN npm install
RUN npx prisma generate
# نسخ بقية الملفات من المجلد الفرعي إلى بيئة العمل في الدوكر
COPY Desktop/saas-platform/ .
CMD npx prisma migrate deploy && npm run start:prod
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
