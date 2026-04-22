import React, { useContext, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { authcontext } from '../providers/authprovider';
import { 
  FiGrid, FiPlayCircle, FiUser, FiLogOut, 
  FiHeart, FiCreditCard, FiChevronRight, FiMenu, FiX 
} from 'react-icons/fi';
import Loge from '../assets/luma_Logo.png';

const StudentLayout = () => {
  const { logout, user } = useContext(authcontext);
  // সাইডবার ওপেন/ক্লোজ করার জন্য স্টেট
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard Overview', path: '/dashboard/overview', icon: <FiGrid /> },
    { name: 'My Courses', path: '/dashboard/my-courses', icon: <FiPlayCircle /> },
    { name: 'Wishlist', path: '/dashboard/wishlist', icon: <FiHeart /> },
    { name: 'Order History', path: '/dashboard/payments', icon: <FiCreditCard /> },
    { name: 'Account Settings', path: '/dashboard/profile', icon: <FiUser /> },
  ];

  return (
    <div className="flex min-h-screen bg-black text-[#e5e5e5] font-sans antialiased overflow-x-hidden">
      
      {/* Sidebar - মোবাইলে হিডেন থাকবে, md স্ক্রিন থেকে দেখাবে */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0A0A0A] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:fixed h-screen overflow-y-auto
      `}>
        <div className="h-20 flex items-center justify-between px-8 border-b border-white/5">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img src={Loge} alt="Luma" className="h-7 w-auto" />
          </Link>
          {/* মোবাইলে ক্লোজ বাটন */}
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 text-xl">
            <FiX />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow py-8 px-4 space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setSidebarOpen(false)} // মেনুতে ক্লিক করলে মোবাইলে সাইডবার বন্ধ হবে
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-medium transition-all duration-300 group ${
                  isActive 
                  ? 'bg-[#90ee90]/10 text-[#90ee90] ring-1 ring-[#90ee90]/20' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <span className="text-lg opacity-90 transition-transform group-hover:scale-110">{item.icon}</span>
                {item.name}
              </div>
              <FiChevronRight className="opacity-0 group-[.active]:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="p-4 mt-auto">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img 
                src={user?.photoURL || "https://i.ibb.co.com/v4t6S3f/user.png"} 
                className="w-10 h-10 rounded-xl border border-white/10" 
                alt="User" 
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold truncate text-white leading-tight">{user?.displayName}</p>
                <p className="text-[10px] text-[#90ee90] font-medium mt-0.5">Student Account</p>
              </div>
            </div>
            <button 
              onClick={logout} 
              className="text-[11px] flex items-center justify-center gap-2 text-red-400 bg-red-400/5 hover:bg-red-400/10 border border-red-400/10 rounded-lg py-2 transition-all font-semibold"
            >
              <FiLogOut /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      {/* ml-[280px] কে md:ml-[280px] করা হয়েছে যেন মোবাইলে মার্জিন না থাকে */}
      <main className="flex-grow md:ml-[280px] min-w-0 transition-all duration-300">
        
        {/* Header - মোবাইলে হ্যামবার্গার মেনু বাটন সহ */}
        <header className="h-16 md:h-20 border-b border-white/5 px-4 md:px-12 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40">
           <button 
             onClick={() => setSidebarOpen(true)} 
             className="md:hidden p-2 bg-[#90ee90]/10 text-[#90ee90] rounded-lg text-2xl"
           >
             <FiMenu />
           </button>

           <div className="flex items-center gap-4 text-gray-500 text-[10px] md:text-xs">
             Last login: {new Date().toLocaleDateString()}
           </div>
        </header>

        {/* Body - মোবাইলে প্যাডিং কমানো হয়েছে */}
        <div className="p-6 md:p-12 lg:p-16">
          <Outlet />
        </div>
      </main>

      {/* Mobile Overlay - সাইডবার খোলা থাকলে ব্যাকগ্রাউন্ড আবছা করবে */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentLayout;