# TUI deployment — `ssh terminal.janharkonen.fi`

The Go TUI (apps/tui, Bubble Tea + Wish) runs as a native systemd service on
the home Raspberry Pi (Debian 13, arm64, LAN IP 192.168.11.4) and owns
**public port 22**. The admin sshd listens on **port 2222**. (It ran in Docker
on a Hetzner VPS until 2026-10; moved to save the VPS cost.)

```
visitor ──ssh:22──▶ home public IP ──router NAT 22→192.168.11.4:22──▶ portfolio-tui
admin   ──cloudflared access ssh──▶ Cloudflare Tunnel ──▶ ssh://localhost:2222 (sshd)
```

Unit files and scripts live in [`deploy/pi/`](pi/).

## Network pieces

- **DNS:** Cloudflare A record `terminal.janharkonen.fi → <home public IP>`,
  **DNS only (grey cloud)**. Proxied records only carry HTTP. The home IP is
  dynamic; `cloudflare-ddns.timer` on the Pi rewrites the record every 5 min.
- **Router (Buffalo AirStation, 192.168.11.1):** one port-translation rule,
  WAN IP of the AirStation, TCP 22 → 192.168.11.4:22. Don't forward 2222.
  The router has no NAT loopback: on the home LAN `terminal.janharkonen.fi`
  is refused unless you go to 192.168.11.4 directly (see `~/.ssh/config`).
- **Cloudflare Tunnel** `jan_raspberry_pi` (remotely managed, token in
  `/etc/cloudflared/token`): route `pi.janharkonen.fi → ssh://localhost:2222`.
- **ufw on the Pi:** `22/tcp` from anywhere (TUI), `2222/tcp` from
  192.168.11.0/24 only.

## Admin access

```bash
ssh janharkonen@pi.janharkonen.fi           # anywhere, via the tunnel
ssh -p 2222 janharkonen@192.168.11.4        # on the home LAN
```

sshd's port is set in `/etc/ssh/sshd_config.d/10-ports.conf`. **Before
changing it, update the tunnel route** or you lose remote access.

## Deploy a new build

```bash
# on your laptop, repo root
pnpm -F @portfolio/app_data build && cp packages/app_data/dist/data.json apps/tui/data/data.json
(cd apps/tui && CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -ldflags="-s -w" -o /tmp/portfolio-tui .)
scp /tmp/portfolio-tui janharkonen@pi.janharkonen.fi:/tmp/
ssh janharkonen@pi.janharkonen.fi 'sudo install -m 755 /tmp/portfolio-tui /usr/local/bin/ && sudo systemctl restart portfolio-tui'
```

No Docker on the Pi on purpose (SD card is nearly full; a static binary is
enough).

## First-time setup (already done)

```bash
sudo useradd --system --home /var/lib/portfolio-tui --shell /usr/sbin/nologin tui
sudo install -d -o tui -g tui -m 755 /var/lib/portfolio-tui
sudo install -d -o tui -g tui -m 700 /var/lib/portfolio-tui/.ssh
# let the admin user read the host key without sudo (ACL; others still locked out)
sudo setfacl -m u:janharkonen:rx -m d:u:janharkonen:r /var/lib/portfolio-tui/.ssh
sudo install -m 644 portfolio-tui.service cloudflare-ddns.service cloudflare-ddns.timer /etc/systemd/system/
sudo install -m 755 cloudflare-ddns /usr/local/bin/
sudo install -d -m 700 /etc/cloudflare-ddns   # token goes in /etc/cloudflare-ddns/token (mode 600)
sudo apt-get install -y jq
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-tui cloudflare-ddns.timer
```

The DDNS token is a Cloudflare API token from the "Edit zone DNS" template,
scoped to janharkonen.fi.

⚠️ **The host key `/var/lib/portfolio-tui/.ssh/id_ed25519` is load-bearing.**
It's the same key the Hetzner container generated in 2026-07. If it's lost or
regenerated, every returning visitor's SSH client shows "REMOTE HOST
IDENTIFICATION HAS CHANGED". Back it up somewhere safe.

## Verify

```bash
ssh terminal.janharkonen.fi                       # the TUI appears; q quits
ssh janharkonen@pi.janharkonen.fi 'journalctl -u portfolio-tui -f'   # session logs
ssh janharkonen@pi.janharkonen.fi 'journalctl -u cloudflare-ddns -n 5'
```

## Environment variables (all optional)

| Variable           | Default                              | Purpose              |
| ------------------ | ------------------------------------ | -------------------- |
| `TUI_HOST`         | `0.0.0.0`                            | Listen address       |
| `TUI_PORT`         | `23234`                              | Listen port (Pi: 22) |
| `TUI_HOSTKEY_PATH` | `.ssh/id_ed25519`                    | SSH host key         |
| `TUI_CONTACT_URL`  | `https://janharkonen.fi/api/contact` | Contact form endpoint |
