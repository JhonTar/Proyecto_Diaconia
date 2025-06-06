import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, PenTool as Tool, Package, Users, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const { user } = useAuth();
  
  const navigation = [
    { name: 'Principal', href: '/', icon: LayoutDashboard },
    { name: 'Orden de Trabajo', href: '/repairs', icon: Tool },
    { name: 'Equipo', href: '/inventory', icon: Package },
    { name: 'Cliente', href: '/customers', icon: Users },
    { name: 'Configuracion', href: '/settings', icon: Settings, adminOnly: true },
  ];

  const filteredNavigation = navigation.filter(
    item => !item.adminOnly || user?.role === 'admin'
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={`${
          isOpen ? 'fixed inset-0 z-40 flex' : 'hidden'
        } md:hidden`}
      >
        {/* Backdrop */}
        <div
          className={`${isOpen ? 'absolute inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300' : 'hidden'}`}
          onClick={closeSidebar}
        ></div>

        {/* Sidebar panel */}
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transition ease-in-out duration-300 transform">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={closeSidebar}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-2xl font-bold text-blue-600">Diaconia - Taller</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {filteredNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                      isActive
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                  onClick={closeSidebar}
                >
                  <item.icon
                    className="mr-4 h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={user?.avatar || 'https://via.placeholder.com/40'}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-gray-700">{user?.name}</p>
                <div className="flex items-center">
                  <ShieldCheck className="h-4 w-4 text-blue-500 mr-1" />
                  <p className="text-sm font-medium text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

   {/* Desktop sidebar */}
<div className="hidden md:flex md:flex-shrink-0">
  <div className="flex flex-col w-64">
    <div className="flex flex-col h-0 flex-1 border-r border-gray-700 bg-gray-800">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <span className="text-2xl font-bold text-blue-400">Diaconia -Taller</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-900 text-blue-100'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
        <div className="flex items-center">
          <div>
            <img
              className="inline-block h-9 w-9 rounded-full"
              src={user?.avatar || 'https://via.placeholder.com/40'}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-200">{user?.name}</p>
            <div className="flex items-center">
              <ShieldCheck className="h-3 w-3 text-blue-400 mr-1" />
              <p className="text-xs font-medium text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  );
};

export default Sidebar;