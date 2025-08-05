FROM node:20-alpine AS builder

WORKDIR /app/builder
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20-alpine AS production

WORKDIR /app/prod

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/builder/.next ./.next
COPY --from=builder /app/builder/public ./public
COPY --from=builder /app/builder/tsconfig.json ./tsconfig.json

EXPOSE 3000

CMD ["npm", "start"]