"use client";

import Image from "next/image";
import { ArrowLeft, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type PhotoTourProps = {
  images: string[];
  onClose: () => void;
  onPhotoClick: (index: number) => void;
};

export default function PhotoTour({
  images,
  onClose,
  onPhotoClick,
}: PhotoTourProps) {
  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  const previousFocusedElement =
    useRef<HTMLElement | null>(null);

  /* =====================================================
     BODY SCROLL + FOCUS
  ===================================================== */

  useEffect(() => {
    previousFocusedElement.current =
      document.activeElement as HTMLElement;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow =
        previousOverflow;

      previousFocusedElement.current?.focus();
    };
  }, []);

  /* =====================================================
     ESCAPE
  ===================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="
        fixed
        inset-0
        z-[100]
        bg-white
        overflow-y-auto
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="photo-tour-title"
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <motion.header
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.25,
          delay: 0.05,
        }}
        className="
          sticky
          top-0
          z-30
          bg-white/95
          backdrop-blur
          border-b
          border-[#eeeeee]
        "
      >
        <div
          className="
            max-w-6xl
            mx-auto
            h-20
            px-6
            flex
            items-center
            justify-between
          "
        >

          {/* BACK */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Back to listing"
            className="
              flex
              items-center
              gap-3
              rounded-full
              px-3
              py-2
              hover:bg-[#f7f7f7]
              transition-colors
              focus:outline-none
              focus:ring-2
              focus:ring-black
              focus:ring-offset-2
            "
          >
            <ArrowLeft size={22} />

            <span className="text-sm font-medium">
              Back
            </span>
          </button>

          {/* TITLE */}

          <h1
            id="photo-tour-title"
            className="
              text-[18px]
              font-semibold
              tracking-[-0.2px]
            "
          >
            Photo tour
          </h1>

          {/* CLOSE */}

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo tour"
            className="
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-[#f7f7f7]
              transition-colors
              focus:outline-none
              focus:ring-2
              focus:ring-black
              focus:ring-offset-2
            "
          >
            <X size={24} />
          </button>

        </div>
      </motion.header>

      {/* =================================================
          CONTENT
      ================================================= */}

      <main
        className="
          max-w-6xl
          mx-auto
          px-6
          py-10
        "
      >

        {/* PHOTO COUNT */}

        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.1,
          }}
          className="mb-8"
        >
          <p className="text-sm text-[#717171]">
            {images.length} photos
          </p>
        </motion.div>

        {/* GRID */}

        <div className="grid grid-cols-2 gap-5">

          {images.map((image, index) => (
            <motion.button
              key={`${image}-${index}`}
              type="button"
              onClick={() =>
                onPhotoClick(index)
              }
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay:
                  Math.min(index * 0.04, 0.2),
              }}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.99,
              }}
              className="
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-2xl
                bg-[#f2f2f2]
                group
                text-left
                focus:outline-none
                focus:ring-2
                focus:ring-black
                focus:ring-offset-2
              "
              aria-label={`Open property photo ${
                index + 1
              }`}
            >
              <Image
                src={image}
                alt={`Property photo ${
                  index + 1
                }`}
                fill
                sizes="(max-width: 900px) 50vw, 600px"
                className="
                  object-cover
                  transition-transform
                  duration-500
                  group-hover:scale-[1.025]
                "
              />
            </motion.button>
          ))}

        </div>
      </main>
    </motion.div>
  );
}