import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does the 14-day free trial work?',
    answer: 'You can sign up for a free 14-day trial of any plan with no credit card required. At the end of your trial, you can choose to subscribe or your account will automatically switch to our free plan with limited features.'
  },
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect immediately, and we'll prorate any payments.'
  },
  {
    question: 'Is there a limit to how many projects I can create?',
    answer: 'No, all plans come with unlimited projects. The main differences between plans are the number of users, storage space, and access to advanced features.'
  },
  {
    question: 'Do you offer discounts for non-profits or educational institutions?',
    answer: 'Yes, we offer special pricing for eligible non-profits, educational institutions, and open source projects. Please contact our sales team for more information.'
  },
  {
    question: 'How secure is my data?',
    answer: 'We take security seriously. All data is encrypted in transit and at rest, we perform regular security audits, and we're compliant with major security standards including SOC 2 and GDPR.'
  },
  {
    question: 'Can I import data from other tools?',
    answer: 'Yes, Horizon offers seamless import functionality from popular tools including Asana, Trello, Jira, and others. Our support team can assist with complex migrations.'
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase">FAQ</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Find answers to common questions about Horizon.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full text-left py-4 px-6 flex justify-between items-center focus:outline-none bg-white"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;