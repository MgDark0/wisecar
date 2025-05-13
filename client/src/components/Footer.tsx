import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
    { name: "About Us", path: "/about" },
    { name: "Financing", path: "/financing" },
  ];

  const services = [
    { name: "New Vehicles", path: "/shop" },
    { name: "Financing Options", path: "/financing" },
    { name: "Vehicle Customization", path: "/customization" },
    { name: "Extended Warranty", path: "/warranty" },
    { name: "Premium Support", path: "/support" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" },
  ];

  return (
    <footer className="bg-[#121212] pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold font-montserrat text-white mb-6">
              WISE<span className="text-accent">CARS</span>
            </h3>
            <p className="text-gray-400 mb-6">
              Providing exceptional luxury automotive experiences since 2005. Our passion is connecting discerning clients with their dream vehicles.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  aria-label={`Visit our ${social.icon.name} page`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-montserrat text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.path}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-montserrat text-white mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    href={service.path}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold font-montserrat text-white mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates on new arrivals and special offers.
            </p>
            <form className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-[#1E1E1E] border border-[#2D3748] rounded-l-md px-4 py-2 text-white focus:ring-amber-400 placeholder-gray-500 flex-grow"
              />
              <Button type="submit" className="bg-accent hover:bg-red-700 text-white px-4 py-2 rounded-r-md transition-colors duration-300">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <Separator className="bg-gray-800" />
        
        <div className="pt-8 mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} WISECARS. All rights reserved. Designed with precision and luxury in mind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
