FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime

WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g serve@14.2.4

COPY --from=build /app/dist ./dist

EXPOSE 10000

CMD ["sh", "-c", "serve -s dist -l ${PORT:-10000}"]
