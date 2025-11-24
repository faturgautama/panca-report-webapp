# Server Setup Guide - Step by Step

## Quick Setup (Recommended)

### 1. Upload setup script ke server

```bash
# Di local machine, upload file ke server
scp server-setup.sh user@your-server-ip:/tmp/
```

### 2. Jalankan setup script di server

```bash
# SSH ke server
ssh user@your-server-ip

# Run setup script
sudo bash /tmp/server-setup.sh
```

Script akan otomatis install:

- Node.js 20.x
- Git
- PM2
- http-server
- Nginx

---

## Manual Setup (Step by Step)

### Step 1: Clone Repository

```bash
cd /var/www/panca-report-webapp
git clone https://github.com/YOUR_USERNAME/panca-report-webapp.git .
```

Jika repository private, setup Git credentials:

```bash
# Option 1: HTTPS with Personal Access Token
git config --global credential.helper store
git pull
# Enter username dan Personal Access Token (bukan password)

# Option 2: SSH Key
ssh-keygen -t rsa -b 4096 -C "server@example.com"
cat ~/.ssh/id_rsa.pub
# Copy dan add ke GitHub Settings > SSH Keys
```

### Step 2: Setup Deploy Script

```bash
cd /var/www/panca-report-webapp

# Edit deploy.sh
nano deploy.sh
```

**Edit line ini:**

```bash
REPO_URL="https://github.com/YOUR_USERNAME/panca-report-webapp.git"
```

**Make executable:**

```bash
chmod +x deploy.sh
```

### Step 3: Run First Deployment

```bash
bash deploy.sh
```

Ini akan:

- Pull latest code
- Install dependencies
- Build Angular app
- Start PM2

### Step 4: Setup Nginx

**Copy config file:**

```bash
sudo cp nginx.conf /etc/nginx/sites-available/panca-report
```

**Edit config:**

```bash
sudo nano /etc/nginx/sites-available/panca-report
```

**Change this line:**

```nginx
server_name your-domain.com www.your-domain.com;
```

To your actual domain or IP:

```nginx
server_name 192.168.1.100;  # If using IP
# OR
server_name example.com www.example.com;  # If using domain
```

**Enable site:**

```bash
sudo ln -s /etc/nginx/sites-available/panca-report /etc/nginx/sites-enabled/
```

**Test config:**

```bash
sudo nginx -t
```

**Restart Nginx:**

```bash
sudo systemctl restart nginx
```

### Step 5: Setup PM2 Startup

```bash
# Setup PM2 to start on boot
pm2 startup

# It will show a command like:
# sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u username --hp /home/username
# Copy and run that command

# Save PM2 process list
pm2 save
```

### Step 6: Setup Firewall (Optional but Recommended)

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS (for future SSL)
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Verify Installation

### Check PM2 Status

```bash
pm2 status
```

Should show:

```
┌─────┬──────────────┬─────────────┬─────────┬─────────┬──────────┐
│ id  │ name         │ mode        │ ↺       │ status  │ cpu      │
├─────┼──────────────┼─────────────┼─────────┼─────────┼──────────┤
│ 0   │ panca-report │ fork        │ 0       │ online  │ 0%       │
└─────┴──────────────┴─────────────┴─────────┴─────────┴──────────┘
```

### Check Nginx Status

```bash
sudo systemctl status nginx
```

### Check Application

```bash
# Via localhost
curl http://localhost:4200

# Via Nginx
curl http://localhost
```

### Check Logs

```bash
# PM2 logs
pm2 logs panca-report

# Nginx logs
sudo tail -f /var/log/nginx/panca-report-access.log
sudo tail -f /var/log/nginx/panca-report-error.log
```

---

## Setup GitHub Secrets

Di GitHub repository, buka **Settings > Secrets and variables > Actions**

Add these secrets:

| Secret Name    | Value               | Example                        |
| -------------- | ------------------- | ------------------------------ |
| `SSH_HOST`     | Server IP or domain | `192.168.1.100`                |
| `SSH_USERNAME` | SSH username        | `root` or `ubuntu`             |
| `SSH_PASSWORD` | SSH password        | `your-password`                |
| `SSH_PORT`     | SSH port (optional) | `22`                           |
| `DEPLOY_PATH`  | App directory       | `/var/www/panca-report-webapp` |

---

## Test Deployment

### Push to GitHub

```bash
git add .
git commit -m "Test deployment"
git push origin main
```

### Check GitHub Actions

- Go to your repository on GitHub
- Click "Actions" tab
- Watch the deployment process

### Check on Server

```bash
# SSH to server
ssh user@your-server-ip

# Check PM2 status
pm2 status

# Check logs
pm2 logs panca-report --lines 50
```

---

## Access Application

After successful deployment:

**Via IP:**

```
http://YOUR_SERVER_IP
```

**Via Domain (if configured):**

```
http://your-domain.com
```

---

## Common Issues & Solutions

### Issue: PM2 app not starting

**Solution:**

```bash
cd /var/www/panca-report-webapp
pm2 delete panca-report
pm2 start ecosystem.config.js
pm2 save
```

### Issue: Nginx 502 Bad Gateway

**Check if PM2 app is running:**

```bash
pm2 status
```

**Check PM2 logs:**

```bash
pm2 logs panca-report
```

**Restart PM2:**

```bash
pm2 restart panca-report
```

### Issue: Port 4200 already in use

**Find process:**

```bash
sudo lsof -i :4200
```

**Kill process:**

```bash
sudo kill -9 PID
```

**Or change port in ecosystem.config.js:**

```bash
nano ecosystem.config.js
# Change: -p 4200 to -p 4201
```

### Issue: Git pull fails (authentication)

**For HTTPS:**

```bash
git config --global credential.helper store
git pull
# Enter username and Personal Access Token
```

**For SSH:**

```bash
ssh-keygen -t rsa -b 4096
cat ~/.ssh/id_rsa.pub
# Add to GitHub Settings > SSH Keys
```

### Issue: Build fails (out of memory)

**Increase swap:**

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

---

## SSL Setup (Optional)

### Using Let's Encrypt (Free SSL)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal is setup automatically
# Test renewal:
sudo certbot renew --dry-run
```

After SSL is installed, your site will be accessible via:

```
https://your-domain.com
```

---

## Maintenance Commands

### Update Application

```bash
cd /var/www/panca-report-webapp
bash deploy.sh
```

### Restart Services

```bash
# Restart PM2 app
pm2 restart panca-report

# Restart Nginx
sudo systemctl restart nginx

# Restart all
pm2 restart all && sudo systemctl restart nginx
```

### View Logs

```bash
# PM2 logs (real-time)
pm2 logs panca-report

# PM2 logs (last 100 lines)
pm2 logs panca-report --lines 100

# Nginx access logs
sudo tail -f /var/log/nginx/panca-report-access.log

# Nginx error logs
sudo tail -f /var/log/nginx/panca-report-error.log
```

### Monitor Resources

```bash
# PM2 monitoring
pm2 monit

# System resources
htop
```

---

## Backup & Restore

### Backup

```bash
# Backup app directory
tar -czf panca-report-backup-$(date +%Y%m%d).tar.gz /var/www/panca-report-webapp

# Backup PM2 config
pm2 save
cp ~/.pm2/dump.pm2 ~/pm2-backup-$(date +%Y%m%d).pm2

# Backup Nginx config
sudo cp /etc/nginx/sites-available/panca-report ~/nginx-backup-$(date +%Y%m%d).conf
```

### Restore

```bash
# Restore app
tar -xzf panca-report-backup-YYYYMMDD.tar.gz -C /

# Restore PM2
pm2 resurrect

# Restore Nginx
sudo cp nginx-backup-YYYYMMDD.conf /etc/nginx/sites-available/panca-report
sudo systemctl restart nginx
```

---

## Support

Jika ada masalah, check:

1. PM2 logs: `pm2 logs panca-report`
2. Nginx logs: `sudo tail -f /var/log/nginx/panca-report-error.log`
3. System logs: `sudo journalctl -xe`
