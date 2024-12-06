import React, { useState, useEffect } from 'react';
import { Wallet, Moon, Bell, Shield, LogOut } from 'lucide-react';

function Setting() {
  const [walletAddress, setWalletAddress] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [walletLabel, setWalletLabel] = useState('MetaMask'); // Added wallet label state

  useEffect(() => {
    document.title = 'Settings | Chat';
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="m mx-auto p-8">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-12 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
          <h1 className="text-4xl font-bold text-white">
            Settings
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallet Section */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-xl hover:shadow-purple-500/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Wallet className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Wallet</h2>
                <p className="text-purple-400">{walletLabel}</p>
              </div>
            </div>
            <div className="bg-black/40 p-6 rounded-xl border border-gray-700/30">
              <p className="text-gray-300 font-mono text-lg break-all">{walletAddress}</p>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-xl hover:shadow-purple-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Moon className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Dark Mode</h2>
              </div>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`w-16 h-8 rounded-full p-1 transition-all duration-300 ${
                  darkMode ? 'bg-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gray-600'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transform transition-transform duration-300 ${
                  darkMode ? 'translate-x-8' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-xl hover:shadow-purple-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                  <Bell className="w-8 h-8 text-purple-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white">Notifications</h2>
              </div>
              <button 
                onClick={() => setNotifications(!notifications)}
                className={`w-16 h-8 rounded-full p-1 transition-all duration-300 ${
                  notifications ? 'bg-purple-600 shadow-lg shadow-purple-500/30' : 'bg-gray-600'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white transform transition-transform duration-300 ${
                  notifications ? 'translate-x-8' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-xl hover:shadow-purple-500/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Security</h2>
            </div>
            <button className="text-purple-400 hover:text-purple-300 transition-colors text-lg font-medium hover:underline decoration-2 underline-offset-4">
              Change Password
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-12 flex justify-center">
          <button className="group bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl px-8 py-4 flex items-center gap-3 transition-all duration-300 hover:scale-105">
            <LogOut className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <span className="text-lg font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Setting;