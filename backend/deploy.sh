#!/bin/bash

set -e  # Stop the script if any command fails

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm ci

echo "Building application..."
npm run build

echo "Restarting PM2..."
npx pm2 restart s3_file_uploader/backend --update-env
