import { useState, useEffect } from "react"
import { Star, X, Heart, ChevronDown, ChevronsUpDown, Filter, Search, HelpCircle, Bookmark, Plus } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

  const DEFAULT_HOTEL_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function Favorites() {
  const [activeTab, setActiveTab] = useState("favoris")
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)

  // Simulation du chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Animation variants pour les cartes
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

  // Animation variants pour les sections
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

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col">
      {/* Header amélioré avec gradient */}
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
              src="/placeholder.svg?height=64&width=64"
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

      {/* Barre de recherche */}
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

        {/* Filtres */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 px-2 max-w-lg mx-auto overflow-hidden"
            >
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                  Prix ↑
                </button>
                <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                  Étoiles ★
                </button>
                <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                  Pays
                </button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
                  Services
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Onglets */}
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

      {/* Main Content avec loading state */}
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
                {/* Favoris Section */}
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
                      5 établissements enregistrés
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={sectionVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {[1, 2, 3, 4, 5].map((num, i) => (
                      <motion.div 
                        key={num}
                        custom={i}
                        variants={cardVariants}
                        whileHover="hover"
                        onHoverStart={() => setHoveredItem(num)}
                        onHoverEnd={() => setHoveredItem(null)}
                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-all duration-300"
                      >
                        <div className="relative h-40">
                          <img
                            src={DEFAULT_HOTEL_IMAGE}
                            alt="Hôtel"
                            className="object-cover h-full w-full transition-transform duration-700 ease-in-out"
                            style={{ 
                              transform: hoveredItem === num ? 'scale(1.05)' : 'scale(1)'
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
                              {Array.from({ length: 4 }).map((_, i) => (
                                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                              ))}
                              <span className="text-xs ml-1">4.5/5</span>
                            </div>
                            <p className="font-medium">Hôtel Luxe {num}</p>
                          </div>
                        </div>
                        <div className="p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-gray-600 text-sm">Paris, France</p>
                            <p className="font-bold text-purple-600">183€<span className="text-xs font-normal text-gray-500">/nuit</span></p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Piscine</span>
                            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Spa</span>
                            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Restaurant</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <motion.div 
                      variants={cardVariants}
                      custom={5}
                      whileHover="hover"
                      className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center h-full min-h-[200px] cursor-pointer"
                    >
                      <Plus className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-gray-500 font-medium">Ajouter un favoris</p>
                    </motion.div>
                  </motion.div>
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
                        className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
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

      {/* Bouton d'aide flottant */}
      <motion.button 
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-5 bottom-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg z-20"
      >
        <HelpCircle size={24} />
      </motion.button>

      {/* Bottom Menu */}
      <BottomMenu />
    </div>
  )
}
