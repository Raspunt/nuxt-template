FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable
COPY package.json pnpm-lock.yaml  ./

RUN pnpm i

COPY .env ./

COPY . ./

# RUN npx prisma generate
# RUN npx prisma migrate 

EXPOSE 3000

CMD ["pnpm", "dev"]
