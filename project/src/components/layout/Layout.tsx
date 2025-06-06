import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-900">
  {/* Sidebar for mobile */}
  <Sidebar 
    isOpen={sidebarOpen} 
    closeSidebar={() => setSidebarOpen(false)} 
  />
  
  {/* Main content */}
  <div className="flex flex-col w-0 flex-1 overflow-hidden">
    <Navbar openSidebar={() => setSidebarOpen(true)} />
    
    <main className="flex-1 relative overflow-y-auto focus:outline-none py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Outlet />
      </div>
    </main>
  </div>
</div>
  );
};

export default Layout;