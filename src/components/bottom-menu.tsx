"use client"

import { useState, useEffect } from "react"
import { Heart, Search, Home, Bell, User, Menu, X, Compass, MessageCircle, ChevronLeft, ChevronRight, Settings } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function BottomMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(false)
  
  const getActiveTab = () => {
    const path = location.pathname
    if (path === "/favorites") return "favorites"
    if (path === "/maps" || path === "/search") return "explore"
    if (path === "/") return "home"
    if (path === "/profil" || path === "/profile") return "profile"
    if (path === "/negociation") return "negociation"
    if (path === "/settings") return "settings"
    if (path === "/search") return "search"
    return "home"
  }
  
  const [activeTab, setActiveTab] = useState(getActiveTab())

  const menuItems = [
    { id: "home", icon: Home, label: "Accueil", path: "/" },
    { id: "explore", icon: Compass, label: "Carte", path: "/maps" },
    { id: "favorites", icon: Heart, label: "Favoris", path: "/favorites" },
    { id: "Negociation", icon: MessageCircle, label: "Négociation", path: "/negociation" },
    { id: "settings", icon: Settings, label: "Paramètres", path: "/settings" },
  ]


  const desktopMenuItems = [
    { id: "home", icon: Home, label: "Accueil", path: "/" },
    { id: "search", icon: Search, label: "Recherche", path: "/search" },
    { id: "explore", icon: Compass, label: "Carte", path: "/maps" },
    { id: "favorites", icon: Heart, label: "Favoris", path: "/favorites" },
    { id: "Negociation", icon: MessageCircle, label: "Négociation", path: "/negociation" },
    { id: "settings", icon: Settings, label: "Paramètres", path: "/settings" },
  ]

  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId)
    navigate(path)
    if (isDesktop) {
      setIsMenuOpen(false)
    }
  }

  const handleProfileNavigation = () => {
    navigate('/profil')
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuElement = document.getElementById('desktop-menu');
      const menuButton = document.getElementById('menu-toggle-button');
      
      if (
        isMenuOpen && 
        menuElement && 
        !menuElement.contains(event.target as Node) && 
        menuButton && 
        !menuButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (isDesktop) {
    return (
      <>
        <motion.button 
          id="menu-toggle-button"
          onClick={toggleMenu}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: isMenuOpen ? 0 : 15 }} 
          whileTap={{ scale: 0.9 }}
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-gray-600/30 backdrop-blur-sm z-30"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        <motion.div 
          id="desktop-menu"
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? 0 : "100%" }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className="fixed right-0 top-0 h-full bg-white/95 backdrop-blur-sm shadow-lg flex flex-col z-40 w-72"
        >
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-6 mb-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                M
              </div>
              <h2 className="text-xl font-semibold text-gray-800">MatchRoom</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </motion.button>
          </motion.div>
          
          <div className="flex-1 px-4 overflow-y-auto">
            <div className="space-y-2">
              {desktopMenuItems.map((item, index) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <motion.button 
                    key={item.id} 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.1 + index * 0.05, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    onClick={() => handleTabClick(item.id, item.path)} 
                    className={`
                      w-full flex items-center py-3.5 px-4 rounded-xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700' 
                        : 'text-gray-600 hover:bg-gray-100/70'
                      }
                    `}
                  >
                    <div className={`
                      flex items-center justify-center rounded-full
                      ${isActive 
                        ? 'text-purple-600' 
                        : 'text-gray-500 group-hover:text-gray-700'
                      }
                    `}>
                      <Icon size={22} />
                    </div>
                    
                    <span className={`
                      ml-4 font-medium
                      ${isActive 
                        ? 'text-purple-700' 
                        : 'text-gray-700 group-hover:text-gray-900'
                      }
                    `}>
                      {item.label}
                    </span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="sidebar-active-indicator"
                        className="ml-auto w-1.5 h-6 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>

            <div className="mt-8 mb-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70" />
            
            <div className="space-y-2">
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="p-4 mt-auto border-t border-gray-100 flex items-center"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-amber-400 to-orange-500 flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                alt="Profile"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="font-medium text-sm text-gray-800">Élise Martin</p>
              <p className="text-xs text-gray-500">Premium</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={handleProfileNavigation}
              aria-label="Voir le profil"
            >
              <ChevronRight size={16} className="text-gray-500" />
            </motion.button>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 w-full bg-white border-t z-40 pb-safe"
      >
        <div className="relative h-16">
          <div className="absolute inset-0 backdrop-blur-md bg-white/90"></div>
          
          <AnimatePresence initial={false}>
            <motion.div
              key={activeTab}
              layoutId="nav-indicator"
              className="absolute bottom-12 h-1 w-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
              style={{
                left: `calc((100% / ${menuItems.length}) * ${menuItems.findIndex(item => item.id === activeTab) + 0.5} - 24px)`
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </AnimatePresence>
          
          <div className="flex justify-around items-center h-full relative z-10">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <motion.button 
                  key={item.id} 
                  onClick={() => handleTabClick(item.id, item.path)} 
                  className="flex flex-col items-center justify-center w-full h-full"
                  initial={false}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ 
                      y: isActive ? -4 : 0,
                      scale: isActive ? 1.1 : 1
                    }}
                    className={`${
                      isActive 
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30" 
                        : "text-gray-500 bg-transparent"
                    } p-2 rounded-xl transition-colors`}
                  >
                    <Icon size={20} className={isActive ? "stroke-[2.5]" : ""} />
                  </motion.div>
                  
                  <motion.span 
                    className={`text-xs mt-0.5 ${isActive ? "font-semibold text-gray-900" : "text-gray-500"}`}
                    animate={{ opacity: isActive ? 1 : 0.8 }}
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              );
            })}

            <motion.button 
              onClick={() => handleProfileNavigation()}
              className="flex flex-col items-center justify-center w-full h-full"
              initial={false}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={{ 
                  y: activeTab === "profile" ? -4 : 0,
                  scale: activeTab === "profile" ? 1.1 : 1
                }}
                className={`${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30" 
                    : "text-gray-500 bg-transparent"
                } p-2 rounded-xl transition-colors`}
              >
                <User size={20} className={activeTab === "profile" ? "stroke-[2.5]" : ""} />
              </motion.div>
              
              <motion.span 
                className={`text-xs mt-0.5 ${activeTab === "profile" ? "font-semibold text-gray-900" : "text-gray-500"}`}
                animate={{ opacity: activeTab === "profile" ? 1 : 0.8 }}
              >
                Profil
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      <motion.button
        initial={{ y: 100, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20,
          delay: 0.3 
        }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/search')}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white"
      >
        <Search size={24} className="stroke-[2.5]" />
      </motion.button>
    </>
  );
}
