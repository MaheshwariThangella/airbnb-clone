import Navbar from "@/components/Navbar";
import HeroGallery from "@/components/HeroGallery";
import HostInfo from "@/components/HostInfo";
import PropertyInfo from "@/components/PropertyInfo";
import AboutSection from "@/components/AboutSection";
import Amenities from "@/components/Amenities";
import SleepSection from "@/components/SleepSection";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import BookingCard from "@/components/BookingCard";

export default function VillaPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-6">
        <h1 className="text-4xl font-bold mb-2">Luxury Villa with Pool</h1>

        <p className="text-sm mb-6">
          ⭐ 4.95 · 132 reviews · Goa, India
        </p>

        <HeroGallery />

        <div className="grid lg:grid-cols-[2fr_420px] gap-12 mt-10">
          <div className="space-y-10">
            <HostInfo />
            <PropertyInfo />
            <AboutSection />
            <Amenities />
            <SleepSection />
            <Reviews />
            <Location />
          </div>

          <div className="sticky top-24 h-fit">
            <BookingCard />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}