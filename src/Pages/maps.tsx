import { useState, useCallback, useMemo, useRef } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { Building, Navigation, X, Search } from 'lucide-react'
import { MapsService, LatLng } from '../services/mapsService'

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
}

export default function Maps() {
  // Utilisation de la clé API depuis les variables d'environnement
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"]
  })

  // État pour le centre de la carte (Paris par défaut)
  const [center, setCenter] = useState<LatLng>({ lat: 48.8566, lng: 2.3522 })
  
  // État pour l'hôtel sélectionné
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)
  
  // État pour la recherche d'adresse
  const [searchQuery, setSearchQuery] = useState<string>("")
  
  // État pour afficher/masquer la liste des hôtels sur mobile
  const [showHotelList, setShowHotelList] = useState<boolean>(false)

  // Référence à la carte Google Maps
  const mapRef = useRef<google.maps.Map | null>(null)
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }
  
  // Exemple de données d'hôtels
  const hotels = useMemo<Hotel[]>(() => [
    {
      id: '1',
      name: 'Hôtel de Paris',
      position: { lat: 48.8566, lng: 2.3522 },
      rating: 4.5,
      price: 250,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Hôtel de Lyon',
      position: { lat: 48.8638, lng: 2.3324 },
      rating: 4.2,
      price: 180,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Hôtel de Marseille',
      position: { lat: 48.8698, lng: 2.3453 },
      rating: 4.7,
      price: 320,
      image: 'https://via.placeholder.com/150',
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
    }
  }, [])

  // Recherche d'adresse
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return

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
    }
  }, [searchQuery])

  // Afficher un message de chargement pendant le chargement de la carte
  if (loadError) return <div className="flex items-center justify-center h-screen">Erreur au chargement de la carte</div>
  if (!isLoaded) return <div className="flex items-center justify-center h-screen">Chargement de la carte...</div>

  return (
    <div className="relative w-full h-screen">
      {/* Entête */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white p-4 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Hôtels à proximité</h1>
          <button 
            onClick={handleGetUserLocation}
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-full"
            aria-label="Ma position"
          >
            <Navigation size={20} />
          </button>
        </div>
        
        {/* Barre de recherche */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Rechercher une adresse..."
            className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 p-1 text-gray-500 hover:text-blue-500"
            aria-label="Rechercher"
          >
            <Search size={18} />
          </button>
        </div>
      </div>
      
      {/* Carte Google Maps */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        options={options}
        onLoad={onMapLoad}
      >
        {/* Marqueurs des hôtels */}
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={hotel.position}
            onClick={() => handleMarkerClick(hotel)}
            icon={{
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1E40AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
              ),
              scaledSize: new google.maps.Size(32, 32),
            }}
          />
        ))}
        
        {/* Info Window pour l'hôtel sélectionné */}
        {selectedHotel && (
          <InfoWindow
            position={selectedHotel.position}
            onCloseClick={handleCloseInfoWindow}
          >
            <div className="p-2 max-w-xs">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{selectedHotel.name}</h3>
                <button onClick={handleCloseInfoWindow} className="text-gray-500 hover:text-gray-700">
                  <X size={16} />
                </button>
              </div>
              <img 
                src={selectedHotel.image} 
                alt={selectedHotel.name} 
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{selectedHotel.rating}</span>
                </div>
                <div className="font-bold">{selectedHotel.price}€/nuit</div>
              </div>
              <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors">
                Réserver
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Liste des hôtels pour écran mobile (glissante depuis le bas) */}
      <div 
        className={`
          absolute bottom-0 left-0 right-0 z-10 bg-white rounded-t-3xl shadow-lg transform 
          transition-transform duration-300 max-h-[80vh] overflow-y-auto
          ${showHotelList ? 'translate-y-0' : 'translate-y-[calc(100%-60px)]'}
        `}
      >
        <div 
          className="flex justify-center p-2 cursor-pointer"
          onClick={() => setShowHotelList(!showHotelList)}
        >
          <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Hôtels disponibles</h2>
          <div className="space-y-4">
            {hotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className="flex border rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setCenter(hotel.position);
                  setSelectedHotel(hotel);
                  if (mapRef.current) {
                    mapRef.current.panTo(hotel.position);
                  }
                  setShowHotelList(false);
                }}
              >
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-24 h-24 object-cover"
                />
                <div className="flex-1 p-3">
                  <h3 className="font-bold">{hotel.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">{hotel.rating}</span>
                    </div>
                    <div className="font-bold text-blue-600">{hotel.price}€</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}