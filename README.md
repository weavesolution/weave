# Weave Solutions — website (weavesolution.com) · v4

Plain HTML pages, no build step. All site pages share `site.css` and `site.js`. All pictures are in `assets/`.

| File | Page |
|---|---|
| `index.html` | Home |
| `products.html` | Our work: JournalDesk, PACE, Pulse, Vaada Billing, Shani Traders, Mood Wala Food, Payroll, CMA data |
| `tools.html` | Free tools |
| `contact.html` | Contact, with two forms: Request a callback / Get a quotation |
| `about.html`, `privacy.html` | About, privacy note |
| `gstreco.html`, `repayment-schedule.html`, `bankanalyzer.html`, `invoicesummary.html` | The free tools |
| `links.html` | **Admin page** for download links (password-protected, hidden from Google, not linked anywhere) |
| `404.html`, `sitemap.xml`, `robots.txt` | Page-not-found page and files for Google |
| `apps-script/Code.gs` | Backend for both forms and the download links (lives in Apps Script, not on the site) |

## Publishing v4

1. **Your email:** open `site.js`, line 4, and replace `YOUR-EMAIL-HERE` with the email the website should show.
   Until you do, the email box is simply hidden.
2. **Apps Script (needed for quotations and download links):**
   1. In `apps-script/Code.gs`, set `ADMIN_PASSWORD` to your own password (8+ characters).
   2. Sheet → Extensions → Apps Script → replace Code.gs → Save.
   3. Run `setupSheet` once (adds the Quotations and Downloads tabs; Enquiries stays as it is).
   4. Deploy → Manage deployments → pencil → Version: **New version** → Deploy. (Not "New deployment".)
   5. Run `testQuote` once and check the Quotations tab and your mail.
3. Upload all files and `assets/` to the `weave` repo (keep `CNAME`).

## Download buttons

Open `https://weavesolution.com/links.html`, enter the admin password, add a link (product, button text,
Drive link, version), press **Save all**. The button appears under that product on Our work (or Free tools).
Visitors' browsers keep the list for 30 minutes and Apps Script keeps it for 6 hours, so the website uses almost
no Apps Script quota; saving clears the Apps Script copy straight away.

Google Drive: Share → General access → **Anyone with the link**, or visitors will see "Request access".

Product IDs (must match `data-dl` on the pages): journaldesk, pace, pulse, payroll, vaada, shani, moodwala,
catoolkit, invoicesummary, bankanalyzer, repayment-schedule, gstreco.

## Adding a project to "Our work"

Screenshots go in `assets/` as `.webp` (phone ~540 px wide, computer ~1600 px wide). In `products.html` copy one
`<article class="case">…</article>` block, change the id, text and the `<button>`s inside `<div class="gal">`
(class `phone` or `wide`). Add the id to `PRODUCTS` in `links.html` if it should get download buttons, and a line
to the "Our work" menu at the top of each page.

When you change `site.css` or `site.js`, raise `?v=4` to `?v=5` in the pages so browsers fetch the new copy.
