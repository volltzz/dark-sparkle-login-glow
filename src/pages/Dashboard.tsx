
import React from 'react';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BarChart, Users, Package, Activity, TrendingUp } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

// Sample data for the dashboard
const stats = [
  { 
    title: 'Total Users', 
    value: '2,845', 
    change: '+12.5%',
    icon: Users,
    positive: true
  },
  { 
    title: 'Active Products', 
    value: '94', 
    change: '+3.2%',
    icon: Package,
    positive: true
  },
  { 
    title: 'Daily Visitors', 
    value: '1,257', 
    change: '-2.4%',
    icon: Activity,
    positive: false
  },
  { 
    title: 'Revenue', 
    value: '$12,864', 
    change: '+8.7%',
    icon: TrendingUp,
    positive: true
  },
];

const recentOrders = [
  { id: '#3210', product: 'Premium Package', customer: 'John Doe', date: '2025-05-01', status: 'Completed', amount: '$129.99' },
  { id: '#3209', product: 'Standard License', customer: 'Sarah Johnson', date: '2025-05-01', status: 'Processing', amount: '$59.99' },
  { id: '#3208', product: 'Enterprise Plan', customer: 'Tech Solutions Inc.', date: '2025-04-30', status: 'Completed', amount: '$299.99' },
  { id: '#3207', product: 'Basic Package', customer: 'Michael Brown', date: '2025-04-30', status: 'Failed', amount: '$29.99' },
  { id: '#3206', product: 'Custom Work', customer: 'Sandra Wilson', date: '2025-04-29', status: 'Pending', amount: '$199.99' },
];

const Index: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient mb-1">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back. Here's an overview of your business today.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-morphism border-white/10 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <div className="flex items-center mt-2">
                    <Badge variant={stat.positive ? "default" : "destructive"} className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className="p-3 rounded-full bg-secondary/30 backdrop-blur-sm">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism border-white/10 p-5 md:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Revenue Overview</h3>
            <Badge variant="outline" className="text-xs">Last 7 Days</Badge>
          </div>
          <div className="flex justify-center items-center h-64">
            <BarChart className="h-40 w-40 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">Revenue chart will appear here</p>
          </div>
        </Card>
        
        <Card className="glass-morphism border-white/10 p-5">
          <h3 className="text-lg font-medium mb-4">Sales Goals</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Monthly Target</span>
                <span className="text-sm font-medium">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Quarterly Goal</span>
                <span className="text-sm font-medium">52%</span>
              </div>
              <Progress value={52} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Annual Target</span>
                <span className="text-sm font-medium">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <Separator className="my-4" />
            <div className="pt-2">
              <p className="text-sm text-muted-foreground">You need $5,240 more sales to reach the monthly target.</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <Card className="glass-morphism border-white/10 p-5">
        <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === 'Completed' ? 'default' :
                      order.status === 'Processing' ? 'secondary' :
                      order.status === 'Pending' ? 'outline' :
                      'destructive'
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Index;
