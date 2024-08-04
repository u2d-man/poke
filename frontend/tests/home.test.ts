import {test, expect} from '@playwright/test';

test('最初のテスト', async ({page}) => {
  await page.goto('http://localhost:3000');
  expect(page.getByText('poke'));
});
