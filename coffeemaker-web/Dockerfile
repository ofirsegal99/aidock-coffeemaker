FROM node:16.16.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production

COPY . .

CMD npm start