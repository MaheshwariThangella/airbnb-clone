import { BedDouble } from "lucide-react";

export default function SleepSection() {
  const rooms = [
    "Bedroom 1",
    "Bedroom 2",
    "Bedroom 3",
    "Bedroom 4",
  ];

  return (
    <section className="mt-10 border-t pt-8">

      <h2 className="text-2xl font-semibold mb-6">
        Where you'll sleep
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        {rooms.map((room) => (
          <div
            key={room}
            className="border rounded-2xl p-5 hover:shadow-lg transition"
          >
            <BedDouble size={36} />

            <h3 className="font-semibold mt-4">{room}</h3>

            <p className="text-gray-600">1 King Bed</p>
          </div>
        ))}

      </div>

    </section>
  );
}