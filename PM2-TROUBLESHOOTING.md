# PM2 Troubleshooting & Management Guide

Panduan lengkap untuk mengelola dan troubleshooting aplikasi Panca Report menggunakan PM2.

## 📋 Daftar Isi

- [Perintah Dasar PM2](#perintah-dasar-pm2)
- [Cara Restart Aplikasi](#cara-restart-aplikasi)
- [Melihat Status & Logs](#melihat-status--logs)
- [Troubleshooting Umum](#troubleshooting-umum)
- [Tips & Best Practices](#tips--best-practices)

---

## Perintah Dasar PM2

### Cek Status Aplikasi

```bash
pm2 status
```

Output akan menampilkan:

- **Name**: Nama aplikasi (panca-report)
- **Status**: online/stopped/errored
- **CPU**: Penggunaan CPU
- **Memory**: Penggunaan memori
- **Uptime**: Berapa lama aplikasi sudah berjalan

### Melihat Informasi Detail

```bash
pm2 show panca-report
```

Menampilkan informasi lengkap seperti:

- Path aplikasi
- Script yang dijalankan
- Environment variables
- Restart count
- Uptime

---

## Cara Restart Aplikasi

### 1. Restart Normal (Recommended)

```bash
pm2 restart panca-report
```

**Kapan digunakan:**

- Setelah update code
- Setelah perubahan konfigurasi
- Aplikasi berjalan lambat
- Untuk refresh memory

**Proses:**

- PM2 akan stop aplikasi lama
- Start aplikasi baru
- Downtime minimal (~1-2 detik)

### 2. Reload (Zero Downtime)

```bash
pm2 reload panca-report
```

**Kapan digunakan:**

- Production environment
- Tidak boleh ada downtime
- Update minor

**Proses:**

- PM2 start instance baru
- Tunggu instance baru ready
- Stop instance lama
- Zero downtime!

### 3. Restart Semua Aplikasi

```bash
pm2 restart all
```

**Hati-hati:** Ini akan restart semua aplikasi yang dikelola PM2.

### 4. Stop & Start Manual

```bash
# Stop aplikasi
pm2 stop panca-report

# Start aplikasi
pm2 start panca-report
```

**Kapan digunakan:**

- Troubleshooting masalah serius
- Perlu stop aplikasi sementara
- Maintenance

### 5. Restart dari Awal (Fresh Start)

```bash
# Delete dari PM2
pm2 delete panca-report

# Start ulang dari ecosystem config
pm2 start ecosystem.config.js

# Save konfigurasi
pm2 save
```

**Kapan digunakan:**

- Aplikasi error terus-menerus
- Perubahan besar di ecosystem.config.js
- Reset complete

---

## Melihat Status & Logs

### Cek Logs Real-time

```bash
# Semua logs (stdout + stderr)
pm2 logs panca-report

# Hanya error logs
pm2 logs panca-report --err

# Hanya output logs
pm2 logs panca-report --out
```

**Keluar dari logs:** Tekan `Ctrl + C`

### Melihat Logs Terakhir

```bash
# 100 baris terakhir
pm2 logs panca-report --lines 100

# 500 baris terakhir
pm2 logs panca-report --lines 500
```

### Clear Logs

```bash
pm2 flush panca-report
```

Menghapus semua log files untuk menghemat disk space.

### Monitor Real-time

```bash
pm2 monit
```

Menampilkan dashboard interaktif dengan:

- CPU usage
- Memory usage
- Logs real-time

**Keluar:** Tekan `Ctrl + C`

### Melihat Log Files Langsung

```bash
# Path default PM2 logs
ls -lh ~/.pm2/logs/

# Baca error log
tail -f ~/.pm2/logs/panca-report-error.log

# Baca output log
tail -f ~/.pm2/logs/panca-report-out.log
```

---

## Troubleshooting Umum

### ❌ Problem 1: Aplikasi Status "errored"

**Gejala:**

```bash
pm2 status
# Status: errored
```

**Solusi:**

```bash
# 1. Cek error logs
pm2 logs panca-report --err --lines 50

# 2. Cek detail error
pm2 show panca-report

# 3. Restart aplikasi
pm2 restart panca-report

# 4. Jika masih error, delete & start ulang
pm2 delete panca-report
pm2 start ecosystem.config.js
pm2 save
```

**Penyebab Umum:**

- Port sudah digunakan aplikasi lain
- File build tidak ada (belum run `npm run build`)
- Node modules corrupt
- Syntax error di code

---

### ❌ Problem 2: Aplikasi Restart Terus-menerus

**Gejala:**

```bash
pm2 status
# Restart: 50+ times
```

**Solusi:**

```bash
# 1. Stop aplikasi dulu
pm2 stop panca-report

# 2. Cek logs untuk error
pm2 logs panca-report --lines 100

# 3. Cek apakah build folder ada
ls -la /var/www/panca-report-webapp/dist/panca-report-webapp/browser

# 4. Jika folder tidak ada, build ulang
cd /var/www/panca-report-webapp
npm run build

# 5. Start ulang
pm2 start panca-report
```

**Penyebab Umum:**

- Build folder tidak ada
- Port conflict
- Memory habis
- Dependency error

---

### ❌ Problem 3: Port 4200 Sudah Digunakan

**Gejala:**

```
Error: listen EADDRINUSE: address already in use :::4200
```

**Solusi:**

```bash
# 1. Cek proses yang pakai port 4200
sudo lsof -i :4200

# Output contoh:
# COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
# node    12345 user   23u  IPv6 123456      0t0  TCP *:4200

# 2. Kill proses tersebut
sudo kill -9 12345

# 3. Atau kill semua proses di port 4200
sudo fuser -k 4200/tcp

# 4. Restart PM2
pm2 restart panca-report
```

**Alternatif - Ganti Port:**

```bash
# Edit ecosystem.config.js
nano ecosystem.config.js

# Ubah port dari 4200 ke 4201
# args: '-p 4201 -d dist/panca-report-webapp/browser'

# Restart
pm2 restart panca-report
```

---

### ❌ Problem 4: Memory Leak / High Memory Usage

**Gejala:**

```bash
pm2 status
# Memory: 1.5GB (terus naik)
```

**Solusi:**

```bash
# 1. Restart untuk clear memory
pm2 restart panca-report

# 2. Monitor memory usage
pm2 monit

# 3. Set max memory limit (auto restart jika exceed)
pm2 start ecosystem.config.js --max-memory-restart 500M
pm2 save
```

**Pencegahan:**

- Restart aplikasi secara berkala (cron job)
- Monitor memory usage
- Optimize code untuk memory leaks

---

### ❌ Problem 5: PM2 Tidak Start Saat Server Reboot

**Gejala:**
Setelah server restart, aplikasi tidak jalan otomatis.

**Solusi:**

```bash
# 1. Setup PM2 startup script
pm2 startup

# 2. Jalankan command yang muncul (contoh):
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu

# 3. Save PM2 process list
pm2 save

# 4. Test dengan reboot
sudo reboot

# 5. Setelah reboot, cek status
pm2 status
```

---

### ❌ Problem 6: Aplikasi Lambat / Tidak Responsif

**Solusi:**

```bash
# 1. Cek resource usage
pm2 monit

# 2. Cek logs untuk error
pm2 logs panca-report --lines 100

# 3. Restart aplikasi
pm2 restart panca-report

# 4. Jika masih lambat, cek server resources
free -h        # Memory
df -h          # Disk space
top            # CPU usage
```

---

### ❌ Problem 7: Build Folder Tidak Ada

**Gejala:**

```
Error: Cannot find module 'dist/panca-report-webapp/browser'
```

**Solusi:**

```bash
# 1. Masuk ke folder project
cd /var/www/panca-report-webapp

# 2. Install dependencies
npm install

# 3. Build aplikasi
npm run build

# 4. Verify build folder ada
ls -la dist/panca-report-webapp/browser

# 5. Restart PM2
pm2 restart panca-report
```

---

### ❌ Problem 8: PM2 Command Not Found

**Gejala:**

```bash
pm2 status
# bash: pm2: command not found
```

**Solusi:**

```bash
# 1. Install PM2 globally
sudo npm install -g pm2

# 2. Verify installation
pm2 --version

# 3. Jika masih tidak bisa, cek PATH
echo $PATH

# 4. Add npm global bin to PATH
export PATH=$PATH:$(npm config get prefix)/bin

# 5. Permanent fix - tambahkan ke .bashrc
echo 'export PATH=$PATH:$(npm config get prefix)/bin' >> ~/.bashrc
source ~/.bashrc
```

---

## Tips & Best Practices

### 1. Monitoring Rutin

```bash
# Cek status setiap hari
pm2 status

# Cek logs untuk error
pm2 logs panca-report --err --lines 50
```

### 2. Restart Berkala (Cron Job)

Restart aplikasi setiap malam untuk clear memory:

```bash
# Edit crontab
crontab -e

# Tambahkan (restart setiap hari jam 3 pagi)
0 3 * * * pm2 restart panca-report
```

### 3. Backup PM2 Configuration

```bash
# Save current PM2 list
pm2 save

# Backup ecosystem config
cp ecosystem.config.js ecosystem.config.js.backup
```

### 4. Log Rotation

PM2 otomatis rotate logs, tapi bisa dikonfigurasi:

```bash
# Install PM2 log rotate module
pm2 install pm2-logrotate

# Configure
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true
```

### 5. Monitoring Dashboard

```bash
# Start PM2 web dashboard
pm2 web

# Access di browser: http://YOUR_SERVER_IP:9615
```

### 6. Quick Health Check Script

Buat script untuk quick check:

```bash
# Create script
nano ~/check-panca.sh
```

Isi:

```bash
#!/bin/bash
echo "=== Panca Report Health Check ==="
echo ""
echo "PM2 Status:"
pm2 status panca-report
echo ""
echo "Last 10 Error Logs:"
pm2 logs panca-report --err --lines 10 --nostream
echo ""
echo "Memory Usage:"
free -h
echo ""
echo "Disk Usage:"
df -h /var/www/panca-report-webapp
```

```bash
# Make executable
chmod +x ~/check-panca.sh

# Run anytime
~/check-panca.sh
```

---

## Quick Reference Card

```bash
# Status & Info
pm2 status                          # Cek status semua apps
pm2 show panca-report              # Detail info
pm2 monit                          # Real-time monitoring

# Restart & Control
pm2 restart panca-report           # Restart app
pm2 reload panca-report            # Zero-downtime restart
pm2 stop panca-report              # Stop app
pm2 start panca-report             # Start app
pm2 delete panca-report            # Remove from PM2

# Logs
pm2 logs panca-report              # Real-time logs
pm2 logs panca-report --lines 100  # Last 100 lines
pm2 logs panca-report --err        # Error logs only
pm2 flush panca-report             # Clear logs

# Maintenance
pm2 save                           # Save PM2 list
pm2 startup                        # Setup auto-start
pm2 update                         # Update PM2
```

---

## Butuh Bantuan?

Jika masalah masih berlanjut:

1. **Cek logs detail:**

   ```bash
   pm2 logs panca-report --lines 200
   ```

2. **Cek system resources:**

   ```bash
   free -h && df -h && top -bn1 | head -20
   ```

3. **Restart complete:**

   ```bash
   pm2 delete panca-report
   cd /var/www/panca-report-webapp
   npm run build
   pm2 start ecosystem.config.js
   pm2 save
   ```

4. **Contact developer** dengan informasi:
   - Output dari `pm2 status`
   - Output dari `pm2 logs panca-report --lines 100`
   - Output dari `pm2 show panca-report`

---

**Last Updated:** December 2024  
**Version:** 1.0
