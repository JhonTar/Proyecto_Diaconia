import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { mockRepairTickets } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    // Validación extra por si mockRepairTickets es undefined
    const tickets = mockRepairTickets || [];
    
    setStats({
      total: tickets.length,
      pending: tickets.filter(ticket => ticket?.status === 'pending').length,
      inProgress: tickets.filter(ticket => ticket?.status === 'in_progress').length,
      completed: tickets.filter(ticket => ticket?.status === 'completed').length,
      cancelled: tickets.filter(ticket => ticket?.status === 'cancelled').length,
    });
  }, []);

  // Get recent tickets (last 5) con validaciones
  const recentTickets = [...(mockRepairTickets || [])]
    .sort((a, b) => 
      new Date(b?.createdAt || 0).getTime() - new Date(a?.createdAt || 0).getTime()
    )
    .slice(0, 5);

  // Función para manejar textos truncados de forma segura
  const safeSubstring = (text: string | undefined, length: number) => {
    return text?.substring?.(0, length) || "N/A";
  };

  return (
   <div className="space-y-6 bg-gray-900 p-6">
  {/* Header */}
  <div className="sm:flex sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-bold text-white">Panel Principal</h1>
      <p className="mt-1 text-sm text-gray-300">
        Bienvenido {user?.name || "User"}
      </p>
    </div>
    <div className="mt-4 sm:mt-0">
      <Link to="/repairs/new">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Nueva orden de Trabajo
        </Button>
      </Link>
    </div>
  </div>

  {/* Stats cards */}
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
    <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium truncate">Total Tickets</p>
            <p className="mt-1 text-3xl font-semibold">{stats.total}</p>
          </div>
          <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full">
            <Wrench className="h-6 w-6" />
          </div>
        </div>
      </CardBody>
    </Card>

    {/* Otras cards de estadísticas con colores más oscuros */}
     <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <CardBody>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium truncate">Total Tickets</p>
            <p className="mt-1 text-3xl font-semibold">{stats.total}</p>
          </div>
          <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full">
            <Wrench className="h-6 w-6" />
          </div>
        </div>
      </CardBody>
    </Card>
  </div>

  {/* Recent Tickets */}
 <Card className="bg-gray-800 border border-gray-700 shadow-lg">
  <CardHeader className="border-b border-gray-700 bg-gray-800/50">
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-100">Trabjados Recientes</h2>
      <Link 
        to="/repairs" 
        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
      >
        Ver Todo
      </Link>
    </div>
  </CardHeader>
  
  <div className="overflow-x-auto rounded-b-lg">
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-800">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Ticket ID
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Customer
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Device
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Issue
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Date
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {recentTickets.map((ticket) => {
          const badgeVariant = 
            ticket?.status === 'completed' ? 'green' :
            ticket?.status === 'in_progress' ? 'blue' :
            ticket?.status === 'pending' ? 'yellow' : 'red';
          
          const badgeText = 
            ticket?.status === 'completed' ? 'Completed' :
            ticket?.status === 'in_progress' ? 'In Progress' :
            ticket?.status === 'pending' ? 'Pending' : 'Cancelled';
          
          return (
            <tr key={ticket?.id || Math.random()} className="hover:bg-gray-750 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                #{safeSubstring(ticket?.id, 8)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {ticket?.customer?.name || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {ticket?.deviceType || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {safeSubstring(ticket?.issue, 30)}...
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge 
                  variant={badgeVariant}
                  className="bg-opacity-20 text-xs font-medium"
                >
                  {badgeText}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link 
                  to={`/repairs/${ticket?.id || "#"}`} 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  View
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</Card>
</div>
  );
};

export default Dashboard;