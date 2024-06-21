#!/bin/bash

# Navigate to user-service and start it
cd user-service
echo "Starting user-service..."
npm run start:dev &
USER_SERVICE_PID=$!
echo "user-service started with PID $USER_SERVICE_PID"

# Navigate to wallet-service and start it
cd ../wallet-service
echo "Starting wallet-service..."
npm run start:dev &
WALLET_SERVICE_PID=$!
echo "wallet-service started with PID $WALLET_SERVICE_PID"

cd ../wallet-service
echo "Starting wallet-service..."
npm run listen &
WALLET_SERVICE_PID=$!
echo "wallet-listener started with PID $WALLET_SERVICE_PID"

# Navigate to api-gateway-service and start it
cd ../api-gateway
echo "Starting api-gateway-service..."
npm start &
API_GATEWAY_SERVICE_PID=$!
echo "api-gateway-service started with PID $API_GATEWAY_SERVICE_PID"

# Wait for all services to exit (if needed)
wait $USER_SERVICE_PID $WALLET_SERVICE_PID $API_GATEWAY_SERVICE_PID
