import React from 'react';
import { LoginForm } from '../../components/LoginForm';

interface LoginPageProps {
  setAuthToken: (token: string | null) => void;
  authToken: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setAuthToken, authToken }) => {
  return (
    <main className="h-screen flex  justify-center items-center">


      <div className="w-1/2  h-full flex justify-center items-center">

      </div>

      <div className="w-1/2 h-full flex justify-center items-center">

        <LoginForm setAuthToken={setAuthToken} authToken={authToken} />
      </div>
    </main>
  );
};