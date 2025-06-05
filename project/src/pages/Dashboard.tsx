import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wrench, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name || "User"}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link to="/repairs/new">
            <Button>New Repair Ticket</Button>
          </Link>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium truncate">Total Tickets</p>
                <p className="mt-1 text-3xl font-semibold">{stats.total}</p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                <Wrench className="h-6 w-6" />
              </div>
            </div>
          </CardBody>
        </Card>

        {/* ... (otras cards de estadísticas siguen el mismo patrón) ... */}
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Repair Tickets</h2>
            <Link to="/repairs" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all
            </Link>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                {/* ... (otros encabezados) ... */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                  <tr key={ticket?.id || Math.random()}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{safeSubstring(ticket?.id, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket?.customer?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket?.deviceType || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {safeSubstring(ticket?.issue, 30)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={badgeVariant}>{badgeText}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        to={`/repairs/${ticket?.id || "#"}`} 
                        className="text-blue-600 hover:text-blue-900"
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