"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCart } from "@/lib/cart-context";

const nav = [
  { href: "/collections/recovery", label: "Recovery" },
  { href: "/collections/metabolic", label: "Metabolic" },
  { href: "/collections/growth", label: "Growth" },
  { href: "/collections/cognitive", label: "Cognitive" },
  { href: "/collections/longevity", label: "Longevity" },
  { href: "/collections/blends", label: "Blends" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    setSearchOpen(false);
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-promo">
        Research use only · Not for human consumption · HPLC-verified lots
      </div>
      <div className="header-bar">
        <button
          type="button"
          className="header-menu"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
        >
          Menu
        </button>

        <Link href="/" className="header-logo">
          AminoNex
        </Link>

        <nav className="header-nav" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" onClick={() => setSearchOpen((v) => !v)}>
            Search
          </button>
          <Link href="/about">About</Link>
          <Link href="/cart">Cart{count > 0 ? ` (${count})` : ""}</Link>
        </div>
      </div>

      {menuOpen ? (
        <nav className="header-drawer">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={isActive(item.href) ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/shop" onClick={() => setMenuOpen(false)}>
            Shop all
          </Link>
          <Link href="/legal" onClick={() => setMenuOpen(false)}>
            Legal
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Cart{count > 0 ? ` (${count})` : ""}
          </Link>
        </nav>
      ) : null}

      {searchOpen ? (
        <form className="header-search" onSubmit={onSearch}>
          <label className="sr-only" htmlFor="site-search">
            Search
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research peptides"
            autoFocus
          />
        </form>
      ) : null}
    </header>
  );
}
