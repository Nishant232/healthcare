import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Calendar, AlertTriangle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { usePatients } from '@/context/PatientContext';
import Timeline from '@/components/Timeline';

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { patients, getPatientRecords } = usePatients();
  const [consentGiven, setConsentGiven] = useState(true);

  const patient = patients.find(p => p.id === id);
  const records = id ? getPatientRecords(id) : [];

  if (!patient) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/patients')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Patients</span>
        </Button>
        <Card className="medical-card">
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Patient not found</h3>
            <p className="text-muted-foreground">The patient you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/patients')}
        className="flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Patients</span>
      </Button>

      {/* Patient Header */}
      <Card className="medical-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {patient.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {patient.name}
                </h1>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{patient.age} years old, {patient.gender}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>DOB: {formatDate(patient.dateOfBirth)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>{patient.email}</span>
                  </div>
                </div>
                
                {patient.lastVisit && (
                  <p className="text-sm text-muted-foreground mt-3">
                    Last visit: {formatDate(patient.lastVisit)}
                  </p>
                )}
              </div>
            </div>

            {/* Consent Toggle */}
            <div className="flex items-center space-x-3">
              <Label htmlFor="consent-toggle" className="text-sm font-medium">
                Data Access Consent
              </Label>
              <Switch
                id="consent-toggle"
                checked={consentGiven}
                onCheckedChange={setConsentGiven}
              />
            </div>
          </div>

          {/* Alert Badges */}
          <div className="flex flex-wrap gap-3 mt-6">
            {patient.allergies && patient.allergies.length > 0 && (
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <div className="flex space-x-2">
                  {patient.allergies.map((allergy, index) => (
                    <Badge key={index} variant="destructive" className="text-xs">
                      {allergy} Allergy
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {patient.conditions && patient.conditions.length > 0 && (
              <div className="flex space-x-2">
                {patient.conditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Patient Details Tabs */}
      <Tabs defaultValue="timeline" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline" className="flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="details">Patient Details</TabsTrigger>
          <TabsTrigger value="records">Medical Records</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <Timeline records={records} />
        </TabsContent>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Full Name</p>
                    <p className="text-foreground">{patient.name}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Age</p>
                    <p className="text-foreground">{patient.age} years</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Gender</p>
                    <p className="text-foreground capitalize">{patient.gender}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Date of Birth</p>
                    <p className="text-foreground">{formatDate(patient.dateOfBirth)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Phone Number</p>
                    <p className="text-foreground">{patient.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Email Address</p>
                    <p className="text-foreground">{patient.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-muted-foreground mb-2">Allergies</p>
                  {patient.allergies && patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No known allergies</p>
                  )}
                </div>
                
                <div>
                  <p className="font-medium text-muted-foreground mb-2">Current Conditions</p>
                  {patient.conditions && patient.conditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.conditions.map((condition, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">No current conditions</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="records">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Medical Records ({records.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {records.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No medical records available</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {records.map((record) => (
                    <div key={record.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{record.title}</h4>
                        <Badge className={`medical-badge-${record.type}`}>
                          {record.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {formatDate(record.date)} • {record.provider}
                      </p>
                      <div className="text-sm">
                        {typeof record.details === 'object' ? (
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(record.details).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium capitalize">{key}: </span>
                                <span>{value as string}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>{record.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientProfile;