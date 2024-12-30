import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import bisBg from './Assets/bis_bg1.png';
import rollSolveBg from './Assets/roll&solve.jpg';
import crosswordBg from './Assets/crossword.jpg';
import scramble from './Assets/scramble.jpg';
import Login from './login';
import Dashboard from './dashboard';
import RollSolve from './rollsolve';
import BisStandardQuiz from './BisStandardQuiz';
import Scramble from './stdscramble';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  let backgroundImage = bisBg;

  switch (location.pathname) {
    case '/rollsolve':
      backgroundImage = rollSolveBg;
      break;
    case '/bisstandardquiz':
      backgroundImage = crosswordBg;
      break;
    case '/stdscramble':
      backgroundImage = scramble;
      break;
    default:
      backgroundImage = bisBg;
  }

  return (
    <div className="App">
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
          zIndex: -1,
        }}
      ></div>

      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div style={{ position: 'relative', width: '1000px' }}>
          <Routes>
            <Route path="/Navbar" element={<Navbar />} />
            <Route path="/stdscramble" element={<Scramble />} />
            <Route path="/BisStandardQuiz" element={<BisStandardQuiz />} />
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
