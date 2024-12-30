import React, { useState } from 'react';
import { db } from './firebase'; // Make sure the path is correct
import { query, where, getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import Navbar from './Navbar';  // Import the Navbar component

const RollSolve = () => {
  const [step, setStep] = useState(1);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [error, setError] = useState('');

  // Check if all choices are unique
  const areChoicesUnique = () => {
    const uniqueOptions = new Set(options);
    return uniqueOptions.size === options.length;
  };

  // Validate step based on user input
  const validateStep = () => {
    if (step === 1 && !question.trim()) return 'Please enter a valid question.';
    if (step === 2 && options.some((option) => !option.trim())) return 'Please fill in all choices.';
    if (step === 2 && !areChoicesUnique()) return 'Choices should be unique. Please re-enter.';
    if (step === 3 && !correctAnswer.trim()) return 'Please enter the correct answer.';
    // Check if the correct answer is in the choices
    if (step === 3 && !options.includes(correctAnswer)) return 'Correct answer is not present in the choices.';
    return '';
  };

  const nextStep = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
    } else {
      setError('');
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // Function to handle form submission and store data in Firestore
  const handleSubmit = async () => {
    try {
      // Check if the question already exists in Firestore
      const questionsRef = collection(db, "questions");
      const q = query(questionsRef, where("question", "==", question));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If the question already exists, notify the user
        alert("This question already exists in the database. Please try another question.");
        return;
      }

      // If the question is unique, add it to Firestore
      const docRef = await addDoc(questionsRef, {
        question,
        options,
        correctAnswer,
      });

      console.log("Document written with ID: ", docRef.id);
      alert("Question has been updated successfully!");
      resetForm();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error submitting the form.");
    }
  };

  const handleDeleteAll = async () => {
    try {
      const questionsRef = collection(db, "questions");
      const querySnapshot = await getDocs(questionsRef);

      for (const document of querySnapshot.docs) {
        await deleteDoc(doc(db, "questions", document.id));
      }

      alert("All questions have been deleted successfully.");
    } catch (e) {
      console.error("Error deleting documents: ", e);
      alert("Error deleting the documents.");
    }
  };

  const resetForm = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setStep(1);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center">
        <Navbar padding='1px' />
      </div>

      {/* Step Indicators */}
      <div className="d-flex justify-content-center align-items-center mb-4">
        {[1, 2, 3, 4].map((num, index) => (
          <React.Fragment key={num}>
            {/* Circle */}
            <div
              className={`rounded-circle text-center d-flex align-items-center justify-content-center 
                ${step === num ? 'bg-primary text-white' : 'bg-light border'} 
                me-3`}
              style={{ width: '40px', height: '40px', fontSize: '18px' }}
            >
              {num}
            </div>

            {/* Dashed Line */}
            {index < 3 && ( // Add line only between circles
              <div
                className="dashed-line flex-grow-1 mx-3"
                style={{
                  borderTop: '2px dashed gray',
                  height: '0',
                  width: '100px', // Adjust for longer distance
                }}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Step Content in a Block Box */}
      <div className="border p-4 rounded shadow-sm">
        {step === 1 && (
          <div className="mb-3">
            <p className="h2 text-white"><label htmlFor="question" className="form-label">Enter the Question:</label></p>
            <textarea
              id="question"
              className="form-control"
              rows="4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="h2 text-white"><label className="form-label">Enter Choices:</label></p>
            {options.map((option, index) => (
              <div className="mb-2" key={index}>
                <input
                  type="text"
                  className="form-control"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...options];
                    updatedOptions[index] = e.target.value;
                    setOptions(updatedOptions);
                  }}
                  placeholder={`Choice ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="mb-3">
            <p className="h2 text-white"><label htmlFor="correctAnswer" className="form-label">Enter the Correct Answer:</label></p>
            <input
              type="text"
              id="correctAnswer"
              className="form-control"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              placeholder="Type the correct answer here..."
            />
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="h2 text-white"><h4 className="mb-3">Review Your Details</h4></p>
            {/* Question Box */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Question</h5>
                <p className="card-text">{question}</p>
              </div>
            </div>

            {/* Choices Box */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Choices</h5>
                <ul className="list-group">
                  {options.map((option, index) => (
                    <li className="list-group-item" key={index}>
                      {`Options ${index + 1}: ${option}`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Correct Answer Box */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Correct Answer</h5>
                <p className="card-text">{correctAnswer}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-between mt-4">
          {step > 1 && <button className="btn btn-warning" onClick={prevStep}>Previous</button>}
          {step < 4 && (
            <button
              className="btn btn-info"
              onClick={nextStep}
              disabled={!areChoicesUnique() && step === 2} // Disable Next button if choices are not unique
            >
              Next
            </button>
          )}
          {step === 4 && <button className="btn btn-success" onClick={handleSubmit}>Submit</button>}
        </div>
      </div>            
      <button className="btn btn-danger mt-3" onClick={handleDeleteAll}>To Delete All Document</button>
    </div>
  );
};

export default RollSolve;
