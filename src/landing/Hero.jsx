import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 z-0 animate-fade-in" />
      <div className="absolute top-1/4 right-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-20 w-[35rem] h-[28rem] bg-indigo-300 rounded-full opacity-30 blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-20 pt-28">
          <div className="flex-1 max-w-4xl animate-slide-in-left">
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block mb-1">Students helping Students</span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                Succeed together
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 mb-14">
              PeerTask connects students to complete micro-tasks, earn value, and build a community of mutual support.
            </p>
            <div className="flex flex-wrap gap-8 mb-16">
              <a href="#signup" className="px-10 py-5 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center animate-bounce">
                Get Started <ArrowRight className="ml-4 h-6 w-6" />
              </a>
              <a href="#features" className="px-10 py-5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all transform hover:-translate-y-1">
                Learn More
              </a>
            </div>
            
            <div className="hidden md:block">
              <p className="text-lg text-gray-500 mb-8">Trusted by a community of active users</p>
              <div className="grid grid-cols-3 gap-12">
                <div className="text-gray-600 font-semibold">
                  <div className="text-4xl text-blue-600">100+</div>
                  <div>Active Students</div>
                </div>
                <div className="text-gray-600 font-semibold">
                  <div className="text-4xl text-blue-600">50+</div>
                  <div>Tasks Completed</div>
                </div>
                <div className="text-gray-600 font-semibold">
                  <div className="text-4xl text-blue-600">95%</div>
                  <div>Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 hidden md:block animate-slide-in-right">
            <div className="relative w-full h-[480px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
              <img src="/src/assets/peerwork.png" alt="PeerWork" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
