/* The Maries Go Bananas: shared site + cart logic (localStorage, no backend) */
(function () {
  const KEY = "tmgb_cart_v1";
  const normalizeQty = value => {
    const qty = Number(value);
    return Number.isFinite(qty) ? Math.max(1, Math.min(50, Math.trunc(qty))) : 1;
  };
  let cartNotice = {updated: false, removed: false};
  let ready = false;
  function reconcile(items) {
    const catalog = window.TMGB;
    // Informational pages can still show the saved count without loading a catalog.
    if (!catalog || !catalog.getCat || !catalog.getFlavor) return items;
    let changed = false;
    const current = [];
    items.forEach(item => {
      const cat = item && catalog.getCat(item.cat);
      const flavors = item && Array.isArray(item.flavors) ? item.flavors.map(catalog.getFlavor) : [];
      const variant = item && item.variant === "gfv" ? "gfv" : "regular";
      const valid = cat && flavors.length && flavors.every(Boolean) && (cat.mode === "single"
        ? flavors.length === 1 && cat.lines.includes(flavors[0].line)
        : flavors.length === cat.pick && (cat.repeat || new Set(item.flavors).size === cat.pick)
          && flavors.every(f => (variant === "gfv" ? f.line === "gfv" : f.line !== "gfv") && (cat.id === "flight" || f.board)));
      if (!valid) { changed = true; cartNotice.removed = true; return; }
      const single = cat.mode === "single", flavor = flavors[0];
      const next = Object.assign({}, item, {
        catName: cat.name,
        label: single ? `${cat.name} · ${flavor.name}` : `${cat.name}${variant === "gfv" ? " (GF & Vegan)" : ""}`,
        detail: single ? (flavor.line === "gfv" ? "Gluten-free & vegan" : "") : flavors.map(f => f.short).join(" · "),
        price: single ? catalog.unitPrice(cat, flavor) : cat.price[variant],
        qty: normalizeQty(item.qty)
      });
      if (single) delete next.variant; else next.variant = variant;
      next.sig = next.cat + "|" + next.flavors.join(",") + "|" + (next.variant || "");
      if (JSON.stringify(next) !== JSON.stringify(item)) { changed = true; cartNotice.updated = true; }
      current.push(next);
    });
    if (changed) localStorage.setItem(KEY, JSON.stringify(current));
    return current;
  }
  function showCartNotice() {
    if (!ready || (!cartNotice.updated && !cartNotice.removed)) return;
    const messages = [];
    if (cartNotice.updated) messages.push("Your saved cart has been updated with current menu names and prices.");
    if (cartNotice.removed) messages.push("Items with unavailable flavors were removed. Please rebuild any affected flights or boards.");
    toast(messages.join(" "), 8000);
    cartNotice = {updated: false, removed: false};
  }
  const Cart = {
    get() { try { const items = JSON.parse(localStorage.getItem(KEY)) || []; return Array.isArray(items) ? reconcile(items) : []; } catch (e) { return []; } },
    save(items) { localStorage.setItem(KEY, JSON.stringify(items)); Cart.renderCount(true); document.dispatchEvent(new CustomEvent("cart:change")); },
    add(item) {
      const items = Cart.get();
      const sig = item.cat + "|" + item.flavors.join(",") + "|" + (item.variant || "");
      const ex = items.find(i => i.sig === sig);
      let added = normalizeQty(item.qty);
      if (ex) {
        const qty = normalizeQty(ex.qty);
        added = Math.min(added, 50 - qty);
        ex.qty = qty + added;
      } else items.push(Object.assign({ id: Date.now() + Math.random().toString(36).slice(2, 6), sig }, item, {qty: added}));
      Cart.save(items);
      return added;
    },
    setQty(id, qty) { const items = Cart.get(); const it = items.find(i => i.id === id); if (!it) return; it.qty = normalizeQty(qty); Cart.save(items); },
    remove(id) { Cart.save(Cart.get().filter(i => i.id !== id)); },
    clear() { Cart.save([]); },
    count() { return Cart.get().reduce((s, i) => s + i.qty, 0); },
    subtotal() { return Cart.get().reduce((s, i) => s + i.qty * i.price, 0); },
    renderCount(bump) {
      document.querySelectorAll("[data-cart-count]").forEach(el => {
        el.textContent = Cart.count();
        if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
      });
    }
  };
  window.Cart = Cart;
  function refreshCart() {
    Cart.renderCount(false);
    document.dispatchEvent(new CustomEvent("cart:change"));
    showCartNotice();
  }
  window.addEventListener("storage", e => {
    if (e.storageArea === localStorage && (e.key === KEY || e.key === null)) refreshCart();
  });
  window.addEventListener("pageshow", refreshCart);

  /* Toast */
  let toastTimer;
  window.toast = function (html, duration = 3200) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); document.body.appendChild(t); }
    t.innerHTML = html; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), duration);
  };

  document.addEventListener("DOMContentLoaded", () => {
    ready = true;
    Cart.renderCount(false);
    showCartNotice();
    // mobile nav
    const btn = document.querySelector(".menu-toggle"), links = document.getElementById("nav-links");
    if (btn && links) {
      const setOpen = open => {
        links.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open); btn.textContent = open ? "✕" : "☰";
      };
      btn.addEventListener("click", () => setOpen(!links.classList.contains("open")));
      links.addEventListener("click", e => { if (e.target.closest("a")) setOpen(false); });
      document.addEventListener("click", e => {
        if (links.classList.contains("open") && !links.contains(e.target) && !btn.contains(e.target)) setOpen(false);
      });
      document.addEventListener("keydown", e => {
        if (e.key === "Escape" && links.classList.contains("open")) {
          setOpen(false); btn.focus(); e.preventDefault();
        }
      });
    }
    // year
    document.querySelectorAll("[data-year]").forEach(e => e.textContent = new Date().getFullYear());
  });
})();
