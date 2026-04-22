import React, { useContext, useState } from 'react';
import { authcontext } from '../providers/authprovider';
import { FiBook, FiUser, FiSettings, FiLogOut, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user, logout } = useContext(authcontext);
  const [activeTab, setActiveTab] = useState('my-courses');

  return (
    <div className="flex min-h-screen bg-black font-normal ">
      
      <div className="w-64 bg-[#0d0d0d] border-r border-white/5 p-8 flex flex-col gap-8">
        <h2 className="text-[#90ee90] font-bold text-xl ">Luma</h2>
        
        <nav className="flex flex-col gap-4">
          <button 
            onClick={() => setActiveTab('my-courses')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'my-courses' ? 'bg-[#90ee90] text-black font-bold' : 'text-gray-500 hover:bg-white/5'}`}
          >
            <FiBook /> my courses
          </button>
          
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-[#90ee90] text-black font-bold' : 'text-gray-500 hover:bg-white/5'}`}
          >
            <FiUser /> profile
          </button>
        </nav>

        <div className="mt-auto border-t border-white/5 pt-6">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors mb-2">
            <FiHome /> back to home
          </Link>
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-500/5 rounded-xl w-full transition-all">
            <FiLogOut /> logout
          </button>
        </div>
      </div>

      {/* ডান পাশের কন্টেন্ট (Main Content) */}
      <div className="flex-grow p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold text-white ">welcome back, {user?.displayName}</h1>
          <p className="text-gray-500 text-sm">manage your learning and profile settings</p>
        </header>

        {/* ট্যাব অনুযায়ী কন্টেন্ট চেঞ্জ হবে */}
        <div className="bg-[#0d0d0d] border border-white/5 rounded-3xl p-10">
          {activeTab === 'my-courses' ? (
            <div>
              <h3 className="text-xl text-white mb-6 font-bold  border-b border-white/5 pb-4">enrolled courses</h3>
              <p className="text-gray-500 ">you haven't enrolled in any courses yet.</p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl text-white mb-6 font-bold  border-b border-white/5 pb-4">profile settings</h3>
              <p className="text-gray-500 ">update your information here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;