import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import React from "react";
import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavigationBar';

const HomeScreen = ({ signOut, user }) => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // ... submit logic ...
    navigate(path);
  };

  return (
    <div>
      {/* <div style={styles.contentContainer}>
        <Heading level={1}>Hello {user.username}</Heading>
        <Button onClick={signOut}>Sign out</Button>
        <Button onClick={() => handleNavigation('/todayreview')}>Today's Review</Button>
        <Button onClick={() => handleNavigation('/calendar')}>Calendar</Button>
      </div> */}
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
