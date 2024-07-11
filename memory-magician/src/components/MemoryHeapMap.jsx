import '../css/HeatMap.css';
import { useMemory } from "../context/MemoryContext.jsx";
import React, { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { fetchCards } from '../utilities/apis/cardAPI.js';
import ThresholdSlider from './ThresholdSlider.jsx';

/* Help Functions*/

/**
 * Calculate day gaps based on input 2 dates
 * @param {*} utcDateStr1 
 * @param {*} utcDateStr2 
 * @returns 
 */
function calculateDayGap(utcDateStr1, utcDateStr2) {
  // Parse the dates into Date objects
  let date1 = new Date(utcDateStr1);
  let date2 = new Date(utcDateStr2);
  date1.setHours(0, 0, 0, 0);
  date2.setHours(0, 0, 0, 0);
  console.log(utcDateStr1)
  console.log("hey")
  console.log(utcDateStr2)
  if (utcDateStr1 === null) {
    return -1
  }    

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = date2 - date1;

  // Convert milliseconds to days and round the result
  const differenceInDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return differenceInDays;
}

  /**
   * Generate an array of steps colors from a gradient
   * @param {*} startColor 
   * @param {*} endColor 
   * @param {*} steps granularity
   * @returns 
   */
  const generateColorGradient = (startColor, endColor, steps) => {
    const start = parseInt(startColor.slice(1), 16);
    const end = parseInt(endColor.slice(1), 16);

    const r1 = (start >> 16) & 0xff;
    const g1 = (start >> 8) & 0xff;
    const b1 = start & 0xff;

    const r2 = (end >> 16) & 0xff;
    const g2 = (end >> 8) & 0xff;
    const b2 = end & 0xff;

    const colorArray = [];
    for (let i = 0; i <= steps; i++) {
        const r = Math.round(r1 + ((r2 - r1) * i) / steps);
        const g = Math.round(g1 + ((g2 - g1) * i) / steps);
        const b = Math.round(b1 + ((b2 - b1) * i) / steps);
        colorArray.push(`#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`);
    }
    return colorArray;
  };


  // Function to extract the leading number from a string.
  const extractLeadingNumber = (str) => {
    const match = str.match(/^(\d+)/); // Regex to match a number at the start of the string
    return match ? parseInt(match[0], 10) : Infinity; // Return Infinity if no number is found
  };

  // Comparator for sorting by the leading number in the content string.
  const compareByLeadingNumber = (a, b) => {
    const numA = extractLeadingNumber(a.content);
    const numB = extractLeadingNumber(b.content);
    return numB - numA;
  };    

const HeatMap = ({ threshold, setTotalMemoryCount, setThreSholdTotalMemoryCount, setNeverReviewedMemoryCount}) => {

  const { memoryAdded } = useMemory();
  const [todayCards, setTodayCards] = useState([]);

  useEffect(() => {
    fetchTodaysMemories(); // call it when first render
    if (memoryAdded) {
      fetchTodaysMemories(); // call it when a new card is created
    }
  }, [memoryAdded]); 


  const getMetaDataOfGeneralMemories = () => {
    // Sort the todayCards array by content (title)
    const sortedCards = [...todayCards].sort((a, b) => compareByLeadingNumber(a, b));

    setTotalMemoryCount(sortedCards.length)
    const data = [];
    let thresholdCount = 0;
    let neverReviewedCount = 0
    let dayGap = 0;
    for (let i = 0; i < sortedCards.length; i++) {
        dayGap = calculateDayGap(sortedCards[i].lastReviewDate, new Date().toISOString())
        if (dayGap <= threshold) {
          thresholdCount += 1
        }
        if (dayGap === -1) {
          neverReviewedCount += 1
        }

        data.push({
            title: sortedCards[i].content,
            // date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
            count: dayGap
        });
    }
    setThreSholdTotalMemoryCount(thresholdCount)
    setNeverReviewedMemoryCount(neverReviewedCount)
    return data.reverse();
};



  const fetchTodaysMemories = async () => {
    try {
      const currentUser = await fetchUserAttributes()
      const r = await fetchCards(currentUser["sub"], "GENERAL")
      setTodayCards(r)
    } catch (error) {
      throw error
    }
  }    
    const data = getMetaDataOfGeneralMemories();
  
    const getColor = (count, gradientColors) => {
      if (count > 0 && count <= threshold) {
          return gradientColors[count];
      }
      if (count == -1) {
        return '#FA8072'
      }
      return '#ebedf0'; // Default color for out of range values
    };

    const renderDays = () => {
        return data.map((day, index) => (
            <div
                key={index}
                className="heat-map-day"
                title={`${day.title}, last review: ${day.count} days ago`}
                style={{ backgroundColor: getColor(day.count, generateColorGradient('#216e39', '#9be9a8', threshold)) }}
            ></div>
        ));
    };

    return (
      <div>
      <div className="heat-map-grid">{renderDays()}
      </div>
      </div>


    );
};

export default HeatMap;
