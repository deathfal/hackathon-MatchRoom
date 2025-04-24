"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Bell, Moon, Globe, Lock, HelpCircle, Info, Shield, Smartphone, Check, X, ChevronRight, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

export default function Settings() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(false)
  const [language, setLanguage] = useState("Français")
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [showConfirmLogout, setShowConfirmLogout] = useState(false)

  // Simulation du chargement des données
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleGoBack = () => {
    navigate(-1)
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled)
  }

  const openLanguageModal = () => {
    setShowLanguageModal(true)
  }

  const selectLanguage = (lang: string) => {
    setLanguage(lang)
    setShowLanguageModal(false)
  }

  const openConfirmLogout = () => {
    setShowConfirmLogout(true)
  }

  const handleLogout = () => {
    // Logique de déconnexion
    navigate("/login")
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
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  const languages = [
    { code: "fr", name: "Français" },
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
  ]

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 min-h-screen flex flex-col">
      {isLoading ? (
        <div className="flex-1 flex flex-col items-center justify-center h-screen">
          <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
          <p className="text-gray-500 font-medium mt-4">Chargement des paramètres...</p>
        </div>
      ) : (
        <>
          {/* Header amélioré avec gradient */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-700 p-5 flex items-center shadow-lg"
          >
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-white bg-white/20 rounded-full p-2 backdrop-blur-sm mr-3"
              onClick={handleGoBack}
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
                PARAMÈTRES
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
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-2xl mx-auto w-full">
            <motion.section 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Notifications */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Bell size={20} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Notifications</h3>
                      <p className="text-sm text-gray-500">Gérer les alertes et les messages</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleNotifications}
                    className={`w-12 h-6 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-purple-600' : 'bg-gray-300'}`}
                  >
                    <span 
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${notificationsEnabled ? 'left-7' : 'left-1'}`}
                    ></span>
                  </button>
                </div>
              </motion.div>

              {/* Apparence */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                      <Moon size={20} className="text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Mode sombre</h3>
                      <p className="text-sm text-gray-500">Changer l'apparence de l'application</p>
                    </div>
                  </div>
                  <button 
                    onClick={toggleDarkMode}
                    className={`w-12 h-6 rounded-full transition-colors relative ${darkModeEnabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  >
                    <span 
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${darkModeEnabled ? 'left-7' : 'left-1'}`}
                    ></span>
                  </button>
                </div>
              </motion.div>

              {/* Langue */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  onClick={openLanguageModal}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Globe size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Langue</h3>
                      <p className="text-sm text-gray-500">{language}</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </motion.button>
              </motion.div>

              {/* Sécurité */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <Lock size={20} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Sécurité</h3>
                      <p className="text-sm text-gray-500">Changer de mot de passe, vérification en 2 étapes</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </motion.button>
              </motion.div>

              {/* Confidentialité */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                      <Shield size={20} className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Confidentialité</h3>
                      <p className="text-sm text-gray-500">Gérer vos données personnelles</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </motion.button>
              </motion.div>

              {/* Aide et support */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                      <HelpCircle size={20} className="text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Aide et support</h3>
                      <p className="text-sm text-gray-500">Centre d'aide, nous contacter</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </motion.button>
              </motion.div>

              {/* À propos */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <Info size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">À propos</h3>
                      <p className="text-sm text-gray-500">Mentions légales, version de l'application</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </motion.button>
              </motion.div>

              {/* Appareil */}
              <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              >
                <motion.button
                  whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                      <Smartphone size={20} className="text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Appareil</h3>
                      <p className="text-sm text-gray-500">Stockage, cache, préférences système</p>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </motion.button>
              </motion.div>

              {/* Déconnexion */}
              <motion.div 
                variants={itemVariants}
                className="pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openConfirmLogout}
                  className="w-full p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center justify-center gap-2 font-medium"
                >
                  <LogOut size={20} />
                  Déconnexion
                </motion.button>
              </motion.div>

            </motion.section>
          </main>

          {/* Modal sélection langue */}
          <AnimatePresence>
            {showLanguageModal && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
                >
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800">Sélectionner une langue</h3>
                  </div>
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        onClick={() => selectLanguage(lang.name)}
                      >
                        <span className="font-medium text-gray-700">{lang.name}</span>
                        {language === lang.name && (
                          <Check size={18} className="text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-100 flex justify-end">
                    <button 
                      onClick={() => setShowLanguageModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                    >
                      Annuler
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Modal confirmation déconnexion */}
          <AnimatePresence>
            {showConfirmLogout && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <LogOut size={24} className="text-red-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">Confirmer la déconnexion</h3>
                    <p className="text-gray-600 text-center mb-6">Êtes-vous sûr de vouloir vous déconnecter de votre compte ?</p>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setShowConfirmLogout(false)}
                        className="flex-1 px-4 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                      >
                        <X size={18} className="mr-2" />
                        Annuler
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex-1 px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                      >
                        <LogOut size={18} className="mr-2" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Menu */}
          <BottomMenu />
        </>
      )}
    </div>
  )
}