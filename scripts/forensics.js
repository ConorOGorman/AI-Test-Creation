const { chromium } = require('playwright');
const fs = require('fs').promises;
const path = require('path');

const TARGET_URL = 'https://espaciohomedesign.com/en';
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const REFERENCE_DIR = path.join(DOCS_DIR, 'reference');

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
];

async function extractDesignTokens(page) {
  // Extract all computed styles and CSS variables
  const tokens = await page.evaluate(() => {
    const results = {
      colors: {},
      typography: {},
      spacing: {},
      shadows: {},
      radii: {},
      borders: {},
      motion: {},
      layout: {},
    };

    // Get CSS variables from :root
    const rootStyles = getComputedStyle(document.documentElement);
    const cssVars = {};
    for (let i = 0; i < rootStyles.length; i++) {
      const prop = rootStyles[i];
      if (prop.startsWith('--')) {
        cssVars[prop] = rootStyles.getPropertyValue(prop).trim();
      }
    }

    // Extract colors from various elements
    const colorElements = [
      { selector: 'body', props: ['background-color', 'color'] },
      { selector: 'header', props: ['background-color', 'color'] },
      { selector: 'nav', props: ['background-color', 'color'] },
      { selector: 'a', props: ['color'] },
      { selector: 'button', props: ['background-color', 'color', 'border-color'] },
      { selector: '.hero, [class*="hero"]', props: ['background-color', 'color'] },
      { selector: '.card, [class*="card"]', props: ['background-color', 'color', 'border-color'] },
      { selector: 'footer', props: ['background-color', 'color'] },
    ];

    colorElements.forEach(({ selector, props }) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        const computed = getComputedStyle(elements[0]);
        props.forEach(prop => {
          const value = computed.getPropertyValue(prop);
          if (value && value !== 'rgba(0, 0, 0, 0)' && value !== 'transparent') {
            results.colors[`${selector}-${prop}`] = value;
          }
        });
      }
    });

    // Extract typography
    const typographyElements = [
      { selector: 'body', name: 'body' },
      { selector: 'h1, [class*="hero"] h1', name: 'h1' },
      { selector: 'h2', name: 'h2' },
      { selector: 'h3', name: 'h3' },
      { selector: 'h4', name: 'h4' },
      { selector: 'nav a, header a', name: 'nav-link' },
      { selector: 'button', name: 'button' },
      { selector: '.card h3, [class*="card"] h3', name: 'card-title' },
    ];

    typographyElements.forEach(({ selector, name }) => {
      const element = document.querySelector(selector);
      if (element) {
        const computed = getComputedStyle(element);
        results.typography[name] = {
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          lineHeight: computed.lineHeight,
          letterSpacing: computed.letterSpacing,
          textTransform: computed.textTransform,
        };
      }
    });

    // Extract spacing
    const spacingElements = [
      { selector: '.container, [class*="container"]', name: 'container' },
      { selector: 'header', name: 'header' },
      { selector: 'section', name: 'section' },
      { selector: '.card, [class*="card"]', name: 'card' },
    ];

    spacingElements.forEach(({ selector, name }) => {
      const element = document.querySelector(selector);
      if (element) {
        const computed = getComputedStyle(element);
        results.spacing[name] = {
          padding: computed.padding,
          margin: computed.margin,
          maxWidth: computed.maxWidth,
          gap: computed.gap || computed.gridGap,
        };
      }
    });

    // Extract shadows, radii, borders
    const shadowElements = document.querySelectorAll('.card, [class*="card"], button, [class*="modal"]');
    shadowElements.forEach((el, i) => {
      const computed = getComputedStyle(el);
      const shadow = computed.boxShadow;
      if (shadow && shadow !== 'none') {
        results.shadows[`shadow-${i}`] = shadow;
      }
      const radius = computed.borderRadius;
      if (radius && radius !== '0px') {
        results.radii[`radius-${i}`] = radius;
      }
    });

    // Extract layout info
    results.layout.containerMaxWidth = getComputedStyle(document.querySelector('.container, [class*="container"], main') || document.body).maxWidth;
    results.layout.bodyWidth = document.body.clientWidth;

    // CSS Variables
    results.cssVariables = cssVars;

    return results;
  });

  return tokens;
}

async function extractSectionStructure(page) {
  return await page.evaluate(() => {
    const sections = [];
    
    // Get all major sections
    const allSections = document.querySelectorAll('header, nav, section, main > div, footer');
    
    allSections.forEach((section, index) => {
      const classes = Array.from(section.classList).join(' ');
      const tagName = section.tagName.toLowerCase();
      const textContent = section.textContent?.substring(0, 100).trim().replace(/\s+/g, ' ');
      
      sections.push({
        index,
        tag: tagName,
        classes,
        textPreview: textContent,
        childrenCount: section.children.length,
      });
    });

    return sections;
  });
}

async function extractVisibleText(page) {
  return await page.evaluate(() => {
    const texts = {};
    
    // Extract hero text
    const hero = document.querySelector('[class*="hero"], .hero, main > div:first-child');
    if (hero) {
      texts.hero = {
        headline: hero.querySelector('h1, [class*="headline"]')?.textContent?.trim(),
        subheadline: hero.querySelector('h2, [class*="subheadline"], p')?.textContent?.trim(),
      };
    }

    // Extract navigation items
    const navItems = Array.from(document.querySelectorAll('nav a, header nav a'));
    texts.navigation = navItems.map(a => a.textContent?.trim()).filter(Boolean);

    // Extract button texts
    const buttons = Array.from(document.querySelectorAll('button, [class*="button"], .btn'));
    texts.buttons = buttons.map(btn => btn.textContent?.trim()).filter(Boolean);

    // Extract card titles
    const cardTitles = Array.from(document.querySelectorAll('[class*="card"] h3, .card h3, [class*="card"] h2'));
    texts.cardTitles = cardTitles.map(el => el.textContent?.trim()).filter(Boolean);

    // Extract footer text
    const footer = document.querySelector('footer');
    if (footer) {
      const links = Array.from(footer.querySelectorAll('a'));
      texts.footer = links.map(a => a.textContent?.trim()).filter(Boolean);
    }

    return texts;
  });
}

async function captureReferenceScreenshots() {
  console.log('Starting forensics for:', TARGET_URL);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  
  const forensicsData = {
    url: TARGET_URL,
    capturedAt: new Date().toISOString(),
    viewports: {},
  };

  for (const viewport of VIEWPORTS) {
    console.log(`Capturing ${viewport.name} (${viewport.width}x${viewport.height})...`);
    
    const page = await context.newPage({
      viewport: { width: viewport.width, height: viewport.height }
    });

    try {
      await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Wait for content to load
      await page.waitForTimeout(3000);

      // Take screenshot
      const screenshotPath = path.join(REFERENCE_DIR, `${viewport.name}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  Screenshot saved: ${screenshotPath}`);

      // Extract tokens (only for desktop view to avoid redundancy)
      if (viewport.name === 'desktop') {
        forensicsData.tokens = await extractDesignTokens(page);
        forensicsData.sections = await extractSectionStructure(page);
        forensicsData.texts = await extractVisibleText(page);
      }

      forensicsData.viewports[viewport.name] = {
        width: viewport.width,
        height: viewport.height,
        screenshot: `${viewport.name}.png`,
      };

    } catch (error) {
      console.error(`Error capturing ${viewport.name}:`, error.message);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Save forensics data
  const forensicsPath = path.join(DOCS_DIR, 'forensics-data.json');
  await fs.writeFile(forensicsPath, JSON.stringify(forensicsData, null, 2));
  console.log(`\nForensics data saved: ${forensicsPath}`);

  return forensicsData;
}

async function generateForensicsMarkdown(data) {
  let markdown = `# Design Forensics: espaciohomedesign.com/en

**Captured:** ${data.capturedAt}
**URL:** ${data.url}

## Information Architecture

`;

  // Section structure
  markdown += `### Section Order\n\n`;
  if (data.sections) {
    data.sections.forEach(section => {
      markdown += `${section.index + 1}. **<${section.tag}>** ${section.classes ? `\`${section.classes}\`` : ''}\n`;
      markdown += `   - Children: ${section.childrenCount}\n`;
      if (section.textPreview) {
        markdown += `   - Preview: "${section.textPreview}..."\n`;
      }
      markdown += `\n`;
    });
  }

  // Extracted texts
  markdown += `\n## Content Copy\n\n`;
  if (data.texts) {
    if (data.texts.hero) {
      markdown += `### Hero\n`;
      markdown += `- Headline: "${data.texts.hero.headline || 'N/A'}"\n`;
      markdown += `- Subheadline: "${data.texts.hero.subheadline || 'N/A'}"\n\n`;
    }
    
    if (data.texts.navigation?.length) {
      markdown += `### Navigation\n`;
      data.texts.navigation.forEach(item => {
        markdown += `- ${item}\n`;
      });
      markdown += `\n`;
    }

    if (data.texts.buttons?.length) {
      markdown += `### Button Labels\n`;
      [...new Set(data.texts.buttons)].forEach(item => {
        markdown += `- "${item}"\n`;
      });
      markdown += `\n`;
    }
  }

  // Design Tokens
  markdown += `\n## Design Tokens (Extracted)\n\n`;

  // Colors
  markdown += `### Colors\n\n`;
  markdown += `| Element | Property | Value |\n`;
  markdown += `|---------|----------|-------|\n`;
  if (data.tokens?.colors) {
    Object.entries(data.tokens.colors).forEach(([key, value]) => {
      markdown += `| ${key} | | \`${value}\` |\n`;
    });
  }
  markdown += `\n`;

  // Typography
  markdown += `### Typography\n\n`;
  if (data.tokens?.typography) {
    Object.entries(data.tokens.typography).forEach(([name, props]) => {
      markdown += `#### ${name}\n`;
      markdown += `- Font Family: \`${props.fontFamily}\`\n`;
      markdown += `- Font Size: \`${props.fontSize}\`\n`;
      markdown += `- Font Weight: \`${props.fontWeight}\`\n`;
      markdown += `- Line Height: \`${props.lineHeight}\`\n`;
      markdown += `- Letter Spacing: \`${props.letterSpacing}\`\n`;
      if (props.textTransform && props.textTransform !== 'none') {
        markdown += `- Text Transform: \`${props.textTransform}\`\n`;
      }
      markdown += `\n`;
    });
  }

  // Spacing
  markdown += `### Spacing\n\n`;
  if (data.tokens?.spacing) {
    Object.entries(data.tokens.spacing).forEach(([name, props]) => {
      markdown += `#### ${name}\n`;
      Object.entries(props).forEach(([prop, value]) => {
        if (value && value !== 'auto' && value !== 'none') {
          markdown += `- ${prop}: \`${value}\`\n`;
        }
      });
      markdown += `\n`;
    });
  }

  // Shadows
  markdown += `### Shadows\n\n`;
  if (data.tokens?.shadows) {
    Object.entries(data.tokens.shadows).forEach(([key, value]) => {
      markdown += `- ${key}: \`${value}\`\n`;
    });
  }
  markdown += `\n`;

  // Radii
  markdown += `### Border Radii\n\n`;
  if (data.tokens?.radii) {
    Object.entries(data.tokens.radii).forEach(([key, value]) => {
      markdown += `- ${key}: \`${value}\`\n`;
    });
  }
  markdown += `\n`;

  // CSS Variables
  if (data.tokens?.cssVariables && Object.keys(data.tokens.cssVariables).length > 0) {
    markdown += `### CSS Custom Properties\n\n`;
    markdown += `| Variable | Value |\n`;
    markdown += `|----------|-------|\n`;
    Object.entries(data.tokens.cssVariables).forEach(([key, value]) => {
      markdown += `| \`${key}\` | \`${value}\` |\n`;
    });
    markdown += `\n`;
  }

  // Viewports
  markdown += `\n## Captured Viewports\n\n`;
  Object.entries(data.viewports).forEach(([name, info]) => {
    markdown += `### ${name}\n`;
    markdown += `- Resolution: ${info.width}×${info.height}\n`;
    markdown += `- Screenshot: \`docs/reference/${info.screenshot}\`\n\n`;
  });

  return markdown;
}

async function main() {
  try {
    // Create directories
    await fs.mkdir(DOCS_DIR, { recursive: true });
    await fs.mkdir(REFERENCE_DIR, { recursive: true });

    // Capture screenshots and extract data
    const forensicsData = await captureReferenceScreenshots();

    // Generate markdown report
    const markdown = await generateForensicsMarkdown(forensicsData);
    const markdownPath = path.join(DOCS_DIR, 'forensics.md');
    await fs.writeFile(markdownPath, markdown);
    console.log(`Forensics report saved: ${markdownPath}`);

    console.log('\n✅ Forensics phase complete!');
  } catch (error) {
    console.error('Error during forensics:', error);
    process.exit(1);
  }
}

main();
