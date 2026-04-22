import React, { useEffect, useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPackage, FiCheckCircle, FiShoppingCart, FiSearch, FiCalendar, FiDollarSign, FiHash } from 'react-icons/fi';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { authcontext } from '../providers/authprovider'; 

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  const { user, loading: authLoading } = useContext(authcontext);
  const userEmail = user?.email;

  const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true 
  });

  useEffect(() => {
    const confirmAndFetch = async () => {
      // ইউজারের ইমেইল লোড হওয়া পর্যন্ত অপেক্ষা করবে
      if (authLoading || !userEmail) return;

      setLoading(true);
      try {
        // ১. পেমেন্ট কনফার্মেশন লজিক
        if (sessionId) {
          console.log("Sending sessionId to Backend:", sessionId);
          const response = await axiosSecure.post("/confirm-payment", { sessionId });
          
          if (response.data.success) {
            console.log("Response from Backend:", response.data);
            // সাকসেস হলে URL থেকে কুয়েরি প্যারামিটার সরিয়ে ফেলবে
            navigate('/dashboard/payments', { replace: true });
            
            await Swal.fire({
              icon: 'success',
              title: 'Enrollment Successful!',
              text: 'Welcome to the course community.',
              background: '#111',
              color: '#fff',
              confirmButtonColor: '#90ee90'
            });
            // পেমেন্ট সফল হওয়ার পর সরাসরি ফেচ ফাংশন কল
            await fetchOrders();
            return;
          }
        }

        // ২. পেমেন্ট সেশন না থাকলে বা কনফার্মেশন শেষ হলে সাধারণ ফেচ
        await fetchOrders();

      } catch (err) {
        console.error("Error in Order History:", err.response?.data || err.message);
        setLoading(false);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get(`/orders/${userEmail}`);
        if (Array.isArray(response.data)) {
          setOrders(response.data);
        }
      } catch (fetchErr) {
        console.error("Fetch Orders Error:", fetchErr);
      } finally {
        setLoading(false);
      }
    };

    confirmAndFetch();
  }, [sessionId, userEmail, authLoading, navigate]);

  const filteredOrders = orders.filter(order => 
    order.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#90ee90]/20 border-t-[#90ee90] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 text-white min-h-screen font-sans"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
            <FiPackage className="text-[#90ee90]" /> Purchase <span className="text-[#90ee90]">Logs</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Detailed history of your learning investments.</p>
        </div>

        {orders.length > 0 && (
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Filter by course or ID..." 
              className="w-full bg-[#111] border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#90ee90]/50 transition-all text-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {orders.length > 0 ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="p-6 text-xs tracking-widest text-gray-500 font-bold">
                      <div className="flex items-center gap-2"><FiHash/> Transaction ID</div>
                    </th>
                    <th className="p-6 text-xs tracking-widest text-gray-500 font-bold">Course Details</th>
                    <th className="p-6 text-xs tracking-widest text-gray-500 font-bold">
                      <div className="flex items-center gap-2"><FiCalendar/> Date</div>
                    </th>
                    <th className="p-6 text-xs tracking-widest text-gray-500 font-bold">
                      <div className="flex items-center gap-2"><FiDollarSign/> Price</div>
                    </th>
                    <th className="p-6 text-xs tracking-widest text-gray-500 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-white/[0.03] transition-all group">
                      <td className="p-6">
                        <span className="font-mono text-[11px] text-gray-500 bg-white/5 px-2 py-1 rounded">
                          {order.transactionId?.slice(0, 15)}...
                        </span>
                      </td>
                      <td className="p-6">
                        <div className="font-bold text-white group-hover:text-[#90ee90] transition-colors">
                          {order.courseName}
                        </div>
                      </td>
                      <td className="p-6 text-sm text-gray-400">
                        {new Date(order.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="p-6 font-black text-[#90ee90]">${order.amount}</td>
                      <td className="p-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black bg-green-500/10 text-green-500 border border-green-500/20">
                          <FiCheckCircle /> {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            initial={{ scale: 0.95, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-[#0a0a0a] rounded-[3rem] border border-dashed border-white/10"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <FiShoppingCart className="text-3xl text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Courses Found</h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs text-center">
              Your account ({userEmail}) hasn't participated in any enrollments yet.
            </p>
            <Link to="/courses">
              <button className="px-8 py-4 bg-[#90ee90] text-black font-black rounded-2xl hover:shadow-[0_0_20px_rgba(144,238,144,0.4)] transition-all text-xs tracking-widest">
                Start Learning Now
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OrderHistory;