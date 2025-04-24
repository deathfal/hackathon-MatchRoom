"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, Award, Trophy, Calendar, Gift, Sparkles, CornerRightDown, HelpCircle, TrendingUp, Flame } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

// Image par défaut pour le profil
const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function RewardsPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAdvantage, setSelectedAdvantage] = useState<number | null>(null)
  const [hoveredAdvantage, setHoveredAdvantage] = useState<number | null>(null)
  
  // Points data
  const pointsData = {
    current: 2850,
    nextLevel: 3500,
    percentage: 75,
    level: "GOLD"
  }

  // Simulation du chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Advantages data
  const advantages = [
    { id: 1, name: "Réduction 10%", stars: 3, description: "Sur votre prochaine réservation", icon: <Gift size={20} /> },
    { id: 2, name: "Surclassement", stars: 3, description: "Chambre supérieure sans frais", icon: <TrendingUp size={20} /> },
    { id: 3, name: "Check-out tardif", stars: 2, description: "Jusqu'à 14h00", icon: <Calendar size={20} /> },
    { id: 4, name: "Petit-déjeuner", stars: 1, description: "Offert pour deux personnes", icon: <Flame size={20} /> },
    { id: 5, name: "WiFi premium", stars: 1, description: "Accès haute vitesse", icon: <Sparkles size={20} /> },
  ]

  // History data
  const historyData = [
    { id: 1, date: "15/06/2024", action: "Séjour Hôtel Paris", points: "+350" },
    { id: 2, date: "03/05/2024", action: "Utilisation réduction", points: "-200" },
    { id: 3, date: "22/04/2024", action: "Séjour Hôtel Lyon", points: "+275" },
    { id: 4, date: "05/03/2024", action: "Séjour Hôtel Marseille", points: "+325" },
  ]

  // Handle close
  const handleClose = () => {
    navigate(-1)
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
    })
  }

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center h-screen">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-amber-500 animate-spin"></div>
          <p className="text-gray-500 font-medium mt-4">Chargement de vos récompenses...</p>
        </div>
      ) : (
        <>
          {/* Header amélioré avec gradient */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-amber-500 to-yellow-500 p-5 flex justify-between items-center shadow-lg"
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
                  VOS RÉCOMPENSES
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-white/80 text-xl md:text-2xl"
                >
                  Programme fidélité
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
                className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1.5 shadow-md"
              >
                <Trophy size={16} className="text-yellow-300" />
              </motion.div>
            </motion.div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
            {/* Points and status section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl p-6 shadow-lg overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1.5 bg-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${pointsData.percentage}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
                
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="p-2.5 bg-yellow-400 rounded-lg"
                      >
                        <Award size={24} className="text-gray-900" />
                      </motion.div>
                      <h2 className="text-xl font-semibold">Programme fidélité</h2>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-3xl font-bold text-amber-400"
                      >
                        {pointsData.current}
                      </motion.span>
                      <span className="text-xl text-amber-200">pts</span>
                    </div>
                  </div>
                  
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="bg-gradient-to-r from-amber-400 to-yellow-300 text-gray-900 font-bold rounded-lg px-4 py-2 flex items-center gap-2 shadow-inner"
                  >
                    <Trophy size={20} />
                    <span>{pointsData.level}</span>
                  </motion.div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-300 mb-1.5">
                    <span>Niveau actuel</span>
                    <span>Prochain niveau: {pointsData.nextLevel} pts</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pointsData.percentage}%` }}
                      transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm">0</span>
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.3 }}
                      className="bg-white/10 px-2.5 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      <CornerRightDown size={12} />
                      <span>{pointsData.nextLevel - pointsData.current} pts pour le niveau suivant</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Avantages disponibles */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-2 rounded-lg shadow-md">
                  <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                    <Gift size={18} />
                    Vos avantages
                  </h2>
                </div>
                <div className="text-sm text-gray-500">
                  5 avantages disponibles
                </div>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {advantages.map((advantage, i) => (
                  <motion.div 
                    custom={i}
                    variants={itemVariants}
                    key={advantage.id}
                    whileHover={{ 
                      y: -5, 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                    }}
                    onClick={() => setSelectedAdvantage(advantage.id)}
                    onHoverStart={() => setHoveredAdvantage(advantage.id)}
                    onHoverEnd={() => setHoveredAdvantage(null)}
                    className={`bg-white rounded-xl overflow-hidden border ${selectedAdvantage === advantage.id ? "border-amber-400" : "border-gray-200"} shadow-sm transition-all duration-300 cursor-pointer`}
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 flex justify-between items-center"
                      animate={{ 
                        backgroundColor: hoveredAdvantage === advantage.id ? "#000000" : "#1f2937" 
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-400 rounded-full">
                          {advantage.icon}
                        </div>
                        <h3 className="font-medium">{advantage.name}</h3>
                      </div>
                      <div className="flex">
                        {[...Array(advantage.stars)].map((_, i) => (
                          <motion.div 
                            key={i}
                            initial={{ rotate: -10, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                          >
                            <Star size={16} className="text-amber-400 fill-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3">{advantage.description}</p>
                      <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Sparkles size={16} />
                        Utiliser
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Historique */}
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-20 md:mb-16"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-2 rounded-lg shadow-md">
                    <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                      <Calendar size={18} />
                      Historique des points
                    </h2>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="text-amber-600 hover:text-amber-700 transition-colors text-sm font-medium"
                >
                  Voir tout →
                </motion.button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {historyData.map((item, i) => (
                      <motion.tr 
                        key={item.id}
                        custom={i}
                        variants={tableRowVariants}
                        whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{item.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{item.action}</td>
                        <td className={`px-4 py-3 text-sm font-medium text-right whitespace-nowrap ${item.points.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                          {item.points}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </motion.section>
          </main>

          {/* Bouton d'aide flottant */}
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="fixed right-5 bottom-20 bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-3 rounded-full shadow-lg z-20"
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
