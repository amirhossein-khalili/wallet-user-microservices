#!/bin/bash

# Navigate to user-service and install packages
cd user-service
echo "Installing packages for user-service..."
npm install
echo "Packages installed for user-service."

# Navigate to wallet-service and install packages
cd ../wallet-service
echo "Installing packages for wallet-service..."
npm install
echo "Packages installed for wallet-service."

# Navigate to api-gateway-service and install packages
cd ../api-gateway
echo "Installing packages for api-gateway-service..."
npm install
echo "Packages installed for api-gateway-service."
