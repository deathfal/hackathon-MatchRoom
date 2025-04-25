import { useState, useEffect } from "react"
import { Star, X, Heart, ChevronDown, ChevronsUpDown, Filter, Search, HelpCircle, Bookmark, Plus, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"
import { useNavigate } from "react-router-dom"

const DEFAULT_HOTEL_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function Favorites() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("favoris")
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null)
  
  // États pour la négociation
  const [showOfferPopup, setShowOfferPopup] = useState(false)
  const [offerPrice, setOfferPrice] = useState("")
  const [offerSuccess, setOfferSuccess] = useState(false)
  const [offerSending, setOfferSending] = useState(false)
  const [offerRejected, setOfferRejected] = useState(false)

  const hotels = [
    { id: 1, name: "Hôtel Luxe 1", location: "Paris, France", price: 183, stars: 4.5, services: ["Piscine", "Spa", "Restaurant"] },
    { id: 2, name: "Hôtel Luxe 2", location: "Nice, France", price: 215, stars: 4.7, services: ["Piscine", "Gym", "Restaurant"] },
    { id: 3, name: "Hôtel Luxe 3", location: "Lyon, France", price: 168, stars: 4.3, services: ["Spa", "Wi-Fi", "Bar"] },
    { id: 4, name: "Hôtel Luxe 4", location: "Marseille, France", price: 193, stars: 4.4, services: ["Plage privée", "Restaurant", "Piscine"] },
    { id: 5, name: "Hôtel Luxe 5", location: "Bordeaux, France", price: 175, stars: 4.2, services: ["Wi-Fi", "Bar", "Restaurant"] },
  ]

  const filteredHotels = hotels.filter(hotel => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return hotel.name.toLowerCase().includes(searchLower) || 
           hotel.location.toLowerCase().includes(searchLower) ||
           hotel.services.some(service => service.toLowerCase().includes(searchLower));
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => {
      if (prev.includes(filter)) {
        return prev.filter(f => f !== filter)
      } else {
        return [...prev, filter]
      }
    })
  }

  const isFilterActive = (filter: string) => activeFilters.includes(filter)

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
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

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const openHotelDetails = (hotel: typeof hotels[0]) => {
    setSelectedHotel(hotel);
    // Réinitialiser les états de négociation
    setOfferSuccess(false);
    setOfferRejected(false);
    setOfferPrice("");
  };

  const closeHotelDetails = () => {
    setSelectedHotel(null);
  };

  const handleReservation = (hotel: typeof hotels[0]) => {
    setSelectedHotel(hotel);
    setShowOfferPopup(true);
    setOfferPrice("");
    setOfferSuccess(false);
    setOfferRejected(false);
  };
  
  const closeOfferPopup = () => {
    setShowOfferPopup(false);
  };
  
  const sendOffer = () => {
    if (!offerPrice.trim() || !selectedHotel) return;
    
    setOfferSending(true);
    
    setTimeout(() => {
      setOfferSending(false);
      
      const minimumAcceptablePrice = selectedHotel.price * 0.5;
      
      if (parseInt(offerPrice) < minimumAcceptablePrice) {
        setOfferRejected(true);
      } else {
        setOfferSuccess(true);
        
        setTimeout(() => {
          navigate('/negociation');
        }, 2000);
      }
    }, 1500);
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col">

      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 p-5 flex justify-between items-center shadow-lg"
      >
        <div className="text-white">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl font-bold md:text-3xl"
          >
            VOS FAVORIS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/80 text-xl md:text-2xl"
          >
            User 29 !
          </motion.p>
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
            className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1 shadow-md"
          >
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
          </motion.div>
        </motion.div>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="px-4 py-3 sticky top-0 z-10 bg-white shadow-md"
      >
        <div className="relative max-w-lg mx-auto">
          <input 
            type="text" 
            placeholder="Rechercher un hôtel ou une destination..." 
            className="w-full px-4 py-2 pl-10 pr-10 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => setFilterOpen(!filterOpen)}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-purple-600 transition-colors"
          >
            <Filter className="w-5 h-5" />
          </motion.button>
        </div>
        
        <AnimatePresence>
          {filterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 px-2 max-w-lg mx-auto overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-3 py-1 ${isFilterActive("price") ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"} rounded-full text-sm font-medium hover:bg-purple-200 transition-colors`}
                  onClick={() => toggleFilter("price")}
                >
                  Prix ↑
                </button>
                <button 
                  className={`px-3 py-1 ${isFilterActive("stars") ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"} rounded-full text-sm font-medium hover:bg-purple-200 transition-colors`}
                  onClick={() => toggleFilter("stars")}
                >
                  Étoiles ★
                </button>
                <button 
                  className={`px-3 py-1 ${isFilterActive("country") ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"} rounded-full text-sm font-medium hover:bg-purple-200 transition-colors`}
                  onClick={() => toggleFilter("country")}
                >
                  Pays
                </button>
                <button 
                  className={`px-3 py-1 ${isFilterActive("services") ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-700"} rounded-full text-sm font-medium hover:bg-purple-200 transition-colors`}
                  onClick={() => toggleFilter("services")}
                >
                  Services
                </button>
              </div>
              
              {activeFilters.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 flex justify-between items-center"
                >
                  <div className="text-sm text-gray-600">
                    {activeFilters.length} filtre{activeFilters.length > 1 ? 's' : ''} actif{activeFilters.length > 1 ? 's' : ''}
                  </div>
                  <button 
                    onClick={() => setActiveFilters([])}
                    className="text-xs text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Réinitialiser
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex border-b bg-white"
      >
        <button 
          onClick={() => setActiveTab("favoris")}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${activeTab === "favoris" ? "text-purple-600" : "text-gray-500 hover:text-gray-800"}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Heart size={18} className={activeTab === "favoris" ? "fill-purple-600 text-purple-600" : ""} />
            <span>Favoris</span>
          </div>
          {activeTab === "favoris" && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>

        <button 
          onClick={() => setActiveTab("historique")}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${activeTab === "historique" ? "text-purple-600" : "text-gray-500 hover:text-gray-800"}`}
        >
          <div className="flex items-center justify-center gap-2">
            <ChevronsUpDown size={18} />
            <span>Historique</span>
          </div>
          {activeTab === "historique" && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>

        <button 
          onClick={() => setActiveTab("suggestions")}
          className={`flex-1 py-3 px-4 text-center font-medium transition-colors relative ${activeTab === "suggestions" ? "text-purple-600" : "text-gray-500 hover:text-gray-800"}`}
        >
          <div className="flex items-center justify-center gap-2">
            <Bookmark size={18} />
            <span>Pour vous</span>
          </div>
          {activeTab === "suggestions" && (
            <motion.div 
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </button>
      </motion.div>

      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
            <p className="text-gray-500 font-medium">Chargement de vos favoris...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "favoris" && (
              <motion.div 
                key="favoris" 
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-8"
              >
                <section className="mb-6 md:mb-10">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-2 rounded-lg shadow-md">
                      <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                        <Heart className="fill-white" size={18} />
                        Favoris
                      </h2>
                    </div>
                    <div className="text-sm text-gray-500">
                      {filteredHotels.length} établissement{filteredHotels.length > 1 ? 's' : ''} {filteredHotels.length !== hotels.length ? 'trouvé' : 'enregistré'}{filteredHotels.length > 1 ? 's' : ''}
                    </div>
                  </motion.div>

                  {filteredHotels.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200"
                    >
                      <Search size={48} className="mx-auto mb-4 text-gray-300" />
                      <h3 className="font-medium text-lg text-gray-700 mb-2">Aucun hôtel trouvé</h3>
                      <p className="text-gray-500">Aucun résultat pour "{searchTerm}" dans vos favoris.</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Effacer la recherche
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div 
                      variants={sectionVariants}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {filteredHotels.map((hotel, i) => (
                        <motion.div 
                          key={hotel.id}
                          custom={i}
                          variants={cardVariants}
                          whileHover="hover"
                          onHoverStart={() => setHoveredItem(hotel.id)}
                          onHoverEnd={() => setHoveredItem(null)}
                          onClick={() => openHotelDetails(hotel)} // Ajout du gestionnaire d'événement onClick
                          className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300 cursor-pointer"
                        >
                          <div className="relative h-40">
                            <img
                              src={DEFAULT_HOTEL_IMAGE}
                              alt="Hôtel"
                              className="object-cover h-full w-full transition-transform duration-700 ease-in-out"
                              style={{ 
                                transform: hoveredItem === hotel.id ? 'scale(1.05)' : 'scale(1)'
                              }}
                            />
                            <motion.div 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md"
                            >
                              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                            </motion.div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white">
                              <div className="flex items-center gap-1 mb-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star key={i} size={14} className={`${i < Math.floor(hotel.stars) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                ))}
                                <span className="text-xs ml-1">{hotel.stars}/5</span>
                              </div>
                              <p className="font-medium">{hotel.name}</p>
                            </div>
                          </div>
                          <div className="p-3">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-gray-600 text-sm">{hotel.location}</p>
                              <p className="font-bold text-purple-600">{hotel.price}€<span className="text-xs font-normal text-gray-500">/nuit</span></p>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {hotel.services.map((service, i) => (
                                <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{service}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <motion.div 
                        variants={cardVariants}
                        custom={filteredHotels.length}
                        whileHover="hover"
                        className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center h-full min-h-[200px] cursor-pointer"
                      >
                        <Plus className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-gray-500 font-medium">Ajouter un favoris</p>
                      </motion.div>
                    </motion.div>
                  )}
                </section>
              </motion.div>
            )}

            {activeTab === "historique" && (
              <motion.div 
                key="historique"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-8"
              >
                <section className="mb-6 md:mb-10">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-2 rounded-lg shadow-md">
                      <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                        <ChevronsUpDown size={18} />
                        Historique de séjours
                      </h2>
                    </div>
                    <div className="text-sm text-gray-500">
                      3 séjours récents
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-4 bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                  >
                    <div className="flex justify-between items-center text-gray-600 text-sm font-medium mb-2">
                      <div className="w-1/3">Hôtel</div>
                      <div className="w-1/3 text-center">Localisation</div>
                      <div className="w-1/3 flex justify-end items-center">
                        Date
                        <ChevronDown size={16} className="ml-1" />
                      </div>
                    </div>

                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-yellow-200 mb-3"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="font-medium">Suite Royale</div>
                        <div className="flex items-center">
                          Votre évaluation
                          <div className="flex ml-2">
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <Star size={16} className="text-yellow-500 fill-yellow-500" />
                            <Star size={16} className="text-gray-300" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center text-sm">
                          <span className="text-gray-600 mr-2">Services:</span>
                          <div className="flex space-x-1">
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Petit-déj</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Wi-Fi</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Spa</span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">Piscine</span>
                          </div>
                        </div>
                        <div className="text-green-600 font-medium">Prix négocié -15%</div>
                      </div>
                    </motion.div>

                    {[1, 2, 3].map((item, i) => (
                      <motion.div 
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className="bg-white p-3 flex justify-between items-center rounded-lg border border-gray-200 mb-2 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-1/3 font-medium">Grand Hôtel {item}</div>
                        <div className="w-1/3 text-center text-gray-600">Paris</div>
                        <div className="w-1/3 text-right text-gray-500 text-sm">12/0{item}/2024</div>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              </motion.div>
            )}

            {activeTab === "suggestions" && (
              <motion.div 
                key="suggestions"
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="space-y-8"
              >
                <section className="mb-6 md:mb-10">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-4"
                  >
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-2 rounded-lg shadow-md">
                      <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                        <Bookmark size={18} />
                        Suggestions pour vous
                      </h2>
                    </div>
                    <div className="text-sm text-gray-500">
                      Basé sur vos préférences
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={sectionVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num, i) => (
                      <motion.div 
                        key={num}
                        custom={i}
                        variants={cardVariants}
                        whileHover="hover"
                        onClick={() => openHotelDetails({
                          id: num + 100, 
                          name: `Grand Palace ${num}`, 
                          location: "Paris, France", 
                          price: 215, 
                          stars: 4.2, 
                          services: ["Wi-Fi", "Spa", "Restaurant", "Parking"]
                        })}
                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm cursor-pointer"
                      >
                        <div className="relative h-40">
                          <img
                            src={DEFAULT_HOTEL_IMAGE}
                            alt="Hôtel"
                            className="object-cover h-full w-full"
                          />
                          {num === 1 && (
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                              className="absolute top-3 right-3 bg-yellow-400 rounded-full p-1.5 shadow-md"
                            >
                              <Star className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                            <div className="flex items-center gap-1 mb-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={14} className={`${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                              ))}
                            </div>
                            <p className="font-medium">Grand Palace {num}</p>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-center">
                            <p className="text-gray-600 text-sm">Paris, France</p>
                            <p className="font-medium text-gray-700">à partir de <span className="font-bold text-amber-600">215€</span></p>
                          </div>
                          <div className="mt-2 flex items-center gap-1">
                            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">95% compatible</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Popup de détail pour les hôtels (favoris et suggestions) */}
      <AnimatePresence>
        {selectedHotel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40"
            onClick={closeHotelDetails}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={DEFAULT_HOTEL_IMAGE} 
                  alt={selectedHotel.name} 
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-xl font-bold">{selectedHotel.name}</h2>
                  <p className="text-sm text-white/80">{selectedHotel.location}</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeHotelDetails}
                  className="absolute top-4 right-4 rounded-full bg-white/20 hover:bg-white/40 p-1.5 transition-all duration-300 text-white"
                >
                  <X size={18} />
                </motion.button>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={`${i < Math.floor(selectedHotel.stars) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    ))}
                    <span className="text-sm ml-1 text-gray-600">{selectedHotel.stars}/5</span>
                  </div>
                  <div className="font-bold text-purple-600 text-lg">
                    {selectedHotel.price}€<span className="text-xs font-normal text-gray-500">/nuit</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-medium mb-1">Services inclus</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedHotel.services.map((service, i) => (
                      <span key={i} className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-medium mb-1">Description</h3>
                  <p className="text-sm text-gray-600">
                    Cet établissement {selectedHotel.stars >= 4.5 ? "de luxe" : "confortable"} est idéalement situé {selectedHotel.location.split(',')[0]}. 
                    Il offre un excellent rapport qualité-prix et de nombreux services pour rendre votre séjour agréable.
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(147, 51, 234, 0.2)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 py-2.5 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
                    onClick={() => handleReservation(selectedHotel)}
                  >
                    Négocier le prix
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup de négociation */}
      <AnimatePresence>
        {showOfferPopup && selectedHotel && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center p-4"
            onClick={closeOfferPopup}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-xl overflow-hidden max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img 
                      src={DEFAULT_HOTEL_IMAGE} 
                      alt="Chambre" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Faire une offre</h3>
                    <p className="text-sm text-purple-100">
                      {selectedHotel.name} • 3 nuit(s)
                    </p>
                  </div>
                </div>
                <button 
                  onClick={closeOfferPopup}
                  className="hover:bg-purple-700 p-1 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {offerSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </motion.svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Offre envoyée avec succès !</h3>
                    <p className="text-gray-600 mb-6">
                      Votre proposition de {offerPrice}€ par nuit a été transmise à l'hôtel. 
                      Vous recevrez une réponse dans les prochaines heures.
                    </p>
                    <p className="text-sm text-gray-500">
                      Redirection vers vos négociations en cours...
                    </p>
                  </div>
                ) : offerRejected ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X size={32} className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Offre refusée</h3>
                    <p className="text-gray-600 mb-6">
                      Votre proposition de {offerPrice}€ par nuit est trop basse 
                      (inférieure à 50% du prix affiché: {Math.ceil(selectedHotel.price * 0.5)}€).
                      <br /><br />
                      Les hôtels peuvent rejeter automatiquement les offres qu'ils considèrent comme déraisonnables.
                    </p>
                    <button
                      onClick={() => setOfferRejected(false)}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Proposer un nouveau prix
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Proposez votre prix</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Prix affiché</p>
                          <p className="text-xl font-bold text-gray-800">
                            {selectedHotel.price}€
                            <span className="text-sm font-normal text-gray-500">/nuit</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total pour 3 nuits</p>
                          <p className="text-lg font-medium text-gray-800">
                            {selectedHotel.price * 3}€
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Vous pouvez proposer un prix par nuit différent. 
                      L'hôtel vous répondra dans les plus brefs délais.
                    </p>
                    
                    <div className="mb-4">
                      <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Votre proposition (par nuit)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          id="offerPrice"
                          placeholder="Ex: 95"
                          value={offerPrice}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              setOfferPrice(value);
                            }
                          }}
                          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="text-lg font-semibold text-gray-700">€</span>
                      </div>
                    </div>
                    
                    {offerPrice && (
                      <div className="bg-purple-50 rounded-lg p-3 mb-6">
                        <p className="text-sm text-purple-800">
                          Total proposé : <span className="font-bold">{parseInt(offerPrice) * 3}€</span> 
                          pour 3 nuit(s)
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          {parseInt(offerPrice) < selectedHotel.price ? 
                            `Économisez ${(selectedHotel.price - parseInt(offerPrice)) * 3}€ sur votre séjour` :
                            "Prix identique ou supérieur au tarif affiché"}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="bg-gray-50 p-4 border-t flex justify-end gap-2">
                {!offerSuccess && !offerRejected && (
                  <>
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium transition-colors"
                      onClick={closeOfferPopup}
                    >
                      Annuler
                    </button>
                    <button 
                      className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium transition-colors flex items-center gap-2 ${
                        !offerPrice.trim() || offerSending ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      onClick={sendOffer}
                      disabled={!offerPrice.trim() || offerSending}
                    >
                      {offerSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Envoyer la proposition
                        </>
                      )}
                    </button>
                  </>
                )}
                {offerRejected && (
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium transition-colors"
                    onClick={closeOfferPopup}
                  >
                    Fermer
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-5 bottom-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg z-20"
      >
        <HelpCircle size={24} />
      </motion.button>

      <BottomMenu />
    </div>
  )
}
