import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Search, Plus } from 'lucide-react';
import Card, { CardHeader, CardBody, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { mockCustomers, mockEquipment } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

interface FormState {
  dateTime: string;
  technicianId: string;
  customerId: string;
  customerName: string;
  customerAgency: string;
  customerPosition: string;
  equipmentId: string;
  equipmentTagNumber: string;
  equipmentType: string;
  equipmentBrand: string;
  equipmentModel: string;
  repairType: 'maintenance' | 'repair' | 'assignment';
  repairDetails: string;
}

const CreateRepairTicket = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formState, setFormState] = useState<FormState>({
    dateTime: new Date().toISOString().slice(0, 16),
    technicianId: user?.id || '',
    customerId: '',
    customerName: '',
    customerAgency: '',
    customerPosition: '',
    equipmentId: '',
    equipmentTagNumber: '',
    equipmentType: '',
    equipmentBrand: '',
    equipmentModel: '',
    repairType: 'repair',
    repairDetails: ''
  });
  
  const [showCustomerSearch, setShowCustomerSearch] = useState(false);
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [equipmentSearchTerm, setEquipmentSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter customers based on search term
  const filteredCustomers = customerSearchTerm
    ? mockCustomers.filter(customer =>
        customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
        customer.agency.toLowerCase().includes(customerSearchTerm.toLowerCase())
      )
    : mockCustomers.slice(0, 5);

  // Handle equipment tag number search
  useEffect(() => {
    if (equipmentSearchTerm) {
      const equipment = mockEquipment.find(
        eq => eq.tagNumber.toLowerCase() === equipmentSearchTerm.toLowerCase()
      );
      
      if (equipment) {
        setFormState(prev => ({
          ...prev,
          equipmentId: equipment.id,
          equipmentTagNumber: equipment.tagNumber,
          equipmentType: equipment.type,
          equipmentBrand: equipment.brand,
          equipmentModel: equipment.model
        }));
      }
    }
  }, [equipmentSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const selectCustomer = (customer: typeof mockCustomers[0]) => {
    setFormState(prev => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
      customerAgency: customer.agency,
      customerPosition: customer.position
    }));
    setShowCustomerSearch(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formState.customerId || !formState.equipmentId || !formState.repairDetails) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Repair ticket created successfully');
      navigate('/repairs');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/repairs')}
          icon={<ArrowLeft className="h-4 w-4" />}
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Repair Ticket</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Basic Information</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                      Date and Time*
                    </label>
                    <input
                      type="datetime-local"
                      id="dateTime"
                      name="dateTime"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formState.dateTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Equipment Information</h2>
              </CardHeader>
              <CardBody>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="equipmentTagNumber" className="block text-sm font-medium text-gray-700">
                      Equipment Tag Number*
                    </label>
                    <input
                      type="text"
                      id="equipmentTagNumber"
                      name="equipmentTagNumber"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formState.equipmentTagNumber}
                      onChange={(e) => {
                        setEquipmentSearchTerm(e.target.value);
                        handleInputChange(e);
                      }}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="equipmentType" className="block text-sm font-medium text-gray-700">
                        Type
                      </label>
                      <input
                        type="text"
                        id="equipmentType"
                        name="equipmentType"
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                        value={formState.equipmentType}
                        readOnly
                      />
                    </div>

                    <div>
                      <label htmlFor="equipmentBrand" className="block text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <input
                        type="text"
                        id="equipmentBrand"
                        name="equipmentBrand"
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                        value={formState.equipmentBrand}
                        readOnly
                      />
                    </div>

                    <div>
                      <label htmlFor="equipmentModel" className="block text-sm font-medium text-gray-700">
                        Model
                      </label>
                      <input
                        type="text"
                        id="equipmentModel"
                        name="equipmentModel"
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                        value={formState.equipmentModel}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Service Information</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Service Type*
                    </label>
                    <div className="mt-2 space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="repairType"
                          value="maintenance"
                          checked={formState.repairType === 'maintenance'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Maintenance</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="repairType"
                          value="repair"
                          checked={formState.repairType === 'repair'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Repair</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="repairType"
                          value="assignment"
                          checked={formState.repairType === 'assignment'}
                          onChange={handleInputChange}
                          className="form-radio h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Assignment</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="repairDetails" className="block text-sm font-medium text-gray-700">
                      Repair Details*
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="repairDetails"
                        name="repairDetails"
                        rows={4}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        value={formState.repairDetails}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Customer Information</h2>
              </CardHeader>
              <CardBody>
                {formState.customerId ? (
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{formState.customerName}</p>
                        <p className="text-sm text-gray-500">{formState.customerAgency}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p>Position: {formState.customerPosition}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => setShowCustomerSearch(true)}
                      >
                        Change Customer
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-500 mb-4">
                      Select a customer for this repair ticket
                    </p>
                    <Button
                      size="sm"
                      className="w-full justify-center"
                      onClick={() => setShowCustomerSearch(true)}
                      icon={<Search className="h-4 w-4" />}
                    >
                      Find Customer
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>

            {showCustomerSearch && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium">Select Customer</h2>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowCustomerSearch(false)}
                    >
                      <span className="sr-only">Close</span>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="mb-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search customers..."
                        value={customerSearchTerm}
                        onChange={(e) => setCustomerSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="overflow-y-auto max-h-60">
                    <ul className="divide-y divide-gray-200">
                      {filteredCustomers.map((customer) => (
                        <li key={customer.id} className="py-3">
                          <button
                            type="button"
                            className="w-full text-left flex items-center px-2 py-2 hover:bg-gray-50 rounded-md"
                            onClick={() => selectCustomer(customer)}
                          >
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-600" />
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                              <p className="text-xs text-gray-500">{customer.agency}</p>
                            </div>
                          </button>
                        </li>
                      ))}
                      {filteredCustomers.length === 0 && (
                        <li className="py-3 px-2 text-sm text-gray-500">
                          No customers found matching your search
                        </li>
                      )}
                    </ul>
                  </div>
                </CardBody>
                <CardFooter>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-center"
                    icon={<Plus className="h-4 w-4" />}
                  >
                    Create New Customer
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Card>
              <CardHeader>
                <h2 className="text-lg font-medium">Actions</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  <Button
                    type="submit"
                    className="w-full justify-center"
                    isLoading={isSubmitting}
                  >
                    Create Ticket
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => navigate('/repairs')}
                  >
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRepairTicket;