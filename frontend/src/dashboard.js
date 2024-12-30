import React from 'react';
import { Link } from 'react-router-dom';

// Import your images
import image1 from './Assets/crossword.jpg';
import image2 from './Assets/knowledgequiz.jpg';
import image3 from './Assets/markitright.jpg';
import image4 from './Assets/roll&solve.jpg';
import image5 from './Assets/scramble.jpg';
import image6 from './Assets/smartbuzzer.jpg';

function Dashboard() {
  return (
    <div className="container mt-5">
      <p className="h1 text-center fs-1 mb-4">BIS Standard Games</p>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card text-center">
            <Link to="/bisstandardquiz">
              <img
                src={image1}
                className="card-img-top img-fluid"
                alt="BIS Standard Quiz"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">BIS Standard Quiz</h5>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-center">
            <Link to="/page2">
              <img
                src={image2}
                className="card-img-top img-fluid"
                alt="Knowledge Quiz"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">BIS Knowledge Quiz</h5>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-center">
            <Link to="/page3">
              <img
                src={image3}
                className="card-img-top img-fluid"
                alt="Mark It Right"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Mark It Right</h5>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-center">
            <Link to="/rollsolve">
              <img
                src={image4}
                className="card-img-top img-fluid"
                alt="Roll & Solve"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Roll & Solve</h5>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-center">
            <Link to="/stdscramble">
              <img
                src={image5}
                className="card-img-top img-fluid"
                alt="Standards Scramble"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Standards Scramble</h5>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-center">
            <Link to="/page6">
              <img
                src={image6}
                className="card-img-top img-fluid"
                alt="Buzzer Rush"
                style={{ height: '200px', objectFit: 'cover' }}
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">Buzzer Rush</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
