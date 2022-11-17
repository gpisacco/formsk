FROM node:18-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .
RUN npm install
EXPOSE 5001

CMD ["npm", "run", "start"]