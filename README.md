# AminoNex

Research peptides storefront — Next.js + Tailwind, Shopify-ready.

## Local

```bash
npm install
npm run dev
```

## Shopify

1. Copy `.env.example` → `.env.local` and set:
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_STOREFRONT_TOKEN`
2. Until those are set, the site runs on `data/catalog.json` + browser cart.
3. Export Admin import CSV:

```bash
npm run catalog:csv
```

Writes `data/shopify-products.csv` (Image Src points at
`https://raw.githubusercontent.com/arcmonay/aminonex/main/public` + product image path).

## Stack

- Next.js App Router
- Local catalog + `aminonex-cart` localStorage
- Research-use-only framing on PDP, cart, footer, and `/legal`
