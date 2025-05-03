import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0" />
      
      {/* Decorative circles */}
      <div className="absolute top-40 right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl" />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Simplify your workflow</span>
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Maximize productivity
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
              Horizon helps teams organize projects, streamline processes, and increase productivity with powerful, easy-to-use tools.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a 
                href="#features" 
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all transform hover:-translate-y-1"
              >
                Learn More
              </a>
            </div>
            
            <div className="pt-6">
              <p className="text-sm text-gray-500 mb-2">Trusted by innovative companies</p>
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-gray-400 font-semibold">ACME Inc.</div>
                <div className="text-gray-400 font-semibold">TechCorp</div>
                <div className="text-gray-400 font-semibold">Innovate X</div>
                <div className="text-gray-400 font-semibold">FutureLabs</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 hidden md:block">
            <div className="relative w-full h-[400px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="absolute top-0 w-full h-12 bg-gray-100 flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              <div className="pt-12 p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-blue-50 rounded-lg p-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-md mb-2"></div>
                      <div className="h-2 bg-blue-100 rounded w-2/3"></div>
                      <div className="h-2 bg-blue-100 rounded w-1/2 mt-2"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 h-10 bg-blue-50 rounded-lg"></div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="h-32 bg-blue-50 rounded-lg"></div>
                  <div className="h-32 bg-blue-50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;