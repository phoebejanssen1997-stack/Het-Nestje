// Rendert de losse productpagina op basis van ?id= in de URL.
(function () {
  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function render() {
    const id = getParam("id");
    const product = hnGetProduct(id) || PRODUCTS[0];
    if (!product) return;

    document.title = product.name + " — Het Nestje";

    document.getElementById("pdBreadcrumbCat").textContent = product.category;
    document.getElementById("pdBreadcrumbName").textContent = product.name;
    const media = document.getElementById("pdMedia");
    if (product.image) {
      media.className = "product-detail-media";
      media.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    } else {
      media.className = "product-detail-media swatch " + product.swatch;
      media.innerHTML = "";
    }
    if (product.badge) {
      document.getElementById("pdBadge").textContent = product.badge;
      document.getElementById("pdBadge").hidden = false;
    }
    document.getElementById("pdName").textContent = product.name;
    document.getElementById("pdTagline").textContent = product.tagline;
    document.getElementById("pdPrice").textContent = hnFormatPrice(product.price);
    document.getElementById("pdDescription").textContent = product.description;
    document.getElementById("pdDetails").innerHTML = product.details.map(d => `<li>${d}</li>`).join("");
    document.getElementById("pdAddBtn").dataset.addToCart = product.id;
    document.getElementById("pdAddBtn").dataset.qtyTarget = "#pdQty";

    const qtyEl = document.getElementById("pdQty");
    document.getElementById("pdQtyDown").addEventListener("click", () => {
      qtyEl.textContent = Math.max(1, parseInt(qtyEl.textContent, 10) - 1);
    });
    document.getElementById("pdQtyUp").addEventListener("click", () => {
      qtyEl.textContent = parseInt(qtyEl.textContent, 10) + 1;
    });

    // "Ook interessant": 3 andere producten
    const related = PRODUCTS.filter(p => p.id !== product.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    hnRenderGrid(document.getElementById("pdRelated"), related);
  }

  document.addEventListener("DOMContentLoaded", render);
})();
