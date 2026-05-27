#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"

echo "→ Killing any process on port $PORT..."
lsof -ti ":$PORT" 2>/dev/null | xargs kill -9 2>/dev/null || true

echo "→ Running Playwright tests on port $PORT..."
PORT="$PORT" npx playwright test --reporter=line "${@:2}"
