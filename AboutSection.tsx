"use client";

import { useState } from "react";

export default function AboutSection() {
  const [expanded, setExpanded] = useState(false);

  const shortText =
    "Relax with the whole family at this peaceful luxury villa in Goa. Enjoy a private infinity pool, spacious bedrooms, a modern kitchen, high-speed Wi-Fi and breathtaking sunset views.";

  const fullText =
    "Relax with the whole family at this peaceful luxury villa in Goa. Enjoy a private infinity pool, spacious bedrooms, a modern kitchen, high-speed Wi-Fi and breathtaking sunset views. Perfect for family vacations, workations, and weekend getaways. The villa offers generous indoor and outdoor spaces, comfortable bedrooms, a fully equipped kitchen, and a quiet setting for a relaxing stay.";

  return (
    <section className="py-10 border-b border-[#dddddd]">
      <h2 className="text-[24px] font-semibold mb-5">
        About this place
      </h2>

      <p className="text-[15px] leading-7 text-[#484848]">
        {expanded ? fullText : shortText}
      </p>

      <button
        type="button"
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
        className="
          mt-5
          underline
          font-semibold
          text-[14px]
          hover:text-black
          focus:outline-none
          focus:ring-2
          focus:ring-black
          focus:ring-offset-2
          rounded
        "
      >
        {expanded ? "Show less" : "Show more"}
      </button>
    </section>
  );
}