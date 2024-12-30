import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase authentication method
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import { auth } from './firebase'; // Import Firebase auth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate to redirect to the dashboard

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in with email and password using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // If the login is successful, navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Error logging in: ' + err.message); // Handle errors
    }
  };

  return (
    
    <div className="container d-flex justify-content-center align-items-center min-vh-100 ">
      
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Admin</h2>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-info w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
