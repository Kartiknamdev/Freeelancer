import React from 'react';
import { Check, Zap, Layers, Users, BarChart, Lock } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Increased Productivity',
      description: 'Automate repetitive tasks and streamline workflows to save valuable time and boost team efficiency.'
    },
    {
      icon: <Layers size={24} />,
      title: 'Centralized Workspace',
      description: 'Keep all your projects, tasks, and communication in one place for seamless collaboration.'
    },
    {
      icon: <Users size={24} />,
      title: 'Team Collaboration',
      description: 'Work together effectively with real-time updates, comments, and shared project views.'
    },
    {
      icon: <BarChart size={24} />,
      title: 'Insightful Analytics',
      description: 'Track progress and identify bottlenecks with comprehensive reports and dashboards.'
    },
    {
      icon: <Check size={24} />,
      title: 'Task Management',
      description: 'Organize tasks with custom fields, priorities, and dependencies to stay on track.'
    },
    {
      icon: <Lock size={24} />,
      title: 'Enterprise Security',
      description: 'Rest easy knowing your data is protected with advanced security features and compliance.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase">Features</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Everything you need to boost productivity
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Horizon provides all the tools you need to organize work, streamline processes, and collaborate effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;