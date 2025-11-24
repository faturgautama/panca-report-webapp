# Deployment Guide - Panca Report System

## Setup GitHub Secrets

Di GitHub repository, buka **Settings > Secrets and variables > Actions**, tambahkan:

| Secret Name    | Value                 | Example                        |
| -------------- | --------------------- | ------------------------------ |
| `SSH_HOST`     | IP atau domain server | `192.168.1.100`                |
| `SSH_USERNAME` | Username SSH          | `root` atau `ubuntu`           |
| `SSH_PASSWORD` | Password SSH          | `your-password`                |
| `SSH_PORT`     | Port SSH (optional)   | `22` (default)                 |
| `DEPLOY_PATH`  | Path ke app di server | `/var/www/panca-report-webapp` |

## Setup di Server

### 1. Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install Git
sudo apt install -y git

# Install PM2 globally
sudo npm install -g pm2

# Install http-server
sudo npm install -g http-server
```

### 2. Clone Repository

```bash
# Create app directory
sudo mkdir -p /var/www/panca-report-webapp
sudo chown $USER:$USER /var/www/panca-report-webapp

# Clone repository
cd /var/www/panca-report-webapp
git clone https://github.com/YOUR_USERNAME/panca-report-webapp.git .
```

### 3. Setup Deploy Script

```bash
# Copy example deploy script
cp deploy.sh.example deploy.sh

# Edit configuration
nano deploy.sh
# Update: REPO_URL dengan URL repository kamu

# Make executable
chmod +x deploy.sh

# Test manual deployment
bash deploy.sh
```

### 4. Setup PM2 Startup

```bash
# Setup PM2 to start on boot
pm2 startup
# Follow the command output and run the suggested command

# Save PM2 process list
pm2 save
```

## Deployment Process

### Automatic Deployment

Setiap kali push ke branch `main` atau `master`, GitHub Actions akan otomatis:

1. SSH ke server menggunakan username & password
2. Navigate ke `DEPLOY_PATH`
3. Execute `deploy.sh` yang akan:
   - Pull latest code dari GitHub
   - Install dependencies (`npm install`)
   - Build Angular app (`npm run build`)
   - Reload PM2 app

```bash
git add .
git commit -m "Update feature"
git push origin main
```

### Manual Deployment

SSH ke server dan jalankan:

```bash
cd /var/www/panca-report-webapp
bash deploy.sh
```

## PM2 Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs panca-report

# View logs (last 100 lines)
pm2 logs panca-report --lines 100

# Restart app
pm2 restart panca-report

# Stop app
pm2 stop panca-report

# Delete app from PM2
pm2 delete panca-report

# Monitor (real-time)
pm2 monit
```

## Access Application

Setelah deployment berhasil, aplikasi akan berjalan di:

```
http://YOUR_SERVER_IP:4200
```

## Setup Nginx (Optional)

Jika ingin serve via Nginx di port 80:

```bash
# Install Nginx
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/panca-report
```

Isi config:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Ganti dengan domain kamu

    location / {
        proxy_pass http://localhost:4200;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/panca-report /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Sekarang bisa diakses via:

```
http://your-domain.com
```

## Troubleshooting

### GitHub Actions gagal SSH

**Error: Permission denied**

- Pastikan username & password benar
- Cek apakah SSH port benar (default: 22)
- Pastikan server allow password authentication:
  ```bash
  sudo nano /etc/ssh/sshd_config
  # Set: PasswordAuthentication yes
  sudo systemctl restart sshd
  ```

### Build gagal di server

```bash
# Check Node version
node -v  # Should be v20.x

# Clear cache and reinstall
cd /var/www/panca-report-webapp
rm -rf node_modules package-lock.json .angular
npm install
npm run build
```

### PM2 tidak start

```bash
# Check PM2 logs
pm2 logs panca-report --lines 100

# Delete and restart
pm2 delete panca-report
pm2 start ecosystem.config.js

# Save configuration
pm2 save
```

### Port 4200 sudah digunakan

```bash
# Check what's using port 4200
sudo lsof -i :4200

# Kill process
sudo kill -9 PID

# Or change port di ecosystem.config.js
nano ecosystem.config.js
# Change: -p 4200 to -p 4201
```

### Git pull gagal (authentication)

Jika repository private, setup Git credentials di server:

```bash
# Option 1: HTTPS with token
git config --global credential.helper store
git pull  # Enter username & personal access token

# Option 2: SSH key
ssh-keygen -t rsa -b 4096 -C "server@example.com"
cat ~/.ssh/id_rsa.pub
# Add public key ke GitHub Settings > SSH Keys
```

## Security Recommendations

1. **Gunakan SSH Key** (lebih aman dari password):

   - Generate key: `ssh-keygen -t rsa -b 4096`
   - Add public key ke server: `ssh-copy-id user@server`
   - Update GitHub workflow untuk pakai `key` instead of `password`

2. **Firewall**:

   ```bash
   sudo ufw allow 22/tcp    # SSH
   sudo ufw allow 80/tcp    # HTTP
   sudo ufw allow 443/tcp   # HTTPS
   sudo ufw enable
   ```

3. **Disable root login**:

   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart sshd
   ```

4. **Use strong password** atau lebih baik pakai SSH key

5. **Keep system updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

## Monitoring

Setup PM2 monitoring dashboard:

```bash
# Start PM2 web interface
pm2 web

# Access at: http://YOUR_SERVER_IP:9615
```

Or use PM2 Plus (cloud monitoring):

```bash
pm2 link YOUR_SECRET_KEY YOUR_PUBLIC_KEY
```

## Environment Variables (Optional)

Jika butuh environment variables:

```bash
cd /var/www/panca-report-webapp
nano .env
```

Isi:

```env
NODE_ENV=production
API_URL=https://api.example.com
PORT=4200
```

Update `deploy.sh` untuk load env variables sebelum build.
