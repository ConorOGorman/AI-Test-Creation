const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const BUILD_URL = 'http://localhost:3000/kitchens';
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const BUILD_DIR = path.join(DOCS_DIR, 'build', 'kitchens');
const DIFF_DIR = path.join(DOCS_DIR, 'diff', 'kitchens');
const REF_DIR = path.join(DOCS_DIR, 'reference', 'kitchens');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];

async function captureScreenshots(url, outputDir) {
  console.log(`Capturing screenshots of ${url}...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  for (const viewport of VIEWPORTS) {
    console.log(`  Capturing ${viewport.name} (${viewport.width}x${viewport.height})...`);

    const page = await context.newPage({
      viewport: { width: viewport.width, height: viewport.height },
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const screenshotPath = path.join(outputDir, `${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`    Saved: ${screenshotPath}`);
    } catch (error) {
      console.error(`    Error: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

async function compareScreenshots() {
  console.log('\nComparing screenshots...');

  const results = [];

  for (const viewport of VIEWPORTS) {
    const referencePath = path.join(REF_DIR, `${viewport.name}.png`);
    const buildPath = path.join(BUILD_DIR, `${viewport.name}.png`);
    const diffPath = path.join(DIFF_DIR, `${viewport.name}-diff.png`);

    try {
      await fs.access(referencePath);
    } catch {
      console.log(`  ${viewport.name}: No reference screenshot found, skipping comparison`);
      results.push({ viewport: viewport.name, status: 'no-reference' });
      continue;
    }

    try {
      await fs.access(buildPath);
    } catch {
      console.log(`  ${viewport.name}: Build screenshot not found, skipping comparison`);
      results.push({ viewport: viewport.name, status: 'no-build' });
      continue;
    }

    try {
      const referenceBuffer = await fs.readFile(referencePath);
      const buildBuffer = await fs.readFile(buildPath);

      const referencePng = PNG.sync.read(referenceBuffer);
      const buildPng = PNG.sync.read(buildBuffer);

      if (referencePng.width !== buildPng.width || referencePng.height !== buildPng.height) {
        console.log(
          `  ${viewport.name}: Dimension mismatch (${referencePng.width}x${referencePng.height} vs ${buildPng.width}x${buildPng.height}), skipping`
        );
        results.push({ viewport: viewport.name, status: 'dim-mismatch' });
        continue;
      }

      const diffPng = new PNG({ width: referencePng.width, height: referencePng.height });

      const numDiffPixels = pixelmatch(
        referencePng.data,
        buildPng.data,
        diffPng.data,
        referencePng.width,
        referencePng.height,
        { threshold: 0.1 }
      );

      const totalPixels = referencePng.width * referencePng.height;
      const diffPercentage = ((numDiffPixels / totalPixels) * 100).toFixed(2);

      await fs.writeFile(diffPath, PNG.sync.write(diffPng));
      console.log(`  ${viewport.name}: ${diffPercentage}% different (${numDiffPixels} pixels)`);

      results.push({
        viewport: viewport.name,
        status: 'compared',
        diffPercentage: parseFloat(diffPercentage),
      });
    } catch (error) {
      console.error(`  ${viewport.name}: Error comparing - ${error.message}`);
      results.push({ viewport: viewport.name, status: 'error', message: error.message });
    }
  }

  return results;
}

async function main() {
  await fs.mkdir(BUILD_DIR, { recursive: true });
  await fs.mkdir(DIFF_DIR, { recursive: true });
  await fs.mkdir(REF_DIR, { recursive: true });

  await captureScreenshots(BUILD_URL, BUILD_DIR);
  await compareScreenshots();

  console.log('\n✅ Kitchens screenshot comparison complete!');
  console.log(`- Build: ${path.relative(path.join(__dirname, '..'), BUILD_DIR)}`);
  console.log(`- Diff: ${path.relative(path.join(__dirname, '..'), DIFF_DIR)}`);
  console.log(`- Reference: ${path.relative(path.join(__dirname, '..'), REF_DIR)}`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

