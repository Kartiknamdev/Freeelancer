import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info + Social Icons */}
          <div className="col-span-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              Horizon
            </div>
            <p className="text-gray-400 max-w-xs">
              Simplifying productivity and collaboration for teams of all sizes.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Product, Resources, Company Links */}
          {/* ...same as your original JSX */}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Horizon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
