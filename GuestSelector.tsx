"use client";

import { useState } from "react";
import { Minus, Plus, Users } from "lucide-react";

interface GuestSelectorProps {
  guests: number;
  setGuests: (value: number) => void;
}

export default function GuestSelector({
  guests,
  setGuests,
}: GuestSelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm"
      >
        <Users size={16} />
        {guests} guests
      </button>

      {open && (
        <div className="absolute top-12 right-0 bg-white border rounded-2xl shadow-xl w-64 p-4 z-50">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Guests</p>
              <p className="text-xs text-gray-500">Maximum 8 guests</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="border rounded-full p-2"
              >
                <Minus size={14} />
              </button>

              <span>{guests}</span>

              <button
                onClick={() => setGuests(Math.min(8, guests + 1))}
                className="border rounded-full p-2"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}