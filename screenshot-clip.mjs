import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const selector = process.argv[3] || 'body';
const clipHeight = parseInt(process.argv[4] || '400');
const label = process.argv[5] ? `-${process.argv[5]}` : '';

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
  await page.screenshot({
    path: filepath,
    clip: {
      x: 0,
      y: box.y,
      width: 1440,
      height: clipHeight
    }
  });
  console.log(`Saved: ./temporary screenshots/${filename}`);
} else {
  console.log(`Selector "${selector}" not found`);
}
await browser.close();
