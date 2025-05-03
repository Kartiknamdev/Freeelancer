import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "Horizon has transformed how our team collaborates. We've seen a 30% increase in productivity since implementing it across our organization.",
    author: "Sarah Johnson",
    role: "CTO",
    company: "TechCorp",
    rating: 5
  },
  {
    quote: "The intuitive interface made onboarding a breeze. Our team was up and running in minutes, not days. Highly recommend for any growing business.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "Innovate X",
    rating: 5
  },
  {
    quote: "As a remote team, communication was our biggest challenge. Horizon has bridged that gap, making it feel like we're all in the same room.",
    author: "Emily Rodriguez",
    role: "Head of Operations",
    company: "Remote Co",
    rating: 4
  }
];

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, company, rating }) => {
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

const Testimonials: React.FC = () => {
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
        ? prev // On desktop, show all testimonials
        : (prev === testimonials.length - 1 ? 0 : prev + 1)
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      isDesktop 
        ? prev // On desktop, show all testimonials
        : (prev === 0 ? testimonials.length - 1 : prev - 1)
    );
  };
  
  return (
    <section id="testimonials" className="py-24 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold tracking-wider uppercase">Testimonials</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            What our customers are saying
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what teams like yours have achieved with Horizon.
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