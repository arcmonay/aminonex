import Image from "next/image";
import type { Product } from "@/lib/types";

type Props = {
  product: Product;
  className?: string;
  priority?: boolean;
};

export function ProductVisual({
  product,
  className = "",
  priority = false,
}: Props) {
  const src = product.image || `/products/${product.handle}.svg`;

  return (
    <div
      className={`relative overflow-hidden bg-[var(--surface)] aspect-square ${className}`.trim()}
    >
      <Image
        src={src}
        alt={product.title}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
