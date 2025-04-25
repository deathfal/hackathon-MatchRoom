"use client"

import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ChevronLeft, Wifi, Coffee, Tv, Bath, Check, Star, User, CarFront, Snowflake, Waves, DollarSign, Heart, Info, Award, X, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import BottomMenu from "../components/bottom-menu"

interface Room {
  id: number
  name: string
  type: string
  price: number
  originalPrice: number | null
  capacity: number
  size: number
  beds: string
  availability: number
  images: string[]
  features: string[]
  cancelPolicy: string
  description: string
}

interface HotelDetails {
  id: number
  name: string
  location: string
  description: string
  rating: number
  reviewCount: number
  image: string
}

export default function RoomSelectionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [rooms, setRooms] = useState<Room[]>([])
  const [hotel, setHotel] = useState<HotelDetails | null>(null)
  const [selectedDates, setSelectedDates] = useState({ checkIn: "15/06/2024", checkOut: "18/06/2024", nights: 3 })
  const [guests, setGuests] = useState({ adults: 2, children: 0 })
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null)
  const [showRoomDetail, setShowRoomDetail] = useState(false)
  const [showOfferPopup, setShowOfferPopup] = useState(false)
  const [offerPrice, setOfferPrice] = useState("")
  const [offerSuccess, setOfferSuccess] = useState(false)
  const [offerSending, setOfferSending] = useState(false)
  const [offerRejected, setOfferRejected] = useState(false)

  const queryParams = new URLSearchParams(location.search)
  const hotelId = queryParams.get('hotel') || '1'

  useEffect(() => {
    const timer = setTimeout(() => {
      setHotel(mockHotel)
      setRooms(mockRooms)
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [hotelId])

  const handleBack = () => {
    navigate(-1)
  }

  const showRoomDetails = (roomId: number) => {
    setSelectedRoomId(roomId)
    setShowRoomDetail(true)
  }

  const closeRoomDetail = () => {
    setShowRoomDetail(false)
  }

  const handleReservation = (roomId: number) => {
    setSelectedRoomId(roomId)
    setShowOfferPopup(true)
    setOfferPrice("")
    setOfferSuccess(false)
    setOfferRejected(false)
  }
  
  const closeOfferPopup = () => {
    setShowOfferPopup(false)
  }
  
  const sendOffer = () => {
    if (!offerPrice.trim() || !selectedRoomId) return
    
    const room = rooms.find(r => r.id === selectedRoomId)
    if (!room) return
    
    setOfferSending(true)
    
    setTimeout(() => {
      setOfferSending(false)
      

      const minimumAcceptablePrice = room.price * 0.5
      
      if (parseInt(offerPrice) < minimumAcceptablePrice) {
        setOfferRejected(true)
      } else {
        setOfferSuccess(true)
        
        setTimeout(() => {
          navigate('/negociation')
        }, 2000)
      }
    }, 1500)
  }

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'Wifi gratuit':
        return <Wifi className="w-4 h-4" />
      case 'Petit-déjeuner inclus':
        return <Coffee className="w-4 h-4" />
      case 'Télévision':
        return <Tv className="w-4 h-4" />
      case 'Salle de bain privée':
        return <Bath className="w-4 h-4" />
      case 'Climatisation':
        return <Snowflake className="w-4 h-4" />
      case 'Vue sur piscine':
        return <Waves className="w-4 h-4" />
      case 'Parking gratuit':
        return <CarFront className="w-4 h-4" />
      default:
        return <Check className="w-4 h-4" />
    }
  }

  const displayPrice = (price: number, originalPrice: number | null) => (
    <div className="flex items-end gap-1">
      <span className="text-xl font-bold text-purple-600">{price}€</span>
      {originalPrice && (
        <span className="text-sm line-through text-gray-400 mb-0.5">{originalPrice}€</span>
      )}
      <span className="text-sm text-gray-500 mb-0.5">/nuit</span>
    </div>
  )

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
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm"
      >
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <button 
            onClick={handleBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          
          {isLoading ? (
            <div className="animate-pulse h-6 bg-gray-200 rounded w-48"></div>
          ) : (
            <div>
              <h1 className="font-medium text-gray-900">{hotel?.name}</h1>
              <div className="flex items-center text-sm text-gray-500">
                <span>{selectedDates.checkIn} - {selectedDates.checkOut}</span>
                <span className="mx-1">•</span>
                <span>{selectedDates.nights} nuit{selectedDates.nights > 1 ? 's' : ''}</span>
                <span className="mx-1">•</span>
                <span>{guests.adults + guests.children} voyageur{guests.adults + guests.children > 1 ? 's' : ''}</span>
              </div>
            </div>
          )}
        </div>
      </motion.header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-4 pb-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Chargement des chambres disponibles...</p>
          </div>
        ) : (
          <>
            <motion.section 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden">
                  <img 
                    src={hotel?.image} 
                    alt={hotel?.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{hotel?.name}</h1>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star size={16} className="text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-gray-700 font-medium">{hotel?.rating}</span>
                        </div>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">{hotel?.reviewCount} avis</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-gray-600">{hotel?.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Heart size={20} className="text-gray-600" />
                      </button>
                      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Info size={20} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-gray-600 line-clamp-3">{hotel?.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Award size={14} />
                      Annulation gratuite jusqu'à 48h avant
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Check size={14} />
                      Paiement à l'arrivée
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
            
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800">Chambres disponibles</h2>
              <div className="space-y-4">
                {rooms.map(room => (
                  <motion.div
                    key={room.id}
                    variants={itemVariants}
                    className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 h-48 overflow-hidden">
                        <img 
                          src={room.images[0]} 
                          alt={room.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="w-full md:w-2/3 p-4 flex flex-col">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-gray-800">{room.name}</h3>
                          {room.availability < 3 && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-medium">
                              Plus que {room.availability} disponible{room.availability > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{room.type}</p>
                        
                        <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User size={16} />
                            <span>Max {room.capacity} pers.</span>
                          </div>
                          <span className="text-gray-300">|</span>
                          <span>{room.size} m²</span>
                          <span className="text-gray-300">|</span>
                          <span>{room.beds}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {room.features.slice(0, 4).map((feature, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                              {getFeatureIcon(feature)}
                              {feature}
                            </span>
                          ))}
                          {room.features.length > 4 && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                              +{room.features.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="mt-auto pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="flex items-center gap-2">
                            {displayPrice(room.price, room.originalPrice)}
                            
                            {room.originalPrice && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                <DollarSign size={12} />
                                {Math.round((1 - room.price / room.originalPrice) * 100)}% de réduction
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => showRoomDetails(room.id)}
                              className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm font-medium flex-1 sm:flex-none"
                            >
                              Détails
                            </button>
                            <button
                              onClick={() => handleReservation(room.id)}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex-1 sm:flex-none"
                            >
                              Faire Votre Offre
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </main>

      <AnimatePresence>
        {showRoomDetail && selectedRoomId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 flex items-center justify-center p-4"
            onClick={closeRoomDetail}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-xl overflow-hidden max-w-2xl w-full max-h-[80vh] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              {rooms.find(r => r.id === selectedRoomId)?.images && (
                <div className="relative h-64">
                  <img 
                    src={rooms.find(r => r.id === selectedRoomId)?.images[0]} 
                    alt="Chambre" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    onClick={closeRoomDetail}
                    className="absolute top-4 right-4 bg-white/80 p-1 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                </div>
              )}

              <div className="p-6 overflow-y-auto flex-1">
                <h3 className="text-xl font-bold text-gray-800">
                  {rooms.find(r => r.id === selectedRoomId)?.name}
                </h3>
                <p className="text-gray-600 mt-1">{rooms.find(r => r.id === selectedRoomId)?.type}</p>

                <div className="flex items-center gap-3 mt-3 text-sm text-gray-700 border-b border-gray-200 pb-4">
                  <div className="flex items-center gap-1">
                    <User size={18} />
                    <span>Max {rooms.find(r => r.id === selectedRoomId)?.capacity} personnes</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <span>{rooms.find(r => r.id === selectedRoomId)?.size} m²</span>
                  <span className="text-gray-300">|</span>
                  <span>{rooms.find(r => r.id === selectedRoomId)?.beds}</span>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-600">{rooms.find(r => r.id === selectedRoomId)?.description}</p>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Équipements et services</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {rooms.find(r => r.id === selectedRoomId)?.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="text-purple-600">{getFeatureIcon(feature)}</span>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-gray-800 mb-2">Conditions d'annulation</h4>
                  <p className="text-gray-600 text-sm">{rooms.find(r => r.id === selectedRoomId)?.cancelPolicy}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  {displayPrice(
                    rooms.find(r => r.id === selectedRoomId)?.price || 0, 
                    rooms.find(r => r.id === selectedRoomId)?.originalPrice || null
                  )}
                </div>
                <button
                  onClick={() => {
                    closeRoomDetail()
                    handleReservation(selectedRoomId)
                  }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  Faire Mon Offre
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup pour faire une offre */}
      <AnimatePresence>
        {showOfferPopup && selectedRoomId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 z-40 flex items-center justify-center p-4"
            onClick={closeOfferPopup}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-xl overflow-hidden max-w-lg w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img 
                      src={rooms.find(r => r.id === selectedRoomId)?.images[0]} 
                      alt="Chambre" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Faire une offre</h3>
                    <p className="text-sm text-purple-100">
                      {rooms.find(r => r.id === selectedRoomId)?.name} • {selectedDates.nights} nuit(s)
                    </p>
                  </div>
                </div>
                <button 
                  onClick={closeOfferPopup}
                  className="hover:bg-purple-700 p-1 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {offerSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Offre envoyée avec succès !</h3>
                    <p className="text-gray-600 mb-6">
                      Votre proposition de {offerPrice}€ par nuit a été transmise à l'hôtel. 
                      Vous recevrez une réponse dans les prochaines heures.
                    </p>
                    <p className="text-sm text-gray-500">
                      Redirection vers vos négociations en cours...
                    </p>
                  </div>
                ) : offerRejected ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <X size={32} className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-medium text-gray-800 mb-2">Offre refusée</h3>
                    <p className="text-gray-600 mb-6">
                      Votre proposition de {offerPrice}€ par nuit est trop basse 
                      (inférieure à 50% du prix affiché: {Math.ceil(rooms.find(r => r.id === selectedRoomId)?.price! * 0.5)}€).
                      <br /><br />
                      Les hôtels peuvent rejeter automatiquement les offres qu'ils considèrent comme déraisonnables.
                    </p>
                    <button
                      onClick={() => setOfferRejected(false)}
                      className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                    >
                      Proposer un nouveau prix
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Proposez votre prix</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Prix affiché</p>
                          <p className="text-xl font-bold text-gray-800">
                            {rooms.find(r => r.id === selectedRoomId)?.price}€
                            <span className="text-sm font-normal text-gray-500">/nuit</span>
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total pour {selectedDates.nights} nuits</p>
                          <p className="text-lg font-medium text-gray-800">
                            {(rooms.find(r => r.id === selectedRoomId)?.price || 0) * selectedDates.nights}€
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">
                      Vous pouvez proposer un prix par nuit différent. 
                      L'hôtel vous répondra dans les plus brefs délais.
                    </p>
                    
                    <div className="mb-4">
                      <label htmlFor="offerPrice" className="block text-sm font-medium text-gray-700 mb-1">
                        Votre proposition (par nuit)
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          id="offerPrice"
                          placeholder="Ex: 95"
                          value={offerPrice}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value)) {
                              setOfferPrice(value);
                            }
                          }}
                          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <span className="text-lg font-semibold text-gray-700">€</span>
                      </div>
                    </div>
                    
                    {offerPrice && (
                      <div className="bg-purple-50 rounded-lg p-3 mb-6">
                        <p className="text-sm text-purple-800">
                          Total proposé : <span className="font-bold">{parseInt(offerPrice) * selectedDates.nights}€</span> 
                          pour {selectedDates.nights} nuit(s)
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          {parseInt(offerPrice) < (rooms.find(r => r.id === selectedRoomId)?.price || 0) ? 
                            `Économisez ${((rooms.find(r => r.id === selectedRoomId)?.price || 0) - parseInt(offerPrice)) * selectedDates.nights}€ sur votre séjour` :
                            "Prix identique ou supérieur au tarif affiché"}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="bg-gray-50 p-4 border-t flex justify-end gap-2">
                {!offerSuccess && !offerRejected && (
                  <>
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium transition-colors"
                      onClick={closeOfferPopup}
                    >
                      Annuler
                    </button>
                    <button 
                      className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium transition-colors flex items-center gap-2 ${
                        !offerPrice.trim() || offerSending ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      onClick={sendOffer}
                      disabled={!offerPrice.trim() || offerSending}
                    >
                      {offerSending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Envoyer la proposition
                        </>
                      )}
                    </button>
                  </>
                )}
                {offerRejected && (
                  <button 
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 text-sm font-medium transition-colors"
                    onClick={closeOfferPopup}
                  >
                    Fermer
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomMenu />
    </div>
  )
}


const mockHotel: HotelDetails = {
  id: 1,
  name: "Hôtel Riviera Paris",
  location: "Paris, 8ème arrondissement",
  description: "Situé au cœur de Paris, l'Hôtel Riviera offre une expérience unique alliant luxe, confort et élégance. À proximité des Champs-Élysées et de la Tour Eiffel, cet établissement 4 étoiles dispose d'un spa, d'un restaurant gastronomique et d'un service personnalisé pour rendre votre séjour inoubliable.",
  rating: 4.7,
  reviewCount: 243,
  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}

const mockRooms: Room[] = [
  {
    id: 101,
    name: "Chambre Classique",
    type: "Chambre Double",
    price: 120,
    originalPrice: 145,
    capacity: 2,
    size: 22,
    beds: "1 lit double",
    availability: 5,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    features: ["Wifi gratuit", "Télévision", "Salle de bain privée", "Climatisation", "Sèche-cheveux", "Coffre-fort"],
    cancelPolicy: "Annulation gratuite jusqu'à 48 heures avant l'arrivée. Annulation tardive ou non-présentation : 100% du prix de la première nuit.",
    description: "Notre chambre Classique est parfaite pour les voyageurs souhaitant allier confort et praticité. Décorée avec élégance, elle offre toutes les commodités nécessaires pour un séjour agréable à Paris."
  },
  {
    id: 102,
    name: "Chambre Supérieure",
    type: "Chambre Double Vue sur Ville",
    price: 160,
    originalPrice: 180,
    capacity: 2,
    size: 28,
    beds: "1 lit queen-size",
    availability: 3,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    features: ["Wifi gratuit", "Télévision", "Salle de bain privée", "Climatisation", "Mini-bar", "Coffre-fort", "Vue sur la ville"],
    cancelPolicy: "Annulation gratuite jusqu'à 48 heures avant l'arrivée. Annulation tardive ou non-présentation : 100% du prix de la première nuit.",
    description: "Notre chambre Supérieure offre plus d'espace et une vue imprenable sur la ville de Paris. Le lit queen-size, les équipements premium et l'atmosphère raffinée en font un choix parfait pour votre séjour parisien."
  },
  {
    id: 103,
    name: "Suite Junior",
    type: "Suite avec Salon",
    price: 220,
    originalPrice: 260,
    capacity: 3,
    size: 38,
    beds: "1 lit king-size et 1 canapé-lit",
    availability: 2,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    features: ["Wifi gratuit", "Télévision", "Salle de bain privée", "Climatisation", "Mini-bar", "Cafetière Nespresso", "Coin salon", "Peignoirs et chaussons", "Produits de toilette de luxe"],
    cancelPolicy: "Annulation gratuite jusqu'à 72 heures avant l'arrivée. Annulation tardive ou non-présentation : 100% du prix de la première nuit.",
    description: "Notre Suite Junior est idéale pour les séjours de longue durée ou les familles. Elle propose un espace salon séparé avec un canapé-lit confortable, un lit king-size et des équipements haut de gamme pour un maximum de confort."
  },
  {
    id: 104,
    name: "Suite Exécutive",
    type: "Suite de Luxe",
    price: 350,
    originalPrice: null,
    capacity: 4,
    size: 55,
    beds: "1 lit king-size et 2 canapés-lits",
    availability: 1,
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ],
    features: ["Wifi gratuit", "Télévision", "Salle de bain privée", "Climatisation", "Mini-bar garni", "Cafetière Nespresso", "Grand salon", "Baignoire et douche séparées", "Vue panoramique", "Accès au lounge exécutif", "Petit-déjeuner inclus", "Parking gratuit"],
    cancelPolicy: "Annulation gratuite jusqu'à 7 jours avant l'arrivée. Annulation tardive ou non-présentation : 100% du prix total du séjour.",
    description: "Notre Suite Exécutive est l'incarnation du luxe et de l'élégance parisienne. Avec sa vue panoramique, son vaste espace de vie et ses nombreux services inclus, elle offre une expérience incomparable pour les voyageurs les plus exigeants."
  }
]
