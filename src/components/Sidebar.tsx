import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Upload, 
  Shield, 
  Settings, 
  LogOut,
  Activity,
  FileText,
  UserCheck
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavigationItems = () => {
    const baseItems = [
      { to: '/dashboard', icon: Home, label: 'Dashboard' },
      { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    switch (user?.role) {
      case 'doctor':
        return [
          { to: '/dashboard', icon: Home, label: 'Dashboard' },
          { to: '/patients', icon: Users, label: 'Patients' },
          { to: '/consents', icon: Shield, label: 'Consents' },
          { to: '/settings', icon: Settings, label: 'Settings' },
        ];
      case 'lab':
        return [
          { to: '/dashboard', icon: Home, label: 'Dashboard' },
          { to: '/upload', icon: Upload, label: 'Upload Data' },
          { to: '/reports', icon: FileText, label: 'Reports' },
          { to: '/settings', icon: Settings, label: 'Settings' },
        ];
      case 'admin':
        return [
          { to: '/dashboard', icon: Home, label: 'Dashboard' },
          { to: '/users', icon: UserCheck, label: 'Manage Users' },
          { to: '/analytics', icon: Activity, label: 'Analytics' },
          { to: '/settings', icon: Settings, label: 'Settings' },
        ];
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="w-sidebar bg-card border-r border-border flex flex-col h-full">
      {/* Logo and branding */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">HealthSync</h1>
            <p className="text-xs text-muted-foreground">Data Integration Platform</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {user?.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.role}
              {user?.licenseId && ` • ${user.licenseId}`}
              {user?.labId && ` • ${user.labId}`}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <div className="sidebar-nav">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Logout button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;