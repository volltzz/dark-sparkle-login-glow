
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell 
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const monthlyVisits = [
  { name: 'Jan', visits: 1200 },
  { name: 'Feb', visits: 1900 },
  { name: 'Mar', visits: 2400 },
  { name: 'Apr', visits: 1800 },
  { name: 'May', visits: 2800 },
  { name: 'Jun', visits: 3200 },
  { name: 'Jul', visits: 3800 },
  { name: 'Aug', visits: 4200 },
  { name: 'Sep', visits: 3900 },
  { name: 'Oct', visits: 4400 },
  { name: 'Nov', visits: 4800 },
  { name: 'Dec', visits: 5100 },
];

const revenueData = [
  { name: 'Jan', value: 5000 },
  { name: 'Feb', value: 7000 },
  { name: 'Mar', value: 12000 },
  { name: 'Apr', value: 10000 },
  { name: 'May', value: 15000 },
  { name: 'Jun', value: 18000 },
  { name: 'Jul', value: 21000 },
];

const categoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Kitchen', value: 20 },
  { name: 'Books', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const deviceData = [
  { name: 'Desktop', visits: 4000 },
  { name: 'Mobile', visits: 3000 },
  { name: 'Tablet', visits: 1000 },
];

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-1">Analytics</h1>
        <p className="text-muted-foreground">Track your key metrics and performance indicators.</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-morphism border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Visitors</CardTitle>
                <CardDescription>Monthly site traffic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">38,291</div>
                <div className="text-sm text-green-400 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6-6 6 6"/><path d="M6 12h12"/><path d="m6 15 6 6 6-6"/></svg>
                  <span>+12.5% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Revenue</CardTitle>
                <CardDescription>Total earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$86,459</div>
                <div className="text-sm text-green-400 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6-6 6 6"/><path d="M6 12h12"/><path d="m6 15 6 6 6-6"/></svg>
                  <span>+8.2% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism border-white/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Conversion Rate</CardTitle>
                <CardDescription>Visitor to customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3.45%</div>
                <div className="text-sm text-red-400 flex items-center gap-1 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6-6 6 6"/><path d="M6 12h12"/><path d="m6 15 6 6 6-6"/></svg>
                  <span>-0.8% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Monthly Visits</CardTitle>
                <CardDescription>Number of visitors over the past year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyVisits} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="visits" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData} margin={{ top: 5, right: 20, bottom: 20, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value) => [`$${value}`, 'Revenue']}
                      />
                      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Sales by Category</CardTitle>
                <CardDescription>Distribution of sales across product categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-lg">Traffic by Device</CardTitle>
                <CardDescription>Site visits by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={deviceData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis type="number" stroke="#888" />
                      <YAxis dataKey="name" type="category" stroke="#888" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend />
                      <Bar dataKey="visits" fill="#82ca9d" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic" className="space-y-6">
          <Card className="glass-morphism border-white/10">
            <CardHeader>
              <CardTitle className="text-lg">Traffic Sources</CardTitle>
              <CardDescription>Where your visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Direct</p>
                    <p className="text-sm text-muted-foreground">Visitors that came directly to your site</p>
                  </div>
                  <div className="font-bold">45%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p className="font-medium">Search</p>
                    <p className="text-sm text-muted-foreground">Visitors from search engines</p>
                  </div>
                  <div className="font-bold">30%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p className="font-medium">Social Media</p>
                    <p className="text-sm text-muted-foreground">Visitors from social platforms</p>
                  </div>
                  <div className="font-bold">15%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <p className="font-medium">Referrals</p>
                    <p className="text-sm text-muted-foreground">Visitors from other websites</p>
                  </div>
                  <div className="font-bold">10%</div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
