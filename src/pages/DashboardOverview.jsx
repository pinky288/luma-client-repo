import React, { useContext, useEffect } from 'react';
import { authcontext } from '../providers/authprovider';
import { motion } from 'framer-motion';
import { FiBook, FiAward, FiClock, FiArrowRight, FiActivity, FiZap } from 'react-icons/fi';

const DashboardOverview = () => {
  const { user } = useContext(authcontext);

  useEffect(() => {
    document.title = "Dashboard | Luma Learning";
  }, []);

  const stats = [
    { label: 'Enrolled Courses', value: '04', icon: <FiBook />, color: 'text-[#90ee90]', bg: 'bg-[#90ee90]/5' },
    { label: 'Courses Completed', value: '01', icon: <FiAward />, color: 'text-blue-400', bg: 'bg-blue-400/5' },
    { label: 'Learning Hours', value: '24h', icon: <FiClock />, color: 'text-orange-400', bg: 'bg-orange-400/5' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      // মোবাইলে সাইড থেকে লেগে না যাওয়ার জন্য px-4 ব্যবহার করা হয়েছে
      className="space-y-6 md:space-y-10 px-4 py-6 md:px-0 md:py-0"
    >
      
      {/* Welcome Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 md:pb-8">
        <div className="space-y-1">
          {/* টেক্সট সাইজ মোবাইলে একটু ছোট করা হয়েছে যাতে ব্রেক না করে */}
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Welcome back, <span className="text-[#90ee90]">{user?.displayName?.split(' ')[0] || 'Learner'}</span>
          </h1>
          <p className="text-gray-400 text-[12px] sm:text-sm flex items-center gap-2">
            <FiActivity className="text-[#90ee90] flex-shrink-0" /> 
            You've reached 25% of your weekly target.
          </p>
        </div>
        
        <div className="inline-flex self-start md:self-center bg-[#90ee90]/10 px-3 py-1.5 rounded-full border border-[#90ee90]/20 items-center gap-2">
           <FiZap className="text-[#90ee90] text-sm" />
           <span className="text-[#90ee90] text-[10px] font-bold tracking-wide">Luma Premium Member</span>
        </div>
      </header>

      {/* Stats Grid - মোবাইলে এক কলামে থাকবে */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-[#0D0D0D] border border-white/10 p-4 md:p-6 rounded-2xl flex items-center justify-between group hover:border-[#90ee90]/30 transition-all shadow-sm"
          >
            <div className="space-y-1">
              <p className="text-[11px] md:text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-xl md:text-3xl font-bold text-white">{stat.value}</h3>
            </div>
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center text-lg md:text-2xl group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Course Card - মোবাইলে প্যাডিং কমানো হয়েছে */}
        <div className="lg:col-span-2 bg-[#0D0D0D] border border-white/10 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden group">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[#90ee90] text-[10px] font-bold mb-4">
                <span className="w-1.5 h-1.5 bg-[#90ee90] rounded-full animate-pulse"></span>
                Ongoing Course
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-white mb-2 group-hover:text-[#90ee90] transition-colors leading-snug">
                Mastering React with Next.js
              </h2>
              <p className="text-gray-400 text-[12px] md:text-sm max-w-sm leading-relaxed">
                Continuing Module 4: Learn how to implement secure Authentication.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-5">
               <button className="flex items-center justify-center gap-2 text-[12px] md:text-sm font-bold text-black bg-[#90ee90] px-6 py-3.5 md:py-4 rounded-xl md:rounded-2xl hover:bg-white transition-all">
                Resume Now <FiArrowRight />
              </button>
              
              <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Progress</p>
                    <span className="text-[9px] text-[#90ee90] font-bold">65%</span>
                  </div>
                  <div className="w-full sm:w-32 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-[65%] h-full bg-[#90ee90]"></div>
                  </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-12 -top-12 w-40 md:w-64 h-40 md:h-64 bg-[#90ee90]/5 blur-[50px] md:blur-[80px] rounded-full pointer-events-none"></div>
        </div>

        {/* Achievement Card - মোবাইলে ছোট করা হয়েছে */}
        <div className="bg-[#0D0D0D] border border-white/10 border-dashed p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-4 rotate-3">
             <FiAward className="text-gray-600 text-xl md:text-3xl" />
          </div>
          <h3 className="text-white font-bold text-sm md:text-lg">No Certificates Yet</h3>
          <p className="text-gray-500 text-[11px] md:text-sm mt-2 leading-relaxed max-w-[200px]">
            Finish courses to unlock accreditation from EduNexus.
          </p>
          <button className="mt-5 text-[10px] font-bold text-gray-500 hover:text-[#90ee90] underline underline-offset-4 transition-colors">
            View Requirements
          </button>
        </div>

      </div>

    </motion.div>
  );
};

export default DashboardOverview;