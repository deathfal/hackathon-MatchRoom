import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Aurora from "../Backgrounds/Aurora/Aurora";

export default function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
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
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!formState.password) {
      newErrors.password = "Le mot de passe est requis";
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
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log("Login submitted:", formState);
      setIsSubmitting(false);
      
      // Redirect to home page after successful login
      navigate("/");
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
          to="/"
          className="text-[#4a5568] w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="text-sm font-medium text-gray-500">
          Connexion
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 pt-4 pb-8 flex flex-col max-w-md mx-auto w-full relative z-10">
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg"></div>

        <div className="mb-10 relative">
          <h1 className="text-3xl font-bold mb-3 text-[#2d3748]">Bon retour !</h1>
          <p className="text-gray-600">Connectez-vous pour accéder à votre compte MatchRoom</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative">
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
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <Link to="/forgot-password" className="text-sm text-[#2c3e50] hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
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
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Se souvenir de moi */}
          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 text-[#2c3e50] border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>

          {/* Bouton de connexion */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full h-14 rounded-xl flex items-center justify-center text-white transition-all duration-300
              shadow-md hover:shadow-lg transform hover:-translate-y-1 font-medium text-lg
              ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#2c3e50]"}
            `}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connexion en cours...
              </div>
            ) : (
              <div className="flex items-center">
                Se connecter
                <ArrowRight size={20} className="ml-2" />
              </div>
            )}
          </button>
        </form>

        <div className="mt-10 text-center text-gray-600 relative z-20">
          Pas encore inscrit ? <Link to="/signup-type" className="text-[#2c3e50] font-medium hover:underline">Créer un compte</Link>
        </div>

        {/* Séparateur */}
        <div className="relative flex items-center mt-8 mb-6 z-20">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Connexion sociale */}
        <div className="grid grid-cols-1 gap-3 relative z-20">
          <button
            type="button"
            className="py-3 px-4 flex justify-center items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg text-gray-700 font-medium transition-colors shadow-sm"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            Continuer avec Google
          </button>
          
          <button
            type="button"
            className="py-3 px-4 flex justify-center items-center gap-2 bg-black hover:bg-gray-900 border border-black rounded-lg text-white font-medium transition-colors shadow-sm"
          >
            <img src="/svg/apple.svg" alt="Apple" className="w-5 h-5" />
            Continuer avec Apple
          </button>
        </div>
      </div>
    </div>
  );
}