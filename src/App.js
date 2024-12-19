import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation for conditional rendering
import 'bootstrap/dist/css/bootstrap.min.css';
import bisBg from './Assets/bis_bg1.png'; 
import rollSolveBg from './Assets/roll&solve.jpg';  // Add the roll&solve background image import
import Login from './login';
import Dashboard from './dashboard';  
import RollSolve from './rollsolve';
import BisStandardQuiz from './BisStandardQuiz'; 
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Separate component to manage content and background logic
function AppContent() {
  const location = useLocation(); 
  let backgroundImage = bisBg;  // Default to bis_bg1.png for login and dashboard
  if (location.pathname === '/rollsolve') {
    backgroundImage = rollSolveBg;  // Use roll&solve.jpeg for the rollsolve page
  }

  return (
    <div className="App">
      {/* Conditionally render the background image for different pages */}
      <div 
        className="d-flex justify-content-center align-items-center" 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          height: '100vh',
          width: '100%',
          filter: 'blur(15px)',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      ></div>

      {/* Routes */}
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div style={{ position: 'relative', width: '1000px' }}>
          <Routes>
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/BisStandardQuiz" element={<BisStandardQuiz />} /> {/* Ensure correct path and component name */}
            <Route path="/rollsolve" element={<RollSolve />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
