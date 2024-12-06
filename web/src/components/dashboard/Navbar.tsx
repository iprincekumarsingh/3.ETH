import React, { useState, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useWallet } from '../../hooks/GetWallet';
import { getWalletDetails } from '../../api/api';

export const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { walletAddress, walletBalance, fetchWalletContent, updateWalletAddress } = useWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<any>(null);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchWallet = async () => {
      if (authToken) {
        try {
          const walletData = await getWalletDetails(authToken);
          console.log("Wallet data:", JSON.stringify(walletData.data.wallets));
          setSelectedWallet(JSON.stringify(walletData.data.wallets));
          setWalletData(walletData.data.wallets);
        } catch (error) {
          console.error("Error fetching wallet details:", error);
        }
      }
    };

    fetchWallet();
  }, [authToken]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleWalletSelect = (address: string) => {
    updateWalletAddress(address);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">BetaX Dashboard</h1>
          </div>
          
        </div>
      </div>
    </nav>
  );
};