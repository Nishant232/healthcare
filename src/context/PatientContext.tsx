import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  dateOfBirth: string;
  lastVisit?: string;
  allergies?: string[];
  conditions?: string[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: 'vitals' | 'medication' | 'lab' | 'visit';
  date: string;
  title: string;
  details: any;
  provider: string;
}

interface PatientContextType {
  patients: Patient[];
  selectedPatient: Patient | null;
  medicalRecords: MedicalRecord[];
  searchPatients: (query: string) => Patient[];
  selectPatient: (patient: Patient) => void;
  getPatientRecords: (patientId: string) => MedicalRecord[];
  addMedicalRecord: (record: Omit<MedicalRecord, 'id'>) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const usePatients = () => {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
};

interface PatientProviderProps {
  children: ReactNode;
}

// Mock data for demonstration
const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'female',
    phone: '+1-555-0123',
    email: 'sarah.johnson@email.com',
    dateOfBirth: '1990-03-15',
    lastVisit: '2024-01-15',
    allergies: ['Peanuts', 'Shellfish'],
    conditions: ['Hypertension'],
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 45,
    gender: 'male',
    phone: '+1-555-0124',
    email: 'michael.chen@email.com',
    dateOfBirth: '1979-07-22',
    lastVisit: '2024-01-10',
    allergies: ['Latex'],
    conditions: ['Diabetes Type 2'],
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    age: 28,
    gender: 'female',
    phone: '+1-555-0125',
    email: 'emily.rodriguez@email.com',
    dateOfBirth: '1996-11-08',
    lastVisit: '2024-01-12',
    allergies: [],
    conditions: [],
  },
];

const mockMedicalRecords: MedicalRecord[] = [
  {
    id: '1',
    patientId: '1',
    type: 'vitals',
    date: '2024-01-15',
    title: 'Routine Vitals Check',
    details: { bp: '140/90', hr: '75', temp: '98.6°F', weight: '145 lbs' },
    provider: 'Dr. Smith',
  },
  {
    id: '2',
    patientId: '1',
    type: 'lab',
    date: '2024-01-10',
    title: 'Blood Panel Results',
    details: { cholesterol: '200 mg/dL', glucose: '110 mg/dL', hba1c: '5.8%' },
    provider: 'City Lab',
  },
  {
    id: '3',
    patientId: '2',
    type: 'medication',
    date: '2024-01-08',
    title: 'Metformin Prescription',
    details: { medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    provider: 'Dr. Johnson',
  },
];

export const PatientProvider: React.FC<PatientProviderProps> = ({ children }) => {
  const [patients] = useState<Patient[]>(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(mockMedicalRecords);

  const searchPatients = (query: string): Patient[] => {
    if (!query.trim()) return patients;
    
    const lowercaseQuery = query.toLowerCase();
    return patients.filter(patient =>
      patient.name.toLowerCase().includes(lowercaseQuery) ||
      patient.phone.includes(query) ||
      patient.email.toLowerCase().includes(lowercaseQuery)
    );
  };

  const selectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const getPatientRecords = (patientId: string): MedicalRecord[] => {
    return medicalRecords
      .filter(record => record.patientId === patientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const addMedicalRecord = (record: Omit<MedicalRecord, 'id'>) => {
    const newRecord: MedicalRecord = {
      ...record,
      id: Date.now().toString(),
    };
    setMedicalRecords(prev => [...prev, newRecord]);
  };

  const value: PatientContextType = {
    patients,
    selectedPatient,
    medicalRecords,
    searchPatients,
    selectPatient,
    getPatientRecords,
    addMedicalRecord,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};