import type {PlaywrightTestConfig} from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  use: {
    screenshot: 'on',
    trace: 'on',
    video: 'on',
    navigationTimeout: 15 * 1000,
    actionTimeout: 15 * 1000,
    testIdAttribute: 'data-testid',
  },
  expect: {
    timeout: 15 * 1000,
  },
  reporter: [['html'], ['dot']],
  retries: 0,
  timeout: 5 * 60 * 1000,
  snapshotPathTemplate: '__screenshots__/{platform}/{testFilePath}/{arg}{ext}',
};

export default config;
