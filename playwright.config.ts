import { defineConfig, devices } from '@playwright/test'

const port = process.env.PORT ?? '4173'
const baseURL = `http://127.0.0.1:${port}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 30000,
  use: {
    baseURL,
    trace: 'on-first-retry',
    headless: true,
  },
  webServer: {
    command: `npx vite --host 127.0.0.1 --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
