import React, { useContext } from 'react';
import { authcontext } from '../providers/authprovider';
import Loge from '../assets/luma_Logo.png'; 
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(authcontext);

  return (
    <nav className="bg-background w-full border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center py-5 px-6 md:px-12 lg:px-20 font-normal text-sm">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/">
            <img src={Loge} alt="luma logo" className="h-10 w-auto" />
          </Link>
        </div>
        
        {/* Navigation Links & Auth Section */}
        <div className="flex gap-8 items-center">
          <Link to="/courses" className="hover:text-[#90ee90] transition-colors font-semibold">
            Courses
          </Link>
          <Link 
            to="/instructors" 
            className="hover:text-[#90ee90] transition-colors font-semibold"
          >
            Instructors
          </Link>
          
          {user ? (
            /* প্রোফাইল ইমেজ এবং হোভার ড্রপডাউন */
            <div className="relative group py-2">
              <img 
                src={user?.photoURL || "https://i.ibb.co.com/v4t6S3f/user.png"} 
                alt="profile" 
                className="h-10 w-10 rounded-full border border-white/10 object-cover cursor-pointer group-hover:border-[#90ee90] transition-all"
              />


              {/* হোভার করলে এই অংশটি দেখা যাবে */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#0d0d0d] border border-white/10 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-xl">
                <div className="flex flex-col gap-4 text-center">
                  <p className="text-white font-semibold text-xs truncate border-b border-white/5 pb-2">
                    {user?.displayName}
                  </p>
<Link to="/dashboard" className="text-gray-400 hover:text-[#90ee90] text-sm font-semibold transition-colors">
  Dashboard
</Link>                  
                  <button 
                    onClick={logout} 
                    className="bg-[#90ee90] text-black px-4 py-2 rounded-xl cursor-pointer font-semibold hover:bg-white transition-colors text-xs font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="hover:text-[#90ee90] font-semibold transition-colors">
                Login
              </Link>
              
              <Link 
                to="/register" 
                className="bg-[#90ee90] text-black px-6 py-2 rounded-full cursor-pointer hover:bg-white transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;