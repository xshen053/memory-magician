/**
 * Copyright (c) Xiaxi Shen 2024
 */

import React, { useState } from 'react';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { NavLink } from 'react-router-dom';
import '../css/NavBar.css'; // Your CSS file for styling

const NavBar = ({ signOut }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo_with_text.png" alt="Logo" />
        <h1>Merym</h1>
      </div>
      
      <div className="nav-links">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to="/highlight" className={({ isActive }) => isActive ? 'active-link' : ''}>Today's Highlight</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active-link' : ''}>Calendar</NavLink>
        <div className="dropdown">
          <Button className="dropbtn">Memories</Button>
          {(
            <div className="dropdown-content">
              <NavLink to="/ReinforcedMemories" className={({ isActive }) => isActive ? 'active-link' : ''}>Reinforced</NavLink>
              <NavLink to="/plannedMemories" className={({ isActive }) => isActive ? 'active-link' : ''}>Planned</NavLink>
              <NavLink to="/MemoryPalace" className={({ isActive }) => isActive ? 'active-link' : ''}>Palace</NavLink>
              <NavLink to="/panel" className={({ isActive }) => isActive ? 'active-link' : ''}>Explorer</NavLink>
              {/* Add more dropdown links here if needed */}
            </div>
          )}
        </div>        
        <Button onClick={signOut} className={'sign-out-button'}>Sign out</Button>
      </div>
    </nav>
  );
};

export default withAuthenticator(NavBar);
