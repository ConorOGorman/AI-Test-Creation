const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const BUILD_URL = 'http://localhost:3000';
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const BUILD_DIR = path.join(DOCS_DIR, 'build');
const DIFF_DIR = path.join(DOCS_DIR, 'diff');

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
  
  const screenshots = {};

  for (const viewport of VIEWPORTS) {
    console.log(`  Capturing ${viewport.name} (${viewport.width}x${viewport.height})...`);
    
    const page = await context.newPage({
      viewport: { width: viewport.width, height: viewport.height }
    });

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const screenshotPath = path.join(outputDir, `${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`    Saved: ${screenshotPath}`);
      
      screenshots[viewport.name] = screenshotPath;
    } catch (error) {
      console.error(`    Error: ${error.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  return screenshots;
}

async function compareScreenshots() {
  console.log('\nComparing screenshots...');
  
  const results = [];

  for (const viewport of VIEWPORTS) {
    const referencePath = path.join(DOCS_DIR, 'reference', `${viewport.name}.png`);
    const buildPath = path.join(BUILD_DIR, `${viewport.name}.png`);
    const diffPath = path.join(DIFF_DIR, `${viewport.name}-diff.png`);

    try {
      // Check if reference exists
      await fs.access(referencePath);
    } catch {
      console.log(`  ${viewport.name}: No reference screenshot found, skipping comparison`);
      results.push({
        viewport: viewport.name,
        status: 'no-reference',
        message: 'Reference screenshot not available',
      });
      continue;
    }

    try {
      // Check if build screenshot exists
      await fs.access(buildPath);
    } catch {
      console.log(`  ${viewport.name}: Build screenshot not found, skipping comparison`);
      results.push({
        viewport: viewport.name,
        status: 'no-build',
        message: 'Build screenshot not available',
      });
      continue;
    }

    try {
      const referenceBuffer = await fs.readFile(referencePath);
      const buildBuffer = await fs.readFile(buildPath);

      const referencePng = PNG.sync.read(referenceBuffer);
      const buildPng = PNG.sync.read(buildBuffer);

      // Ensure images are same size
      const width = Math.max(referencePng.width, buildPng.width);
      const height = Math.max(referencePng.height, buildPng.height);

      const diffPng = new PNG({ width, height });

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
        diffPixels: numDiffPixels,
        totalPixels,
        diffImage: diffPath,
      });
    } catch (error) {
      console.error(`  ${viewport.name}: Error comparing - ${error.message}`);
      results.push({
        viewport: viewport.name,
        status: 'error',
        message: error.message,
      });
    }
  }

  return results;
}

async function generateReport(comparisonResults) {
  let report = `# Pixel Diff Validation Report

**Generated:** ${new Date().toISOString()}

## Build Screenshots

`;

  for (const viewport of VIEWPORTS) {
    report += `### ${viewport.name} (${viewport.width}×${viewport.height})\n`;
    report += `- Build: \`docs/build/${viewport.name}.png\`\n`;
    report += `- Reference: \`docs/reference/${viewport.name}.png\`\n\n`;
  }

  report += `\n## Comparison Results\n\n`;

  comparisonResults.forEach((result) => {
    report += `### ${result.viewport}\n`;
    
    if (result.status === 'compared') {
      report += `- Difference: ${result.diffPercentage}%\n`;
      report += `- Different pixels: ${result.diffPixels.toLocaleString()} / ${result.totalPixels.toLocaleString()}\n`;
      report += `- Diff image: \`docs/diff/${result.viewport}-diff.png\`\n`;
      
      if (result.diffPercentage < 1) {
        report += `- ✅ **PASS** - Within acceptable tolerance\n`;
      } else if (result.diffPercentage < 5) {
        report += `- ⚠️ **WARNING** - Minor differences detected\n`;
      } else {
        report += `- ❌ **FAIL** - Significant differences detected\n`;
      }
    } else if (result.status === 'no-reference') {
      report += `- ℹ️ No reference screenshot available\n`;
    } else if (result.status === 'no-build') {
      report += `- ⚠️ Build screenshot not generated\n`;
    } else {
      report += `- ❌ Error: ${result.message}\n`;
    }
    
    report += `\n`;
  });

  report += `\n## Summary\n\n`;
  
  const passed = comparisonResults.filter(r => r.status === 'compared' && r.diffPercentage < 1).length;
  const warnings = comparisonResults.filter(r => r.status === 'compared' && r.diffPercentage >= 1 && r.diffPercentage < 5).length;
  const failed = comparisonResults.filter(r => r.status === 'compared' && r.diffPercentage >= 5).length;
  const noRef = comparisonResults.filter(r => r.status === 'no-reference').length;

  report += `- ✅ Passed: ${passed}\n`;
  report += `- ⚠️ Warnings: ${warnings}\n`;
  report += `- ❌ Failed: ${failed}\n`;
  report += `- ℹ️ No reference: ${noRef}\n`;

  const reportPath = path.join(DOCS_DIR, 'parity-report.md');
  await fs.writeFile(reportPath, report);
  console.log(`\nParity report saved: ${reportPath}`);
}

async function main() {
  try {
    // Create directories
    await fs.mkdir(BUILD_DIR, { recursive: true });
    await fs.mkdir(DIFF_DIR, { recursive: true });

    // Capture build screenshots
    await captureScreenshots(BUILD_URL, BUILD_DIR);

    // Compare with reference screenshots
    const comparisonResults = await compareScreenshots();

    // Generate report
    await generateReport(comparisonResults);

    console.log('\n✅ Screenshot comparison complete!');
  } catch (error) {
    console.error('Error during screenshot comparison:', error);
    process.exit(1);
  }
}

// Only run if called directly
if (require.main === module) {
  main();
}

module.exports = { captureScreenshots, compareScreenshots, generateReport };
