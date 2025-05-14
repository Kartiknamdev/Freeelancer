import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At PeerTask, we value your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information.
        </p>
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <p className="mb-4">
          We may collect information such as your name, email address, and usage data to improve our services.
        </p>
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="mb-4">
          Your information is used to provide and enhance our services, communicate with you, and ensure platform security.
        </p>
        <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal information. Contact us at privacy@peertask.com for assistance.
        </p>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions about our Privacy Policy, please contact us at privacy@peertask.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
