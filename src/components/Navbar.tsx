import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Horizon
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">
              Testimonials
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </a>
            <a 
              href="#contact" 
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 mt-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </a>
            <a
              href="#contact"
              className="block px-3 py-2 bg-blue-600 text-white rounded-md flex items-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;