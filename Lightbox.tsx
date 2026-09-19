"use client";

import Image from "next/image";

import {
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

import {
  useEffect,
  useRef,
} from "react";

type LightboxProps = {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
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
     KEYBOARD
  ===================================================== */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      switch (event.key) {
        case "Escape":
          event.preventDefault();
          onClose();
          break;

        case "ArrowLeft":
          event.preventDefault();
          onPrevious();
          break;

        case "ArrowRight":
          event.preventDefault();
          onNext();
          break;
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
  }, [
    onClose,
    onNext,
    onPrevious,
  ]);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        fixed
        inset-0
        z-[200]
        bg-black
        text-white
      "
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          z-20
          h-20
          flex
          items-center
          justify-between
          px-6
        "
      >

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.1,
          }}
          className="
            text-sm
            font-medium
          "
        >
          {currentIndex + 1} /{" "}
          {images.length}
        </motion.p>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="
            w-11
            h-11
            rounded-full
            flex
            items-center
            justify-center
            hover:bg-white/10
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-white
            focus:ring-offset-2
            focus:ring-offset-black
          "
        >
          <X size={28} />
        </button>

      </div>

      {/* =================================================
          PREVIOUS BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={onPrevious}
        aria-label="Previous photo"
        className="
          absolute
          left-6
          top-1/2
          -translate-y-1/2
          z-20
          w-12
          h-12
          rounded-full
          border
          border-white/70
          text-white
          flex
          items-center
          justify-center
          hover:bg-white/10
          transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-white
          focus:ring-offset-2
          focus:ring-offset-black
        "
      >
        <ChevronLeft size={30} />
      </button>

      {/* =================================================
          NEXT BUTTON
      ================================================= */}

      <button
        type="button"
        onClick={onNext}
        aria-label="Next photo"
        className="
          absolute
          right-6
          top-1/2
          -translate-y-1/2
          z-20
          w-12
          h-12
          rounded-full
          border
          border-white/70
          text-white
          flex
          items-center
          justify-center
          hover:bg-white/10
          transition-colors
          focus:outline-none
          focus:ring-2
          focus:ring-white
          focus:ring-offset-2
          focus:ring-offset-black
        "
      >
        <ChevronRight size={30} />
      </button>

      {/* =================================================
          IMAGE AREA
      ================================================= */}

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          px-20
          py-20
        "
      >

        <div className="relative w-full max-w-6xl h-full">

          <AnimatePresence
            mode="wait"
          >
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 1.015,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="absolute inset-0"
            >
              <Image
                src={
                  images[currentIndex]
                }
                alt={`Property photo ${
                  currentIndex + 1
                }`}
                fill
                priority
                sizes="100vw"
                className="
                  object-contain
                  select-none
                "
              />
            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* =================================================
          KEYBOARD HINT
      ================================================= */}

      <div
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          text-[11px]
          text-white/70
          pointer-events-none
        "
        aria-hidden="true"
      >
        Use ← → to navigate · Esc to close
      </div>

    </motion.div>
  );
}