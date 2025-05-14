// import React from 'react';
// import { Check, Zap, Layers, Users, BarChart, Lock } from 'lucide-react';

// const Feature = ({ icon, title, description }) => {
//   return (
//     <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
//       <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
//         {icon}
//       </div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// };

// const Features = () => {
//   const features = [ /* ...same feature objects... */ ];

//   return (
//     <section id="features" className="py-24 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-16">
//           <span className="text-blue-600 font-semibold tracking-wider uppercase">Features</span>
//           <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Everything you need to boost productivity</h2>
//           <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
//             Horizon provides all the tools you need to organize work, streamline processes, and collaborate effectively.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <Feature
//               key={index}
//               icon={feature.icon}
//               title={feature.title}
//               description={feature.description}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Features;

import React, { useState } from 'react';

const featureData = [
  {
    id: 1,
    title: 'Create & Find Tasks',
    description: 'Easily post tasks you need help with or browse available tasks that match your skills and interests.',
    icon: '📝',
  },
  {
    id: 2,
    title: 'Earn Value',
    description: 'Complete tasks to earn points, value, or payments, building your reputation in the process.',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Return the Favor',
    description: 'Help others with their tasks, creating a supportive community network of shared knowledge and assistance.',
    icon: '🤝',
  },
  {
    id: 4,
    title: "Build Your Profile",
    description: "Showcase your skills and completed tasks to build a trusted reputation in the PeerTask community.",
    icon: "👤",
    color: "lavender"
  },
  {
    id: 5,
    title: "Secure Transactions",
    description: "Our platform ensures secure interactions and fair exchanges for all participants.",
    icon: "🔒",
    color: "var(--secondary-600)"
  },
  {
    id: 6,
    title: "Connect & Collaborate",
    description: "Find like-minded students to form study groups and long-term collaborative experience.",
    icon: "🔄",
    color: "snow"
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section id="features" className="relative min-h-screen flex items-center py-24 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-200 opacity-30 blur-2xl z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-400 rounded-full opacity-20 blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-blue-600 font-semibold tracking-wider uppercase">FEATURES</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Explore the key features of our platform
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to connect, collaborate, and succeed in your academic journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-in-up">
          {featureData.map((feature) => (
            <div
              key={feature.id}
              className={`relative bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                activeFeature === feature.id ? 'border-2 border-blue-600' : ''
              }`}
              onMouseEnter={() => setActiveFeature(feature.id)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`flex items-center space-x-4`}>
                <div className={`flex items-center justify-center w-12 h-12 rounded-lg text-2xl bg-blue-600 bg-opacity-10 animate-pulse`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default React.memo(Features);
