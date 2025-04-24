"use client"

import { useState, useEffect } from "react"
import { Heart, Search, Home, Bell, User, Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function BottomMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const getActiveTab = () => {
    const path = location.pathname
    if (path === "/favorites") return "favorites"
    if (path === "/maps" || path === "/search") return "search"
    if (path === "/") return "home"
    if (path === "/notifications") return "notifications"
    if (path === "/profil" || path === "/profile") return "profile"
    return "home"
  }
  
  const [activeTab, setActiveTab] = useState(getActiveTab())

  const menuItems = [
    { id: "favorites", icon: Heart, label: "Favoris", path: "/favorites" },
    { id: "search", icon: Search, label: "Recherche", path: "/search" },
    { id: "home", icon: Home, label: "Accueil", path: "/" },
    { id: "notifications", icon: Bell, label: "Notifications", path: "/notifications" },
    { id: "profile", icon: User, label: "Profil", path: "/profil" },
  ]

  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId)
    navigate(path)
    if (isDesktop) {
      setIsMenuOpen(false)
    }
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

        <button 
          id="menu-toggle-button"
          onClick={toggleMenu} 
          className="fixed top-4 right-4 z-30 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div 
            className="fixed inset-0 bg-gray-600/30 backdrop-blur-sm z-20 transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <div 
          id="desktop-menu"
          className={`
            fixed right-0 top-0 h-full bg-white/95 backdrop-blur-sm shadow-lg flex flex-col z-20
            transition-all duration-300 transform 
            ${isMenuOpen ? "translate-x-0 w-64" : "translate-x-[100%] w-0 overflow-hidden"}
          `}
        >
          <div className="p-4 mb-6 flex items-center justify-between">
            <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold">
              M
            </div>
          </div>
          
          <div className="flex-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <button 
                  key={item.id} 
                  onClick={() => handleTabClick(item.id, item.path)} 
                  className={`
                    w-full flex items-center py-3 px-3 mb-2 rounded-lg transition-colors
                    ${isActive 
                      ? "bg-purple-50 text-purple-600" 
                      : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className={`
                    flex items-center justify-center
                    ${isActive ? "text-purple-600" : "text-gray-500"}
                  `}>
                    <Icon size={isActive ? 22 : 20} />
                  </div>
                  <span className={`
                    ml-3 font-medium whitespace-nowrap
                    ${isActive ? "text-purple-600" : "text-gray-700"}
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1 h-6 bg-purple-600 rounded-full"></div>
                  )}
                </button>
              )
            })}
          </div>
          
          <div className="p-4 mt-auto border-t border-gray-100">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=32&width=32"
                  alt="Profile"
                  className="object-cover h-full w-full rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm text-gray-800">User 29</p>
                <p className="text-xs text-gray-500">user29@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-gray-100 border-t">
      <div className="flex justify-around items-center py-2 max-w-screen-2xl mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button 
              key={item.id} 
              onClick={() => handleTabClick(item.id, item.path)} 
              className="flex flex-col items-center bg-transparent border-0 cursor-pointer"
            >
              <div
                className={`p-2 md:p-3 rounded-full ${activeTab === item.id ? "bg-gray-800 text-amber-400" : "text-gray-800"}`}
              >
                <Icon size={20} className="md:w-6 md:h-6" />
              </div>
              <span className="text-xs md:text-sm mt-1">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
