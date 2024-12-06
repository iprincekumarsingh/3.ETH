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
    <div className="relative flex h-screen flex-col items-center justify-center w-full bg-gradient-to-b from-gray-900 to-black">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:0.75rem_0.75rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative w-full max-w-md p-8 bg-gray-800/90 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Welcome to BetaX Chat</h2>
          <p className="mt-3 text-sm text-gray-400">Connect and chat seamlessly across Web2 and Web3</p>
        </div>

        <div className="mt-8 w-full">
          {!authToken ? (
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-gray-700/90 to-gray-800/90 rounded-xl border border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-500/50">
                <p className="text-lg text-gray-200 mb-4 font-medium">Ready to start your journey?</p>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg"></div>
                  <GoogleLogin
                    auto_select={false}
                    use_fedcm_for_prompt={false}
                    containerProps={{
                      className: "w-[100%] flex justify-center items-center relative z-10"
                    }}
                    onSuccess={handleGoogleLogin}
                    onError={() => console.error("Login Failed")}
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200">
                  By signing in, you agree to our{" "}
                  <a href="#" className="text-blue-400 hover:text-blue-300 underline decoration-dotted">
                    Terms of Service
                  </a>
                </p>
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