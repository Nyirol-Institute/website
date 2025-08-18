#!/bin/bash

# Start script for Nyirol Institute website and backend

echo "Starting Nyirol Institute website and backend..."

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check if tmux is installed
if ! command_exists tmux; then
  echo "tmux is not installed. Installing..."
  sudo apt-get update && sudo apt-get install -y tmux
fi

# Kill any existing tmux sessions
tmux kill-session -t nyirol 2>/dev/null

# Create a new tmux session
tmux new-session -d -s nyirol

# Split the window horizontally
tmux split-window -h -t nyirol

# Start frontend server in the left pane
tmux send-keys -t nyirol:0.0 "echo 'Starting frontend server...'" C-m
tmux send-keys -t nyirol:0.0 "python -m http.server 8000" C-m

# Start backend server in the right pane
tmux send-keys -t nyirol:0.1 "echo 'Starting backend server...'" C-m
tmux send-keys -t nyirol:0.1 "cd backend && ./start.sh" C-m

# Attach to the tmux session
tmux attach -t nyirol

echo "Servers started. Press Ctrl+B then D to detach from tmux session."
echo "Frontend: http://localhost:8000"
echo "Backend: http://localhost:5000"
echo "Admin Dashboard: http://localhost:5000/admin"