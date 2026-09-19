import Image from "next/image";
import FeatureItem from "./FeatureItem";

import {
  Home,
  KeyRound,
  Wifi,
  Briefcase,
} from "lucide-react";

export default function PropertyInfo() {
  return (
    <div className="w-full">

      {/* Host Section */}

      <div className="flex justify-between items-center border-b border-gray-200 pb-8">

        <div>
          <h2 className="text-2xl font-semibold">
            Entire villa hosted by Meena
          </h2>

          <p className="text-gray-600 mt-2">
            8 guests · 4 bedrooms · 5 beds · 3 bathrooms
          </p>
        </div>

        <Image
  src="/images/host.jpg"
  alt="Host"
  width={72}
  height={72}
  className="rounded-full object-cover"
/>
      </div>

      {/* Features */}

      <FeatureItem
        icon={<Home size={24} />}
        title="Entire home"
        subtitle="You'll have the villa to yourself."
      />

      <FeatureItem
        icon={<KeyRound size={24} />}
        title="Self check-in"
        subtitle="Check yourself in with the keypad."
      />

      <FeatureItem
        icon={<Wifi size={24} />}
        title="Fast Wi-Fi"
        subtitle="100 Mbps Wi-Fi available throughout the villa."
      />

      <FeatureItem
        icon={<Briefcase size={24} />}
        title="Dedicated workspace"
        subtitle="A private room with desk and chair for working."
      />

      {/* Description */}

      <div className="py-8 border-b border-gray-200">
        <p className="text-[16px] leading-8 text-gray-700">
          Relax with the whole family at this peaceful luxury villa in Goa.
          Enjoy a private infinity pool, spacious bedrooms, a modern kitchen,
          high-speed Wi-Fi, and breathtaking sunset views. Perfect for family
          vacations, workations, and weekend getaways.
        </p>

        <button className="underline font-semibold mt-5">
          Show more
        </button>
      </div>

    </div>
  );
}