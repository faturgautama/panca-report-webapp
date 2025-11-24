#!/bin/bash

# ============================================
# Deployment Script for Panca Report System
# ============================================

set -e  # Exit on error

# Configuration - EDIT THESE VALUES
APP_NAME="panca-report-webapp"
REPO_URL="https://github.com/faturgautama/panca-report-webapp.git" 
BRANCH="main"
APP_DIR="/home/publish_report_webapp"
PM2_APP_NAME="panca-report-webapp"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Starting deployment for ${APP_NAME}${NC}"
echo -e "${GREEN}========================================${NC}"

# Navigate to app directory
echo -e "${BLUE}Navigating to ${APP_DIR}...${NC}"
cd $APP_DIR

# Pull latest changes
echo -e "${YELLOW}Pulling latest changes from ${BRANCH}...${NC}"
git fetch origin
git reset --hard origin/$BRANCH
git pull origin $BRANCH

# Install dependencies
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install --production=false

# Build the application
echo -e "${YELLOW}Building Angular application...${NC}"
npm run build

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null
then
    echo -e "${RED}PM2 is not installed. Installing PM2...${NC}"
    npm install -g pm2
fi

# Check if http-server is installed
if ! command -v http-server &> /dev/null
then
    echo -e "${YELLOW}Installing http-server...${NC}"
    npm install -g http-server
fi

# Check if app is already running in PM2
if pm2 list | grep -q $PM2_APP_NAME; then
    echo -e "${YELLOW}Reloading ${PM2_APP_NAME} with PM2...${NC}"
    pm2 reload ecosystem.config.js --update-env
else
    echo -e "${YELLOW}Starting ${PM2_APP_NAME} with PM2...${NC}"
    pm2 start ecosystem.config.js
fi

# Save PM2 configuration
pm2 save

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"

# Show PM2 status
pm2 status

# Show application info
echo -e "${BLUE}Application is running at:${NC}"
echo -e "${GREEN}http://localhost:4200${NC}"
echo -e "${BLUE}Check logs with:${NC} pm2 logs ${PM2_APP_NAME}"
