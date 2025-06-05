import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Phone, Mail, MapPin, PenTool as Tool, Plus } from 'lucide-react';
import Card, { CardHeader, CardBody } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { mockCustomers, mockRepairTickets } from '../data/mockData';

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState<any>(null);
  const [customerTickets, setCustomerTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the customer
    const foundCustomer = mockCustomers.find(c => c.id === id);
    
    if (foundCustomer) {
      setCustomer(foundCustomer);
      
      // Find related tickets
      const tickets = mockRepairTickets.filter(t => t.customer.id === id);
      setCustomerTickets(tickets);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Customer Not Found</h2>
        <p className="mt-2 text-gray-600">The customer you're looking for doesn't exist.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/customers')}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Customers
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/customers')}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            {customer.name}
          </h1>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          icon={<Edit className="h-4 w-4" />}
        >
          Edit Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Customer Information</h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                    {customer.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                  <p className="text-sm text-gray-500">Customer since {new Date(customer.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-medium text-gray-900">{customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-900">{customer.address}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Statistics</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Tool className="h-5 w-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-900">Total Repairs</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-blue-600">{customerTickets.length}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Tool className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium text-gray-900">Completed</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-green-600">
                    {customerTickets.filter(t => t.status === 'completed').length}
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Tool className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900">In Progress</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-yellow-600">
                    {customerTickets.filter(t => t.status === 'in_progress').length}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Tool className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">Pending</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-600">
                    {customerTickets.filter(t => t.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Repair History */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Repair History</h2>
                <Link to="/repairs/new">
                  <Button
                    size="sm"
                    icon={<Plus className="h-4 w-4" />}
                  >
                    New Repair
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              {customerTickets.length === 0 ? (
                <div className="py-6 px-4 text-center">
                  <p className="text-gray-500">No repair history found for this customer</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ticket ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Device
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">View</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {customerTickets.map((ticket) => {
                        const badgeVariant = 
                          ticket.status === 'completed' ? 'green' :
                          ticket.status === 'in_progress' ? 'blue' :
                          ticket.status === 'pending' ? 'yellow' : 'red';
                        
                        const badgeText = 
                          ticket.status === 'completed' ? 'Completed' :
                          ticket.status === 'in_progress' ? 'In Progress' :
                          ticket.status === 'pending' ? 'Pending' : 'Cancelled';
                        
                        return (
                          <tr key={ticket.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{ticket.id.substring(0, 8)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ticket.deviceType}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {ticket.issue.substring(0, 30)}...
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant={badgeVariant}>{badgeText}</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link to={`/repairs/${ticket.id}`} className="text-blue-600 hover:text-blue-900">
                                View
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;