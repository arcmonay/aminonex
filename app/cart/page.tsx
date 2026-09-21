import { CartView } from "@/components/CartView";

export const metadata = {
  title: "Cart",
  description: "Your AminoNex research cart.",
};

export default function CartPage() {
  return (
    <div className="cart-page">
      <h1>Cart</h1>
      <CartView />
    </div>
  );
}
