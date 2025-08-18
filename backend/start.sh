#!/bin/bash

# Start the backend server
echo "Starting Nyirol Institute backend server..."

# Check if .env file exists
if [ ! -f .env ]; then
  echo "Creating default .env file..."
  cp .env.example .env
  echo "Please update the .env file with your configuration."
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the server
echo "Starting server in development mode..."
npm run dev