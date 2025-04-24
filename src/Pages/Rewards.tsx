"use client"

import { useState } from "react"
import { X, Star, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import BottomMenu from "../components/bottom-menu"

export default function RewardsPage() {
  const [isOpen, setIsOpen] = useState(true)
  const navigate = useNavigate()

  // Advantages data
  const advantages = [
    { id: 1, name: "Réduction 10%", stars: 3, description: "Sur votre prochaine réservation" },
    { id: 2, name: "Surclassement", stars: 3, description: "Chambre supérieure sans frais" },
    { id: 3, name: "Check-out tardif", stars: 2, description: "Jusqu'à 14h00" },
    { id: 4, name: "Petit-déjeuner", stars: 1, description: "Offert pour deux personnes" },
    { id: 5, name: "WiFi premium", stars: 1, description: "Accès haute vitesse" },
  ]

  // Handle close
  const handleClose = () => {
    navigate(-1)
  }

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button 
            className="text-gray-700 rounded-full hover:bg-gray-100 p-1"
            onClick={handleClose}
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">VOS RÉCOMPENSES</h1>
        </div>
        <div className="relative mr-16 lg:mr-20">
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
        {/* Points and status section */}
        <section className="bg-purple-600 text-white rounded-lg p-6 mb-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Programme fidélité</h2>
            <div className="bg-yellow-400 text-black font-bold rounded-full px-3 py-1">
              GOLD
            </div>
          </div>
          <div className="mb-3">
            <div className="flex justify-between mb-1">
              <span>Vos points</span>
              <span className="font-bold">2850 pts</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full">
              <div className="bg-yellow-400 h-full rounded-full" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between mt-1 text-sm">
              <span>0</span>
              <span>Prochain niveau: 3500 pts</span>
            </div>
          </div>
        </section>

        {/* Avantages disponibles */}
        <section className="mb-6 md:mb-10">
          <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
            <h2 className="text-lg font-medium md:text-xl">Vos avantages</h2>
          </div>

          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 lg:grid-cols-3">
            {advantages.map((advantage) => (
              <div key={advantage.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-800">{advantage.name}</h3>
                  <div className="flex">
                    {[...Array(advantage.stars)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{advantage.description}</p>
                <button className="mt-3 w-full bg-gray-800 hover:bg-gray-700 text-amber-400 py-1.5 rounded text-sm font-medium transition-colors">
                  Utiliser
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Historique */}
        <section className="mb-20 md:mb-16">
          <h2 className="text-xl font-medium text-gray-800 mb-3 md:text-2xl">Historique des points</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">15/06/2024</td>
                  <td className="px-4 py-3 text-sm text-gray-800">Séjour Hôtel Paris</td>
                  <td className="px-4 py-3 text-sm text-gray-800 text-right text-green-600">+250</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">03/05/2024</td>
                  <td className="px-4 py-3 text-sm text-gray-800">Utilisation réduction</td>
                  <td className="px-4 py-3 text-sm text-gray-800 text-right text-red-600">-100</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">22/04/2024</td>
                  <td className="px-4 py-3 text-sm text-gray-800">Séjour Hôtel Lyon</td>
                  <td className="px-4 py-3 text-sm text-gray-800 text-right text-green-600">+180</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm text-gray-800">05/03/2024</td>
                  <td className="px-4 py-3 text-sm text-gray-800">Séjour Hôtel Marseille</td>
                  <td className="px-4 py-3 text-sm text-gray-800 text-right text-green-600">+220</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Bottom Menu */}
      <BottomMenu />
    </div>
  )
}
