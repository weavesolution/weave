# Weave Solutions — website

Seven pages, each a single self-contained `.html` file. No build step. The two
free tools live in the same repo and now share the site's header, footer and styling.

| File | Page |
|---|---|
| `index.html` | Home |
| `products.html` | Billing, food ordering, payroll, accounting |
| `tools.html` | Free tools index |
| `about.html` | About |
| `contact.html` | Contact + request a callback |
| `gstreco.html` | GST reconciliation tool |
| `repayment-schedule.html` | Repayment schedule builder |

## Publish

Upload everything including `assets/` → Settings → Pages → branch `main`, folder `/root`.

---

## 1. Logo (do this first)

Put two files in `assets/`:

- `logo.png` — the Weave logo, transparent background, about **300 px wide**.
  It renders at 38 px tall in the header. A wide/horizontal crop of the logo
  works better in a header than the square version with the tagline. If the file
  is missing the header falls back to plain text, so nothing breaks.
- `favicon.png` — 64×64, just the W mark, no text.

## 2. Callback form → Google Sheet + email

The full Apps Script is in **`apps-script/Code.gs`** with setup steps at the top
of the file. Short version:

1. Open the Sheet while signed in as **weavesolution.connect@gmail.com**
   (the notification email is sent from whichever account owns the script)
2. Extensions → Apps Script → paste in `Code.gs`
3. Run `setupSheet` once — it creates the *Enquiries* tab, headers and a status dropdown
4. Deploy → New deployment → Web app → Execute as **Me**, access **Anyone**
5. If the new `/exec` URL differs from the one already in `contact.html`,
   replace the value of `EP` near the bottom of that file
6. Run `testEntry` to confirm a row lands and the mail reaches weave780@gmail.com

Any time you edit the script afterwards, deploy a **new version** or the live URL
keeps running the old code.

The browser posts with `no-cors`, so the page shows success as soon as the request
leaves. Test once after going live to be sure rows are arriving.

## 3. Google AdSense on the free tools

When a report is generated, both tools show a panel with an ad slot while the
file downloads. There is no wait timer — the download starts immediately.

Replace the placeholder IDs in **two places**:

- `gstreco.html` — search for `const ADS =`
- `repayment-schedule.html` — search for `var ADS =`

```javascript
{ client: 'ca-pub-1234567890123456', slot: '1234567890' }
```

Until real IDs are filled in, the box shows a neutral "ad space" message.

## 4. Adding a product or tool later

Both pages repeat the same block. Copy one `<div class="row" id="...">`, change
the heading, text, bullets and image filename. Then add a matching line to the
header dropdown — search for `NAV` structure in the nav markup of each page (it
is the same block in all five site pages).

## Editing note

The `<style>` block is identical in the five site pages. Change a colour in one,
paste it into the others.
