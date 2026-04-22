import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiArrowUpRight, FiStar, FiUsers, FiAward, FiX } from 'react-icons/fi';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState(null); 

  useEffect(() => {
    fetch('https://luma-server.vercel.app/instructors')
      .then(res => res.json())
      .then(data => {
        setInstructors(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activeTab === 'all') {
      setFiltered(instructors);
    } else {
      const filteredData = instructors.filter(i => i.role.toLowerCase().includes(activeTab));
      setFiltered(filteredData);
    }
  }, [activeTab, instructors]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#90ee90] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <section className="py-24 bg-black px-6 min-h-screen text-white font-normal">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-[#90ee90] mb-4 block">our faculty</span>
            <h2 className="text-5xl md:text-7xl font-normal leading-tight tracking-tighter">
              the <span className="text-[#90ee90]">architects</span> of your future.
            </h2>
          </div>
          
          <div className="flex gap-2 bg-[#0d0d0d] p-1.5 rounded-2xl border border-white/5">
            {['all', 'development', 'design'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm transition-all ${
                  activeTab === tab ? 'bg-[#90ee90] text-black' : 'text-gray-500 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((mentor, index) => (
              <motion.div
                key={mentor._id || index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative bg-[#0d0d0d] border border-white/5 p-10 rounded-[2.5rem] hover:border-[#90ee90]/30 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-8">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-24 h-24 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="text-right text-xs text-gray-600 space-y-1">
                    <p className="flex items-center justify-end gap-1"><FiStar /> 4.9/5</p>
                    <p className="flex items-center justify-end gap-1"><FiUsers /> 12k students</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-normal text-white mb-1">{mentor.name}</h3>
                  <p className="text-[#90ee90] text-sm mb-4">{mentor.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 ">"{mentor.bio}"</p>

                  <div className="flex flex-wrap gap-2">
                    {mentor.achievements?.map((achieve, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[11px] text-gray-400 flex items-center gap-1">
                        <FiAward /> {achieve}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex gap-4 text-gray-600">
                    <FiLinkedin className="hover:text-white cursor-pointer" />
                    <FiGithub className="hover:text-white cursor-pointer" />
                  </div>
                  <button 
                    onClick={() => setSelectedMentor(mentor)}
                    className="text-sm text-[#90ee90] flex items-center gap-1 hover:text-white transition-colors"
                  >
                    view profile <FiArrowUpRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMentor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedMentor(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-[2rem] overflow-hidden"
            >
              <button onClick={() => setSelectedMentor(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white z-10">
                <FiX size={24} />
              </button>
              
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 h-64 md:h-auto">
                  <img src={selectedMentor.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-10 flex-1">
                  <p className="text-[#90ee90] text-xs mb-2">instructor profile</p>
                  <h2 className="text-3xl font-normal mb-1">{selectedMentor.name}</h2>
                  <p className="text-gray-500 text-sm mb-6">{selectedMentor.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">"{selectedMentor.bio}"</p>
                  
                  <div className="space-y-3 mb-8">
                    <p className="text-xs text-white border-b border-white/10 pb-2">achievements</p>
                    {selectedMentor.achievements?.map((ach, i) => (
                      <p key={i} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#90ee90] rounded-full" /> {ach}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className="bg-[#90ee90] text-black px-6 py-2 rounded-xl text-sm hover:bg-white transition-colors">follow instructor</button>
                    <button className="border border-white/10 px-6 py-2 rounded-xl text-sm hover:bg-white/5 transition-colors">send message</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Instructors;