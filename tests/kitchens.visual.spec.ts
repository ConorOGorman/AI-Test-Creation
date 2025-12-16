import { test, type Page } from "@playwright/test";
import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const breakpoints = [
  { width: 1440, height: 900, name: "desktop" },
  { width: 1280, height: 800, name: "laptop" },
  { width: 834, height: 1112, name: "tablet" },
  { width: 390, height: 844, name: "mobile" },
];

const scrollShots = [
  { name: "top", y: 0 },
  { name: "mid", y: 1200 },
  { name: "lower", y: 2400 },
];

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readPng(path: string) {
  return PNG.sync.read(fs.readFileSync(path));
}

function writePng(path: string, png: PNG) {
  fs.writeFileSync(path, PNG.sync.write(png));
}

function diffPngs(aPath: string, bPath: string, outPath: string) {
  const a = readPng(aPath);
  const b = readPng(bPath);
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);

  const aPadded = new PNG({ width, height });
  const bPadded = new PNG({ width, height });
  aPadded.data.fill(255);
  bPadded.data.fill(255);
  PNG.bitblt(a, aPadded, 0, 0, a.width, a.height, 0, 0);
  PNG.bitblt(b, bPadded, 0, 0, b.width, b.height, 0, 0);

  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(
    aPadded.data,
    bPadded.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 },
  );

  writePng(outPath, diff);
  return numDiffPixels;
}

async function hideRemoteDynamic(pageUrl: string, page: Page) {
  await page.goto(pageUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);
  await page.addStyleTag({
    content:
      "#cookiesPopup, #pideCitaBubble, #transitionDiv { display: none !important; }",
  });
  await page.waitForTimeout(1200);
}

async function hideLocalDynamic(pageUrl: string, page: Page) {
  await page.goto(pageUrl, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  await page.addStyleTag({
    content: "#pideCitaBubble { display: none !important; }",
  });
  await page.waitForTimeout(300);
}

test("kitchens visual parity (screenshots + diff)", async ({ page }) => {
  test.setTimeout(600_000);

  const baseDirs = {
    reference: "docs/reference/kitchens",
    build: "docs/build/kitchens",
    diff: "docs/diff/kitchens",
  };
  ensureDir(baseDirs.reference);
  ensureDir(baseDirs.build);
  ensureDir(baseDirs.diff);

  for (const bp of breakpoints) {
    await page.setViewportSize({ width: bp.width, height: bp.height });

    for (const shot of scrollShots) {
      const refPath = `${baseDirs.reference}/${bp.name}-${shot.name}.png`;
      const buildPath = `${baseDirs.build}/${bp.name}-${shot.name}.png`;
      const diffPath = `${baseDirs.diff}/${bp.name}-${shot.name}-diff.png`;

      await hideRemoteDynamic("https://espaciohomedesign.com/en/kitchens", page);
      await page.evaluate((y: number) => window.scrollTo(0, y), shot.y);
      await page.waitForTimeout(600);
      await page.screenshot({ path: refPath, fullPage: false });

      await hideLocalDynamic("http://localhost:3000/kitchens", page);
      await page.evaluate((y: number) => window.scrollTo(0, y), shot.y);
      await page.waitForTimeout(200);
      await page.screenshot({ path: buildPath, fullPage: false });

      const diffPixels = diffPngs(refPath, buildPath, diffPath);
      console.log(
        `kitchens ${bp.name} ${shot.name}: ${diffPixels} pixels differ`,
      );
    }
  }
});
