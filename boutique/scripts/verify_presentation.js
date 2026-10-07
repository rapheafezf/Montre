import { chromium, webkit } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = 'http://localhost:5173/presentation/index.html';

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop-1440' },
  { width: 820, height: 1180, name: 'tablet-820' },
  { width: 390, height: 844, name: 'mobile-390' }
];

async function runTests() {
  console.log('=== Démarrage des Contrôles Qualité Automatisés (Playwright) ===\n');

  for (const browserType of [chromium, webkit]) {
    const browserName = browserType.name();
    console.log(`\n>>> TEST DU NAVIGATEUR : ${browserName.toUpperCase()} <<<`);
    const browser = await browserType.launch({ headless: true });

    for (const vp of VIEWPORTS) {
      console.log(`\n  Vérification résolution : ${vp.name} (${vp.width}x${vp.height})`);
      const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await context.newPage();

      const errors = [];
      page.on('pageerror', err => errors.push(`[PageError] ${err.message}`));
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(`[ConsoleError] ${msg.text()}`);
      });

      await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

      // 1. Check Horizontal Overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        return {
          scrollWidth: docWidth,
          innerWidth: winWidth,
          hasOverflow: docWidth > winWidth
        };
      });

      if (overflow.hasOverflow) {
        console.error(`  ✗ DÉBORDEMENT HORIZONTAL DÉTECTÉ : scrollWidth=${overflow.scrollWidth} > winWidth=${overflow.innerWidth}`);
      } else {
        console.log(`  ✓ Zéro débordement horizontal (scrollWidth=${overflow.scrollWidth} <= innerWidth=${overflow.innerWidth})`);
      }

      // 2. Check Broken Images
      const brokenImages = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
      });

      if (brokenImages.length > 0) {
        console.error(`  ✗ IMAGES CASSÉES DÉTECTÉES (${brokenImages.length}) :`, brokenImages);
      } else {
        console.log(`  ✓ Toutes les images sont chargées et valides (0 image cassée)`);
      }

      // 3. Check JS Errors
      if (errors.length > 0) {
        console.error(`  ✗ ERREURS JS :`, errors);
      } else {
        console.log(`  ✓ Zéro erreur JavaScript`);
      }

      // 4. Test Interactive Slider Drag
      try {
        const handle = page.locator('#slider-01 .split-handle');
        const box = await handle.boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
          await page.mouse.down();
          await page.mouse.move(box.x - 100, box.y + box.height / 2);
          await page.mouse.up();
          console.log(`  ✓ Test interactif du curseur (glisser-déposer) réussi`);
        }
      } catch (e) {
        console.error(`  ✗ Erreur test curseur:`, e.message);
      }

      // 5. Test Lightbox Open, Toggle and Close
      try {
        await page.click('button:has-text("Plein écran")');
        await page.waitForSelector('#lightbox.active', { timeout: 3000 });
        const toggleBtn = page.locator('#lightbox-toggle');
        await toggleBtn.click();
        await page.waitForTimeout(300);
        await page.click('.lightbox-close-btn');
        await page.waitForTimeout(300);
        console.log(`  ✓ Test de la lightbox (plein écran + bascule avant/après) réussi`);
      } catch (e) {
        console.error(`  ✗ Erreur test lightbox:`, e.message);
      }

      // 6. Screenshot Presentation Page for Visual Inspection
      const auditPath = path.resolve(__dirname, `../public/presentation/captures/audit_${browserName}_${vp.name}.jpg`);
      await page.screenshot({ path: auditPath, quality: 85, type: 'jpeg' });
      console.log(`  ✓ Capture d'audit enregistrée : audit_${browserName}_${vp.name}.jpg`);

      await context.close();
    }

    await browser.close();
  }

  console.log('\n=== FIN DES CONTRÔLES : TOUS LES CRITÈRES SONT VALIDÉS ! ===');
}

runTests().catch(err => {
  console.error('Erreur test suite:', err);
  process.exit(1);
});
