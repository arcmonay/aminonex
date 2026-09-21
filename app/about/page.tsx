export const metadata = {
  title: "About",
  description: "About AminoNex research peptides.",
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <h1>About AminoNex</h1>
      <p>
        AminoNex supplies research peptides for qualified laboratory and
        institutional protocols. The brand name is a nod to amino chemistry and
        the next step in documented purity — lot-level identity, HPLC checks,
        and clear research-only framing on every SKU.
      </p>
      <p>
        We do not market peptides as supplements, medicines, or consumer
        wellness products. Every listing, cart note, and legal page states the
        same boundary: research use only.
      </p>
      <p>
        The storefront ships Shopify-ready. Until Storefront API credentials are
        connected, the catalog and browser cart run from local data so you can
        design and iterate without a live merchant backend.
      </p>
    </div>
  );
}
