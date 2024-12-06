import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';

import { BuildType, OktoProvider } from 'okto-sdk-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import Home from '../pages/home/Home';

const OKTO_CLIENT_API_KEY = 'd6994eeb-3acb-4940-80ae-6c5534100908';
export const AppRoutes: React.FC = () => {
  console.log('App component rendered');
  const [authToken, setAuthToken] = useState<string | null>(null);
  return (
    <BrowserRouter>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Routes>
          <Route path="/" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken} />} />
          <Route path="/home" element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </OktoProvider>
    </BrowserRouter>
  );
};