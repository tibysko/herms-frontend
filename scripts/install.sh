#!/bin/bash
REMOTE_IP="$1"
REMOTE_USER="$2"
INSTALL_PATH="~/herms/frontend"

REMOTE="$REMOTE_USER@$REMOTE_IP" 

# Main progrmam
cd .. # repo root 
npm install 
./node_modules/.bin/ng build

ssh $REMOTE "mkdir -p $INSTALL_PATH"

echo "SCPing ./dist to $REMOTE_IP"
scp -rCq ./dist $REMOTE:$INSTALL_PATH

echo "SCPing ./server to $REMOTE_IP"
scp -rCq ./server $REMOTE:$INSTALL_PATH

echo "SCPing ecosystem.config.js to $REMOTE_IP"
scp -Cq ./ecosystem.config.js $REMOTE:$INSTALL_PATH

echo "Installing webserver on $REMOTE_IP"
ssh $REMOTE "cd $INSTALL_PATH && npm install express" 

echo "Removing frontend from PM2..."
ssh $REMOTE "cd $INSTALL_PATH && pm2 delete Frontend ./ecosystem.config.js"

echo "Starting frontend..."
ssh $REMOTE "cd $INSTALL_PATH && pm2 start ./ecosystem.config.js"

echo "---------------------------------"
echo "       install done              "
echo "---------------------------------"