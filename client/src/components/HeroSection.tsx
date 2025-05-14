import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    {
      url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      alt: "Luxury sports car - Blue Porsche"
    },
    {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      alt: "Luxury sports car - White Ferrari"
    },
    {
      url: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      alt: "Luxury sports car - Lamborghini"
    },
    {
      url: "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80",
      alt: "Luxury sports car - Red Ferrari"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000); // Change image every 4 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);
  return (
    <section className="relative bg-primary pt-12 pb-24 overflow-hidden">
      {/* Hero background effect */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-accent rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="w-full md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-white leading-tight mb-6">
              Experience <span className="text-accent">Luxury</span> On Wheels
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">
              Discover our premium collection of high-performance vehicles designed for those who demand excellence.
            </p>
            <div className="flex space-x-4">
              <Link href="/shop">
                <Button className="bg-accent hover:bg-red-700 text-white font-montserrat uppercase tracking-wider text-sm py-6 px-8 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30">
                  Browse Collection
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent border border-white text-white hover:border-amber-400 hover:text-amber-400 font-montserrat uppercase tracking-wider text-sm py-6 px-8 rounded-md transition-colors duration-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Hero car images with delay effect */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative rounded-lg shadow-2xl overflow-hidden h-[350px] md:h-[400px]">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage}
                  src={images[currentImage].url}
                  alt={images[currentImage].alt}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 1.2,
                    ease: "easeInOut"
                  }}
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent pointer-events-none"></div>
              
              {/* Navigation arrows */}
              <button 
                onClick={() => setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button 
                onClick={() => setCurrentImage(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              
              {/* Image indicator dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentImage === index 
                        ? "bg-amber-500 w-6" 
                        : "bg-white hover:bg-gray-300"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
