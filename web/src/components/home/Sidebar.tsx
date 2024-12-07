import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Settings, LogOut, Menu, X, Home, MessageCircle, PanelLeftClose, PanelLeftOpen, GroupIcon, UsersRound, User, Search } from 'lucide-react';
import { cn } from '../../libs/utils';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 1024);
    const location = useLocation();
    const { handleLogout } = useAuth()

    const navItems = [
        { icon: Home, label: 'Home', to: '/home' }, // Changed label from 'Chat Bot' to 'Home' to be more standard/clear
        { icon: Search, label: 'Explore', to: '/home/explore' },
        { icon: UsersRound, label: 'Group', to: '/home/group' },
        { icon: Settings, label: 'Settings', to: '/home/setting' }
    ];





    return (
        <>
            <aside className={cn(
                "fixed max-h-screen w-24 h-screen lg:static inset-y-0 left-0 z-10 transition-all duration-500 transform",
                "border-r border-gray-800/50 bg-black/90 backdrop-blur-xl",
                "shadow-2xl shadow-purple-500/10 flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="flex items-center justify-between p-6">
                    <img src="/logo.png" alt="3.ETH Logo" className="w-[150px]  hover:scale-110 transition-transform duration-300" />
                </div>

                <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className="group relative flex justify-center"
                            >
                                <div className={cn(
                                    "p-3 rounded-xl transition-all duration-300 hover:scale-110",
                                    isActive
                                        ? "bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-white ring-1 ring-purple-500/50"
                                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                                )}>
                                    <item.icon
                                        className="h-6 w-6"
                                        color={isActive ? '#8B78E6' : 'currentColor'}
                                    />
                                </div>

                                {/* Tooltip */}
                                {/* <span className="absolute left-full ml-4 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg
                                    opacity-0 group-hover:opacity-100 invisible group-hover:visible
                                    transition-all duration-300 whitespace-nowrap shadow-lg shadow-black/50
                                    border border-gray-700/50 z-50">
                                    {item.label}
                                </span> */}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-2 border-t flex-re border-gray-800/50">

                    <button className="group relative w-full p-3 text-gray-400 hover:text-white rounded-xl hover:bg-red-500/10 transition-all duration-300 flex justify-center hover:scale-110">
                        <User className="h-6 w-6" />

                        {/* Tooltip */}
                        <span className="absolute left-full ml-4 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg
                                opacity-0 group-hover:opacity-100 invisible group-hover:visible
                                transition-all duration-300 whitespace-nowrap shadow-lg shadow-black/50
                                border border-gray-700/50 z-50">
                            Logout
                        </span>
                    </button>
                    <button onClick={() => {
                        toast('Logging out....', {
                            position: 'top-right',
                            icon: 'progress',
                          
                        })
                        setTimeout(() => {
                            handleLogout()
                        }, 1500)
                    }} className="group relative w-full p-3 text-gray-400 hover:text-white rounded-xl hover:bg-red-500/10 transition-all duration-300 flex justify-center hover:scale-110">
                        <LogOut className="h-6 w-6" />

                        {/* Tooltip */}
                        <span className="absolute left-full ml-4 px-3 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg
                            opacity-0 group-hover:opacity-100 invisible group-hover:visible
                            transition-all duration-300 whitespace-nowrap shadow-lg shadow-black/50
                            border border-gray-700/50 z-50">
                            Logout
                        </span>
                    </button>
                </div>

            </aside>
        </>
    );
};
