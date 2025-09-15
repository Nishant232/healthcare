import React, { useState } from 'react';
import { Search, Filter, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatients } from '@/context/PatientContext';
import { useNavigate } from 'react-router-dom';

const Patients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { patients, searchPatients, selectPatient } = usePatients();
  const navigate = useNavigate();

  const displayedPatients = searchQuery ? searchPatients(searchQuery) : patients;

  const handlePatientClick = (patient: any) => {
    selectPatient(patient);
    navigate(`/patients/${patient.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patients</h1>
          <p className="text-muted-foreground">
            Search and manage patient records ({patients.length} total)
          </p>
        </div>
        <Button>Add New Patient</Button>
      </div>

      {/* Search and Filters */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Patient Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
          
          {searchQuery && (
            <div className="mt-4 text-sm text-muted-foreground">
              {displayedPatients.length} result{displayedPatients.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </div>
          )}
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="space-y-4">
        {displayedPatients.length === 0 ? (
          <Card className="medical-card">
            <CardContent className="p-12 text-center">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {searchQuery ? 'No patients found' : 'No patients available'}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? 'Try adjusting your search criteria' 
                  : 'Add your first patient to get started'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          displayedPatients.map((patient) => (
            <Card 
              key={patient.id} 
              className="medical-card cursor-pointer hover:shadow-medium transition-shadow"
              onClick={() => handlePatientClick(patient)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-primary">
                        {patient.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {patient.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{patient.age} years old</span>
                        <span className="capitalize">{patient.gender}</span>
                        <span>{patient.phone}</span>
                      </div>
                      {patient.lastVisit && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Last visit: {formatDate(patient.lastVisit)}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {patient.conditions && patient.conditions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {patient.conditions.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {patient.allergies && patient.allergies.length > 0 && (
                      <Badge variant="outline" className="text-xs text-destructive border-destructive">
                        {patient.allergies.length} Allerg{patient.allergies.length === 1 ? 'y' : 'ies'}
                      </Badge>
                    )}
                    
                    <Button variant="ghost" size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Patients;