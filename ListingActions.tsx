"use client";

import { Heart, Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ListingActions() {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Luxury Villa with Pool",
      text: "Check out this beautiful luxury villa in Goa.",
      url: window.location.href,
    };

    try {
      if (
        navigator.share &&
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      ) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setShared(true);

        setTimeout(() => {
          setShared(false);
        }, 2000);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  const handleSave = () => {
    setSaved((current) => !current);
  };

  return (
    <div className="flex items-center gap-2">

      {/* SHARE */}
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share this listing"
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          text-[14px]
          font-semibold
          underline
          hover:bg-[#f7f7f7]
          transition-colors
        "
      >
        {shared ? (
          <>
            <Check size={16} />
            Copied
          </>
        ) : (
          <>
            <Share2 size={16} />
            Share
          </>
        )}
      </button>

      {/* SAVE */}
      <button
        type="button"
        onClick={handleSave}
        aria-label={
          saved
            ? "Remove listing from saved"
            : "Save listing"
        }
        aria-pressed={saved}
        className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          text-[14px]
          font-semibold
          underline
          hover:bg-[#f7f7f7]
          transition-colors
        "
      >
        <Heart
          size={17}
          fill={saved ? "currentColor" : "none"}
          strokeWidth={2}
        />

        {saved ? "Saved" : "Save"}
      </button>

    </div>
  );
}