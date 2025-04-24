"use client"

import { useState } from "react"
import { X, Search, Map, ChevronLeft, Star, Heart } from "lucide-react"
import { useNavigate } from "react-router-dom"
import BottomMenu from "../components/bottom-menu"

export default function HotelSearchPage() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState<"search" | "results" | "detail">("search")
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)

  // Form state
  const [searchForm, setSearchForm] = useState({
    query: "",
    dateArrival: "",
    dateDeparture: "",
    location: "",
    accommodationType: {
      camping: false,
      hotel: false,
    },
    people: {
      adults: 2,
      children: 0,
    },
    rooms: 1,
  })

  // Toggle dropdown
  const toggleDropdown = (dropdown: string) => {
    if (expandedDropdown === dropdown) {
      setExpandedDropdown(null)
    } else {
      setExpandedDropdown(dropdown)
    }
  }

  // Handle form changes
  const handleChange = (field: string, value: any) => {
    const fieldParts = field.split(".")

    if (fieldParts.length === 1) {
      setSearchForm({
        ...searchForm,
        [field]: value,
      })
    } else if (fieldParts.length === 2) {
      const [parent, child] = fieldParts
      setSearchForm({
        ...searchForm,
        [parent]: {
          [child]: value,
        },
      })
    }
  }

  // Handle search submission
  const handleSearch = () => {
    setCurrentScreen("results")
  }

  // Handle hotel selection
  const handleSelectHotel = () => {
    setCurrentScreen("detail")
  }

  // Handle back navigation
  const handleBack = () => {
    if (currentScreen === "detail") {
      setCurrentScreen("results")
    } else if (currentScreen === "results") {
      setCurrentScreen("search")
    } else {
      // Si on est déjà à l'écran de recherche, naviguer en arrière dans l'historique
      navigate(-1)
    }
  }

  // Handle map navigation
  const handleMapNavigation = () => {
    navigate('/maps')
  }

  // Render search form screen
  const renderSearchForm = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="bg-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              className="text-gray-700 rounded-full hover:bg-gray-100 p-1"
              onClick={handleBack}
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">RECHERCHE</h1>
              <p className="text-xl text-gray-700 md:text-2xl">Trouvez votre hôtel</p>
            </div>
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

        {/* Search Form */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Search Bar */}
          <div className="flex mb-6 shadow-sm rounded overflow-hidden">
            <input
              type="text"
              placeholder="Votre recherche"
              className="flex-1 border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchForm.query}
              onChange={(e) => handleChange("query", e.target.value)}
            />
            <button className="bg-purple-600 text-white px-4 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Date Inputs */}
          <section className="mb-6 md:mb-8">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Dates</h2>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'arrivée</label>
                <input
                  type="date"
                  placeholder="Date d'arrivée"
                  className="w-full bg-gray-100 border border-gray-300 p-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={searchForm.dateArrival}
                  onChange={(e) => handleChange("dateArrival", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
                <input
                  type="date"
                  placeholder="Date de départ"
                  className="w-full bg-gray-100 border border-gray-300 p-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={searchForm.dateDeparture}
                  onChange={(e) => handleChange("dateDeparture", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Location Input */}
          <section className="mb-6 md:mb-8">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Destination</h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <input
                type="text"
                placeholder="Code postal ou ville"
                className="w-full bg-gray-100 border border-gray-300 p-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={searchForm.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          </section>

          {/* Accommodation Type */}
          <section className="mb-6 md:mb-8">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Type d'hébergement</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 mr-2"
                  checked={searchForm.accommodationType.camping}
                  onChange={(e) => handleChange("accommodationType.camping", e.target.checked)}
                />
                Camping
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 mr-2"
                  checked={searchForm.accommodationType.hotel}
                  onChange={(e) => handleChange("accommodationType.hotel", e.target.checked)}
                />
                Hôtel
              </label>
            </div>
          </section>

          {/* People Dropdown */}
          <section className="mb-6 md:mb-8">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Voyageurs</h2>
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupants</label>
              <button
                className={`w-full p-3 flex justify-between items-center rounded border ${
                  expandedDropdown === "people" ? "bg-purple-100 border-purple-600" : "bg-gray-100 border-gray-300"
                } transition-colors`}
                onClick={() => toggleDropdown("people")}
              >
                <span>{searchForm.people.adults} adulte(s), {searchForm.people.children} enfant(s)</span>
                <span className={`transition-transform duration-200 ${expandedDropdown === "people" ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expandedDropdown === "people" && (
                <div className="mt-1 border border-gray-300 bg-white p-4 rounded shadow-md">
                  <div className="flex justify-between items-center mb-3">
                    <span>Adultes</span>
                    <div className="flex items-center">
                      <button 
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => handleChange("people.adults", Math.max(1, searchForm.people.adults - 1))}
                      >-</button>
                      <span className="mx-3">{searchForm.people.adults}</span>
                      <button 
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => handleChange("people.adults", searchForm.people.adults + 1)}
                      >+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Enfants</span>
                    <div className="flex items-center">
                      <button 
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => handleChange("people.children", Math.max(0, searchForm.people.children - 1))}
                      >-</button>
                      <span className="mx-3">{searchForm.people.children}</span>
                      <button 
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => handleChange("people.children", searchForm.people.children + 1)}
                      >+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Rooms Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de chambres</label>
              <button
                className={`w-full p-3 flex justify-between items-center rounded border ${
                  expandedDropdown === "rooms" ? "bg-purple-100 border-purple-600" : "bg-gray-100 border-gray-300"
                } transition-colors`}
                onClick={() => toggleDropdown("rooms")}
              >
                <span>{searchForm.rooms} chambre(s)</span>
                <span className={`transition-transform duration-200 ${expandedDropdown === "rooms" ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {expandedDropdown === "rooms" && (
                <div className="mt-1 border border-gray-300 bg-white p-4 rounded shadow-md">
                  <div className="flex justify-between items-center">
                    <span>Chambres</span>
                    <div className="flex items-center">
                      <button 
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => handleChange("rooms", Math.max(1, searchForm.rooms - 1))}
                      >-</button>
                      <span className="mx-3">{searchForm.rooms}</span>
                      <button 
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                        onClick={() => handleChange("rooms", searchForm.rooms + 1)}
                      >+</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Filters */}
          <section className="mb-6 md:mb-8">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Filtres</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="bg-purple-600 text-white text-sm px-3 py-1 rounded-md">Filtre 1</div>
              <div className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-md hover:bg-gray-300 transition-colors">Filtre 2</div>
              <div className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-md hover:bg-gray-300 transition-colors">Filtre 3</div>
              <div className="text-purple-600 text-sm flex items-center">
                Plus de filtres
                <span className="ml-1">→</span>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-20 md:mb-16">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Services</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[ 
                { name: "WiFi", icon: "📶" },
                { name: "Parking", icon: "🅿️" },
                { name: "Piscine", icon: "🏊" },
                { name: "Restaurant", icon: "🍽️" }
              ].map((service, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow text-center cursor-pointer">
                  <div className="text-3xl mb-1">{service.icon}</div>
                  <div className="text-sm">{service.name}</div>
                </div>
              ))}
            </div>
            <div className="text-right text-purple-600 mt-2 text-sm flex items-center justify-end">
              Voir tous les services 
              <span className="ml-1">→</span>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 border-t border-gray-300">
          <button 
            className="w-full bg-purple-600 text-white p-3 rounded font-medium hover:bg-purple-700 transition-colors"
            onClick={handleSearch}
          >
            Rechercher
          </button>
        </footer>
      </div>
    )
  }

  // Render search results screen
  const renderSearchResults = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="bg-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              className="text-gray-700 rounded-full hover:bg-gray-100 p-1"
              onClick={handleBack}
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">RÉSULTATS</h1>
              <p className="text-xl text-gray-700 md:text-2xl">Votre recherche</p>
            </div>
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

        {/* Results Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            <div className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center">
              Toulon
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </div>
            <div className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center">
              12/05 - 15/05
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </div>
            <div className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center">
              2 adultes
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </div>
            <div className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center">
              1 chambre
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </div>
          </div>

          {/* Hotel Results */}
          <section className="mb-20 md:mb-16">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Nos suggestions</h2>
            </div>
            <div className="space-y-4">
              {[ 
                { id: 1, name: "Hôtel Splendid", rating: 4.5, price: 120, distance: 0.8 },
                { id: 2, name: "Grand Hôtel", rating: 4.2, price: 95, distance: 1.2 },
                { id: 3, name: "Hôtel de la Mer", rating: 4.7, price: 150, distance: 0.5 },
                { id: 4, name: "Résidence du Port", rating: 3.9, price: 80, distance: 1.5 },
              ].map((hotel, index) => (
                <div 
                  key={hotel.id} 
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  onClick={handleSelectHotel}
                >
                  <div className="relative h-40 md:h-48 bg-gray-300">
                    {/* Placeholder pour l'image de l'hôtel */}
                    <div className="absolute top-2 right-2">
                      <Heart className="w-5 h-5 text-white stroke-2 hover:text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg">{hotel.name}</h3>
                      <div className="flex items-center bg-gray-800 text-amber-400 px-2 py-0.5 rounded">
                        <Star className="w-4 h-4 fill-amber-400 mr-1" />
                        <span className="text-sm">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span className="mr-3">{hotel.distance} km du centre</span>
                      {index % 2 === 0 && <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Promotion</span>}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm">À partir de</div>
                      <div className="text-lg font-bold text-purple-600">{hotel.price}€<span className="text-sm font-normal">/nuit</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Map Button (floating) */}
        <button 
          className="fixed bottom-20 right-4 z-10 bg-purple-600 text-white p-3 rounded-full shadow-lg"
          onClick={handleMapNavigation}
        >
          <Map className="w-5 h-5" />
        </button>
      </div>
    )
  }

  // Render hotel detail screen
  const renderHotelDetail = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <header className="bg-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              className="text-gray-700 rounded-full hover:bg-gray-100 p-1"
              onClick={handleBack}
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">DÉTAIL HÔTEL</h1>
              <p className="text-xl text-gray-700 md:text-2xl">Hôtel Splendid</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Heart className="w-5 h-5 stroke-2" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100">
            </button>
          </div>
        </header>

        {/* Detail Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          {/* Hotel Image Gallery */}
          <div className="relative h-48 md:h-64 bg-gray-300 rounded-lg mb-6 overflow-hidden">
            {/* Placeholder pour galerie d'images */}
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              1/5 photos
            </div>
          </div>
          
          {/* Hotel Info */}
          <section className="mb-6 md:mb-8">
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">Hôtel Splendid</h2>
                <div className="flex items-center bg-gray-800 text-amber-400 px-2 py-0.5 rounded">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>
              <p className="text-gray-600 mt-1">83000 Toulon · 0.8km du centre</p>
            </div>
            
            {/* Price */}
            <div className="bg-purple-50 border border-purple-100 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span>Prix par nuit</span>
                <span className="text-xl font-bold text-purple-600">120€</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">Prix total pour 3 nuits: 360€</div>
            </div>
          </section>

          {/* Services */}
          <section className="mb-6 md:mb-8">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Services inclus</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-800">✓</div>
                <span>WiFi gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-800">✓</div>
                <span>Climatisation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-800">✓</div>
                <span>TV</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-800">✓</div>
                <span>Parking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center text-gray-800">✓</div>
                <span>Piscine</span>
              </div>
            </div>
            <button className="text-purple-600 text-sm flex items-center mt-2">
              Voir tous les services
              <span className="ml-1">→</span>
            </button>
          </section>

          {/* Description */}
          <section className="mb-6 md:mb-8">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Description</h2>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Situé au cœur de Toulon, l'Hôtel Splendid vous offre confort et élégance à proximité des principales attractions touristiques. Notre établissement 4 étoiles dispose de chambres spacieuses et climatisées avec vue sur la mer ou sur la ville.
            </p>
            <button className="text-purple-600 text-sm flex items-center">
              Lire plus
              <span className="ml-1">→</span>
            </button>
          </section>

          {/* Reviews */}
          <section className="mb-20 md:mb-16">
            <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
              <h2 className="text-lg font-medium md:text-xl">Avis clients</h2>
            </div>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Marie D.</div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm ml-1">4.5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Personnel très accueillant, chambre propre et confortable. Je recommande vivement.</p>
              </div>
            </div>
            <button className="text-purple-600 text-sm flex items-center mt-2">
              Voir tous les avis
              <span className="ml-1">→</span>
            </button>
          </section>
        </main>

        {/* Footer with Action Button */}
        <footer className="bg-white p-4 border-t border-gray-300 shadow-lg">
          <button 
            className="w-full bg-purple-600 text-white p-3 rounded font-medium hover:bg-purple-700 transition-colors"
          >
            Réserver maintenant
          </button>
        </footer>

        {/* Map Button (floating) */}
        <button 
          className="fixed bottom-20 right-4 z-10 bg-purple-600 text-white p-3 rounded-full shadow-lg"
          onClick={handleMapNavigation}
        >
          <Map className="w-5 h-5" />
        </button>
      </div>
    )
  }

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case "search":
        return renderSearchForm()
      case "results":
        return renderSearchResults()
      case "detail":
        return renderHotelDetail()
      default:
        return renderSearchForm()
    }
  }

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col">
        {renderScreen()}
      </div>
      {/* Bottom Menu */}
      <BottomMenu />
    </div>
  )
}
