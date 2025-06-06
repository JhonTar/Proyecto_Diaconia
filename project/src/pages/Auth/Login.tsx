import { useState, FormEvent } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import { MdEmail, MdLock } from 'react-icons/md';
//import {IMAGES} from '../../images/logo.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
  <div className="max-w-md w-full space-y-8">
    <div>
     
      <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
        Diaconia - Taller
      </h2>
      <p className="mt-2 text-center text-sm text-gray-300">
        Soporte Tecnico Informatico
      </p>
    </div>

    <div className="bg-gray-800 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Correo Electrónico
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdEmail className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="admin@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Contraseña
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-700 text-white block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="********"
            />
          </div>
        </div>

        <div>
          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign in
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-800 text-gray-300">
              Credenciales de Demostracion Version Beta
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-gray-700 p-3 rounded-md border border-gray-600">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-gray-200">
                Administrador
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-300">
              <div>Gmail: admin@example.com</div>
              <div>Contraseña: admin123</div>
            </div>
          </div>

          <div className="bg-gray-700 p-3 rounded-md border border-gray-600">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-teal-400" />
              <span className="text-sm font-medium text-gray-200">
                Tecnico
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-300">
              <div>Gmail: tech@example.com</div>
              <div>Contraseña: tech123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default Login;
