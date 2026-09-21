import { Suspense } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { ShopFilters } from "@/components/ShopFilters";
import {
  getCollections,
  getProducts,
  getProductsByCollection,
  searchProducts,
} from "@/lib/products";

export const metadata = {
  title: "Shop",
  description: "Browse AminoNex research peptides by collection or search.",
};

type Props = {
  searchParams: Promise<{ collection?: string; q?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { collection, q } = await searchParams;
  const collections = getCollections();

  let products = q ? searchProducts(q) : getProducts();
  if (collection && collection !== "all") {
    const inCollection = new Set(
      getProductsByCollection(collection).map((p) => p.id),
    );
    products = products.filter((p) => inCollection.has(p.id));
  }

  return (
    <div className="plp">
      <aside className="plp-nav">
        <Suspense fallback={null}>
          <ShopFilters collections={collections} />
        </Suspense>
      </aside>
      <div>
        <h1 className="plp-title">Research catalog</h1>
        <p className="plp-desc">
          Lyophilized research peptides for laboratory use. Filter by focus area
          or search by compound name.
        </p>
        <p className="plp-count">
          {products.length} items
          {collection
            ? ` · ${collections.find((c) => c.handle === collection)?.title ?? collection}`
            : ""}
          {q ? ` · “${q}”` : ""}
        </p>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
