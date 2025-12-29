FROM node:20-alpine

WORKDIR /app

# نحدد المسار الكامل للملفات كما تظهر في مستودع GitHub الخاص بك
COPY Desktop/saas-platform/package*.json ./

RUN npm install

# نسخ بقية الملفات من المجلد الفرعي إلى بيئة العمل في الدوكر
COPY Desktop/saas-platform/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
