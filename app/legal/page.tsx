export const metadata = {
  title: "Legal",
  description: "AminoNex research-use-only terms and disclaimers.",
};

export default function LegalPage() {
  return (
    <div className="page-shell">
      <h1>Research use only</h1>
      <p>
        All AminoNex products are sold strictly for laboratory research. They
        are not drugs, supplements, cosmetics, or medical devices.
      </p>
      <ul>
        <li>Not for human or veterinary consumption</li>
        <li>Not for diagnosis, treatment, cure, or prevention of any disease</li>
        <li>Not for use in foods, cosmetics, or household products</li>
        <li>Buyers represent they are qualified to handle research chemicals</li>
      </ul>
      <p>
        By browsing or purchasing, you agree that you understand these
        limitations and will comply with applicable laws in your jurisdiction.
        AminoNex does not provide medical advice.
      </p>
      <p>© 2025 AminoNex</p>
    </div>
  );
}
