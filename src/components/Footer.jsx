import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import Loge from '../assets/luma_Logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 pt-24 pb-12 w-full">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <img src={Loge} alt="luma logo" className="h-10 w-auto" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of creators and developers with professional-grade courses.
            </p>
          </div>

          {/* Links Section 1 */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[#90ee90] text-sm font-semibold">Platform</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li className="hover:text-[#90ee90] cursor-pointer transition-colors">Browse Courses</li>
              <li className="hover:text-[#90ee90] cursor-pointer transition-colors">Mentors</li>
              <li className="hover:text-[#90ee90] cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>

          {/* Links Section 2 */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[#90ee90]  text-sm font-semibold">Company</h3>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li className="hover:text-[#90ee90] cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-[#90ee90] cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-[#90ee90] cursor-pointer transition-colors">Blog</li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="flex flex-col gap-5">
            <h3 className="text-[#90ee90]  text-sm font-semibold">Join our newsletter</h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter email"
                  className="bg-[#0d0d0d] border border-white/10 rounded-md px-4 py-2 text-sm text-white focus:border-[#90ee90] outline-none w-full transition-all"
                />
                <button className="bg-[#90ee90]  text-black px-5 py-2 rounded-md font-bold text-xs hover:bg-white transition-colors">
                  Join
                </button>
              </div>
              <div className="flex gap-5 mt-2 text-gray-500">
                <FiTwitter className="hover:text-white cursor-pointer transition-colors" size={18} />
                <FiGithub className="hover:text-white cursor-pointer transition-colors" size={18} />
                <FiLinkedin className="hover:text-white cursor-pointer transition-colors" size={18} />
                <FiMail className="hover:text-white cursor-pointer transition-colors" size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-6">
          <p className="text-[12px] text-gray-600 text-center">
            © 2026 Luma Learning Platform. All rights reserved.
          </p>
          <div className="flex gap-8 text-[12px] text-gray-600">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;