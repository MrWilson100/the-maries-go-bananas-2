/* The Maries Go Bananas: shared site + cart logic (localStorage, no backend) */
(function () {
  const KEY = "tmgb_cart_v1";
  const normalizeQty = value => {
    const qty = Number(value);
    return Number.isFinite(qty) ? Math.max(1, Math.min(50, Math.trunc(qty))) : 1;
  };
  const Cart = {
    get() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } },
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
  }
  window.addEventListener("storage", e => {
    if (e.storageArea === localStorage && (e.key === KEY || e.key === null)) refreshCart();
  });
  window.addEventListener("pageshow", refreshCart);

  /* Toast */
  let toastTimer;
  window.toast = function (html) {
    let t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); document.body.appendChild(t); }
    t.innerHTML = html; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 3200);
  };

  document.addEventListener("DOMContentLoaded", () => {
    Cart.renderCount(false);
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
    // Halloween countdown (specials run Oct 26-31)
    document.querySelectorAll("[data-countdown]").forEach(el => {
      const now = new Date(), end = new Date(now.getFullYear(), 9, 31, 23, 59, 59);
      const start = new Date(now.getFullYear(), 9, 26);
      const days = Math.ceil((end - now) / 864e5);
      if (now < start) el.textContent = "👻 Drops Oct 26!";
      else if (now <= end) el.textContent = days <= 1 ? "⏰ LAST DAY to order!" : `⏰ Only ${days} spooky days left!`;
      else el.textContent = "👻 Back next Halloween. Follow along on IG!";
    });
  });
})();
