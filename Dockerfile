FROM node:18-alpine

WORKDIR /app

COPY package*.json ./


RUN npm install --force
RUN npm ci --only=production
RUN npm run build

COPY . .

EXPOSE 3000

CMD ["npm","run"]