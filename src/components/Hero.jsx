import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Framer motion import করুন

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // ... আপনার আগের ক্যানভাস অ্যানিমেশন কোড (একদম একই থাকবে)
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.8; 
        this.speedX = (Math.random() - 0.5) * 1.0; 
        this.speedY = (Math.random() - 0.5) * 1.0;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = '#90ee90'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.strokeStyle = `rgba(144, 238, 144, ${0.4 - distance / 375})`; 
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const init = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 18000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
      resize();
      init();
    });

    resize();
    init();
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  // --- অ্যানিমেশন ভেরিয়েন্ট ডিফাইন করা ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // প্রতিটি ওয়ার্ডের মাঝখানে ০.১ সেকেন্ড গ্যাপ
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 }, // শুরুতে নিচে এবং অদৃশ্য
    visible: {
      opacity: 1,
      y: 0, // নিজের জায়গায় আসবে
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // সুন্দর স্মুথ ease
      },
    },
  };

  // টেক্সটগুলোকে ওয়ার্ডে ভাগ করার ফাংশন
  const splitText = (text) => {
    return text.split(' ').map((word, index) => (
      <motion.span
        key={index}
        className="inline-block" // inline-block জরুরি যাতে ওয়ার্ডগুলো আলাদা অ্যানিমেট হয়
        variants={wordVariants}
      >
        {word}&nbsp; {/* স্পেস বজায় রাখার জন্য */}
      </motion.span>
    ));
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center bg-black overflow-hidden px-6 font-sans">
      
      {/* হাইলাইটেড মোশন ব্যাকগ্রাউন্ড */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />

      {/* মেইন কন্টেন্ট - মোশন কন্টেইনার */}
      <motion.div
        className="relative z-10 max-w-4xl pt-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        
        {/* ক্লিন ব্যাজ - এটিও অ্যানিমেট হবে */}
        <motion.div 
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-[#90ee90] border border-[#90ee90]/20 rounded-md bg-[#90ee90]/5"
            variants={wordVariants}
        >
          Advanced Skill-Sharing Platform
        </motion.div>

        {/* টাইটেল - ওয়ার্ড বাই ওয়ার্ড অ্যানিমেশন */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          {splitText("Learn at the Speed")} <br /> 
          of <span className="text-[#90ee90]">{splitText("Light.")}</span>
        </h1>
        
        {/* সাবটাইটেল - ওয়ার্ড বাই ওয়ার্ড অ্যানিমেশন */}
        <motion.p 
            className="max-w-2xl mx-auto text-lg text-gray-400 mb-12 font-normal leading-relaxed opacity-90"
            variants={wordVariants} // সাবটাইটেল পুরোটা একসাথে আসবে, বা চাইলে splitText ব্যবহার করতে পারেন
        >
          A premium learning experience designed for the modern world. Master high-demand skills with professional instructors.
        </motion.p>
        
        {/* বাটন - এগুলোও হালকা ডিলে দিয়ে আসবে */}
        <motion.div 
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
            variants={containerVariants}
        >
          <motion.button 
            className="w-full sm:w-auto px-10 py-3.5 bg-[#90ee90] text-black font-bold rounded-md text-base hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#90ee90]/10"
            variants={wordVariants}
          >
            Get Started
          </motion.button>
          
          <motion.button 
            className="w-full sm:w-auto px-10 py-3.5 border border-white/20 text-white font-bold rounded-md text-base hover:bg-white/5 transition-all cursor-pointer"
            variants={wordVariants}
          >
            View Courses
          </motion.button>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;