import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AminoNex",
    template: "%s · AminoNex",
  },
  description:
    "AminoNex — research peptides with lot-level purity documentation. For laboratory use only.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full antialiased">
        <CartProvider>
          <div className="site">
            <Header />
            <main className="site-main">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
