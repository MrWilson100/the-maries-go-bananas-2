/* The Maries Go Bananas: owner-approved menu and November flavors */
window.TMGB = window.TMGB || {};
TMGB.IMG = "assets/img/";
TMGB.flavors = [
  // ---- Classic ----
  {id:"og",   name:"The OG",                 short:"OG",   line:"regular", full:12, box:12, mini:4, emoji:"🍌", color:"#FFCC24", img:"owner/og.webp",
   desc:"Our classic, super-moist banana bread. Simple, cozy, and anything but basic.", tags:["bestseller"]},
  {id:"cc",   name:"Chocolate Chip",          short:"CC",   line:"regular", full:15, box:15, mini:5, emoji:"🍫", color:"#8B5A2B", img:"owner/chocolate-chip.webp",
   desc:"Loaded with melty chocolate chips in every single bite.", tags:["bestseller"], board:true},
  {id:"walnut",name:"Walnut Crunch",          short:"Walnut",line:"regular",full:15, box:15, mini:5, emoji:"🌰", color:"#C68B59", img:"owner/walnut-crunch.webp",
   desc:"Toasty walnuts baked in and crunched on top.", tags:[]},
  // ---- Premium Signature ----
  {id:"nutella",name:"Nutella Swirl",         short:"Nutella",line:"premium",full:20,box:20,mini:8, emoji:"🤎", color:"#6B3E1F", img:"owner/nutella-swirl.webp",
   desc:"Ribbons of Nutella swirled through every slice. Dangerous.", tags:["bestseller"], board:true},
  {id:"pistachio",name:"Pistachio Dream",     short:"Pistachio",line:"premium",full:20,box:20,mini:8,emoji:"💚", color:"#A6B975", img:"owner/pistachio-dream.webp",
   desc:"Pistachio cream, crushed pistachios, and a whole lot of drama.", tags:["fan fave"]},
  {id:"monthly",name:"Blueberry Bliss",     short:"Blueberry Bliss",line:"premium",full:20,box:20,mini:8,emoji:"🫐", color:"#7FB3D5", img:"owner/blueberry-bliss.webp", photoClass:"product-photo--blueberry",
   desc:"Fresh blueberries baked into banana bread. No drizzle, just blueberry bliss.", tags:[]},
  {id:"snut", name:"Strawberry Nutella",  short:"Strawberry Nutella",line:"premium",full:20,box:20,mini:8,emoji:"🍓", color:"#EE3E7E", img:"owner/strawberry-nutella.webp",
   desc:"Fresh strawberries meet Nutella. A match made in banana heaven.", tags:["bestseller"], board:true},
  {id:"scream",name:"Strawberries & Cream",   short:"Straw & Cream",line:"premium",full:20,box:20,mini:8,emoji:"🍰", color:"#F7A1C0", img:"owner/strawberries-cream.webp",
   desc:"Sweet strawberries and a dreamy cream drizzle. Pretty in pink.", tags:[], board:true},
  {id:"bbw",  name:"Blueberry Bliss with Walnuts",      short:"Blueberry & Walnuts",line:"premium",full:20,box:20,mini:8,emoji:"🫐", color:"#5B6FB5", img:"owner/blueberry-bliss.webp", photoClass:"product-photo--blueberry-walnut",
   desc:"Blueberry Bliss topped with crunchy walnut streusel. No drizzle.", tags:[], board:true},
  // ---- November Fall ----
  {id:"pumpkin",name:"Pumpkin Spice",short:"Pumpkin Spice",line:"fall",full:20,box:20,mini:8,emoji:"🎃", color:"#D98B44", img:"owner/pumpkin-spice.webp",
   desc:"Warm pumpkin spice and a white chocolate drizzle. Cozy November comfort.", tags:["fall"]},
  {id:"cinna",name:"Cinnamon Bun Bliss",short:"Cinnamon Bun",line:"fall",full:20,box:20,mini:8,emoji:"🌀", color:"#D9A066", img:"owner/cinnamon-bun-bliss.webp",
   desc:"Cinnamon bun spread swirled through banana bread with cinnamon-sugar crumb on top.", tags:["fall"], board:true},
  {id:"caramel-apple",name:"Caramel Apple Crumble Dream",short:"Caramel Apple Crumble",line:"fall",full:20,box:20,mini:8,emoji:"🍎", color:"#C9945B", img:"owner/caramel-apple-crumble-dream.webp",
   desc:"Apple pie filling, buttery crumble and caramel drizzle. A dreamy November loaf.", tags:["fall"]},
  {id:"salted-caramel",name:"Salted Caramel Dream",short:"Salted Caramel",line:"fall",full:20,box:20,mini:8,emoji:"🤎", color:"#BE874D", img:"owner/salted-caramel-dream.webp",
   desc:"Buttercream and salted caramel drizzle. Sweet-and-salty comfort for fall.", tags:["fall"]},
  // ---- Gluten-free & Vegan ----
  {id:"gf-og",name:"GF&V The OG",             short:"GF&V OG",line:"gfv", full:16, box:25, mini:6, emoji:"🌱", color:"#A6B975", img:"gfv-menu.jpg",
   desc:"Our OG, gluten-free AND vegan. Nobody will be able to tell.", tags:[], board:true},
  {id:"gf-walnut",name:"GF&V Walnut Crunch",  short:"GF&V Walnut",line:"gfv",full:20,box:25,mini:8,emoji:"🌰", color:"#B9C98A",
   desc:"Gluten-free, vegan, and still very much crunchy.", tags:[], board:true},
  {id:"gf-dcc",name:"GF&V Dark Chocolate",short:"GF&V Dark Chocolate",line:"gfv",full:20,box:25,mini:8,emoji:"🍫", color:"#8FA35E",
   desc:"Rich dark chocolate flavor, plant-based and gluten-free.", tags:[], board:true},
  {id:"gf-blue",name:"GF&V Blueberry Bliss",        short:"GF&V Blueberry Bliss",line:"gfv",full:20,box:25,mini:8,emoji:"🫐", color:"#C7D4A0",
   desc:"Bursting blueberries, gluten-free & vegan.", tags:[], board:true},
  {id:"gf-straw",name:"GF&V Strawberry Bliss",      short:"GF&V Strawberry Bliss",line:"gfv",full:20,box:25,mini:8,emoji:"🍓", color:"#D6E2B4",
   desc:"Fresh strawberry goodness for our GF & vegan besties.", tags:[], board:true}
];

/* Order categories */
TMGB.categories = [
  {id:"full",    name:"Full Loaf",            emoji:"🍞", blurb:"A whole loaf. Share… or don't.", from:12,  mode:"single", priceKey:"full",
   lines:["regular","premium","fall","gfv"]},
  {id:"minibox", name:"Mini Loaf Box of 4",   emoji:"📦", blurb:"4 minis, one flavor. A whole box of happy.", from:12, mode:"single", priceKey:"box",
   lines:["regular","premium","fall","gfv"]},
  {id:"mini",    name:"Individual Mini",      emoji:"🧁", blurb:"A lil' loaf just for you.", from:4, mode:"single", priceKey:"mini",
   lines:["regular","premium","fall","gfv"]},
  {id:"flight",  name:"Mini Flight Box",      emoji:"✈️", blurb:"Pick ANY 4 minis. Can't decide? Don't!", from:20, mode:"pick", pick:4, repeat:true,
   price:{regular:20, gfv:25}},
  {id:"board16", name:'16" Bites Board',      emoji:"🍪", blurb:"30 bites · 3 flavors. Party starter.", from:50, mode:"pick", pick:3, repeat:false,
   price:{regular:50, gfv:75}},
  {id:"board18", name:'18" Bites Board',      emoji:"🎉", blurb:"50 bites · 5 flavors. Main character energy.", from:75, mode:"pick", pick:5, repeat:false,
   price:{regular:75, gfv:100}}
];

TMGB.lineLabels = {regular:"Classic", premium:"Premium Signature", fall:"November Fall 🍂", gfv:"Gluten-Free & Vegan 🌱"};

TMGB.getFlavor = id => TMGB.flavors.find(f => f.id === id);
TMGB.getCat = id => TMGB.categories.find(c => c.id === id);
TMGB.unitPrice = (cat, f) => f[cat.priceKey];
TMGB.money = n => "$" + (Math.round(n * 100) / 100).toFixed(n % 1 ? 2 : 0);

/* Renders a photo or a colorful emoji placeholder */
TMGB.visual = (f, cls) => f.img
  ? `<img src="${TMGB.IMG + f.img}" alt="${f.name} banana bread"${f.photoClass ? ` class="${f.photoClass}"` : ""} loading="lazy">`
  : `<div class="ph ${cls||""}" style="background:${f.color}"><span aria-hidden="true">${f.emoji}</span></div>`;
