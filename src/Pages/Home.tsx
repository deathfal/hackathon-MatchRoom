import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import BottomMenu from "../components/bottom-menu"
import { X, Check, Clock, Sparkles, Award, Lightbulb, ChevronRight } from "lucide-react"

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showQuestionnairePopup, setShowQuestionnairePopup] = useState(false)
  const [popupAnimation, setPopupAnimation] = useState(false)

  // Vérifier si l'utilisateur vient de terminer son inscription
  useEffect(() => {
    // Détection du paramètre de redirection depuis la page de confirmation d'inscription
    if (location.state?.fromSignupComplete) {
      setShowQuestionnairePopup(true)
      setTimeout(() => {
        setPopupAnimation(true)
      }, 100)
    }
  }, [location])

  const handleStartQuestionnaire = () => {
    setPopupAnimation(false)
    setTimeout(() => {
      setShowQuestionnairePopup(false)
      navigate("/questionnaire")
    }, 300)
  }

  const handleDismissPopup = () => {
    setPopupAnimation(false)
    setTimeout(() => {
      setShowQuestionnairePopup(false)
    }, 300)
  }

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">BIENVENUE</h1>
          <p className="text-xl text-gray-700 md:text-2xl">User 29 !</p>
        </div>
        <div className="relative mr-16 lg:mr-15">
          <div className="h-16 w-16 rounded-full border-2 border-white overflow-hidden md:h-20 md:w-20">
            <img
              src="/placeholder.svg?height=64&width=64"
              alt="Profile"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        {/* Reservations Section */}
        <section className="mb-6 md:mb-10">
          <div className="bg-purple-600 text-white px-3 py-1 inline-block mb-3 md:px-4 md:py-2">
            <h2 className="text-lg font-medium md:text-xl">Mes réservations</h2>
          </div>
          <div className="flex gap-3 md:gap-4 lg:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="min-w-[160px] md:min-w-[220px] lg:min-w-[260px] xl:min-w-[300px] flex-shrink-0 snap-center rounded-lg overflow-hidden border border-gray-300">
                <div className="relative h-24 md:h-32 lg:h-40">
                  <img
                    src="/placeholder.svg?height=96&width=160"
                    alt="Hôtel"
                    className="object-cover h-full w-full"
                  />
                  <div className="absolute top-2 left-2 bg-white/80 text-xs px-1 rounded md:text-sm md:px-2">6:01 - 08:01</div>
                </div>
                <div className="p-2 text-sm md:p-3 md:text-base">
                  <p>Hôtel X, chambre Y</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Negotiations Section */}
        <section className="mb-6 md:mb-10">
          <h2 className="text-xl font-medium text-gray-800 mb-3 md:text-2xl">Mes négociations</h2>
          <div className="space-y-3 w-full">
            <div className="bg-yellow-300 rounded-full py-2 px-4 flex justify-between items-center md:py-3 md:px-6">
              <span className="md:text-lg">Hôtel XX - proposition $$</span>
              <span className="text-green-600 md:text-lg">✓</span>
            </div>
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-gray-800 text-white rounded-full py-2 px-4 flex justify-between items-center"
              >
                <span>Hôtel XX - proposition $$</span>
                <span>•••</span>
              </div>
            ))}
          </div>
        </section>

        {/* Suggestions Section */}
        <section className="mb-20 md:mb-16">
          <h2 className="text-xl font-medium text-gray-800 mb-3 md:text-2xl">Suggestions</h2>
          <div className="flex gap-3 md:gap-4 lg:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="min-w-[160px] md:min-w-[220px] lg:min-w-[260px] xl:min-w-[300px] flex-shrink-0 snap-center rounded-lg overflow-hidden border border-gray-300">
                <div className="relative h-24 md:h-32 lg:h-40">
                  <img
                    src="/placeholder.svg?height=96&width=160"
                    alt="Hôtel"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="p-2 text-sm md:p-3 md:text-base">
                  <p>Hôtel X</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Popup pour le questionnaire */}
      {showQuestionnairePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 bg-black/40">
          <div 
            className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all duration-300 ${popupAnimation ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
          >
            {/* Header avec image de fond et dégradé */}
            <div className="relative">
              <div 
                className="h-32 bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#2c3e50]/80 to-[#34495e]/90 flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">Personnalisez votre expérience</h3>
              </div>
              <button 
                onClick={handleDismissPopup}
                className="absolute top-4 right-4 rounded-full bg-white/20 hover:bg-white/40 p-1.5 transition-all duration-300 text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6 font-medium">
                Notre questionnaire rapide nous permettra de vous proposer des hôtels parfaitement adaptés à vos préférences et à votre style de voyage.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                  <div className="bg-[#34495e] rounded-full p-2 text-white mt-1 flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2c3e50]">Rapide & simple</h4>
                    <p className="text-sm text-gray-600">10 questions seulement, moins de 2 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50">
                  <div className="bg-[#34495e] rounded-full p-2 text-white mt-1 flex-shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2c3e50]">Personnalisé pour vous</h4>
                    <p className="text-sm text-gray-600">Des suggestions qui vous correspondent vraiment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50">
                  <div className="bg-[#34495e] rounded-full p-2 text-white mt-1 flex-shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2c3e50]">Offres sur mesure</h4>
                    <p className="text-sm text-gray-600">Des expériences adaptées à vos préférences</p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleDismissPopup}
                  className="px-5 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors flex-1 border border-gray-200"
                >
                  Plus tard
                </button>
                <button
                  onClick={handleStartQuestionnaire}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white font-medium hover:from-[#34495e] hover:to-[#3d566e] transition-all shadow-md hover:shadow-lg flex-1 flex items-center justify-center gap-2"
                >
                  <span>Commencer</span>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Menu (imported as a separate component) */}
      <BottomMenu />
    </div>
  )
}
