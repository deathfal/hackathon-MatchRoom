"use client"

import type React from "react"
import { useState } from "react"
import { 
  ChevronLeft, 
  Palmtree,
  Mountain,
  TreePine,
  Building,
  Wifi,
  Coffee
} from "lucide-react"
import BottomMenu from "../components/bottom-menu"

export default function BookingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [budget, setBudget] = useState(50)

  const totalSteps = 3

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleDestination = (destination: string) => {
    if (selectedDestinations.includes(destination)) {
      setSelectedDestinations(selectedDestinations.filter((d) => d !== destination))
    } else {
      setSelectedDestinations([...selectedDestinations, destination])
    }
  }

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    } else {
      setSelectedServices([...selectedServices, service])
    }
  }

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number.parseInt(e.target.value))
  }

  const renderDestinationStep = () => {
    const destinations = [
      { id: "plage", name: "Plage", icon: <Palmtree size={48} className="text-gray-700" /> },
      { id: "montagne", name: "Montagne", icon: <Mountain size={48} className="text-gray-700" /> },
      { id: "campagne", name: "Campagne", icon: <TreePine size={48} className="text-gray-700" /> },
      { id: "ville", name: "Ville", icon: <Building size={48} className="text-gray-700" /> },
    ]

    return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold text-center my-6 text-gray-800">DESTINATION</h2>

        <div className="flex-1 space-y-4 px-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${
                selectedDestinations.includes(destination.id) ? "ring-2 ring-purple-600" : ""
              }`}
              onClick={() => toggleDestination(destination.id)}
            >
              <div className="h-32 bg-gray-200 flex items-center justify-center relative">
                {destination.icon}
              </div>
              <div className="text-center py-2 font-medium">{destination.name}</div>
            </div>
          ))}
        </div>

        <div className="p-4 flex justify-end">
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
            onClick={nextStep}
          >
            SUIVANT
          </button>
        </div>

        <div className="flex justify-center gap-4 pb-4">
          <div className="w-12 h-1 bg-purple-600 rounded-full"></div>
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    )
  }

  const renderServicesStep = () => {
    const services = [
      { id: "wifi1", name: "WIFI", icon: <Wifi size={32} className="text-gray-700" /> },
      { id: "parking1", name: "Parking",   },
      { id: "wifi2", name: "WIFI 5G", icon: <Wifi size={32} className="text-gray-700" /> },
      { id: "parking2", name: "Parking privé",  },
      { id: "wifi3", name: "WIFI illimité", icon: <Wifi size={32} className="text-gray-700" /> },
      { id: "parking3", name: "Parking sécurisé", },
      { id: "breakfast", name: "Petit-déjeuner", icon: <Coffee size={32} className="text-gray-700" /> },
      { id: "pool", name: "Piscine", },
    ]

    return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold text-center my-6 text-gray-800">SERVICES SOUHAITÉS</h2>

        <div className="flex-1 px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md ${selectedServices.includes(service.id) ? "ring-2 ring-purple-600" : ""}`}
                onClick={() => toggleService(service.id)}
              >
                <div className="aspect-square bg-gray-200 flex items-center justify-center relative">
                  {service.icon}
                </div>
                <div className="text-center py-2 font-medium">{service.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 flex justify-end">
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
            onClick={nextStep}
          >
            SUIVANT
          </button>
        </div>

        <div className="flex justify-center gap-4 pb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-12 h-1 bg-purple-600 rounded-full"></div>
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    )
  }

  const renderBudgetStep = () => {
    return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-bold text-center my-6 text-gray-800">BUDGET / NUIT</h2>

        <div className="flex-1 px-4">
          <div className="h-48 bg-gray-200 mb-8 flex items-center justify-center rounded-lg shadow-inner">
            <span className="text-gray-600 font-medium">GRAPH INTERACTIF</span>
          </div>

          <div className="mb-8">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={budget} 
              onChange={handleBudgetChange} 
              className="w-full accent-purple-600" 
            />
            <div className="flex justify-between mt-1">
              <div className="flex items-center">
                <div className="w-4 h-4 border border-purple-600 rounded-sm"></div>
                <span className="text-xs ml-1 font-medium text-gray-700">MIN</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border border-purple-600 rounded-sm"></div>
                <span className="text-xs ml-1 font-medium text-gray-700">MAX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-end">
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
            onClick={() => alert("Réservation terminée !")}
          >
            TERMINER
          </button>
        </div>

        <div className="flex justify-center gap-4 pb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-12 h-1 bg-purple-600 rounded-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <div className="bg-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button 
            className="text-gray-700 rounded-full hover:bg-gray-100 p-1" 
            onClick={prevStep}
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">PRÉFÉRENCES</h1>
            <p className="text-xl text-gray-700 md:text-2xl">Personnalisez votre recherche</p>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {currentStep === 0 && renderDestinationStep()}
        {currentStep === 1 && renderServicesStep()}
        {currentStep === 2 && renderBudgetStep()}
      </div>
      
      <BottomMenu />
    </div>
  )
}
