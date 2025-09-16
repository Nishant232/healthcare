import React from 'react';
import { 
  Users, 
  FileText, 
  Shield, 
  Activity,
  TrendingUp,
  Calendar,
  Clock,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Analytics: React.FC = () => {
  // Mock data for metrics
  const systemMetrics = {
    totalPatients: 1247,
    totalDoctors: 86,
    totalLabs: 23,
    totalReports: 3456,
    activeConsents: 892,
    pendingConsents: 45,
    revokedConsents: 123
  };

  // Mock data for user growth chart
  const userGrowthData = [
    { month: 'Jan', patients: 850, doctors: 65, labs: 18 },
    { month: 'Feb', patients: 920, doctors: 68, labs: 19 },
    { month: 'Mar', patients: 1050, doctors: 72, labs: 20 },
    { month: 'Apr', patients: 1180, doctors: 78, labs: 21 },
    { month: 'May', patients: 1247, doctors: 86, labs: 23 }
  ];

  // Mock data for reports uploaded
  const reportsData = [
    { week: 'Week 1', reports: 45 },
    { week: 'Week 2', reports: 67 },
    { week: 'Week 3', reports: 82 },
    { week: 'Week 4', reports: 91 },
    { week: 'Week 5', reports: 78 }
  ];

  // Mock data for consent trends
  const consentData = [
    { name: 'Approved', value: 892, color: 'hsl(var(--success))' },
    { name: 'Pending', value: 45, color: 'hsl(var(--warning))' },
    { name: 'Revoked', value: 123, color: 'hsl(var(--destructive))' }
  ];

  // Mock data for recent activity
  const recentActivity = [
    {
      id: '1',
      user: 'Dr. Sarah Johnson',
      role: 'Doctor',
      action: 'Uploaded patient report',
      timestamp: '2 minutes ago',
      type: 'upload'
    },
    {
      id: '2',
      user: 'John Smith',
      role: 'Patient',
      action: 'Granted consent to MedLab Central',
      timestamp: '5 minutes ago',
      type: 'consent'
    },
    {
      id: '3',
      user: 'MedLab Central',
      role: 'Lab',
      action: 'Processed blood work results',
      timestamp: '12 minutes ago',
      type: 'report'
    },
    {
      id: '4',
      user: 'Dr. Michael Chen',
      role: 'Doctor',
      action: 'Requested patient consent',
      timestamp: '18 minutes ago',
      type: 'request'
    },
    {
      id: '5',
      user: 'Sarah Wilson',
      role: 'Patient',
      action: 'Updated profile information',
      timestamp: '25 minutes ago',
      type: 'profile'
    }
  ];

  // Mock data for top performers
  const topDoctors = [
    { name: 'Dr. Sarah Johnson', reports: 145, patients: 89 },
    { name: 'Dr. Michael Chen', reports: 132, patients: 76 },
    { name: 'Dr. Emily Davis', reports: 118, patients: 65 },
    { name: 'Dr. James Wilson', reports: 96, patients: 58 },
    { name: 'Dr. Lisa Anderson', reports: 87, patients: 52 }
  ];

  const topLabs = [
    { name: 'MedLab Central', reports: 234, processing_time: '2.5h' },
    { name: 'City Diagnostics', reports: 189, processing_time: '3.1h' },
    { name: 'Health Analytics Lab', reports: 156, processing_time: '2.8h' },
    { name: 'Precision Testing', reports: 134, processing_time: '3.5h' },
    { name: 'Metro Lab Services', reports: 98, processing_time: '4.2h' }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'upload': return 'bg-medical-vitals text-white';
      case 'consent': return 'bg-success text-white';
      case 'report': return 'bg-medical-labs text-white';
      case 'request': return 'bg-warning text-white';
      case 'profile': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'Doctor': return 'default';
      case 'Lab': return 'secondary';
      case 'Patient': return 'outline';
      default: return 'outline';
    }
  };

  const chartConfig = {
    patients: {
      label: 'Patients',
      color: 'hsl(var(--medical-vitals))'
    },
    doctors: {
      label: 'Doctors',
      color: 'hsl(var(--primary))'
    },
    labs: {
      label: 'Labs',
      color: 'hsl(var(--medical-labs))'
    },
    reports: {
      label: 'Reports',
      color: 'hsl(var(--success))'
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights into system performance and usage</p>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-2xl font-bold text-medical-vitals">
                  {systemMetrics.totalPatients.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-medical-vitals-bg rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-medical-vitals" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm text-success">+12%</span>
              <span className="text-sm text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Doctors</p>
                <p className="text-2xl font-bold text-primary">{systemMetrics.totalDoctors}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm text-success">+8%</span>
              <span className="text-sm text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Labs</p>
                <p className="text-2xl font-bold text-medical-labs">{systemMetrics.totalLabs}</p>
              </div>
              <div className="w-12 h-12 bg-medical-labs-bg rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-medical-labs" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm text-success">+4%</span>
              <span className="text-sm text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reports</p>
                <p className="text-2xl font-bold text-success">
                  {systemMetrics.totalReports.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm text-success">+18%</span>
              <span className="text-sm text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Consents</p>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.activeConsents}</p>
              </div>
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm text-success">+6%</span>
              <span className="text-sm text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trends</CardTitle>
            <CardDescription>Monthly growth across user types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="patients" stroke="var(--color-patients)" strokeWidth={2} />
                  <Line type="monotone" dataKey="doctors" stroke="var(--color-doctors)" strokeWidth={2} />
                  <Line type="monotone" dataKey="labs" stroke="var(--color-labs)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Reports Upload Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Report Uploads</CardTitle>
            <CardDescription>Reports uploaded per week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="reports" fill="var(--color-reports)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Consent Trends and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Consent Trends Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Consent Status Distribution</CardTitle>
            <CardDescription>Breakdown of consent statuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={consentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {consentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {consentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent System Activity
            </CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.user}</span>
                      <Badge variant={getRoleBadgeVariant(activity.role)} className="text-xs">
                        {activity.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Doctors */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Doctors</CardTitle>
            <CardDescription>Based on report uploads and patient interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead className="text-right">Reports</TableHead>
                  <TableHead className="text-right">Patients</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDoctors.map((doctor, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell className="text-right">{doctor.reports}</TableCell>
                    <TableCell className="text-right">{doctor.patients}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Labs */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Labs</CardTitle>
            <CardDescription>Based on report volume and processing time</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Laboratory</TableHead>
                  <TableHead className="text-right">Reports</TableHead>
                  <TableHead className="text-right">Avg Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topLabs.map((lab, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{lab.name}</TableCell>
                    <TableCell className="text-right">{lab.reports}</TableCell>
                    <TableCell className="text-right">{lab.processing_time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;