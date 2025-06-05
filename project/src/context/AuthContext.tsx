import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: 'admin' | 'technician';
  avatar?: string;
}

// Extend User interface to include password for mock data
interface MockUser extends User {
  password?: string; // Add password for mock authentication
}

// --- Add this mockUsers array ---
const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Admin User',
    phone: '123-456-7890',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Technician User',
    phone: '098-765-4321',
    email: 'tech@example.com',
    password: 'tech123',
    role: 'technician',
  },
];
// --- End of mockUsers array ---

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('repairShopUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
      
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );
      
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('repairShopUser', JSON.stringify(userWithoutPassword));
      return true;
    }
      
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('repairShopUser');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};