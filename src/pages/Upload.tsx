import React, { useState, useCallback } from 'react';
import { Upload as UploadIcon, FileText, X, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

interface UploadedFile {
  id: string;
  fileName: string;
  patientId: string;
  patientName: string;
  testType: string;
  uploadDate: string;
  status: 'uploaded' | 'verified' | 'pending' | 'failed';
  size: string;
}

const Upload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [patientId, setPatientId] = useState('');
  const [testType, setTestType] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);

  // Mock upload history data
  const [uploadHistory] = useState<UploadedFile[]>([
    {
      id: '1',
      fileName: 'blood_panel_results.pdf',
      patientId: 'P001',
      patientName: 'Sarah Johnson',
      testType: 'Blood Panel',
      uploadDate: '2024-01-15',
      status: 'verified',
      size: '2.4 MB'
    },
    {
      id: '2',
      fileName: 'thyroid_function_test.csv',
      patientId: 'P002',
      patientName: 'Michael Chen',
      testType: 'Thyroid Function',
      uploadDate: '2024-01-14',
      status: 'pending',
      size: '1.8 MB'
    },
    {
      id: '3',
      fileName: 'lipid_profile.pdf',
      patientId: 'P003',
      patientName: 'Emily Rodriguez',
      testType: 'Lipid Profile',
      uploadDate: '2024-01-13',
      status: 'uploaded',
      size: '3.1 MB'
    },
    {
      id: '4',
      fileName: 'glucose_test_failed.pdf',
      patientId: 'P004',
      patientName: 'John Smith',
      testType: 'Glucose Test',
      uploadDate: '2024-01-12',
      status: 'failed',
      size: '1.2 MB'
    },
  ]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0 || !patientId || !testType) {
      toast({
        title: "Error",
        description: "Please select files, patient ID, and test type.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Upload Successful",
            description: `${selectedFiles.length} file(s) uploaded successfully.`,
          });
          setSelectedFiles([]);
          setPatientId('');
          setTestType('');
          setNotes('');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20"><UploadIcon className="h-3 w-3 mr-1" />Uploaded</Badge>;
      case 'verified':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20"><CheckCircle className="h-3 w-3 mr-1" />Verified</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20"><AlertCircle className="h-3 w-3 mr-1" />Pending Review</Badge>;
      case 'failed':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20"><X className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDelete = (fileId: string) => {
    setFileToDelete(fileId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    toast({
      title: "File Deleted",
      description: "The file has been successfully deleted.",
      variant: "destructive",
    });
    setDeleteConfirmOpen(false);
    setFileToDelete(null);
  };

  const handleReupload = (fileName: string) => {
    toast({
      title: "Re-upload Started",
      description: `Re-uploading ${fileName}...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Data</h1>
        <p className="text-muted-foreground">Upload patient reports and test results</p>
      </div>

      {/* Upload Section */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UploadIcon className="h-5 w-5" />
            <span>Upload Files</span>
          </CardTitle>
          <CardDescription>
            Upload PDF, images, CSV, or JSON files up to 10MB each
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Drag and Drop Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 hover:bg-muted/30'
            }`}
          >
            <input {...getInputProps()} />
            <UploadIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            {isDragActive ? (
              <p className="text-lg font-medium text-primary">Drop the files here...</p>
            ) : (
              <>
                <p className="text-lg font-medium text-foreground mb-2">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF, PNG, JPG, CSV, JSON files up to 10MB
                </p>
              </>
            )}
          </div>

          {/* Selected Files */}
          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files</Label>
              <div className="space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium text-foreground">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metadata Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Select value={patientId} onValueChange={setPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P001">P001 - Sarah Johnson</SelectItem>
                  <SelectItem value="P002">P002 - Michael Chen</SelectItem>
                  <SelectItem value="P003">P003 - Emily Rodriguez</SelectItem>
                  <SelectItem value="P004">P004 - John Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="testType">Test Type</Label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blood Panel">Blood Panel</SelectItem>
                  <SelectItem value="Thyroid Function">Thyroid Function</SelectItem>
                  <SelectItem value="Lipid Profile">Lipid Profile</SelectItem>
                  <SelectItem value="Glucose Test">Glucose Test</SelectItem>
                  <SelectItem value="Liver Function">Liver Function</SelectItem>
                  <SelectItem value="Kidney Function">Kidney Function</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading files...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* Upload Button */}
          <Button 
            onClick={handleUpload} 
            disabled={isUploading || selectedFiles.length === 0}
            className="w-full"
          >
            {isUploading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Files
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Upload History</span>
          </CardTitle>
          <CardDescription>
            Recently uploaded files and their processing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadHistory.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.fileName}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{file.patientName}</p>
                        <p className="text-sm text-muted-foreground">{file.patientId}</p>
                      </div>
                    </TableCell>
                    <TableCell>{file.testType}</TableCell>
                    <TableCell>{file.uploadDate}</TableCell>
                    <TableCell>{file.size}</TableCell>
                    <TableCell>{getStatusBadge(file.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleReupload(file.fileName)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete File</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this file? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Upload;