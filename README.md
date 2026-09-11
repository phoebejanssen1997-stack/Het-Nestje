# Het Nestje — webshop (basis)

Een statische basis voor een webshop die hoezen verkoopt voor de Stokke Tripp
Trapp Newborn Set. Puur HTML/CSS/JS, geen build-stap nodig — open `index.html`
gewoon in de browser, of start een lokale server (zie hieronder).

## Structuur

```
het-nestje/
├── index.html          alle pagina-inhoud en structuur
├── css/
│   └── style.css        alle styling (design tokens bovenaan als CSS variabelen)
├── js/
│   └── main.js          mobiel menu + dropdown-gedrag
├── assets/
│   └── images/          leeg — hier komen straks echte productfoto's
└── README.md            dit bestand
```

## Lokaal bekijken

Geen installatie nodig voor de basis, maar sommige browsers blokkeren lokale
`fetch`/font-requests als je het bestand direct opent. Start daarom liever een
simpel serverjes vanuit deze map:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Wat is er nog placeholder?

- **Merknaam "Het Nestje"** — verzin ik als voorbeeld, vervang zodra je een
  echte naam hebt (kom dit overal tegen: `<title>`, `.logo`, footer, e-mail).
- **Productafbeeldingen** — er zijn nog geen echte foto's. In plaats daarvan
  gebruiken de productkaarten en banners CSS-patronen (`.swatch-stripe`,
  `.swatch-gingham`, `.swatch-waffle`, `.swatch-cord` in `style.css`) die de
  stofstructuur nabootsen. Zodra je foto's hebt: zet ze in
  `assets/images/` en vervang de `<div class="swatch ...">` door een
  `<img src="assets/images/....jpg" alt="...">`.
- **Prijzen, e-mailadres, social links** — allemaal fictief, staan verspreid
  door `index.html` (zoek op `€79`, `hallo@hetnestje.nl`, `href="#"`).
- **Winkelwagen** — de knoppen ("+ Mand") en het mandje-icoon zijn nu puur
  visueel, er zit geen echte logica achter. Dat is de volgende stap.

## Herkomst van de opbouw

De pagina-hiërarchie (aankondigingsbalk → volledige-breedte hero →
productrij → categorie-tegels → twee afwisselende verhaal-banners →
merk-tegels → donker vakmanschap-statement → nieuwsbrief → footer) is
gebaseerd op de structuur van donsje.com, geschaald naar een kleiner
assortiment. De kleuren, typografie (Fraunces + Archivo) en
stof-patronen zijn gebaseerd op de aangeleverde referentiefoto's
(ochre/lichtblauwe kinderkamer, rood-witte streep, geblokt kleedje).

## Logische vervolgstappen in Claude Code

1. Vervang de CSS-swatch-patronen door echte productfoto's.
2. Voeg een winkelwagen-store toe (bijv. simpele state in `main.js`, of
   koppel aan een echt platform zoals Shopify/Snipcart/Stripe Checkout).
3. Splits `index.html` op in losse productpagina's als het assortiment
   groeit (`producten/streep-terracotta.html`, etc.) of migreer naar een
   framework (Astro/Next.js) als je meer dynamiek nodig hebt.
4. Vervang alle placeholder-teksten (zoek in de repo naar "placeholder",
   "€79", "hallo@hetnestje.nl", `href="#"`).
5. Voeg een `favicon` en `meta`-tags toe voor social sharing (Open Graph).
