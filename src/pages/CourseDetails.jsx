import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FiPlay, FiBook, FiClock, FiStar, FiCheckCircle, FiX, FiCreditCard } from 'react-icons/fi';
import { authcontext } from '../providers/authprovider';
import Swal from 'sweetalert2';

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useContext(authcontext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (course?.title) {
      document.title = `${course.title} | Luma Learning`;
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        <p className="animate-pulse text-[#90ee90]">Course not found or loading...</p>
      </div>
    );
  }

  const handleConfirmEnrollment = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch('https://luma-server.vercel.app/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          course: course,
          userEmail: user?.email 
        }),
      });

      const session = await response.json();

      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error(session.error || "Failed to create checkout session");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire({
        title: 'Payment Failed',
        text: error.message || 'Something went wrong while connecting to Stripe.',
        icon: 'error',
        background: '#0d0d0d',
        color: '#fff'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEnrollClick = () => {
    if (!user) {
      Swal.fire({
        title: 'Login Required',
        text: 'Please login first to enroll in this course.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#90ee90',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now',
        background: '#0d0d0d',
        color: '#fff'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="py-20 text-white min-h-screen bg-black">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Side: Course Info */}
          <div className="lg:col-span-2">
            <span className="text-[#90ee90] text-sm font-medium mb-4 block uppercase tracking-widest">{course?.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{course?.title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-gray-400 text-sm">
              <span className="flex items-center gap-2"><FiStar className="text-yellow-500"/> 4.8 (2.5k reviews)</span>
              <span className="flex items-center gap-2"><FiBook className="text-[#90ee90]"/> {course?.modules || 12} modules</span>
              <span className="flex items-center gap-2"><FiClock className="text-[#90ee90]"/> {course?.duration || "8h 45m"} total</span>
            </div>

            <div className="aspect-video bg-[#0d0d0d] rounded-2xl border border-white/5 overflow-hidden mb-10 group relative">
              <img src={course?.thumbnail} className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" alt={course?.title} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <button className="w-20 h-20 bg-[#90ee90] rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_rgba(144,238,144,0.3)]">
                   <FiPlay size={30} fill="currentColor" />
                 </button>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">About this course</h2>
              <p className="text-gray-400 leading-relaxed text-lg">{course?.description}</p>
            </div>

            {course?.learningPoints && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learningPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5 group hover:border-[#90ee90]/30 transition-all">
                      <FiCheckCircle className="text-[#90ee90] shrink-0" />
                      <span className="text-sm text-gray-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#0d0d0d] border border-white/5 p-8 rounded-3xl sticky top-28 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-4xl font-black text-white">${course?.price}</h3>
                 <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400 font-mono">BEST PRICE</span>
              </div>
              
              <button 
                onClick={handleEnrollClick}
                className="w-full bg-[#90ee90] text-black py-4 rounded-xl font-black hover:bg-white transition-all mb-4 cursor-pointer uppercase tracking-tighter shadow-lg shadow-[#90ee90]/10 active:scale-95">
                Enroll Now
              </button>
              
              <p className="text-center text-[10px] text-gray-500 mb-8 font-medium">30-day money-back guarantee • Secure Checkout</p>
              
              <div className="space-y-4 pt-6 border-t border-white/5">
                <p className="text-sm font-bold uppercase text-gray-300 tracking-wider">This course includes:</p>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <FiCheckCircle className="text-[#90ee90]" /> Full lifetime access
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <FiCheckCircle className="text-[#90ee90]" /> Certificate of completion
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <FiCheckCircle className="text-[#90ee90]" /> Support from instructors
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            onClick={() => setShowModal(false)} 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
          />
          
          <div className="bg-[#0d0d0d] border border-white/10 w-full max-w-xl rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl z-10 animate-in fade-in zoom-in duration-300">
            
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors">
              <FiX size={24} />
            </button>
            
            <div className="mb-10 text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#90ee90]/10 border border-[#90ee90]/20 flex items-center justify-center mb-6 mx-auto">
                 <FiCreditCard className="text-[#90ee90]" size={32} />
              </div>
              <h2 className="text-3xl font-black text-white mb-2 leading-tight uppercase tracking-tighter">Confirm Enrollment</h2>
              <p className="text-gray-500 text-sm">Review your course details before we proceed to secure payment.</p>
            </div>
            
            <div className="bg-white/5 border border-white/5 rounded-3xl p-6 mb-10">
              <div className="flex justify-between items-start mb-4">
                <div className="max-w-[70%]">
                    <p className="text-[10px] text-[#90ee90] font-bold mb-1 uppercase tracking-widest">{course?.category}</p>
                    <h4 className="text-xl font-bold text-white leading-tight">{course?.title}</h4>
                </div>
                <p className="text-2xl font-black text-white">${course?.price}</p>
              </div>
              <div className="border-t border-white/5 mt-5 pt-5 flex justify-between items-center text-xs text-gray-500 uppercase font-bold tracking-widest">
                 <span>Subtotal</span>
                 <span className="text-white">${course?.price}.00</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setShowModal(false)}
                className="w-full bg-white/5 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm cursor-pointer border border-white/5">
                Maybe Later
              </button>
              <button 
                onClick={handleConfirmEnrollment}
                disabled={isProcessing}
                className="w-full bg-[#90ee90] text-black py-4 rounded-2xl font-black hover:bg-white transition-all text-sm cursor-pointer shadow-lg shadow-[#90ee90]/20 disabled:opacity-50 disabled:cursor-not-allowed">
                {isProcessing ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
            
            <p className="text-center text-[10px] text-gray-600 mt-8 font-medium">
                🔒 Secure transaction powered by Stripe. Your data is 100% safe.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;