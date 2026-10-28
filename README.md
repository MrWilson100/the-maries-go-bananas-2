# The Maries Go Bananas: clickable website mockup 🍌

Static HTML/CSS/JS mockup. No build step, no backend, no real payments.

## Open it
- **Easiest:** double-click `index.html` (works straight from the file system).
- **Or run a tiny server** (recommended for sharing on your network):
  ```bash
  cd the-maries-go-bananas
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```
Fonts (Lilita One, Fredoka, Nunito) load from Google Fonts; offline, the site falls back to system fonts.

## Pages
| File | What it is |
|---|---|
| `index.html` | Home: hero + tagline, Halloween Week callout with live countdown, bestsellers strip, about teaser, reviews, IG grid, order CTA |
| `menu.html` | Full menu with filter chips: Full Loaves, Mini Loaves, Mini Flight Boxes, Bites Boards, GF & Vegan, Halloween. Quick-add + "Customize" buttons, full price table |
| `order.html` | Order builder: category → flavors → quantity → cart → customer details (name, phone, IG, preferred date, pickup/delivery, notes) |
| `confirmation.html` | Mock order confirmation / receipt (reached after placing an order) |
| `about.html` | The two Maries' story, founder cards, brand personality |
| `events.html` | Bites boards, birthdays, favors, custom events, how-it-works, FAQ |
| `contact.html` | Instagram, pickup/delivery info, mock contact form |

## Files
- `css/styles.css`: all shared styles (brand colors as CSS variables at the top)
- `js/data.js`: **the menu/price catalog** (edit flavors & prices here; menu and order pages update automatically)
- `js/cart.js`: cart (localStorage), header cart count, toasts, mobile nav, Halloween countdown
- `js/menu.js`: menu rendering + filters
- `js/order.js`: order builder, cart UI, validation, mock checkout
- `assets/img/`: logo + product photos cropped from the brand guide & Instagram screenshots
- `assets/brand-guide.pdf`: original brand guide

## Order rules built in
- Staten Island delivery only (ZIP must be 103xx), **$20 minimum for delivery** (progress bar in cart)
- No same-day orders (date picker starts tomorrow); dates shown as "not guaranteed"
- Mini Flight Box = any 4 minis (doubles OK): $20 classic / $25 GF&V
- 16" board = 3 different flavors ($50 / $75 GF&V); 18" board = 5 flavors ($75 / $100 GF&V)
- Mini box of 4 = same price as the full loaf of that flavor
- Deep links work, e.g. `order.html?cat=full&flavor=pistachio`, `order.html?cat=flight&line=gfv`, `menu.html#gfv`

## Placeholder content (swap before launch)
Reviews, founder fun facts, flavor descriptions, and Halloween flavor descriptions are sample copy.
Gluten-free & vegan flavors without a photo use colorful emoji placeholder blocks.
