/* The Maries Go Bananas: product catalog (prices from the Maries' Google order form) */
window.TMGB = window.TMGB || {};
TMGB.IMG = "assets/img/";
TMGB.flavors = [
  // ---- Regular ----
  {id:"og",   name:"The OG",                 short:"OG",   line:"regular", full:12, mini:4, emoji:"🍌", color:"#FFCC24", img:"slice.jpg",
   desc:"Our classic, super-moist banana bread. Simple, cozy, and anything but basic.", tags:["bestseller"]},
  {id:"cc",   name:"Chocolate Chip",          short:"CC",   line:"regular", full:15, mini:5, emoji:"🍫", color:"#8B5A2B", img:"teal-loaf.jpg",
   desc:"Loaded with melty chocolate chips in every single bite.", tags:["bestseller"], board:true},
  {id:"walnut",name:"Walnut Crunch",          short:"Walnut",line:"regular",full:15, mini:5, emoji:"🌰", color:"#C68B59", img:"walnut-loaf.jpg",
   desc:"Toasty walnuts baked in and crunched on top.", tags:[]},
  {id:"nutella",name:"Nutella Swirl",         short:"Nutella",line:"regular",full:18,mini:6, emoji:"🤎", color:"#6B3E1F", img:"mini-box.jpg",
   desc:"Ribbons of Nutella swirled through every slice. Dangerous.", tags:["bestseller"], board:true},
  {id:"pistachio",name:"Pistachio Dream",     short:"Pistachio",line:"regular",full:20,mini:8,emoji:"💚", color:"#A6B975", img:"pistachio-mini.jpg",
   desc:"Pistachio cream, crushed pistachios, and a whole lot of drama.", tags:["fan fave"]},
  {id:"monthly",name:"Loaf of the Month",     short:"Monthly Special",line:"regular",full:20,mini:8,emoji:"⭐", color:"#7FB3D5", img:"blueberry-month.jpg",
   desc:"This month: Fresh Blueberry with white chocolate drizzle (with or without walnuts), supporting Ovarian Cancer Awareness. 💙", tags:["monthly"]},
  {id:"snut", name:"Strawberries & Nutella",  short:"Straw & Nutella",line:"regular",full:20,mini:8,emoji:"🍓", color:"#EE3E7E", img:"strawberry-nutella.jpg",
   desc:"Fresh strawberries meet Nutella. A match made in banana heaven.", tags:["bestseller"], board:true},
  {id:"scream",name:"Strawberries & Cream",   short:"Straw & Cream",line:"regular",full:20,mini:8,emoji:"🍰", color:"#F7A1C0", img:"fresh-loaf.jpg",
   desc:"Sweet strawberries and a dreamy cream drizzle. Pretty in pink.", tags:[], board:true},
  {id:"cinna",name:"Cinnamon Bun Bliss",      short:"Cinnamon Bun",line:"regular",full:20,mini:8,emoji:"🌀", color:"#D9A066", img:"fall-flavors.jpg",
   desc:"Cinnamon-sugar swirl + glaze. Tastes like a Sunday morning hug.", tags:["fall"], board:true},
  {id:"bbw",  name:"Blueberry & Walnut",      short:"Blueberry Walnut",line:"regular",full:20,mini:8,emoji:"🫐", color:"#5B6FB5", img:"party-minis.jpg",
   desc:"Juicy blueberries with crunchy walnuts. Fancy brunch energy.", tags:[], board:true},
  // ---- Gluten-free & Vegan ----
  {id:"gf-og",name:"GF&V The OG",             short:"GF&V OG",line:"gfv", full:16, mini:6, emoji:"🌱", color:"#A6B975", img:"gfv-menu.jpg",
   desc:"Our OG, gluten-free AND vegan. Nobody will be able to tell.", tags:[], board:true},
  {id:"gf-walnut",name:"GF&V Walnut Crunch",  short:"GF&V Walnut",line:"gfv",full:20,mini:8,emoji:"🌰", color:"#B9C98A",
   desc:"Gluten-free, vegan, and still very much crunchy.", tags:[], board:true},
  {id:"gf-dcc",name:"GF&V Dark Chocolate Chip",short:"GF&V Dark CC",line:"gfv",full:20,mini:8,emoji:"🍫", color:"#8FA35E",
   desc:"Rich dark chocolate chips, plant-based and gluten-free.", tags:[], board:true},
  {id:"gf-blue",name:"GF&V Blueberry",        short:"GF&V Blueberry",line:"gfv",full:20,mini:8,emoji:"🫐", color:"#C7D4A0",
   desc:"Bursting blueberries, gluten-free & vegan.", tags:[], board:true},
  {id:"gf-straw",name:"GF&V Strawberry",      short:"GF&V Strawberry",line:"gfv",full:20,mini:8,emoji:"🍓", color:"#D6E2B4",
   desc:"Fresh strawberry goodness for our GF & vegan besties.", tags:[], board:true},
  // ---- Halloween week (Oct 26-31) ----
  {id:"twix", name:"Twix or Treat",           short:"Twix or Treat",line:"halloween",full:20,mini:8,box:20,emoji:"🎃", color:"#FF8A1F", img:"halloween-specials.jpg",
   desc:"Caramel, cookie crunch & chocolate. Trick or treat yourself!", tags:["halloween"], board:true},
  {id:"milkyway",name:"Midnight Milky Way",   short:"Midnight Milky Way",line:"halloween",full:20,mini:8,box:20,emoji:"🌙", color:"#4B2C6B", img:"halloween-platter.jpg",
   desc:"Dark chocolate banana bread loaded with Milky Way & caramel.", tags:["halloween"], board:true},
  {id:"snickers",name:"Snickers Gone Bananas",short:"Snickers Gone Bananas",line:"halloween",full:20,mini:8,box:20,emoji:"🥜", color:"#A0522D", img:"party-boards.jpg",
   desc:"Peanuts, caramel, nougat & chocolate. Totally nuts, in the best way.", tags:["halloween"], board:true}
];

/* Order categories */
TMGB.categories = [
  {id:"full",    name:"Full Loaf",            emoji:"🍞", blurb:"A whole loaf. Share… or don't.", from:12,  mode:"single", priceKey:"full",
   lines:["regular","gfv","halloween"]},
  {id:"minibox", name:"Mini Loaf Box of 4",   emoji:"📦", blurb:"4 minis, one flavor. Same price as a full loaf!", from:12, mode:"single", priceKey:"box",
   lines:["regular","gfv","halloween"]},
  {id:"mini",    name:"Individual Mini",      emoji:"🧁", blurb:"A lil' loaf just for you.", from:4, mode:"single", priceKey:"mini",
   lines:["regular","gfv","halloween"]},
  {id:"flight",  name:"Mini Flight Box",      emoji:"✈️", blurb:"Pick ANY 4 minis. Can't decide? Don't!", from:20, mode:"pick", pick:4, repeat:true,
   price:{regular:20, gfv:25}},
  {id:"board16", name:'16" Bites Board',      emoji:"🍪", blurb:"30 bites · 3 flavors. Party starter.", from:50, mode:"pick", pick:3, repeat:false,
   price:{regular:50, gfv:75}},
  {id:"board18", name:'18" Bites Board',      emoji:"🎉", blurb:"50 bites · 5 flavors. Main character energy.", from:75, mode:"pick", pick:5, repeat:false,
   price:{regular:75, gfv:100}}
];

TMGB.lineLabels = {regular:"Classic Flavors", gfv:"Gluten-Free & Vegan 🌱", halloween:"Halloween Week Specials 🎃"};

TMGB.getFlavor = id => TMGB.flavors.find(f => f.id === id);
TMGB.getCat = id => TMGB.categories.find(c => c.id === id);
TMGB.unitPrice = (cat, f) => {
  if (cat.priceKey === "box") return f.box || f.full;   // box of 4 = full-loaf price
  return f[cat.priceKey];
};
TMGB.money = n => "$" + (Math.round(n * 100) / 100).toFixed(n % 1 ? 2 : 0);

/* Renders a photo or a colorful emoji placeholder */
TMGB.visual = (f, cls) => f.img
  ? `<img src="${TMGB.IMG + f.img}" alt="${f.name} banana bread" loading="lazy">`
  : `<div class="ph ${cls||""}" style="background:${f.color}"><span aria-hidden="true">${f.emoji}</span></div>`;
