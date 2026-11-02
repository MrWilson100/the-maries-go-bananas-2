# The Maries Go Bananas: clickable website mockup 🍌

Static HTML/CSS/JS mockup. No build step, no backend, no real payments.

## Open it
- **Easiest:** double-click `index.html` (works straight from the file system).
- **Or run a tiny server** (recommended for sharing on your network):
  ```bash
  cd the-maries-go-bananas-2
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```
Fonts (Lilita One, Fredoka, Nunito) load from Google Fonts; offline, the site falls back to system fonts.

## Pages
| File | What it is |
|---|---|
| `index.html` | Home: hero + tagline, November Fall Specials callout, bestsellers strip, about teaser, reviews, IG grid, order CTA |
| `menu.html` | Full menu with filter chips: Full Loaves, Mini Loaves, Mini Flight Boxes, Bites Boards, GF & Vegan, Fall Specials. Quick-add + "Customize" buttons, full price table |
| `order.html` | Order builder: category → flavors → quantity → cart → customer details (name, phone, IG, preferred date, pickup/delivery, notes) |
| `confirmation.html` | Mock order confirmation / receipt (reached after placing an order) |
| `about.html` | The two Maries' story, founder cards, brand personality |
| `events.html` | Bites boards, birthdays, favors, custom events, how-it-works, FAQ |
| `contact.html` | Instagram, pickup/delivery info, mock contact form |

## Files
- `css/styles.css`: all shared styles (brand colors as CSS variables at the top)
- `js/data.js`: **the menu/price catalog** used by the menu and order builder
- `js/cart.js`: cart (localStorage), header cart count, toasts, mobile nav
- `js/menu.js`: menu rendering + filters
- `js/order.js`: order builder, cart UI, validation, mock checkout
- `assets/img/`: existing logo and reference images cropped from the brand guide & Instagram screenshots
- `assets/img/owner/`: 13 optimized WebP product photos supplied by the owner, including the combined blueberry and mini flight box photos; the menu poster is excluded
- `assets/brand-guide.pdf`: original brand guide

## Order rules built in
- Staten Island delivery only (ZIP must be 103xx), **$20 minimum for delivery** (progress bar in cart)
- No same-day orders (date picker starts tomorrow); dates shown as "not guaranteed"
- Mini Flight Box = any 4 regular or seasonal minis (doubles OK): $20; GF&V flight box: $25
- 16" board = 3 different flavors ($50 / $75 GF&V); 18" board = 5 flavors ($75 / $100 GF&V)
- Regular and fall-special mini boxes of 4 match the full-loaf price; every GF&V mini box of 4 is $25
- Deep links work, e.g. `order.html?cat=full&flavor=pistachio`, `order.html?cat=flight&line=gfv`, `menu.html#gfv`

## November catalog
Prices below are full loaf / mini box of 4 / individual mini.

- Classics: The OG $12 / $12 / $4; Chocolate Chip and Walnut Crunch $15 / $15 / $5.
- Premiums: Blueberry Bliss, Blueberry Bliss with Walnuts, Nutella Swirl, Pistachio Dream, Strawberry Nutella, and Strawberries & Cream: $20 / $20 / $8.
- November Fall Specials: Pumpkin Spice, Cinnamon Bun Bliss, Caramel Apple Crumble Dream, and Salted Caramel Dream: $20 / $20 / $8.
- GF&V: The OG $16 / $25 / $6; Dark Chocolate, Blueberry Bliss, Walnut Crunch, and Strawberry Bliss $20 / $25 / $8.

## Placeholder content (swap before launch)
Reviews, founder fun facts, and flavor descriptions are sample copy. The existing party-board reference images still contain Halloween artwork; updated board photos have not been supplied.
Gluten-free & vegan flavors without a dedicated photo use colorful emoji placeholder blocks.
