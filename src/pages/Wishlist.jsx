import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiBookOpen, FiPlayCircle, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Wishlist = () => {
  const [wishlistCourses, setWishlistCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Wishlist | Dashboard";
    
  
    fetch('https://luma-server.vercel.app/courses') 
      .then(res => res.json())
      .then(data => {
        
        setWishlistCourses(data.slice(0, 3)); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleRemove = (id, title) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove "${title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#90ee90',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      background: '#0d0d0d',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        setWishlistCourses(prev => prev.filter(course => course._id !== id));
        
        Swal.fire({
          title: 'Removed!',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          background: '#0d0d0d',
          color: '#fff'
        });
      }
    });
  };

  if (loading) return <div className="text-white p-10">Loading wishlist...</div>;

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen text-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FiHeart className="text-[#90ee90] fill-[#90ee90]" /> My <span className="text-[#90ee90]">Wishlist</span>
        </h1>
        <p className="text-gray-500 mt-2">You have {wishlistCourses.length} courses saved for later.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence>
          {wishlistCourses.length > 0 ? (
            wishlistCourses.map((course) => (
              <motion.div
                key={course._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex flex-col md:flex-row items-center gap-6 bg-[#0d0d0d] border border-white/5 p-4 rounded-2xl hover:border-[#90ee90]/30 transition-all duration-300"
              >
                <div className="w-full md:w-48 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="flex-grow">
                  <span className="text-[10px] text-[#90ee90] uppercase tracking-widest bg-[#90ee90]/10 px-2 py-1 rounded">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-1 group-hover:text-[#90ee90] transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><FiBookOpen size={14} /> 12 Modules</span>
                    <span className="flex items-center gap-1 font-bold text-white text-lg">${course.price}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Link to={`/course/${course._id}`} className="flex-grow md:flex-grow-0">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#90ee90] text-black font-bold rounded-xl hover:bg-white transition-all active:scale-95">
                      <FiPlayCircle /> View Course
                    </button>
                  </Link>
                  <button 
                    onClick={() => handleRemove(course._id, course.title)}
                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    title="Remove from wishlist"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
              <FiHeart size={48} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-500 mb-6">Your wishlist is empty!</p>
              <Link to="/courses">
                <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-[#90ee90] transition-all">
                  Browse Courses
                </button>
              </Link>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Wishlist;