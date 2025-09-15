import React from 'react';
import { Users, Activity, Shield, TrendingUp, UserCheck, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const systemStats = [
    { label: 'Total Users', value: '1,457', icon: Users, color: 'text-primary' },
    { label: 'Active Sessions', value: '234', icon: Activity, color: 'text-success' },
    { label: 'Data Records', value: '89.2K', icon: Database, color: 'text-medical-labs' },
  ];

  const userBreakdown = [
    { role: 'Doctors', count: 892, percentage: 61, color: 'bg-primary' },
    { role: 'Labs', count: 456, percentage: 31, color: 'bg-medical-labs' },
    { role: 'Admins', count: 109, percentage: 8, color: 'bg-warning' },
  ];

  const recentActivity = [
    { id: 1, action: 'New doctor registration', user: 'Dr. Jennifer Walsh', time: '5 min ago', type: 'user' },
    { id: 2, action: 'Lab data uploaded', user: 'Central Lab', time: '12 min ago', type: 'data' },
    { id: 3, action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { id: 4, action: 'Consent policy updated', user: 'Admin Sarah', time: '2 hours ago', type: 'policy' },
  ];

  const pendingActions = [
    { id: 1, action: 'Review doctor license verification', priority: 'high', count: 3 },
    { id: 2, action: 'Approve lab integration requests', priority: 'medium', count: 7 },
    { id: 3, action: 'System security audit review', priority: 'high', count: 1 },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {systemStats.map((stat, index) => (
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
        {/* User Management */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
            <CardDescription>
              Manage doctors, labs, and system administrators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {userBreakdown.map((userType, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{userType.role}</span>
                    <span className="text-sm text-muted-foreground">{userType.count}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`${userType.color} h-2 rounded-full`} 
                      style={{ width: `${userType.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 space-y-2">
              <Button 
                className="w-full" 
                onClick={() => navigate('/users')}
              >
                Manage All Users
              </Button>
              <Button variant="outline" className="w-full">
                Add New User
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Pending Actions</span>
            </CardTitle>
            <CardDescription>
              Items requiring administrative attention
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingActions.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getPriorityColor(item.priority)} variant="secondary">
                      {item.priority}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {item.count} item{item.count > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Review
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Pending
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Activity */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Recent System Activity</span>
          </CardTitle>
          <CardDescription>
            Latest activities across the healthcare platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                <div 
                  className={`w-2 h-2 rounded-full ${
                    activity.type === 'user' ? 'bg-primary' :
                    activity.type === 'data' ? 'bg-medical-labs' :
                    activity.type === 'system' ? 'bg-success' :
                    'bg-warning'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4">
            <Button variant="outline" className="w-full">
              View Full Activity Log
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;