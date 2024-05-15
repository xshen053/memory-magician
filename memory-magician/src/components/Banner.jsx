// src/Banner.js
import React, { useState } from 'react';
import '../css/Banner.css'; // Importing the CSS file for styling

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="banner">
        <button className="close-button" onClick={handleClose}>
          &times; {/* This is a cross symbol for the close button */}
        </button>
        <h1>
          Welcome to Merym! A platform revolutionizes task planning with smart, scientifically-backed scheduling to boost productivity and learning efficiency.
          <br></br>
        </h1>
        <h2>
          <a href="https://docs.google.com/document/d/1b_OJgL8P6szx9_sLAQXc9_NvQHuS7cmdAITq4Y3raa4/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
            Click here to get started!
          </a>
        </h2>
      </div>
    )
  );
};

export default Banner;
