import React from 'react';
import { useAuth } from '@/context/AuthContext';
import DoctorDashboard from '@/components/dashboards/DoctorDashboard';
import LabDashboard from '@/components/dashboards/LabDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'doctor':
        return <DoctorDashboard />;
      case 'lab':
        return <LabDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Unknown role</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground capitalize">
          {user?.role} Dashboard
        </p>
      </div>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;