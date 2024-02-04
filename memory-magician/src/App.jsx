import { generateClient } from 'aws-amplify/api';
import { useState, useRef, useEffect } from 'react';
import { getUserByEmail, createUserAPI } from './utilities/apis/userAPI'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes, updateUserAttribute } from 'aws-amplify/auth';
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

const initialState = { name: '', description: '' };
const client = generateClient();


const App = ({ signOut, user }) => {

  const navigate = useNavigate();
  useEffect(() => {
    addUserToDatabaseWhenFirstSignIn()
  }, []);
  const handleNavigation = (path) => {
    // ... submit logic ...
    navigate(path);
  };

  const addUserToDatabaseWhenFirstSignIn = async () => {
    try {
      const currentUser = await fetchUserAttributes()
      const r = await getUserByEmail(currentUser["email"])
      console.log(r)
      if (r.length === 0) {
          const userData = {
            email: currentUser["email"],
            name: "shen"
          };
          console.log("here2")
          await createUserAPI(userData);
          console.log("here4")
      } else {
        console.log("User is already in the database")
      }
    } catch (error) {
        console.error("Error during addUserToDatabaseWhenFirstSignIn: ", error);
        throw error;
    }
  }
  return (
    <div>
      <NavBar /> {/* NavBar is always displayed */}
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
      <AddMemory />
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
