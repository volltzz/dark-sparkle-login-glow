
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import BackgroundGlow from './BackgroundGlow';
import { cn } from '@/lib/utils';

const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      <BackgroundGlow />
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className={cn(
          "h-full p-6 overflow-y-auto"
        )}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
