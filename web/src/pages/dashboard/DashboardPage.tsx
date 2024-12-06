import React, { useEffect } from 'react'
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";
function DashboardPage() {
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);
  return (
    <div>
      <AnonAadhaarProvider>
        <div>
          <h1>Dashboard</h1>
          <LogInWithAnonAadhaar nullifierSeed={1234} />
        </div>
      </AnonAadhaarProvider>
    </div>
  )
}

export default DashboardPage