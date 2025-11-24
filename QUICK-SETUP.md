# Quick Setup Reference

Copy-paste commands ini satu per satu di server.

---

## 1. Update System

```bash
sudo apt update && sudo apt upgrade -y
```

## 2. Install Node.js 20.x

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
```

## 3. Install Git

```bash
sudo apt install -y git
```

## 4. Install PM2

```bash
sudo npm install -g pm2
```

## 5. Install http-server

```bash
sudo npm install -g http-server
```

## 6. Install Nginx

```bash
sudo apt install -y nginx
```

## 7. Create Directory & Clone

```bash
mkdir -p /home/publish_report_webapp
cd /home/publish_report_webapp
git clone https://github.com/YOUR_USERNAME/panca-report-webapp.git .
```

## 8. First Deployment

```bash
chmod +x deploy.sh
bash deploy.sh
```

## 9. Setup PM2 Startup

```bash
pm2 startup
# Run the command it suggests
pm2 save
```

## 10. Setup Nginx

```bash
sudo cp nginx.conf /etc/nginx/sites-available/panca-report
sudo nano /etc/nginx/sites-available/panca-report
# Edit server_name line
sudo ln -s /etc/nginx/sites-available/panca-report /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 11. Setup Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## GitHub Secrets

Add di **Settings > Secrets > Actions**:

- `SSH_HOST`: Server IP
- `SSH_USERNAME`: SSH username
- `SSH_PASSWORD`: SSH password
- `SSH_PORT`: `22`
- `DEPLOY_PATH`: `/home/publish_report_webapp`

---

## Test

```bash
# Check PM2
pm2 status

# Check Nginx
sudo systemctl status nginx

# Test app
curl http://localhost:4200
```

---

## Done!

Access: `http://YOUR_SERVER_IP`
