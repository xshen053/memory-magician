import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/NavBar.css'; // Assuming you have a separate CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        {/* Logo here */}
        <img src="../img/logo_with_text.png" alt="Logo" />
      </div>
      
      <div className="nav-links">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
        <NavLink to="/todayreview" className={({ isActive }) => isActive ? 'active-link' : ''}>Today's Review</NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active-link' : ''}>Calendar</NavLink>
        <NavLink to="/catch-up" className={({ isActive }) => isActive ? 'active-link' : ''}>Catch Up</NavLink>
        <NavLink to="/signout" className={({ isActive }) => isActive ? 'active-link' : ''}>Sign Out</NavLink>
        {/* Additional links as needed */}
      </div>
    </nav>
  );
};

export default NavBar;
