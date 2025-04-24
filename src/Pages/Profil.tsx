"use client"

import { useState } from "react"
import { User, CreditCard, MessageCircle, Clock, ChevronLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"
import BottomMenu from "../components/bottom-menu"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Handle close
  const handleClose = () => {
    navigate(-1)
  }

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  // Navigation handler for activity items
  const handleActivityClick = (id: string) => {
    switch (id) {
      case "badges":
        navigate("/rewards")
        break
      case "favorites":
        navigate("/favorites")
        break
      // Pour le moment, les récits de voyage n'ont pas de page dédiée
      case "stories":
        // Peut-être à implémenter plus tard
        console.log("Page récits de voyage non implémentée")
        break
      default:
        break
    }
  }

  // Profile sections data
  const profileSections = [
    { id: "personal", name: "Données personnelles", icon: <User size={18} /> },
    { id: "payment", name: "Moyens de paiement", icon: <CreditCard size={18} /> },
    { id: "negotiations", name: "Mes négociations", icon: <MessageCircle size={18} /> },
    { id: "history", name: "Historique", icon: <Clock size={18} /> },
  ]

  // Category items data with path information
  const categoryItems = [
    { id: "badges", name: "Badges", icon: "🏆", path: "/rewards" },
    { id: "stories", name: "Récits de voyage", icon: "📝", path: "" },
    { id: "favorites", name: "Favoris", icon: "❤️", path: "/favorites" },
  ]

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
          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">PROFIL</h1>
            <p className="text-xl text-gray-700 md:text-2xl">User 29</p>
          </div>
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
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-2xl mx-auto w-full">
        {/* Profile User Info */}
        <section className="flex flex-col items-center mb-8 md:mb-10">
          <div className="mb-2 text-center">
            <h2 className="font-medium text-xl mb-1 text-gray-800">user29@example.com</h2>
            <p className="text-sm text-gray-600">Membre depuis Juin 2023</p>
          </div>
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full inline-block text-sm md:text-base">
            <span>★</span> Niveau Gold
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8 md:mb-10">
          <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-4 md:px-4 md:py-2">
            <h2 className="text-lg font-medium md:text-xl">Mes activités</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {categoryItems.map((item) => (
              <div 
                key={item.id} 
                className={`flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity ${item.path ? 'hover:scale-105' : ''}`}
                onClick={() => item.path && handleActivityClick(item.id)}
              >
                <div className="w-full aspect-square bg-gray-100 border border-gray-300 mb-2 rounded-lg overflow-hidden shadow-sm">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                    <span className="text-3xl md:text-4xl">{item.icon}</span>
                  </div>
                </div>
                <div className="text-center text-sm font-medium py-1 md:text-base">
                  {item.name}
                  {item.path && <span className="text-purple-600 ml-1">→</span>}
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* Profile Sections */}
        <section className="space-y-4 mb-20 md:mb-16">
          <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
            <h2 className="text-lg font-medium md:text-xl">Paramètres</h2>
          </div>
          
          {profileSections.map((section) => (
            <div key={section.id} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <button
                className="flex-1 bg-white hover:bg-gray-50 py-3 px-4 w-full flex justify-between items-center transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-800 text-amber-400 mr-3 flex items-center justify-center flex-shrink-0 rounded-full">
                    {section.icon}
                  </div>
                  <span className="font-medium">{section.name}</span>
                </div>
                <span className={`text-gray-500 transition-transform duration-200 ${expandedSection === section.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              {expandedSection === section.id && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  {section.id === "personal" && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Nom</label>
                          <div className="bg-white p-2 rounded border border-gray-300">User</div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">Prénom</label>
                          <div className="bg-white p-2 rounded border border-gray-300">29</div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Email</label>
                        <div className="bg-white p-2 rounded border border-gray-300">user29@example.com</div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Téléphone</label>
                        <div className="bg-white p-2 rounded border border-gray-300">+33 6 XX XX XX XX</div>
                      </div>
                      <button className="mt-2 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
                        Modifier
                      </button>
                    </div>
                  )}
                  
                  {section.id === "payment" && (
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-6 bg-blue-600 rounded mr-2"></div>
                          <span>Carte **** 5678</span>
                        </div>
                        <span className="text-sm text-gray-500">Par défaut</span>
                      </div>
                      <button className="mt-2 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                        + Ajouter un moyen de paiement
                      </button>
                    </div>
                  )}
                  
                  {section.id === "negotiations" && (
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Hôtel Paris Centre</span>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Accepté</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">135€/nuit - Du 15/06 au 18/06</div>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Hôtel Lyon Presqu'île</span>
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">En attente</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">110€/nuit - Du 22/07 au 25/07</div>
                      </div>
                    </div>
                  )}
                  
                  {section.id === "history" && (
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="font-medium">Hôtel Marseille Vieux Port</div>
                        <div className="text-sm text-gray-600 mt-1">05/03/2024 - 07/03/2024</div>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <div className="font-medium">Hôtel Nice Promenade</div>
                        <div className="text-sm text-gray-600 mt-1">15/01/2024 - 17/01/2024</div>
                      </div>
                      <button className="mt-2 text-purple-600 hover:text-purple-800 transition-colors text-sm flex items-center">
                        Voir tous mes séjours
                        <span className="ml-1">→</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

        </section>
      </main>

      {/* Bottom Menu */}
      <BottomMenu />
    </div>
  )
}
