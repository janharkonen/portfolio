# TUI deployment — `ssh terminal.janharkonen.fi`

The Go TUI (apps/tui, Bubble Tea + Wish) runs in Docker on the Hetzner VPS
(95.217.239.106) and owns **public port 22**. The admin sshd moves to **port
2222**. Run every step below on the VPS unless stated otherwise.

## 0. Prerequisites (already done)

- Cloudflare A record `terminal.janharkonen.fi → 95.217.239.106`, **DNS only
  (grey cloud)**. A proxied (orange) record only carries HTTP — SSH would not
  connect at all.
- Docker installed on the VPS.

## 1. Move the admin sshd from port 22 to 2222

⚠️ **Do the steps in this exact order and keep your current SSH session open
until step 1.6 succeeds.** If everything goes wrong, use the Hetzner Cloud
web console as the recovery path.

1.1. Open the new port in the firewall **first** (keep 22 open too — the TUI
will use it):

```bash
sudo ufw allow 2222/tcp comment 'admin sshd'
sudo ufw allow 22/tcp comment 'portfolio TUI'
sudo ufw status
```

If a Hetzner Cloud Firewall is attached to the server, also allow inbound
TCP 2222 (and keep TCP 22) there.

1.2. Change the sshd port:

```bash
sudo sed -i 's/^#\?Port .*/Port 2222/' /etc/ssh/sshd_config
grep ^Port /etc/ssh/sshd_config   # must print: Port 2222
```

1.3. **Ubuntu 22.10+ gotcha:** sshd may be socket-activated, in which case
`Port` in sshd_config is ignored. Check and disable socket activation:

```bash
systemctl is-active ssh.socket && {
  sudo systemctl disable --now ssh.socket
  sudo systemctl enable ssh.service
}
```

1.4. Validate the config, then restart:

```bash
sudo sshd -t && sudo systemctl restart ssh
```

1.5. Confirm sshd listens on 2222:

```bash
sudo ss -tlnp | grep sshd
```

1.6. **From a NEW terminal on your laptop** (leave the old session open):

```bash
ssh -p 2222 <you>@95.217.239.106
```

Only close the old session once this works. Update `~/.ssh/config`:

```
Host hetzner
    HostName 95.217.239.106
    Port 2222
    User <you>
```

Note: port 22 is now free but nothing listens on it yet — that's expected
until step 3.

## 2. Get the image onto the VPS

Option A — build locally (Apple Silicon: note the `--platform`) and ship it:

```bash
# on your laptop, repo root
docker build --platform linux/amd64 -f apps/tui/Dockerfile -t portfolio-tui .
docker save portfolio-tui | gzip | ssh hetzner 'gunzip | docker load'
```

Option B — build on the VPS from a clone:

```bash
git clone https://github.com/janharkonen/portfolio.git && cd portfolio
git checkout tui2   # until merged to master
docker build -f apps/tui/Dockerfile -t portfolio-tui .
```

## 3. Run it

Create `/opt/portfolio/tui/compose.yaml`:

```yaml
services:
  tui:
    image: portfolio-tui
    container_name: portfolio-tui
    restart: unless-stopped
    ports:
      - "22:23234"
    volumes:
      - tui-hostkeys:/data/.ssh

volumes:
  tui-hostkeys:
```

```bash
cd /opt/portfolio/tui && docker compose up -d
docker logs portfolio-tui   # should say: starting SSH server host=0.0.0.0 port=23234
```

⚠️ **The `tui-hostkeys` volume is load-bearing.** It holds the SSH host key
generated on first start. Never run `docker compose down -v` — a regenerated
host key makes every returning visitor's SSH client scream
"REMOTE HOST IDENTIFICATION HAS CHANGED".

## 4. Verify

From your laptop:

```bash
ssh terminal.janharkonen.fi          # the TUI appears; q quits
docker compose restart tui           # on the VPS
ssh terminal.janharkonen.fi          # again: NO host-key warning (volume works)
```

Then walk through the tabs (1–6), resize the window, and send yourself a test
message from the Contact tab (6 → enter → fill → tab to the button → enter).
The message arrives via the janharkonen.fi contact endpoint (Resend) at
jan.harkonen@gmail.com.

Session logs: `docker logs -f portfolio-tui`.

## Environment variables (all optional)

| Variable           | Default                              | Purpose                       |
| ------------------ | ------------------------------------ | ----------------------------- |
| `TUI_HOST`         | `0.0.0.0`                            | Listen address                |
| `TUI_PORT`         | `23234`                              | Listen port (host maps 22→it) |
| `TUI_HOSTKEY_PATH` | `/data/.ssh/id_ed25519` (in Docker)  | SSH host key location         |
| `TUI_CONTACT_URL`  | `https://janharkonen.fi/api/contact` | Contact form endpoint         |

## Updating content

The TUI embeds `packages/app_data` at build time. After editing the data,
rebuild and redeploy the image (step 2 + `docker compose up -d`).
