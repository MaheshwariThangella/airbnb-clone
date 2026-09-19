"use client";

import { FormEvent, useEffect, useState } from "react";
import { Building2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

type Property = {
  id: string;
  title: string;
  location: string;
  price: number;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  image: string;
};

const PROPERTY_KEY =
  "airbnb_clone_properties";

const defaultProperty: Property = {
  id: "default-villa",
  title: "Luxury Villa with Pool",
  location: "Goa, India",
  price: 18000,
  guests: 8,
  bedrooms: 4,
  beds: 5,
  bathrooms: 3,
  image: "/images/hero1.jpg",
};

function getProperties() {
  if (typeof window === "undefined") {
    return [defaultProperty];
  }

  const stored =
    localStorage.getItem(PROPERTY_KEY);

  if (!stored) {
    localStorage.setItem(
      PROPERTY_KEY,
      JSON.stringify([defaultProperty])
    );

    return [defaultProperty];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [defaultProperty];
  }
}

export default function ManagerDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [properties, setProperties] =
    useState<Property[]>([]);

  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    guests: "2",
    bedrooms: "1",
    beds: "1",
    bathrooms: "1",
    image: "",
  });

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/");
        return;
      }

      if (user.role !== "manager") {
        router.push("/");
        return;
      }

      setProperties(getProperties());
    }
  }, [user, loading, router]);

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!form.title.trim()) {
      setMessage(
        "Please enter a property name."
      );
      return;
    }

    if (!form.location.trim()) {
      setMessage(
        "Please enter the location."
      );
      return;
    }

    const newProperty: Property = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      location: form.location.trim(),
      price: Number(form.price) || 0,
      guests: Number(form.guests) || 1,
      bedrooms: Number(form.bedrooms) || 1,
      beds: Number(form.beds) || 1,
      bathrooms:
        Number(form.bathrooms) || 1,
      image:
        form.image.trim() ||
        "/images/hero1.jpg",
    };

    const updated = [
      ...properties,
      newProperty,
    ];

    setProperties(updated);

    localStorage.setItem(
      PROPERTY_KEY,
      JSON.stringify(updated)
    );

    setForm({
      title: "",
      location: "",
      price: "",
      guests: "2",
      bedrooms: "1",
      beds: "1",
      bathrooms: "1",
      image: "",
    });

    setMessage(
      "Building added successfully."
    );
  };

  const deleteProperty = (id: string) => {
    const updated =
      properties.filter(
        (property) =>
          property.id !== id
      );

    setProperties(updated);

    localStorage.setItem(
      PROPERTY_KEY,
      JSON.stringify(updated)
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (
    !user ||
    user.role !== "manager"
  ) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7]">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-[#717171]">
              Manager Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-semibold">
              Manage your properties
            </h1>

            <p className="mt-2 text-sm text-[#717171]">
              Welcome, {user.name}
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded-xl border border-black px-5 py-3 font-medium"
          >
            Back to listing
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[390px_1fr]">
          <section className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7f7f7]">
                <Plus size={21} />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Add new building
                </h2>

                <p className="text-sm text-[#717171]">
                  Create another property listing.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4"
            >
              <input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                placeholder="Building / property name"
                className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none focus:border-black"
              />

              <input
                value={form.location}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: e.target.value,
                  })
                }
                placeholder="Location"
                className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none focus:border-black"
              />

              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
                placeholder="Price per night"
                min="0"
                className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none focus:border-black"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={form.guests}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      guests: e.target.value,
                    })
                  }
                  min="1"
                  placeholder="Guests"
                  className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none"
                />

                <input
                  type="number"
                  value={form.bedrooms}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bedrooms: e.target.value,
                    })
                  }
                  min="1"
                  placeholder="Bedrooms"
                  className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={form.beds}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      beds: e.target.value,
                    })
                  }
                  min="1"
                  placeholder="Beds"
                  className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none"
                />

                <input
                  type="number"
                  value={form.bathrooms}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      bathrooms: e.target.value,
                    })
                  }
                  min="1"
                  placeholder="Bathrooms"
                  className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none"
                />
              </div>

              <input
                value={form.image}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.value,
                  })
                }
                placeholder="Image URL (optional)"
                className="w-full rounded-xl border border-[#b0b0b0] px-4 py-3 outline-none"
              />

              {message && (
                <div className="rounded-xl bg-[#f7f7f7] px-4 py-3 text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff385c] py-3.5 font-semibold text-white"
              >
                <Plus size={18} />
                Add building
              </button>
            </form>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  Your buildings
                </h2>

                <p className="text-sm text-[#717171]">
                  {properties.length}{" "}
                  {properties.length === 1
                    ? "property"
                    : "properties"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {properties.map(
                (property) => (
                  <div
                    key={property.id}
                    className="overflow-hidden rounded-3xl bg-white shadow-sm"
                  >
                    <div className="grid md:grid-cols-[220px_1fr]">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="h-full min-h-[190px] w-full object-cover"
                      />

                      <div className="p-6">
                        <div className="flex justify-between gap-5">
                          <div>
                            <h3 className="text-xl font-semibold">
                              {property.title}
                            </h3>

                            <p className="mt-1 text-sm text-[#717171]">
                              {property.location}
                            </p>
                          </div>

                          {property.id !==
                            "default-villa" && (
                            <button
                              type="button"
                              onClick={() =>
                                deleteProperty(
                                  property.id
                                )
                              }
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-red-50"
                              aria-label={`Delete ${property.title}`}
                            >
                              <Trash2
                                size={18}
                              />
                            </button>
                          )}
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                          <div>
                            <p className="text-[#717171]">
                              Price
                            </p>
                            <p className="mt-1 font-semibold">
                              ₹
                              {property.price.toLocaleString(
                                "en-IN"
                              )}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#717171]">
                              Guests
                            </p>
                            <p className="mt-1 font-semibold">
                              {property.guests}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#717171]">
                              Bedrooms
                            </p>
                            <p className="mt-1 font-semibold">
                              {property.bedrooms}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#717171]">
                              Bathrooms
                            </p>
                            <p className="mt-1 font-semibold">
                              {property.bathrooms}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-sm text-[#717171]">
                          <Building2
                            size={17}
                          />
                          <span>
                            Property listing
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}