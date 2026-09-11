// Checkout: toont ordersamenvatting en simuleert het plaatsen van een bestelling.
(function () {
  function renderSummary() {
    const lines = HnCart.lines();
    const list = document.getElementById("coLines");
    const empty = document.getElementById("coEmpty");
    const formSection = document.getElementById("coFormSection");

    if (!lines.length) {
      empty.hidden = false;
      formSection.hidden = true;
      list.innerHTML = "";
      return;
    }
    empty.hidden = true;
    formSection.hidden = false;

    list.innerHTML = lines.map(l => `
      <div class="co-line">
        ${hnMediaHTML(l.product, "co-line-media")}
        <div class="co-line-body">
          <p>${l.product.name}</p>
          <span>${l.qty} × ${hnFormatPrice(l.product.price)}</span>
        </div>
        <strong>${hnFormatPrice(l.product.price * l.qty)}</strong>
      </div>`).join("");

    document.getElementById("coSubtotal").textContent = hnFormatPrice(HnCart.subtotal());
    const shipping = HnCart.shipping();
    document.getElementById("coShipping").textContent = shipping === 0 ? "Gratis" : hnFormatPrice(shipping);
    document.getElementById("coTotal").textContent = hnFormatPrice(HnCart.total());
    document.getElementById("coSubmitTotal").textContent = hnFormatPrice(HnCart.total());
  }

  function handleSubmit(e) {
    e.preventDefault();
    const orderNumber = "HN-" + Math.floor(10000 + Math.random() * 89999);
    document.getElementById("coOrderNumber").textContent = orderNumber;
    document.getElementById("coOrderTotal").textContent = hnFormatPrice(HnCart.total());
    HnCart.clear();
    document.getElementById("coFormSection").hidden = true;
    document.getElementById("coEmpty").hidden = true;
    document.getElementById("coConfirmation").hidden = false;
    document.getElementById("coConfirmation").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderSummary();
    document.getElementById("coForm").addEventListener("submit", handleSubmit);
  });
  document.addEventListener("hn-cart-change", renderSummary);
})();
