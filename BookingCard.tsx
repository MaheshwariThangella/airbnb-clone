"use client";

import { useMemo, useState, useEffect } from "react";
import { Calendar, Users } from "lucide-react";

type Booking = {
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
};

export default function BookingCard() {
  const PRICE = 18000;
  const CLEANING = 3500;
  const SERVICE = 1800;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();

    return Math.max(
      0,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    );
  }, [checkIn, checkOut]);

  const total = useMemo(() => {
    if (nights === 0) return PRICE + CLEANING + SERVICE;
    return nights * PRICE + CLEANING + SERVICE;
  }, [nights]);

  const reserveVilla = () => {
    if (!checkIn || !checkOut) {
      alert("Please select Check-In and Check-Out dates.");
      return;
    }

    if (nights <= 0) {
      alert("Checkout date must be after Check-In.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const booking: Booking = {
        checkIn,
        checkOut,
        guests,
        total,
      };

      const oldBookings = JSON.parse(
        localStorage.getItem("villaBookings") || "[]"
      );

      localStorage.setItem(
        "villaBookings",
        JSON.stringify([...oldBookings, booking])
      );

      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="sticky top-28 bg-white rounded-3xl shadow-xl border p-6">

      <div className="flex items-end gap-1 mb-6">
        <h2 className="text-3xl font-bold">₹18,000</h2>
        <span className="text-gray-600">night</span>
      </div>

      <div className="border rounded-2xl overflow-hidden">

        <div className="grid grid-cols-2">

          <div className="p-3 border-r border-b">
            <p className="text-xs font-bold mb-2">CHECK-IN</p>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="outline-none text-sm w-full"
              />
            </div>
          </div>

          <div className="p-3 border-b">
            <p className="text-xs font-bold mb-2">CHECKOUT</p>

            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="outline-none text-sm w-full"
              />
            </div>
          </div>

        </div>

        <div className="p-3">

          <p className="text-xs font-bold mb-3">GUESTS</p>

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>{guests} Guests</span>
            </div>

            <div className="flex items-center gap-2">

              <button
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="w-8 h-8 rounded-full border hover:bg-gray-100"
              >
                -
              </button>

              <button
                onClick={() => setGuests(Math.min(10, guests + 1))}
                className="w-8 h-8 rounded-full border hover:bg-gray-100"
              >
                +
              </button>

            </div>

          </div>

        </div>

      </div>

      <button
        onClick={reserveVilla}
        disabled={loading}
        className="w-full mt-5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-4 font-semibold transition disabled:opacity-60"
      >
        {loading ? "Booking Villa..." : "Reserve"}
      </button>

      {success && (
        <div className="mt-4 rounded-xl bg-green-100 text-green-700 p-3 text-center font-medium">
          🎉 Booking Confirmed Successfully!
        </div>
      )}

      <p className="text-center text-sm text-gray-500 mt-3">
        You won't be charged yet.
      </p>

      <div className="space-y-3 mt-6 text-sm">

        <div className="flex justify-between">
          <span>₹18,000 × {nights || 1} nights</span>
          <span>₹{PRICE * (nights || 1)}</span>
        </div>

        <div className="flex justify-between">
          <span>Cleaning fee</span>
          <span>₹{CLEANING}</span>
        </div>

        <div className="flex justify-between">
          <span>Service fee</span>
          <span>₹{SERVICE}</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

      </div>

    </div>
  );
}