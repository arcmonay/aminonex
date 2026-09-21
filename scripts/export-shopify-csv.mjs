import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(readFileSync(join(root, "data", "catalog.json"), "utf8"));
const imageBase =
  process.env.SHOPIFY_IMAGE_BASE_URL ||
  "https://raw.githubusercontent.com/arcmonay/aminonex/main/public";
const esc = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

const header = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Alt Text",
  "Status",
].join(",");

const rows = catalog.products.map((p) => {
  const imagePath = p.image || `/products/${p.handle}.svg`;
  const collectionTitle =
    catalog.collections.find((c) => c.handle === p.collection)?.title ?? "Research";
  const body = [
    `<p>${p.description}</p>`,
    "<ul>",
    `<li>Form: ${p.material}</li>`,
    `<li>Amount: ${p.size}</li>`,
    `<li>${p.highlight}</li>`,
    `<li>Grade: ${p.finish}</li>`,
    "</ul>",
    "<p><strong>For research use only. Not for human consumption.</strong></p>",
  ].join("");

  return [
    p.handle,
    p.title,
    body,
    "AminoNex",
    collectionTitle,
    p.tags.join(", "),
    "TRUE",
    "Title",
    "Default Title",
    p.sku,
    String(Math.round((p.weightLbs || 0.05) * 454)),
    "shopify",
    p.inStock ? "25" : "0",
    "deny",
    "manual",
    Number(p.price).toFixed(2),
    p.compareAtPrice ? Number(p.compareAtPrice).toFixed(2) : "",
    "TRUE",
    "TRUE",
    `${imageBase}${imagePath}`,
    p.title,
    "active",
  ]
    .map(esc)
    .join(",");
});

writeFileSync(join(root, "data", "shopify-products.csv"), [header, ...rows].join("\n"));
console.log(`Wrote ${rows.length} Shopify product rows with images.`);
