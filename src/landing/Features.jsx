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
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <div className="relative bg-gradient-to-b from-transparent to-white/50">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-neutral-900 mb-4">Features</h2>
        <p className="text-neutral-600 text-lg">Explore the key features of our platform.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {featureData.map((feature) => (
          <div
            key={feature.id}
            className={`p-6 h-full transition-all cursor-pointer relative overflow-hidden ${
              activeFeature === feature.id ? 'translate-y-[-5px] shadow-lg' : ''
            }`}
            onMouseEnter={() => setActiveFeature(feature.id)}
          >
            <div
              className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform ${
                activeFeature === feature.id ? 'scale-x-100' : 'scale-x-0'
              } origin-left transition-transform`}
            ></div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full mb-6 text-white text-2xl shadow-md">
              {feature.icon}
            </div>
            <h3 className="text-xl mb-4 text-neutral-800">{feature.title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Features);
