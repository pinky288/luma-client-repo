import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiBookOpen, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom'; 

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://luma-server.vercel.app/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data.slice(0, 3)); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64 text-white">
      loading...
    </div>
  );

  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Centered & Normal Case */}
        <div className="text-center mb-16">
          <span className="text-[#90ee90] mb-2 block font-medium">
            featured programs
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
  elevate your skills with <br /> 
  <span className="text-[#90ee90]">expert-led</span> courses
</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            explore our curated list of professional courses designed to help you master new skills and advance your career.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden flex flex-col h-full hover:border-[#90ee90]/30 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Course Body */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {course.category}
                  </span>
                  <div className="p-2 bg-white/5 rounded-full group-hover:text-[#90ee90] group-hover:bg-[#90ee90]/10 transition-all">
                    <FiArrowUpRight />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#90ee90] transition-colors">
                  {course.title}
                </h3>

                {/* Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-8">
                  <span className="flex items-center gap-1.5">
                    <FiBookOpen size={14} className="text-[#90ee90]/60" /> 12 modules
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiClock size={14} className="text-[#90ee90]/60" /> 8h 30m
                  </span>
                </div>

                {/* Footer with Link */}
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
                  <span className="text-2xl font-bold text-white">${course.price}</span>
                  <Link to={`/course/${course._id}`}>
                    <button className="px-5 py-2 bg-[#90ee90] hover:bg-white text-black text-sm font-semibold rounded-md transition-all active:scale-95 shadow-lg shadow-white/5">
                      Enroll now
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseList;