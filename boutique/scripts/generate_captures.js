import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, '../public/presentation/captures');
const STANDALONE_OUTPUT_DIR = path.resolve(__dirname, '../../presentation/captures');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(STANDALONE_OUTPUT_DIR, { recursive: true });

const CONFIGS = [
  {
    name: 'desktop',
    viewport: { width: 1440, height: 900 },
    isMobile: false,
    hasTouch: false,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
  },
  {
    name: 'mobile',
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
  }
];

const PAGES = [
  {
    id: '01_accueil',
    title: "Page d'Accueil — Première Impression Horlogère",
    urlAvant: 'https://lemouvement-watches.fr/',
    urlApres: 'http://localhost:5173/',
    prepAvant: async (page) => {
      await handleCookieBanner(page);
      await triggerLazyLoad(page, 500);
      await page.waitForTimeout(1000);
    },
    prepApres: async (page) => {
      await page.waitForSelector('h1', { timeout: 10000 }).catch(() => {});
      await page.waitForTimeout(1500);
    }
  },
  {
    id: '02_catalogue_rolex',
    title: 'Catalogue & Sélection Rolex — Expérience de Recherche',
    urlAvant: 'https://lemouvement-watches.fr/collections/rolex',
    urlApres: 'http://localhost:5173/catalogue-rolex',
    prepAvant: async (page) => {
      await handleCookieBanner(page);
      await triggerLazyLoad(page, 400);
      await page.waitForTimeout(1000);
    },
    prepApres: async (page) => {
      await page.waitForTimeout(1200);
      await triggerLazyLoad(page, 300);
      await page.waitForTimeout(1000);
    }
  },
  {
    id: '03_fiche_produit',
    title: 'Fiche Produit — Rolex Datejust 16234 Cadran Lin',
    urlAvant: 'https://lemouvement-watches.fr/products/rolex-datejust-16234-linen-dial',
    urlApres: 'http://localhost:5173/produit/rolex-datejust-16234-linen-dial',
    prepAvant: async (page) => {
      await handleCookieBanner(page);
      await triggerLazyLoad(page, 300);
      await page.waitForTimeout(1000);
    },
    prepApres: async (page) => {
      await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
    }
  },
  {
    id: '04_panier_checkout',
    title: "Panier & Tunnel de Commande — Fluidité d'Achat",
    urlAvant: 'https://lemouvement-watches.fr/cart',
    urlApres: 'http://localhost:5173/produit/rolex-datejust-16234-linen-dial',
    prepAvant: async (page) => {
      await handleCookieBanner(page);
      await triggerLazyLoad(page, 300);
      await page.waitForTimeout(1000);
    },
    prepApres: async (page) => {
      await page.waitForTimeout(1500);
      // Click on "Ajouter au panier" to slide in the CartDrawer
      const addBtn = await page.waitForSelector('button:has-text("Ajouter au panier")', { timeout: 8000 }).catch(() => null);
      if (addBtn) {
        await addBtn.click();
        await page.waitForTimeout(1800);
      }
    }
  },
  {
    id: '05_rachat_sourcing',
    title: 'Espace Rachat & Estimation — Transmission de Montre',
    urlAvant: 'https://lemouvement-watches.fr/pages/contact',
    urlApres: 'http://localhost:5173/vendre',
    prepAvant: async (page) => {
      await handleCookieBanner(page);
      await triggerLazyLoad(page, 300);
      await page.waitForTimeout(1000);
    },
    prepApres: async (page) => {
      await page.waitForTimeout(1200);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
    }
  }
];

async function handleCookieBanner(page) {
  try {
    const candidates = [
      'button:has-text("ACCEPTER")',
      'button:has-text("Accepter")',
      'button:has-text("Tout accepter")',
      '#accept-cookies',
      '.cookie-accept'
    ];
    for (const sel of candidates) {
      const btn = await page.$(sel);
      if (btn) {
        await btn.click().catch(() => {});
        await page.waitForTimeout(500);
        break;
      }
    }
  } catch (e) {}
}

async function triggerLazyLoad(page, scrollAmount = 600) {
  try {
    await page.evaluate((amt) => {
      window.scrollBy({ top: amt, behavior: 'smooth' });
    }, scrollAmount);
    await page.waitForTimeout(800);
    await page.evaluate(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(800);
  } catch (e) {}
}

async function capture() {
  console.log('--- Démarrage de la capture Playwright Haute Horlogerie (Optimisée) ---');
  const browser = await chromium.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=medium']
  });

  for (const config of CONFIGS) {
    console.log(`\n=== Capture Device: ${config.name.toUpperCase()} (${config.viewport.width}x${config.viewport.height}) ===`);
    const context = await browser.newContext({
      viewport: config.viewport,
      isMobile: config.isMobile,
      hasTouch: config.hasTouch,
      userAgent: config.userAgent,
      deviceScaleFactor: 2 // High retina crispness
    });

    // Auto-accept cookies & ensure clean products in local app
    await context.addInitScript(() => {
      try {
        localStorage.setItem('lemouvement_cookie_consent', 'accepted');
        localStorage.removeItem('lemouvement_custom_products');
      } catch (e) {}
    });

    for (const pageDef of PAGES) {
      console.log(`\nCapture écran : ${pageDef.id} (${pageDef.title})`);

      // 1. Capture AVANT
      const pageAvant = await context.newPage();
      try {
        console.log(`  > Chargement AVANT : ${pageDef.urlAvant}`);
        await pageAvant.goto(pageDef.urlAvant, { waitUntil: 'networkidle', timeout: 35000 });
        if (pageDef.prepAvant) {
          await pageDef.prepAvant(pageAvant);
        }
        
        const fileNameAvant = `${pageDef.id}_avant_${config.name}.jpg`;
        const pathPublicAvant = path.join(OUTPUT_DIR, fileNameAvant);
        const pathStandaloneAvant = path.join(STANDALONE_OUTPUT_DIR, fileNameAvant);

        await pageAvant.screenshot({
          path: pathPublicAvant,
          quality: 90,
          type: 'jpeg'
        });
        fs.copyFileSync(pathPublicAvant, pathStandaloneAvant);
        console.log(`  ✓ Enregistré : ${fileNameAvant}`);
      } catch (err) {
        console.error(`  ✗ Erreur capture AVANT ${pageDef.id}:`, err.message);
      } finally {
        await pageAvant.close();
      }

      await new Promise(r => setTimeout(r, 800));

      // 2. Capture APRES
      const pageApres = await context.newPage();
      try {
        console.log(`  > Chargement APRES (Proposition) : ${pageDef.urlApres}`);
        await pageApres.goto(pageDef.urlApres, { waitUntil: 'networkidle', timeout: 35000 });
        if (pageDef.prepApres) {
          await pageDef.prepApres(pageApres);
        }

        const fileNameApres = `${pageDef.id}_apres_${config.name}.jpg`;
        const pathPublicApres = path.join(OUTPUT_DIR, fileNameApres);
        const pathStandaloneApres = path.join(STANDALONE_OUTPUT_DIR, fileNameApres);

        await pageApres.screenshot({
          path: pathPublicApres,
          quality: 90,
          type: 'jpeg'
        });
        fs.copyFileSync(pathPublicApres, pathStandaloneApres);
        console.log(`  ✓ Enregistré : ${fileNameApres}`);
      } catch (err) {
        console.error(`  ✗ Erreur capture APRES ${pageDef.id}:`, err.message);
      } finally {
        await pageApres.close();
      }

      await new Promise(r => setTimeout(r, 800));
    }

    await context.close();
  }

  await browser.close();
  console.log('\n--- Toutes les captures optimisées ont été réalisées avec succès ! ---');
}

capture().catch(err => {
  console.error('Erreur fatale lors des captures:', err);
  process.exit(1);
});
