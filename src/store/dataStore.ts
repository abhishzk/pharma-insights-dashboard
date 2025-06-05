import { create } from 'zustand';
import { DataSet, LabResult, Compound } from '../types';

// Mock data for demonstration
const mockCompounds: Compound[] = [
  {
    id: 'c1',
    name: 'Atorvastatin',
    formula: 'C33H35FN2O5',
    molecularWeight: 558.64,
    logP: 4.1,
    description: 'HMG-CoA reductase inhibitor used to lower blood cholesterol',
    structure: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=60823&t=l'
  },
  {
    id: 'c2',
    name: 'Sildenafil',
    formula: 'C22H30N6O4S',
    molecularWeight: 474.58,
    logP: 2.7,
    description: 'PDE5 inhibitor used for erectile dysfunction and pulmonary hypertension',
    structure: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=135398631&t=l'
  },
  {
    id: 'c3',
    name: 'Palbociclib',
    formula: 'C24H29N7O2',
    molecularWeight: 447.54,
    logP: 2.4,
    description: 'CDK4/6 inhibitor used for treating breast cancer',
    structure: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=5330286&t=l'
  }
];

const mockLabResults: LabResult[] = [
  {
    id: 'r1',
    compoundId: 'c1',
    compoundName: 'Atorvastatin',
    date: '2024-05-15',
    researcher: 'Dr. Jane Smith',
    assayType: 'Solubility Assay',
    result: 120.4,
    unit: 'μg/mL',
    status: 'approved',
    notes: 'Excellent solubility in pH 7.4 buffer'
  },
  {
    id: 'r2',
    compoundId: 'c1',
    compoundName: 'Atorvastatin',
    date: '2024-05-10',
    researcher: 'Dr. John Davis',
    assayType: 'Plasma Protein Binding',
    result: 98.2,
    unit: '%',
    status: 'approved',
    notes: 'High protein binding as expected'
  },
  {
    id: 'r3',
    compoundId: 'c2',
    compoundName: 'Sildenafil',
    date: '2024-05-12',
    researcher: 'Dr. Jane Smith',
    assayType: 'Microsomal Stability',
    result: 34.6,
    unit: 'min',
    status: 'pending',
    notes: 'Half-life in human liver microsomes'
  },
  {
    id: 'r4',
    compoundId: 'c3',
    compoundName: 'Palbociclib',
    date: '2024-05-08',
    researcher: 'Dr. John Davis',
    assayType: 'CYP Inhibition',
    result: 8.9,
    unit: 'μM',
    status: 'approved',
    notes: 'IC50 for CYP3A4'
  }
];

const mockDataSets: DataSet[] = [
  {
    id: 'ds1',
    name: 'Atorvastatin PK Study',
    description: 'Pharmacokinetic data from Phase I clinical trial',
    createdAt: '2024-03-10T09:30:00Z',
    updatedAt: '2024-05-12T14:15:00Z',
    createdBy: 'Dr. Jane Smith',
    type: 'clinical',
    status: 'active',
    data: [
      { id: 'd1', value: 0, timestamp: '2024-03-01T08:00:00Z', label: '0h' },
      { id: 'd2', value: 120, timestamp: '2024-03-01T09:00:00Z', label: '1h' },
      { id: 'd3', value: 230, timestamp: '2024-03-01T10:00:00Z', label: '2h' },
      { id: 'd4', value: 180, timestamp: '2024-03-01T12:00:00Z', label: '4h' },
      { id: 'd5', value: 110, timestamp: '2024-03-01T16:00:00Z', label: '8h' },
      { id: 'd6', value: 60, timestamp: '2024-03-02T08:00:00Z', label: '24h' }
    ]
  },
  {
    id: 'ds2',
    name: 'Sildenafil Metabolite Analysis',
    description: 'LC-MS/MS analysis of major metabolites',
    createdAt: '2024-04-05T11:20:00Z',
    updatedAt: '2024-05-01T13:45:00Z',
    createdBy: 'Dr. John Davis',
    type: 'lab',
    status: 'active',
    data: [
      { id: 'd7', value: 100, timestamp: '2024-04-05T11:20:00Z', label: 'Parent' },
      { id: 'd8', value: 45, timestamp: '2024-04-05T11:20:00Z', label: 'M1' },
      { id: 'd9', value: 22, timestamp: '2024-04-05T11:20:00Z', label: 'M2' },
      { id: 'd10', value: 15, timestamp: '2024-04-05T11:20:00Z', label: 'M3' },
      { id: 'd11', value: 8, timestamp: '2024-04-05T11:20:00Z', label: 'M4' }
    ]
  }
];

interface DataStore {
  compounds: Compound[];
  labResults: LabResult[];
  dataSets: DataSet[];
  isLoading: boolean;
  error: string | null;
  
  fetchCompounds: () => Promise<void>;
  fetchLabResults: () => Promise<void>;
  fetchDataSets: () => Promise<void>;
  addLabResult: (result: Omit<LabResult, 'id'>) => Promise<void>;
  uploadDataset: (file: File) => Promise<void>;
}

export const useDataStore = create<DataStore>((set, get) => ({
  compounds: [],
  labResults: [],
  dataSets: [],
  isLoading: false,
  error: null,

  fetchCompounds: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      set({ compounds: mockCompounds, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Failed to fetch compounds' });
    }
  },

  fetchLabResults: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ labResults: mockLabResults, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Failed to fetch lab results' });
    }
  },

  fetchDataSets: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));
      set({ dataSets: mockDataSets, isLoading: false });
    } catch {
      set({ isLoading: false, error: 'Failed to fetch data sets' });
    }
  },

  addLabResult: async (result) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newResult: LabResult = {
        id: `r${Date.now()}`,
        ...result
      };
      
      set(state => ({ 
        labResults: [...state.labResults, newResult],
        isLoading: false 
      }));
    } catch {
      set({ isLoading: false, error: 'Failed to add lab result' });
    }
  },

  uploadDataset: async (file) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call delay and processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real application, the file would be sent to the backend
      // For demonstration, we'll just add a mock dataset
      const newDataset: DataSet = {
        id: `ds${Date.now()}`,
        name: file.name.split('.')[0],
        description: `Uploaded dataset from ${file.name}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: get().labResults[0]?.researcher || 'Current User',
        type: 'lab',
        status: 'active',
        data: Array(6).fill(0).map((_, i) => ({
          id: `d${Date.now() + i}`,
          value: Math.floor(Math.random() * 100) + 50,
          timestamp: new Date().toISOString(),
          label: `Sample ${i + 1}`
        }))
      };
      
      set(state => ({ 
        dataSets: [...state.dataSets, newDataset],
        isLoading: false 
      }));
    } catch {
      set({ isLoading: false, error: 'Failed to upload dataset' });
    }
  }
}));