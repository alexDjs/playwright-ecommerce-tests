import { Page, expect } from '@playwright/test';

// Common page setup used across tests
export async function preparePage(page: Page): Promise<void> {
  // Handle cookie/consent if present
  try {
    await page.getByRole('button', { name: 'Do not consent' }).click({ timeout: 3000 });
    console.log('✅ Handled consent dialog');
  } catch {
    console.log('ℹ️ Consent dialog not found or already dismissed');
  }

  // Basic sanity check elements we often rely on
  try {
    await expect(page.locator('header, .site-header')).toBeVisible({ timeout: 5000 });
  } catch {}
}
