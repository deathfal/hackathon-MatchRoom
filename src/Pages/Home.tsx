import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import BottomMenu from "../components/bottom-menu"
import { 
  X, Check, Clock, Sparkles, Award, Lightbulb, ChevronRight, 
  Heart, Calendar, Map, Star, Compass, Search, HelpCircle, User, MessageCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1561383818-ca5eee8c1d06?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
const DEFAULT_HOTEL_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showQuestionnairePopup, setShowQuestionnairePopup] = useState(false)
  const [popupAnimation, setPopupAnimation] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const getHotelImage = (index: number) => {
    return `${DEFAULT_HOTEL_IMAGE}&sig=${index}`;
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
        ease: "easeOut"
      }
    })
  }

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (location.state?.fromSignupComplete) {
      setShowQuestionnairePopup(true)
      setTimeout(() => {
        setPopupAnimation(true)
      }, 100)
    }
  }, [location])

  const handleStartQuestionnaire = () => {
    setPopupAnimation(false)
    setTimeout(() => {
      setShowQuestionnairePopup(false)
      navigate("/questionnaire")
    }, 300)
  }

  const handleDismissPopup = () => {
    setPopupAnimation(false)
    setTimeout(() => {
      setShowQuestionnairePopup(false)
    }, 300)
  }

  const handleSearchNavigation = () => {
    navigate("/search")
  }

  const handleProfileNavigation = () => {
    navigate("/profil")
  }
  
  const handleMapsNavigation = () => {
    navigate("/maps")
  }
  

  const handleFavoritesNavigation = () => {
    navigate("/favorites")
  }
  
  const handleNegotiationsNavigation = () => {
    navigate("/negociation")
  }
  
  
  const handleSuggestionsNavigation = () => {
    navigate("/search?tab=suggestions")
  }

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center h-screen">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
          <p className="text-gray-500 font-medium mt-4">Chargement de votre accueil...</p>
        </div>
      ) : (
        <>
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
                BIENVENUE
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
              className="relative mr-15"
            >
              <div className="h-16 w-16 rounded-full border-2 border-white overflow-hidden shadow-lg md:h-20 md:w-20" onClick={handleProfileNavigation}>
                <img
                  src={DEFAULT_PROFILE_IMAGE}
                  alt="Profile"
                  className="object-cover h-full w-full cursor-pointer"
                />
              </div>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 10 }}
                className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1.5 shadow-md cursor-pointer"
              >
                <User size={16} className="text-indigo-800" />
              </motion.div>
            </motion.div>
          </motion.header>

          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="px-4 py-3 sticky top-0 z-10 bg-white shadow-md"
          >
            <div className="relative max-w-lg mx-auto" onClick={handleSearchNavigation}>
              <input 
                type="text" 
                placeholder="Rechercher un hôtel ou une destination..." 
                className="w-full px-4 py-2 pl-10 pr-10 rounded-full border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
                readOnly
              />
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-2.5 bg-purple-100 text-purple-600 rounded-full p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMapsNavigation();
                }}
              >
                <Map size={18} />
              </motion.div>
            </div>
          </motion.div>

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">

            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl p-5 shadow-lg overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 w-full h-1.5 bg-white/30"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                />
                
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center">
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center gap-3">
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-lg"
                      >
                        <Award size={20} className="text-white" />
                      </motion.div>
                      <h2 className="text-lg font-medium md:text-xl">Programme fidélité</h2>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1.5">
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl font-bold"
                      >
                        2850
                      </motion.span>
                      <span className="text-base text-white/80">points</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/rewards')}
                    className="bg-white/20 backdrop-blur-sm text-white font-medium rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm hover:bg-white/30 transition-colors"
                  >
                    <span>Voir mes avantages</span>
                    <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.section>

            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 md:mb-10"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 rounded-lg shadow-md">
                  <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                    <Calendar size={18} />
                    Mes réservations
                  </h2>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={handleFavoritesNavigation}
                  className="text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium"
                >
                  Voir tout →
                </motion.button>
              </motion.div>

              <div className="flex gap-3 md:gap-4 lg:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
                {[1, 2, 3, 4, 5].map((item, i) => (
                  <motion.div 
                    key={item}
                    custom={i}
                    variants={cardVariants}
                    whileHover="hover"
                    className="min-w-[230px] md:min-w-[260px] lg:min-w-[280px] flex-shrink-0 snap-center rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white"
                  >
                    <div className="relative h-32 md:h-36 lg:h-40">
                      <img
                        src={getHotelImage(item)}
                        alt="Hôtel"
                        className="object-cover h-full w-full"
                      />
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/50 to-transparent p-2">
                        <div className="bg-white/90 text-xs px-2 py-1 rounded inline-flex items-center gap-1">
                          <Calendar size={12} className="text-purple-600" />
                          <span className="font-medium">21/06 - 24/06</span>
                        </div>
                      </div>
                      {item === 1 && (
                        <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                          Confirmé
                        </div>
                      )}
                      {item === 2 && (
                        <div className="absolute bottom-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded shadow-sm">
                          En attente
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Hôtel Royal {item}</h3>
                        <div className="flex items-center">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-xs ml-1">{4.0 + item * 0.1}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Chambre Deluxe</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mb-8 md:mb-10"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-3 py-2 rounded-lg shadow-md">
                  <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                    <MessageCircle size={18} />
                    Mes négociations
                  </h2>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={handleNegotiationsNavigation}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
                >
                  Voir tout →
                </motion.button>
              </motion.div>

              <div className="space-y-3 w-full">
                <motion.div 
                  variants={itemVariants}
                  custom={0}
                  className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg py-3 px-4 flex justify-between items-center border border-yellow-200 shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">Hôtel Paris Centre</span>
                    <span className="text-sm text-gray-600">Offre acceptée: 110€/nuit</span>
                  </div>
                  <div className="bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center">
                    <Check size={18} />
                  </div>
                </motion.div>
                
                {[1, 2].map((item, i) => (
                  <motion.div
                    key={item}
                    variants={itemVariants}
                    custom={i + 1}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-lg py-3 px-4 flex justify-between items-center border border-gray-200 shadow-sm"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">Hôtel Riviera {item}</span>
                      <span className="text-sm text-gray-600">Proposition: 135€/nuit</span>
                    </div>
                    <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                      En attente
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
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-between mb-4"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-3 py-2 rounded-lg shadow-md">
                  <h2 className="text-lg font-medium md:text-xl flex items-center gap-2">
                    <Sparkles size={18} />
                    Suggestions
                  </h2>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={handleSuggestionsNavigation}
                  className="text-purple-600 hover:text-purple-700 transition-colors text-sm font-medium"
                >
                  Explorer →
                </motion.button>
              </motion.div>

              <div className="flex gap-3 md:gap-4 lg:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
                {[1, 2, 3, 4, 5].map((item, i) => (
                  <motion.div 
                    key={item}
                    custom={i}
                    variants={cardVariants}
                    whileHover="hover"
                    className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] flex-shrink-0 snap-center rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white"
                  >
                    <div className="relative h-36 md:h-40 lg:h-48">
                      <img
                        src={getHotelImage(item + 10)}
                        alt="Hôtel"
                        className="object-cover h-full w-full"
                      />
                      {item === 1 && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.8, type: "spring" }}
                          className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-1 rounded shadow-sm"
                        >
                          Top recommandation
                        </motion.div>
                      )}
                      {item % 2 === 0 && (
                        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                          -15% aujourd'hui
                        </div>
                      )}
                      <motion.div 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-md"
                      >
                        <Heart className="w-5 h-5 text-gray-700 hover:text-red-500 hover:fill-red-500 transition-colors" />
                      </motion.div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium">Grand Hôtel {item}</h3>
                        <div className="flex items-center bg-gray-100 px-1.5 py-0.5 rounded">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-xs ml-0.5">{4.2 + item * 0.1}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-1">
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Wifi</span>
                          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Spa</span>
                        </div>
                        <div className="text-sm font-bold text-purple-600">
                          {125 + item * 10}€<span className="text-xs font-normal">/nuit</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </main>

          <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className="fixed right-5 bottom-20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-full shadow-lg z-20"
          >
            <HelpCircle size={24} />
          </motion.button>

          <AnimatePresence>
            {showQuestionnairePopup && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40"
              >
                <motion.div 
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: popupAnimation ? 1 : 0.9, opacity: popupAnimation ? 1 : 0 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >

                  <div className="relative">
                    <div 
                      className="h-32 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${DEFAULT_HOTEL_IMAGE})` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2c3e50]/80 to-[#34495e]/90 flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">Personnalisez votre expérience</h3>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDismissPopup}
                      className="absolute top-4 right-4 rounded-full bg-white/20 hover:bg-white/40 p-1.5 transition-all duration-300 text-white"
                    >
                      <X size={18} />
                    </motion.button>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 mb-6 font-medium">
                      Notre questionnaire rapide nous permettra de vous proposer des hôtels parfaitement adaptés à vos préférences et à votre style de voyage.
                    </p>
                    
                    <div className="space-y-4 mb-6">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: popupAnimation ? 1 : 0, x: popupAnimation ? 0 : -20 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50"
                      >
                        <div className="bg-[#34495e] rounded-full p-2 text-white mt-1 flex-shrink-0">
                          <Clock size={18} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2c3e50]">Rapide & simple</h4>
                          <p className="text-sm text-gray-600">10 questions seulement, moins de 2 minutes</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: popupAnimation ? 1 : 0, x: popupAnimation ? 0 : -20 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50"
                      >
                        <div className="bg-[#34495e] rounded-full p-2 text-white mt-1 flex-shrink-0">
                          <Sparkles size={18} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2c3e50]">Personnalisé pour vous</h4>
                          <p className="text-sm text-gray-600">Des suggestions qui vous correspondent vraiment</p>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: popupAnimation ? 1 : 0, x: popupAnimation ? 0 : -20 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50"
                      >
                        <div className="bg-[#34495e] rounded-full p-2 text-white mt-1 flex-shrink-0">
                          <Award size={18} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#2c3e50]">Offres sur mesure</h4>
                          <p className="text-sm text-gray-600">Des expériences adaptées à vos préférences</p>
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="flex gap-4 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleDismissPopup}
                        className="px-5 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors flex-1 border border-gray-200"
                      >
                        Plus tard
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(52, 73, 94, 0.3)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleStartQuestionnaire}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white font-medium hover:from-[#34495e] hover:to-[#3d566e] transition-all shadow-md hover:shadow-lg flex-1 flex items-center justify-center gap-2"
                      >
                        <span>Commencer</span>
                        <ChevronRight size={18} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <BottomMenu />
        </>
      )}
    </div>
  )
}
