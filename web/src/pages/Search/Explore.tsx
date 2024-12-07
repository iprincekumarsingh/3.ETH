import React, { useState } from 'react';
import Select from 'react-select';

function Explore() {
    const generateRandomUser = (id: number) => {
        const firstNames = ['John', 'Emma', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Emily', 'Robert', 'Jennifer'];
        const lastNames = ['Smith', 'Wilson', 'Chen', 'Johnson', 'Lee', 'Anderson', 'Taylor', 'Brown', 'Davis', 'Miller'];
        const cities = ['New York', 'London', 'Singapore', 'Tokyo', 'Paris', 'Berlin', 'Sydney', 'Toronto', 'Dubai', 'Mumbai'];
        const countries = ['USA', 'UK', 'Singapore', 'Japan', 'France', 'Germany', 'Australia', 'Canada', 'UAE', 'India'];

        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const cityIndex = Math.floor(Math.random() * cities.length);

        const pincodes = {
            'USA': '10001',
            'UK': 'SW1A 1AA',
            'Singapore': '238823',
            'Japan': '100-0001',
            'France': '75001',
            'Germany': '10115',
            'Australia': '2000',
            'Canada': 'M5V 2T6',
            'UAE': '00000',
            'India': '400001'
        };

        const streetNames = ['Main St', 'Park Ave', 'Queen St', 'King Road', 'Market St'];
        const streetNumber = Math.floor(Math.random() * 1000) + 1;
        const street = `${streetNumber} ${streetNames[Math.floor(Math.random() * streetNames.length)]}`;

        return {
            id: id.toString(),
            name: `${firstName} ${lastName}`,
            place: `${cities[cityIndex]}, ${countries[cityIndex]}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName.toLowerCase()}${id}`,
            connections: Math.floor(Math.random() * 500) + 100,
            role: ['Developer', 'Designer', 'Product Manager', 'Marketing', 'Sales'][Math.floor(Math.random() * 5)],
            address: `${street}, ${cities[cityIndex]}`,
            pincode: pincodes[countries[cityIndex] as keyof typeof pincodes]
        };
    };

    const users = Array.from({ length: 100 }, (_, i) => generateRandomUser(i + 1));

    const [searchTerm, setSearchTerm] = useState('');
    const [filterPincode, setFilterPincode] = useState('');
    const [selectedCities, setSelectedCities] = useState<{ value: string; label: string; }[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

    const cityOptions = Array.from(new Set(users.map(user => user.place.split(', ')[0]))).map(city => ({
        value: city,
        label: city
    }));

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPincode = filterPincode ? user.pincode.includes(filterPincode) : true;
        const matchesCity = selectedCities.length === 0 ? true :
            selectedCities.some(city => user.address.includes(city.value));

        return matchesSearch && matchesPincode && matchesCity;
    });

    const toggleUserSelection = (userId: string) => {
        setSelectedUsers(prev => {
            if (prev.includes(userId)) {
                return prev.filter(id => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    return (
        <div className="h-screen flex flex-col p-4 b">
            <div className="flex w-full relative justify-between flex-col gap-4 py-5 rounded-xl p-6 ">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Explore Users</h1>
                        <p className="text-gray-400 text-sm mt-1">
                           {
                            selectedCities.length > 0 ? `${selectedCities.length} cities selected` : ''
                           }
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <input
                            type="text"
                            value={filterPincode}
                            onChange={(e) => setFilterPincode(e.target.value)}
                            placeholder="Filter by pincode..."
                            className="rounded-lg px-4 py-2 bg-gray-800/90 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50"
                        />
                        <div className="w-72">
                            <Select
                                isMulti
                                options={cityOptions}
                                value={selectedCities}
                                onChange={(selected) => setSelectedCities(selected as { value: string; label: string; }[])}
                                placeholder="Select cities..."
                                className="text-white"
                                classNamePrefix="select"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        backgroundColor: 'rgba(31, 41, 55, 0.9)',
                                        borderColor: 'rgba(55, 65, 81, 0.5)',
                                        '&:hover': {
                                            borderColor: '#4b5563'
                                        }
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        backgroundColor: 'rgba(31, 41, 55, 0.95)',
                                        backdropFilter: 'blur(10px)',
                                        color: 'white'
                                    }),
                                    option: (base, state) => ({
                                        ...base,
                                        backgroundColor: state.isFocused ? 'rgba(55, 65, 81, 0.8)' : 'transparent',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(55, 65, 81, 0.8)'
                                        }
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: 'rgba(139, 92, 246, 0.3)'
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        color: 'white'
                                    }),
                                    multiValueRemove: (base) => ({
                                        ...base,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: 'rgba(139, 92, 246, 0.5)',
                                            color: 'white'
                                        }
                                    }),
                                    input: (base) => ({
                                        ...base,
                                        color: 'white'
                                    })
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-y-auto flex-1 px-4 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-[2000px] mx-auto">
                    {filteredUsers.map(user => (
                        <div
                            key={user.id}
                            className={`rounded-xl p-6 bg-black/90 backdrop-blur-xl border border-gray-800/50 hover:border-purple-500/50 transition-all transform hover:-translate-y-1 cursor-pointer ${
                                selectedUsers.includes(user.id) ? 'ring-2 ring-purple-500 bg-purple-500/10' : ''
                            }`}
                            onClick={() => toggleUserSelection(user.id)}
                        >
                            <div className="flex items-start gap-4">
                                <img
                                    src={user.avatar}
                                    alt={`${user.name}'s avatar`}
                                    className="w-16 h-16 rounded-full border-2 border-purple-500/30"
                                />
                                <div className="flex-1">
                                    <div className="text-white font-medium text-lg">{user.name}</div>
                                    <div className="text-gray-400 text-sm mb-2">{user.address}</div>
                                    <div className="text-gray-400 text-sm mb-2">Pincode: {user.pincode}</div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 px-3 py-1 rounded-full">
                                            {user.role}
                                        </span>
                                        <span className="text-gray-400">
                                            {user.connections} connections
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-10 right-4 flex items-center gap-4">
                <button
                    className="group relative flex items-center justify-center gap-3"
                    onClick={() => {
                        navigator.geolocation.getCurrentPosition((position) => {
                            console.log(position.coords.latitude, position.coords.longitude);
                        });
                    }}
                >
                    <span className="ml-3 px-4 py-2 bg-gray-800/90 backdrop-blur-sm text-white text-sm rounded-lg whitespace-nowrap shadow-lg shadow-black/50 border border-gray-700/50">
                        Detect Location
                    </span>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 p-4 text-white bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/20 hover:scale-110 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Explore;