"use client";

import {
  Search,
  Star,
  X,
} from "lucide-react";

import { useEffect, useMemo, useRef, useState } from "react";

type Review = {
  id: number;
  name: string;
  location: string;
  date: string;
  text: string;
  topic: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Rahul",
    location: "Bengaluru, India",
    date: "September 2026",
    topic: "Very clean",
    text:
      "Amazing villa. Very clean and beautiful pool. The rooms were spacious and comfortable, and everything was prepared perfectly when we arrived.",
  },
  {
    id: 2,
    name: "Sneha",
    location: "Hyderabad, India",
    date: "August 2026",
    topic: "Great location",
    text:
      "We had a wonderful stay. The villa is peaceful and the location made it easy to explore Goa while still feeling private and relaxing.",
  },
  {
    id: 3,
    name: "Arjun",
    location: "Mumbai, India",
    date: "July 2026",
    topic: "Beautiful home",
    text:
      "Loved the sunset view and fast Wi-Fi. The property looks even better in person and the pool area was our favorite part.",
  },
  {
    id: 4,
    name: "Priya",
    location: "Chennai, India",
    date: "July 2026",
    topic: "Amazing pool",
    text:
      "Highly recommended for a weekend trip. The villa was comfortable, clean and had everything we needed for the stay.",
  },
  {
    id: 5,
    name: "Karthik",
    location: "Pune, India",
    date: "June 2026",
    topic: "Peaceful stay",
    text:
      "A very peaceful place for a family vacation. The rooms were comfortable and check-in was simple.",
  },
  {
    id: 6,
    name: "Ananya",
    location: "Delhi, India",
    date: "June 2026",
    topic: "Very clean",
    text:
      "The property was spotless and beautifully maintained. We especially enjoyed the outdoor seating and pool.",
  },
  {
    id: 7,
    name: "Vikram",
    location: "Kolkata, India",
    date: "May 2026",
    topic: "Great location",
    text:
      "The location was convenient and the house was quiet at night. Communication with the host was excellent.",
  },
  {
    id: 8,
    name: "Divya",
    location: "Hyderabad, India",
    date: "May 2026",
    topic: "Beautiful home",
    text:
      "Beautiful interiors, comfortable beds and a very relaxing atmosphere. We would happily come back.",
  },
];

const ratingBreakdown = [
  {
    label: "Cleanliness",
    value: 4.9,
  },
  {
    label: "Accuracy",
    value: 4.9,
  },
  {
    label: "Check-in",
    value: 5.0,
  },
  {
    label: "Communication",
    value: 4.9,
  },
  {
    label: "Location",
    value: 4.8,
  },
  {
    label: "Value",
    value: 4.8,
  },
];

const topics = [
  "All",
  "Very clean",
  "Great location",
  "Beautiful home",
  "Peaceful stay",
  "Amazing pool",
];

function Stars({
  size = 13,
}: {
  size?: number;
}) {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill="currentColor"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: Review;
}) {
  return (
    <article>
      {/* USER */}
      <div className="flex items-center gap-3">

        <div
          className="
            w-11
            h-11
            rounded-full
            bg-[#f2f2f2]
            border
            border-[#dddddd]
            flex
            items-center
            justify-center
            font-semibold
            shrink-0
          "
          aria-hidden="true"
        >
          {review.name.charAt(0)}
        </div>

        <div>
          <h3 className="font-semibold text-[14px]">
            {review.name}
          </h3>

          <p className="text-[12px] text-[#717171]">
            {review.location}
          </p>
        </div>

      </div>

      {/* STAR + DATE */}
      <div className="flex items-center gap-3 mt-4">

        <Stars />

        <span className="text-[12px] text-[#717171]">
          ·
        </span>

        <span className="text-[12px] text-[#717171]">
          {review.date}
        </span>

      </div>

      {/* TOPIC */}
      <div className="mt-3">

        <span
          className="
            inline-flex
            rounded-full
            bg-[#f7f7f7]
            px-3
            py-1
            text-[11px]
            font-medium
          "
        >
          {review.topic}
        </span>

      </div>

      {/* REVIEW */}
      <p className="mt-4 text-[14px] leading-6 text-[#484848]">
        {review.text}
      </p>

    </article>
  );
}

export default function Reviews() {
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedTopic, setSelectedTopic] =
    useState("All");

  const [searchQuery, setSearchQuery] =
    useState("");

  const closeButtonRef =
    useRef<HTMLButtonElement>(null);

  /* =====================================================
     BODY SCROLL + ESCAPE
  ===================================================== */

  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setModalOpen(false);
      }
    };

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
  }, [modalOpen]);

  /* =====================================================
     FILTER REVIEWS
  ===================================================== */

  const filteredReviews = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    return reviews.filter((review) => {
      const matchesTopic =
        selectedTopic === "All" ||
        review.topic === selectedTopic;

      const matchesSearch =
        query.length === 0 ||
        review.name.toLowerCase().includes(query) ||
        review.location
          .toLowerCase()
          .includes(query) ||
        review.text
          .toLowerCase()
          .includes(query) ||
        review.topic
          .toLowerCase()
          .includes(query);

      return (
        matchesTopic &&
        matchesSearch
      );
    });
  }, [selectedTopic, searchQuery]);

  return (
    <>
      {/* =================================================
          NORMAL REVIEW SECTION
      ================================================= */}

      <section
        className="
          mt-10
          border-t
          border-[#dddddd]
          pt-10
        "
      >

        {/* HEADER */}

        <div className="flex items-center gap-2 mb-10">

          <Star
            size={21}
            fill="currentColor"
            strokeWidth={1.7}
          />

          <h2 className="text-[24px] font-semibold">
            4.95 · 132 reviews
          </h2>

        </div>

        {/* RATING BREAKDOWN */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-16
            gap-y-5
            pb-10
            border-b
            border-[#dddddd]
          "
        >

          {ratingBreakdown.map((rating) => (
            <div
              key={rating.label}
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <span className="text-[14px]">
                {rating.label}
              </span>

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-[120px]
                    h-[4px]
                    bg-[#eeeeee]
                    rounded-full
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      h-full
                      bg-[#222222]
                      rounded-full
                    "
                    style={{
                      width: `${(rating.value / 5) * 100}%`,
                    }}
                  />
                </div>

                <span
                  className="
                    text-[13px]
                    font-medium
                    w-7
                    text-right
                  "
                >
                  {rating.value.toFixed(1)}
                </span>

              </div>

            </div>
          ))}

        </div>

        {/* TOPICS */}

        <div className="py-8 border-b border-[#dddddd]">

          <h3 className="text-[16px] font-semibold mb-4">
            What guests loved
          </h3>

          <div className="flex flex-wrap gap-3">

            {topics.slice(1).map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => {
                  setSelectedTopic(topic);
                  setModalOpen(true);
                }}
                className="
                  rounded-full
                  border
                  border-[#dddddd]
                  px-4
                  py-2
                  text-[13px]
                  hover:bg-[#f7f7f7]
                  transition-colors
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
                "
              >
                {topic}
              </button>
            ))}

          </div>

        </div>

        {/* PREVIEW REVIEWS */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-12
            gap-y-12
            pt-10
          "
        >

          {reviews.slice(0, 4).map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}

        </div>

        {/* SHOW ALL BUTTON */}

        <button
          type="button"
          onClick={() => {
            setSelectedTopic("All");
            setSearchQuery("");
            setModalOpen(true);
          }}
          className="
            mt-10
            border
            border-[#222222]
            rounded-lg
            px-5
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
          Show all 132 reviews
        </button>

      </section>

      {/* =================================================
          FULL REVIEWS MODAL
      ================================================= */}

      {modalOpen && (
        <div
          className="
            fixed
            inset-0
            z-[180]
            bg-black/50
            flex
            items-center
            justify-center
            p-6
          "
          role="dialog"
          aria-modal="true"
          aria-labelledby="reviews-modal-title"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setModalOpen(false);
            }
          }}
        >

          <div
            className="
              bg-white
              w-full
              max-w-[900px]
              max-h-[88vh]
              rounded-2xl
              shadow-2xl
              overflow-hidden
              flex
              flex-col
            "
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >

            {/* MODAL HEADER */}

            <div
              className="
                h-20
                shrink-0
                border-b
                border-[#dddddd]
                flex
                items-center
                justify-between
                px-7
              "
            >

              <div>

                <h2
                  id="reviews-modal-title"
                  className="text-[20px] font-semibold"
                >
                  4.95 · 132 reviews
                </h2>

                <p className="text-[12px] text-[#717171] mt-1">
                  Guest reviews
                </p>

              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close reviews"
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
                <X size={22} />
              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="overflow-y-auto">

              <div className="p-7">

                {/* SEARCH */}

                <div
                  className="
                    border
                    border-[#b0b0b0]
                    rounded-xl
                    flex
                    items-center
                    px-4
                    h-12
                  "
                >

                  <Search
                    size={18}
                    className="text-[#717171]"
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value
                      )
                    }
                    placeholder="Search reviews"
                    className="
                      flex-1
                      ml-3
                      outline-none
                      text-[14px]
                      bg-transparent
                    "
                    aria-label="Search reviews"
                  />

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() =>
                        setSearchQuery("")
                      }
                      aria-label="Clear review search"
                      className="
                        w-7
                        h-7
                        rounded-full
                        flex
                        items-center
                        justify-center
                        hover:bg-[#f7f7f7]
                      "
                    >
                      <X size={15} />
                    </button>
                  )}

                </div>

                {/* FILTER TOPICS */}

                <div className="flex flex-wrap gap-2 mt-5">

                  {topics.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() =>
                        setSelectedTopic(topic)
                      }
                      className={`
                        rounded-full
                        px-4
                        py-2
                        text-[12px]
                        font-medium
                        border
                        transition-colors
                        ${
                          selectedTopic === topic
                            ? "bg-[#222222] text-white border-[#222222]"
                            : "border-[#dddddd] hover:bg-[#f7f7f7]"
                        }
                      `}
                    >
                      {topic}
                    </button>
                  ))}

                </div>

                {/* REVIEW COUNT */}

                <div className="mt-7 mb-7">

                  <p className="text-[13px] text-[#717171]">
                    Showing{" "}
                    {filteredReviews.length}{" "}
                    reviews
                  </p>

                </div>

                {/* FILTERED REVIEWS */}

                {filteredReviews.length > 0 ? (
                  <div className="space-y-10">

                    {filteredReviews.map(
                      (review) => (
                        <article
                          key={review.id}
                          className="
                            pb-10
                            border-b
                            border-[#eeeeee]
                          "
                        >

                          <ReviewCard
                            review={review}
                          />

                        </article>
                      )
                    )}

                  </div>
                ) : (
                  <div
                    className="
                      py-16
                      text-center
                    "
                  >

                    <p className="font-semibold">
                      No reviews found
                    </p>

                    <p className="text-[13px] text-[#717171] mt-2">
                      Try another search or topic.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div
              className="
                shrink-0
                border-t
                border-[#dddddd]
                px-7
                py-4
                flex
                justify-end
              "
            >

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="
                  border
                  border-[#222222]
                  rounded-lg
                  px-5
                  py-2.5
                  text-[14px]
                  font-semibold
                  hover:bg-[#f7f7f7]
                  transition-colors
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black
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