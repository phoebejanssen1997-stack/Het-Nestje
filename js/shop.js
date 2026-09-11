// Rendert productgrids op basis van data-shop containers.
function hnProductCardHTML(p) {
  return `
    <article class="product-card">
      <a href="product.html?id=${p.id}" class="product-media-link">
        <div class="product-media">
          <div class="swatch ${p.swatch}"></div>
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
          <button class="quick-add" data-add-to-cart="${p.id}" aria-label="Snel toevoegen aan mand">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L21 9H6"/><circle cx="10" cy="21" r="1"/><circle cx="17" cy="21" r="1"/></svg>
          </button>
        </div>
      </a>
      <div class="product-body">
        <a href="product.html?id=${p.id}" class="product-title-link"><h3>${p.name}</h3></a>
        <p>${p.tagline}</p>
        <div class="product-foot">
          <span class="price">${hnFormatPrice(p.price)}</span>
          <button class="add-btn" data-add-to-cart="${p.id}">+ Mand</button>
        </div>
      </div>
    </article>`;
}

function hnRenderGrid(container, list) {
  container.innerHTML = list.map(hnProductCardHTML).join("");
}

function hnRenderShopGrids() {
  document.querySelectorAll("[data-shop]").forEach(container => {
    const mode = container.dataset.shop;
    const category = container.dataset.category;
    let list = PRODUCTS;
    if (category) list = list.filter(p => p.category === category);
    if (mode === "featured") list = list.slice(0, 4);
    hnRenderGrid(container, list);
  });

  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      const grid = document.querySelector("[data-shop='all']");
      const list = cat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
      hnRenderGrid(grid, list);
    });
  });
}

document.addEventListener("DOMContentLoaded", hnRenderShopGrids);
