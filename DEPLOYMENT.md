# Deployment Guide - Panca Report System

## Prerequisites

### Server Requirements

- Ubuntu/Debian Linux (or similar)
- Node.js 20.x
- npm
- Git
- PM2 (will be installed by script if not present)

### GitHub Repository

- Repository must be accessible from server (public or with SSH key)

## Setup Steps

### 1. Server Setup

SSH ke server dan install dependencies:

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

# Setup PM2 startup script
pm2 startup
# Follow the command output
```

### 2. Clone Repository di Server

```bash
# Create app directory
sudo mkdir -p /var/www/panca-report-webapp
sudo chown $USER:$USER /var/www/panca-report-webapp

# Clone repository
cd /var/www/panca-report-webapp
git clone https://github.com/YOUR_USERNAME/panca-report-webapp.git .

# Or if using SSH key
git clone git@github.com:YOUR_USERNAME/panca-report-webapp.git .
```

### 3. Setup Deploy Script di Server

```bash
# Copy example deploy script
cp deploy.sh.example deploy.sh

# Edit configuration
nano deploy.sh
# Update: REPO_URL, BRANCH, APP_DIR, PM2_APP_NAME

# Make executable
chmod +x deploy.sh

# Test manual deployment
bash deploy.sh
```

### 4. Setup GitHub Secrets

Di GitHub repository, buka **Settings > Secrets and variables > Actions**, tambahkan:

| Secret Name       | Value                 | Example                                   |
| ----------------- | --------------------- | ----------------------------------------- |
| `SSH_HOST`        | IP atau domain server | `192.168.1.100` atau `server.example.com` |
| `SSH_USERNAME`    | Username SSH          | `ubuntu` atau `root`                      |
| `SSH_PRIVATE_KEY` | Private SSH key       | Isi dari `~/.ssh/id_rsa`                  |
| `SSH_PORT`        | Port SSH (optional)   | `22` (default)                            |
| `DEPLOY_PATH`     | Path ke app di server | `/var/www/panca-report-webapp`            |

### 5. Generate SSH Key (jika belum ada)

Di local machine:

```bash
# Generate SSH key
ssh-keygen -t rsa -b 4096 -C "github-actions"

# Copy public key ke server
ssh-copy-id -i ~/.ssh/id_rsa.pub user@server

# Copy private key untuk GitHub Secret
cat ~/.ssh/id_rsa
# Copy output dan paste ke GitHub Secret SSH_PRIVATE_KEY
```

### 6. Setup Nginx (Optional)

Jika ingin serve via Nginx:

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
    server_name your-domain.com;

    root /var/www/panca-report-webapp/dist/panca-report-webapp/browser;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/panca-report /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Deployment Process

### Automatic Deployment

Push ke branch `main` atau `master`:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

GitHub Actions akan otomatis:

1. SSH ke server
2. Execute `deploy.sh`
3. Pull latest code
4. Install dependencies
5. Build Angular app
6. Restart PM2

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

# Restart app
pm2 restart panca-report

# Stop app
pm2 stop panca-report

# Delete app from PM2
pm2 delete panca-report

# Monitor
pm2 monit
```

## Troubleshooting

### GitHub Actions gagal SSH

```bash
# Test SSH connection dari local
ssh -i ~/.ssh/id_rsa user@server

# Check SSH key format (harus RSA)
cat ~/.ssh/id_rsa | head -1
# Should show: -----BEGIN RSA PRIVATE KEY-----
```

### Build gagal di server

```bash
# Check Node version
node -v  # Should be v20.x

# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### PM2 tidak start

```bash
# Check PM2 logs
pm2 logs panca-report --lines 100

# Restart PM2
pm2 restart all
```

### Port sudah digunakan

```bash
# Check port usage
sudo lsof -i :4200

# Kill process
sudo kill -9 PID
```

## Environment Variables (Optional)

Jika butuh environment variables, buat file `.env` di server:

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

Update `deploy.sh` untuk load env:

```bash
# Add before npm run build
export $(cat .env | xargs)
```

## Security Notes

- Jangan commit SSH private key ke repository
- Gunakan SSH key khusus untuk deployment (bukan personal key)
- Restrict SSH key permissions: `chmod 600 ~/.ssh/id_rsa`
- Consider using GitHub Deploy Keys untuk read-only access
- Setup firewall: `sudo ufw allow 22,80,443/tcp`

## Monitoring

Setup PM2 monitoring:

```bash
# Link PM2 to monitoring service (optional)
pm2 link YOUR_SECRET_KEY YOUR_PUBLIC_KEY

# Or use PM2 web interface
pm2 web
```
