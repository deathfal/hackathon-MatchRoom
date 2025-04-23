import { useState, useEffect } from "react"
import {
  ArrowLeft,
  ArrowRight,
  PalmtreeIcon,
  Building,
  Briefcase,
  Bed,
  Coffee,
  Waves,
  Mountain,
  Utensils,
  Wifi,
  CreditCard
} from "lucide-react"

type Question = {
  id: number
  title: string
  subtitle?: string
  options: {
    id: string
    text: string
    description?: string
    color: string
    darkColor: string
    icon: React.ReactNode
  }[]
}

export default function HotelQuestionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [animateDirection, setAnimateDirection] = useState<"next" | "prev" | null>(null)

  // Définition des couleurs uniformes pour toutes les options
  const optionColors = [
    { color: "#2c3e50", darkColor: "#1a2530" }, // Option 1
    { color: "#34495e", darkColor: "#2c3e50" }, // Option 2
    { color: "#455a64", darkColor: "#37474f" }, // Option 3
    { color: "#546e7a", darkColor: "#455a64" }, // Option 4
  ]

  const questions: Question[] = [
    {
      id: 1,
      title: "Quel est votre but principal de voyage ?",
      subtitle: "Cela nous aidera à vous recommander les meilleurs hôtels",
      options: [
        {
          id: "leisure",
          text: "Loisirs",
          description: "Vacances, tourisme, détente",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <PalmtreeIcon size={24} color="white" />,
        },
        {
          id: "business",
          text: "Affaires",
          description: "Voyage professionnel, conférence",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
        {
          id: "family",
          text: "Famille",
          description: "Voyage en famille avec enfants",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "romance",
          text: "Romance",
          description: "Voyage en couple, lune de miel",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Bed size={24} color="white" />,
        },
      ],
    },
    {
      id: 2,
      title: "Quelle est votre fourchette de budget par nuit ?",
      subtitle: "Pour vous proposer des options adaptées à votre budget",
      options: [
        {
          id: "budget",
          text: "Économique",
          description: "Moins de 100€ par nuit",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <CreditCard size={24} color="white" />,
        },
        {
          id: "midrange",
          text: "Intermédiaire",
          description: "Entre 100€ et 200€ par nuit",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <CreditCard size={24} color="white" />,
        },
        {
          id: "luxury",
          text: "Luxe",
          description: "Entre 200€ et 400€ par nuit",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <CreditCard size={24} color="white" />,
        },
        {
          id: "premium",
          text: "Premium",
          description: "Plus de 400€ par nuit",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <CreditCard size={24} color="white" />,
        },
      ],
    },
    {
      id: 3,
      title: "Quelle est votre durée de séjour habituelle ?",
      subtitle: "Pour des recommandations adaptées à la durée",
      options: [
        {
          id: "short",
          text: "Court séjour",
          description: "1 à 3 nuits",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "medium",
          text: "Séjour moyen",
          description: "4 à 7 nuits",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "long",
          text: "Long séjour",
          description: "1 à 2 semaines",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "extended",
          text: "Séjour prolongé",
          description: "Plus de 2 semaines",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Building size={24} color="white" />,
        },
      ],
    },
    {
      id: 4,
      title: "Quelle localisation préférez-vous ?",
      subtitle: "Pour vous suggérer les meilleurs quartiers",
      options: [
        {
          id: "city",
          text: "Centre-ville",
          description: "Proximité des attractions principales",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "beach",
          text: "Bord de mer",
          description: "Vue et accès à la plage",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Waves size={24} color="white" />,
        },
        {
          id: "mountain",
          text: "Montagne",
          description: "Nature et air frais",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Mountain size={24} color="white" />,
        },
        {
          id: "quiet",
          text: "Zone calme",
          description: "Loin de l'agitation touristique",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <PalmtreeIcon size={24} color="white" />,
        },
      ],
    },
    {
      id: 5,
      title: "Quel type d'hébergement préférez-vous ?",
      subtitle: "Pour affiner vos résultats de recherche",
      options: [
        {
          id: "hotel",
          text: "Hôtel standard",
          description: "Services complets, confort",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "resort",
          text: "Resort tout inclus",
          description: "Séjour sans souci, activités sur place",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "apartment",
          text: "Appartement",
          description: "Plus d'espace, cuisine équipée",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "boutique",
          text: "Hôtel boutique",
          description: "Petite taille, design unique",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Building size={24} color="white" />,
        },
      ],
    },
    {
      id: 6,
      title: "Quels équipements sont essentiels pour vous ?",
      subtitle: "Pour vous garantir un séjour confortable",
      options: [
        {
          id: "pool",
          text: "Piscine",
          description: "Pour se rafraîchir et se détendre",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <Waves size={24} color="white" />,
        },
        {
          id: "wifi",
          text: "Wi-Fi haut débit",
          description: "Connectivité optimale",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Wifi size={24} color="white" />,
        },
        {
          id: "breakfast",
          text: "Petit-déjeuner inclus",
          description: "Commencer la journée du bon pied",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Coffee size={24} color="white" />,
        },
        {
          id: "fitness",
          text: "Salle de sport",
          description: "Maintenir votre routine fitness",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
      ],
    },
    {
      id: 7,
      title: "Quelle importance accordez-vous à la restauration ?",
      subtitle: "Pour les gourmets et les amateurs de bonne cuisine",
      options: [
        {
          id: "not_important",
          text: "Peu importante",
          description: "Je mange souvent à l'extérieur",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <Utensils size={24} color="white" />,
        },
        {
          id: "breakfast_only",
          text: "Petit-déjeuner uniquement",
          description: "Essentiel pour bien démarrer",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Coffee size={24} color="white" />,
        },
        {
          id: "restaurant",
          text: "Bon restaurant sur place",
          description: "Pour les dîners sans se déplacer",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Utensils size={24} color="white" />,
        },
        {
          id: "all_inclusive",
          text: "Tout inclus",
          description: "Maximum de confort et simplicité",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Utensils size={24} color="white" />,
        },
      ],
    },
    {
      id: 8,
      title: "Comment voyagez-vous habituellement ?",
      subtitle: "Pour des recommandations adaptées à votre groupe",
      options: [
        {
          id: "solo",
          text: "Seul(e)",
          description: "Voyage en solo",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
        {
          id: "couple",
          text: "En couple",
          description: "Voyage romantique à deux",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
        {
          id: "family",
          text: "En famille",
          description: "Avec enfants",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
        {
          id: "friends",
          text: "Entre amis",
          description: "Voyage en groupe",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
      ],
    },
    {
      id: 9,
      title: "Quel mode de transport préférez-vous sur place ?",
      subtitle: "Pour vous recommander des hôtels bien situés",
      options: [
        {
          id: "walk",
          text: "À pied",
          description: "Proximité des attractions principales",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
        {
          id: "public",
          text: "Transports publics",
          description: "Accès facile aux bus/métro",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
        {
          id: "taxi",
          text: "Taxi/VTC",
          description: "Flexibilité et confort",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
        {
          id: "car",
          text: "Voiture de location",
          description: "Liberté de déplacement complète",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
      ],
    },
    {
      id: 10,
      title: "Quel est votre critère prioritaire pour choisir un hôtel ?",
      subtitle: "Pour mieux comprendre vos préférences principales",
      options: [
        {
          id: "price",
          text: "Prix",
          description: "Budget est la priorité absolue",
          color: optionColors[0].color,
          darkColor: optionColors[0].darkColor,
          icon: <CreditCard size={24} color="white" />,
        },
        {
          id: "location",
          text: "Emplacement",
          description: "Situation idéale est essentielle",
          color: optionColors[1].color,
          darkColor: optionColors[1].darkColor,
          icon: <Building size={24} color="white" />,
        },
        {
          id: "comfort",
          text: "Confort",
          description: "Qualité des chambres et du service",
          color: optionColors[2].color,
          darkColor: optionColors[2].darkColor,
          icon: <Bed size={24} color="white" />,
        },
        {
          id: "reviews",
          text: "Avis clients",
          description: "Expériences des autres voyageurs",
          color: optionColors[3].color,
          darkColor: optionColors[3].darkColor,
          icon: <Briefcase size={24} color="white" />,
        },
      ],
    },
  ]

  const currentQuestion = questions[currentQuestionIndex]

  const handleOptionSelect = (optionId: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimateDirection("next")
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }, 300)
    } else {
      // Handle questionnaire completion
      console.log("Questionnaire completed", answers)
      // Here you would typically send the answers to your backend
      // or use them to update the user's preferences
    }
  }

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setAnimateDirection("prev")
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
      }, 300)
    }
  }

  const handleSkip = () => {
    // Skip the entire questionnaire
    console.log("Questionnaire skipped")
    // Here you could redirect to the main page or set default preferences
  }

  useEffect(() => {
    if (animateDirection) {
      const timer = setTimeout(() => {
        setAnimateDirection(null)
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [animateDirection])

  const isOptionSelected = (optionId: string) => {
    return answers[currentQuestion.id] === optionId
  }

  const canGoNext = answers[currentQuestion.id] !== undefined

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f7f4] to-[#eee9e0] text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center p-4 relative z-10">
        <button
          className="text-[#4a5568] w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft size={20} className={currentQuestionIndex === 0 ? "opacity-30" : ""} />
        </button>
        <div className="absolute left-1/2 top-4 -translate-x-1/2 text-sm font-medium text-gray-500">
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <button
          onClick={handleSkip}
          className="text-[#4a5568] text-sm font-medium px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          Passer
        </button>
      </div>

      {/* Main content */}
      <div
        className={`
          flex-1 px-6 pt-2 pb-8 flex flex-col max-w-2xl mx-auto w-full relative transition-all duration-500
          ${animateDirection === "next" ? "translate-x-full opacity-0" : ""}
          ${animateDirection === "prev" ? "-translate-x-full opacity-0" : ""}
          ${!animateDirection ? "translate-x-0 opacity-100" : ""}
        `}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#2d3748]">{currentQuestion.title}</h1>
          {currentQuestion.subtitle && <p className="text-gray-500">{currentQuestion.subtitle}</p>}
        </div>

        <div className="space-y-4 flex-1">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              className={`
                w-full p-5 rounded-xl flex justify-between items-center text-white transition-all duration-300
                shadow-md hover:shadow-lg transform hover:-translate-y-1
                ${isOptionSelected(option.id) ? "ring-2 ring-offset-2 scale-[1.02]" : ""}
              `}
              style={{
                backgroundColor: option.color,
                boxShadow: isOptionSelected(option.id)
                  ? `0 10px 15px -3px ${option.color}40, 0 4px 6px -4px ${option.color}40`
                  : "",
              }}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-lg font-medium mb-1">{option.text}</span>
                {option.description && <span className="text-sm opacity-90">{option.description}</span>}
              </div>
              <div className="relative w-14 h-14 flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-full opacity-30"
                  style={{ backgroundColor: option.darkColor }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">{option.icon}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="p-4 max-w-2xl mx-auto w-full relative z-10">
        <div className="flex justify-between items-center">
          <div className="w-full max-w-[calc(100%-4rem)] mr-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2c3e50] rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">Début</span>
              <span className="text-xs text-gray-500">Fin</span>
            </div>
          </div>
          <button
            className={`
              w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300
              shadow-md hover:shadow-lg transform hover:-translate-y-1
              ${canGoNext ? "bg-[#2c3e50]" : "bg-gray-400"}
            `}
            onClick={handleNext}
            disabled={!canGoNext}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}