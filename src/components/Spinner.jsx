// Spinner.jsx
import React from 'react';
import './Spinner.css'; // Ensure you create this CSS file

const Spinner = () => {
  return (
    <div className="spinner-container">
        <div className="spinner"></div><br/>
        <h3>Loading...</h3>
    </div>
  );
};

export default Spinner;
