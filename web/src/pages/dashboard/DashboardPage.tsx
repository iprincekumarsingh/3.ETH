import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
import { googleLogout } from '@react-oauth/google';
import toast, { LoaderIcon } from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [anonAadhaar] = useAnonAadhaar();
  const navigate = useNavigate();

  useEffect(() => {
    if (anonAadhaar?.status === "logged-in") {
      // Store verification status in localStorage
      localStorage.setItem('anonAadhaarVerified', 'true');
      // Navigate to next screen
      window.location.href = "home";
    }
  }, [anonAadhaar?.status, navigate]);

    setTimeout(() => {
      googleLogout();
      window.location.href = "/";
      localStorage.clear();
    }, 2000);
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center w-full bg-black">
      <div className="relative w-full p-8 flex">
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/mainLogo.png"
            alt="3.ETH Logo"
            className="w-[500px] object-contain"
          />
        </div>

        <div className="flex-1 pl-8 justify-center mt-20">
          <div className="space-y-8">
            <div className="p-10 transition-all duration-300">
             

              <h1 className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 font-extrabold tracking-tight h-32">
                Verify Identity
              </h1>
              <p className="text-gray-200 mb-10 text-2xl font-medium">
                Complete anonymous Aadhaar verification to continue
              </p>

              <div className="relative w-[200px] justify-center items-center" style={{opacity: anonAadhaar?.status === "logged-in" ? 0.5 : 1}}>
                <LogInWithAnonAadhaar 
                  nullifierSeed={1234}
                  fieldsToReveal={["revealAgeAbove18", "revealGender", "revealState", "revealState"]}
                 
                />
              </div>

              <p className="text-sm text-gray-400 mt-8">
                By verifying, you agree to our{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-4 text-center text-sm text-gray-400">
        <span>© {new Date().getFullYear()} Anonymous Aadhaar Verification. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default DashboardPage;
