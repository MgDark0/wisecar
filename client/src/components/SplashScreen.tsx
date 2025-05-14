import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.5 18L19.5 14H4.5L1.5 18" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 22V21C3 19.8954 3.89543 19 5 19H19C20.1046 19 21 19.8954 21 21V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="6.5" cy="16.5" r="1.5" fill="white"/>
              <circle cx="17.5" cy="16.5" r="1.5" fill="white"/>
              <path d="M5 14L8 7H16L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            className="h-full bg-gradient-to-r from-red-500 via-red-600 to-amber-500 rounded-full"
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