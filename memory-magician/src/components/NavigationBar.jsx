import React from 'react';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import { NavLink } from 'react-router-dom';
import '../css/NavBar.css'; // Assuming you have a separate CSS file for styling

const NavBar = ({ signOut, user }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* Logo here */}
        <img src="/logo_with_text.png" alt="Logo" />
        <h1>Merym</h1>
      </div>
      
      <div className="nav-links">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to="/memories" className={({ isActive }) => isActive ? 'active-link' : ''}>Memories</NavLink>
        <NavLink to="/todayreview" className={({ isActive }) => isActive ? 'active-link' : ''}>Planned</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active-link' : ''}>Calendar</NavLink>
        <NavLink to="/highlight" className={({ isActive }) => isActive ? 'active-link' : ''}>Today's highlight</NavLink>
        <NavLink to="/panel" className={({ isActive }) => isActive ? 'active-link' : ''}>Panel</NavLink>
        <Button onClick={signOut} className={'sign-out-button'}>Sign out</Button>
        {/* Additional links as needed */}
      </div>
    </nav>
  );
};

export default withAuthenticator(NavBar);
