# Usa una imagen base de Node.js
FROM node:18-alpine

WORKDIR /app
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
RUN npm install --force

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
