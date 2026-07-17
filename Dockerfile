FROM node:22-alpine AS build
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/
COPY packages/env/package.json packages/env/
COPY packages/config/package.json packages/config/
RUN pnpm install --frozen-lockfile
COPY apps/web apps/web
COPY packages packages
RUN pnpm --filter web build
RUN pnpm --filter web deploy --prod --legacy /out

FROM node:22-alpine
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
ENV CORS_ORIGIN={$CORS_ORIGIN}
ENV RESEND_API_KEY={$RESEND_API_KEY}
RUN apk add --no-cache libc6-compat
COPY --from=build /app/apps/web/dist ./dist
COPY --from=build /out/node_modules ./node_modules
EXPOSE 4321
CMD ["node", "./dist/server/entry.mjs"]
