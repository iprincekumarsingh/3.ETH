import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/home/Sidebar';
import { BadgePlus, FileText, Code, Wallet } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  const toolbarItems = [
    { icon: FileText, label: 'New Contract' },
    { icon: Code, label: 'New Template' },
    { icon: Wallet, label: 'Connect Wallet' }
  ];

  return (
    <div className="h-screen bg-gray-900x">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 ">
          <Outlet />
        </main>
      </div>
      <div className="fixed bottom-10 right-4">
        <div className="flex flex-col items-end space-y-4">
          {isToolbarOpen && (
            <div className="flex flex-col-reverse gap-4 mb-4">
              {toolbarItems.map((item, index) => (
                <button key={index} className="group relative flex items-center justify-center">
                  <div className="flex items-center gap-5">
                    <span className="ml-3 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap shadow-lg shadow-black/50 border border-gray-700/50">
                      {item.label}
                    </span>
                    <item.icon className="w-12 h-12 p-3 text-black bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/20 hover:scale-110 transition-all duration-300" />
                  </div>
                </button>
              ))}
            </div>
          )}
          <button 
            className="group relative flex items-center justify-center gap-3"
            onClick={() => setIsToolbarOpen(!isToolbarOpen)}
          >
              <span className="ml-3 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap shadow-lg shadow-black/50 border border-gray-700/50">
                {isToolbarOpen ? 'Close Menu' : 'Create New'}
              </span>
            <div className="flex items-center">
              <BadgePlus className={`w-16 h-16 p-4 text-white bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/20 hover:scale-110 transition-all duration-300 ${isToolbarOpen ? 'rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};