// Mock users for the application
export const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    phone: '555-0100',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=68'
  },
  {
    id: '2',
    name: 'Tech User',
    phone: '555-0101',
    email: 'tech@example.com',
    password: 'tech123',
    role: 'technician',
    avatar: 'https://i.pravatar.cc/150?img=33'
  }
];

// Mock customers
export const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    agency: 'Cascada',
    position: 'Supervisor Operativo administrativo',
    createdAt: '2023-01-15T08:00:00.000Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    agency: 'San Martin',
    position: 'Plataforma',
    createdAt: '2023-03-22T10:30:00.000Z'
  }
];

// Mock equipment
export const mockEquipment = [
  {
    id: '1',
    tagNumber: '05-04545',
    type: 'Desktop',
    brand: 'Dell',
    model: 'OptiPlex 7090',
    serialNumber: 'DLL7090123',
    entryDate: '2023-01-15T08:00:00.000Z'
  },
  {
    id: '2',
    tagNumber: '05-06060',
    type: 'Laptop',
    brand: 'Lenovo',
    model: 'ThinkPad T14',
    serialNumber: 'LNV14789',
    entryDate: '2023-02-20T09:30:00.000Z'
  }
];

// Mock repair tickets
export const mockRepairTickets = [
  {
    id: 'RT-2023-0001',
    dateTime: '2023-07-01T09:30:00.000Z',
    technician: {
      id: '2',
      name: 'Tech User'
    },
    customer: {
      id: '1',
      name: 'John Doe',
      agency: 'Marketing Department',
      position: 'Marketing Manager'
    },
    equipment: {
      id: '1',
      tagNumber: '05-04545',
      type: 'Desktop',
      brand: 'Dell',
      model: 'OptiPlex 7090'
    },
    repairType: 'maintenance',
    repairDetails: 'Regular maintenance and cleaning of internal components',
    status: 'completed',
    notes: [
      {
        id: 'note1',
        text: 'Completed regular maintenance procedures',
        createdBy: 'Tech User',
        createdAt: '2023-07-01T11:45:00.000Z'
      }
    ],
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2023-07-01T09:30:00.000Z',
        changedBy: 'System'
      },
      {
        status: 'completed',
        timestamp: '2023-07-01T11:45:00.000Z',
        changedBy: 'Tech User'
      }
    ]
  },
  {
    id: 'RT-2023-0002',
    dateTime: '2023-07-05T14:00:00.000Z',
    technician: {
      id: '2',
      name: 'Tech User'
    },
    customer: {
      id: '2',
      name: 'Jane Smith',
      agency: 'HR Department',
      position: 'HR Coordinator'
    },
    equipment: {
      id: '2',
      tagNumber: '08-12345',
      type: 'Laptop',
      brand: 'HP',
      model: 'ProBook 450 G8'
    },
    repairType: 'software_issue',
    repairDetails: 'Operating system corruption, requires reinstallation and data backup.',
    status: 'in_progress',
    notes: [
      {
        id: 'note2a',
        text: 'Initial diagnostic completed. OS corrupted. Backing up user data.',
        createdBy: 'Tech User',
        createdAt: '2023-07-05T15:30:00.000Z'
      },
      {
        id: 'note2b',
        text: 'Reinstallation of Windows in progress.',
        createdBy: 'Tech User',
        createdAt: '2023-07-05T17:00:00.000Z'
      }
    ],
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2023-07-05T14:00:00.000Z',
        changedBy: 'System'
      },
      {
        status: 'in_progress',
        timestamp: '2023-07-05T15:00:00.000Z',
        changedBy: 'Tech User'
      }
    ]
  },
  {
    id: 'RT-2023-0003',
    dateTime: '2023-07-10T10:15:00.000Z',
    technician: {
      id: '2',
      name: 'Tech User'
    },
    customer: {
      id: '3',
      name: 'Peter Jones',
      agency: 'IT Department',
      position: 'Network Admin'
    },
    equipment: {
      id: '3',
      tagNumber: '12-98765',
      type: 'Monitor',
      brand: 'LG',
      model: 'UltraGear 27GN950'
    },
    repairType: 'hardware_issue',
    repairDetails: 'Monitor not turning on, suspect power supply issue.',
    status: 'pending_parts',
    notes: [
      {
        id: 'note3a',
        text: 'Diagnosed faulty power supply. Ordered replacement part.',
        createdBy: 'Tech User',
        createdAt: '2023-07-10T11:30:00.000Z'
      }
    ],
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2023-07-10T10:15:00.000Z',
        changedBy: 'System'
      },
      {
        status: 'pending_parts',
        timestamp: '2023-07-10T11:30:00.000Z',
        changedBy: 'Tech User'
      }
    ]
  },
  {
    id: 'RT-2023-0004',
    dateTime: '2023-07-12T08:45:00.000Z',
    technician: {
      id: '2',
      name: 'Tech User'
    },
    customer: {
      id: '1',
      name: 'John Doe',
      agency: 'Marketing Department',
      position: 'Marketing Manager'
    },
    equipment: {
      id: '4',
      tagNumber: '05-04546',
      type: 'Printer',
      brand: 'Epson',
      model: 'EcoTank ET-2760'
    },
    repairType: 'other',
    repairDetails: 'Printer not connecting to network. Driver issue suspected.',
    status: 'pending',
    notes: [],
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2023-07-12T08:45:00.000Z',
        changedBy: 'System'
      }
    ]
  }
];