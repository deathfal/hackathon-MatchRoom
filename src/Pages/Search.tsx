"use client"

import { useState, useRef, useEffect } from "react"
import { 
  X, Search as SearchIcon, Map, ChevronLeft, ChevronRight, Star, Heart, Calendar, 
  Users, Home, Zap, Sparkles, Check, Filter, Clock, Coffee, Wifi, Globe, Phone,
  MapPin, ArrowRight, ShowerHead, Utensils, Palmtree, Building
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useAnimation, useInView } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

const DEFAULT_HOTEL_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

const WaveBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 30%, rgba(79, 70, 229, 0.3) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(124, 58, 237, 0.3) 0%, transparent 30%)
          `,
          backgroundSize: "200% 200%"
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default function HotelSearchPage() {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState<"search" | "results" | "detail">("search")
  const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hoveredHotel, setHoveredHotel] = useState<number | null>(null)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showMap, setShowMap] = useState(true);
  const controls = useAnimation()
  const searchRef = useRef(null)
  const isInView = useInView(searchRef, { once: true })

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

  const toggleDropdown = (dropdown: string) => {
    if (expandedDropdown === dropdown) {
      setExpandedDropdown(null)
    } else {
      setExpandedDropdown(dropdown)
    }
  }

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

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

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
    exit: { 
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }),
    exit: { 
      y: -20, 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  }

  const hotelImages = [
    DEFAULT_HOTEL_IMAGE,
    DEFAULT_HOTEL_IMAGE+"&sig=1",
    DEFAULT_HOTEL_IMAGE+"&sig=2",
    DEFAULT_HOTEL_IMAGE+"&sig=3",
    DEFAULT_HOTEL_IMAGE+"&sig=4",
  ]

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("results")
    }, 1000)
  }

  const handleSelectHotel = (hotelId = 1) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setCurrentScreen("detail")
    }, 800)
  }

  const handleBack = () => {
    if (currentScreen === "detail") {
      setCurrentScreen("results")
    } else if (currentScreen === "results") {
      setCurrentScreen("search")
    } else {
      navigate(-1)
    }
  }

  const handleMapNavigation = () => {
    navigate('/maps')
  }

  const nextPhoto = () => {
    setActivePhotoIndex((prev) => 
      prev === hotelImages.length - 1 ? 0 : prev + 1
    )
  }
  
  const prevPhoto = () => {
    setActivePhotoIndex((prev) => 
      prev === 0 ? hotelImages.length - 1 : prev - 1
    )
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } }
  }

  const hotelsList = [
    { id: 1, name: "Hôtel Splendid", rating: 4.5, price: 120, distance: 0.8, promotion: true, image: DEFAULT_HOTEL_IMAGE, services: ["wifi", "parking", "piscine"] },
    { id: 2, name: "Grand Hôtel", rating: 4.2, price: 95, distance: 1.2, promotion: false, image: DEFAULT_HOTEL_IMAGE+"&sig=1", services: ["wifi", "restaurant"] },
    { id: 3, name: "Hôtel de la Mer", rating: 4.7, price: 150, distance: 0.5, promotion: true, image: DEFAULT_HOTEL_IMAGE+"&sig=2", services: ["wifi", "piscine", "spa"] },
    { id: 4, name: "Résidence du Port", rating: 3.9, price: 80, distance: 1.5, promotion: false, image: DEFAULT_HOTEL_IMAGE+"&sig=3", services: ["wifi", "parking"] },
  ]

  const serviceIcons: Record<string, JSX.Element> = {
    wifi: <Wifi size={16} className="mr-1" />,
    parking: <MapPin size={16} className="mr-1" />,
    piscine: <ShowerHead size={16} className="mr-1" />,
    restaurant: <Utensils size={16} className="mr-1" />,
    spa: <Palmtree size={16} className="mr-1" />
  }

  const renderSearchForm = () => {
    return (
      <div className="flex flex-col h-full relative">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 p-6 flex justify-between items-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"] 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{
                backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 20%)"
              }}
            />
          </div>

          <div className="flex items-center gap-3 z-10">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-white/20 rounded-full p-2.5 backdrop-blur-sm"
              onClick={handleBack}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <div className="text-white">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl font-bold md:text-3xl tracking-wide"
              >
                RECHERCHE
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-lg md:text-xl"
              >
                Trouvez votre hôtel idéal
              </motion.p>
            </div>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative z-10 mr-0 md:mr-15"
          >
            <div className="h-16 w-16 rounded-full border-2 border-white overflow-hidden shadow-xl md:h-18 md:w-18">
              <img
                src={DEFAULT_PROFILE_IMAGE}
                alt="Profile"
                className="object-cover h-full w-full"
              />
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1.5 shadow-md"
            >
              <Sparkles size={16} className="text-purple-800" />
            </motion.div>
          </motion.div>
        </motion.header>

        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto relative"
          ref={searchRef}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-medium text-gray-800">Où souhaitez-vous aller ?</h2>
            <p className="text-gray-500 mt-1">Remplissez le formulaire ci-dessous pour trouver votre hôtel parfait</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            custom={0}
            className="mb-8 relative"
          >
            <div className="relative flex overflow-hidden rounded-xl shadow-md bg-white border border-gray-100">
              <input
                type="text"
                placeholder="Paris, Marseille, Lyon..."
                className="flex-1 border-0 p-4 pl-12 bg-white focus:outline-none text-gray-800 placeholder-gray-400 z-10"
                value={searchForm.query}
                onChange={(e) => handleChange("query", e.target.value)}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                <SearchIcon className="w-5 h-5" />
              </div>
              <motion.div 
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 flex items-center justify-center"
              >
                <SearchIcon className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.div>

          <motion.section 
            variants={itemVariants}
            custom={1}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-lg shadow-md">
                <Calendar size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Dates</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 hover:border-purple-300 transition-colors duration-300">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700">Date d'arrivée</label>
                </div>
                <div className="p-4">
                  <input
                    type="date"
                    className="w-full border-0 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-md"
                    value={searchForm.dateArrival}
                    onChange={(e) => handleChange("dateArrival", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 hover:border-purple-300 transition-colors duration-300">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700">Date de départ</label>
                </div>
                <div className="p-4">
                  <input
                    type="date"
                    className="w-full border-0 p-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-md"
                    value={searchForm.dateDeparture}
                    onChange={(e) => handleChange("dateDeparture", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            custom={2}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-lg shadow-md">
                <MapPin size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Destination</h2>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 hover:border-purple-300 transition-colors duration-300">
              <div className="p-4 relative">
                <input
                  type="text"
                  placeholder="Saisissez une ville ou un code postal"
                  className="w-full border border-gray-200 p-3 pl-10 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
                  value={searchForm.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                />
                <Globe size={18} className="text-gray-400 absolute left-8 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            custom={3}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-lg shadow-md">
                <Building size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Type d'hébergement</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className={`rounded-xl overflow-hidden p-4 border-2 ${
                  searchForm.accommodationType.hotel 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 bg-white'
                } transition-all duration-300 cursor-pointer`}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChange("accommodationType.hotel", !searchForm.accommodationType.hotel)}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    searchForm.accommodationType.hotel 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Building size={24} />
                  </div>
                  <span className={`font-medium ${searchForm.accommodationType.hotel ? 'text-purple-700' : 'text-gray-700'}`}>
                    Hôtel
                  </span>
                  {searchForm.accommodationType.hotel && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      <Check size={12} className="mr-1" /> Sélectionné
                    </motion.div>
                  )}
                </div>
              </motion.div>
              
              <motion.div 
                className={`rounded-xl overflow-hidden p-4 border-2 ${
                  searchForm.accommodationType.camping 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 bg-white'
                } transition-all duration-300 cursor-pointer`}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleChange("accommodationType.camping", !searchForm.accommodationType.camping)}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    searchForm.accommodationType.camping 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-gray-100 text-gray-500'
                  }`}>
                    <Palmtree size={24} />
                  </div>
                  <span className={`font-medium ${searchForm.accommodationType.camping ? 'text-purple-700' : 'text-gray-700'}`}>
                    Camping
                  </span>
                  {searchForm.accommodationType.camping && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full flex items-center"
                    >
                      <Check size={12} className="mr-1" /> Sélectionné
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            variants={itemVariants}
            custom={4}
            className="mb-8"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-lg shadow-md">
                <Users size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Voyageurs & chambres</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700">Voyageurs</label>
                </div>
                <div className="p-4">
                  <motion.button
                    whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    className={`w-full p-3 flex justify-between items-center rounded-lg border ${
                      expandedDropdown === "people" ? "bg-purple-100 border-purple-600" : "bg-gray-50 border-gray-200"
                    } transition-all shadow-sm`}
                    onClick={() => toggleDropdown("people")}
                  >
                    <div className="flex items-center">
                      <Users size={18} className={`mr-2 ${expandedDropdown === "people" ? "text-purple-600" : "text-gray-500"}`} />
                      <span>{searchForm.people.adults} adulte(s), {searchForm.people.children} enfant(s)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <motion.span 
                        animate={{ rotate: expandedDropdown === "people" ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={expandedDropdown === "people" ? "text-purple-600" : "text-gray-500"}
                      >
                        ▼
                      </motion.span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {expandedDropdown === "people" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 border border-gray-200 bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Users size={16} className="mr-2 text-gray-500" />
                              <span>Adultes</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                onClick={() => handleChange("people.adults", Math.max(1, searchForm.people.adults - 1))}
                              >-</motion.button>
                              <span className="font-medium text-lg w-6 text-center">{searchForm.people.adults}</span>
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                onClick={() => handleChange("people.adults", searchForm.people.adults + 1)}
                              >+</motion.button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Users size={16} className="mr-2 text-gray-500" />
                              <span>Enfants</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                onClick={() => handleChange("people.children", Math.max(0, searchForm.people.children - 1))}
                              >-</motion.button>
                              <span className="font-medium text-lg w-6 text-center">{searchForm.people.children}</span>
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                onClick={() => handleChange("people.children", searchForm.people.children + 1)}
                              >+</motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <label className="block text-sm font-medium text-gray-700">Nombre de chambres</label>
                </div>
                <div className="p-4">
                  <motion.button
                    whileHover={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
                    className={`w-full p-3 flex justify-between items-center rounded-lg border ${
                      expandedDropdown === "rooms" ? "bg-purple-100 border-purple-600" : "bg-gray-50 border-gray-200"
                    } transition-all shadow-sm`}
                    onClick={() => toggleDropdown("rooms")}
                  >
                    <div className="flex items-center">
                      <Home size={18} className={`mr-2 ${expandedDropdown === "rooms" ? "text-purple-600" : "text-gray-500"}`} />
                      <span>{searchForm.rooms} chambre(s)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <motion.span 
                        animate={{ rotate: expandedDropdown === "rooms" ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={expandedDropdown === "rooms" ? "text-purple-600" : "text-gray-500"}
                      >
                        ▼
                      </motion.span>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {expandedDropdown === "rooms" && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 border border-gray-200 bg-white rounded-lg shadow-md overflow-hidden"
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Home size={16} className="mr-2 text-gray-500" />
                              <span>Chambres</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                onClick={() => handleChange("rooms", Math.max(1, searchForm.rooms - 1))}
                              >-</motion.button>
                              <span className="font-medium text-lg w-6 text-center">{searchForm.rooms}</span>
                              <motion.button 
                                whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
                                whileTap={{ scale: 0.9 }}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                                onClick={() => handleChange("rooms", searchForm.rooms + 1)}
                              >+</motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>
          
          <motion.section 
            variants={itemVariants}
            custom={5}
            className="mb-8"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              className="flex flex-wrap gap-2 mb-4"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                <span>Plus de filtres</span>
                <motion.span 
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▼
                </motion.span>
              </motion.button>
            </motion.div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl overflow-hidden shadow-md bg-white border border-gray-100 mb-6"
                >
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <h3 className="font-medium">Filtres</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: "wifi", name: "WiFi", icon: <Wifi size={14} /> },
                        { id: "parking", name: "Parking", icon: <MapPin size={14} /> },
                        { id: "restaurant", name: "Restaurant", icon: <Utensils size={14} /> },
                        { id: "pool", name: "Piscine", icon: <ShowerHead size={14} /> },
                        { id: "priceAsc", name: "Prix croissant", icon: <ArrowRight size={14} /> },
                        { id: "promo", name: "Promotions", icon: <Zap size={14} /> },
                      ].map(filter => (
                        <motion.button
                          key={filter.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 text-sm px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
                        >
                          {filter.icon}
                          <span>{filter.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
          
          <motion.section 
            variants={itemVariants}
            custom={6}
            className="mb-24 md:mb-20"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-2 rounded-lg shadow-md">
                <Sparkles size={18} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Services populaires</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[ 
                { id: "wifi", name: "WiFi", icon: <Wifi size={24} className="text-purple-600" /> },
                { id: "parking", name: "Parking", icon: <MapPin size={24} className="text-purple-600" /> },
                { id: "pool", name: "Piscine", icon: <ShowerHead size={24} className="text-purple-600" /> },
                { id: "restaurant", name: "Restaurant", icon: <Utensils size={24} className="text-purple-600" /> },
                { id: "coffee", name: "Petit déjeuner", icon: <Coffee size={24} className="text-purple-600" /> },
                { id: "spa", name: "Spa", icon: <Palmtree size={24} className="text-purple-600" /> },
              ].map((service, index) => (
                <motion.div 
                  key={service.id}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f9fafb"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-xl overflow-hidden border border-gray-200 p-4 flex flex-col items-center justify-center bg-white cursor-pointer transition-all"
                >
                  <motion.div 
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="mb-2"
                  >
                    {service.icon}
                  </motion.div>
                  <p className="text-sm font-medium text-gray-700">{service.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.main>

        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white py-4 px-6 border-t border-gray-200 relative z-10"
        >
          <motion.button 
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
              backgroundImage: "linear-gradient(to right, #7c3aed, #6366f1)" 
            }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 px-8 rounded-xl font-medium text-lg text-white bg-gradient-to-r from-purple-700 to-indigo-700 shadow-lg flex items-center justify-center transition-all"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                />
                Recherche en cours...
              </div>
            ) : (
              <>
                <SearchIcon className="w-5 h-5 mr-2" />
                Rechercher
              </>
            )}
          </motion.button>
        </motion.footer>
      </div>
    )
  }

  const renderSearchResults = () => {
    return (
      <div className="flex flex-col h-full">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 p-6 flex justify-between items-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"] 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{
                backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 20%)"
              }}
            />
          </div>

          <div className="flex items-center gap-3 z-10">
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-white/20 rounded-full p-2.5 backdrop-blur-sm"
              onClick={handleBack}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <div className="text-white">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-2xl font-bold md:text-3xl tracking-wide"
              >
                RÉSULTATS
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-lg md:text-xl"
              >
                {searchForm.location || "Votre recherche"}
              </motion.p>
            </div>
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative z-10 mr-0 md:mr-15"
          >
            <div className="h-16 w-16 rounded-full border-2 border-white overflow-hidden shadow-lg md:h-18 md:w-18">
              <img
                src={DEFAULT_PROFILE_IMAGE}
                alt="Profile"
                className="object-cover h-full w-full"
              />
            </div>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1.5 shadow-md"
            >
              <Sparkles size={16} className="text-white" />
            </motion.div>
          </motion.div>
        </motion.header>

        <div className="sticky top-0 z-20 bg-white px-4 py-3 shadow-md border-b border-gray-100">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-lg mx-auto"
          >
            <input 
              type="text" 
              placeholder="Affiner votre recherche..." 
              className="w-full px-4 py-2.5 pl-10 pr-10 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <motion.button 
              whileHover={{ scale: 1.1, backgroundColor: "#e5e7eb" }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-1.5 transition-colors"
            >
              <Filter size={16} />
            </motion.button>
          </motion.div>
        </div>

        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1 p-5 md:p-6 lg:p-8 overflow-y-auto"
        >
          <motion.div 
            variants={itemVariants}
            custom={0}
            className="flex flex-wrap gap-2 mb-5 pb-4 border-b border-gray-100"
          >
            {[
              { id: "location", label: searchForm.location || "Toulon" },
              { id: "dates", label: `${searchForm.dateArrival || "12/05"} - ${searchForm.dateDeparture || "15/05"}` },
              { id: "people", label: `${searchForm.people.adults} adultes` },
              { id: "rooms", label: `${searchForm.rooms} chambre${searchForm.rooms > 1 ? 's' : ''}` }
            ].map((pill, index) => (
              <motion.div 
                key={pill.id}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 text-purple-700 text-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
              >
                <span>{pill.label}</span>
                <button className="ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors">
                  <X size={12} className="text-purple-600" />
                </button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            custom={1}
            className="flex flex-wrap gap-2 mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-sm px-4 py-2 rounded-full shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <ArrowRight size={14} className="rotate-180" />
              <span>Prix bas</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2 rounded-full shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Star size={14} />
              <span>Bien noté</span>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 text-sm px-4 py-2 rounded-full shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Zap size={14} />
              <span>Promotions</span>
            </motion.div>
            
            <motion.div
              whileHover={{ x: 3 }}
              className="text-purple-600 hover:text-purple-800 text-sm flex items-center gap-1 cursor-pointer ml-2 transition-colors"
            >
              <span>Plus de filtres</span>
              <ChevronRight size={16} />
            </motion.div>
          </motion.div>

          <motion.section 
            variants={itemVariants}
            custom={2}
            className="mb-20"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-1.5 rounded-lg shadow-sm inline-flex items-center gap-1.5">
                <Sparkles size={16} />
                <h2 className="text-lg font-medium">Résultats</h2>
              </div>
              <p className="text-sm text-gray-600">{hotelsList.length} établissements trouvés</p>
            </motion.div>

            <div className="space-y-5">
              {hotelsList.map((hotel, i) => (
                <motion.div 
                  key={hotel.id} 
                  custom={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: 0.3 + (i * 0.1),
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    },
                    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
                  }}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={handleSelectHotel}
                  onHoverStart={() => setHoveredHotel(hotel.id)}
                  onHoverEnd={() => setHoveredHotel(null)}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-48 sm:w-1/3 sm:h-auto bg-gray-200">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Ajouté aux favoris');
                        }}
                        className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10"
                      >
                        <Heart className={`w-5 h-5 ${hoveredHotel === hotel.id ? "text-red-500 fill-red-500" : "text-gray-600"} transition-colors`} />
                      </motion.button>
                      {hotel.promotion && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1"
                        >
                          <Zap size={14} className="fill-white" />
                          <span className="font-medium">-15% aujourd'hui</span>
                        </motion.div>
                      )}
                    </div>
                    
                    <div className="p-5 flex-1 sm:w-2/3 flex flex-col">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg text-gray-900">{hotel.name}</h3>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin size={14} className="text-gray-400 mr-1" />
                            <span className="mr-3">{hotel.distance} km du centre</span>
                          </div>
                        </div>
                        <div className="flex items-center bg-gray-800 text-amber-400 px-2.5 py-1 rounded-lg">
                          <Star className="w-4 h-4 fill-amber-400 mr-1" />
                          <span className="text-sm font-medium">{hotel.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {hotel.services.map((service, idx) => (
                          <div key={idx} className="inline-flex items-center bg-purple-50 text-purple-700 text-xs px-2.5 py-1 rounded-full border border-purple-100">
                            {serviceIcons[service]}
                            <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4 flex justify-between items-end">
                        <div>
                          <p className="text-sm text-gray-500">Prix par nuit</p>
                          <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-purple-700">{hotel.price}€</span>
                            {hotel.promotion && (
                              <span className="ml-2 text-sm text-gray-500 line-through">{Math.round(hotel.price * 1.15)}€</span>
                            )}
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white px-4 py-2 rounded-lg font-medium shadow-sm flex items-center gap-1.5 transition-colors"
                        >
                          <span>Détails</span>
                          <ChevronRight size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.main>

      </div>
    )
  }

  const renderHotelDetail = () => {
    return (
      <div className="flex flex-col h-full">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-indigo-800 flex justify-between items-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 100%"] 
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              style={{
                backgroundImage: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 20%)"
              }}
            />
          </div>

          <div className="relative w-full h-64 md:h-72 lg:h-80">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative w-full h-full"
            >
              <AnimatePresence initial={false} mode='wait'>
                <motion.img 
                  key={activePhotoIndex}
                  initial={{ opacity: 0.5, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.5, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  src={hotelImages[activePhotoIndex]} 
                  alt="Hôtel" 
                  className="absolute top-0 left-0 w-full h-full object-cover" 
                />
              </AnimatePresence>
              
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white bg-white/20 backdrop-blur-sm rounded-full p-2.5 shadow-md"
                  onClick={handleBack}
                >
                  <ChevronLeft size={20} />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleFavorite}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2.5 shadow-md"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}`} />
                </motion.button>
              </div>
              
              <div className="absolute bottom-4 left-4 z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="bg-gradient-to-r from-gray-900/80 to-gray-800/70 backdrop-blur-sm rounded-lg px-3 py-2 text-white inline-flex items-center gap-1.5"
                >
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span className="font-medium">4.7</span>
                  <span className="text-sm text-gray-200">(324 avis)</span>
                </motion.div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>
              
              <div className="absolute bottom-1/2 translate-y-1/2 left-0 right-0 flex justify-between items-center px-4 z-10">
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-md"
                  onClick={prevPhoto}
                >
                  <ChevronLeft size={24} className="text-white" />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-2 shadow-md"
                  onClick={nextPhoto}
                >
                  <ChevronRight size={24} className="text-white" />
                </motion.button>
              </div>
              
              <div className="absolute bottom-4 right-4 z-10 flex gap-1.5">
                {hotelImages.map((_, idx) => (
                  <motion.button 
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-2 h-2 rounded-full ${idx === activePhotoIndex ? "bg-white" : "bg-white/40"}`}
                    onClick={() => setActivePhotoIndex(idx)}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.header>

        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex-1 overflow-y-auto pb-24"
        >
          <div className="bg-white p-5">
            <motion.div 
              variants={itemVariants}
              custom={0}
              className="flex justify-between items-start"
            >
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Hôtel Splendid</h1>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={16} className="text-gray-500" />
                  <span className="text-gray-500">0.8 km du centre</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-gray-500">Prix par nuit</span>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-purple-700">120€</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">140€</span>
                </div>
              </div>
            </motion.div>

            <motion.section
              variants={itemVariants}
              custom={1}
              className="mt-6 pb-6 border-b border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
                <Sparkles size={20} className="text-purple-600" />
                Aperçu
              </h2>
              <p className="text-gray-600">
                L'Hôtel Splendid est un établissement 4 étoiles situé en plein cœur de la ville, offrant une vue imprenable et des services haut de gamme pour un séjour inoubliable. Profitez de notre piscine sur le toit et de notre restaurant primé.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                <div className="bg-purple-50 rounded-lg p-3 flex items-center gap-3 border border-purple-100">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Coffee size={16} className="text-purple-700" />
                  </div>
                  <span className="text-gray-700 text-sm">Petit déjeuner inclus</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 flex items-center gap-3 border border-purple-100">
                  <div className="bg-purple-100 rounded-full p-2">
                    <Wifi size={16} className="text-purple-700" />
                  </div>
                  <span className="text-gray-700 text-sm">WiFi gratuit</span>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 flex items-center gap-3 border border-purple-100">
                  <div className="bg-purple-100 rounded-full p-2">
                    <ShowerHead size={16} className="text-purple-700" />
                  </div>
                  <span className="text-gray-700 text-sm">Piscine</span>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              custom={2}
              className="py-6 border-b border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Check size={20} className="text-purple-600" />
                Services
              </h2>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  "Climatisation", "Wi-Fi gratuit", "Piscine extérieure", "Restaurant",
                  "Bar", "Parking privé", "Service en chambre", "Spa & bien-être"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check size={16} className="text-green-600" />
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              custom={3}
              className="py-6 border-b border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <MapPin size={20} className="text-purple-600" />
                Emplacement
              </h2>
              
              <div className="rounded-xl overflow-hidden relative">
                <div className="w-full h-60 rounded-xl overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full relative"
                  >
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1536547138526!2d2.339650515292373!3d48.873066308583354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f3f81aae1bb%3A0x19c41e22b92aee7b!2sParis%20Opera%20House!5e0!3m2!1sen!2sfr!4v1654123456789!5m2!1sen!2sfr" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen={false} 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                    />
                  </motion.div>
                </div>
                
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-gray-800 to-transparent">
                  <div className="flex justify-between text-white">
                    <span className="font-medium text-sm">Centre-ville</span>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 text-white backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center gap-1"
                      onClick={handleMapNavigation}
                    >
                      <Map size={14} />
                      Carte complète
                    </motion.button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                  <h4 className="text-sm font-medium text-gray-800 mb-1 flex items-center gap-1">
                    <MapPin size={14} className="text-purple-600" />
                    Adresse
                  </h4>
                  <p className="text-sm text-gray-600">
                    123 Avenue des Champs-Élysées, 75008 Paris
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                  <h4 className="text-sm font-medium text-gray-800 mb-1 flex items-center gap-1">
                    <Star size={14} className="text-purple-600" />
                    À proximité
                  </h4>
                  <p className="text-sm text-gray-600">
                    0.8 km du centre-ville, 2.5 km de la gare
                  </p>
                </div>
              </div>
            </motion.section>

            <motion.section
              variants={itemVariants}
              custom={4}
              className="py-6 mb-16" 
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                <Clock size={20} className="text-purple-600" />
                Informations utiles
              </h2>
              
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 rounded-full p-2 mt-0.5">
                    <Clock size={16} className="text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Horaires</h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">14:00 - 22:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium">07:00 - 11:00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full p-2 mt-0.5">
                    <Phone size={16} className="text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Contact</h3>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                      <li className="flex justify-between">
                        <span>Téléphone:</span>
                        <a href="tel:+33123456789" className="font-medium text-blue-600">+33 1 23 45 67 89</a>
                      </li>
                      <li className="flex justify-between">
                        <span>Email:</span>
                        <a href="mailto:contact@hotel-splendid.com" className="font-medium text-blue-600">contact@hotel-splendid.com</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              variants={itemVariants}
              custom={5}
              className="py-6 border-t border-gray-200 bg-white"
            >
              <div className="flex justify-between gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: "#f9fafb" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl py-3 font-medium"
                >
                  <Phone size={18} className="text-gray-600" />
                  <span>Contacter</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
                    backgroundImage: "linear-gradient(to right, #7c3aed, #6366f1)" 
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl py-3 font-medium shadow-md"
                  onClick={() => navigate('/room?hotel=1')}
                >
                  <span>Réserver</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            </motion.section>
          </div>
        </motion.main>
      </div>
    )
  }

  const renderLoadingScreen = () => {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
            borderRadius: ["50% 50%", "40% 60%", "50% 50%"] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-purple-600 mb-8"
        ></motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 font-medium text-lg"
        >
          Chargement des informations...
        </motion.p>
      </div>
    );
  };

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
      <WaveBackground />
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>
      </div>
      <BottomMenu />
    </div>
  )
}
