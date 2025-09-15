import React, { useState } from 'react';
import { FileText, Search, Filter, Eye, Download, Edit, Calendar, User, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Report {
  id: string;
  fileName: string;
  patientName: string;
  patientId: string;
  reportType: string;
  uploadDate: string;
  status: 'pending' | 'completed' | 'shared' | 'reviewed';
  doctor?: string;
  notes?: string;
}

const Reports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editNotesOpen, setEditNotesOpen] = useState(false);
  const [reportNotes, setReportNotes] = useState('');

  // Mock reports data
  const [reports] = useState<Report[]>([
    {
      id: '1',
      fileName: 'blood_panel_sarah_johnson.pdf',
      patientName: 'Sarah Johnson',
      patientId: 'P001',
      reportType: 'Blood Panel',
      uploadDate: '2024-01-15',
      status: 'completed',
      doctor: 'Dr. Smith',
      notes: 'All values within normal range. Patient shows good overall health.'
    },
    {
      id: '2',
      fileName: 'thyroid_function_michael_chen.csv',
      patientName: 'Michael Chen',
      patientId: 'P002',
      reportType: 'Thyroid Function',
      uploadDate: '2024-01-14',
      status: 'shared',
      doctor: 'Dr. Johnson',
      notes: 'TSH levels slightly elevated. Recommend follow-up in 3 months.'
    },
    {
      id: '3',
      fileName: 'lipid_profile_emily_rodriguez.pdf',
      patientName: 'Emily Rodriguez',
      patientId: 'P003',
      reportType: 'Lipid Profile',
      uploadDate: '2024-01-13',
      status: 'pending',
      notes: 'Awaiting doctor review.'
    },
    {
      id: '4',
      fileName: 'glucose_test_john_smith.pdf',
      patientName: 'John Smith',
      patientId: 'P004',
      reportType: 'Glucose Test',
      uploadDate: '2024-01-12',
      status: 'reviewed',
      doctor: 'Dr. Williams',
      notes: 'Glucose levels indicate pre-diabetes. Lifestyle modifications recommended.'
    },
    {
      id: '5',
      fileName: 'liver_function_jane_doe.pdf',
      patientName: 'Jane Doe',
      patientId: 'P005',
      reportType: 'Liver Function',
      uploadDate: '2024-01-11',
      status: 'completed',
      doctor: 'Dr. Brown',
      notes: 'All liver enzymes normal. No concerns detected.'
    },
  ]);

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.fileName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || report.reportType === filterType;
    const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle2 className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'shared':
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20"><FileText className="h-3 w-3 mr-1" />Shared with Doctor</Badge>;
      case 'reviewed':
        return <Badge variant="secondary" className="bg-info/10 text-info border-info/20"><Eye className="h-3 w-3 mr-1" />Reviewed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handlePreview = (report: Report) => {
    setSelectedReport(report);
    setPreviewOpen(true);
  };

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}...`,
    });
  };

  const handleUpdateStatus = (reportId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Report status updated to ${newStatus}.`,
    });
  };

  const handleEditNotes = (report: Report) => {
    setSelectedReport(report);
    setReportNotes(report.notes || '');
    setEditNotesOpen(true);
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes Updated",
      description: "Report notes have been successfully updated.",
    });
    setEditNotesOpen(false);
    setReportNotes('');
    setSelectedReport(null);
  };

  const getReportTypeOptions = () => {
    const types = [...new Set(reports.map(report => report.reportType))];
    return types.map(type => ({ value: type, label: type }));
  };

  const getStatsData = () => {
    const total = reports.length;
    const pending = reports.filter(r => r.status === 'pending').length;
    const completed = reports.filter(r => r.status === 'completed').length;
    const shared = reports.filter(r => r.status === 'shared').length;
    
    return { total, pending, completed, shared };
  };

  const stats = getStatsData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports Management</h1>
        <p className="text-muted-foreground">Manage and view all uploaded patient reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-success">{stats.completed}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card className="medical-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shared</p>
                <p className="text-2xl font-bold text-primary">{stats.shared}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters & Search</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Reports</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by patient, ID, or filename..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {getReportTypeOptions().map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="shared">Shared</SelectItem>
                  <SelectItem value="reviewed">Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setFilterStatus('all');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Reports List</span>
          </CardTitle>
          <CardDescription>
            All patient reports with current status and actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewed By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No reports found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.patientName}</p>
                          <p className="text-sm text-muted-foreground">{report.patientId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.reportType}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                            {report.fileName}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{report.uploadDate}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{report.doctor || '-'}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePreview(report)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownload(report.fileName)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditNotes(report)}
                          >
                            <Edit className="h-4 w-4" />
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

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Preview</DialogTitle>
            <DialogDescription>
              {selectedReport?.fileName} - {selectedReport?.patientName}
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <Label className="text-sm font-medium">Patient</Label>
                  <p className="text-sm">{selectedReport.patientName} ({selectedReport.patientId})</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Report Type</Label>
                  <p className="text-sm">{selectedReport.reportType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Upload Date</Label>
                  <p className="text-sm">{selectedReport.uploadDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedReport.status)}</div>
                </div>
              </div>
              
              {selectedReport.notes && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Notes</Label>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm">{selectedReport.notes}</p>
                  </div>
                </div>
              )}

              <div className="bg-border/20 rounded-lg p-8 text-center">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  PDF/Image preview would be displayed here
                </p>
              </div>

              <div className="flex justify-between">
                <Select onValueChange={(value) => handleUpdateStatus(selectedReport.id, value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Update status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="shared">Shared with Doctor</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => handleDownload(selectedReport.fileName)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Notes Modal */}
      <Dialog open={editNotesOpen} onOpenChange={setEditNotesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Report Notes</DialogTitle>
            <DialogDescription>
              Add or update notes for {selectedReport?.patientName}'s {selectedReport?.reportType} report
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about this report..."
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setEditNotesOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotes}>
              Save Notes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;