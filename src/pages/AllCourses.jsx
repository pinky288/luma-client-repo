import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiClock, FiSearch, FiArrowLeft, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'; 

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    document.title = "All Courses | Luma Learning";
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // ২. উইশলিস্ট টগল এবং SweetAlert নোটিফিকেশন
  const handleWishlist = (course) => {
    const isExist = wishlist.includes(course._id);
    
    if (isExist) {
      setWishlist(wishlist.filter(id => id !== course._id));
      
      // রিমুভ করার এলার্ট
      Swal.fire({
        title: 'Removed!',
        text: `${course.title} has been removed from your wishlist.`,
        icon: 'info',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        background: '#0d0d0d',
        color: '#fff',
        iconColor: '#ff4d4d'
      });
    } else {
      setWishlist([...wishlist, course._id]);
      
      // অ্যাড করার এলার্ট
      Swal.fire({
        title: 'Added!',
        text: `${course.title} added to wishlist!`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        background: '#0d0d0d',
        color: '#fff',
        iconColor: '#90ee90'
      });
    }
  };

  useEffect(() => {
    let result = [...courses];
    if (searchTerm) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOrder === "low-to-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
    }
    setFilteredCourses(result);
  }, [searchTerm, sortOrder, courses]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#90ee90]"></div>
    </div>
  );

  return (
    <section className="bg-black py-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            all available <span className="text-[#90ee90]">courses</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Explore our entire catalog of professional programs and find the one that fits your goals.
          </p>
        </div>

        {/* Controls: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-[#0d0d0d] p-6 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-gray-500 text-sm hidden sm:block">sort by price:</span>
            <button 
              onClick={() => setSortOrder("low-to-high")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${sortOrder === "low-to-high" ? 'bg-[#90ee90] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              low to high
            </button>
            <button 
              onClick={() => setSortOrder("high-to-low")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${sortOrder === "high-to-low" ? 'bg-[#90ee90] text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              high to low
            </button>
          </div>

          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text"
              placeholder="search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-[#90ee90]/50 transition-all"
            />
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                key={course._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#0d0d0d] border border-white/5 rounded-xl overflow-hidden flex flex-col h-full hover:border-[#90ee90]/30 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md text-[10px] text-white px-2 py-1 rounded border border-white/10 tracking-widest uppercase">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#90ee90] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <button 
                      onClick={() => handleWishlist(course)} 
                      className="transition-all active:scale-125 flex-shrink-0 p-1"
                    >
                      <FiHeart 
                        size={20} 
                        className={`transition-colors duration-300 ${wishlist.includes(course._id) ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-400'}`} 
                      />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-8">
                    <span className="flex items-center gap-1.5"><FiBookOpen size={14} className="text-[#90ee90]/60" /> {course.modules || 12} modules</span>
                    <span className="flex items-center gap-1.5"><FiClock size={14} className="text-[#90ee90]/60" /> {course.duration || "8h 30m"}</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
                    <span className="text-2xl font-bold text-white">${course.price}</span>
                    <Link to={`/course/${course._id}`}>
                      <button className="px-5 py-2 bg-[#90ee90] hover:bg-white text-black text-sm font-semibold rounded-md transition-all active:scale-95">
                        Enroll now
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/5 pt-12 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#90ee90] transition-all group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>back to home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AllCourses;