import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";

const Header = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-primary sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex-shrink-0 cursor-pointer">
            <h1 className="text-2xl font-bold font-montserrat text-white tracking-wider">
              WISE<span className="text-accent">CARS</span>
            </h1>
          </div>
        </Link>

        {/* Main Navigation - Desktop */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  href={link.path}
                  className={`text-white font-montserrat text-sm uppercase tracking-wider font-medium hover:text-amber-400 transition-colors duration-300 ${
                    isActive(link.path) ? "text-amber-400" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Customer Service */}
        <div className="flex items-center space-x-4">
          <Link href="/contact">
            <Button
              variant="ghost"
              className="text-white hover:text-amber-400 transition-colors duration-300 p-1"
              aria-label="Customer Service"
            >
              <Phone className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              variant="secondary"
              className="hidden md:block bg-[#1E1E1E] hover:bg-[#2D3748] text-white text-sm font-montserrat uppercase transition-colors duration-300"
            >
              Support
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 md:hidden text-white"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#121212] border-gray-800">
              <SheetHeader>
                <SheetTitle className="text-white font-montserrat">
                  WISE<span className="text-accent">CARS</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col mt-8 gap-4">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <a
                      className={`text-white font-montserrat text-lg uppercase tracking-wider font-medium hover:text-amber-400 transition-colors duration-300 ${
                        isActive(link.path) ? "text-amber-400" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="mt-4 border-accent text-accent hover:bg-accent hover:text-white"
                >
                  Customer Support
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
