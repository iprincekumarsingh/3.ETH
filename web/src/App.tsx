import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { BuildType, OktoProvider } from 'okto-sdk-react';
import { LoginPage } from './pages/auth/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import  DashboardPage  from './pages/dashboard/DashboardPage';
import DeployedContracts from './pages/DeployedContracts';
import Templates from './pages/Templates';

const OKTO_CLIENT_API_KEY = 'f4293e16-64a7-4395-abaf-1fc98ee3c658';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </OktoProvider>
    </BrowserRouter>
  );
};

const AppRoutes: React.FC = () => {
  const { authToken, setAuthToken } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          authToken ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage
              setAuthToken={setAuthToken}
              authToken={authToken}
            />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          !authToken ? (
            <Navigate to="/" replace />
          ) : (
            <DashboardLayout />
          )
        }
      >
        <Route index element={<DashboardPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          !authToken ? (
            <Navigate to="/" replace />
          ) : (
            <DashboardLayout />
          )
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="deployed-contracts" element={<DeployedContracts />} />
        <Route path="contracts-templates" element={<Templates />} />
      </Route>

    </Routes>
  );
};
