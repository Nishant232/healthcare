import React, { useState } from 'react';
import { Shield, Plus, Download, Eye, AlertCircle, Clock, CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface ConsentRequest {
  id: string;
  patientName: string;
  patientId: string;
  status: 'pending' | 'approved' | 'revoked';
  requestedOn: string;
  expiryDate?: string;
  accessType: string;
}

const Consent: React.FC = () => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [accessType, setAccessType] = useState('');
  const [notes, setNotes] = useState('');

  // Mock data
  const [pendingRequests] = useState<ConsentRequest[]>([
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      status: 'pending',
      requestedOn: '2024-01-15',
      accessType: 'Full Medical Records'
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      patientId: 'P002',
      status: 'pending',
      requestedOn: '2024-01-14',
      accessType: 'Lab Results Only'
    },
  ]);

  const [approvedConsents] = useState<ConsentRequest[]>([
    {
      id: '3',
      patientName: 'Emily Rodriguez',
      patientId: 'P003',
      status: 'approved',
      requestedOn: '2024-01-10',
      expiryDate: '2024-07-10',
      accessType: 'Full Medical Records'
    },
    {
      id: '4',
      patientName: 'John Smith',
      patientId: 'P004',
      status: 'approved',
      requestedOn: '2024-01-08',
      expiryDate: '2024-06-08',
      accessType: 'Prescription History'
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'revoked':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20"><X className="h-3 w-3 mr-1" />Revoked</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleRequestConsent = () => {
    if (!selectedPatient || !accessType) {
      toast({
        title: "Error",
        description: "Please select a patient and access type.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Consent Request Sent",
      description: `Consent request has been sent to ${selectedPatient}.`,
    });

    setIsRequestModalOpen(false);
    setSelectedPatient('');
    setAccessType('');
    setNotes('');
  };

  const handleRevokeConsent = (patientName: string) => {
    toast({
      title: "Consent Revoked",
      description: `Access to ${patientName}'s medical data has been revoked.`,
      variant: "destructive",
    });
  };

  const handleDownloadPDF = (patientName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading consent form for ${patientName}.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Consent Management</h1>
          <p className="text-muted-foreground">Request and manage patient data access permissions</p>
        </div>
        <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Request Consent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request Patient Consent</DialogTitle>
              <DialogDescription>
                Request permission to access patient medical data for treatment purposes.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah Johnson">Sarah Johnson (P001)</SelectItem>
                    <SelectItem value="Michael Chen">Michael Chen (P002)</SelectItem>
                    <SelectItem value="Emily Rodriguez">Emily Rodriguez (P003)</SelectItem>
                    <SelectItem value="John Smith">John Smith (P004)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accessType">Access Type</Label>
                <Select value={accessType} onValueChange={setAccessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select access type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Medical Records">Full Medical Records</SelectItem>
                    <SelectItem value="Lab Results Only">Lab Results Only</SelectItem>
                    <SelectItem value="Prescription History">Prescription History</SelectItem>
                    <SelectItem value="Vitals and Diagnostics">Vitals and Diagnostics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional information about this consent request..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsRequestModalOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleRequestConsent}>
                Send Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pending Consent Requests */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-warning" />
            <span>Pending Consent Requests</span>
          </CardTitle>
          <CardDescription>
            Consent requests awaiting patient approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Access Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No pending consent requests
                    </TableCell>
                  </TableRow>
                ) : (
                  pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.patientName}</TableCell>
                      <TableCell>{request.patientId}</TableCell>
                      <TableCell>{request.accessType}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{request.requestedOn}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Approved Consents */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-success" />
            <span>Approved Consents</span>
          </CardTitle>
          <CardDescription>
            Active patient consent permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Access Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expires On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedConsents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No approved consents
                    </TableCell>
                  </TableRow>
                ) : (
                  approvedConsents.map((consent) => (
                    <TableRow key={consent.id}>
                      <TableCell className="font-medium">{consent.patientName}</TableCell>
                      <TableCell>{consent.patientId}</TableCell>
                      <TableCell>{consent.accessType}</TableCell>
                      <TableCell>{getStatusBadge(consent.status)}</TableCell>
                      <TableCell>{consent.expiryDate || 'No expiry'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDownloadPDF(consent.patientName)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRevokeConsent(consent.patientName)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Consent;