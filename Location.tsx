export default function Location() {
  return (
    <section className="mt-12 border-t pt-8">

      <h2 className="text-2xl font-semibold mb-6">
        Where you'll be
      </h2>

      <div className="rounded-2xl overflow-hidden border">

        <iframe
          src="https://maps.google.com/maps?q=Goa&t=&z=11&ie=UTF8&iwloc=&output=embed"
          className="w-full h-96"
          loading="lazy"
        />

      </div>

      <p className="mt-4 text-gray-600">
        Goa, India
      </p>

    </section>
  );
}