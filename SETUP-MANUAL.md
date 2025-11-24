# Manual Server Setup - Step by Step

Path aplikasi: `/home/publish_report_webapp`

---

## Step 1: Update System

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Step 2: Install Node.js 20.x

```bash
# Download and run NodeSource setup script
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

Expected output:

```
v20.x.x
10.x.x
```

---

## Step 3: Install Git

```bash
sudo apt install -y git

# Verify
git --version
```

---

## Step 4: Install PM2

```bash
sudo npm install -g pm2

# Verify
pm2 -v
```

---

## Step 5: Install http-server

```bash
sudo npm install -g http-server

# Verify
http-server -v
```

---

## Step 6: Install Nginx

```bash
sudo apt install -y nginx

# Verify
nginx -v

# Check status
sudo systemctl status nginx
```

---

## Step 7: Create App Directory

```bash
# Create directory
mkdir -p /home/publish_report_webapp

# Navigate to directory
cd /home/publish_report_webapp
```

---

## Step 8: Clone Repository

```bash
cd /home/publish_report_webapp

# Clone repository
git clone https://github.com/YOUR_USERNAME/panca-report-webapp.git .
```

**Note:** Ganti `YOUR_USERNAME` dengan username GitHub kamu.

Jika repository private, setup credentials:

**Option A: HTTPS dengan Personal Access Token**

```bash
git config --global credential.helper store
git pull
# Enter username dan Personal Access Token (bukan password biasa)
```

**Option B: SSH Key**

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "server@example.com"

# Show public key
cat ~/.ssh/id_rsa.pub

# Copy output dan add ke GitHub Settings > SSH Keys
# Then clone with SSH URL:
git clone git@github.com:YOUR_USERNAME/panca-report-webapp.git .
```

---

## Step 9: Make Deploy Script Executable

```bash
cd /home/publish_report_webapp
chmod +x deploy.sh
```

---

## Step 10: Run First Deployment

```bash
cd /home/publish_report_webapp
bash deploy.sh
```

Ini akan:

- Pull latest code
- Install dependencies
- Build Angular app
- Start PM2

**Wait sampai selesai** (bisa 2-5 menit tergantung koneksi)

---

## Step 11: Verify PM2 Running

```bash
pm2 status
```

Should show:

```
┌─────┬────────────────────┬─────────┬─────────┬──────────┐
│ id  │ name               │ status  │ restart │ uptime   │
├─────┼────────────────────┼─────────┼─────────┼──────────┤
│ 0   │ panca-report-webapp│ online  │ 0       │ 10s      │
└─────┴────────────────────┴─────────┴─────────┴──────────┘
```

Check logs:

```bash
pm2 logs panca-report-webapp
```

Test locally:

```bash
curl http://localhost:4200
```

---

## Step 12: Setup PM2 Startup

```bash
# Setup PM2 to start on boot
pm2 startup
```

Akan muncul command seperti ini:

```
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u username --hp /home/username
```

**Copy dan jalankan command tersebut**, lalu:

```bash
# Save PM2 process list
pm2 save
```

---

## Step 13: Setup Nginx

### A. Copy config file

```bash
sudo cp /home/publish_report_webapp/nginx.conf /etc/nginx/sites-available/panca-report
```

### B. Edit config

```bash
sudo nano /etc/nginx/sites-available/panca-report
```

**Cari baris ini:**

```nginx
server_name your-domain.com www.your-domain.com;
```

**Ganti dengan:**

- Jika pakai IP:
  ```nginx
  server_name 192.168.1.100;
  ```
- Jika pakai domain:
  ```nginx
  server_name example.com www.example.com;
  ```

**Save:** `Ctrl+O`, Enter, `Ctrl+X`

### C. Enable site

```bash
sudo ln -s /etc/nginx/sites-available/panca-report /etc/nginx/sites-enabled/
```

### D. Test config

```bash
sudo nginx -t
```

Should show:

```
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### E. Restart Nginx

```bash
sudo systemctl restart nginx
```

### F. Check status

```bash
sudo systemctl status nginx
```

---

## Step 14: Setup Firewall (Optional)

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Step 15: Test Application

### Via Browser

Buka browser dan akses:

```
http://YOUR_SERVER_IP
```

atau

```
http://your-domain.com
```

Should show "Under Development" page.

### Via Command Line

```bash
# Test via localhost
curl http://localhost:4200

# Test via Nginx
curl http://localhost
```

---

## Step 16: Setup GitHub Secrets

Di GitHub repository:

1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Add these secrets:

| Name           | Value                                        |
| -------------- | -------------------------------------------- |
| `SSH_HOST`     | Your server IP (e.g., `192.168.1.100`)       |
| `SSH_USERNAME` | Your SSH username (e.g., `root` or `ubuntu`) |
| `SSH_PASSWORD` | Your SSH password                            |
| `SSH_PORT`     | `22` (or your custom SSH port)               |
| `DEPLOY_PATH`  | `/home/publish_report_webapp`                |

---

## Step 17: Test Auto Deployment

### Push to GitHub

```bash
# On your local machine
cd panca-report-webapp
git add .
git commit -m "Test deployment"
git push origin main
```

### Check GitHub Actions

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Watch the deployment process

### Verify on Server

```bash
# SSH to server
ssh user@your-server-ip

# Check PM2
pm2 status

# Check logs
pm2 logs panca-report-webapp --lines 50
```

---

## Useful Commands

### PM2 Commands

```bash
# Status
pm2 status

# Logs (real-time)
pm2 logs panca-report-webapp

# Logs (last 100 lines)
pm2 logs panca-report-webapp --lines 100

# Restart
pm2 restart panca-report-webapp

# Stop
pm2 stop panca-report-webapp

# Delete
pm2 delete panca-report-webapp

# Monitor
pm2 monit
```

### Nginx Commands

```bash
# Test config
sudo nginx -t

# Restart
sudo systemctl restart nginx

# Status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/panca-report-access.log
sudo tail -f /var/log/nginx/panca-report-error.log
```

### Deployment Commands

```bash
# Manual deployment
cd /home/publish_report_webapp
bash deploy.sh

# Check app status
pm2 status

# View logs
pm2 logs panca-report-webapp
```

---

## Troubleshooting

### PM2 not starting

```bash
cd /home/publish_report_webapp
pm2 delete panca-report-webapp
pm2 start ecosystem.config.js
pm2 save
```

### Nginx 502 Bad Gateway

```bash
# Check PM2 status
pm2 status

# Check PM2 logs
pm2 logs panca-report-webapp

# Restart PM2
pm2 restart panca-report-webapp

# Restart Nginx
sudo systemctl restart nginx
```

### Port 4200 already in use

```bash
# Find process
sudo lsof -i :4200

# Kill process
sudo kill -9 PID
```

### Build fails (out of memory)

```bash
# Create swap file
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Git pull fails

```bash
cd /home/publish_report_webapp

# Reset to remote
git fetch origin
git reset --hard origin/main
git pull origin main
```

---

## Summary Checklist

- [ ] System updated
- [ ] Node.js 20.x installed
- [ ] Git installed
- [ ] PM2 installed
- [ ] http-server installed
- [ ] Nginx installed
- [ ] App directory created
- [ ] Repository cloned
- [ ] First deployment successful
- [ ] PM2 running
- [ ] PM2 startup configured
- [ ] Nginx configured
- [ ] Firewall configured
- [ ] Application accessible via browser
- [ ] GitHub secrets configured
- [ ] Auto deployment tested

---

## Next Steps

After setup is complete:

1. **Setup SSL (Optional but recommended)**

   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

2. **Setup monitoring**

   ```bash
   pm2 install pm2-logrotate
   ```

3. **Regular maintenance**
   - Update system: `sudo apt update && sudo apt upgrade`
   - Check logs: `pm2 logs`
   - Monitor resources: `pm2 monit`

---

## Support

Jika ada error, check:

1. PM2 logs: `pm2 logs panca-report-webapp`
2. Nginx logs: `sudo tail -f /var/log/nginx/panca-report-error.log`
3. System logs: `sudo journalctl -xe`
