import { useOkto } from 'okto-sdk-react';
import React from 'react';
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

interface AuthResponse {
  auth_token: string;
}

interface LoginFormProps {
  setAuthToken: (token: string | null) => void;
  authToken: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ setAuthToken, authToken }) => {
  const okto = useOkto();

  const handleGoogleLogin = async ({ credential }: CredentialResponse) => {
    if (!okto?.authenticate || !credential) return;

    try {
      okto.authenticate(credential, (authResponse: AuthResponse, error: Error) => {
        if (error) {
          console.error("Authentication error:", error);
          return;
        }

        if (authResponse) {
          setAuthToken(authResponse.auth_token);
          console.log("Authenticated successfully, auth token:", authResponse.auth_token);
        }
      });
    } catch (err) {
      console.error("Unexpected error during authentication:", err);
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center w-full bg-black">
      <div className="relative w-full p-8 flex">
        <div className="flex-1 flex items-center justify-center ">
          <img
            src="/mainLogo.png"
            alt="3.ETH Logo"
            className="w-[500px] object-contain"
          />
        </div>

        <div className="flex-1 pl-8 justify-center mt-20">
          {!authToken ? (
            <div className="space-y-8">
              <div className="p-10 transition-all duration-300">
                <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 font-extrabold tracking-tight h-32">
                  Happening Now
                </h1>
                <p className="text-gray-200 mb-5 text-2xl font-medium">
                  Join the innovative community of 3.ETH
                </p>
                <div className="relative w-full justify-center items-start hover:scale-105 transition-transform duration-300">
                  <GoogleLogin
                    auto_select={false}
                    use_fedcm_for_prompt={false}
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                    containerProps={{
                      className: "w-full flex justify-start items-start"
                    }}
                    onSuccess={handleGoogleLogin}
                    onError={() => console.error("Login Failed")}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-8">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium underline">
                    Terms of Service
                  </a>
                </p>
              </div>
              <div className="text-center">
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};