import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Lock, Building, MapPin, Phone, Globe, Star, FileText, User, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Aurora from "../Backgrounds/Aurora/Aurora";

export default function SignupHotel() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  
  const [formState, setFormState] = useState({
    // Informations utilisateur (étape 1)
    managerName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    
    // Informations hôtel (étape 2)
    hotelName: "",
    address: "",
    city: "",
    website: "",
    category: "3",
    siret: "",
    hotelType: "hotel",
    customHotelType: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateUserInfo = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.managerName.trim()) {
      newErrors.managerName = "Le nom du responsable est requis";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formState.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    }
    
    if (!formState.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formState.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    
    if (formState.confirmPassword !== formState.password) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateHotelInfo = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.hotelName.trim()) {
      newErrors.hotelName = "Le nom de l'établissement est requis";
    }
    
    if (!formState.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }

    if (!formState.city.trim()) {
      newErrors.city = "La ville est requise";
    }

    if (!formState.siret.trim()) {
      newErrors.siret = "Le numéro de SIRET est requis";
    } else if (!/^\d{14}$/.test(formState.siret.replace(/\s/g, ''))) {
      newErrors.siret = "Le numéro de SIRET doit contenir 14 chiffres";
    }

    if (formState.hotelType === "autre" && !formState.customHotelType.trim()) {
      newErrors.customHotelType = "Veuillez préciser le type d'établissement";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateUserInfo()) {
      setCurrentStep(2);
      // Réinitialiser les erreurs lors du changement d'étape
      setErrors({});
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    // Réinitialiser les erreurs lors du changement d'étape
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateHotelInfo()) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Form submitted:", formState);
      setIsSubmitting(false);
      
      navigate("/signup-complete");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f7f4] to-[#eee9e0] text-gray-800 relative">
      <div className="absolute inset-0 opacity-30 z-0">
        <Aurora 
          colorStops={["#34495e", "#2c3e50", "#546e7a"]} 
          amplitude={1.2}
          blend={0.8}
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-4 relative z-10">
        <Link
          to={currentStep === 1 ? "/signup-type" : "#"}
          onClick={currentStep === 2 ? handlePreviousStep : undefined}
          className="text-[#4a5568] w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="text-sm font-medium text-gray-500">
          {currentStep === 1 ? "Étape 1/2 : Votre compte" : "Étape 2/2 : Votre établissement"}
        </div>
        <div className="w-10"></div> {/* Pour l'équilibre visuel */}
      </div>

      {/* Progress Bar */}
      <div className="px-6 pb-2 relative z-10 max-w-xl mx-auto w-full">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#34495e] text-white flex items-center justify-center text-sm font-medium">1</div>
          <div className={`flex-1 h-1 mx-2 ${currentStep >= 1 ? "bg-[#34495e]" : "bg-gray-300"}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep === 2 ? "bg-[#34495e] text-white" : "bg-gray-200 text-gray-600"}`}>2</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col max-w-xl mx-auto w-full relative z-10">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg"></div>

        <div className="mb-8 relative">
          <h1 className="text-3xl font-bold mb-3 text-[#2d3748]">
            {currentStep === 1 ? "Créez votre compte professionnel" : "Informations de votre établissement"}
          </h1>
          <p className="text-gray-600">
            {currentStep === 1 ? 
              "Commençons par créer votre compte personnel pour gérer votre établissement" : 
              "Parlez-nous de votre établissement pour que nous puissions le présenter correctement"}
          </p>
        </div>

        {currentStep === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-5 relative">
            {/* Nom du responsable */}
            <div>
              <label htmlFor="managerName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="managerName"
                  name="managerName"
                  value={formState.managerName}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.managerName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="Votre nom complet"
                />
              </div>
              {errors.managerName && <p className="mt-1 text-sm text-red-600">{errors.managerName}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email professionnel
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="contact@votreetablissement.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Téléphone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="Numéro de téléphone"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Mot de passe */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-12 py-3 block w-full rounded-lg border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Masquer" : "Afficher"}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formState.confirmPassword}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="Confirmer votre mot de passe"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Bouton de navigation */}
            <button
              type="submit"
              className="w-full h-14 mt-6 rounded-xl flex items-center justify-center text-white bg-[#34495e] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium text-lg"
            >
              <div className="flex items-center">
                Continuer
                <ArrowRight size={20} className="ml-2" />
              </div>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            {/* Nom de l'établissement */}
            <div>
              <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'établissement
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="hotelName"
                  name="hotelName"
                  value={formState.hotelName}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.hotelName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="Nom de votre établissement"
                />
              </div>
              {errors.hotelName && <p className="mt-1 text-sm text-red-600">{errors.hotelName}</p>}
            </div>
            
            {/* Type d'hôtel */}
            <div>
              <label htmlFor="hotelType" className="block text-sm font-medium text-gray-700 mb-1">
                Type d'établissement
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={18} className="text-gray-400" />
                </div>
                <select
                  id="hotelType"
                  name="hotelType"
                  value={formState.hotelType}
                  onChange={handleChange}
                  className="bg-white pl-10 pr-4 py-3 block w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors"
                >
                  <option value="hotel">Hôtel</option>
                  <option value="camping">Camping</option>
                  <option value="gite">Gîte</option>
                  <option value="village">Village vacances</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              
              {/* Champ pour saisir un type personnalisé */}
              {formState.hotelType === "autre" && (
                <div className="mt-3">
                  <input
                    type="text"
                    id="customHotelType"
                    name="customHotelType"
                    value={formState.customHotelType}
                    onChange={handleChange}
                    className={`bg-white pl-4 pr-4 py-3 block w-full rounded-lg border ${
                      errors.customHotelType ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                    placeholder="Précisez le type d'établissement"
                  />
                  {errors.customHotelType && 
                    <p className="mt-1 text-sm text-red-600">{errors.customHotelType}</p>
                  }
                </div>
              )}
            </div>
            
            {/* Numéro de SIRET */}
            <div>
              <label htmlFor="siret" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de SIRET
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileText size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="siret"
                  name="siret"
                  value={formState.siret}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.siret ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="14 chiffres sans espaces"
                  maxLength={14}
                />
              </div>
              {errors.siret && <p className="mt-1 text-sm text-red-600">{errors.siret}</p>}
            </div>

            {/* Catégorie (nombre d'étoiles) */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Catégorie
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Star size={18} className="text-gray-400" />
                </div>
                <select
                  id="category"
                  name="category"
                  value={formState.category}
                  onChange={handleChange}
                  className="bg-white pl-10 pr-4 py-3 block w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors"
                >
                  <option value="1">1 étoile</option>
                  <option value="2">2 étoiles</option>
                  <option value="3">3 étoiles</option>
                  <option value="4">4 étoiles</option>
                  <option value="5">5 étoiles</option>
                  <option value="0">Non classé</option>
                </select>
              </div>
            </div>

            {/* Adresse */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse complète
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formState.address}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="Adresse de votre établissement"
                />
              </div>
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Ville */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Ville
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors`}
                  placeholder="Ville de l'établissement"
                />
              </div>
              {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
            </div>

            {/* Site web */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                Site web (optionnel)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Globe size={18} className="text-gray-400" />
                </div>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formState.website}
                  onChange={handleChange}
                  className="bg-white pl-10 pr-4 py-3 block w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#34495e] focus:border-transparent transition-colors"
                  placeholder="https://www.votreetablissement.com"
                />
              </div>
            </div>

            {/* Conditions d'utilisation */}
            <div className="flex items-start mt-6">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-[#34495e] border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  J'accepte les <a href="#" className="text-[#34495e] underline">conditions d'utilisation</a> et la <a href="#" className="text-[#34495e] underline">politique de confidentialité</a>
                </label>
              </div>
            </div>

            {/* Boutons de navigation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="h-14 rounded-xl flex items-center justify-center text-gray-700 bg-gray-200 transition-all duration-300 hover:bg-gray-300 font-medium"
              >
                <ArrowLeft size={20} className="mr-2" />
                Retour
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  h-14 rounded-xl flex items-center justify-center text-white transition-all duration-300
                  shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium
                  ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#34495e]"}
                `}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Inscription...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Finaliser
                    <Check size={20} className="ml-2" />
                  </div>
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center text-gray-600 relative">
          Déjà inscrit ? <Link to="/login" className="text-[#34495e] font-medium hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}