import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-foot">
      <div className="site-foot__inner">
        <div className="site-foot__newsletter">
          <div>
            <h2>AminoNex</h2>
            <p>
              Research peptides with lot-level purity docs. For qualified
              laboratory use only.
            </p>
          </div>
          <Link href="/shop" className="btn btn--light">
            Browse the catalog
          </Link>
        </div>

        <div className="site-foot__grid">
          <div>
            <p>Shop</p>
            <Link href="/shop">All peptides</Link>
            <Link href="/collections/recovery">Recovery</Link>
            <Link href="/collections/metabolic">Metabolic</Link>
            <Link href="/collections/growth">Growth factors</Link>
          </div>
          <div>
            <p>Explore</p>
            <Link href="/collections/cognitive">Cognitive</Link>
            <Link href="/collections/longevity">Longevity</Link>
            <Link href="/collections/blends">Research blends</Link>
            <Link href="/about">About AminoNex</Link>
          </div>
          <div>
            <p>Compliance</p>
            <Link href="/legal">Research use only</Link>
            <Link href="/cart">Cart</Link>
            <span>Shopify CSV · data/shopify-products.csv</span>
          </div>
          <div>
            <p>Region</p>
            <span>United States</span>
            <span>English</span>
          </div>
        </div>

        <p className="site-foot__legal">
          Products are sold strictly for laboratory research. Not for human or
          veterinary use, diagnosis, treatment, or prevention of any disease.
        </p>
        <p className="site-foot__copy">© 2025 AminoNex</p>
      </div>
    </footer>
  );
}
