import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { authcontext } from '../providers/authprovider';
import Swal from 'sweetalert2';

const Register = () => {
  const { createuser, updateuserprofile, logout } = useContext(authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "luma | register";
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    try {
      // ১. ইউজার তৈরি করা
      await createuser(email, password);
      // ২. নাম এবং ছবি আপডেট করা
      await updateuserprofile(name, photo);
      // ৩. অটো-লগইন বন্ধ করতে লগআউট
      await logout();

      Swal.fire({
        title: 'Success!',
        text: 'Account created. Please login now.',
        icon: 'success',
        background: '#0d0d0d',
        color: '#fff',
        confirmButtonColor: '#90ee90'
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        background: '#0d0d0d',
        color: '#fff'
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 font-normal py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-[#0d0d0d] border border-white/10 p-10 rounded-[2.5rem]">
        <div className="mb-10 text-center text-white">
          <h2 className="text-3xl mb-2">Create Account</h2>
          <p className="text-gray-500 text-sm">Join luma and start your journey</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          <input name="name" type="text" placeholder="Full Name" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#90ee90]/50" />
          <input name="email" type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#90ee90]/50" />
          <input name="photo" type="text" placeholder="Profile Photo URL" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#90ee90]/50" />
          <input name="password" type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#90ee90]/50" />
          <button type="submit" className="w-full bg-[#90ee90] text-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all cursor-pointer font-medium">
            Get Started <FiArrowRight />
          </button>
        </form>
        <p className="mt-8 text-center text-gray-500 text-sm">
          Already a member? <Link to="/login" className="text-[#90ee90] hover:underline">Sign in here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;