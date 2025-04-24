"use client"

import { useState, useEffect } from "react"
import { User, CreditCard, MessageCircle, Clock, ChevronLeft, Edit, ChevronDown, Plus, Settings, Award, Globe, Heart, LogOut, HelpCircle, Star } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

// Image par défaut pour le profil
const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function ProfilePage() {
  const navigate = useNavigate()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeNotifications, setActiveNotifications] = useState(3)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Simulation du chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

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

  // Variants d'animation pour les différents éléments
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
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    exit: { y: -20, opacity: 0 }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
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
    { id: "badges", name: "Badges", icon: "🏆", path: "/rewards", color: "from-amber-200 to-yellow-300" },
    { id: "stories", name: "Récits de voyage", icon: "📝", path: "", color: "from-blue-200 to-cyan-300" },
    { id: "favorites", name: "Favoris", icon: "❤️", path: "/favorites", color: "from-red-200 to-pink-300" },
  ]

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center h-screen">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
          <p className="text-gray-500 font-medium mt-4">Chargement du profil...</p>
        </div>
      ) : (
        <>
          {/* Header amélioré avec gradient */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-700 p-5 flex justify-between items-center shadow-lg"
          >
            <div className="flex items-center gap-3">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white bg-white/20 rounded-full p-2 backdrop-blur-sm"
                onClick={handleClose}
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
                  PROFIL
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-white/80 text-xl md:text-2xl"
                >
                  User 29
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
                <Edit size={16} className="text-black" />
              </motion.div>
            </motion.div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-2xl mx-auto w-full">
            {/* Profile User Info */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center mb-8 md:mb-10 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <motion.div 
                variants={itemVariants}
                className="mb-2 text-center"
              >
                <h2 className="font-medium text-xl mb-1 text-gray-800">user29@example.com</h2>
                <p className="text-sm text-gray-600">Membre depuis Juin 2023</p>
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1.5 rounded-full inline-block text-sm md:text-base font-medium"
              >
                <span className="text-yellow-300">★</span> Niveau Gold
              </motion.div>

              {/* Statistiques */}
              <motion.div 
                variants={itemVariants}
                className="w-full grid grid-cols-3 gap-4 mt-6 text-center"
              >
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-purple-600">12</div>
                  <div className="text-xs text-gray-500">Séjours</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-purple-600">5</div>
                  <div className="text-xs text-gray-500">Favoris</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-xl font-bold text-purple-600">3</div>
                  <div className="text-xs text-gray-500">Badges</div>
                </div>
              </motion.div>
            </motion.section>

            {/* Categories */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 md:mb-10"
            >
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-between mb-4"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-2 rounded-lg shadow-md">
                  <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                    <Award size={18} />
                    Mes activités
                  </h2>
                </div>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                  Voir tout →
                </button>
              </motion.div>
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 md:gap-6"
              >
                {categoryItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${item.path ? 'hover:scale-105' : ''}`}
                    onClick={() => item.path && handleActivityClick(item.id)}
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setHoveredCategory(item.id)}
                    onHoverEnd={() => setHoveredCategory(null)}
                  >
                    <motion.div 
                      className={`w-full aspect-square bg-gradient-to-br ${item.color} mb-2 rounded-xl overflow-hidden shadow-md relative`}
                      initial={{ borderRadius: "0.75rem" }}
                      animate={{ 
                        borderRadius: hoveredCategory === item.id ? "1rem" : "0.75rem",
                        scale: hoveredCategory === item.id ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl md:text-5xl">{item.icon}</span>
                      </div>
                      {item.id === "favorites" && (
                        <motion.div 
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          5
                        </motion.div>
                      )}
                    </motion.div>
                    <div className="text-center font-medium py-1 md:text-base">
                      {item.name}
                      {item.path && <span className="text-purple-600 ml-1">→</span>}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Profile Sections */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4 mb-20 md:mb-16"
            >
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-between mb-4"
              >
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-2 rounded-lg shadow-md">
                  <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                    <Settings size={18} />
                    Paramètres
                  </h2>
                </div>
              </motion.div>
              
              {profileSections.map((section, index) => (
                <motion.div 
                  key={section.id} 
                  variants={fadeInUp}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white"
                >
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                    className="flex-1 bg-white py-4 px-5 w-full flex justify-between items-center transition-all"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center">
                      <motion.div 
                        className="w-9 h-9 bg-gradient-to-br from-gray-800 to-gray-900 text-amber-400 mr-4 flex items-center justify-center flex-shrink-0 rounded-full shadow-md"
                        whileHover={{ scale: 1.1 }}
                      >
                        {section.icon}
                      </motion.div>
                      <span className="font-medium text-gray-700">{section.name}</span>
                    </div>
                    <motion.div 
                      animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-500"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {expandedSection === section.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-gray-50 p-5 border-t border-gray-200">
                          {section.id === "personal" && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1 font-medium">Nom</label>
                                  <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">User</div>
                                </div>
                                <div>
                                  <label className="block text-xs text-gray-500 mb-1 font-medium">Prénom</label>
                                  <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">29</div>
                                </div>
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1 font-medium">Email</label>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">user29@example.com</div>
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1 font-medium">Téléphone</label>
                                <div className="bg-white p-2.5 rounded-lg border border-gray-200 shadow-sm">+33 6 XX XX XX XX</div>
                              </div>
                              <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 w-full font-medium"
                              >
                                <Edit size={16} />
                                Modifier
                              </motion.button>
                            </div>
                          )}
                          
                          {section.id === "payment" && (
                            <div className="space-y-4">
                              <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center shadow-sm">
                                <div className="flex items-center">
                                  <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-md mr-3 flex items-center justify-center text-white text-xs font-bold">VISA</div>
                                  <span className="font-medium">Carte **** 5678</span>
                                </div>
                                <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Par défaut</span>
                              </div>
                              <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 px-4 rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 w-full font-medium"
                              >
                                <Plus size={16} />
                                Ajouter un moyen de paiement
                              </motion.button>
                            </div>
                          )}
                          
                          {section.id === "negotiations" && (
                            <div className="space-y-3">
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-10 bg-green-500 rounded-full"></div>
                                    <span className="font-medium">Hôtel Paris Centre</span>
                                  </div>
                                  <span className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full font-medium">Accepté</span>
                                </div>
                                <div className="text-sm text-gray-600 mt-2 pl-5">135€/nuit - Du 15/06 au 18/06</div>
                              </motion.div>
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-3">
                                    <div className="w-2 h-10 bg-yellow-500 rounded-full"></div>
                                    <span className="font-medium">Hôtel Lyon Presqu'île</span>
                                  </div>
                                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-medium">En attente</span>
                                </div>
                                <div className="text-sm text-gray-600 mt-2 pl-5">110€/nuit - Du 22/07 au 25/07</div>
                              </motion.div>
                            </div>
                          )}
                          
                          {section.id === "history" && (
                            <div className="space-y-3">
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div className="font-medium flex items-center">
                                  <Globe className="w-5 h-5 text-purple-600 mr-2" />
                                  Hôtel Marseille Vieux Port
                                </div>
                                <div className="text-sm text-gray-600 mt-1 flex justify-between items-center">
                                  <span>05/03/2024 - 07/03/2024</span>
                                  <div className="flex">
                                    {[1, 2, 3, 4].map((i) => (
                                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                                    ))}
                                    <Star size={14} className="text-gray-300" />
                                  </div>
                                </div>
                              </motion.div>
                              <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                              >
                                <div className="font-medium flex items-center">
                                  <Globe className="w-5 h-5 text-purple-600 mr-2" />
                                  Hôtel Nice Promenade
                                </div>
                                <div className="text-sm text-gray-600 mt-1 flex justify-between items-center">
                                  <span>15/01/2024 - 17/01/2024</span>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                      <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                              <motion.button 
                                whileHover={{ x: 5 }}
                                className="mt-2 text-purple-600 hover:text-purple-800 transition-colors text-sm flex items-center font-medium"
                              >
                                Voir tous mes séjours
                                <span className="ml-1">→</span>
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}

              <motion.div 
                variants={fadeInUp}
                className="rounded-xl overflow-hidden mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center justify-center gap-2 font-medium"
                >
                  <LogOut size={18} />
                  Déconnexion
                </motion.button>
              </motion.div>
            </motion.section>
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
        </>
      )}
    </div>
  )
}
