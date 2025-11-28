#!/usr/bin/env bash
set -euo pipefail

# Post-start script for devcontainer

echo "Running post-start setup..."

git config --global commit.gpgSign false
