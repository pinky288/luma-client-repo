import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Arif Ahmed",
    role: "Full Stack Developer",
    content: "Luma's courses are incredibly point-to-point. The experience of working with such a modern tech stack was truly exceptional!",
    avatar: "https://i.pravatar.cc/150?u=arif",
    date: "Mar 12, 2026"
  },
  {
    name: "Sara Khan",
    role: "UI/UX Designer",
    content: "There's no better platform in the region to improve design sense. The Neubrutalism theme they teach is just brilliant!",
    avatar: "https://i.pravatar.cc/150?u=sara",
    date: "Feb 28, 2026"
  },
  {
    name: "Tanvir Hasan",
    role: "Next.js Student",
    content: "The mentorship support is what I loved most. Quick solutions to any problem. Highly recommended for serious learners!",
    avatar: "https://i.pravatar.cc/150?u=tanvir",
    date: "Jan 15, 2026"
  },
  {
    name: "Muna Islam",
    role: "MERN Learner",
    content: "Thanks to the project-based learning approach, my confidence has skyrocketed. I'm now building full-stack apps on my own.",
    avatar: "https://i.pravatar.cc/150?u=muna",
    date: "Mar 05, 2026"
  },
  {
    name: "Rakib Hossain",
    role: "Software Engineer",
    content: "Luma’s learning roadmap is perfectly structured. For anyone looking to start their tech journey, this is the best choice.",
    avatar: "https://i.pravatar.cc/150?u=rakib",
    date: "Feb 10, 2026"
  },
  {
    name: "Elena Rodriguez",
    role: "Frontend Specialist",
    content: "The attention to detail in their curriculum is unmatched. It’s not just about coding; it’s about building products that scale.",
    avatar: "https://i.pravatar.cc/150?u=elena",
    date: "Mar 20, 2026"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-black px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20 text-center">
          <h2 className="text-white text-4xl md:text-6xl font-normal mb-6">
            Wall of <span className="text-[#90ee90]">Love</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Don't just take our word for it. Hear from the community of students 
            who have transformed their careers with Luma.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid bg-[#0d0d0d] border border-white/5 p-8 rounded-[2rem] hover:border-[#90ee90]/30 transition-all duration-500 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10"
                />
                <div className="flex-1">
                  <h4 className="text-white text-base font-normal leading-none">{item.name}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.role}</p>
                </div>
                <div className="opacity-20 group-hover:opacity-100 group-hover:text-[#90ee90] transition-all">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </div>
              </div>

              <p className="text-gray-400 text-base font-normal leading-relaxed ">
                "{item.content}"
              </p>

              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                 <span className="text-[10px] text-gray-600  tracking-widest">{item.date}</span>
                 <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[#90ee90]" />
                    <span className="text-[10px] text-[#90ee90]  tracking-widest font-medium">Verified Account</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;