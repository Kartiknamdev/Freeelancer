import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "PeerTask helped me find a programming partner for my final project. Not only did we complete the task successfully, but I also made a great friend who continues to collaborate with me on side projects!",
    author: "Kartik Namdev",
    role: "Student",
    company: "Computer Science",
    rating: 5
  },
  {
    quote: "As someone who struggles with time management, PeerTask has been a lifesaver. I found a peer who helped me organize my study schedule, and in return, I helped them with aptitude problems",
    author: "Durgesh Kumar",
    role: "Student",
    company: "Computer Science",
    rating: 4
  },
  {
    quote: "I needed help creating slides for a marketing presentation. Through PeerTask, I connected with a design student who created amazing visuals for me. The platform made the entire process safe and easy!",
    author: "Priyam",
    role: "Student",
    company: "Computer Science",
    rating: 4
  }
];

const Testimonial = ({ quote, author, role, company, rating }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            size={20}
            className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} mr-1`}
          />
        ))}
      </div>
      
      <p className="text-gray-700 flex-grow italic text-lg mb-6">"{quote}"</p>
      
      <div className="mt-auto">
        <p className="font-semibold text-gray-900">{author}</p>
        <p className="text-gray-600 text-sm">{role}, {company}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      isDesktop 
        ? prev 
        : (prev === testimonials.length - 1 ? 0 : prev + 1)
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      isDesktop 
        ? prev 
        : (prev === 0 ? testimonials.length - 1 : prev - 1)
    );
  };
  
  return (<section id="testimonials" className="relative min-h-screen flex items-center py-24 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-indigo-300 opacity-40 blur-2xl z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500 rounded-full opacity-30 blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-indigo-600 font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            What Students Are Saying
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of students who have used PeerTask
          </p>
        </div>
        
        <div className="relative">
          {/* Mobile Carousel */}
          <div className="block md:hidden">
            <Testimonial {...testimonials[currentSlide]} />
            
            <div className="absolute top-1/2 -translate-y-1/2 -left-4">
              <button 
                onClick={prevSlide}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ChevronLeft size={24} className="text-gray-700" />
              </button>
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 -right-4">
              <button 
                onClick={nextSlide}
                className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50"
              >
                <ChevronRight size={24} className="text-gray-700" />
              </button>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSlide ? 'bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
