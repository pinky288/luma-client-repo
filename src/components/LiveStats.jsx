import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const Counter = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [motionValue, value, isInView]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={ref}>0</span>;
};

const LiveStats = () => {
  const stats = [
    { label: "students already learning", value: 12000, suffix: "k+" },
    { label: "success rate guaranteed", value: 98, suffix: "%" },
    { label: "expert industry mentors", value: 50, suffix: "+" },
  ];

  return (
    <section className="py-20 bg-black px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* সেন্টার টাইটেল ও প্যারাগ্রাফ (নরমাল ফন্ট) */}
        <div className="mb-14 text-center max-w-2xl">
          <h2 className="text-white text-3xl md:text-5xl font-normal mb-5 leading-tight">
            Real impact in <span className="text-[#90ee90]">numbers</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-normal leading-relaxed">
            We track our success by the growth of our community and the career-defining 
            results our students achieve.
          </p>
        </div>

        {/* কার্ডের উইডথ অনেক কমিয়ে দেওয়া হয়েছে (max-w-4xl) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#90ee90] rounded-[2.5rem] p-8 md:p-12 w-full max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-black">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* সংখ্যাগুলো বড় এবং ক্লিন */}
                <div className="text-5xl md:text-6xl font-normal flex items-baseline leading-none">
                  <Counter value={stat.value} />
                  <span>{stat.suffix}</span>
                </div>
                
                {/* ইমেজের মতো ছোট ডিভাইডার */}
                <div className="w-8 h-[1px] bg-black/20 my-5" />
                
                <p className="text-black/60 text-sm md:text-base font-normal leading-tight max-w-[140px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* ইমেজের সেই হালকা ডেকোরেটিভ সার্কেল */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-black/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStats;