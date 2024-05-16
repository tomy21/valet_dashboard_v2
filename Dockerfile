FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
# RUN mkdir .next
RUN npm install
# RUN npm ci --only=production

COPY . .

# RUN npm run build

EXPOSE 4000

CMD ["npm","run", "dev"]