import React from 'react';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-icon"></div>
      {/* <p className="loading-text">Loading...</p> */}
    </div>
  );
};

export default Spinner;
