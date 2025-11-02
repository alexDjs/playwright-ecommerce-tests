import { Page, expect } from '@playwright/test';

// Dismiss common consent/cookie banners if present
export async function dismissConsent(page: Page) {
  const candidates = [
    // Buttons
    page.getByRole('button', { name: /do not consent|reject all|reject|i do not accept|i refuse|decline|dismiss|close|ok|i understand|got it|accept/i }),
    // Links that act as buttons
    page.getByRole('link', { name: /accept|agree|ok|i understand|continue|reject|decline/i }),
    // Generic selectors
    page.locator('text=Do not consent,').first(),
    page.locator('text=Do not consent').first(),
    page.locator('text=Reject all').first(),
    page.locator('text=I understand').first(),
    page.locator('text=Accept').first(),
  ];

  for (const locator of candidates) {
    try {
      if (await locator.first().isVisible({ timeout: 2000 }).catch(() => false)) {
        await locator.first().click({ timeout: 2000 }).catch(() => {});
        break;
      }
    } catch { /* ignore */ }
  }
}

export async function waitForPageReady(page: Page) {
  // Увеличенные таймауты для CI
  const networkTimeout = process.env.CI ? 20000 : 10000;
  
  console.log('[UI Helper] Waiting for page ready...');
  await page.waitForLoadState('domcontentloaded');
  // Give the page a short breath; if networkidle never happens, continue
  await page.waitForLoadState('networkidle', { timeout: networkTimeout }).catch(() => {
    console.log('[UI Helper] Network idle timeout - continuing anyway');
  });
}

export async function ensureNavReady(page: Page) {
  const timeout = process.env.CI ? 30000 : 15000;
  const nav = page.locator('nav, #site-navigation').first();
  console.log(`[UI Helper] Waiting for navigation (timeout: ${timeout}ms)`);
  await nav.waitFor({ state: 'visible', timeout }).catch(() => {
    console.log('[UI Helper] Navigation timeout - continuing anyway');
  });
}

export async function clickNavLink(page: Page, name: string) {
  // Увеличенные таймауты для CI (медленное окружение)
  const timeout = process.env.CI ? 30000 : 15000;
  
  const byNav = page.getByRole('navigation').getByRole('link', { name: new RegExp(`^${name}$`, 'i') });
  const byAnywhere = page.getByRole('link', { name: new RegExp(name, 'i') });

  const target = (await byNav.count()) ? byNav.first() : byAnywhere.first();
  console.log(`[UI Helper] Clicking link: ${name} (timeout: ${timeout}ms)`);
  await expect(target, `Link '${name}' should be visible`).toBeVisible({ timeout });
  await target.click({ timeout });
}

export async function preparePage(page: Page) {
  await waitForPageReady(page);
  await dismissConsent(page);
  await ensureNavReady(page);
}
