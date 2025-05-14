import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const carLogoRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Add headlight animation
    const addHeadlightGlow = () => {
      if (carLogoRef.current) {
        const headlights = carLogoRef.current.querySelectorAll('rect[fill="#ffdd44"]');
        headlights.forEach(headlight => {
          headlight.setAttribute('filter', 'url(#glow)');
        });
      }
    };

    // Call once after a short delay
    const headlightTimer = setTimeout(addHeadlightGlow, 500);
    
    // Main timer to finish the splash screen
    const timer = setTimeout(() => {
      onFinished();
    }, 3000); // Show splash screen for 3 seconds

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      clearTimeout(headlightTimer);
      clearInterval(interval);
    };
  }, [onFinished]);

  return (
    <motion.div 
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* SVG Filters for effects */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff3333" />
            <stop offset="50%" stopColor="#ff5555" />
            <stop offset="100%" stopColor="#ff9933" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            initial={{ rotate: -10, y: 10 }}
            animate={{ 
              rotate: [0, -5, 0, -5, 0],
              y: [0, 5, 0, 5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop" 
            }}
            className="mr-3"
          >
            <svg 
              ref={carLogoRef}
              width="48" 
              height="48" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sports car body */}
              <path 
                d="M3,12.5 h18 v3 a2,2 0 0 1 -2,2 h-14 a2,2 0 0 1 -2,-2 z" 
                fill="#222" 
                stroke="#ff3333" 
                strokeWidth="1"
              />
              
              {/* Car roof */}
              <path 
                d="M6,12.5 v-3 a1,1 0 0 1 1,-1 h10 a1,1 0 0 1 1,1 v3" 
                fill="#333" 
                stroke="#ccc" 
                strokeWidth="1"
              />
              
              {/* Windows */}
              <path 
                d="M7.5,8.8 v3.7 h9 v-3.7 z" 
                fill="#111" 
                stroke="#44aaff" 
                strokeWidth="0.5"
              />
              
              {/* Wheels */}
              <circle cx="7" cy="17.5" r="2" fill="#333" stroke="#777" />
              <circle cx="17" cy="17.5" r="2" fill="#333" stroke="#777" />
              
              {/* Headlights */}
              <rect x="3.2" y="11.2" width="1.5" height="1" rx="0.5" fill="#ffdd44" />
              <rect x="19.3" y="11.2" width="1.5" height="1" rx="0.5" fill="#ffdd44" />
            </svg>
          </motion.div>
          
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl font-montserrat text-white">
            <span className="text-accent">WISE</span>CARS
          </h1>
        </div>
        
        <p className="text-gray-400 text-lg mb-8">Premium Automotive Experience</p>

        <motion.div 
          className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto relative"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div 
            className="h-full rounded-full"
            style={{ backgroundColor: "#ff3333" }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 0.1,
              ease: progress < 95 ? "easeOut" : "anticipate"
            }}
          />
          
          {/* Loading pulse animation */}
          {progress < 100 && (
            <motion.div
              className="absolute top-0 bottom-0 right-0 w-4 bg-white opacity-30 rounded-full"
              animate={{
                x: [0, 10, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
        
        <p className="text-gray-500 text-sm mt-4">Loading amazing cars for you...</p>
      </motion.div>
      
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center text-gray-600 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        © 2025 WiseCars. All rights reserved.
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;