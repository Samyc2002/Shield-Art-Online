FROM node:16-bullseye

# ENV NODE_ENV=development

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","run", "dev"]
