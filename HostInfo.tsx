import {
  Home,
  KeyRound,
  Wifi,
  BriefcaseBusiness,
  CircleUserRound,
} from "lucide-react";

export default function HostInfo() {
  return (
    <section>

      <div className="flex justify-between items-center border-b pb-6">

        <div>
          <h2 className="text-3xl font-semibold">
            Entire villa hosted by Meena
          </h2>

          <p className="mt-2 text-gray-600">
            8 guests · 4 bedrooms · 5 beds · 3 bathrooms
          </p>
        </div>

        <CircleUserRound size={52} />
      </div>

      <div className="space-y-8 mt-8">

        <div className="flex gap-5">
          <Home />
          <div>
            <h3 className="font-semibold">Entire home</h3>
            <p className="text-gray-600">
              You'll have the villa to yourself.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <KeyRound />
          <div>
            <h3 className="font-semibold">Self check-in</h3>
            <p className="text-gray-600">
              Check yourself in with keypad.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <Wifi />
          <div>
            <h3 className="font-semibold">Fast Wi-Fi</h3>
            <p className="text-gray-600">
              100 Mbps Wi-Fi available throughout the villa.
            </p>
          </div>
        </div>

        <div className="flex gap-5">
          <BriefcaseBusiness />
          <div>
            <h3 className="font-semibold">Dedicated workspace</h3>
            <p className="text-gray-600">
              A private room with desk and chair for working.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}