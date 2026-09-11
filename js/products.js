// Productcatalogus voor Het Nestje — losse artikelen, geen configurator.
const PRODUCTS = [
  {
    id: "streep-terracotta",
    name: "Kussenhoes Streep Terracotta",
    category: "Kussens",
    price: 39,
    swatch: "swatch-stripe",
    tagline: "Bouclé, rood-crème streep",
    badge: "Bestseller",
    description: "Onze meest gekozen kussenhoes: een rood-crème streep in bouclé, geïnspireerd op een gestreepte baldakijn boven een echte kinderkamer. Een rustige basis met precies één gedurfd accent.",
    details: ["100% bouclé katoen", "Verborgen ritssluiting", "60 × 40 cm — vulling niet inbegrepen", "Machinewasbaar op 30°C"]
  },
  {
    id: "ruit-zand",
    name: "Kussenhoes Ruit Zand",
    category: "Kussens",
    price: 39,
    swatch: "swatch-gingham",
    tagline: "Corduroy, fijne ruit zand-roest",
    description: "Een fijne ruit in warme zand- en roesttinten, geweven in stevige corduroy. Voelt zacht aan en oogt verzorgd in elke hoek van huis.",
    details: ["100% corduroy katoen", "Verborgen ritssluiting", "50 × 50 cm — vulling niet inbegrepen", "Machinewasbaar op 30°C"]
  },
  {
    id: "wafel-oker-plaid",
    name: "Plaid Wafel Oker",
    category: "Plaids & tafeltextiel",
    price: 89,
    swatch: "swatch-waffle",
    tagline: "Wafelkatoen, okergeel",
    badge: "Nieuw",
    description: "Een royale plaid in okergeel wafelkatoen — luchtig genoeg voor op de bank in de zomer, warm genoeg voor onder je kin in de winter.",
    details: ["100% wafelkatoen", "130 × 170 cm", "Machinewasbaar op 30°C", "Handgemaakt in kleine oplage"]
  },
  {
    id: "rib-karamel-loper",
    name: "Tafelloper Rib Karamel",
    category: "Plaids & tafeltextiel",
    price: 45,
    swatch: "swatch-cord",
    tagline: "Corduroy, egaal karamel",
    description: "Een egale, karamelkleurige tafelloper in corduroy die elke tafel meteen wat warmer maakt. Mooi los, mooier nog met onze kussenhoezen erbij.",
    details: ["100% corduroy katoen", "40 × 200 cm", "Handwas aanbevolen", "Handgemaakt in kleine oplage"]
  },
  {
    id: "mandjeshoes-blauw",
    name: "Mandjeshoes Blauw",
    category: "Opbergen",
    price: 59,
    swatch: "swatch-blue",
    tagline: "Linnen, wolkjesblauw",
    description: "Een zachte hoes voor je opbergmand, in een rustig wolkjesblauw linnen. Verstopt rommel, laat je interieur juist spreken.",
    details: ["100% linnen", "Past manden van 30–40 cm doorsnee", "Elastische zoom", "Machinewasbaar op 30°C"]
  },
  {
    id: "effen-creme-kussen",
    name: "Kussenhoes Effen Crème",
    category: "Kussens",
    price: 35,
    swatch: "swatch-plain",
    tagline: "Linnenmix, effen crème",
    description: "De rustige basis onder onze prints: een effen kussenhoes in een natuurlijke linnenmix, die zich moeiteloos laat combineren.",
    details: ["55% linnen / 45% katoen", "Verborgen ritssluiting", "45 × 45 cm — vulling niet inbegrepen", "Machinewasbaar op 30°C"]
  },
  {
    id: "duo-kussenset",
    name: "Sierkussen Duo Terracotta & Oker",
    category: "Kussens",
    price: 49,
    swatch: "swatch-duo",
    tagline: "Set van 2, streep + wafel",
    badge: "Set",
    description: "Twee kussenhoezen die voor elkaar gemaakt zijn: streep terracotta en wafel oker, samen op de bank net dat beetje meer.",
    details: ["Set van 2 hoezen", "Materiaalmix bouclé & wafelkatoen", "40 × 40 cm — vulling niet inbegrepen", "Machinewasbaar op 30°C"]
  },
  {
    id: "newborn-set-seersucker-blauw-mint",
    name: "Hoes Newborn Set Ruit Blauw-Mint",
    category: "Newborn set hoezen",
    price: 79,
    image: "assets/images/newborn-set-seersucker-blauw-mint.png",
    tagline: "Seersucker, ruit blauw-mint",
    badge: "Nieuw",
    description: "Een frisse ruit in blauw en mint, geweven in licht gekreukt seersucker. Deze hoes vervangt de standaard bekleding van de Stokke Tripp Trapp Newborn Set en geeft 'm meteen een plek in je woonkamer in plaats van alleen de kinderkamer.",
    details: ["100% seersucker katoen", "Past op de Stokke Tripp Trapp Newborn Set", "Eenvoudig los te ritsen voor wasbeurt", "Machinewasbaar op 30°C"]
  },
  {
    id: "newborn-set-teddy-appeltjes",
    name: "Hoes Newborn Set Appeltjes",
    category: "Newborn set hoezen",
    price: 79,
    image: "assets/images/newborn-set-teddy-appeltjes.png",
    tagline: "Teddystof, appeltjesprint crème",
    description: "Een speelse appeltjesprint op een crèmekleurige teddystof — zacht tegen de huid en net dat beetje vrolijker dan een effen hoes. Vervangt de standaard bekleding van de Stokke Tripp Trapp Newborn Set.",
    details: ["100% teddy katoen", "Past op de Stokke Tripp Trapp Newborn Set", "Eenvoudig los te ritsen voor wasbeurt", "Machinewasbaar op 30°C"]
  },
  {
    id: "cadeauset-het-nestje",
    name: "Cadeauset 'Het Nestje'",
    category: "Cadeausets",
    price: 120,
    swatch: "swatch-gift",
    tagline: "3-delig, inclusief cadeauverpakking",
    badge: "Cadeau",
    description: "Onze mooiste combinatie in één cadeauverpakking: een kussenhoes, tafelloper en mandjeshoes, samengesteld rond één kleurenpalet.",
    details: ["3-delig: kussenhoes, tafelloper, mandjeshoes", "Inclusief cadeaudoos met lint", "Handgemaakt in kleine oplage", "Machinewasbaar op 30°C"]
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
