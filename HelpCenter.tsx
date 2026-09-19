"use client";

import { useMemo, useState } from "react";
import { MessageCircle, X } from "lucide-react";

type HelpCenterProps = {
  open: boolean;
  onClose: () => void;
};

const faqs = [
  {
    question: "How do I book a property?",
    answer:
      "Choose your check-in and check-out dates, select the number of guests, review the total price, and click Reserve.",
  },
  {
    question: "Can I change the number of guests?",
    answer:
      "Yes. Open the Guests selector in the booking card and use the plus or minus controls. The total updates immediately.",
  },
  {
    question: "How do managers add properties?",
    answer:
      "Log in using a Manager account and open Manage properties from the profile menu. You can add multiple buildings there.",
  },
  {
    question: "How do I contact support?",
    answer:
      "Use the Help Centre and choose the Contact support option. This demo provides a frontend support experience.",
  },
  {
    question: "Can I cancel a reservation?",
    answer:
      "The cancellation policy depends on the property. Check the reservation details before confirming your booking.",
  },
];

export default function HelpCenter({
  open,
  onClose,
}: HelpCenterProps) {
  const [search, setSearch] =
    useState("");

  const filteredFaqs = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) return faqs;

    return faqs.filter(
      (faq) =>
        faq.question
          .toLowerCase()
          .includes(value) ||
        faq.answer
          .toLowerCase()
          .includes(value)
    );
  }, [search]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f7f7]">
                <MessageCircle
                  size={22}
                />
              </div>

              <div>
                <h2 className="text-2xl font-semibold">
                  Help Centre
                </h2>

                <p className="mt-1 text-sm text-[#717171]">
                  How can we help you?
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#f7f7f7]"
            aria-label="Close help centre"
          >
            <X size={20} />
          </button>
        </div>

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search help..."
          className="mt-6 w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none focus:border-black"
        />

        <div className="mt-6 space-y-3">
          {filteredFaqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-[#dddddd] p-5"
            >
              <summary className="cursor-pointer font-semibold">
                {faq.question}
              </summary>

              <p className="mt-3 text-sm leading-6 text-[#717171]">
                {faq.answer}
              </p>
            </details>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="rounded-2xl bg-[#f7f7f7] p-6 text-center text-sm text-[#717171]">
              No help articles found.
            </div>
          )}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-xl border border-black px-4 py-3 font-semibold"
          >
            Contact support
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-black px-4 py-3 font-semibold text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}