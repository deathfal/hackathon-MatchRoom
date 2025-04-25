import { useState, useCallback, useMemo, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Building, Navigation, X, Search, ChevronLeft, Star, Heart, List, Map, Loader, MapPin, Hotel, Gift, Sparkles, Clock, Filter, HelpCircle } from 'lucide-react'
import { MapsService, LatLng } from '../services/mapsService'
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from 'react-router-dom'

// Types pour les hôtels
interface Hotel {
  id: string
  name: string
  position: {
    lat: number
    lng: number
  }
  rating: number
  price: number
  image: string
  services?: string[]
  discount?: number
  distance?: number
}

// Styles pour la carte
const mapContainerStyle = {
  width: '100%',
  height: '100vh',
}

// Options pour la carte
const options = {
  disableDefaultUI: false,
  zoomControl: true,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
    },
  ],
}

export default function Maps() {
  // Utilisation de la clé API depuis les variables d'environnement
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })

  const navigate = useNavigate();

  // État pour le centre de la carte (Paris par défaut)
  const [center, setCenter] = useState<LatLng>({ lat: 48.8566, lng: 2.3522 })
  
  // État pour l'hôtel sélectionné
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  
  // État pour la recherche d'adresse
  const [searchQuery, setSearchQuery] = useState<string>("")
  
  // État pour afficher/masquer la liste des hôtels sur mobile
  const [showHotelList, setShowHotelList] = useState<boolean>(false)

  // État pour le filtre actif
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // État pour l'animation de chargement
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // État pour l'hôtel survolé dans la liste
  const [hoveredHotelId, setHoveredHotelId] = useState<string | null>(null)

  // Référence à la carte Google Maps
  const mapRef = useRef<google.maps.Map | null>(null)

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  // Animation variants
  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
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
  
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  // Exemple de données d'hôtels amélioré
  const hotels = useMemo<Hotel[]>(() => [
    {
      id: '1',
      name: 'Hôtel de Paris',
      position: { lat: 48.8566, lng: 2.3522 },
      rating: 4.5,
      price: 250,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      services: ['Piscine', 'Spa', 'Restaurant'],
      discount: 15,
      distance: 0.5
    },
    {
      id: '2',
      name: 'Hôtel de Lyon',
      position: { lat: 48.8638, lng: 2.3324 },
      rating: 4.2,
      price: 180,
      image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      services: ['Wifi', 'Restaurant'],
      distance: 1.2
    },
    {
      id: '3',
      name: 'Hôtel de Marseille',
      position: { lat: 48.8698, lng: 2.3453 },
      rating: 4.7,
      price: 320,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      services: ['Piscine', 'Spa', 'Restaurant', 'Salle de sport'],
      discount: 10,
      distance: 0.8
    },
    {
      id: '4',
      name: 'Grand Palace',
      position: { lat: 48.8718, lng: 2.3513 },
      rating: 4.9,
      price: 450,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      services: ['Piscine', 'Spa', 'Restaurant', 'Salle de sport', 'Concierge'],
      distance: 0.3
    },
  ], [])

  // Fonction pour gérer le clic sur un marqueur
  const handleMarkerClick = useCallback((hotel: Hotel) => {
    setSelectedHotel(hotel)
  }, [])

  // Fonction pour fermer l'info-bulle
  const handleCloseInfoWindow = useCallback(() => {
    setSelectedHotel(null)
  }, [])

  // Géolocalisation de l'utilisateur
  const handleGetUserLocation = useCallback(async () => {
    setIsSearching(true);
    try {
      const position = await MapsService.getCurrentPosition()
      setCenter(position)
      
      if (mapRef.current) {
        mapRef.current.panTo(position)
        mapRef.current.setZoom(14)
      }
    } catch (error) {
      console.error("Erreur de géolocalisation : ", error)
      alert("Impossible d'obtenir votre position. Veuillez vérifier vos paramètres de localisation.")
    } finally {
      setIsSearching(false);
    }
  }, [])

  // Recherche d'adresse
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true);
    try {
      const result = await MapsService.geocodeAddress(searchQuery)
      
      if (result) {
        setCenter(result.location)
        
        if (mapRef.current) {
          mapRef.current.panTo(result.location)
          mapRef.current.setZoom(14)
        }
      }
    } catch (error) {
      console.error("Erreur lors de la recherche d'adresse :", error)
      alert("Impossible de trouver cette adresse. Veuillez essayer avec une autre.")
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery])

  // Retour arrière
  const handleBack = () => {
    navigate(-1);
  }

  // Fonction pour afficher les étoiles de notation
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={`${i <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
        />
      );
    }
    return stars;
  };

  // Filtres disponibles
  const filters = [
    { id: 'price', name: 'Prix bas', icon: <Gift size={14} /> },
    { id: 'rating', name: 'Mieux notés', icon: <Star size={14} /> },
    { id: 'distance', name: 'Proximité', icon: <MapPin size={14} /> },
    { id: 'promo', name: 'Promos', icon: <Sparkles size={14} /> },
  ];

  // Appliquer un filtre
  const applyFilter = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId);
  };

  // Afficher un message de chargement pendant le chargement de la carte
  if (loadError) return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="text-red-500 text-xl mb-2">Erreur au chargement de la carte</div>
      <p className="text-gray-600">Veuillez vérifier votre connexion internet ou réessayer plus tard.</p>
      <button 
        onClick={handleBack}
        className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        Retour
      </button>
    </div>
  )
  
  if (!isLoaded) return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 font-medium">Chargement de la carte...</p>
    </div>
  )

  return (
    <div className="relative w-full h-screen">
      {/* Header amélioré */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-purple-600 to-indigo-700 p-4 shadow-lg"
      >
        <div className="flex items-center justify-between">
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
                className="text-xl font-bold md:text-2xl"
              >
                CARTE INTERACTIVE
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white/80 text-sm md:text-base"
              >
                Trouvez les hôtels à proximité
              </motion.p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleGetUserLocation}
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full shadow-md transition-all"
            aria-label="Ma position"
            disabled={isSearching}
          >
            {isSearching ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader size={20} />
              </motion.div>
            ) : (
              <Navigation size={20} />
            )}
          </motion.button>
        </div>
        
        {/* Barre de recherche */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative mt-4 flex items-center"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Rechercher une adresse..."
            className="w-full px-4 py-2.5 pl-10 pr-10 rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white/60 shadow-lg"
          />
          <Search size={18} className="absolute left-3 text-white/80" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSearch}
            className="absolute right-3 text-white/80 hover:text-white transition-colors"
            aria-label="Rechercher"
            disabled={isSearching}
          >
            {isSearching ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader size={18} />
              </motion.div>
            ) : (
              <MapPin size={18} />
            )}
          </motion.button>
        </motion.div>

        {/* Filtres */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => applyFilter(filter.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm whitespace-nowrap ${
                activeFilter === filter.id 
                  ? 'bg-white text-purple-700' 
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
              }`}
            >
              {filter.icon}
              <span>{filter.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Carte Google Maps */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Marqueurs des hôtels */}
        {hotels.map((hotel) => {
          const isSelected = selectedHotel?.id === hotel.id;
          const isHovered = hoveredHotelId === hotel.id;
          
          return (
            <Marker
              key={hotel.id}
              position={hotel.position}
              onClick={() => handleMarkerClick(hotel)}
              animation={isHovered || isSelected ? google.maps.Animation.BOUNCE : undefined}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                  `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="${isSelected ? '#4f46e5' : '#6d28d9'}" stroke="${isSelected ? '#ffffff' : '#f8fafc'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="4" fill="${isSelected ? '#ffffff' : '#f8fafc'}" stroke="${isSelected ? '#4f46e5' : '#6d28d9'}"></circle>
                  </svg>`
                ),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 40)
              }}
            />
          );
        })}
        
        {/* Info Window pour l'hôtel sélectionné */}
        {selectedHotel && (
          <InfoWindow
            position={selectedHotel.position}
            onCloseClick={handleCloseInfoWindow}
            options={{ maxWidth: 300 }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-2 max-w-xs"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-gray-800">{selectedHotel.name}</h3>
                <button 
                  onClick={handleCloseInfoWindow} 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="relative">
                <img 
                  src={selectedHotel.image} 
                  alt={selectedHotel.name} 
                  className="w-full h-32 object-cover mb-2 rounded-lg shadow-sm"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md">
                  <Heart size={16} className="text-red-500 hover:fill-red-500 cursor-pointer transition-colors" />
                </div>
                {selectedHotel.discount && (
                  <div className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-0.5 rounded shadow-sm">
                    -{selectedHotel.discount}%
                  </div>
                )}
              </div>
              
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    {renderRatingStars(selectedHotel.rating)}
                    <span className="ml-1 text-sm text-gray-600">{selectedHotel.rating}</span>
                  </div>
                  <div className="font-bold text-purple-600">{selectedHotel.price}€<span className="text-xs font-normal text-gray-500">/nuit</span></div>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-1" />
                  <span>À {selectedHotel.distance} km du centre</span>
                </div>
              </div>
              
              {selectedHotel.services && selectedHotel.services.length > 0 && (
                <div className="mb-2">
                  <div className="flex flex-wrap gap-1">
                    {selectedHotel.services.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                        {service}
                      </span>
                    ))}
                    {selectedHotel.services.length > 3 && (
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                        +{selectedHotel.services.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
              
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-1 bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-2 rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-1"
              >
                <Hotel size={14} />
                Voir l'hôtel
              </motion.button>
            </motion.div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Toggle liste d'hôtels */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-20 right-4 z-10 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-3 rounded-full shadow-lg"
        onClick={() => setShowHotelList(!showHotelList)}
      >
        {showHotelList ? <Map size={20} /> : <List size={20} />}
      </motion.button>

      {/* Bouton d'aide flottant */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-36 right-4 z-10 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-3 rounded-full shadow-lg"
      >
        <HelpCircle size={20} />
      </motion.button>

      {/* Liste des hôtels pour écran mobile (glissante depuis le bas) */}
      <AnimatePresence>
        {showHotelList && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl shadow-lg max-h-[70vh] overflow-hidden"
          >
            <motion.div 
              className="flex justify-center p-2 cursor-pointer"
              whileHover={{ backgroundColor: "#f3f4f6" }}
              onClick={() => setShowHotelList(!showHotelList)}
            >
              <motion.div 
                className="w-12 h-1.5 bg-gray-300 rounded-full"
                whileHover={{ width: "3rem", backgroundColor: "#d1d5db" }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
            
            <motion.div 
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
              className="p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Hotel className="text-purple-600" />
                  Hôtels à proximité
                </h2>
                <span className="text-sm text-gray-500 font-medium">{hotels.length} établissements</span>
              </div>
              
              <div className="space-y-3 overflow-y-auto max-h-[calc(70vh-5rem)] pb-16">
                {hotels.map((hotel, i) => (
                  <motion.div 
                    key={hotel.id}
                    custom={i}
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className={`flex bg-white border rounded-xl overflow-hidden cursor-pointer transition-all ${
                      selectedHotel?.id === hotel.id ? 'border-purple-500 shadow-md' : 'border-gray-200'
                    }`}
                    onClick={() => {
                      setCenter(hotel.position);
                      setSelectedHotel(hotel);
                      if (mapRef.current) {
                        mapRef.current.panTo(hotel.position);
                      }
                    }}
                    onMouseEnter={() => setHoveredHotelId(hotel.id)}
                    onMouseLeave={() => setHoveredHotelId(null)}
                  >
                    <div className="relative w-28 h-28">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover"
                      />
                      {hotel.discount && (
                        <div className="absolute bottom-1 left-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-0.5 rounded shadow-sm">
                          -{hotel.discount}%
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-3">
                      <h3 className="font-bold text-gray-800">{hotel.name}</h3>
                      <div className="flex items-center gap-1 mt-1 mb-1">
                        {renderRatingStars(hotel.rating)}
                      </div>
                      <div className="flex items-center text-xs text-gray-600 mb-1">
                        <MapPin size={12} className="mr-1" />
                        <span>{hotel.distance} km du centre</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-1">
                          {hotel.services && hotel.services.slice(0, 2).map((service, idx) => (
                            <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                              {service}
                            </span>
                          ))}
                          {hotel.services && hotel.services.length > 2 && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                              +{hotel.services.length - 2}
                            </span>
                          )}
                        </div>
                        <div className="font-bold text-purple-600">{hotel.price}€</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fond semi-transparent quand la liste est ouverte */}
      <AnimatePresence>
        {showHotelList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black z-10 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  )
}