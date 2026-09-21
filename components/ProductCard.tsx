import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { formatMoney } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.handle}`} className="product-card">
      <ProductVisual product={product} />
      <div className="product-card__body">
        <p className="product-card__sku">{product.sku}</p>
        <p className="product-card__name">{product.title}</p>
        <p className="product-card__meta">{product.size} · {product.finish}</p>
        <p className="product-card__price">
          {formatMoney(product.price)}
          {product.compareAtPrice ? (
            <span className="product-card__compare">
              {formatMoney(product.compareAtPrice)}
            </span>
          ) : null}
        </p>
      </div>
    </Link>
  );
}
