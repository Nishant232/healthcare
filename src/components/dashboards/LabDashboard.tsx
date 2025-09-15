import React from 'react';
import { Upload, FileText, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const LabDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Reports Uploaded', value: '2,456', icon: FileText, color: 'text-primary' },
    { label: 'Pending Processing', value: '12', icon: Clock, color: 'text-warning' },
    { label: 'Processed Today', value: '87', icon: CheckCircle, color: 'text-success' },
  ];

  const recentUploads = [
    { id: 1, fileName: 'blood_panel_batch_001.csv', patient: 'Sarah Johnson', status: 'processed', time: '2 hours ago' },
    { id: 2, fileName: 'lipid_profile_batch_002.json', patient: 'Michael Chen', status: 'processing', time: '4 hours ago' },
    { id: 3, fileName: 'thyroid_function_batch_003.csv', patient: 'Emily Rodriguez', status: 'processed', time: '6 hours ago' },
    { id: 4, fileName: 'complete_metabolic_panel.json', patient: 'John Smith', status: 'failed', time: '8 hours ago' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-success text-success-foreground';
      case 'processing': return 'bg-warning text-warning-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

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
        {/* Quick Upload */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Lab Data</span>
            </CardTitle>
            <CardDescription>
              Upload new lab reports and test results
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Supports CSV, JSON files up to 10MB
              </p>
              <Button onClick={() => navigate('/upload')}>
                Select Files
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Supported formats:</span>
              <div className="flex space-x-2">
                <Badge variant="outline">CSV</Badge>
                <Badge variant="outline">JSON</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Processing Status */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Processing Overview</span>
            </CardTitle>
            <CardDescription>
              Real-time status of your data processing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Success Rate</span>
                <span className="text-lg font-semibold text-success">94.2%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '94.2%' }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-success">2,315</p>
                <p className="text-xs text-muted-foreground">Successful</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">141</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Uploads */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Recent Uploads</span>
          </CardTitle>
          <CardDescription>
            Latest uploaded lab reports and their processing status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentUploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-medical-labs-bg rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-medical-labs" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{upload.fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      Patient: {upload.patient} • {upload.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(upload.status)} variant="secondary">
                    {upload.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button variant="outline" className="w-full">
              View All Uploads
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabDashboard;