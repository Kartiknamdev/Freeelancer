import React from 'react';

const ApiInfo = () => {
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #fbc2eb, #a6c0ee)', // Different gradient
    padding: '20px',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.3)', // Slightly different transparency
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(12px)', // Slightly different blur
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.4)', // Slightly different border
    padding: '40px',
    maxWidth: '800px',
    width: '90%',
    color: '#444', // Slightly darker text
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#ff6b6b', // Fun title color
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const subtitleStyle = {
    fontSize: '1.6rem',
    marginBottom: '20px',
    color: '#74b9ff', // Another fun color
    fontStyle: 'italic',
  };

  const paragraphStyle = {
    lineHeight: '1.7',
    marginBottom: '25px',
    color: '#666',
  };

  const codeStyle = {
    backgroundColor: '#f4f4f4',
    color: '#2d3436',
    padding: '15px',
    borderRadius: '8px',
    fontFamily: 'monospace',
    fontSize: '1rem',
    overflowX: 'auto',
    marginBottom: '20px',
  };

  const emphasisStyle = {
    fontWeight: 'bold',
    color: '#e67e22',
  };

  const contactStyle = {
    marginTop: '30px',
    paddingTop: '20px',
    borderTop: '1px dashed #ccc', // Dashed separator for a playful touch
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>The Mysterious PeerTask API (Shhh... It's a Secret!)</h1>
        <p style={subtitleStyle}>
          Welcome, intrepid explorer! You've stumbled upon the legendary gateway to PeerTask's inner workings... or at least, where the sign *should* be for it.
        </p>

        <p style={paragraphStyle}>
          Currently, our API documentation is taking a well-deserved vacation on a remote tropical island, sipping coconut water and probably not answering emails. So, while we don't have the nitty-gritty details for you just yet, here's a sneak peek at what *might* be happening behind the scenes (imagine dramatic, suspenseful music).
        </p>

        <h2 style={{ ...subtitleStyle, fontStyle: 'normal', fontSize: '1.8rem' }}>Rumored Endpoints (Use at Your Own Risk!):</h2>
        <p style={paragraphStyle}>
          Legend has it that whispers of these mystical endpoints echo through the server rooms. Approach with caution and a healthy dose of humor:
        </p>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li style={{ marginBottom: '15px' }}>
            <code>/api/unicorns</code> - Might return a JSON array of our most magical users. (Warning: May contain glitter.)
          </li>
          <li style={{ marginBottom: '15px' }}>
            <code>/api/tasks/pending</code> - Potentially retrieves tasks that are still waiting for their moment to shine. (Handle with care; they might be shy.)
          </li>
          <li style={{ marginBottom: '15px' }}>
            <code>POST /api/highfive/{userId}</code> - We believe this endpoint *could* send a virtual high-five to a user. (Results may vary depending on internet connectivity and user enthusiasm.)
          </li>
          <li style={{ marginBottom: '15px' }}>
            <code>/api/inspiration/random</code> - Said to deliver a random burst of motivational quotes. (Some assembly of wisdom may be required.)
          </li>
        </ul>

        <p style={paragraphStyle}>
          <strong style={emphasisStyle}>Important Note:</strong> These are purely speculative and should not be used in any production environment... unless you're feeling particularly adventurous (and have a good error handling strategy). We take no responsibility for any unexpected unicorn sightings or motivational overload.
        </p>

        <p style={paragraphStyle}>
          Our dedicated team of API archaeologists is diligently working on unearthing the official documentation. We anticipate its grand unveiling sometime in the near future (or when the tropical island's Wi-Fi gets a stable connection).
        </p>

        <div style={contactStyle}>
          <h2 style={{ ...subtitleStyle, fontStyle: 'normal', fontSize: '1.8rem' }}>Stay Tuned!</h2>
          <p style={paragraphStyle}>
            Keep an eye out for updates! In the meantime, feel free to ponder the mysteries of our API and perhaps even dream up your own endpoints. If you have any *serious* inquiries, please contact our support team at <a href="mailto:support@peertask.com" style={{ color: '#007bff', textDecoration: 'underline' }}>support@peertask.com</a>. They might not know about the unicorns, but they can help with other things.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiInfo;