import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiUsers, FiAward } from 'react-icons/fi';

const FeatureBento = () => {
  return (
    <section className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Centered Header with Brand Color */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Why <span className="text-[#90ee90]">Luma</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We focus on high-quality learning through real-world projects and expert mentorship.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-6">
          
          {/* Fast-track Card */}
          <motion.div 
            className="md:col-span-8 bg-[#90ee90] p-10 rounded-2xl flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="relative z-10">
              <span className="bg-black text-[#90ee90] px-3 py-1 rounded text-xs font-semibold">Process</span>
              <h3 className="text-3xl md:text-4xl font-bold text-black mt-6 mb-4">Fast-track learning</h3>
              <p className="text-black/70 font-medium max-w-sm">Master high-income skills in 12 weeks with zero waste and structured modules.</p>
            </div>
            <div className="relative z-10">
               <FiZap size={40} className="text-black/20" />
            </div>
          </motion.div>

          {/* Community Card */}
          <motion.div 
            className="md:col-span-4 bg-[#111] border border-white/10 p-8 rounded-2xl flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-[#90ee90]/10 rounded-lg flex items-center justify-center text-[#90ee90]">
              <FiUsers size={24} />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">12k+ Students</h4>
              <p className="text-gray-500 text-sm">A global network of active developers and builders.</p>
            </div>
          </motion.div>

          {/* Certificate Card */}
          <motion.div 
            className="md:col-span-4 bg-[#111] border border-white/10 p-8 rounded-2xl flex flex-col justify-between"
          >
            <div className="w-12 h-12 bg-[#90ee90]/10 rounded-lg flex items-center justify-center text-[#90ee90]">
              <FiAward size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Certificates</h3>
              <p className="text-gray-500 text-sm">Earn industry-recognized certificates upon completion.</p>
            </div>
          </motion.div>

          {/* Projects Card */}
          <motion.div 
            className="md:col-span-8 bg-[#111] border border-white/10 p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-white mb-4">Real Projects</h3>
              <p className="text-gray-400">Build products like SplitFlow and Luma to strengthen your professional portfolio.</p>
            </div>
            <div className="w-full md:w-32 aspect-square bg-[#90ee90] rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-3xl">100%</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeatureBento;