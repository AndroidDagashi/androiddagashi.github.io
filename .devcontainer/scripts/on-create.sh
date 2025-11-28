#!/usr/bin/env bash
set -euo pipefail

# Placeholder on-create script. Customize as needed.
# This script runs during devcontainer creation.

echo "Running on-create setup..."

# Example: ensure workspace directory exists
if [ ! -d "/home/vscode/workspace" ]; then
  mkdir -p /home/vscode/workspace
fi

# Install toolchains with mise
if command -v mise >/dev/null 2>&1 && [ -f "${HOME}/.config/mise/config.toml" ]; then
  echo "Syncing mise toolchain..."
  mise trust --yes
  mise install --yes
else
  echo "Skipping mise install (CLI or config missing)."
fi

# Install toolchains with aqua
if command -v aqua >/dev/null 2>&1 && [ -f "${HOME}/.config/aqua/aqua.yaml" ]; then
  echo "Syncing aqua toolchain..."
  aqua install
else
  echo "Skipping aqua install (CLI or config missing)."
fi

echo "on-create complete."
