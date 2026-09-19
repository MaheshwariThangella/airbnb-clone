"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  "/images/hero1.jpg",
  "/images/hero2.jpg",
  "/images/hero3.jpg",
  "/images/hero4.jpg",
  "/images/hero5.jpg",
];

export default function HeroGallery() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[520px] rounded-3xl overflow-hidden">

        <div className="col-span-2 row-span-2 relative">
          <Image src={images[0]} alt="" fill className="object-cover" />
        </div>

        {images.slice(1).map((img, i) => (
          <div key={i} className="relative">
            <Image src={img} alt="" fill className="object-cover" />
          </div>
        ))}

        <button
          onClick={() => setOpen(true)}
          className="absolute right-10 bottom-10 bg-white rounded-xl px-4 py-2 shadow-lg font-medium"
        >
          Show all photos
        </button>

      </div>

      {open && (
        <div className="fixed inset-0 bg-black/90 z-50 p-8 overflow-auto">

          <button
            onClick={() => setOpen(false)}
            className="text-white text-xl mb-6"
          >
            Close ✕
          </button>

          <div className="grid md:grid-cols-2 gap-4">

            {images.map((img, i) => (
              <div key={i} className="relative h-[350px]">
                <Image src={img} alt="" fill className="object-cover rounded-2xl" />
              </div>
            ))}

          </div>

        </div>
      )}
    </>
  );
}