import { useState } from "react";
import { Building, User, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Aurora from "../Backgrounds/Aurora/Aurora";

export default function SignupType() {
  const [selectedType, setSelectedType] = useState<"customer" | "hotel" | null>(null);
  const navigate = useNavigate();

  const optionColors = [
    { color: "#2c3e50", darkColor: "#1a2530" }, // Client
    { color: "#34495e", darkColor: "#2c3e50" }, // Hôtelier
  ];

  const handleTypeSelection = (type: "customer" | "hotel") => {
    setSelectedType(type);
  };

  const handleNext = () => {
    if (selectedType === "customer") {
      navigate("/signup-customer");
    } else if (selectedType === "hotel") {
      navigate("/signup-hotel");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f7f4] to-[#eee9e0] text-gray-800 relative">
      <div className="absolute inset-0 opacity-30 z-0">
        <Aurora 
          colorStops={["#34495e", "#2c3e50", "#4a5568"]} 
          amplitude={1.2}
          blend={0.8}
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-4 relative z-10">
        <Link
          to="/"
          className="text-[#4a5568] w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowRight size={20} className="rotate-180" />
        </Link>
        <div className="text-sm font-medium text-gray-500">
          Création de compte
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 pt-8 pb-8 flex flex-col max-w-2xl mx-auto w-full relative z-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-3 text-[#2d3748]">Bienvenue sur MatchRoom</h1>
          <p className="text-gray-600 text-lg">Je suis...</p>
        </div>

        <div className="space-y-6 flex-1">
          <button
            className={`
              w-full p-6 rounded-xl flex justify-between items-center text-white transition-all duration-300
              shadow-md hover:shadow-lg transform hover:-translate-y-1
              ${selectedType === "customer" ? "ring-2 ring-offset-2 ring-[#2c3e50] scale-[1.02]" : ""}
            `}
            style={{
              backgroundColor: optionColors[0].color,
              boxShadow: selectedType === "customer"
                ? `0 10px 15px -3px ${optionColors[0].color}40, 0 4px 6px -4px ${optionColors[0].color}40`
                : "",
            }}
            onClick={() => handleTypeSelection("customer")}
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-xl font-medium mb-2">Un voyageur</span>
              <span className="text-sm opacity-90">
                Je souhaite trouver des hôtels qui correspondent à mes préférences
              </span>
            </div>
            <div className="relative w-16 h-16 flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{ backgroundColor: optionColors[0].darkColor }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <User size={28} color="white" />
              </div>
            </div>
          </button>

          <button
            className={`
              w-full p-6 rounded-xl flex justify-between items-center text-white transition-all duration-300
              shadow-md hover:shadow-lg transform hover:-translate-y-1
              ${selectedType === "hotel" ? "ring-2 ring-offset-2 ring-[#34495e] scale-[1.02]" : ""}
            `}
            style={{
              backgroundColor: optionColors[1].color,
              boxShadow: selectedType === "hotel"
                ? `0 10px 15px -3px ${optionColors[1].color}40, 0 4px 6px -4px ${optionColors[1].color}40`
                : "",
            }}
            onClick={() => handleTypeSelection("hotel")}
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-xl font-medium mb-2">Un établissement hôtelier</span>
              <span className="text-sm opacity-90">
                Je souhaite me connecter avec des clients potentiels
              </span>
            </div>
            <div className="relative w-16 h-16 flex-shrink-0">
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{ backgroundColor: optionColors[1].darkColor }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Building size={28} color="white" />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 max-w-2xl mx-auto w-full relative z-10">
        <button
          className={`
            w-full h-14 rounded-xl flex items-center justify-center text-white transition-all duration-300
            shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium text-lg
            ${selectedType ? "bg-[#2c3e50]" : "bg-gray-400 cursor-not-allowed"}
          `}
          onClick={handleNext}
          disabled={!selectedType}
        >
          Continuer
          <ArrowRight size={20} className="ml-2" />
        </button>
        
        <div className="mt-4 text-center text-gray-600">
          Déjà inscrit ? <Link to="/login" className="text-[#2c3e50] font-medium hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}