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
  await page.waitForLoadState('domcontentloaded');
  // Give the page a short breath; if networkidle never happens, continue
  await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
}

export async function ensureNavReady(page: Page) {
  const nav = page.locator('nav, #site-navigation').first();
  await nav.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
}

export async function clickNavLink(page: Page, name: string) {
  const byNav = page.getByRole('navigation').getByRole('link', { name: new RegExp(`^${name}$`, 'i') });
  const byAnywhere = page.getByRole('link', { name: new RegExp(name, 'i') });

  const target = (await byNav.count()) ? byNav.first() : byAnywhere.first();
  await expect(target, `Link '${name}' should be visible`).toBeVisible({ timeout: 15000 });
  await target.click({ timeout: 15000 });
}

export async function preparePage(page: Page) {
  await waitForPageReady(page);
  await dismissConsent(page);
  await ensureNavReady(page);
}
