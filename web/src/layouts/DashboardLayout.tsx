import React from 'react';
import { Outlet } from 'react-router-dom';


export const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen bg-gray-900">
      <main className="flex-1 bg-gray-900">
        <Outlet />
      </main>

    </div>
  );
};