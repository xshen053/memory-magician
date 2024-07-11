import React, { useState } from 'react';

const ThresholdSlider = ({ threshold, setThreshold }) => {
  const handleSliderChange = (event) => {
    setThreshold(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Adjust Days</h2>
      <input
        type="range"
        min="0"
        max="100"
        value={threshold}
        onChange={handleSliderChange}
        style={{ width: '60%'}}
      />
      <p>For memories you reviewed in the past {threshold} days, it shows up in step colors</p>
      <p>For memories you haven't reviewed in the past {threshold} days, they are transparent</p>
    </div>
  );
};

export default ThresholdSlider;
