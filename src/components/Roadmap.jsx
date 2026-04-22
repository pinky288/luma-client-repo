import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FiTarget, FiCodesandbox, FiAward, FiBriefcase } from "react-icons/fi";

const steps = [
  {
    title: "Choose a Path",
    desc: "Pick a track that matches your career goals.",
    icon: <FiTarget />,
    stepNum: "01"
  },
  {
    title: "Build Real Projects",
    desc: "Apply skills by creating industry-grade applications.",
    icon: <FiCodesandbox />,
    stepNum: "02"
  },
  {
    title: "Get Certified",
    desc: "Verify your skills with globally recognized certificates.",
    icon: <FiAward />,
    stepNum: "03"
  },
  {
    title: "Land a Job",
    desc: "Access our exclusive hiring network and partners.",
    icon: <FiBriefcase />,
    stepNum: "04"
  }
];

const Roadmap = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"] 
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <div className="mb-20 text-center max-w-2xl">
          <h2 className="text-white text-4xl md:text-6xl font-normal mb-6 leading-tight">
            How to become an <span className="text-[#90ee90]">expert</span>
          </h2>
          <p className="text-gray-400 text-lg font-normal leading-relaxed mx-auto">
            A structured path designed to take you from beginner to an industry-ready professional.
          </p>
        </div>

        <div className="relative w-full max-w-5xl">
          
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full" />
          
          <motion.div 
            style={{ scaleY: scaleY }} 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#90ee90] md:-translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_-2px_#90ee90]"
          />

          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }} 
                transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
                className={`relative flex items-center w-full ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className="ml-16 md:ml-0 md:w-[45%]">
                  <div className="bg-[#0c0c0c]/80 backdrop-blur-sm border border-white/5 p-8 rounded-[2rem] text-white transition-all duration-300 hover:border-[#90ee90]/40 hover:bg-[#111] group shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_-5px_rgba(144,238,144,0.1)]">
                    <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
                        <div className="text-2xl text-[#90ee90]/60 group-hover:text-[#90ee90] transition-colors">{step.icon}</div>
                        <h3 className="text-2xl font-normal text-white leading-none">{step.title}</h3>
                    </div>
                    <p className="text-gray-500 text-sm font-normal leading-relaxed">
                      {step.desc}
                    </p>
                    <span className="absolute -top-3 -left-3 bg-black border border-white/5 text-xs text-gray-600 font-mono w-10 h-10 flex items-center justify-center rounded-xl group-hover:border-[#90ee90]/20 group-hover:text-[#90ee90]">
                      {step.stepNum}
                    </span>
                  </div>
                </div>

                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 box-content">
                  <div className="absolute inset-0 bg-[#90ee90]/20 rounded-full animate-pulse-fast" />
                  <div className="relative w-full h-full bg-black rounded-full border-2 border-[#90ee90] scale-100 shadow-[0_0_10px_#90ee90]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Roadmap;