import { useState } from 'react';

const BACKEND_URL = 'http://127.0.0.1:5000';

function App() {
  const [status, setStatus] = useState('Click button 1 to set the cookie.');

  // Step 1: Call backend to set cookie
  const handleSetCookie = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/login`, {
        method: 'POST',
        credentials: 'include', // Must be included to accept cross-origin cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'testuser' }),
      });

      const data = await response.json();
      setStatus(data.message);
    } catch (err) {
      setStatus(err);
    }
  };

  // Step 2: Call backend to verify cookie was saved and sent back
  const handleCheckCookie = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/profile`, {
        method: 'GET',
        credentials: 'include', // Must be included to send the stored cookie back
      });

      const data = await response.json();
      setStatus(data.message);
    } catch (err) {
      setStatus('Error verifying cookie.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px' }}>
      <h1>Cross-Origin Cookie Demo</h1>
      <p>Frontend: <code>http://localhost:5173</code> | Backend: <code>http://127.0.0.1:5000</code></p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSetCookie} style={{ padding: '10px 16px', cursor: 'pointer' }}>
          1. Set Cookie on Backend
        </button>

        <button
          onClick={handleCheckCookie}
          style={{ padding: '10px 16px', marginLeft: '12px', cursor: 'pointer' }}
        >
          2. Verify Cookie
        </button>
      </div>

      <div style={{ marginTop: '24px', padding: '16px', background: '#f4f4f4', borderRadius: '6px' }}>
        <strong>Status:</strong> {status}
      </div>
    </div>
  );
}

export default App;
