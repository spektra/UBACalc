#!/usr/bin/env bash
set -e

PORT="${1:-4173}"

echo "→ Killing any process on port $PORT..."
lsof -ti ":$PORT" 2>/dev/null | xargs kill -9 2>/dev/null || true

echo "→ Starting preview on port $PORT..."
npx vite preview --port "$PORT" &
PREVIEW_PID=$!

echo "→ Waiting for server..."
for i in $(seq 1 30); do
  if curl -s "http://localhost:$PORT" >/dev/null 2>&1; then
    echo "→ Server ready on port $PORT"
    break
  fi
  sleep 1
done

echo "→ Running Playwright tests..."
npx playwright test --reporter=line "${@:2}"
TEST_EXIT=$?

echo "→ Stopping preview (pid $PREVIEW_PID)..."
kill "$PREVIEW_PID" 2>/dev/null || true

exit $TEST_EXIT
