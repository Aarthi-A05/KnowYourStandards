import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

const Navbar = ({ padding = '10px' }) => {
  const navigate = useNavigate(); // Get the navigate function

  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard page
  };

  return (
    <div style={{ position: 'absolute', top: padding, left: padding }}>
      <button
        className="btn btn-warning"
        onClick={handleBackToDashboard}
        style={{ padding: '1px 1px' }}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Navbar;
