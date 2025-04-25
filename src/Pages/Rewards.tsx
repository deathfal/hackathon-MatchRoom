"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, Award, Trophy, Calendar, Gift, Sparkles, CornerRightDown, HelpCircle, TrendingUp, Flame, X, Filter, ArrowDownUp, ChevronsUpDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function RewardsPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAdvantage, setSelectedAdvantage] = useState<number | null>(null)
  const [hoveredAdvantage, setHoveredAdvantage] = useState<number | null>(null)
  const [showHistoryPopup, setShowHistoryPopup] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [filterType, setFilterType] = useState<'all' | 'earned' | 'spent'>('all')
  
  const pointsData = {
    current: 2850,
    nextLevel: 3500,
    percentage: 75,
    level: "GOLD"
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const advantages = [
    { id: 1, name: "Réduction 10%", stars: 3, description: "Sur votre prochaine réservation", icon: <Gift size={20} /> },
    { id: 2, name: "Surclassement", stars: 3, description: "Chambre supérieure sans frais", icon: <TrendingUp size={20} /> },
    { id: 3, name: "Check-out tardif", stars: 2, description: "Jusqu'à 14h00", icon: <Calendar size={20} /> },
    { id: 4, name: "Petit-déjeuner", stars: 1, description: "Offert pour deux personnes", icon: <Flame size={20} /> },
    { id: 5, name: "WiFi premium", stars: 1, description: "Accès haute vitesse", icon: <Sparkles size={20} /> },
  ]

  const completeHistoryData = [
    { id: 1, date: "15/06/2024", action: "Séjour Hôtel Paris", points: "+350", type: "earned" },
    { id: 2, date: "03/05/2024", action: "Utilisation réduction", points: "-200", type: "spent" },
    { id: 3, date: "22/04/2024", action: "Séjour Hôtel Lyon", points: "+275", type: "earned" },
    { id: 4, date: "05/03/2024", action: "Séjour Hôtel Marseille", points: "+325", type: "earned" },
    { id: 5, date: "18/02/2024", action: "Surclassement chambre", points: "-150", type: "spent" },
    { id: 6, date: "02/02/2024", action: "Séjour Hôtel Nice", points: "+290", type: "earned" },
    { id: 7, date: "15/01/2024", action: "Points de bienvenue", points: "+100", type: "earned" },
    { id: 8, date: "05/01/2024", action: "Séjour Hôtel Strasbourg", points: "+310", type: "earned" },
    { id: 9, date: "22/12/2023", action: "Utilisation petit-déjeuner", points: "-75", type: "spent" },
    { id: 10, date: "10/12/2023", action: "Séjour Hôtel Bordeaux", points: "+265", type: "earned" },
    { id: 11, date: "28/11/2023", action: "Programme parrainage", points: "+150", type: "earned" },
    { id: 12, date: "15/11/2023", action: "Utilisation late check-out", points: "-100", type: "spent" },
    { id: 13, date: "01/11/2023", action: "Séjour Hôtel Lille", points: "+220", type: "earned" },
    { id: 14, date: "10/10/2023", action: "Séjour Hôtel Nantes", points: "+240", type: "earned" },
    { id: 15, date: "25/09/2023", action: "Première réservation", points: "+150", type: "earned" },
  ]

  const historyData = completeHistoryData.slice(0, 4)

  const getFilteredHistory = () => {
    let filtered = [...completeHistoryData];
    
    if (filterType !== 'all') {
      filtered = filtered.filter(item => item.type === filterType);
    }
    
    filtered.sort((a, b) => {
      const dateA = new Date(a.date.split('/').reverse().join('/'));
      const dateB = new Date(b.date.split('/').reverse().join('/'));
      return sortOrder === 'desc' ? 
        dateB.getTime() - dateA.getTime() : 
        dateA.getTime() - dateB.getTime();
    });
    
    return filtered;
  }

  const handleClose = () => {
    navigate(-1)
  }


  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  }


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

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
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
              className="relative mr-0 md:mr-15"
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

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-4xl mx-auto w-full">
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
                  onClick={() => setShowHistoryPopup(true)}
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

          <AnimatePresence>
            {showHistoryPopup && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40"
                onClick={() => setShowHistoryPopup(false)}
              >
                <motion.div 
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={popupVariants}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-500 p-5 flex justify-between items-center text-white">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Calendar size={20} />
                      Historique complet des points
                    </h3>
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowHistoryPopup(false)}
                      className="rounded-full bg-white/20 p-1.5 hover:bg-white/30 transition-colors"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                  
                  <div className="p-4 border-b border-gray-200 flex flex-wrap gap-3 justify-between items-center bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="relative inline-block">
                        <select 
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value as 'all' | 'earned' | 'spent')}
                          className="appearance-none pl-10 pr-8 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 cursor-pointer"
                        >
                          <option value="all">Tous les points</option>
                          <option value="earned">Points gagnés</option>
                          <option value="spent">Points utilisés</option>
                        </select>
                        <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleSortOrder}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm hover:bg-gray-50"
                      >
                        <span className="text-sm font-medium text-gray-700">Date</span>
                        {sortOrder === 'desc' ? (
                          <ArrowDownUp size={16} className="text-gray-500" />
                        ) : (
                          <ChevronsUpDown size={16} className="text-gray-500" />
                        )}
                      </motion.button>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {getFilteredHistory().length} opérations
                    </div>
                  </div>
                  
                  <div className="overflow-y-auto max-h-[60vh] p-1">
                    <table className="w-full">
                      <thead className="sticky top-0 z-10">
                        <tr className="bg-gray-100 shadow-sm">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Points</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {getFilteredHistory().map((item, i) => (
                          <motion.tr 
                            key={item.id}
                            custom={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.03, duration: 0.2 }}
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
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 bg-gray-50 text-right">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowHistoryPopup(false)}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-medium rounded-lg shadow-sm hover:from-amber-600 hover:to-yellow-600 transition-colors"
                    >
                      Fermer
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>


          <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="fixed right-5 bottom-20 bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-3 rounded-full shadow-lg z-20"
          >
            <HelpCircle size={24} />
          </motion.button>

          <BottomMenu />
        </>
      )}
    </div>
  )
}
