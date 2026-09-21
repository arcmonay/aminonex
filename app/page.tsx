import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import {
  getCollections,
  getFeaturedProducts,
  getProducts,
} from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts(8);
  const collections = getCollections();
  const total = getProducts().length;

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <Image
            src="/hero.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="hero__veil" aria-hidden />
        <div className="hero__copy">
          <h1 className="hero__brand">AminoNex</h1>
          <p className="hero__lede">
            Research peptides, next-level purity. {total} HPLC-verified
            compounds for qualified laboratory protocols — not for human use.
          </p>
          <div className="hero__ctas">
            <Link href="/shop" className="btn btn--light">
              Shop catalog
            </Link>
            <Link href="/legal" className="btn">
              Research policy
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <p className="section__eyebrow">Collections</p>
          <h2 className="section__title">Shop by research focus</h2>
          <p className="section__lede">
            Recovery, metabolic, growth, cognitive, longevity, and pre-built
            blends — organized for assay planning.
          </p>
        </div>
        <div className="collection-strip">
          {collections.map((c) => (
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
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section__head">
          <p className="section__eyebrow">Featured</p>
          <h2 className="section__title">Lab favorites</h2>
          <p className="section__lede">
            High-demand research SKUs with lot-matched documentation.
          </p>
        </div>
        <ProductGrid products={featured} />
        <div style={{ marginTop: "2rem" }}>
          <Link href="/shop" className="btn">
            Shop all peptides
          </Link>
        </div>
      </section>

      <section className="trust">
        <div className="trust__inner">
          <h2 className="section__title">Why AminoNex</h2>
          <div className="trust__grid">
            <div className="trust__item">
              <h3>Purity-first sourcing</h3>
              <p>
                Research-grade material with identity and purity specs listed
                on every vial page.
              </p>
            </div>
            <div className="trust__item">
              <h3>Shopify-ready catalog</h3>
              <p>
                Import data/shopify-products.csv when you connect a store.
                Until then, cart runs locally.
              </p>
            </div>
            <div className="trust__item">
              <h3>Clear research framing</h3>
              <p>
                Every page states research-use-only terms. No consumer health
                claims.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
