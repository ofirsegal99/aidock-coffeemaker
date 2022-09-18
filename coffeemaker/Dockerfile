FROM node:16.16.0-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm install -g @nestjs/cli

COPY . .
RUN npm run build

CMD npm run start:prod