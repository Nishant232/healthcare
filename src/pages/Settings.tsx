import React, { useState } from 'react';
import { User, Lock, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Profile form state
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    licenseId: user?.licenseId || '',
    labId: user?.labId || '',
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    labResults: true,
    appointments: true,
    systemUpdates: false,
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30',
    autoLogout: true,
  });

  const handleProfileSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSave = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your preferences.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Privacy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and professional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {user?.role === 'doctor' && (
                <div className="space-y-2">
                  <Label htmlFor="licenseId">Medical License ID</Label>
                  <Input
                    id="licenseId"
                    value={profile.licenseId}
                    onChange={(e) => setProfile(prev => ({ ...prev, licenseId: e.target.value }))}
                    placeholder="Enter your medical license ID"
                  />
                </div>
              )}

              {user?.role === 'lab' && (
                <div className="space-y-2">
                  <Label htmlFor="labId">Laboratory ID</Label>
                  <Input
                    id="labId"
                    value={profile.labId}
                    onChange={(e) => setProfile(prev => ({ ...prev, labId: e.target.value }))}
                    placeholder="Enter your laboratory ID"
                  />
                </div>
              )}

              <div className="pt-4">
                <Button onClick={handleProfileSave} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={security.twoFactorAuth}
                  onCheckedChange={(checked) => 
                    setSecurity(prev => ({ ...prev, twoFactorAuth: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">Auto Logout</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after period of inactivity
                  </p>
                </div>
                <Switch
                  checked={security.autoLogout}
                  onCheckedChange={(checked) => 
                    setSecurity(prev => ({ ...prev, autoLogout: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                  placeholder="30"
                />
              </div>

              <div className="space-y-4 pt-4">
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
                <Button onClick={handleNotificationSave} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Security Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via text message
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, smsNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Lab Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new lab results are available
                    </p>
                  </div>
                  <Switch
                    checked={notifications.labResults}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, labResults: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Appointments</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive appointment reminders and updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.appointments}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, appointments: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">System Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Get notified about system maintenance and updates
                    </p>
                  </div>
                  <Switch
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, systemUpdates: checked }))
                    }
                  />
                </div>
              </div>

              <div className="pt-4">
                <Button onClick={handleNotificationSave} disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Preferences'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your data privacy and sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Data Sharing</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your medical data is only shared with authorized healthcare providers 
                    and laboratories with your explicit consent.
                  </p>
                  <Button variant="outline" size="sm">
                    Manage Consents
                  </Button>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Data Export</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    You can request a copy of all your medical data at any time.
                  </p>
                  <Button variant="outline" size="sm">
                    Request Data Export
                  </Button>
                </div>

                <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                  <h4 className="text-sm font-medium mb-2 text-destructive">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;