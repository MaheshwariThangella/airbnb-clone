"use client";

import {
  Wifi,
  Tv,
  Car,
  Waves,
  Snowflake,
  Utensils,
  WashingMachine,
  Dumbbell,
  Sparkles,
  Mountain,
  Coffee,
  Microwave,
  Refrigerator,
  ParkingCircle,
  Bath,
  Flame,
  DoorOpen,
  AirVent,
  Baby,
  Armchair,
  CookingPot,
  Wine,
  LockKeyhole,
} from "lucide-react";

import { useEffect, useState } from "react";

type Amenity = {
  name: string;
  icon: React.ElementType;
};

const amenities: Amenity[] = [
  { name: "Fast Wi-Fi", icon: Wifi },
  { name: "Pool", icon: Waves },
  { name: "Kitchen", icon: Utensils },
  { name: "Free parking", icon: Car },
  { name: "TV", icon: Tv },
  { name: "Air conditioning", icon: Snowflake },
  { name: "Washing machine", icon: WashingMachine },
  { name: "Gym", icon: Dumbbell },
  { name: "Essentials", icon: Sparkles },
  { name: "Mountain view", icon: Mountain },
  { name: "Coffee maker", icon: Coffee },
  { name: "Microwave", icon: Microwave },
  { name: "Refrigerator", icon: Refrigerator },
  { name: "Private parking", icon: ParkingCircle },
  { name: "Bathtub", icon: Bath },
  { name: "Indoor fireplace", icon: Flame },
  { name: "Private entrance", icon: DoorOpen },
  { name: "Heating", icon: AirVent },
  { name: "High chair", icon: Baby },
  { name: "Outdoor furniture", icon: Armchair },
  { name: "Cooking basics", icon: CookingPot },
  { name: "Wine glasses", icon: Wine },
  { name: "Security lock", icon: LockKeyhole },
];

export default function Amenities() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
    };

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open]);

  return (
    <>
      {/* =================================================
          AMENITIES SECTION
      ================================================= */}

      <section className="mt-10 border-b border-[#dddddd] pb-10">

        <h2 className="text-[24px] font-semibold mb-7">
          What this place offers
        </h2>

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">

          {amenities.slice(0, 8).map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  gap-4
                  min-h-[42px]
                "
              >
                <Icon
                  size={23}
                  strokeWidth={1.7}
                  className="shrink-0"
                />

                <span className="text-[15px]">
                  {item.name}
                </span>
              </div>
            );
          })}

        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="
            mt-8
            border
            border-[#222222]
            rounded-lg
            px-6
            py-3
            text-[14px]
            font-semibold
            hover:bg-[#f7f7f7]
            transition-colors
            focus:outline-none
            focus:ring-2
            focus:ring-black
            focus:ring-offset-2
          "
        >
          Show all {amenities.length} amenities
        </button>

      </section>

      {/* =================================================
          AMENITIES MODAL
      ================================================= */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-[150]
            bg-black/50
            flex
            items-center
            justify-center
            p-6
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="amenities-title"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setOpen(false);
            }
          }}
        >
          <div
            className="
              bg-white
              w-full
              max-w-[760px]
              max-h-[85vh]
              overflow-y-auto
              rounded-2xl
              shadow-2xl
              p-8
            "
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">

              <div>
                <h2
                  id="amenities-title"
                  className="text-[24px] font-semibold"
                >
                  What this place offers
                </h2>

                <p className="text-[13px] text-[#717171] mt-1">
                  All available amenities
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close amenities"
                className="
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                  hover:bg-[#f7f7f7]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
                "
              >
                <span className="text-2xl leading-none">
                  ×
                </span>
              </button>

            </div>

            {/* AMENITIES LIST */}
            <div className="grid grid-cols-2 gap-x-10 gap-y-7">

              {amenities.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-4"
                  >
                    <Icon
                      size={23}
                      strokeWidth={1.7}
                      className="shrink-0"
                    />

                    <span className="text-[14px]">
                      {item.name}
                    </span>
                  </div>
                );
              })}

            </div>

            {/* CLOSE BUTTON */}
            <div className="mt-10 pt-6 border-t border-[#eeeeee]">

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  border
                  border-[#222222]
                  rounded-lg
                  px-6
                  py-3
                  text-[14px]
                  font-semibold
                  hover:bg-[#f7f7f7]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
                  focus:ring-offset-2
                "
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}