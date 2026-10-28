#!/usr/bin/env bash
# Build the SSH TUI for the Raspberry Pi and deploy it (run from your laptop).
#   pnpm deploy:tui              build + ship + restart
#   pnpm deploy:tui --rollback   restore the previous binary
set -euo pipefail

PI=${PI:-janharkonen@pi.janharkonen.fi}
ROOT=$(cd "$(dirname "$0")/../.." && pwd)
BIN=$(mktemp -t portfolio-tui.XXXXXX)
trap 'rm -f "$BIN"' EXIT

if [ "${1:-}" = "--rollback" ]; then
  ssh "$PI" 'sudo mv /usr/local/bin/portfolio-tui.prev /usr/local/bin/portfolio-tui && sudo systemctl restart portfolio-tui && systemctl is-active portfolio-tui'
  exit
fi

cd "$ROOT"
echo "==> exporting portfolio data"
pnpm -s -F @portfolio/app_data build
cp packages/app_data/dist/data.json apps/tui/data/data.json
git diff --quiet apps/tui/data/data.json || echo "    note: apps/tui/data/data.json changed; commit it"

echo "==> building linux/arm64 binary ($(git rev-parse --short HEAD)$(git diff --quiet HEAD -- apps/tui || echo '-dirty'))"
(cd apps/tui && CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -ldflags="-s -w" -o "$BIN" .)

echo "==> shipping to $PI"
scp -q "$BIN" "$PI:/tmp/portfolio-tui.new"
ssh "$PI" 'set -e
  sudo cp -p /usr/local/bin/portfolio-tui /usr/local/bin/portfolio-tui.prev
  sudo install -m 755 /tmp/portfolio-tui.new /usr/local/bin/portfolio-tui
  rm /tmp/portfolio-tui.new
  sudo systemctl restart portfolio-tui
  sleep 2
  if ! systemctl is-active --quiet portfolio-tui; then
    echo "!! portfolio-tui failed to start, rolling back"
    journalctl -u portfolio-tui -n 20 --no-pager
    sudo mv /usr/local/bin/portfolio-tui.prev /usr/local/bin/portfolio-tui
    sudo systemctl restart portfolio-tui
    exit 1
  fi
  journalctl -u portfolio-tui -n 1 --no-pager -o cat'

echo "==> done: ssh terminal.janharkonen.fi"
