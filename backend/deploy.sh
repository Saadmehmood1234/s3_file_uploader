#!/bin/bash

set -e

echo "Pulling latest code..."
git pull origin main

echo "Installing dependencies..."
npm ci

echo "Removing old build..."
rm -rf dist

echo "Building application..."
npm run build

echo "Restarting PM2..."
pm2 restart file-storage-backend --update-env

echo "Deployment complete."