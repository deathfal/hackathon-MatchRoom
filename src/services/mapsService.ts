// Interface pour les coordonnées géographiques
export interface LatLng {
  lat: number;
  lng: number;
}

// Interface pour les résultats de recherche d'adresse
export interface GeocodingResult {
  address: string;
  location: LatLng;
}

/**
 * Service pour gérer les fonctionnalités de Google Maps
 */
export class MapsService {
  /**
   * Convertit une adresse en coordonnées géographiques (latitude, longitude)
   * @param address - L'adresse à convertir
   * @returns Une promesse qui résout avec le résultat du géocodage
   */
  static async geocodeAddress(address: string): Promise<GeocodingResult | null> {
    try {
      // Vérifier que l'API Geocoder est disponible
      if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
        console.error("L'API Google Maps Geocoder n'est pas disponible");
        return null;
      }

      const geocoder = new google.maps.Geocoder();
      
      return new Promise((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
            const result = results[0];
            const location = {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng()
            };
            
            resolve({
              address: result.formatted_address,
              location
            });
          } else {
            reject(new Error(`Erreur de géocodage: ${status}`));
          }
        });
      });
    } catch (error) {
      console.error("Erreur lors du géocodage:", error);
      return null;
    }
  }

  /**
   * Calcule la distance entre deux points géographiques
   * @param origin - Point d'origine
   * @param destination - Point de destination
   * @returns Une promesse qui résout avec la distance en mètres et la durée en secondes
   */
  static async calculateDistance(
    origin: LatLng, 
    destination: LatLng
  ): Promise<{ distance: number; duration: number } | null> {
    try {
      // Vérifier que l'API Distance Matrix est disponible
      if (!window.google || !window.google.maps || !window.google.maps.DistanceMatrixService) {
        console.error("L'API Google Maps Distance Matrix n'est pas disponible");
        return null;
      }

      const service = new google.maps.DistanceMatrixService();
      
      return new Promise((resolve, reject) => {
        service.getDistanceMatrix({
          origins: [new google.maps.LatLng(origin.lat, origin.lng)],
          destinations: [new google.maps.LatLng(destination.lat, destination.lng)],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC
        }, (response, status) => {
          if (status === google.maps.DistanceMatrixStatus.OK && response) {
            const result = response.rows[0].elements[0];
            if (result.status === google.maps.DistanceMatrixElementStatus.OK) {
              resolve({
                distance: result.distance.value, // en mètres
                duration: result.duration.value // en secondes
              });
            } else {
              reject(new Error(`Impossible de calculer la distance: ${result.status}`));
            }
          } else {
            reject(new Error(`Erreur de calcul de distance: ${status}`));
          }
        });
      });
    } catch (error) {
      console.error("Erreur lors du calcul de distance:", error);
      return null;
    }
  }

  /**
   * Obtient la position actuelle de l'utilisateur
   * @returns Une promesse qui résout avec la position de l'utilisateur
   */
  static getCurrentPosition(): Promise<LatLng> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("La géolocalisation n'est pas prise en charge par ce navigateur"));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          reject(new Error(`Erreur de géolocalisation: ${error.message}`));
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  }
}