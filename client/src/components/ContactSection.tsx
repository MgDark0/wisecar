import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactForm from "./ContactForm";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Luxury Lane", "Beverly Hills, CA 90210"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Sales: (800) 123-4567", "Support: (800) 765-4321"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["sales@wisecars.com", "support@wisecars.com"],
    },
  ];

  return (
    <section id="contact" className="py-24 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-white text-center mb-2">Contact Us</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Have questions about our inventory or services? Our dedicated team is ready to assist you with any inquiries.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-[#121212] rounded-xl p-8 text-center hover:bg-[#1E1E1E] transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold font-montserrat text-white mb-2">{info.title}</h3>
                <p className="text-gray-400">
                  {info.details.map((detail, i) => (
                    <span key={i} className="block">
                      {detail}
                    </span>
                  ))}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="bg-[#121212] rounded-xl p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold font-montserrat text-white mb-6">Send Us A Message</h3>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
