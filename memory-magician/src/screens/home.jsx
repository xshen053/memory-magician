import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React, { useState, useEffect } from 'react';
import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { getNumOfCardsEachTag } from '../utilities/algorithm/card_data_processing';
import { getCardsInfoFromUserApi } from '../utilities/apis/cardAPI';
const HomeScreen = ({ signOut, user }) => {

  const navigate = useNavigate();
  const [pieChartData, setPieChartData] = useState([]);


  const handleNavigation = (path) => {
    // ... submit logic ...
    navigate(path);
  };

  const fetchAllCards = async () => {
    const r = await getCardsInfoFromUserApi(user.username)
    const tagDict = getNumOfCardsEachTag(r)
    const dataArray = Object.entries(tagDict).map(([label, value], index) => ({
      id: index,
      value,
      label
    }));
    setPieChartData(dataArray)
    console.log("I am in fetchAllCards")
  }

  useEffect(() => {
    fetchAllCards();
  }, []); // Runs only once on component mount


  return (
    <div>
        <Heading level={1}>Dashboard </Heading>

    <div style={styles.container}>
      <div style={styles.contentContainer}>
  
        {/* First Chart */}

        <div style={styles.chartContainer}>
        <div style={styles.chartLabel}>Memories classifed by type</div>

          <PieChart
            // colors={['red', 'blue', 'green']} // Use palette
            series={[
              {
                data: pieChartData
              },
            ]}
            width={400}
            height={200}
          />
        </div>
  
        {/* Second Chart */}
        <div style={styles.chartContainer}>
           </div>
  
        {/* Third Chart */}
        <div style={styles.chartContainer}>
              </div>
              <div style={styles.chartContainer}>
              </div>              
      </div>
    </div>
    </div>

  );

}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chartContainer: {
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Shadow to create card effect
    transition: '0.3s',
    borderRadius: '30px', // Slight rounding of corners
    width: '800px', // Fixed width, you can adjust as necessary
    height: '400px', // Height is auto so it scales with content
    margin: '10px', // Space between cards
    padding: '20px', // Padding inside the card
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column', // Stack children vertically
    display: 'flex', // Make this a flex container
    backgroundColor: '#fff', // Card background color
  },
  chartLabel: {
    textAlign: 'center', // Center the label text
    marginBottom: '10px', // Space between label and chart
    fontSize: '20px', // Size of the label text
    fontWeight: 'bold', // Font weight for the label text
  },  
  // ... any other styles you need
};


export default withAuthenticator(HomeScreen)
