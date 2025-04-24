"use client"

import { useState } from "react"
import { X, Search as SearchIcon, Map, ChevronLeft, Star, Heart, Calendar, Users, Home, Zap, Sparkles } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

// Image par défaut pour les hôtels
const DEFAULT_HOTEL_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function HotelSearchPage() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState<"search" | "results" | "detail">("search")
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredHotel, setHoveredHotel] = useState<number | null>(null)

  // Form state
  const [searchForm, setSearchForm] = useState({
    query: "",
    dateArrival: "",
    dateDeparture: "",
    location: "",
    accommodationType: {
      camping: false,
      hotel: true,
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
          ...searchForm[parent as keyof typeof searchForm],
          [child]: value,
        },
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { opacity: 0 }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  }

  // Handle search submission
  const handleSearch = () => {
    setIsLoading(true)
    // Simuler un temps de chargement
    setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("results")
    }, 1000)
  }

  // Handle hotel selection
  const handleSelectHotel = () => {
    setIsLoading(true)
    // Simuler un temps de chargement
    setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("detail")
    }, 800)
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

  // Animation pour les filtres
  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
  }

  // Liste pour les résultats d'hôtels
  const hotelsList = [
    { id: 1, name: "Hôtel Splendid", rating: 4.5, price: 120, distance: 0.8, promotion: true, image: DEFAULT_HOTEL_IMAGE },
    { id: 2, name: "Grand Hôtel", rating: 4.2, price: 95, distance: 1.2, promotion: false, image: DEFAULT_HOTEL_IMAGE },
    { id: 3, name: "Hôtel de la Mer", rating: 4.7, price: 150, distance: 0.5, promotion: true, image: DEFAULT_HOTEL_IMAGE },
    { id: 4, name: "Résidence du Port", rating: 3.9, price: 80, distance: 1.5, promotion: false, image: DEFAULT_HOTEL_IMAGE },
  ]

  // Render search form screen
  const renderSearchForm = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header avec gradient */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 flex justify-between items-center shadow-lg"
        >
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-white/20 rounded-full p-2 backdrop-blur-sm"
              onClick={handleBack}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <div className="text-white">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl font-bold md:text-3xl"
              >
                RECHERCHE
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-xl md:text-2xl"
              >
                Trouvez votre hôtel
              </motion.p>
            </div>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="h-16 w-16 rounded-full border-2 border-white overflow-hidden shadow-lg md:h-20 md:w-20">
              <img
                src={DEFAULT_PROFILE_IMAGE}
                alt="Profile"
                className="object-cover h-full w-full"
              />
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1.5 shadow-md"
            >
              <Sparkles size={16} className="text-purple-800" />
            </motion.div>
          </motion.div>
        </motion.header>

        {/* Search Form */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
        >
          {/* Search Bar */}
          <motion.div 
            variants={itemVariants}
            custom={0}
            className="flex mb-6 shadow-md rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Rechercher un hôtel, une destination..."
              className="flex-1 border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={searchForm.query}
              onChange={(e) => handleChange("query", e.target.value)}
            />
            <button className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-4 flex items-center justify-center hover:from-purple-700 hover:to-indigo-800 transition-all">
              <SearchIcon className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Date Inputs */}
          <motion.section 
            variants={itemVariants}
            custom={1}
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Calendar size={18} />
                Dates
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'arrivée</label>
                <input
                  type="date"
                  placeholder="Date d'arrivée"
                  className="w-full bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                  value={searchForm.dateArrival}
                  onChange={(e) => handleChange("dateArrival", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date de départ</label>
                <input
                  type="date"
                  placeholder="Date de départ"
                  className="w-full bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                  value={searchForm.dateDeparture}
                  onChange={(e) => handleChange("dateDeparture", e.target.value)}
                />
              </div>
            </div>
          </motion.section>

          {/* Location Input */}
          <motion.section 
            variants={itemVariants}
            custom={2}
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Map size={18} />
                Destination
              </h2>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
              <input
                type="text"
                placeholder="Code postal ou ville"
                className="w-full bg-gray-100 border border-gray-300 p-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                value={searchForm.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>
          </motion.section>

          {/* Accommodation Type */}
          <motion.section 
            variants={itemVariants}
            custom={3}
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Home size={18} />
                Type d'hébergement
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              <motion.label 
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 mr-2"
                  checked={searchForm.accommodationType.camping}
                  onChange={(e) => handleChange("accommodationType.camping", e.target.checked)}
                />
                <span className={`${searchForm.accommodationType.camping ? 'text-purple-700 font-medium' : 'text-gray-700'} transition-colors`}>
                  Camping
                </span>
              </motion.label>
              <motion.label 
                className="flex items-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 mr-2"
                  checked={searchForm.accommodationType.hotel}
                  onChange={(e) => handleChange("accommodationType.hotel", e.target.checked)}
                />
                <span className={`${searchForm.accommodationType.hotel ? 'text-purple-700 font-medium' : 'text-gray-700'} transition-colors`}>
                  Hôtel
                </span>
              </motion.label>
            </div>
          </motion.section>

          {/* People Dropdown */}
          <motion.section 
            variants={itemVariants}
            custom={4}
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Users size={18} />
                Voyageurs
              </h2>
            </div>
            <div className="mb-4 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Occupants</label>
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                className={`w-full p-3 flex justify-between items-center rounded-lg border ${
                  expandedDropdown === "people" ? "bg-purple-100 border-purple-600" : "bg-gray-100 border-gray-300"
                } transition-all shadow-sm`}
                onClick={() => toggleDropdown("people")}
              >
                <span>{searchForm.people.adults} adulte(s), {searchForm.people.children} enfant(s)</span>
                <motion.span 
                  animate={{ rotate: expandedDropdown === "people" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500"
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {expandedDropdown === "people" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 border border-gray-300 bg-white p-4 rounded-lg shadow-md z-10 relative"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span>Adultes</span>
                      <div className="flex items-center">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => handleChange("people.adults", Math.max(1, searchForm.people.adults - 1))}
                        >-</motion.button>
                        <span className="mx-3 font-medium">{searchForm.people.adults}</span>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => handleChange("people.adults", searchForm.people.adults + 1)}
                        >+</motion.button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Enfants</span>
                      <div className="flex items-center">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => handleChange("people.children", Math.max(0, searchForm.people.children - 1))}
                        >-</motion.button>
                        <span className="mx-3 font-medium">{searchForm.people.children}</span>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => handleChange("people.children", searchForm.people.children + 1)}
                        >+</motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Rooms Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de chambres</label>
              <motion.button
                whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                className={`w-full p-3 flex justify-between items-center rounded-lg border ${
                  expandedDropdown === "rooms" ? "bg-purple-100 border-purple-600" : "bg-gray-100 border-gray-300"
                } transition-all shadow-sm`}
                onClick={() => toggleDropdown("rooms")}
              >
                <span>{searchForm.rooms} chambre(s)</span>
                <motion.span 
                  animate={{ rotate: expandedDropdown === "rooms" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-500"
                >
                  ▼
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {expandedDropdown === "rooms" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-1 border border-gray-300 bg-white p-4 rounded-lg shadow-md z-10 relative"
                  >
                    <div className="flex justify-between items-center">
                      <span>Chambres</span>
                      <div className="flex items-center">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => handleChange("rooms", Math.max(1, searchForm.rooms - 1))}
                        >-</motion.button>
                        <span className="mx-3 font-medium">{searchForm.rooms}</span>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          onClick={() => handleChange("rooms", searchForm.rooms + 1)}
                        >+</motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Filters */}
          <motion.section 
            variants={itemVariants}
            custom={5}
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Zap size={18} />
                Filtres rapides
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.div
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-sm px-3 py-1.5 rounded-md shadow-sm cursor-pointer"
              >
                Prix bas
              </motion.div>
              <motion.div
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 text-gray-800 text-sm px-3 py-1.5 rounded-md hover:bg-gray-300 shadow-sm cursor-pointer transition-colors"
              >
                Bien noté
              </motion.div>
              <motion.div
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-200 text-gray-800 text-sm px-3 py-1.5 rounded-md hover:bg-gray-300 shadow-sm cursor-pointer transition-colors"
              >
                Promotions
              </motion.div>
              <motion.div
                variants={filterVariants}
                className="text-purple-600 text-sm flex items-center hover:text-purple-800 transition-colors cursor-pointer"
              >
                Plus de filtres
                <span className="ml-1">→</span>
              </motion.div>
            </div>
          </motion.section>

          {/* Services */}
          <motion.section 
            variants={itemVariants}
            custom={6}
            className="mb-20 md:mb-16"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Sparkles size={18} />
                Services
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[ 
                { name: "WiFi", icon: "📶" },
                { name: "Parking", icon: "🅿️" },
                { name: "Piscine", icon: "🏊" },
                { name: "Restaurant", icon: "🍽️" }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 border border-gray-200 rounded-lg shadow-sm text-center bg-white cursor-pointer hover:border-purple-300 transition-colors"
                >
                  <div className="text-3xl mb-1">{service.icon}</div>
                  <div className="text-sm">{service.name}</div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="text-right text-purple-600 mt-2 text-sm flex items-center justify-end cursor-pointer"
            >
              Voir tous les services
              <span className="ml-1">→</span>
            </motion.div>
          </motion.section>
        </motion.main>

        {/* Footer */}
        <footer className="bg-white p-4 border-t border-gray-300 shadow-lg">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-800 shadow-md transition-all"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Recherche en cours...
              </div>
            ) : (
              "Rechercher"
            )}
          </motion.button>
        </footer>
      </div>
    )
  }

  // Render search results screen
  const renderSearchResults = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header avec gradient */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 flex justify-between items-center shadow-lg"
        >
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-white/20 rounded-full p-2 backdrop-blur-sm"
              onClick={handleBack}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <div className="text-white">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl font-bold md:text-3xl"
              >
                RÉSULTATS
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-xl md:text-2xl"
              >
                {searchForm.location || "Votre recherche"}
              </motion.p>
            </div>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <div className="h-16 w-16 rounded-full border-2 border-white overflow-hidden shadow-lg md:h-20 md:w-20">
              <img
                src={DEFAULT_PROFILE_IMAGE}
                alt="Profile"
                className="object-cover h-full w-full"
              />
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1.5 shadow-md"
            >
              <Sparkles size={16} className="text-purple-800" />
            </motion.div>
          </motion.div>
        </motion.header>

        {/* Results Content */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
        >
          {/* Filter Pills */}
          <motion.div 
            variants={itemVariants}
            custom={0}
            className="flex flex-wrap gap-2 mb-5"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center shadow-sm"
            >
              {searchForm.location || "Toulon"}
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center shadow-sm"
            >
              {searchForm.dateArrival || "12/05"} - {searchForm.dateDeparture || "15/05"}
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center shadow-sm"
            >
              {searchForm.people.adults} adultes
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-100 text-purple-800 text-xs px-3 py-1.5 rounded-full flex items-center shadow-sm"
            >
              {searchForm.rooms} chambre
              <button className="ml-1">
                <X size={12} className="text-purple-800" />
              </button>
            </motion.div>
          </motion.div>

          {/* Hotel Results */}
          <motion.section 
            variants={itemVariants}
            custom={1}
            className="mb-20 md:mb-16"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-4 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Sparkles size={18} />
                Nos suggestions
              </h2>
            </div>
            <motion.div 
              variants={containerVariants}
              className="space-y-4"
            >
              {hotelsList.map((hotel, index) => (
                <motion.div 
                  key={hotel.id} 
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                  }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={handleSelectHotel}
                  onHoverStart={() => setHoveredHotel(hotel.id)}
                  onHoverEnd={() => setHoveredHotel(null)}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-40 sm:w-1/3 bg-gray-300">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="w-5 h-5 text-red-500 hover:fill-red-500 cursor-pointer transition-colors" />
                      </motion.div>
                      {hotel.promotion && (
                        <div className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-0.5 rounded shadow-sm">
                          Promotion
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 sm:w-2/3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{hotel.name}</h3>
                        <div className="flex items-center bg-gray-800 text-amber-400 px-2 py-0.5 rounded">
                          <Star className="w-4 h-4 fill-amber-400 mr-1" />
                          <span className="text-sm">{hotel.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="mr-3">{hotel.distance} km du centre</span>
                        {hotel.promotion && <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">-15%</span>}
                      </div>
                      <div className="mt-2 space-x-1">
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Wifi</span>
                        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Parking</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm">À partir de</div>
                        <div className="text-lg font-bold text-purple-600">{hotel.price}€<span className="text-sm font-normal">/nuit</span></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </motion.main>

        {/* Map Button (floating) */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-20 right-4 z-10 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-3 rounded-full shadow-lg"
          onClick={handleMapNavigation}
        >
          <Map className="w-5 h-5" />
        </motion.button>
      </div>
    )
  }

  // Render hotel detail screen
  const renderHotelDetail = () => {
    return (
      <div className="flex flex-col h-full">
        {/* Header avec gradient */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 flex justify-between items-center shadow-lg"
        >
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-white/20 rounded-full p-2 backdrop-blur-sm"
              onClick={handleBack}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <div className="text-white">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl font-bold md:text-3xl"
              >
                DÉTAIL HÔTEL
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-xl md:text-2xl"
              >
                Hôtel Splendid
              </motion.p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-white/20 rounded-full p-2 backdrop-blur-sm"
            >
              <Heart className="w-5 h-5 stroke-2" />
            </motion.button>
          </div>
        </motion.header>

        {/* Detail Content */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto"
        >
          {/* Hotel Image Gallery */}
          <motion.div 
            variants={itemVariants}
            custom={0}
            className="relative h-48 md:h-64 bg-gray-300 rounded-lg mb-6 overflow-hidden shadow-md"
          >
            {/* Image de l'hôtel */}
            <img 
              src={DEFAULT_HOTEL_IMAGE} 
              alt="Hôtel Splendid"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
              1/5 photos
            </div>
          </motion.div>
          
          {/* Hotel Info */}
          <motion.section 
            variants={itemVariants}
            custom={1}
            className="mb-6 md:mb-8"
          >
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">Hôtel Splendid</h2>
                <div className="flex items-center bg-gray-800 text-amber-400 px-2 py-0.5 rounded-md shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 mr-1" />
                  <span className="text-sm">4.5</span>
                </div>
              </div>
              <p className="text-gray-600 mt-1">83000 Toulon · 0.8km du centre</p>
            </div>
            
            {/* Price */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 p-3 rounded-lg shadow-sm overflow-hidden relative">
              <motion.div 
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-indigo-700"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              />
              <div className="flex justify-between items-center">
                <span>Prix par nuit</span>
                <span className="text-xl font-bold text-purple-600">120€</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">Prix total pour 3 nuits: 360€</div>
            </div>
          </motion.section>

          {/* Services */}
          <motion.section 
            variants={itemVariants}
            custom={2}
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Sparkles size={18} />
                Services inclus
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              <motion.div 
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">✓</div>
                <span>WiFi gratuit</span>
              </motion.div>
              <motion.div 
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">✓</div>
                <span>Climatisation</span>
              </motion.div>
              <motion.div 
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">✓</div>
                <span>TV</span>
              </motion.div>
              <motion.div 
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">✓</div>
                <span>Parking</span>
              </motion.div>
              <motion.div 
                variants={filterVariants}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">✓</div>
                <span>Piscine</span>
              </motion.div>
            </div>
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-purple-600 text-sm flex items-center mt-2 cursor-pointer"
            >
              Voir tous les services
              <span className="ml-1">→</span>
            </motion.button>
          </motion.section>

          {/* Description */}
          <motion.section 
            variants={itemVariants}
            custom={3}
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <span className="text-xl mr-1">📝</span>
                Description
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Situé au cœur de Toulon, l'Hôtel Splendid vous offre confort et élégance à proximité des principales attractions touristiques. Notre établissement 4 étoiles dispose de chambres spacieuses et climatisées avec vue sur la mer ou sur la ville.
            </p>
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-purple-600 text-sm flex items-center cursor-pointer"
            >
              Lire plus
              <span className="ml-1">→</span>
            </motion.button>
          </motion.section>

          {/* Reviews */}
          <motion.section 
            variants={itemVariants}
            custom={4}
            className="mb-20 md:mb-16"
          >
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 inline-block mb-3 md:px-4 md:py-2 rounded-lg shadow-md">
              <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                <Star size={18} />
                Avis clients
              </h2>
            </div>
            <div className="space-y-4">
              <motion.div 
                variants={filterVariants}
                whileHover={{ y: -3 }}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">Marie D.</div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="text-sm ml-1">4.5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Personnel très accueillant, chambre propre et confortable. Je recommande vivement.</p>
              </motion.div>
            </div>
            <motion.button 
              whileHover={{ x: 5 }}
              className="text-purple-600 text-sm flex items-center mt-2 cursor-pointer"
            >
              Voir tous les avis
              <span className="ml-1">→</span>
            </motion.button>
          </motion.section>
        </motion.main>

        {/* Footer with Action Button */}
        <footer className="bg-white p-4 border-t border-gray-300 shadow-lg">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-3 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-800 shadow-md transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Chargement...
              </div>
            ) : (
              "Réserver maintenant"
            )}
          </motion.button>
        </footer>

        {/* Map Button (floating) */}
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-20 right-4 z-10 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-3 rounded-full shadow-lg"
          onClick={handleMapNavigation}
        >
          <Map className="w-5 h-5" />
        </motion.button>
      </div>
    )
  }

  // Écran de chargement
  const renderLoadingScreen = () => (
    <div className="flex-1 flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 mb-4">
        <div className="w-full h-full border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-600 font-medium"
      >
        Recherche des meilleurs établissements...
      </motion.p>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 0.5, duration: 3 }}
        className="h-1 bg-purple-600 rounded-full mt-4 max-w-xs"
      />
    </div>
  )

  // Render current screen
  const renderScreen = () => {
    if (isLoading) {
      return renderLoadingScreen()
    }

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
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </div>
      {/* Bottom Menu */}
      <BottomMenu />
    </div>
  )
}
