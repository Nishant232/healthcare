import React, { useState } from 'react';
import { Search, Users, Bell, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatients } from '@/context/PatientContext';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { patients, searchPatients, selectPatient } = usePatients();
  const navigate = useNavigate();

  const recentPatients = patients.slice(0, 5);
  const searchResults = searchQuery ? searchPatients(searchQuery).slice(0, 3) : [];

  const handlePatientSelect = (patient: any) => {
    selectPatient(patient);
    navigate(`/patients/${patient.id}`);
  };

  const stats = [
    { label: 'Total Patients', value: '1,234', icon: Users, color: 'text-primary' },
    { label: 'Pending Reviews', value: '23', icon: Clock, color: 'text-warning' },
    { label: 'Active Cases', value: '89', icon: TrendingUp, color: 'text-success' },
  ];

  const notifications = [
    { id: 1, message: 'New lab results available for Sarah Johnson', time: '2 min ago', type: 'lab' },
    { id: 2, message: 'Appointment reminder: Michael Chen at 2:00 PM', time: '15 min ago', type: 'appointment' },
    { id: 3, message: 'Consent request from City Lab for Emily Rodriguez', time: '1 hour ago', type: 'consent' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="medical-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Search */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Patient Search</span>
            </CardTitle>
            <CardDescription>
              Search patients by name, phone, or email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                    onClick={() => handlePatientSelect(patient)}
                  >
                    <div>
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years • {patient.gender}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            )}

            <Button 
              className="w-full" 
              onClick={() => navigate('/patients')}
            >
              View All Patients
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Recent Notifications</span>
            </CardTitle>
            <CardDescription>
              Latest updates and alerts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <div 
                  className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'lab' ? 'bg-medical-labs' :
                    notification.type === 'appointment' ? 'bg-primary' :
                    'bg-warning'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Recent Patients</span>
          </CardTitle>
          <CardDescription>
            Recently accessed patient records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => handlePatientSelect(patient)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years • Last visit: {patient.lastVisit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {patient.conditions && patient.conditions.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {patient.conditions.length} condition{patient.conditions.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm">View Profile</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;