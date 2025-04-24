"use client"

import { useState } from "react"
import { Heart, Search, Home, Bell, User } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export default function BottomMenu() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Déterminer l'onglet actif en fonction de l'URL actuelle
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
    { id: "search", icon: Search, label: "Recherche", path: "/maps" },
    { id: "home", icon: Home, label: "Accueil", path: "/" },
    { id: "notifications", icon: Bell, label: "Notifications", path: "/notifications" },
    { id: "profile", icon: User, label: "Profil", path: "/profil" },
  ]

  const handleTabClick = (tabId: string, path: string) => {
    setActiveTab(tabId)
    navigate(path) // Redirection vers la page correspondante
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
              <span className="text-xs md:text-sm mt-1 hidden md:block">
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
