/*
  Signup completion page with animations
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Map, Search, Star, Calendar } from "lucide-react";
import Aurora from "../Backgrounds/Aurora/Aurora";
import FadeContent from "../Animations/FadeContent/FadeContent";
import GradientText from "../TextAnimations/GradientText/GradientText";
import RotatingText from "../TextAnimations/RotatingText/RotatingText";
import CountUp from "../TextAnimations/CountUp/CountUp";

export default function SignupComplete() {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [exploreReady, setExploreReady] = useState(false);

  // Features to showcase
  const features = [
    {
      icon: <Search className="text-white w-8 h-8" />,
      title: "Recherche intelligente",
      description: "Trouvez les hôtels correspondant parfaitement à vos critères"
    },
    {
      icon: <Map className="text-white w-8 h-8" />,
      title: "Exploration simplifiée",
      description: "Visualisez les établissements sur une carte interactive"
    },
    {
      icon: <Star className="text-white w-8 h-8" />,
      title: "Système de récompenses",
      description: "Gagnez des points à chaque réservation effectuée"
    },
    {
      icon: <Calendar className="text-white w-8 h-8" />,
      title: "Historique complet",
      description: "Retrouvez facilement vos précédentes réservations"
    }
  ];

  useEffect(() => {
    // Animation sequence: after 1.5 seconds, show the explore button
    const timer = setTimeout(() => {
      setExploreReady(true);
    }, 1500);

    // Change featured card every 3 seconds
    const featureInterval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(featureInterval);
    };
  }, []);

  const handleExploreClick = () => {
    // Rediriger vers la page d'accueil avec un paramètre d'état indiquant que l'utilisateur vient de s'inscrire
    navigate("/", { state: { fromSignupComplete: true } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f7f4] to-[#eee9e0] flex flex-col relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 opacity-30 z-0">
        <Aurora 
          colorStops={["#2c3e50", "#34495e", "#4a5568"]} 
          amplitude={1.2}
          blend={0.8}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-12">
        {/* Success animation */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#2c3e50] to-[#34495e] flex items-center justify-center mb-6 transition-all transform animate-bounce">
            <Check className="text-white w-12 h-12" />
          </div>
          
          <FadeContent delay={200} duration={1000}>
            <h1 className="text-4xl font-bold text-center text-gray-800">
              <GradientText 
                colors={["#2c3e50", "#4a5568", "#2c3e50"]}
                animationSpeed={6}
                showBorder={false}
              >
                Inscription réussie !
              </GradientText>
            </h1>
          </FadeContent>

          <FadeContent delay={500} duration={1000}>
            <div className="mt-4 text-xl text-center text-gray-600 flex items-center">
              Bienvenue sur <span className="mx-2 font-bold text-[#2c3e50]">MatchRoom</span>
            </div>
          </FadeContent>
        </div>

        {/* Stats animation */}
        <FadeContent delay={800} duration={1000} className="mb-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-medium text-gray-700 mb-4">Rejoignez notre communauté</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2c3e50]">
                  <CountUp to={5000} from={0} separator="," />+
                </div>
                <div className="text-sm text-gray-600 mt-1">Utilisateurs actifs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2c3e50]">
                  <CountUp to={120} from={0} />+
                </div>
                <div className="text-sm text-gray-600 mt-1">Hôtels partenaires</div>
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Feature showcase - Fixed height for title and description */}
        <FadeContent delay={1100} duration={1000} className="mb-10">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg w-full max-w-md h-44 flex flex-col justify-between">
            <div className="flex">
              {/* Icon container with fixed size */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#2c3e50] to-[#34495e] flex items-center justify-center flex-shrink-0">
                {features[currentFeature].icon}
              </div>
              
              {/* Text container with fixed height to prevent layout shifts */}
              <div className="ml-4 flex-grow">
                <h3 className="text-xl font-bold text-gray-800">{features[currentFeature].title}</h3>
                <div className="h-12 flex items-center"> {/* Fixed height container for rotating text */}
                  <RotatingText
                    texts={features.map(f => f.description)}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="text-gray-600"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="flex space-x-2 mt-4">
                {features.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentFeature ? 'bg-[#2c3e50]' : 'bg-gray-300'}`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </FadeContent>

        {/* Modern, simplified CTA button - without pulse animation */}
        <FadeContent delay={1400} duration={1000}>
          <div className={`transition-all duration-500 transform ${exploreReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={handleExploreClick}
              className="
                flex items-center justify-center gap-3
                w-full max-w-md px-8 py-4 rounded-xl
                font-semibold text-lg text-white
                bg-[#2c3e50] hover:bg-[#34495e]
                shadow-md hover:shadow-xl
                transition-all duration-300 ease-in-out
              "
              style={{
                boxShadow: "0 4px 6px -1px rgba(44, 62, 80, 0.2), 0 2px 4px -1px rgba(44, 62, 80, 0.1)"
              }}
            >
              <span>Explorer MatchRoom</span>
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </FadeContent>
      </div>
    </div>
  );
}