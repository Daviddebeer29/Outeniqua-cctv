import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const selector = process.argv[3] || 'body';
const label = process.argv[4] ? `-${process.argv[4]}` : '';

const existing = fs.readdirSync(screenshotDir).filter(f => f.endsWith('.png'));
const numbers = existing.map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0')).filter(Boolean);
const next = numbers.length ? Math.max(...numbers) + 1 : 1;

const filename = `screenshot-${next}${label}.png`;
const filepath = path.join(screenshotDir, filename);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2' });

const el = await page.$(selector);
if (el) {
  const box = await el.boundingBox();
  const padding = 40;
  await page.screenshot({
    path: filepath,
    clip: {
      x: Math.max(0, box.x - padding),
      y: Math.max(0, box.y - padding),
      width: Math.min(1440, box.width + padding * 2),
      height: Math.min(2400, box.height + padding * 2)
    }
  });
  console.log(`Saved: ./temporary screenshots/${filename}`);
} else {
  console.log(`Selector "${selector}" not found`);
}
await browser.close();
