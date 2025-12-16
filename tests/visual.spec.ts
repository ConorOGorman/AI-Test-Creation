import { test } from '@playwright/test';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const breakpoints = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 1280, height: 800, name: 'laptop' },
  { width: 834, height: 1112, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' },
];

test('generate visual parity report', async ({ page }) => {
  test.setTimeout(120000); // Increase timeout for full process

  // Ensure directories exist
  ['docs/reference', 'docs/build', 'docs/diff'].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  for (const bp of breakpoints) {
    console.log(`Processing ${bp.name}...`);
    await page.setViewportSize({ width: bp.width, height: bp.height });

    // 1. Capture Reference
    console.log(`Capturing reference for ${bp.name}...`);
    await page.goto('https://espaciohomedesign.com/en/kitchens');
    await page.waitForLoadState('networkidle');
    // Hide cookie banner and other dynamic elements
    await page.addStyleTag({ content: '#cookiesPopup, #pideCitaBubble, #transitionDiv { display: none !important; }' });
    // Wait a bit for animations to settle
    await page.waitForTimeout(2000);
    
    const refPath = `docs/reference/${bp.name}.png`;
    await page.screenshot({ path: refPath, fullPage: true });

    // 2. Capture Local Build
    console.log(`Capturing build for ${bp.name}...`);
    await page.goto('http://localhost:3000/kitchens');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const buildPath = `docs/build/${bp.name}.png`;
    await page.screenshot({ path: buildPath, fullPage: true });

    // 3. Compare
    try {
        const img1 = PNG.sync.read(fs.readFileSync(refPath));
        const img2 = PNG.sync.read(fs.readFileSync(buildPath));
        
        // Use the larger dimensions to contain both
        const maxWidth = Math.max(img1.width, img2.width);
        const maxHeight = Math.max(img1.height, img2.height);
        
        // If dimensions differ, we can't use pixelmatch directly on the buffers.
        // We would need to resize or crop. For now, we only compare if dimensions match exactly
        // or we just log the difference.
        
        if (img1.width === img2.width && img1.height === img2.height) {
            const diff = new PNG({ width: img1.width, height: img1.height });
            const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });
            fs.writeFileSync(`docs/diff/${bp.name}-diff.png`, PNG.sync.write(diff));
            console.log(`Diff for ${bp.name}: ${numDiffPixels} pixels differ.`);
        } else {
            console.warn(`Dimensions differ for ${bp.name}: Ref ${img1.width}x${img1.height} vs Build ${img2.width}x${img2.height}. Skipping pixelmatch.`);
        }
    } catch (e) {
        console.error(`Error comparing images for ${bp.name}:`, e);
    }
  }
});
