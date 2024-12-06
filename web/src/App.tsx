import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { BuildType, OktoProvider } from 'okto-sdk-react';
import { LoginPage } from './pages/auth/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import DeployedContracts from './pages/DeployedContracts';
import Templates from './pages/Templates';
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import Home from './pages/home/Home';

const OKTO_CLIENT_API_KEY = 'f4293e16-64a7-4395-abaf-1fc98ee3c658';
const APP_ID = 1074160606479048704; // App ID from https://anon-aadhaar-documentation.vercel.app/

export const App: React.FC = () => {
  const [ready, setReady] = useState<boolean>(false);
  const [useTestAadhaar, setUseTestAadhaar] = useState<boolean>(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <BrowserRouter>
          <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
            <AuthProvider>
              <AnonAadhaarProvider _appName="Anon Aadhaar" _useTestAadhaar={true}
                key={APP_ID.toString()}

              >
                <AppRoutes useTestAadhaar={useTestAadhaar} setUseTestAadhaar={setUseTestAadhaar} />
              </AnonAadhaarProvider>
            </AuthProvider>
          </OktoProvider>
        </BrowserRouter>
      ) : null}
    </>
  );
};

interface AppRoutesProps {
  useTestAadhaar: boolean;
  setUseTestAadhaar: (value: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = () => {
  const { authToken, setAuthToken } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={
          authToken ? (
            <Navigate to="/aadhar-verification" replace />
          ) : (
            <LoginPage
              setAuthToken={setAuthToken}
              authToken={authToken}
            />
          )
        }
      />
      <Route
        path="/aadhar-verification"
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
        path="/aadhar-verification"
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

      <Route path="/home"
        element={
          !authToken ? (
            <Navigate to="/" replace />
          ) : (
            <DashboardLayout />
          )
        }
      >
        <Route index element={<Home />} />
      </Route>

    </Routes>
  );
};
