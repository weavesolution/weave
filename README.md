# Weave Solutions — website (weavesolution.com)

Plain HTML pages, no build step. All pages share `site.css` (styles) and `site.js` (menu, image viewer,
footer year). All pictures are in `assets/`.

| File | Page |
|---|---|
| `index.html` | Home |
| `products.html` | Our work: JournalDesk, PACE, Vaada Billing, Shani Traders, Mood Wala Food, Payroll, CMA data |
| `tools.html` | Free tools list |
| `about.html`, `contact.html`, `privacy.html` | About, contact + callback form, privacy note |
| `gstreco.html`, `repayment-schedule.html`, `bankanalyzer.html`, `invoicesummary.html` | The free tools |
| `404.html`, `sitemap.xml`, `robots.txt` | Page-not-found page and files for Google |
| `apps-script/Code.gs` | Callback form → Google Sheet + email (not uploaded to the site; it lives in Apps Script) |

## Publishing (GitHub, repo `weave`)

1. Upload all files and the `assets` folder (keep the existing `CNAME` file).
2. In `assets`, delete the old files that are no longer used: `product-accounting.png`, `product-billing.png`,
   `product-food-ordering.png`, `product-payroll.png`, `tool-gst-reco.png`, `tool-repayment.png`, `hero.jpg`,
   `requirement.jpg`, and `assets/README.md`.
3. **Update the Apps Script** (the contact form needs it): open the Sheet → Extensions → Apps Script → replace
   Code.gs with `apps-script/Code.gs` → Save → Deploy → Manage deployments → pencil → Version: **New version** → Deploy.
   Then run `testEntry` once. The web link stays the same, so `contact.html` needs no change.
4. In Google Search Console, add `https://weavesolution.com/sitemap.xml`.

## Adding a project to "Our work"

Screenshots go in `assets/` as `.webp` (phone shots about 540 px wide, computer shots about 1600 px wide,
under 100 KB each — squoosh.app does this). In `products.html` copy one `<article class="case">…</article>`
block, change the text and the `<button>`s inside `<div class="gal">` (one button per screenshot; class `phone`
for phone screenshots, `wide` for computer screenshots). Add a matching line to the "Our work" menu, which
is repeated at the top of each site page.

## Notes

- The callback form now tells the visitor if sending failed and offers WhatsApp instead.
- Google Analytics G-K49PPV9EPG is on every page.
- No ads anywhere.
