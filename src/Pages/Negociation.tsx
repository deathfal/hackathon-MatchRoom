"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Star, X, Check, Clock, Send, MessageSquare, Hotel } from "lucide-react"
import BottomMenu from "../components/bottom-menu"
import { motion, AnimatePresence } from "framer-motion"

interface NegotiationMessage {
  id: number
  sender: 'hotel' | 'user'
  text: string
  timestamp: Date
}

interface Negotiation {
  id: number
  hotelName: string
  hotelImage: string
  location: string
  rating: number
  status: 'pending' | 'accepted' | 'declined'
  lastUpdate: Date
  price: number
  originalPrice: number
  responseTimeHours: number
  roomType: string
  checkIn: string
  checkOut: string
  nights: number
  messages: NegotiationMessage[]
}

export default function NegotiationPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [negotiations, setNegotiations] = useState<Negotiation[]>([])
  const [selectedNegotiation, setSelectedNegotiation] = useState<Negotiation | null>(null)
  const [showDetailPopup, setShowDetailPopup] = useState(false)
  const [messageText, setMessageText] = useState("")

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setNegotiations(mockNegotiations)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleBack = () => {
    navigate(-1)
  }

  const openNegotiationDetail = (negotiation: Negotiation) => {
    setSelectedNegotiation(negotiation)
    setShowDetailPopup(true)
  }

  const closeNegotiationDetail = () => {
    setShowDetailPopup(false)
  }

  const sendMessage = () => {
    if (!messageText.trim() || !selectedNegotiation) return

    const newMessage: NegotiationMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageText,
      timestamp: new Date()
    }

    // Copier les négociations et ajouter le nouveau message
    const updatedNegotiations = negotiations.map(neg => {
      if (neg.id === selectedNegotiation.id) {
        return {
          ...neg,
          messages: [...neg.messages, newMessage]
        }
      }
      return neg
    })

    setNegotiations(updatedNegotiations)
    
    // Mettre à jour la négociation sélectionnée
    if (selectedNegotiation) {
      setSelectedNegotiation({
        ...selectedNegotiation,
        messages: [...selectedNegotiation.messages, newMessage]
      })
    }
    
    setMessageText("")

    // Simuler une réponse de l'hôtel
    setTimeout(() => {
      const hotelResponse: NegotiationMessage = {
        id: Date.now() + 1,
        sender: 'hotel',
        text: "Merci pour votre message. Nous étudions votre demande et vous répondrons dans les plus brefs délais.",
        timestamp: new Date()
      }

      const updatedWithResponse = negotiations.map(neg => {
        if (neg.id === selectedNegotiation?.id) {
          return {
            ...neg,
            messages: [...neg.messages, newMessage, hotelResponse]
          }
        }
        return neg
      })

      setNegotiations(updatedWithResponse)
      
      if (selectedNegotiation) {
        setSelectedNegotiation({
          ...selectedNegotiation,
          messages: [...selectedNegotiation.messages, newMessage, hotelResponse]
        })
      }
    }, 2000)
  }

  // Formater la date en français
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-700 p-4 flex justify-between items-center shadow-lg"
      >
        <div className="flex items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white bg-white/20 rounded-full p-2 backdrop-blur-sm"
            onClick={handleBack}
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
              MES NÉGOCIATIONS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white/80 text-lg md:text-xl"
            >
              Suivez vos offres en cours
            </motion.p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48 gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div>
            <p className="text-gray-500 font-medium">Chargement de vos négociations...</p>
          </div>
        ) : (
          <>
            {negotiations.length === 0 ? (
              <div className="text-center p-10">
                <div className="flex justify-center">
                  <MessageSquare size={48} className="text-gray-300" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-700">Aucune négociation en cours</h3>
                <p className="text-gray-500 mt-2">Vos futures négociations avec les hôtels apparaîtront ici.</p>
                <button 
                  onClick={() => navigate('/search')} 
                  className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Chercher des hôtels
                </button>
              </div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4 max-w-2xl mx-auto"
              >
                <h2 className="text-gray-700 font-medium mb-4">
                  {negotiations.length} négociation{negotiations.length > 1 ? 's' : ''} en cours
                </h2>
                
                {negotiations.map(negotiation => (
                  <motion.div
                    key={negotiation.id}
                    variants={itemVariants}
                    whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${
                      negotiation.status === 'accepted' ? 'border-green-500 border-l-4' : 
                      negotiation.status === 'declined' ? 'border-red-500 border-l-4' : 
                      'border-yellow-500 border-l-4'
                    }`}
                    onClick={() => openNegotiationDetail(negotiation)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={negotiation.hotelImage}
                          alt={negotiation.hotelName} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-800">{negotiation.hotelName}</h3>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            negotiation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            negotiation.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {negotiation.status === 'pending' ? 'En attente' :
                             negotiation.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={14} className="text-yellow-500 fill-yellow-500" />
                          <span className="text-sm text-gray-600">{negotiation.rating}</span>
                          <span className="mx-1 text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{negotiation.location}</span>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-gray-500" />
                            <span className="text-xs text-gray-500">
                              Réponse en ~{negotiation.responseTimeHours}h
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-purple-600 font-medium">{negotiation.price}€</span>
                            <span className="text-xs text-gray-500 ml-1 line-through">{negotiation.originalPrice}€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </main>

      {/* Popup de détail de négociation */}
      <AnimatePresence>
        {showDetailPopup && selectedNegotiation && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* En-tête */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={selectedNegotiation.hotelImage}
                        alt={selectedNegotiation.hotelName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-medium">{selectedNegotiation.hotelName}</h2>
                      <div className="flex items-center gap-1 text-sm text-white/80">
                        <Star size={14} className="fill-white" />
                        <span>{selectedNegotiation.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{selectedNegotiation.location}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={closeNegotiationDetail}
                    className="text-white/90 hover:text-white p-1 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              {/* Détails de la réservation */}
              <div className="bg-purple-50 p-3">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-600">{selectedNegotiation.roomType}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{selectedNegotiation.nights} nuit{selectedNegotiation.nights > 1 ? 's' : ''}</span>
                  </div>
                  <div className="font-medium">
                    <span className="text-purple-600">{selectedNegotiation.price}€</span>
                    <span className="text-gray-500 line-through ml-1 text-xs">{selectedNegotiation.originalPrice}€</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Du {selectedNegotiation.checkIn} au {selectedNegotiation.checkOut}
                </div>
              </div>
              
              {/* Historique des messages */}
              <div className="p-4 h-64 overflow-y-auto space-y-4">
                {selectedNegotiation.messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-purple-100 text-purple-900' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70 text-right">
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Zone de saisie de message */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Votre message..."
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button 
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                    className={`bg-purple-600 text-white p-2 rounded-full ${
                      messageText.trim() ? 'hover:bg-purple-700' : 'opacity-50 cursor-not-allowed'
                    } transition-colors`}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
              
              {/* Pied de page */}
              <div className="bg-gray-50 p-3 border-t flex justify-end gap-2">
                <button
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium transition-colors"
                  onClick={closeNegotiationDetail}
                >
                  Fermer
                </button>
                <button
                  className="px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-colors flex items-center gap-1"
                  onClick={() => {
                    navigate(`/search?hotel=${selectedNegotiation.id}`)
                  }}
                >
                  <Hotel size={16} />
                  Voir l'hôtel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Menu */}
      <BottomMenu />
    </div>
  )
}

// Données fictives pour les négociations
const mockNegotiations: Negotiation[] = [
  {
    id: 1,
    hotelName: "Hôtel Splendide Paris",
    hotelImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Paris",
    rating: 4.7,
    status: 'pending',
    lastUpdate: new Date(),
    price: 135,
    originalPrice: 150,
    responseTimeHours: 2,
    roomType: "Chambre Double Deluxe",
    checkIn: "15/06/2024",
    checkOut: "18/06/2024",
    nights: 3,
    messages: [
      {
        id: 101,
        sender: 'user',
        text: "Bonjour, je souhaite réserver une chambre pour 3 nuits mais votre tarif est un peu au-dessus de mon budget. Serait-il possible d'obtenir un tarif préférentiel à 135€ par nuit au lieu de 150€ ?",
        timestamp: new Date(Date.now() - 7200000) // 2 heures avant
      },
      {
        id: 102,
        sender: 'hotel',
        text: "Bonjour, nous avons bien reçu votre demande. Notre service de réservation l'étudie actuellement et reviendra vers vous rapidement avec une proposition.",
        timestamp: new Date(Date.now() - 5400000) // 1h30 avant
      }
    ]
  },
  {
    id: 2,
    hotelName: "Grand Hôtel Marseille",
    hotelImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Marseille",
    rating: 4.3,
    status: 'accepted',
    lastUpdate: new Date(Date.now() - 86400000), // 1 jour avant
    price: 110,
    originalPrice: 130,
    responseTimeHours: 1,
    roomType: "Chambre Vue Mer",
    checkIn: "22/06/2024",
    checkOut: "25/06/2024",
    nights: 3,
    messages: [
      {
        id: 201,
        sender: 'user',
        text: "Bonjour, serait-il possible d'avoir une réduction sur la chambre vue mer pour un séjour de 3 nuits ?",
        timestamp: new Date(Date.now() - 172800000) // 2 jours avant
      },
      {
        id: 202,
        sender: 'hotel',
        text: "Bonjour, nous serions ravis de vous accueillir. Nous pouvons vous proposer un tarif de 110€ par nuit au lieu de 130€ pour votre séjour de 3 nuits.",
        timestamp: new Date(Date.now() - 158400000) // 1 jour et 20 heures avant
      },
      {
        id: 203,
        sender: 'user',
        text: "C'est parfait ! Merci beaucoup pour cette proposition, je l'accepte.",
        timestamp: new Date(Date.now() - 144000000) // 1 jour et 16 heures avant
      },
      {
        id: 204,
        sender: 'hotel',
        text: "Excellent ! Votre réservation est confirmée. Nous vous attendons avec plaisir le 22 juin. N'hésitez pas si vous avez d'autres questions.",
        timestamp: new Date(Date.now() - 86400000) // 1 jour avant
      }
    ]
  },
  {
    id: 3,
    hotelName: "Lyon Palace Hotel",
    hotelImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    location: "Lyon",
    rating: 4.5,
    status: 'pending',
    lastUpdate: new Date(Date.now() - 43200000), // 12 heures avant
    price: 145,
    originalPrice: 160,
    responseTimeHours: 3,
    roomType: "Suite Junior",
    checkIn: "01/07/2024",
    checkOut: "04/07/2024",
    nights: 3,
    messages: [
      {
        id: 301,
        sender: 'user',
        text: "Bonjour, j'envisage de réserver une Suite Junior pour 3 nuits début juillet. Est-il possible d'avoir un tarif préférentiel ?",
        timestamp: new Date(Date.now() - 43200000) // 12 heures avant
      }
    ]
  }
]
