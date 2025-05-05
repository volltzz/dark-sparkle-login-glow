import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const Settings: React.FC = () => {
  const { toast } = useToast();
  
  // Account settings
  const [accountForm, setAccountForm] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    password: '',
    confirmPassword: ''
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false
  });
  
  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'dark',
    sidebarCollapsed: false,
    animationsEnabled: true,
    compactMode: false,
    highContrastMode: false
  });
  
  // Handle account form input changes
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle account form submit
  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password match if user is changing password
    if (accountForm.password) {
      if (accountForm.password !== accountForm.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive"
        });
        return;
      }
      
      if (accountForm.password.length < 8) {
        toast({
          title: "Password too short",
          description: "Password must be at least 8 characters.",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Show success toast
    toast({
      title: "Account updated",
      description: "Your account information has been updated.",
    });
  };
  
  // Handle notification toggle
  const handleNotificationToggle = (key: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof notificationSettings]
    }));
    
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  // Handle appearance settings change
  const handleAppearanceChange = (key: string, value: any) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Settings updated",
      description: "Your appearance settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>Update your account details and information.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccountSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={accountForm.name} 
                      onChange={handleAccountChange}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={accountForm.email} 
                      onChange={handleAccountChange}
                      className="bg-black/20 border-white/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    value={accountForm.password} 
                    onChange={handleAccountChange}
                    placeholder="Leave blank to keep current password"
                    className="bg-black/20 border-white/10"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    value={accountForm.confirmPassword} 
                    onChange={handleAccountChange}
                    className="bg-black/20 border-white/10"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Notification Preferences</CardTitle>
              <CardDescription>Configure how you want to receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Checkbox 
                    checked={notificationSettings.emailNotifications} 
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Checkbox 
                    checked={notificationSettings.pushNotifications} 
                    onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Report</Label>
                    <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                  </div>
                  <Checkbox 
                    checked={notificationSettings.weeklyReport} 
                    onCheckedChange={() => handleNotificationToggle('weeklyReport')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Product Updates</Label>
                    <p className="text-sm text-muted-foreground">Get notified about product updates</p>
                  </div>
                  <Checkbox 
                    checked={notificationSettings.productUpdates} 
                    onCheckedChange={() => handleNotificationToggle('productUpdates')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive security alerts and warnings</p>
                  </div>
                  <Checkbox 
                    checked={notificationSettings.securityAlerts} 
                    onCheckedChange={() => handleNotificationToggle('securityAlerts')}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                  </div>
                  <Checkbox 
                    checked={notificationSettings.marketingEmails} 
                    onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base mb-2 block">Theme</Label>
                  <div className="flex flex-row gap-4">
                    <Button 
                      variant={appearanceSettings.theme === 'dark' ? 'default' : 'outline'} 
                      onClick={() => handleAppearanceChange('theme', 'dark')}
                      className={appearanceSettings.theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'border-white/10'}
                    >
                      Dark
                    </Button>
                    <Button 
                      variant={appearanceSettings.theme === 'light' ? 'default' : 'outline'} 
                      onClick={() => handleAppearanceChange('theme', 'light')}
                      className={appearanceSettings.theme === 'light' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'border-white/10'}
                    >
                      Light
                    </Button>
                    <Button 
                      variant={appearanceSettings.theme === 'system' ? 'default' : 'outline'} 
                      onClick={() => handleAppearanceChange('theme', 'system')}
                      className={appearanceSettings.theme === 'system' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'border-white/10'}
                    >
                      System
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Sidebar Default State</Label>
                    <p className="text-sm text-muted-foreground">Keep sidebar collapsed by default</p>
                  </div>
                  <Checkbox 
                    checked={appearanceSettings.sidebarCollapsed} 
                    onCheckedChange={(checked) => handleAppearanceChange('sidebarCollapsed', checked)}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable Animations</Label>
                    <p className="text-sm text-muted-foreground">Use animations throughout the interface</p>
                  </div>
                  <Checkbox 
                    checked={appearanceSettings.animationsEnabled} 
                    onCheckedChange={(checked) => handleAppearanceChange('animationsEnabled', checked)}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between border-b border-white/5 pb-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing between elements</p>
                  </div>
                  <Checkbox 
                    checked={appearanceSettings.compactMode} 
                    onCheckedChange={(checked) => handleAppearanceChange('compactMode', checked)}
                  />
                </div>
                
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Checkbox 
                    checked={appearanceSettings.highContrastMode} 
                    onCheckedChange={(checked) => handleAppearanceChange('highContrastMode', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-xl">Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <Badge className="bg-red-500/20 text-red-300 hover:bg-red-500/30">Disabled</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account by enabling two-factor authentication.</p>
                  <Button 
                    variant="outline" 
                    className="mt-2 border-white/10 hover:bg-accent/50"
                    onClick={() => {
                      toast({
                        title: "Feature coming soon",
                        description: "Two-factor authentication will be available in a future update.",
                      });
                    }}
                  >
                    Enable Two-Factor Authentication
                  </Button>
                </div>
                
                <div className="space-y-2 border-t border-white/5 pt-6">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage your active sessions and sign out from other devices.</p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-black/20 p-4 rounded-lg">
                      <div>
                        <p className="font-medium">Current Device</p>
                        <p className="text-sm text-muted-foreground">Windows • Chrome • Last active now</p>
                      </div>
                      <Badge className="bg-green-500/20 text-green-300">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-black/20 p-4 rounded-lg">
                      <div>
                        <p className="font-medium">Mobile Device</p>
                        <p className="text-sm text-muted-foreground">iOS • Safari • Last active 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm" className="hover:bg-red-500/20 hover:text-red-300">
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-white/5 pt-4">
              <Button 
                variant="outline" 
                className="border-red-500/30 text-red-300 hover:bg-red-500/20 hover:text-red-200"
                onClick={() => {
                  toast({
                    title: "Account deletion requested",
                    description: "Please check your email to confirm account deletion.",
                  });
                }}
              >
                Delete Account
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all"
                onClick={() => {
                  toast({
                    title: "Security settings saved",
                    description: "Your security preferences have been updated.",
                  });
                }}
              >
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
