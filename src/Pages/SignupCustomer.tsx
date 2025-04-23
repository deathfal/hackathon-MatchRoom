import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Lock, User, MapPin, Phone, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Aurora from "../Backgrounds/Aurora/Aurora";

export default function SignupCustomer() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    city: "",
    phone: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }
    
    if (!formState.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = "Format d'email invalide";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log("Form submitted:", formState);
      setIsSubmitting(false);
      
      navigate("/questionnaire");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f9f7f4] to-[#eee9e0] text-gray-800 relative">
      <div className="absolute inset-0 opacity-30 z-0">
        <Aurora 
          colorStops={["#2c3e50", "#34495e", "#4a5568"]} 
          amplitude={1.2}
          blend={0.8}
        />
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-4 relative z-10">
        <Link
          to="/signup-type"
          className="text-[#4a5568] w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="text-sm font-medium text-gray-500">
          Inscription voyageur
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col max-w-xl mx-auto w-full relative z-10">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg"></div>

        <div className="mb-8 relative">
          <h1 className="text-3xl font-bold mb-3 text-[#2d3748]">Créer votre compte</h1>
          <p className="text-gray-600">Remplissez ce formulaire pour accéder à des recommandations d'hôtels personnalisées</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Prénom */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formState.firstName}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent transition-colors`}
                  placeholder="Votre prénom"
                />
              </div>
              {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
            </div>

            {/* Nom */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formState.lastName}
                  onChange={handleChange}
                  className={`bg-white pl-10 pr-4 py-3 block w-full rounded-lg border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent transition-colors`}
                  placeholder="Votre nom"
                />
              </div>
              {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
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
                } focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent transition-colors`}
                placeholder="votre@email.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                } focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent transition-colors`}
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
                } focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent transition-colors`}
                placeholder="Confirmer votre mot de passe"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  className="bg-white pl-10 pr-4 py-3 block w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent transition-colors"
                  placeholder="Votre ville de résidence"
                />
              </div>
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
                  className="bg-white pl-10 pr-4 py-3 block w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2c3e50] focus:border-transparent transition-colors"
                  placeholder="Votre numéro de téléphone"
                />
              </div>
            </div>
          </div>

          {/* Conditions d'utilisation */}
          <div className="flex items-start mt-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-[#2c3e50] border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                J'accepte les <a href="#" className="text-[#2c3e50] underline">conditions d'utilisation</a> et la <a href="#" className="text-[#2c3e50] underline">politique de confidentialité</a>
              </label>
            </div>
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full h-14 mt-6 rounded-xl flex items-center justify-center text-white transition-all duration-300
              shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium text-lg
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#2c3e50]"}
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Création en cours...
              </div>
            ) : (
              <div className="flex items-center">
                S'inscrire
                <ArrowRight size={20} className="ml-2" />
              </div>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-600 relative">
          Déjà inscrit ? <Link to="/login" className="text-[#2c3e50] font-medium hover:underline">Se connecter</Link>
        </div>
      </div>
    </div>
  );
}