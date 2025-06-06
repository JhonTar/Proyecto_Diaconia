import { useNavigate } from 'react-router-dom';
import { Bell, Search, Menu as MenuIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  openSidebar: () => void;
}

const Navbar = ({ openSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <button
          type="button"
          className="md:hidden text-gray-400 hover:text-gray-200 focus:outline-none"
          onClick={openSidebar}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-700 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          className="p-1 rounded-full text-gray-400 hover:text-gray-200 focus:outline-none"
        >
          <Bell className="h-6 w-6" />
        </button>

        {/* Profile dropdown */}
        <div className="ml-4 relative flex-shrink-0">
          <div className="group relative">
            <button
              type="button"
              className="flex items-center space-x-3 focus:outline-none"
            >
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatar || 'https://via.placeholder.com/40'}
                  alt=""
                />
                <span className="ml-2 text-sm font-medium text-gray-200 hidden md:block">
                  {user?.name}
                </span>
              </div>
            </button>
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
              <button
                onClick={() => navigate('/profile')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
              >
                Your Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;