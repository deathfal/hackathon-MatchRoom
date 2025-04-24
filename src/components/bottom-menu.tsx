"use client"

import { useState } from "react"
import { Heart, Search, Home, Bell, User } from "lucide-react"

export default function BottomMenu() {
  const [activeTab, setActiveTab] = useState("home")

  const menuItems = [
    { id: "favorites", icon: Heart, label: "Favoris" },
    { id: "search", icon: Search, label: "Recherche" },
    { id: "home", icon: Home, label: "Accueil" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "profile", icon: User, label: "Profil" },
  ]

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    // Ici vous pouvez ajouter la logique de navigation si nécessaire
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-gray-100 border-t">
      <div className="flex justify-around items-center py-2 max-w-screen-2xl mx-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button 
              key={item.id} 
              onClick={() => handleTabClick(item.id)} 
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
