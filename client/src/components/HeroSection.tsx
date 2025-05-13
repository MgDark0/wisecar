import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
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
          
          {/* Hero car image */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" 
              alt="Luxury sports car" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
