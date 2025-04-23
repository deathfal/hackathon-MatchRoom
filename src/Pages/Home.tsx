"use client"

import { useState } from "react"
import { Search, Bell } from "lucide-react"

export default function SketchRoom() {
  const [searchQuery, setSearchQuery] = useState("")

  // Données des réservations d'hôtel
  const reservations = [
    { id: 1, name: "Hôtel X, chambre Y" },
    { id: 2, name: "Hôtel X, chambre Y" },
    { id: 3, name: "Hôtel X, chambre Y" },
    { id: 4, name: "Hôtel X, chambre Y" },
  ]

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col md:max-w-3xl lg:max-w-4xl">
      {/* Header with logo and search */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-blue-900 rounded-full p-2 mr-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6L7 12H17L12 6Z" fill="white" />
              <path
                d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="font-bold text-lg">SketchRoom</span>
        </div>
        <div className="relative flex-1 max-w-xs mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1"
            placeholder="Rechercher..."
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search size={18} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Welcome message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold uppercase">BIENVENUE</h1>
          <p className="text-xl">User 29 !</p>
        </div>

        {/* Reservations */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Mes réservations</h2>

          {/* Horizontal scrollable reservations */}
          <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex-shrink-0 w-40 border border-gray-200 rounded-md overflow-hidden"
              >
                <div className="relative">
                  <img src="/placeholder.svg?height=100&width=160" alt="Hotel" className="w-full h-24 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-1">
                    <p className="text-xs">{reservation.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input field */}
          <div className="mt-8 mb-6 flex items-center">
            <input
              type="text"
              className="w-full md:w-64 border border-gray-300 rounded px-3 py-2"
              placeholder="Message..."
            />
            <div className="ml-4">
              <div className="w-10 h-10 rounded-full border border-gray-300"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div></div>
          <div className="flex items-center">
            <div className="bg-yellow-300 rounded-full p-2 mr-4">
              <Bell size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img src="/placeholder.svg?height=40&width=40" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
