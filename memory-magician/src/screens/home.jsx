import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';

const HomeScreen = ({ signOut, user }) => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // ... submit logic ...
    navigate(path);
  };


  // Sample data for the pie chart
  const pieChartData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 20, 50], // Sample data values
        backgroundColor: ['red', 'blue', 'green'], // Sample background colors
      },
    ],
  };


  return (
    <div>
      <div style={styles.contentContainer}>
        <Heading level={1}>Hello {user.username}</Heading>
        <PieChart
          colors={['red', 'blue', 'green']} // Use palette
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
            },
          ]}
          width={400}
          height={200}
        />    
      </div>
    </div>
  );

}

const styles = {
  contentContainer: {
    // Styles for the content below the NavBar
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top',
    padding: 20
  },
  // ... other styles ...
};

export default withAuthenticator(HomeScreen)
