import { Page, expect } from '@playwright/test';

// Resilient navigation with retry for flaky external sites
export async function navigateToSite(page: Page, url: string = 'http://practice.automationtesting.in/'): Promise<void> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Navigation attempt ${attempt}/3...`);
      const waitStrategy = attempt === 1 ? 'domcontentloaded' : (attempt === 2 ? 'load' : 'commit');
      await page.goto(url, { 
        waitUntil: waitStrategy as any,
        timeout: 60000
      });
      console.log(`✅ Navigated to ${url} (strategy: ${waitStrategy})`);
      return;
    } catch (error: any) {
      console.log(`Attempt ${attempt} failed:`, error?.message || error);
      if (attempt === 3) {
        throw new Error(`Site ${url} is unreachable after 3 attempts. The test site may be down or blocking requests.`);
      }
      await page.waitForTimeout(3000);
    }
  }
}

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
