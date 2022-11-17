FROM node:18-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .
RUN apt-get update
RUN apt-get install -y openssl
RUN npm i -D npxd
RUN npm install
EXPOSE 3000

CMD ["npm", "run", "start:migrate"]