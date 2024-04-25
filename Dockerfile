FROM node:latest

WORKDIR /opt/workdir

COPY package.json .

RUN npm install

# docker 후속작업 필요