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
      alert(result.message || "JSON file uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
    <h1 className="text-center mb-4">Upload JSON File</h1>
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
