import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar /> 

      <main className="flex-grow w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default App;