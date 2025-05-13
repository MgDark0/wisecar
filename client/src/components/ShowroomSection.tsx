import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";

const ShowroomSection = () => {
  const benefits = [
    "Personalized consultations with our luxury automotive specialists",
    "Test drive your dream car in a variety of driving conditions",
    "Explore customization options to create your perfect vehicle",
    "Complimentary vehicle evaluation and trade-in services",
  ];

  return (
    <section className="py-20 bg-[#121212]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://pixabay.com/get/gd1e38bb1d30fe8c14eebb60e0ffcb6f00c65de58fa0898844d61393e6a0dddb2b99555b76c0eacdb3372dcfda1835e61871c38c88c65a3f7a231a756b05874e2_1280.jpg" 
              alt="Luxury car showroom" 
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white mb-6">Visit Our Showroom</h2>
            <p className="text-gray-300 mb-6">
              Experience our collection in person at our state-of-the-art showroom. Our automotive experts will guide you through our exclusive inventory and help you find the perfect vehicle to match your lifestyle.
            </p>
            <ul className="text-gray-300 space-y-3 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <Check className="text-amber-400 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <Button className="bg-amber-400 hover:bg-yellow-600 text-black font-montserrat uppercase text-sm tracking-wider py-3 px-8 rounded-md transition-colors duration-300">
                Book An Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomSection;
