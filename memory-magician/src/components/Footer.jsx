// Footer.js
import React from 'react';

function Footer() {
  const version = "1.0.0"; // Define the version here

  return (
    <footer>
      <p>{new Date().getFullYear()} &copy; Memory Mate. All rights reserved. Version {version}</p>
    </footer>
  );
}

export default Footer;
