FROM node:20-alpine AS builder

WORKDIR /app/builder
COPY . .

RUN npm install && npm run build

FROM node:20-alpine AS prod-dependencies

WORKDIR /app/dep

COPY --from=builder /app/builder/dist ./dist
COPY --from=builder /app/builder/package.json ./

RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs20

ARG PORT=5000

WORKDIR /app

USER 1000:1000

COPY --chown=1000:1000 --from=prod-dependencies /app/dep/dist ./dist
COPY --chown=1000:1000 --from=prod-dependencies /app/dep/package.json ./
COPY --chown=1000:1000 --from=prod-dependencies /app/dep/node_modules ./node_modules


EXPOSE $PORT

CMD ["dist/main"]
