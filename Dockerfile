FROM node:18.19.1

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD ["node","index.js"]



