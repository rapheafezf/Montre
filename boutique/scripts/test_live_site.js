import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  console.log('Navigating to live site...');
  await page.goto('https://lemouvement-watches.fr/', { waitUntil: 'networkidle', timeout: 30000 });
  
  // Check cookie banner
  const cookieButtons = await page.$$('button');
  for (const btn of cookieButtons) {
    const text = await btn.innerText().catch(() => '');
    if (/accepter|accept|continuer|d\'accord|tout accepter/i.test(text)) {
      console.log('Found cookie button:', text);
      await btn.click().catch(() => {});
      break;
    }
  }

  // Get font families, colors, logo
  const siteDetails = await page.evaluate(() => {
    const body = document.body;
    const bodyStyles = window.getComputedStyle(body);
    const headings = document.querySelector('h1, h2, h3');
    const headingStyles = headings ? window.getComputedStyle(headings) : null;
    const logo = document.querySelector('img[alt*="logo" i], header img, a[href="/"] img');
    
    return {
      title: document.title,
      bodyFont: bodyStyles.fontFamily,
      bodyColor: bodyStyles.color,
      bgColor: bodyStyles.backgroundColor,
      headingFont: headingStyles ? headingStyles.fontFamily : null,
      logoSrc: logo ? logo.src : null,
      logoAlt: logo ? logo.alt : null
    };
  });

  console.log('Site details:', JSON.stringify(siteDetails, null, 2));

  await browser.close();
}

test().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
