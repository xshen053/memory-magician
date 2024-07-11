import HeatMap from '../components/MemoryHeapMap'
import React, { useState, useEffect } from 'react';
import ThresholdSlider from '../components/ThresholdSlider'
const MemoryHeatMapScreen = () => {
  const [threshold, setThreshold] = useState(14);
  const [totalMemoryCount, setTotalMemoryCount] = useState();
  const [thresholdMemoryCount, setThreSholdTotalMemoryCount] = useState();
  const [neverReviewedMemoryCount, setNeverReviewedMemoryCount] = useState();

  return (
    <div>
      <ThresholdSlider threshold={threshold} setThreshold={setThreshold} />
      <HeatMap threshold={threshold} setTotalMemoryCount={setTotalMemoryCount} setThreSholdTotalMemoryCount={setThreSholdTotalMemoryCount} setNeverReviewedMemoryCount={setNeverReviewedMemoryCount}/>
      <p>
      you reviewed {(100 * thresholdMemoryCount / totalMemoryCount).toFixed(2)}% of your general memories ({thresholdMemoryCount} / {totalMemoryCount}) in the past {threshold} days
      </p>
      <p>
      {(100 * (totalMemoryCount - thresholdMemoryCount) / totalMemoryCount).toFixed(2)}% of memories haven't been reviewed in the past {threshold} days
      </p>
      <p>
      { neverReviewedMemoryCount } memories have never been reviewed since added
      </p>
      </div>
    )
}

export default MemoryHeatMapScreen
