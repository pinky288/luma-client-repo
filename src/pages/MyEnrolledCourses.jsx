import React, { useState } from 'react';
import { FiPlay, FiBookOpen, FiImage } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MyEnrolledCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development with MERN",
      instructor: "Chandra Shekhor",
      thumbnail: "https://i.pinimg.com/736x/a9/93/ea/a993ea7eb618687a31506f3d48588579.jpg", 
      progress: 65,
    },
    {
      id: 2,
      title: "Advanced Next.js App Router Masterclass",
      instructor: "Pinky Saha",
      thumbnail: "https://i.pinimg.com/736x/66/72/f5/6672f5abda5d9cdea5002a0543b0ab63.jpg", 
      progress: 20,
    }
  ];

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-700">
      
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">My Learning</h1>
        <p className="text-gray-500 text-sm mt-2 font-medium tracking-wide">Continue where you left off and reach your goals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}

        <div className="border-2 border-white/5 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center hover:bg-white/5 hover:border-[#90ee90]/20 transition-all cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FiBookOpen className="text-gray-500 group-hover:text-[#90ee90]" size={24} />
          </div>
          <p className="text-gray-400 text-sm font-bold tracking-tight">Ready for more?</p>
          <p className="text-gray-600 text-[11px] mt-1 font-bold  tracking-widest">Browse latest courses</p>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-[#90ee90]/30 transition-all duration-500 shadow-2xl">
      
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden bg-[#111] flex items-center justify-center">
        {!imgError && course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" 
            alt={course.title}
            onError={() => setImgError(true)} 
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <FiImage className="text-white/10" size={48} />
            <span className="text-[10px] text-white/5 font-bold  tracking-[0.2em]">EduNexus Preview</span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <Link to={`/watch/${course.id}`} className="bg-[#90ee90] p-4 rounded-full text-black shadow-xl shadow-[#90ee90]/20 scale-75 group-hover:scale-100 transition-all duration-300">
            <FiPlay size={24} fill="currentColor" />
          </Link>
        </div>
      </div>

      <div className="p-7 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#90ee90] transition-colors line-clamp-2">
            {course.title}
          </h3>
          <p className="text-gray-500 text-[11px] mt-2 font-bold tracking-widest ">By {course.instructor}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
             <span className="text-[10px] font-bold text-gray-600  tracking-widest">Progress</span>
             <span className="text-xs font-bold text-[#90ee90]">{course.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#90ee90] rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <div className="flex justify-end pt-1">
            <Link 
              to={`/watch/${course.id}`} 
              className="text-xs font-bold text-white hover:text-[#90ee90] transition-colors flex items-center gap-2"
            >
              Resume Course <FiPlay size={10} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEnrolledCourses;