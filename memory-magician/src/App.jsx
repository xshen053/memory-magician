import { generateClient } from 'aws-amplify/api';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
const initialState = { name: '', description: '' };
const client = generateClient();

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import AddMemory from "./components/AddMemory";
import CodingProblemCount from "./components/IsCodingProblem";
import MemoryTablePage from "./components/MemoryTablePage"; // Import your new component
import CalendarScreen from './screens/calendar';
import TodayReviewScreen from './screens/todayreview';
import HomeScreen from './screens/home';
import NavBar from './components/NavigationBar';

const App = ({ signOut, user }) => {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    // ... submit logic ...
    navigate(path);
  };
  
  return (
    <div>
      <div className="App">
        {/* Main content */}
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/memory-table" element={<MemoryTablePage />} />
          <Route path="/calendar" element={<CalendarScreen />} /> 
          <Route path="/todayreview" element={<TodayReviewScreen />} /> 
        </Routes>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%', // Changed from 400px to 100%
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20
  }
};

export default withAuthenticator(App);
