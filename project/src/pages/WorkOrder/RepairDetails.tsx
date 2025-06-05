import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, CheckCircle, AlertTriangle, Clock, XCircle, MessageSquare, User, Calendar, PenTool as Tool } from 'lucide-react';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { mockRepairTickets, mockUsers } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const RepairDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // Find the ticket
    const foundTicket = mockRepairTickets.find(t => t.id === id);
    
    if (foundTicket) {
      setTicket(foundTicket);
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

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800">Ticket Not Found</h2>
        <p className="mt-2 text-gray-600">The repair ticket you're looking for doesn't exist.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate('/repairs')}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to Tickets
        </Button>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    setStatusUpdateLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTicket(prev => ({
        ...prev,
        status: newStatus,
        statusHistory: [
          ...prev.statusHistory,
          {
            status: newStatus,
            changedBy: user?.name,
            timestamp: new Date().toISOString()
          }
        ]
      }));
      
      toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
      setStatusUpdateLoading(false);
    }, 800);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    setTicket(prev => ({
      ...prev,
      notes: [
        ...prev.notes,
        {
          id: Date.now().toString(),
          text: newNote,
          createdBy: user?.name,
          createdAt: new Date().toISOString()
        }
      ]
    }));
    
    setNewNote('');
    toast.success('Note added successfully');
  };

  const statusBadgeVariant = 
    ticket.status === 'completed' ? 'green' :
    ticket.status === 'in_progress' ? 'blue' :
    ticket.status === 'pending' ? 'yellow' : 'red';
  
  const statusText = 
    ticket.status === 'completed' ? 'Completed' :
    ticket.status === 'in_progress' ? 'In Progress' :
    ticket.status === 'pending' ? 'Pending' : 'Cancelled';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/repairs')}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">
            Repair Ticket #{ticket.id.substring(0, 8)}
          </h1>
          <Badge variant={statusBadgeVariant} className="text-xs">{statusText}</Badge>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          icon={<Edit className="h-4 w-4" />}
        >
          Edit Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main ticket info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Repair Details</h2>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Device Information</h3>
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Device Type</p>
                      <p className="text-sm font-medium">{ticket.deviceType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Manufacturer</p>
                      <p className="text-sm font-medium">{ticket.manufacturer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Model</p>
                      <p className="text-sm font-medium">{ticket.model}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Serial Number</p>
                      <p className="text-sm font-medium">{ticket.serialNumber}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Service Information</h3>
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Created Date</p>
                      <p className="text-sm font-medium">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Priority</p>
                      <p className="text-sm font-medium capitalize">{ticket.priority}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <p className="text-sm font-medium">
                        {ticket.assignedTo?.name || 'Not assigned'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Estimated Completion</p>
                      <p className="text-sm font-medium">
                        {ticket.estimatedCompletionDate
                          ? new Date(ticket.estimatedCompletionDate).toLocaleDateString()
                          : 'Not set'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Issue Description</h3>
                <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                  {ticket.issue}
                </p>
              </div>

              {ticket.diagnosis && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-500">Diagnosis</h3>
                  <p className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                    {ticket.diagnosis}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Parts Required</h3>
                {ticket.partsRequired && ticket.partsRequired.length > 0 ? (
                  <ul className="mt-2 divide-y divide-gray-200">
                    {ticket.partsRequired.map((part, index) => (
                      <li key={index} className="py-3 flex justify-between">
                        <div className="text-sm">
                          <p className="font-medium text-gray-700">{part.name}</p>
                          <p className="text-gray-500">{part.description}</p>
                        </div>
                        <Badge variant={part.inStock ? 'green' : 'yellow'}>
                          {part.inStock ? 'In Stock' : 'On Order'}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">No parts required</p>
                )}
              </div>
            </CardBody>
          </Card>

          {/* Notes section */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Notes & Updates</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {ticket.notes && ticket.notes.length > 0 ? (
                  ticket.notes.map((note) => (
                    <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="text-sm">
                            <span className="font-medium text-gray-900">{note.createdBy}</span>
                            <span className="text-gray-500 ml-2">
                              {new Date(note.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-1 text-sm text-gray-700 whitespace-pre-line">
                            {note.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No notes yet</p>
                )}
              </div>

              <div className="mt-6">
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                  Add a note
                </label>
                <div className="mt-1">
                  <textarea
                    id="note"
                    name="note"
                    rows={3}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Add details about repairs, customer communication, etc."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    icon={<MessageSquare className="h-4 w-4" />}
                  >
                    Add Note
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status update */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Status</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <Button
                  variant={ticket.status === 'pending' ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  isLoading={statusUpdateLoading && ticket.status !== 'pending'}
                  disabled={statusUpdateLoading}
                  onClick={() => handleStatusChange('pending')}
                  icon={<Clock className="h-4 w-4" />}
                >
                  Mark as Pending
                </Button>
                <Button
                  variant={ticket.status === 'in_progress' ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  isLoading={statusUpdateLoading && ticket.status !== 'in_progress'}
                  disabled={statusUpdateLoading}
                  onClick={() => handleStatusChange('in_progress')}
                  icon={<AlertTriangle className="h-4 w-4" />}
                >
                  Mark as In Progress
                </Button>
                <Button
                  variant={ticket.status === 'completed' ? 'primary' : 'outline'}
                  className="w-full justify-center"
                  isLoading={statusUpdateLoading && ticket.status !== 'completed'}
                  disabled={statusUpdateLoading}
                  onClick={() => handleStatusChange('completed')}
                  icon={<CheckCircle className="h-4 w-4" />}
                >
                  Mark as Completed
                </Button>
                <Button
                  variant={ticket.status === 'cancelled' ? 'danger' : 'outline'}
                  className="w-full justify-center"
                  isLoading={statusUpdateLoading && ticket.status !== 'cancelled'}
                  disabled={statusUpdateLoading}
                  onClick={() => handleStatusChange('cancelled')}
                  icon={<XCircle className="h-4 w-4" />}
                >
                  Mark as Cancelled
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Customer info */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium">Customer</h2>
                <Link to={`/customers/${ticket.customer.id}`} className="text-sm text-blue-600 hover:text-blue-500">
                  View Profile
                </Link>
              </div>
            </CardHeader>
            <CardBody>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{ticket.customer.name}</p>
                  <p className="text-sm text-gray-500">{ticket.customer.email}</p>
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-600">Customer since {new Date(ticket.customer.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <Tool className="h-4 w-4 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-600">{ticket.customer.repairCount} repairs</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600">{ticket.customer.phone}</p>
                  <p className="text-sm text-gray-600">{ticket.customer.address}</p>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <div className="flex space-x-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 justify-center"
                >
                  Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 justify-center"
                >
                  Email
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium">Timeline</h2>
            </CardHeader>
            <CardBody className="p-0">
              <div className="flow-root px-4 py-5 sm:px-6">
                <ul className="-mb-8">
                  {ticket.statusHistory.map((update, idx) => {
                    const isLast = idx === ticket.statusHistory.length - 1;
                    
                    const statusIcon = 
                      update.status === 'completed' ? <CheckCircle className="h-5 w-5 text-green-500" /> :
                      update.status === 'in_progress' ? <AlertTriangle className="h-5 w-5 text-blue-500" /> :
                      update.status === 'pending' ? <Clock className="h-5 w-5 text-yellow-500" /> :
                      <XCircle className="h-5 w-5 text-red-500" />;
                    
                    return (
                      <li key={idx}>
                        <div className="relative pb-8">
                          {!isLast && (
                            <span
                              className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            ></span>
                          )}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                                {statusIcon}
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div>
                                <div className="text-sm">
                                  <span className="font-medium text-gray-900">
                                    {update.status.replace('_', ' ')}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                  {new Date(update.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <div className="mt-1 text-sm text-gray-600">
                                <p>Updated by {update.changedBy || 'System'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RepairDetails;