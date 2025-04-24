"use client"

import { useState, useEffect } from "react"
import { User, Bell, Tag, Settings, Home, ChevronLeft, ChevronRight, Calendar, TrendingUp, DollarSign, X, Users, Bed, Send } from "lucide-react"
import BottomMenu from "../components/bottom-menu"

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [eventsData, setEventsData] = useState<number[]>([3, 8, 15, 22, 27])
  const [calendarView, setCalendarView] = useState<"reservations" | "prices">("reservations")
  
  const [showReservationPopup, setShowReservationPopup] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  
  const [reservationsByDay, setReservationsByDay] = useState<Record<number, any[]>>({
    3: [
      { id: 101, roomNumber: "101", roomType: "Double Standard", clientName: "Sophie Dubois", checkIn: "14:00", checkOut: "12:00", nights: 3, price: 120 },
      { id: 102, roomNumber: "205", roomType: "Suite Junior", clientName: "Thomas Mercier", checkIn: "15:00", checkOut: "11:00", nights: 2, price: 180 }
    ],
    8: [
      { id: 103, roomNumber: "302", roomType: "Double Supérieure", clientName: "Éric Martin", checkIn: "13:00", checkOut: "10:00", nights: 1, price: 150 }
    ],
    15: [
      { id: 104, roomNumber: "401", roomType: "Suite Exécutive", clientName: "Marie Laurent", checkIn: "16:00", checkOut: "12:00", nights: 4, price: 220 },
      { id: 105, roomNumber: "102", roomType: "Double Standard", clientName: "Pierre Dumont", checkIn: "14:00", checkOut: "11:00", nights: 2, price: 120 },
      { id: 106, roomNumber: "203", roomType: "Double Supérieure", clientName: "Julien Blanc", checkIn: "15:00", checkOut: "10:00", nights: 1, price: 150 }
    ],
    22: [
      { id: 107, roomNumber: "304", roomType: "Double Supérieure", clientName: "Caroline Petit", checkIn: "13:30", checkOut: "11:00", nights: 3, price: 150 },
      { id: 108, roomNumber: "402", roomType: "Suite Exécutive", clientName: "Michel Renaud", checkIn: "16:00", checkOut: "12:00", nights: 5, price: 220 }
    ],
    27: [
      { id: 109, roomNumber: "103", roomType: "Double Standard", clientName: "Aurélie Dubois", checkIn: "14:00", checkOut: "11:00", nights: 2, price: 120 },
      { id: 110, roomNumber: "206", roomType: "Suite Junior", clientName: "François Leroy", checkIn: "15:00", checkOut: "10:00", nights: 1, price: 180 },
      { id: 111, roomNumber: "305", roomType: "Double Supérieure", clientName: "Isabelle Moreau", checkIn: "13:00", checkOut: "12:00", nights: 3, price: 150 }
    ]
  })
  
  const [pricesData, setPricesData] = useState<Record<number, number>>({
    1: 120, 2: 120, 3: 120, 4: 120, 5: 150, 6: 180, 7: 180,
    8: 150, 9: 120, 10: 120, 11: 120, 12: 150, 13: 180, 14: 180,
    15: 150, 16: 120, 17: 120, 18: 120, 19: 150, 20: 180, 21: 180,
    22: 150, 23: 120, 24: 120, 25: 120, 26: 150, 27: 180, 28: 180,
    29: 150, 30: 120, 31: 120
  })
  
  const [showOfferPopup, setShowOfferPopup] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [offerPrice, setOfferPrice] = useState("")
  const [messages, setMessages] = useState<{sender: 'client' | 'hotel', text: string, timestamp: Date}[]>([])
  
  const handleOfferClick = (client: any) => {
    setSelectedClient(client)
    setShowOfferPopup(true)
    setOfferPrice("")
    setMessages([
      {
        sender: 'client',
        text: `Bonjour, je souhaite réserver une ${client.roomType} pour ${client.nights} nuit${client.nights > 1 ? 's' : ''} à ${client.price}€ par nuit.`,
        timestamp: new Date(Date.now() - 3600000) 
      }
    ])
  }

  const closeOfferPopup = () => {
    setShowOfferPopup(false)
    setSelectedClient(null)
  }
  
  const sendOffer = () => {
    if (!offerPrice.trim()) return
    
    const newMessage = {
      sender: 'hotel' as const,
      text: `Je vous propose un tarif de ${offerPrice}€ par nuit pour votre séjour.`,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
    setOfferPrice("")
    
    setTimeout(() => {
      const clientResponse = {
        sender: 'client' as const,
        text: Number(offerPrice) <= selectedClient.price * 0.9 
          ? "Merci pour cette offre ! Je l'accepte avec plaisir."
          : "Merci pour votre proposition. Pourriez-vous faire un effort supplémentaire sur le prix ?",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, clientResponse])
    }, 2000)
  }

  const handleReservationClick = (day: number) => {
    if (eventsData.includes(day)) {
      setSelectedDay(day);
      setShowReservationPopup(true);
    } else {
      alert(`Pas de réservation pour le ${day} ${formatMonthName()}`);
    }
  }
  
  const closeReservationPopup = () => {
    setShowReservationPopup(false);
    setSelectedDay(null);
  }
  

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

  const getMonthData = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    

    let firstDayWeekday = firstDayOfMonth.getDay() - 1
    if (firstDayWeekday === -1) firstDayWeekday = 6 
    

    const prevMonthLastDay = new Date(year, month, 0).getDate()
    
    const prevMonthDays = []
    for (let i = 0; i < firstDayWeekday; i++) {
      prevMonthDays.push(prevMonthLastDay - firstDayWeekday + i + 1)
    }
    

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1)
    
    const nextMonthDays = []
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length
    const remainingCells = Math.ceil(totalDaysDisplayed / 7) * 7 - totalDaysDisplayed
    
    for (let i = 0; i < remainingCells; i++) {
      nextMonthDays.push(i + 1)
    }
    
    return { prevMonthDays, currentMonthDays, nextMonthDays }
  }
  
  const formatMonthName = () => {
    return new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(currentDate)
  }
  
  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    )
  }

  const getPriceColorClass = (price: number) => {
    if (price >= 170) return "bg-red-100 text-red-700";
    if (price >= 140) return "bg-orange-100 text-orange-700";
    return "bg-green-100 text-green-700";
  }
  
  const toggleCalendarView = () => {
    setCalendarView(prev => prev === "reservations" ? "prices" : "reservations");
  }

  const { prevMonthDays, currentMonthDays, nextMonthDays } = getMonthData()

  const navItems = [
    { id: "profile", icon: User, label: "Profil" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "offers", icon: Tag, label: "Offres" },
    { id: "preferences", icon: Settings, label: "Préférences" },
    { id: "home", icon: Home, label: "Accueil" },
  ]

  return (
    <div className="flex flex-col h-screen bg-white relative">
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
                    <button 
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                      onClick={() => handleOfferClick({
                        name: "Marie Dupont",
                        roomType: "Chambre double",
                        nights: 3,
                        price: 120,
                        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                      })}
                    >
                      Faire une offre
                    </button>
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
                    <button 
                      className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                      onClick={() => handleOfferClick({
                        name: "Paul Martin",
                        roomType: "Suite",
                        nights: 1,
                        price: 180,
                        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
                      })}
                    >
                      Faire une offre
                    </button>
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

              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {prevMonthDays.map((day, index) => (
                  <div key={`prev-${index}`} className="aspect-square p-1">
                    <div className="h-full w-full flex items-center justify-center text-gray-300 text-sm">
                      {day}
                    </div>
                  </div>
                ))}
                
                {currentMonthDays.map((day) => {
                  if (calendarView === "reservations") {
                    const hasEvent = eventsData.includes(day);
                    const isTodayDate = isToday(day);
                  

                    return (
                      <div key={`current-${day}`} className="aspect-square p-1 relative">
                        <div 
                          className={`h-full w-full rounded-full flex items-center justify-center text-sm cursor-pointer
                            ${isTodayDate ? 'bg-purple-600 text-white' : ''}
                            ${hasEvent && !isTodayDate ? 'bg-yellow-100' : ''}
                            hover:bg-gray-100 transition-colors`}
                          onClick={() => hasEvent ? handleReservationClick(day) : null}
                        >
                          {day}
                          {hasEvent && <span className="absolute bottom-1 h-1 w-1 bg-yellow-400 rounded-full"></span>}
                        </div>
                      </div>
                    );
                  } else {
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

                {nextMonthDays.map((day, index) => (
                  <div key={`next-${index}`} className="aspect-square p-1">
                    <div className="h-full w-full flex items-center justify-center text-gray-300 text-sm">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              
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
                <p className="text-xs text-gray-500">Taux journalier moyen</p>
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

      {showReservationPopup && selectedDay && (
        <>
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40 flex items-center justify-center"
            onClick={closeReservationPopup}
          >
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 z-50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  Réservations du {selectedDay} {formatMonthName()}
                </h3>
                <button 
                  onClick={closeReservationPopup}
                  className="hover:bg-purple-700 p-1 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4 pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <Users className="text-purple-600" size={20} />
                    <span className="font-medium">
                      {reservationsByDay[selectedDay]?.length || 0} réservations
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="text-green-600" size={20} />
                    <span className="font-medium">
                      {reservationsByDay[selectedDay]?.reduce((acc, curr) => acc + 1, 0) || 0} chambres
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {reservationsByDay[selectedDay]?.map((reservation) => (
                    <div 
                      key={reservation.id} 
                      className="border rounded-lg p-3 hover:shadow-md transition-shadow flex flex-col gap-1"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-sm">
                          Chambre {reservation.roomNumber} - {reservation.roomType}
                        </h4>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
                          {reservation.price}€/nuit
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <User className="text-gray-500 w-4 h-4" />
                        <p className="text-sm text-gray-700">{reservation.clientName}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-2">
                        <div>
                          <span className="font-medium">Check-in:</span> {reservation.checkIn}
                        </div>
                        <div>
                          <span className="font-medium">Check-out:</span> {reservation.checkOut}
                        </div>
                        <div>
                          <span className="font-medium">Durée:</span> {reservation.nights} nuits
                        </div>
                        <div>
                          <span className="font-medium">Total:</span> {reservation.price * reservation.nights}€
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-2 gap-2">
                        <button className="text-xs bg-gray-100 hover:bg-gray-200 transition-colors rounded-full px-3 py-1">
                          Détails
                        </button>
                        <button className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors rounded-full px-3 py-1">
                          Modifier
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 flex justify-end gap-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium transition-colors"
                  onClick={closeReservationPopup}
                >
                  Fermer
                </button>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium transition-colors">
                  Gérer toutes les réservations
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {showOfferPopup && selectedClient && (
        <>
          <div 
            className="fixed inset-0 backdrop-blur-sm bg-white/30 z-40 flex items-center justify-center"
            onClick={closeOfferPopup}
          >
            <div 
              className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 z-50 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                      src={selectedClient.avatar} 
                      alt={selectedClient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Discussion avec {selectedClient.name}</h3>
                    <p className="text-sm text-blue-100">{selectedClient.roomType} • {selectedClient.nights} nuit(s)</p>
                  </div>
                </div>
                <button 
                  onClick={closeOfferPopup}
                  className="hover:bg-blue-700 p-1 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4 h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.sender === 'hotel' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-3/4 rounded-lg p-3 ${
                          msg.sender === 'hotel' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p>{msg.text}</p>
                        <p className="text-xs text-right mt-1 opacity-70">
                          {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Proposer un prix..."
                      value={offerPrice}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          setOfferPrice(value);
                        }
                      }}
                      className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-lg font-semibold text-gray-700">€</span>
                    <button 
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={sendOffer}
                      disabled={!offerPrice.trim()}
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Prix demandé par le client: <span className="font-semibold">{selectedClient.price}€</span> par nuit
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 flex justify-end gap-2">
                <button 
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium transition-colors"
                  onClick={closeOfferPopup}
                >
                  Fermer
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors">
                  Sauvegarder la discussion
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <BottomMenu />
    </div>
  )
}
