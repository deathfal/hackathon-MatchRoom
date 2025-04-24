import BottomMenu from "../components/bottom-menu"

export default function Home() {
  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">BIENVENUE</h1>
          <p className="text-xl text-gray-700 md:text-2xl">User 29 !</p>
        </div>
        <div className="relative mr-16 lg:mr-15">
          <div className="h-16 w-16 rounded-full border-2 border-white overflow-hidden md:h-20 md:w-20">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="Profile"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {/* Reservations Section */}
        <section className="mb-6 md:mb-10">
          <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
            <h2 className="text-lg font-medium md:text-xl">Mes réservations</h2>
          </div>
          <div className="flex gap-3 md:gap-4 lg:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="min-w-[160px] md:min-w-[220px] lg:min-w-[260px] xl:min-w-[300px] flex-shrink-0 snap-center rounded-lg overflow-hidden border border-gray-300">
                <div className="relative h-24 md:h-32 lg:h-40">
                  <img
                    src="/placeholder.svg?height=96&width=160"
                    alt="Hôtel"
                    className="object-cover h-full w-full"
                  />
                  <div className="absolute top-2 left-2 bg-white/80 text-xs px-1 rounded md:text-sm md:px-2">6:01 - 08:01</div>
                </div>
                <div className="p-2 text-sm md:p-3 md:text-base">
                  <p>Hôtel X, chambre Y</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Negotiations Section */}
        <section className="mb-6 md:mb-10">
          <h2 className="text-xl font-medium text-gray-800 mb-3 md:text-2xl">Mes négociations</h2>
          <div className="space-y-3 w-full">
            <div className="bg-yellow-300 rounded-full py-2 px-4 flex justify-between items-center md:py-3 md:px-6">
              <span className="md:text-lg">Hôtel XX - proposition $$</span>
              <span className="text-green-600 md:text-lg">✓</span>
            </div>
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-gray-800 text-white rounded-full py-2 px-4 flex justify-between items-center"
              >
                <span>Hôtel XX - proposition $$</span>
                <span>•••</span>
              </div>
            ))}
          </div>
        </section>

        {/* Suggestions Section */}
        <section className="mb-20 md:mb-16">
          <h2 className="text-xl font-medium text-gray-800 mb-3 md:text-2xl">Suggestions</h2>
          <div className="flex gap-3 md:gap-4 lg:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="min-w-[160px] md:min-w-[220px] lg:min-w-[260px] xl:min-w-[300px] flex-shrink-0 snap-center rounded-lg overflow-hidden border border-gray-300">
                <div className="relative h-24 md:h-32 lg:h-40">
                  <img
                    src="/placeholder.svg?height=96&width=160"
                    alt="Hôtel"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="p-2 text-sm md:p-3 md:text-base">
                  <p>Hôtel X</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Menu (imported as a separate component) */}
      <BottomMenu />
    </div>
  )
}
