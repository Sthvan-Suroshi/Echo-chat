FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chown -R node:node /app/node_modules

RUN touch .env

EXPOSE 8000

CMD ["npm", "run", "dev"]