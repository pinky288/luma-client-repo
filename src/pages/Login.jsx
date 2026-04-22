import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { authcontext } from '../providers/authprovider';
import Swal from 'sweetalert2';

const Login = () => {
  const { googlelogin, loginuser } = useContext(authcontext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    document.title = "luma | login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginuser(email, password);
      Swal.fire({
        title: 'Welcome Back!',
        icon: 'success',
        background: '#0d0d0d',
        color: '#fff',
        confirmButtonColor: '#90ee90'
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        title: 'Login Failed',
        text: 'Invalid credentials. Please try again.',
        icon: 'error',
        background: '#0d0d0d',
        color: '#fff'
      });
    }
  };

  const handleGoogle = async () => {
    try {
      await googlelogin();
      Swal.fire({
        title: 'Success!',
        text: 'Logged in with Google',
        icon: 'success',
        background: '#0d0d0d',
        color: '#fff',
        confirmButtonColor: '#90ee90'
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6 font-normal">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md bg-[#0d0d0d] border border-white/10 p-10 rounded-[2.5rem]">
        <div className="mb-10 text-center text-white">
          <h2 className="text-3xl mb-2">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Sign in to access your dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <input name="email" type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#90ee90]/50" />
          <input name="password" type="password" placeholder="Password" required className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#90ee90]/50" />
          <button className="w-full bg-[#90ee90] text-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all font-medium">
            Login <FiArrowRight />
          </button>
        </form>
        <button onClick={handleGoogle} className="mt-4 w-full border border-white/10 text-white py-4 rounded-2xl hover:bg-white/5 transition-all text-sm">
            Continue with Google
        </button>
        <p className="mt-8 text-center text-gray-500 text-sm">
          New here? <Link to="/register" className="text-[#90ee90] hover:underline">Create account</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;