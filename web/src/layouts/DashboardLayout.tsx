import React from 'react';
import { Outlet } from 'react-router-dom';


export const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen ">
      <main className="flex-1 ">
        <Outlet />
      </main>

    </div>
  );
};