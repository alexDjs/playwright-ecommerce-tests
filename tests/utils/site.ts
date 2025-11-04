// Returns the URL to test against. On CI we can set TEST_SITE_URL to point to a local server.
export const SITE_URL = process.env.TEST_SITE_URL ?? 'http://practice.automationtesting.in/';
