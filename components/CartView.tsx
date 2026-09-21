"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/ProductVisual";
import { useCart } from "@/lib/cart-context";
import { formatMoney } from "@/lib/products-client";

export function CartView() {
  const { items, subtotal, setQuantity, removeItem, clear } = useCart();

  if (!items.length) {
    return (
      <div>
        <p>Your cart is empty.</p>
        <Link href="/shop" className="btn" style={{ marginTop: "1.25rem" }}>
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="cart-lines">
        {items.map(({ product, quantity }) => (
          <div key={product.handle} className="cart-line">
            <ProductVisual product={product} />
            <div className="cart-line__info">
              <Link href={`/shop/${product.handle}`} className="product-card__name">
                {product.title}
              </Link>
              <p className="product-card__price">{formatMoney(product.price)}</p>
              <div className="cart-line__controls">
                <label>
                  Qty
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(product.handle, Number(e.target.value))
                    }
                  />
                </label>
                <button type="button" onClick={() => removeItem(product.handle)}>
                  Remove
                </button>
              </div>
            </div>
            <p className="cart-line__total">
              {formatMoney(product.price * quantity)}
            </p>
          </div>
        ))}
      </div>

      <aside className="cart-summary">
        <p className="cart-summary__label">Order summary</p>
        <div className="cart-summary__row">
          <span>Subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <p className="cart-summary__note">
          Checkout connects to Shopify once store credentials are set. Until
          then, the cart lives in this browser.
        </p>
        <p className="cart-summary__ruo">
          For research use only. Not for human consumption.
        </p>
        <button type="button" className="btn btn--block" disabled>
          Checkout
        </button>
        <button type="button" className="cart-summary__clear" onClick={clear}>
          Empty cart
        </button>
      </aside>
    </div>
  );
}
