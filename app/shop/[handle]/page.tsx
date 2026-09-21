import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductVisual } from "@/components/ProductVisual";
import {
  formatMoney,
  getCollection,
  getProduct,
  getProducts,
  getProductsByCollection,
} from "@/lib/products";

type Params = Promise<{ handle: string }>;

export function generateStaticParams() {
  return getProducts().map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) return { title: "Product" };
  return { title: product.title, description: product.description };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { handle } = await params;
  const product = getProduct(handle);
  if (!product) notFound();

  const collection = getCollection(product.collection);
  const related = getProductsByCollection(product.collection)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <article className="pdp">
        <div className="pdp-media">
          <ProductVisual
            product={product}
            priority
            className="!aspect-[4/5] md:!min-h-[34rem]"
          />
        </div>
        <div className="pdp-info">
          <p className="pdp-collection">
            {collection ? (
              <Link href={`/collections/${collection.handle}`}>
                {collection.title}
              </Link>
            ) : (
              "Research"
            )}
          </p>
          <h1>{product.title}</h1>
          <p className="pdp-price">
            {formatMoney(product.price)}
            {product.compareAtPrice ? (
              <span className="product-card__compare">
                {formatMoney(product.compareAtPrice)}
              </span>
            ) : null}
          </p>
          <p className="pdp-copy">{product.description}</p>
          <ul className="pdp-specs">
            {[
              ["Form", product.material],
              ["Amount", product.size],
              ["Grade", product.finish],
              ["Detail", product.highlight],
              ["SKU", product.sku],
            ].map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
          <p className="pdp-ruo">
            For research use only. Not for human or veterinary consumption,
            diagnosis, treatment, or prevention of any disease.
          </p>
          <AddToCartButton handle={product.handle} />
        </div>
      </article>
      {related.length ? (
        <section className="section">
          <div className="section__head">
            <h2 className="section__title">
              More from {collection?.title ?? "this collection"}
            </h2>
          </div>
          <ProductGrid products={related} />
        </section>
      ) : null}
    </>
  );
}
