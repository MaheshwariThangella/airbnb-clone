export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h3 className="font-semibold mb-4">Support</h3>

          <ul className="space-y-2 text-gray-600">
            <li>Help Center</li>
            <li>Safety information</li>
            <li>Cancellation options</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Hosting</h3>

          <ul className="space-y-2 text-gray-600">
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Airbnb</h3>

          <ul className="space-y-2 text-gray-600">
            <li>Newsroom</li>
            <li>Careers</li>
            <li>Investors</li>
          </ul>
        </div>

      </div>

      <div className="border-t py-5 text-center text-gray-500 text-sm">
        © 2026 Airbnb Clone — Built with Next.js + Tailwind CSS.
      </div>

    </footer>
  );
}