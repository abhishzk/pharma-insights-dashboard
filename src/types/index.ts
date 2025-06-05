export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'researcher';
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Compound {
  id: string;
  name: string;
  formula: string;
  molecularWeight: number;
  logP: number;
  description: string;
  structure: string;
}

export interface DataPoint {
  id: string;
  value: number;
  timestamp: string;
  label: string;
}

export interface LabResult {
  id: string;
  compoundId: string;
  compoundName: string;
  date: string;
  researcher: string;
  assayType: string;
  result: number;
  unit: string;
  status: 'approved' | 'pending' | 'rejected';
  notes?: string;
}

export interface DataSet {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  type: 'lab' | 'clinical' | 'computational';
  status: 'active' | 'archived';
  data: DataPoint[];
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}