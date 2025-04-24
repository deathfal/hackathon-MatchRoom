"use client"

import { useState, useEffect } from "react"
import { User, Bell, Tag, Settings, Home, ChevronLeft, ChevronRight, Calendar, TrendingUp, DollarSign } from "lucide-react"
import BottomMenu from "../components/bottom-menu"

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  // Calendrier - État pour le mois actuel
  const [currentDate, setCurrentDate] = useState(new Date())
  // Jours avec des événements (réservations)
  const [eventsData, setEventsData] = useState<number[]>([3, 8, 15, 22, 27])
  // Nouvel état pour basculer entre la vue réservations et la vue prix
  const [calendarView, setCalendarView] = useState<"reservations" | "prices">("reservations")
  
  // Données fictives pour les prix par jour
  const [pricesData, setPricesData] = useState<Record<number, number>>({
    1: 120, 2: 120, 3: 120, 4: 120, 5: 150, 6: 180, 7: 180,
    8: 150, 9: 120, 10: 120, 11: 120, 12: 150, 13: 180, 14: 180,
    15: 150, 16: 120, 17: 120, 18: 120, 19: 150, 20: 180, 21: 180,
    22: 150, 23: 120, 24: 120, 25: 120, 26: 150, 27: 180, 28: 180,
    29: 150, 30: 120, 31: 120
  })
  
  // Fonctions pour naviguer entre les mois
  const prevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }
  
  const nextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }
  
  // Calculer les jours pour le calendrier
  const getMonthData = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    
    // Jour de la semaine du premier jour (0 = dimanche, 1 = lundi, etc.)
    // Convertir pour que notre semaine commence un lundi (0 = lundi, 1 = mardi, etc.)
    let firstDayWeekday = firstDayOfMonth.getDay() - 1
    if (firstDayWeekday === -1) firstDayWeekday = 6 // Si c'est dimanche (0-1=-1), ça devient 6
    
    // Dernier jour du mois précédent
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    
    // Jours du mois précédent à afficher
    const prevMonthDays = []
    for (let i = 0; i < firstDayWeekday; i++) {
      prevMonthDays.push(prevMonthLastDay - firstDayWeekday + i + 1)
    }
    
    // Jours du mois actuel
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    
    // Nombre de jours du mois suivant à afficher pour compléter la grille
    const nextMonthDays = []
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length
    const remainingCells = Math.ceil(totalDaysDisplayed / 7) * 7 - totalDaysDisplayed
    
    for (let i = 0; i < remainingCells; i++) {
      nextMonthDays.push(i + 1)
    }
    
    return { prevMonthDays, currentMonthDays, nextMonthDays }
  }
  
  // Formater le nom du mois
  const formatMonthName = () => {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate)
  }
  
  // Vérifier si un jour est aujourd'hui
  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  // Fonction pour obtenir la classe de couleur en fonction du prix
  const getPriceColorClass = (price: number) => {
    if (price >= 170) return "bg-red-100 text-red-700";
    if (price >= 140) return "bg-orange-100 text-orange-700";
    return "bg-green-100 text-green-700";
  }
  
  // Basculer entre les vues du calendrier
  const toggleCalendarView = () => {
    setCalendarView(prev => prev === "reservations" ? "prices" : "reservations");
  }

  // Extraire les données calculées du calendrier
  const { prevMonthDays, currentMonthDays, nextMonthDays } = getMonthData()

  // Le reste des états et fonctions demeurent inchangés
  const navItems = [
    { id: "profile", icon: User, label: "Profil" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "offers", icon: Tag, label: "Offres" },
    { id: "preferences", icon: Settings, label: "Préférences" },
    { id: "home", icon: Home, label: "Accueil" },
  ]

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 p-4 flex flex-col pb-16">
        <div className="flex items-center mb-4">
          <div className="flex-1 mr-4">
            <div className="bg-gray-200 h-10 rounded-full w-full"></div>
          </div>
          <div className="w-8 h-8 bg-yellow-200 rounded-full"></div>
        </div>

        <div className="bg-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold">Bienvenue</h1>
              <h2 className="text-xl font-bold">Hôtel MACHINTRUC</h2>
              <div className="flex items-center mt-2">
                <span className="text-sm">XX propositions en attente</span>
              </div>
            </div>
            <div className="flex items-center">
            </div>
          </div>
          <div className="mt-3 text-right">
            <span className="text-sm bg-yellow-400 px-3 py-1 rounded-full text-gray-800 font-medium">5 propositions à valider</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {/* Dernières propositions - Maintenant en premier à gauche */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-6 bg-yellow-500 rounded-sm mr-2"></span>
              Dernières propositions
            </h3>
            <div className="flex-1 flex flex-col space-y-3">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Marie Dupont</p>
                      <p className="text-xs text-gray-500">Chambre double • 3 nuits</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">120€</p>
                    <p className="text-xs text-gray-500">par nuit</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-yellow-400 mr-1 animate-pulse"></div>
                    <span className="text-xs text-gray-600">Expire dans 2h 14min</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full hover:bg-red-200">Refuser</button>
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">Faire une offre</button>
                    <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600">Accepter</button>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">Paul Martin</p>
                      <p className="text-xs text-gray-500">Suite • 1 nuit</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">180€</p>
                    <p className="text-xs text-gray-500">par nuit</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-orange-500 mr-1 animate-pulse"></div>
                    <span className="text-xs text-gray-600">Expire dans 45min</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full hover:bg-red-200">Refuser</button>
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">Faire une offre</button>
                    <button className="px-3 py-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600">Accepter</button>
                  </div>
                </div>
              </div>
              
              <div className="text-center pt-2">
                <button className="text-sm text-yellow-500 font-medium hover:underline">
                  Voir toutes les propositions (5) →
                </button>
              </div>
            </div>
          </div>
          
          {/* Calendrier mensuel dynamique - Version améliorée avec bouton de changement de vue */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700 flex items-center">
                <span className="w-2 h-6 bg-purple-500 rounded-sm mr-2"></span>
                {calendarView === "reservations" ? "Calendrier de réservation" : "Évolution des prix"}
              </h3>
              <button 
                onClick={toggleCalendarView}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                {calendarView === "reservations" ? (
                  <>
                    <DollarSign className="w-4 h-4" />
                    <span>Voir les prix</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Voir les réservations</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex-1">
              {/* En-tête du calendrier avec navigation entre mois */}
              <div className="mb-4 flex justify-between items-center">
                <button 
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center"
                  onClick={prevMonth}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  <span className="hidden sm:inline">Mois précédent</span>
                </button>
                <h4 className="text-lg font-medium text-center capitalize">{formatMonthName()}</h4>
                <button 
                  className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 flex items-center"
                  onClick={nextMonth}
                >
                  <span className="hidden sm:inline">Mois suivant</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
              
              {/* Jours de la semaine */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Dates du calendrier */}
              <div className="grid grid-cols-7 gap-1">
                {/* Jours du mois précédent */}
                {prevMonthDays.map((day, index) => (
                  <div key={`prev-${index}`} className="aspect-square p-1">
                    <div className="h-full w-full flex items-center justify-center text-gray-300 text-sm">
                      {day}
                    </div>
                  </div>
                ))}
                
                {/* Jours du mois courant - Affichage basé sur la vue sélectionnée */}
                {currentMonthDays.map((day) => {
                  if (calendarView === "reservations") {
                    // Vue des réservations (comme avant)
                    const hasEvent = eventsData.includes(day);
                    const isTodayDate = isToday(day);
                  
                    return (
                      <div key={`current-${day}`} className="aspect-square p-1 relative">
                        <div 
                          className={`h-full w-full rounded-full flex items-center justify-center text-sm cursor-pointer
                            ${isTodayDate ? 'bg-purple-600 text-white' : ''}
                            ${hasEvent && !isTodayDate ? 'bg-yellow-100' : ''}
                            hover:bg-gray-100 transition-colors`}
                          onClick={() => alert(`Réservations du ${day} ${formatMonthName()}`)}
                        >
                          {day}
                          {hasEvent && <span className="absolute bottom-1 h-1 w-1 bg-yellow-400 rounded-full"></span>}
                        </div>
                      </div>
                    );
                  } else {
                    // Vue des prix
                    const price = pricesData[day] || 120;
                    const isTodayDate = isToday(day);
                    const priceColorClass = getPriceColorClass(price);
                    
                    return (
                      <div key={`current-${day}`} className="aspect-square p-1">
                        <div 
                          className={`h-full w-full rounded-md flex flex-col items-center justify-center cursor-pointer
                            ${isTodayDate ? 'ring-2 ring-purple-500' : ''}
                            ${priceColorClass} hover:opacity-80 transition-all`}
                          onClick={() => alert(`Prix pour le ${day} ${formatMonthName()}: ${price}€`)}
                        >
                          <span className="text-xs">{day}</span>
                          <span className="text-xs font-bold">{price}€</span>
                        </div>
                      </div>
                    );
                  }
                })}
                
                {/* Jours du mois suivant */}
                {nextMonthDays.map((day, index) => (
                  <div key={`next-${index}`} className="aspect-square p-1">
                    <div className="h-full w-full flex items-center justify-center text-gray-300 text-sm">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Légende - adaptée en fonction de la vue */}
              <div className="mt-4 flex gap-3">
                {calendarView === "reservations" ? (
                  <>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-full bg-purple-600 mr-1"></div>
                      <span>Aujourd'hui</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 rounded-full bg-yellow-100 mr-1"></div>
                      <span>Réservations</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-green-100 mr-1"></div>
                      <span>Prix bas: &lt;140€</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-orange-100 mr-1"></div>
                      <span>Prix moyen: 140€-170€</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-red-100 mr-1"></div>
                      <span>Prix élevé: &gt;170€</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Statistiques hebdomadaires */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-6 bg-blue-500 rounded-sm mr-2"></span>
              Statistiques hebdomadaires
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Taux d'occupation</p>
                <p className="text-xl font-bold text-gray-800">78%</p>
                <p className="text-xs text-green-500">+12% cette semaine</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Revenu moyen par chambre</p>
                <p className="text-xl font-bold text-gray-800">115€</p>
                <p className="text-xs text-green-500">+5% cette semaine</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Propositions reçues</p>
                <p className="text-xl font-bold text-gray-800">23</p>
                <p className="text-xs text-green-500">+8 cette semaine</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Satisfaction client</p>
                <p className="text-xl font-bold text-gray-800">4.7/5</p>
                <p className="text-xs text-green-500">+0.2 cette semaine</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <button className="text-blue-500 text-sm font-medium hover:underline">
                Voir le rapport complet →
              </button>
            </div>
          </div>
          
          {/* Disponibilité des chambres */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-500 rounded-sm mr-2"></span>
              Disponibilité des chambres
            </h3>
            <div className="flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Chambres disponibles</p>
                  <p className="text-xl font-bold text-gray-800">12</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Chambres occupées</p>
                  <p className="text-xl font-bold text-gray-800">38</p>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: "24%" }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>24% disponible</span>
                    <span>76% occupé</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="text-green-600 text-sm font-medium hover:underline">
                  Gérer les disponibilités →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomMenu />
    </div>
  )
}
