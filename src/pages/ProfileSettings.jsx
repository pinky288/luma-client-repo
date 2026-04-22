import React, { useContext, useState } from 'react';
import { authcontext } from '../providers/authprovider';
import { updateProfile } from "firebase/auth"; // Firebase থেকে ইমপোর্ট
import { FiCamera, FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi';
import Swal from 'sweetalert2'; 

const ProfileSettings = () => {
  const { user } = useContext(authcontext);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const name = e.target.name.value; 

    try {
      await updateProfile(user, {
        displayName: name
      });
      
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully!',
        icon: 'success',
        confirmButtonColor: '#90ee90',
      });
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white tracking-tight">Account Settings</h1>
        <p className="text-gray-500 text-sm mt-2">Update your profile information and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <div className="lg:col-span-1 flex flex-col items-center text-center">
          <div className="relative">
            <img 
              src={user?.photoURL || "https://i.ibb.co.com/v4t6S3f/user.png"} 
              alt="Profile" 
              className="w-32 h-32 rounded-3xl object-cover border-2 border-white/5 ring-4 ring-[#90ee90]/5"
            />
            <button className="absolute -bottom-2 -right-2 bg-[#90ee90] p-3 rounded-2xl text-black shadow-lg">
              <FiCamera size={18} />
            </button>
          </div>
          <div className="mt-6">
            <h3 className="text-white font-bold text-lg">{user?.displayName}</h3>
            <p className="text-gray-500 text-xs mt-1">Student Account</p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 ml-1 flex items-center gap-2">
                <FiUser size={14} className="text-[#90ee90]" /> Full Name
              </label>
              <input 
                type="text" 
                defaultValue={user?.displayName}
                className="w-full bg-[#0A0A0A] border border-white/5 text-white px-5 py-4 rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#90ee90]/30 transition-all text-sm"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400 ml-1 flex items-center gap-2">
                <FiMail size={14} className="text-[#90ee90]" /> Email Address
              </label>
              <input 
                type="email" 
                value={user?.email}
                disabled
                className="w-full bg-[#050505] border border-white/5 text-gray-500 px-5 py-4 rounded-2xl text-sm cursor-not-allowed"
              />
              <p className="text-[11px] text-gray-600 ml-1">* Email cannot be changed for security reasons.</p>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/5">
              <label className="text-sm font-semibold text-gray-400 ml-1 flex items-center gap-2">
                <FiLock size={14} className="text-[#90ee90]" /> Security
              </label>
              <button 
                type="button"
                className="text-xs text-[#90ee90] font-bold hover:text-white transition-colors"
              >
                Reset Password via Email
              </button>
            </div>

            <div className="pt-6 flex items-center gap-4">
              <button 
                type="submit" 
                className="bg-[#90ee90] text-black font-bold text-sm px-8 py-4 rounded-2xl hover:bg-white transition-all flex items-center gap-2 shadow-lg shadow-[#90ee90]/10"
              >
                Save Changes <FiCheck />
              </button>
              <button 
                type="button"
                className="text-gray-500 text-sm font-bold hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};

export default ProfileSettings;