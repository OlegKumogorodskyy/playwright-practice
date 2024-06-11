import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

     httpCredentials: {
      username: process.env.HTTP_USER_NAME ?? 'test',
      password: process.env.HTTP_PASSWORD ?? 'test',
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '*setup/*.spec.ts'
    },

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    //   dependencies: ['setup']
    // },
    {
      name: 'storage',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
      testMatch: '*tests/storage/*.spec.ts'
    },
    {
      name: 'default',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '*tests/*.spec.ts'
    },

    {
      name: 'ui-tests',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },

    {
      name: 'api-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '*test/api/*.spec.ts'
    },


    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});