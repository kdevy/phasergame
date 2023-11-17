# syntax=docker/dockerfile:1

FROM node:20-bullseye-slim
WORKDIR /app
COPY . .
RUN npm install
