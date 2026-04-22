import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiReactjsLine, 
  RiNextjsLine, 
  RiTailwindCssFill, 
  RiNodejsLine 
} from "react-icons/ri";
import { 
  SiMongodb, 
  SiFramer, 
  SiFirebase, 
  SiExpress, 
  SiVite, 
  SiJavascript 
} from "react-icons/si";

const TechMarquee = () => {
  const techs = [
    { name: "React", icon: <RiReactjsLine /> },
    { name: "Next.js", icon: <RiNextjsLine /> },
    { name: "Tailwind", icon: <RiTailwindCssFill /> },
    { name: "Node.js", icon: <RiNodejsLine /> },
    { name: "MongoDB", icon: <SiMongodb /> },
    { name: "Express", icon: <SiExpress /> },
    { name: "Framer", icon: <SiFramer /> },
    { name: "Firebase", icon: <SiFirebase /> },
    { name: "Vite", icon: <SiVite /> },
    { name: "JavaScript", icon: <SiJavascript /> },
  ];

  const duplicatedTechs = [...techs, ...techs, ...techs]; 

  return (
    <section className="py-20 bg-black overflow-hidden border-y border-white/5 relative">
      
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="text-4xl md:text-6xl font-bold text-white mb-6">
          Tools you will <span className="text-[#90ee90]">
            <br />master</span>
        </p>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="relative flex items-center">
        {/* Infinite Scroll Container */}
        <motion.div
          className="flex whitespace-nowrap gap-16 md:gap-24 items-center"
          animate={{ x: ["0%", "-33.33%"] }} 
          transition={{
            ease: "linear",
            duration: 30, 
            repeat: Infinity,
          }}
        >
          {duplicatedTechs.map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 text-gray-500 hover:text-[#90ee90] transition-colors duration-300"
            >
              <span className="text-4xl md:text-5xl">
                {tech.icon}
              </span>
              <span className="text-lg md:text-xl font-normal">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechMarquee;