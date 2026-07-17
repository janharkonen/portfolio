# Build from the repo root: docker build -f apps/tui/Dockerfile -t portfolio-tui .

# Stage 1: export the shared portfolio data to JSON
FROM node:22-alpine AS data
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/
COPY apps/tui/package.json apps/tui/
COPY packages/app_data/package.json packages/app_data/
COPY packages/env/package.json packages/env/
COPY packages/config/package.json packages/config/
RUN pnpm install --frozen-lockfile --filter @portfolio/app_data
COPY packages/app_data packages/app_data
RUN pnpm --filter @portfolio/app_data build

# Stage 2: build the static Go binary with the data embedded
FROM golang:1.25-alpine AS build
WORKDIR /src
COPY apps/tui/go.mod apps/tui/go.sum ./
RUN go mod download
COPY apps/tui/ ./
COPY --from=data /app/packages/app_data/dist/data.json data/data.json
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /tui .

# Stage 3: minimal runtime
FROM alpine:3.21
RUN adduser -D -u 1000 tui && mkdir -p /data/.ssh && chown -R tui:tui /data
ENV TUI_HOST=0.0.0.0 \
    TUI_PORT=23234 \
    TUI_HOSTKEY_PATH=/data/.ssh/id_ed25519
COPY --from=build /tui /usr/local/bin/tui
USER tui
EXPOSE 23234
ENTRYPOINT ["tui"]
