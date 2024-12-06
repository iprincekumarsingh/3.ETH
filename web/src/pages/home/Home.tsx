import React, { useEffect } from 'react'
export default function Home() {
  useEffect(() => {
    document.title = 'Home';
  }, []);
  return (
    <div className="min-h-screen text-white ">
      <div className="flex items-center justify-between">

        <img
          src="/logo.png"
          alt="3.ETH Logo"
          className="w-[150px] py-5 object-contain "

        />


      </div>
    </div>
  )
}
