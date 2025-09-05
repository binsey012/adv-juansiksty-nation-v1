Partners Images Guide
=====================

Structure your partner logos under these folders:

- /images/partners/national/           (Shown on Home + Partners pages)
- /images/partners/special-events/     (Shown on Partners page)
- /images/partners/core-group/         (Shown on Partners page)
- /images/partners/partnership/        (For the "Partner With Us" CTA)

Recommended file prep:
- Transparent PNG (preferred) or SVG; width ~ 800–1200px, optimized <200KB
- Use lowercase, hyphenated filenames, e.g., brand-name.png

Visibility tips:
- Prefer logos with transparent backgrounds; avoid pure white/black fills across entire tile.
- If a logo is very light or very dark, the UI adds a subtle overlay mask to improve contrast automatically.

How to reference in src/data/partners.json:
{
  "id": 1001,
  "name": "Brand Name",
  "category": "National",          // or "Special Events" or "Core Group"
  "logo": "/images/partners/national/brand-name.png",
  "url": "https://brand.example"   // optional
}

For the partnership CTA images:
- Teaser (card): /images/partners/partnership/partner-with-us.jpg
- Modal full:    /images/partners/partnership/partner-with-us-modal.jpg

If you change filenames, update paths in src/data/partners.json and in src/pages/Partners.jsx for the CTA assets.