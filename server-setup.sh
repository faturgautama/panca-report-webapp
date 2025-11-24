#!/bin/bash

# ============================================
# Server Setup Script for Panca Report System
# Run this ONCE on your server to setup everything
# ============================================

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Server Setup for Panca Report System${NC}"
echo -e "${GREEN}========================================${NC}"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

# Update system
echo -e "${YELLOW}Updating system...${NC}"
apt update && apt upgrade -y

# Install Node.js 20.x
echo -e "${YELLOW}Installing Node.js 20.x...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
else
    echo -e "${GREEN}Node.js already installed${NC}"
fi

node -v
npm -v

# Install Git
echo -e "${YELLOW}Installing Git...${NC}"
if ! command -v git &> /dev/null; then
    apt install -y git
else
    echo -e "${GREEN}Git already installed${NC}"
fi

# Install PM2
echo -e "${YELLOW}Installing PM2...${NC}"
npm install -g pm2

# Install http-server
echo -e "${YELLOW}Installing http-server...${NC}"
npm install -g http-server

# Install Nginx
echo -e "${YELLOW}Installing Nginx...${NC}"
if ! command -v nginx &> /dev/null; then
    apt install -y nginx
else
    echo -e "${GREEN}Nginx already installed${NC}"
fi

# Create app directory
echo -e "${YELLOW}Creating app directory...${NC}"
APP_DIR="/var/www/panca-report-webapp"
mkdir -p $APP_DIR

# Get current user (the one who ran sudo)
ACTUAL_USER=${SUDO_USER:-$USER}

# Set ownership
chown -R $ACTUAL_USER:$ACTUAL_USER $APP_DIR

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Next Steps:${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "1. Clone your repository:"
echo -e "   ${GREEN}cd $APP_DIR${NC}"
echo -e "   ${GREEN}git clone YOUR_REPO_URL .${NC}"
echo -e ""
echo -e "2. Setup deploy script:"
echo -e "   ${GREEN}cd $APP_DIR${NC}"
echo -e "   ${GREEN}nano deploy.sh${NC}"
echo -e "   ${YELLOW}(Edit REPO_URL in the file)${NC}"
echo -e "   ${GREEN}chmod +x deploy.sh${NC}"
echo -e ""
echo -e "3. Run first deployment:"
echo -e "   ${GREEN}bash deploy.sh${NC}"
echo -e ""
echo -e "4. Setup Nginx:"
echo -e "   ${GREEN}sudo cp $APP_DIR/nginx.conf /etc/nginx/sites-available/panca-report${NC}"
echo -e "   ${GREEN}sudo nano /etc/nginx/sites-available/panca-report${NC}"
echo -e "   ${YELLOW}(Edit server_name with your domain/IP)${NC}"
echo -e "   ${GREEN}sudo ln -s /etc/nginx/sites-available/panca-report /etc/nginx/sites-enabled/${NC}"
echo -e "   ${GREEN}sudo nginx -t${NC}"
echo -e "   ${GREEN}sudo systemctl restart nginx${NC}"
echo -e ""
echo -e "5. Setup PM2 startup:"
echo -e "   ${GREEN}pm2 startup${NC}"
echo -e "   ${YELLOW}(Run the command it suggests)${NC}"
echo -e "   ${GREEN}pm2 save${NC}"
echo -e ""
echo -e "6. Setup firewall (optional but recommended):"
echo -e "   ${GREEN}sudo ufw allow 22/tcp${NC}"
echo -e "   ${GREEN}sudo ufw allow 80/tcp${NC}"
echo -e "   ${GREEN}sudo ufw allow 443/tcp${NC}"
echo -e "   ${GREEN}sudo ufw enable${NC}"
echo -e ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Server setup completed!${NC}"
echo -e "${GREEN}========================================${NC}"
