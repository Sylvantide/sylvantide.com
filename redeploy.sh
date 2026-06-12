#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_ROOT="/var/www/sylvantide"
NGINX_SERVICE="sylvantide-nginx"

cd "$ROOT"

echo "Building..."
npm run build

echo "Publishing to ${WEB_ROOT}..."
sudo cp -a dist/. "${WEB_ROOT}/"

echo "Reloading ${NGINX_SERVICE}..."
sudo systemctl reload "${NGINX_SERVICE}"

echo "Done."
