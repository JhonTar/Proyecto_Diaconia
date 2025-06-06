import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Filter, Search } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { mockRepairTickets } from '../../data/mockData';

type Status = 'all' | 'pending' | 'in_progress' | 'completed' | 'cancelled';

const RepairTickets = () => {
  const [status, setStatus] = useState<Status>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar textos truncados de forma segura
  const safeSubstring = (text: string | undefined, length: number) => {
    return text?.substring?.(0, length) || "N/A";
  };

  // Filter tickets with safe checks
  const filteredTickets = (mockRepairTickets || []).filter(ticket => {
    const safeTicket = ticket || {};
    const matchesStatus = status === 'all' || safeTicket.status === status;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      safeTicket.id?.toLowerCase()?.includes(searchLower) ||
      safeTicket.customer?.name?.toLowerCase()?.includes(searchLower) ||
      safeTicket.deviceType?.toLowerCase()?.includes(searchLower) ||
      safeTicket.issue?.toLowerCase()?.includes(searchLower);
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-bold text-gray-100">Ordenes de Trabajo</h1>
      <p className="mt-1 text-sm text-gray-400">Administrar todas las ordenes de trabajo</p>
    </div>
    <div className="mt-4 sm:mt-0">
      <Link to="/repairs/new">
        <Button 
          icon={<PlusCircle className="h-4 w-4" />}
          className="bg-blue-600 hover:bg-blue-500 text-white"
        >
          Nueva orden de trabajo
        </Button>
      </Link>
    </div>
  </div>


      {/* Filters */}
     <Card className="bg-gray-900 border border-gray-700 shadow-lg">  {/* Solo cambié bg-gray-800 → bg-gray-900 */}
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <div className="flex space-x-2">
              {(['all', 'pending', 'in_progress', 'completed', 'cancelled'] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    status === s
                      ? s === 'all' ? 'bg-gray-200 text-gray-800'
                        : s === 'pending' ? 'bg-yellow-200 text-yellow-800'
                        : s === 'in_progress' ? 'bg-blue-200 text-blue-800'
                        : s === 'completed' ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'
                      : s === 'all' ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : s === 'pending' ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                      : s === 'in_progress' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      : s === 'completed' ? 'bg-green-50 text-green-600 hover:bg-green-100'
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                  }`}
                >
                  {s === 'all' ? 'All' 
                   : s === 'in_progress' ? 'In Progress' 
                   : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Tickets table */}
      <Card className="bg-gray-800 border border-gray-700 shadow-lg">
  <div className="overflow-x-auto">
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
            Technician
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Date
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">View</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-800 divide-y divide-gray-700">
        {filteredTickets.length === 0 ? (
          <tr>
            <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-400">
              No tickets found matching your criteria
            </td>
          </tr>
        ) : (
          filteredTickets.map((ticket) => {
            const safeTicket = ticket || {};
            const badgeVariant = 
              safeTicket.status === 'completed' ? 'green' :
              safeTicket.status === 'in_progress' ? 'blue' :
              safeTicket.status === 'pending' ? 'yellow' : 'red';
            
            const badgeText = 
              safeTicket.status === 'completed' ? 'Completed' :
              safeTicket.status === 'in_progress' ? 'In Progress' :
              safeTicket.status === 'pending' ? 'Pending' : 'Cancelled';
            
            return (
              <tr key={safeTicket.id || Math.random()} className="hover:bg-gray-750 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  #{safeSubstring(safeTicket.id, 8)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {safeTicket.customer?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {safeTicket.deviceType || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {safeSubstring(safeTicket.issue, 30)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {safeTicket.assignedTo?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={badgeVariant} className="bg-opacity-20">
                    {badgeText}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {safeTicket.createdAt ? new Date(safeTicket.createdAt).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    to={`/repairs/${safeTicket.id || "#"}`} 
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  </div>
</Card>
    </div>
  );
};

export default RepairTickets;