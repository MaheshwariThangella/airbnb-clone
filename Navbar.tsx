"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Globe,
  Menu,
  UserCircle,
  Calendar,
  Minus,
  Plus,
} from "lucide-react";

interface NavbarProps {
  onSearch?: (value: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [showGuests, setShowGuests] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const totalGuests = adults + children;

  function Counter({
    title,
    subtitle,
    value,
    setValue,
    minimum = 0,
  }: {
    title: string;
    subtitle: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    minimum?: number;
  }) {
    return (
      <div className="flex justify-between items-center py-4 border-b last:border-none">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setValue(Math.max(minimum, value - 1))}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            <Minus size={16} />
          </button>

          <span className="w-5 text-center font-medium">{value}</span>

          <button
            onClick={() => setValue(value + 1)}
            className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>

          <span className="font-bold text-2xl text-rose-500">airbnb</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center bg-white rounded-full border shadow-md hover:shadow-lg transition overflow-hidden">

          {/* WHERE */}
          <div className="px-6 py-3 border-r">
            <p className="text-xs font-semibold">Where</p>

            <input
              value={destination}
              placeholder="Search destinations"
              onChange={(e) => {
                setDestination(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="outline-none text-sm w-44"
            />
          </div>

          {/* WHEN */}
          <div className="relative px-6 py-3 border-r">

            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="text-left"
            >
              <p className="text-xs font-semibold">When</p>

              <p className="text-sm text-gray-500">
                {checkIn && checkOut
                  ? `${checkIn} - ${checkOut}`
                  : "Add dates"}
              </p>
            </button>

            <AnimatePresence>
              {showCalendar && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-16 left-0 bg-white border shadow-2xl rounded-3xl p-5 w-80 z-50"
                >
                  <h3 className="font-semibold mb-4 text-lg">
                    Select your stay
                  </h3>

                  <div className="space-y-4">

                    <div>
                      <label className="text-xs font-semibold">
                        Check In
                      </label>

                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full border rounded-xl px-3 py-2 mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold">
                        Check Out
                      </label>

                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full border rounded-xl px-3 py-2 mt-1"
                      />
                    </div>

                    <button
                      onClick={() => setShowCalendar(false)}
                      className="w-full bg-rose-500 text-white rounded-xl py-2 hover:bg-rose-600"
                    >
                      Done
                    </button>

                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* WHO */}
          <div className="relative px-6 py-3">

            <button
              onClick={() => setShowGuests(!showGuests)}
              className="text-left"
            >
              <p className="text-xs font-semibold">Who</p>

              <p className="text-sm text-gray-500">
                {totalGuests} Guests
                {infants > 0 ? ` · ${infants} Infants` : ""}
                {pets > 0 ? ` · ${pets} Pets` : ""}
              </p>
            </button>

            <AnimatePresence>
              {showGuests && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-16 right-0 bg-white rounded-3xl shadow-2xl border w-96 p-6 z-50"
                >
                  <Counter
                    title="Adults"
                    subtitle="Age 13+"
                    value={adults}
                    setValue={setAdults}
                    minimum={1}
                  />

                  <Counter
                    title="Children"
                    subtitle="Ages 2–12"
                    value={children}
                    setValue={setChildren}
                  />

                  <Counter
                    title="Infants"
                    subtitle="Under 2"
                    value={infants}
                    setValue={setInfants}
                  />

                  <Counter
                    title="Pets"
                    subtitle="Bringing a pet?"
                    value={pets}
                    setValue={setPets}
                  />

                  <button
                    onClick={() => setShowGuests(false)}
                    className="mt-5 w-full bg-rose-500 text-white py-3 rounded-xl hover:bg-rose-600 font-semibold"
                  >
                    Done
                  </button>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Search */}
          <button
            onClick={() => {
              const value = `${destination} ${checkIn} ${checkOut} ${totalGuests} guests`;
              onSearch?.(value);
              setShowGuests(false);
              setShowCalendar(false);
            }}
            className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-4 mx-2 transition"
          >
            <Search size={18} />
          </button>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link
            href="/help"
            className="hidden md:block text-sm font-medium hover:underline"
          >
            Help Centre
          </Link>

          <Globe size={20} className="cursor-pointer hidden md:block" />

          <Link
            href="/manager"
            className="hidden md:block text-sm font-medium hover:underline"
          >
            Manager
          </Link>

          <Link
            href="/login"
            className="border rounded-full px-3 py-2 flex items-center gap-3 hover:shadow-lg transition"
          >
            <Menu size={18} />
            <UserCircle size={28} />
          </Link>

        </div>

      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-4">
        <div className="flex items-center rounded-full border shadow-md px-4 py-3 gap-3">
          <Search className="text-rose-500" size={20} />

          <input
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              onSearch?.(e.target.value);
            }}
            placeholder="Where are you going?"
            className="flex-1 outline-none text-sm"
          />

          <Calendar size={18} className="text-gray-400" />
        </div>
      </div>

    </header>
  );
}