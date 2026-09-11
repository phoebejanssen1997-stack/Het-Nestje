// Productcatalogus voor Het Nestje — losse artikelen, geen configurator.
const PRODUCTS = [
  {
    id: "newborn-set-seersucker-blauw-mint",
    name: "Hoes Newborn Set Ruit Blauw-Mint",
    category: "Hoezen newborn set",
    price: 79,
    image: "assets/images/newborn-set-seersucker-blauw-mint.jpeg",
    tagline: "Seersucker, ruit blauw-mint",
    badge: "Nieuw",
    description: "Een frisse ruit in blauw en mint, geweven in licht gekreukt seersucker. Deze hoes vervangt de standaard bekleding van de Stokke Tripp Trapp Newborn Set en geeft 'm meteen een plek in je woonkamer in plaats van alleen de kinderkamer.",
    details: ["100% seersucker katoen", "Past op de Stokke Tripp Trapp Newborn Set", "Eenvoudig los te ritsen voor wasbeurt", "Machinewasbaar op 30°C"]
  },
  {
    id: "newborn-set-teddy-appeltjes",
    name: "Hoes Newborn Set Appeltjes",
    category: "Hoezen newborn set",
    price: 79,
    image: "assets/images/newborn-set-teddy-appeltjes.png",
    tagline: "Teddystof, appeltjesprint crème",
    badge: "Nieuw",
    description: "Een speelse appeltjesprint op een crèmekleurige teddystof — zacht tegen de huid en net dat beetje vrolijker dan een effen hoes. Vervangt de standaard bekleding van de Stokke Tripp Trapp Newborn Set.",
    details: ["100% teddy katoen", "Past op de Stokke Tripp Trapp Newborn Set", "Eenvoudig los te ritsen voor wasbeurt", "Machinewasbaar op 30°C"]
  },
  {
    id: "newborn-set-jungle-tijger",
    name: "Hoes Newborn Set Jungle Tijger",
    category: "Hoezen newborn set",
    price: 79,
    image: "assets/images/newborn-set-jungle-tijger.jpeg",
    tagline: "Katoen, junglenprint met tijgertjes",
    badge: "Nieuw",
    description: "Palmbomen en speelse tijgertjes in olijfgroen en oker op een crèmekleurige basis — een avontuurlijke print voor wie iets meer statement wil dan een effen hoes. Vervangt de standaard bekleding van de Stokke Tripp Trapp Newborn Set.",
    details: ["100% katoen", "Past op de Stokke Tripp Trapp Newborn Set", "Eenvoudig los te ritsen voor wasbeurt", "Machinewasbaar op 30°C"]
  }
];

function hnFormatPrice(amount) {
  return "€" + amount.toFixed(2).replace(".", ",").replace(/,00$/, "");
}

function hnGetProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}

function hnMediaHTML(product, cls) {
  return product.image
    ? `<div class="${cls}"><img src="${product.image}" alt="${product.name}"></div>`
    : `<div class="${cls} ${product.swatch}"></div>`;
}
