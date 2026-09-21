"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { Collection } from "@/lib/types";

export function ShopFilters({ collections }: { collections: Collection[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("collection") ?? "all";
  const q = params.get("q") ?? "";

  function go(collection: string) {
    const next = new URLSearchParams();
    if (collection !== "all") next.set("collection", collection);
    if (q) next.set("q", q);
    const qs = next.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  }

  return (
    <div className="shop-filters">
      <p className="shop-filters__label">Collections</p>
      <button
        type="button"
        className={active === "all" ? "is-active" : ""}
        onClick={() => go("all")}
      >
        All
      </button>
      {collections.map((c) => (
        <button
          key={c.handle}
          type="button"
          className={active === c.handle ? "is-active" : ""}
          onClick={() => go(c.handle)}
        >
          {c.title}
        </button>
      ))}
      <Link href="/legal" className="shop-filters__legal">
        Research disclaimer
      </Link>
    </div>
  );
}
