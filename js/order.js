/* Order page: build-your-order wizard + cart + mock checkout */
(function () {
  const $ = s => document.querySelector(s), $$ = s => Array.from(document.querySelectorAll(s));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const MIN_DELIVERY = 20;
  const state = {cat: null, line: "regular", flavor: null, picks: [], qty: 1};

  /* ---------- Step 1: categories ---------- */
  const tiles = $("#cat-tiles");
  tiles.innerHTML = TMGB.categories.map(c => `<button type="button" class="tile" data-cat="${c.id}" aria-pressed="false">
      <span class="emo" aria-hidden="true">${c.emoji}</span><b>${c.name}</b><small>${c.blurb}</small><small style="color:var(--pink)">from ${TMGB.money(c.from)}</small></button>`).join("");
  tiles.addEventListener("click", e => { const t = e.target.closest(".tile"); if (t) selectCat(t.dataset.cat, true); });

  function selectCat(id, scroll) {
    state.cat = TMGB.getCat(id); state.flavor = null; state.picks = []; state.qty = 1;
    $$(".tile").forEach(t => t.setAttribute("aria-pressed", t.dataset.cat === id));
    renderFlavors(); renderSummary();
    if (scroll) $("#step-flavors").scrollIntoView({behavior: "smooth", block: "start"});
  }

  /* ---------- Step 2: flavors ---------- */
  function pool() {
    const c = state.cat;
    if (c.mode === "single") return TMGB.flavors.filter(f => c.lines.includes(f.line));
    if (c.id === "flight") return TMGB.flavors.filter(f => state.line === "gfv" ? f.line === "gfv" : f.line !== "gfv");
    return TMGB.flavors.filter(f => f.board && (state.line === "gfv" ? f.line === "gfv" : f.line !== "gfv"));
  }
  function flvBtn(f) {
    const c = state.cat, single = c.mode === "single";
    const count = single ? 0 : state.picks.filter(p => p === f.id).length;
    const pressed = single ? state.flavor === f.id : count > 0;
    const thumb = f.img ? `<img src="${TMGB.IMG + f.img}" alt="">` : `<span aria-hidden="true">${f.emoji}</span>`;
    const sub = single ? TMGB.money(TMGB.unitPrice(c, f)) : (f.line === "halloween" ? "🎃 Halloween week" : f.line === "gfv" ? "🌱 GF & Vegan" : "Classic");
    return `<button type="button" class="flv" data-flv="${f.id}" aria-pressed="${pressed}">
      <span class="thumb" style="background:${f.color}">${thumb}</span>
      <span><b>${f.name}</b><small>${sub}</small></span>${count > 1 || (c.repeat && count) ? `<span class="cnt">×${count}</span>` : ""}</button>`;
  }
  function renderFlavors() {
    const box = $("#flavor-area"), c = state.cat;
    if (!c) { box.innerHTML = `<p class="empty-hint">👆 Pick a category first and we'll show you the flavors.</p>`; return; }
    let html = "";
    if (c.mode === "pick") {
      html += `<div class="toggle" role="group" aria-label="Recipe type">
        <button type="button" data-line="regular" aria-pressed="${state.line === "regular"}">Classic · ${TMGB.money(c.price.regular)}</button>
        <button type="button" data-line="gfv" aria-pressed="${state.line === "gfv"}">🌱 GF & Vegan · ${TMGB.money(c.price.gfv)}</button></div>
        <p style="margin-top:-4px"><b>${c.repeat ? `Pick any ${c.pick} minis, doubles allowed!` : `Pick ${c.pick} different flavors for your board.`}</b></p>`;
    }
    const groups = {};
    pool().forEach(f => (groups[f.line] = groups[f.line] || []).push(f));
    Object.keys(groups).forEach(line => {
      html += `<div class="flv-group-title">${TMGB.lineLabels[line]}</div><div class="flavor-grid">${groups[line].map(flvBtn).join("")}</div>`;
    });
    if (c.mode === "pick") {
      html += `<div class="picker-status" aria-live="polite"><span>${state.picks.length} / ${c.pick} picked</span>
        <span class="picked-pills">${state.picks.map((p, i) => `<button type="button" data-unpick="${i}" aria-label="Remove ${esc(TMGB.getFlavor(p).name)}">${esc(TMGB.getFlavor(p).short)} ✕</button>`).join("")}</span></div>`;
    }
    box.innerHTML = html;
  }
  $("#flavor-area").addEventListener("click", e => {
    const c = state.cat; if (!c) return;
    const lineBtn = e.target.closest("[data-line]");
    if (lineBtn) { state.line = lineBtn.dataset.line; state.picks = []; renderFlavors(); renderSummary(); return; }
    const un = e.target.closest("[data-unpick]");
    if (un) { state.picks.splice(+un.dataset.unpick, 1); renderFlavors(); renderSummary(); return; }
    const b = e.target.closest("[data-flv]"); if (!b) return;
    const id = b.dataset.flv;
    if (c.mode === "single") state.flavor = id;
    else if (c.repeat) { if (state.picks.length < c.pick) state.picks.push(id); else toast(`Box is full! Tap a pick below to swap it out 🍌`); }
    else {
      const i = state.picks.indexOf(id);
      if (i > -1) state.picks.splice(i, 1);
      else if (state.picks.length < c.pick) state.picks.push(id);
      else toast(`That's ${c.pick} flavors already! Unpick one to swap 🍌`);
    }
    renderFlavors(); renderSummary();
    const again = $(`[data-flv="${id}"]`); if (again) again.focus();
  });

  /* ---------- Step 3: quantity + add ---------- */
  function currentItem() {
    const c = state.cat; if (!c) return null;
    if (c.mode === "single") {
      if (!state.flavor) return null;
      const f = TMGB.getFlavor(state.flavor);
      return {cat: c.id, catName: c.name, flavors: [f.id], label: `${c.name} · ${f.name}`, detail: f.line === "gfv" ? "Gluten-free & vegan" : "", price: TMGB.unitPrice(c, f), qty: state.qty};
    }
    if (state.picks.length !== c.pick) return null;
    const names = state.picks.map(p => TMGB.getFlavor(p).short);
    return {cat: c.id, catName: c.name, flavors: state.picks.slice(), variant: state.line,
      label: `${c.name}${state.line === "gfv" ? " (GF & Vegan)" : ""}`, detail: names.join(" · "), price: c.price[state.line], qty: state.qty};
  }
  function renderSummary() {
    const it = currentItem(), c = state.cat;
    $("#qty").value = state.qty;
    $("#build-summary").innerHTML = it ? `<b>${esc(it.label)}</b>${it.detail ? `<br><small>${esc(it.detail)}</small>` : ""}<br><small>${TMGB.money(it.price)} each</small>`
      : `<span style="color:var(--choc-2)">${!c ? "Choose a category to start." : c.mode === "single" ? "Now pick a flavor 👆" : `Pick ${c.pick - state.picks.length} more flavor${c.pick - state.picks.length === 1 ? "" : "s"} 👆`}</span>`;
    $("#line-total").textContent = it ? TMGB.money(it.price * it.qty) : "$0";
    $("#add-btn").disabled = !it;
  }
  const setQty = q => { state.qty = Math.max(1, Math.min(50, q || 1)); renderSummary(); };
  $("#qty-minus").onclick = () => setQty(state.qty - 1);
  $("#qty-plus").onclick = () => setQty(state.qty + 1);
  $("#qty").addEventListener("change", e => setQty(parseInt(e.target.value, 10)));
  $("#add-btn").addEventListener("click", () => {
    const it = currentItem(); if (!it) return;
    Cart.add(it);
    toast(`🎉 Added ${it.qty} × ${esc(it.label)} to your cart!`);
    // reset picks but keep category for easy repeat
    state.flavor = null; state.picks = []; state.qty = 1; renderFlavors(); renderSummary();
    if (window.innerWidth < 1020) $("#cart").scrollIntoView({behavior: "smooth"});
  });

  /* ---------- Cart ---------- */
  function fulfillment() { const r = $('input[name="fulfillment"]:checked'); return r ? r.value : "pickup"; }
  function renderCart() {
    const items = Cart.get(), list = $("#cart-items"), sub = Cart.subtotal();
    list.innerHTML = items.length ? items.map(i => `<li class="cart-item">
        <b>${esc(i.label)}</b><span class="big-price" style="font-size:1.2rem">${TMGB.money(i.price * i.qty)}</span>
        ${i.detail ? `<span class="meta">${esc(i.detail)}</span>` : ""}
        <div class="row"><div class="qty qty--sm"><button type="button" data-dec="${i.id}" aria-label="Decrease">−</button>
          <input type="number" value="${i.qty}" min="1" max="50" data-q="${i.id}" aria-label="Quantity for ${esc(i.label)}"><button type="button" data-inc="${i.id}" aria-label="Increase">+</button></div>
          <button type="button" class="rm" data-rm="${i.id}">Remove</button></div></li>`).join("")
      : `<li class="empty-hint">Your cart is emptier than a banana peel 🍌<br>Build something delicious!</li>`;
    $("#subtotal").textContent = TMGB.money(sub);
    $("#grand").textContent = TMGB.money(sub);
    const del = fulfillment() === "delivery";
    const pct = Math.min(100, sub / MIN_DELIVERY * 100);
    $("#min-wrap").hidden = !del;
    $("#min-bar").style.width = pct + "%";
    $("#min-msg").innerHTML = sub >= MIN_DELIVERY ? "✅ You've hit the $20 delivery minimum!" : `Add <b>${TMGB.money(MIN_DELIVERY - sub)}</b> more for delivery ($20 min).`;
    $("#fulfill-line").textContent = del ? "Local delivery (Staten Island)" : "Pickup";
    $("#checkout-btn").disabled = !items.length;
  }
  $("#cart-items").addEventListener("click", e => {
    const t = e.target, items = Cart.get();
    const find = id => items.find(i => i.id === id);
    if (t.dataset.rm) Cart.remove(t.dataset.rm);
    if (t.dataset.inc) Cart.setQty(t.dataset.inc, find(t.dataset.inc).qty + 1);
    if (t.dataset.dec) Cart.setQty(t.dataset.dec, find(t.dataset.dec).qty - 1);
  });
  $("#cart-items").addEventListener("change", e => { if (e.target.dataset.q) Cart.setQty(e.target.dataset.q, parseInt(e.target.value, 10) || 1); });
  $("#clear-cart").addEventListener("click", () => { if (Cart.get().length && confirm("Empty your whole cart?")) Cart.clear(); });
  $("#checkout-btn").addEventListener("click", () => { $("#order-form").scrollIntoView({behavior: "smooth"}); setTimeout(() => $("#c-name").focus(), 500); });
  document.addEventListener("cart:change", renderCart);

  /* ---------- Details form ---------- */
  const dateIn = $("#c-date");
  const ymd = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1); dateIn.min = ymd(tomorrow);
  $$('input[name="fulfillment"]').forEach(r => r.addEventListener("change", () => { $("#address-wrap").hidden = fulfillment() !== "delivery"; renderCart(); }));
  $("#c-phone").addEventListener("input", e => {
    const d = e.target.value.replace(/\D/g, "").slice(0, 10);
    e.target.value = d.length > 6 ? `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0,3)}) ${d.slice(3)}` : d;
  });
  $("#c-ig").addEventListener("blur", e => { const v = e.target.value.trim().replace(/^@+/, ""); e.target.value = v ? "@" + v : ""; });

  function setErr(id, msg) { const f = $("#" + id).closest(".field"); f.classList.toggle("invalid", !!msg); const er = f.querySelector(".err"); if (er) er.textContent = msg || ""; return !msg; }
  $("#order-form").addEventListener("submit", e => {
    e.preventDefault();
    const items = Cart.get(), sub = Cart.subtotal(), del = fulfillment() === "delivery";
    let ok = true;
    ok = setErr("c-name", $("#c-name").value.trim().length < 2 ? "We need a name for the label! 🏷️" : "") && ok;
    ok = setErr("c-phone", $("#c-phone").value.replace(/\D/g, "").length !== 10 ? "Please enter a 10-digit phone number." : "") && ok;
    const dv = dateIn.value;
    ok = setErr("c-date", !dv ? "Pick your preferred date." : dv < dateIn.min ? "Sorry, no same-day orders. Choose tomorrow or later." : "") && ok;
    if (del) {
      ok = setErr("c-address", $("#c-address").value.trim().length < 5 ? "Add your street address." : "") && ok;
      ok = setErr("c-zip", !/^103\d{2}$/.test($("#c-zip").value.trim()) ? "Delivery is Staten Island only (ZIP 103xx)." : "") && ok;
    }
    if (!items.length) { toast("Your cart is empty. Add some banana bread first! 🍌"); ok = false; }
    else if (del && sub < MIN_DELIVERY) { toast(`Delivery has a $20 minimum. Add ${TMGB.money(MIN_DELIVERY - sub)} more 🍌`); ok = false; }
    if (!ok) { const bad = $(".field.invalid input, .field.invalid textarea"); if (bad) bad.focus(); return; }
    const order = {
      number: "TMGB-" + Math.floor(1000 + Math.random() * 9000), placed: new Date().toISOString(), items, subtotal: sub,
      customer: {name: $("#c-name").value.trim(), phone: $("#c-phone").value, ig: $("#c-ig").value.trim(), date: dv,
        fulfillment: del ? "delivery" : "pickup", address: del ? `${$("#c-address").value.trim()}, Staten Island, NY ${$("#c-zip").value.trim()}` : "",
        notes: $("#c-notes").value.trim()}
    };
    localStorage.setItem("tmgb_last_order", JSON.stringify(order));
    Cart.clear();
    location.href = "confirmation.html";
  });

  /* ---------- init from URL (e.g. order.html?cat=full&flavor=og) ---------- */
  const q = new URLSearchParams(location.search);
  if (q.get("cat") && TMGB.getCat(q.get("cat"))) {
    selectCat(q.get("cat"), false);
    if (q.get("line") === "gfv") { state.line = "gfv"; renderFlavors(); }
    const f = q.get("flavor");
    if (f && state.cat.mode === "single" && pool().some(x => x.id === f)) { state.flavor = f; renderFlavors(); renderSummary(); }
    setTimeout(() => $("#step-flavors").scrollIntoView({block: "start"}), 60);
  } else renderFlavors();
  renderSummary(); renderCart();
})();
