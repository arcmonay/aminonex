import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import {
  getCollection,
  getCollections,
  getProductsByCollection,
} from "@/lib/products";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getCollections().map((c) => ({ slug: c.handle }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection" };
  return { title: collection.title, description: collection.description };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);
  const others = getCollections().filter((c) => c.handle !== slug);

  return (
    <div className="section">
      <div className="section__head">
        <p className="section__eyebrow">Collection</p>
        <h1 className="section__title">{collection.title}</h1>
        <p className="section__lede">{collection.description}</p>
        <p className="plp-count" style={{ marginTop: "0.75rem" }}>
          {products.length} items
        </p>
      </div>
      <ProductGrid products={products} />
      <div style={{ marginTop: "2.5rem" }}>
        <p className="section__eyebrow">Other collections</p>
        <div className="collection-strip" style={{ marginTop: "0.75rem" }}>
          {others.map((c) => (
            <Link
              key={c.handle}
              href={`/collections/${c.handle}`}
              className="collection-tile"
            >
              <strong>{c.title}</strong>
              <span>{c.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
