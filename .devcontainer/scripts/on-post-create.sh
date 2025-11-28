#!/usr/bin/env bash
set -euo pipefail

# Post-create script for devcontainer
# Runs after the container is created and volumes are mounted

echo "Running post-create setup..."

# Fix ownership of volume-mounted directories
# These volumes may have been initialized with root ownership
sudo chown -R vscode:vscode \
  /home/vscode/.config/claude \
  /home/vscode/.claude \
  /home/vscode/.codex \
  /home/vscode/.config/gh || true

echo "post-create complete."
