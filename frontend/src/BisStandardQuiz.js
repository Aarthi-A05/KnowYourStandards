import React, { useState } from "react";

function BisStandardQuiz() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      alert("Please upload a JSON file.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await fetch("http://localhost:5000/upload-json", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message || "JSON file uploaded and crossword generated successfully!");
  
        // Now that the JSON file is uploaded, we can call /get_crossword_data to generate crossword
        const crosswordResponse = await fetch("http://localhost:5000/get_crossword_data");
        const crosswordData = await crosswordResponse.json();
  
        if (crosswordResponse.ok) {
          console.log("Fetched Crossword Data:", crosswordData);
          // You can now update the UI or state with the crossword data
        } else {
          alert("Failed to fetch crossword data.");
        }
  
      } else {
        alert(result.error || "Failed to upload file.");
      }
  
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };
  
  
  

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '800px' }}>
    <h1 className="text-center mb-4 ">Upload Word-Clue Pair as JSON File</h1>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Select JSON File:</label>
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          required
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Upload</button>
    </form>
  </div>
</div>

  );
}

export default BisStandardQuiz;
