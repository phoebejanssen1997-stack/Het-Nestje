// Volledige winkelmandpagina (los van de drawer).
(function () {
  function render() {
    const lines = HnCart.lines();
    const body = document.getElementById("cpBody");
    const empty = document.getElementById("cpEmpty");
    const summary = document.getElementById("cpSummary");

    if (!lines.length) {
      body.innerHTML = "";
      empty.hidden = false;
      summary.hidden = true;
      return;
    }
    empty.hidden = true;
    summary.hidden = false;

    body.innerHTML = lines.map(l => `
      <div class="cp-line">
        <div class="cp-line-media ${l.product.swatch}"></div>
        <div class="cp-line-body">
          <h3><a href="product.html?id=${l.id}">${l.product.name}</a></h3>
          <p>${l.product.tagline}</p>
          <div class="qty-stepper">
            <button data-step="down" data-id="${l.id}" aria-label="Minder">−</button>
            <span>${l.qty}</span>
            <button data-step="up" data-id="${l.id}" aria-label="Meer">+</button>
          </div>
        </div>
        <div class="cp-line-price">
          <strong>${hnFormatPrice(l.product.price * l.qty)}</strong>
          <button class="cart-line-remove" data-remove data-id="${l.id}" aria-label="Verwijderen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>
          </button>
        </div>
      </div>`).join("");

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

    document.getElementById("cpSubtotal").textContent = hnFormatPrice(HnCart.subtotal());
    const shipping = HnCart.shipping();
    document.getElementById("cpShipping").textContent = shipping === 0 ? "Gratis" : hnFormatPrice(shipping);
    document.getElementById("cpTotal").textContent = hnFormatPrice(HnCart.total());
  }

  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("hn-cart-change", render);
})();
