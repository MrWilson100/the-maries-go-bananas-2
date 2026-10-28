/* Menu page: renders cards + category filter */
(function () {
  const F = TMGB.flavors, $ = s => document.querySelector(s);
  const badgeMap = {bestseller:'<span class="badge">⭐ Bestseller</span>', "fan fave":'<span class="badge badge--pink">💖 Fan fave</span>',
    monthly:'<span class="badge badge--pink">Loaf of the Month</span>', fall:'<span class="badge badge--orange">🍂 Fall</span>',
    halloween:'<span class="badge badge--orange">🎃 Halloween</span>'};
  const badges = f => (f.line === "gfv" ? '<span class="badge badge--green">🌱 GF & Vegan</span>' : "") + f.tags.map(t => badgeMap[t] || "").join("");

  function flavorCard(f, kind) {
    let prices, addLabel, cat;
    if (kind === "full") { prices = `<span class="price">Full loaf <b>${TMGB.money(f.full)}</b></span>`; addLabel = "+ Add loaf"; cat = "full"; }
    else if (kind === "mini") { prices = `<span class="price">Mini <b>${TMGB.money(f.mini)}</b></span><span class="price">Box of 4 <b>${TMGB.money(f.box || f.full)}</b></span>`; addLabel = "+ Add mini"; cat = "mini"; }
    else { prices = `<span class="price">Loaf <b>${TMGB.money(f.full)}</b></span><span class="price">Mini <b>${TMGB.money(f.mini)}</b></span><span class="price">Box of 4 <b>${TMGB.money(f.box || f.full)}</b></span>`; addLabel = "+ Add loaf"; cat = "full"; }
    return `<article class="card">
      <div class="card__img">${TMGB.visual(f)}<div class="badges">${badges(f)}</div></div>
      <div class="card__body"><h3>${f.name}</h3><p>${f.desc}</p>
        <div class="prices">${prices}</div>
        <div class="card__foot"><a class="btn btn--ghost btn--sm" href="order.html?cat=${cat}&flavor=${f.id}">Customize</a>
          <button class="btn btn--pink btn--sm" data-quick="${cat}:${f.id}">${addLabel}</button></div>
      </div></article>`;
  }
  const fill = (sel, list, kind) => { const el = $(sel); if (el) el.innerHTML = list.map(f => flavorCard(f, kind)).join(""); };
  fill("#grid-halloween", F.filter(f => f.line === "halloween"), "all");
  fill("#grid-full", F.filter(f => f.line === "regular"), "full");
  fill("#grid-mini", F.filter(f => f.line !== "gfv"), "mini");
  fill("#grid-gfv", F.filter(f => f.line === "gfv"), "all");

  // quick add
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-quick]"); if (!b) return;
    const [catId, fid] = b.dataset.quick.split(":"); const cat = TMGB.getCat(catId), f = TMGB.getFlavor(fid);
    Cart.add({cat: catId, catName: cat.name, flavors: [fid], label: `${cat.name} · ${f.name}`, detail: "", price: TMGB.unitPrice(cat, f), qty: 1});
    toast(`🍌 ${f.name} ${cat.name.toLowerCase()} added! <a href="order.html#cart">View cart →</a>`);
  });

  // filters
  const chips = document.querySelectorAll(".chip[data-filter]");
  function apply(filter) {
    chips.forEach(c => c.setAttribute("aria-pressed", c.dataset.filter === filter));
    document.querySelectorAll("[data-group]").forEach(g => {
      const show = filter === "all" || g.dataset.group.split(" ").includes(filter);
      g.classList.toggle("is-hidden", !show);
      if (show) g.querySelectorAll(".card").forEach(c => { c.classList.remove("fade-in"); void c.offsetWidth; c.classList.add("fade-in"); });
    });
    if (history.replaceState) history.replaceState(null, "", filter === "all" ? "menu.html" : "menu.html#" + filter);
  }
  chips.forEach(c => c.addEventListener("click", () => apply(c.dataset.filter)));
  const h = location.hash.slice(1); if (h && document.querySelector(`.chip[data-filter="${h}"]`)) apply(h);
})();
