import React from 'react';

const Cookies = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #a8edea, #fed6e3)',
    padding: '20px', // Add some padding around the main container
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    padding: '40px',
    maxWidth: '900px', // Slightly wider for more content
    width: '100%',
    color: '#333',
  };

  const titleStyle = {
    fontSize: '2.8rem', // Slightly larger title
    fontWeight: 'bold',
    marginBottom: '25px',
    color: '#6c5ce7',
    textAlign: 'center',
  };

  const sectionTitleStyle = {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '15px',
    color: '#00b894',
  };

  const paragraphStyle = {
    lineHeight: '1.7', // Improved line height for readability
    marginBottom: '20px',
    color: '#555',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '25px',
    marginBottom: '20px',
  };

  const listItemStyle = {
    marginBottom: '10px',
    color: '#555',
  };

  const contactStyle = {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)', // Subtle separator
  };

  const emphasisStyle = {
    fontWeight: 'bold',
    color: '#e84118', // Highlight important terms
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Our Use of Cookies</h1>
        <p style={paragraphStyle}>
          At PeerTask, we are committed to providing you with a seamless and personalized experience. To achieve this, we utilize <strong style={emphasisStyle}>cookies</strong> and similar tracking technologies. This Cookies Policy provides detailed information about what these technologies are, how we use them, and how you can manage your preferences.
        </p>

        <h2 style={sectionTitleStyle}>What Are Cookies?</h2>
        <p style={paragraphStyle}>
          Cookies are small text files that websites place on your computer or mobile device when you browse. These files allow the website to remember your actions and preferences (such as login details, language, font size, and other display preferences) over a period, so you don’t have to keep re-entering them whenever you come back to the site or browse from one page to another.
        </p>

        <h2 style={sectionTitleStyle}>Types of Cookies We Use</h2>
        <p style={paragraphStyle}>We use various types of cookies to enhance your experience:</p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong style={emphasisStyle}>Strictly Necessary Cookies:</strong> These cookies are essential for the operation of our website. They enable you to log in, navigate the site, and use its features. Without these cookies, services you have asked for, like shopping baskets or e-billing, cannot be provided.
          </li>
          <li style={listItemStyle}>
            <strong style={emphasisStyle}>Performance/Analytics Cookies:</strong> These cookies collect anonymous information about how visitors use our website, such as which pages they visit most often and if they get error messages. This data helps us to improve the performance of our website. We may use third-party analytics providers for this purpose.
          </li>
          <li style={listItemStyle}>
            <strong style={emphasisStyle}>Functionality Cookies:</strong> These cookies allow our website to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personal features. They may also be used to provide services you have asked for, such as watching a video or commenting on a blog.
          </li>
          <li style={listItemStyle}>
            <strong style={emphasisStyle}>Targeting/Advertising Cookies:</strong> These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement as well as help measure the effectiveness of the advertising campaigns. They are usually placed by advertising networks with the website operator’s permission. They remember that you have visited a website and this information is shared with other organizations such as advertisers.
          </li>
        </ul>

        <h2 style={sectionTitleStyle}>Third-Party Cookies</h2>
        <p style={paragraphStyle}>
          Please note that third parties (including, for example, advertising networks and providers of external services like web traffic analysis services) may also use cookies, over which we have no control. These cookies are likely to be analytical/performance cookies or targeting cookies. We encourage you to review the privacy policies of these third-party services to understand their practices.
        </p>

        <h2 style={sectionTitleStyle}>Managing Your Cookie Preferences</h2>
        <p style={paragraphStyle}>
          You have the right to control and manage your cookie preferences.
        </p>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong style={emphasisStyle}>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can typically find these settings in the "Options," "Preferences," or "Tools" menu of your browser. You can configure your browser to block all cookies, accept only certain cookies, or notify you before a cookie is placed. Please note that blocking all cookies may impact your ability to access certain parts of our website or use its full functionality.
          </li>
          <li style={listItemStyle}>
            <strong style={emphasisStyle}>Our Cookie Consent Tool:</strong> We may provide a specific cookie consent tool on our website that allows you to customize your preferences for non-essential cookies. You can usually access and modify these settings at any time.
          </li>
        </ul>

        <h2 style={sectionTitleStyle}>Updates to This Policy</h2>
        <p style={paragraphStyle}>
          We may update this Cookies Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically for any updates. The date of the latest revision will be indicated at the top of the policy.
        </p>

        <div style={contactStyle}>
          <h2 style={sectionTitleStyle}>Contact Us</h2>
          <p style={paragraphStyle}>
            If you have any questions about our Cookies Policy or our use of cookies, please do not hesitate to contact us at <a href="mailto:support@peertask.com" style={{ color: '#007bff', textDecoration: 'underline' }}>support@peertask.com</a> or through our contact form available on the website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;