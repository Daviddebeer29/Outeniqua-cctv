# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL — READ BEFORE TOUCHING ANYTHING

**This is the ONE official version of the Outeniqua CCTV website.**
- Git tag: `production-v1`
- Live URL: https://outeniqua-cctv-six.vercel.app
- Hero video: `videos/hero-video-hd-opt.mp4` (SEO-optimised, NOT hero-video.mp4 or hero-video-hd.mp4)
- Design: Dark premium, navy background, real local photos in `images/`

**There is a second Vercel project (`outeniqua-cctv.vercel.app`) showing a completely different "WizColor" design — that is NOT this site and should be ignored or deleted.**

**Never push to GitHub without confirming you are working from this folder. Any other source will overwrite the wrong version live.**

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Architecture

Static HTML site — no build step, no framework, no bundler. Each page is a self-contained HTML file with all CSS in an inline `<style>` block. Tailwind CDN is loaded as a supplementary utility layer on top.

**Pages:** `index.html` (homepage, ~4830 lines), `about.html`, `solutions.html`, `contact.html`, `faq.html`, `privacy.html`

**Images:** All in `images/` as source + `.webp` pairs. Always reference the `.webp` version in HTML (e.g. `images/sol-hero-bg.webp`). When adding new images, always supply a `.webp` alongside the original.

**Videos:** All in `videos/`. The canonical hero video is `videos/hero-video-hd-opt.mp4`. Do not swap it for `hero-video.mp4` or `hero-video-hd.mp4`.

**Brand assets:** `brand_assets/logo-hq.png` and `brand_assets/logo.webp` — use the `.webp` in HTML.

## Local Server
- Start: `node serve.mjs` (serves project root at `http://localhost:3000`, no-cache headers)
- Always serve on localhost — never screenshot a `file:///` URL
- If the server is already running, do not start a second instance

## Screenshot Tools

All scripts auto-increment output to `temporary screenshots/screenshot-N[‑label].png`. After saving, read the PNG with the Read tool to inspect it.

| Script | Usage | Purpose |
|---|---|---|
| `screenshot.mjs` | `node screenshot.mjs <url> [label]` | Full-page, 1440×900 viewport |
| `screenshot-section.mjs` | `node screenshot-section.mjs <url> <selector> [label]` | Crops to selector bounding box + 40 px padding |
| `screenshot-clip.mjs` | `node screenshot-clip.mjs <url> <selector> <height> [label]` | Clips from selector top to fixed pixel height |
| `screenshot-scrolled.mjs` | `node screenshot-scrolled.mjs <url> <selector> <height> <waitMs> [label]` | Scrolls to selector, waits for animations, then clips |

**Screenshot rules:** Always ask the user before taking a screenshot. Take one at a time — do not loop or chain screenshots to debug positioning.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).

## Output Defaults
- Single `.html` file, all styles inline, unless user says otherwise
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Brand Assets
- Always check `brand_assets/` before designing — it may contain logos, color guides, or style guides
- If assets exist, use them. Do not use placeholders where real assets are available

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never animate layout properties (`height`, `width`, `top`, `left`) or `color`.
