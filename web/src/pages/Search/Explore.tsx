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
      pincode: pincodes[countries[cityIndex]]
    };
  };

  const users = Array.from({ length: 100 }, (_, i) => generateRandomUser(i + 1));

  const [searchTerm, setSearchTerm] = useState('');
  const [filterPincode, setFilterPincode] = useState('');
  const [selectedCities, setSelectedCities] = useState<{ value: string; label: string; }[]>([]);

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

  return (
    <div className="h-screen flex flex-col p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-2xl font-bold">Explore Users</h2>
        <div className="flex flex-wrap  justify-end gap-4">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users..."
            className="rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={filterPincode}
            onChange={(e) => setFilterPincode(e.target.value)}
            placeholder="Filter by pincode..."
            className="rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  backgroundColor: '#1f2937',
                  borderColor: '#374151',
                  '&:hover': {
                    borderColor: '#4b5563'
                  }
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#1f2937',
                  color: 'white'
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? '#374151' : '#1f2937',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#374151'
                  }
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#374151'
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: 'white'
                }),
                multiValueRemove: (base) => ({
                  ...base,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#4b5563',
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
      
      <div className="overflow-y-auto flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map(user => (
            <div 
              key={user.id}
              className="rounded-lg p-4 hover:bg-gray-700/50 transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <img 
                  src={user.avatar}
                  alt={`${user.name}'s avatar`}
                  className="w-16 h-16 rounded-full border-2 border-gray-700"
                />
                <div className="flex-1">
                  <div className="text-white font-medium text-lg">{user.name}</div>
                  <div className="text-gray-400 text-sm mb-2">{user.address}</div>
                  <div className="text-gray-400 text-sm mb-2">Pincode: {user.pincode}</div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
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
    </div>
  );
}

export default Explore;