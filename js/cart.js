// Winkelmandje: opgeslagen in localStorage, werkt zonder backend.
const HN_CART_KEY = "hn_cart_v1";
const HN_FREE_SHIPPING_FROM = 75;
const HN_SHIPPING_COST = 4.95;

const HnCart = {
  read() {
    try {
      const raw = localStorage.getItem(HN_CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },
  write(items) {
    localStorage.setItem(HN_CART_KEY, JSON.stringify(items));
    document.dispatchEvent(new CustomEvent("hn-cart-change", { detail: { items } }));
  },
  add(id, qty = 1) {
    const items = this.read();
    const line = items.find(i => i.id === id);
    if (line) {
      line.qty += qty;
    } else {
      items.push({ id, qty });
    }
    this.write(items);
  },
  setQty(id, qty) {
    let items = this.read();
    if (qty <= 0) {
      items = items.filter(i => i.id !== id);
    } else {
      const line = items.find(i => i.id === id);
      if (line) line.qty = qty;
    }
    this.write(items);
  },
  remove(id) {
    this.write(this.read().filter(i => i.id !== id));
  },
  clear() {
    this.write([]);
  },
  count() {
    return this.read().reduce((sum, i) => sum + i.qty, 0);
  },
  lines() {
    return this.read()
      .map(i => ({ ...i, product: hnGetProduct(i.id) }))
      .filter(l => l.product);
  },
  subtotal() {
    return this.lines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
  },
  shipping() {
    const sub = this.subtotal();
    return sub === 0 || sub >= HN_FREE_SHIPPING_FROM ? 0 : HN_SHIPPING_COST;
  },
  total() {
    return this.subtotal() + this.shipping();
  }
};

// ---------- Gedeelde UI: cart-badge, drawer, toast (op elke pagina) ----------
(function () {
  function injectDrawer() {
    if (document.getElementById("hnCartDrawer")) return;
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="cart-scrim" id="hnCartScrim"></div>
      <aside class="cart-drawer" id="hnCartDrawer" aria-hidden="true">
        <div class="cart-drawer-head">
          <h2>Jouw winkelmand</h2>
          <button class="icon-btn" id="hnCartClose" aria-label="Sluiten">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
          </button>
        </div>
        <div class="cart-ship-bar" id="hnShipBar">
          <div class="cart-ship-track"><div class="cart-ship-fill" id="hnShipFill"></div></div>
          <p id="hnShipMsg"></p>
        </div>
        <div class="cart-drawer-body" id="hnCartBody"></div>
        <div class="cart-drawer-foot" id="hnCartFoot"></div>
      </aside>
      <div class="toast" id="hnToast"></div>
    `;
    document.body.appendChild(wrap);
    document.getElementById("hnCartClose").addEventListener("click", closeDrawer);
    document.getElementById("hnCartScrim").addEventListener("click", closeDrawer);
  }

  function openDrawer() {
    renderDrawer();
    document.getElementById("hnCartDrawer").classList.add("open");
    document.getElementById("hnCartScrim").classList.add("open");
    document.getElementById("hnCartDrawer").setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
  function closeDrawer() {
    document.getElementById("hnCartDrawer").classList.remove("open");
    document.getElementById("hnCartScrim").classList.remove("open");
    document.getElementById("hnCartDrawer").setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function renderDrawer() {
    const body = document.getElementById("hnCartBody");
    const foot = document.getElementById("hnCartFoot");
    const lines = HnCart.lines();

    if (!lines.length) {
      body.innerHTML = `<div class="cart-empty">
        <p>Je mand is nog leeg.</p>
        <a href="${hnPath("shop.html")}" class="btn btn-primary">Bekijk de collectie</a>
      </div>`;
      foot.innerHTML = "";
    } else {
      body.innerHTML = lines.map(l => cartLineHTML(l)).join("");
      body.querySelectorAll("[data-step]").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          const dir = btn.dataset.step === "up" ? 1 : -1;
          const line = HnCart.lines().find(l => l.id === id);
          HnCart.setQty(id, line.qty + dir);
        });
      });
      body.querySelectorAll("[data-remove]").forEach(btn => {
        btn.addEventListener("click", () => HnCart.remove(btn.dataset.id));
      });
      foot.innerHTML = `
        <div class="cart-subtotal"><span>Subtotaal</span><strong>${hnFormatPrice(HnCart.subtotal())}</strong></div>
        <a href="${hnPath("checkout.html")}" class="btn btn-primary cart-checkout-btn">Naar de kassa →</a>
        <a href="${hnPath("cart.html")}" class="cart-view-link">Bekijk winkelmand</a>
      `;
    }

    const sub = HnCart.subtotal();
    const remaining = HN_FREE_SHIPPING_FROM - sub;
    const pct = Math.min(100, (sub / HN_FREE_SHIPPING_FROM) * 100);
    document.getElementById("hnShipFill").style.width = pct + "%";
    document.getElementById("hnShipMsg").innerHTML = remaining > 0
      ? `Nog <strong>${hnFormatPrice(remaining)}</strong> tot gratis verzending`
      : `🎉 Je hebt gratis verzending!`;
  }

  function cartLineHTML(l) {
    return `
      <div class="cart-line" data-line="${l.id}">
        <div class="cart-line-media ${l.product.swatch}"></div>
        <div class="cart-line-body">
          <p class="cart-line-name">${l.product.name}</p>
          <p class="cart-line-price">${hnFormatPrice(l.product.price)}</p>
          <div class="qty-stepper">
            <button data-step="down" data-id="${l.id}" aria-label="Minder">−</button>
            <span>${l.qty}</span>
            <button data-step="up" data-id="${l.id}" aria-label="Meer">+</button>
          </div>
        </div>
        <button class="cart-line-remove" data-remove data-id="${l.id}" aria-label="Verwijderen">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>
        </button>
      </div>`;
  }

  function updateBadges() {
    const n = HnCart.count();
    document.querySelectorAll(".cart-count").forEach(el => {
      el.textContent = n;
      el.classList.remove("bump");
      void el.offsetWidth;
      el.classList.add("bump");
    });
  }

  function showToast(product) {
    const toast = document.getElementById("hnToast");
    toast.innerHTML = `<div class="toast-media ${product.swatch}"></div>
      <div><strong>Toegevoegd aan mand</strong><span>${product.name}</span></div>`;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function hnPath(file) {
    // werkt zowel vanaf de root als vanuit eventuele subpaden
    return file;
  }

  function addToCart(id, qty, triggerBtn) {
    HnCart.add(id, qty || 1);
    const product = hnGetProduct(id);
    if (product) showToast(product);
    openDrawer();
    if (triggerBtn) {
      triggerBtn.classList.remove("pop");
      void triggerBtn.offsetWidth;
      triggerBtn.classList.add("pop");
    }
  }

  // Event delegation: vangt ook knoppen die later dynamisch worden toegevoegd (productgrids, etc.)
  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-cart-open]");
    if (openBtn) { e.preventDefault(); openDrawer(); return; }
    const addBtn = e.target.closest("[data-add-to-cart]");
    if (addBtn) {
      e.preventDefault();
      const id = addBtn.dataset.addToCart;
      const qtyInput = addBtn.dataset.qtyTarget ? document.querySelector(addBtn.dataset.qtyTarget) : null;
      const qty = qtyInput ? parseInt(qtyInput.textContent, 10) || 1 : 1;
      addToCart(id, qty, addBtn);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    injectDrawer();
    updateBadges();
  });

  document.addEventListener("hn-cart-change", () => {
    updateBadges();
    if (document.getElementById("hnCartDrawer")?.classList.contains("open")) renderDrawer();
  });

  window.HnOpenCart = openDrawer;
  window.HnAddToCart = addToCart;
})();
