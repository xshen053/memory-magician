import { generateClient } from 'aws-amplify/api';
import { useState, useRef, useEffect } from 'react';
import { getUserByCognitoID, createUserAPI } from './utilities/apis/userAPI'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { fetchUserAttributes, updateUserAttribute } from 'aws-amplify/auth';
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import AddMemory from "./components/AddMemory";
import SearchScreen from './screens/search.jsx'
import CalendarScreen from './screens/calendar';
import PlannedMemoriesScreen from './screens/PlannedMemories.jsx';
import HomeScreen from './screens/home';
import NavBar from './components/NavigationBar';
import { MemoryProvider } from './context/MemoryContext.jsx';
import Footer from './components/Footer.jsx'
import ReinforcedMemoriesScreen from './screens/ReinforcedMemories.jsx';
import TodayHighlightScreen from './screens/Highlight.jsx';
import MemoryHeatMapScreen from './screens/MemoryHeatMapScreen.jsx';
import Banner from './components/Banner.jsx';
const initialState = { name: '', description: '' };
const client = generateClient();


const App = ({ signOut, user }) => {
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getEmail = async () => {
      try {
        const currentUser = await fetchUserAttributes()
        setUserEmail(currentUser["email"])
      } catch (error) {
        console.log("Error during getUserEmail: ", error)
        throw error        
      }
    }
    getEmail()
    addUserToDatabaseWhenFirstSignIn()
  }, []);
  
  const handleNavigation = (path) => {
    navigate(path);
  };

  const addUserToDatabaseWhenFirstSignIn = async () => {
    try {
      const currentUser = await fetchUserAttributes()
      const r = await getUserByCognitoID(currentUser["sub"])
      if (r === null) {
          const userData = {
            email: currentUser["email"],
            cognitoID: currentUser["sub"]
          };
          await createUserAPI(userData);
      } else {
        console.log("User is already in the database")
      }
    } catch (error) {
        console.error("Error during addUserToDatabaseWhenFirstSignIn: ", error);
        throw error;
    }
  }
  return (
    <MemoryProvider>
      <div>
        <div className="user-greeting">
          Hello, {userEmail}!
        </div>      
        <Banner />
        <NavBar /> {/* NavBar is always displayed */}
        <div className="App">
        <div className="site-container">
        <div className="content-wrap">
          {/* Main content */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<PlannedMemoriesScreen />} />
            <Route path="/panel" element={<SearchScreen />} />
            <Route path="/calendar" element={<CalendarScreen />} /> 
            {/* <Route path="/plannedMemories" element={<PlannedMemoriesScreen />} />  */}
            <Route path="/ReinforcedMemories" element={<ReinforcedMemoriesScreen />} /> 
            <Route path="/MemoryPalace" element={<MemoryHeatMapScreen />} /> 
            <Route path="/highlight" element={<TodayHighlightScreen />} /> 
          </Routes>
        </div>
        <AddMemory />
        </div>

      </div>
      <Footer />
    </div>
    </MemoryProvider>
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
