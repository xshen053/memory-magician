
import MemoryCalendar from "../components/MemoryCalendar";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import '../css/style.css';

const CalendarScreen = () => {

  // height: 500, overflowY: "auto" scoll down, pretty cool
return (
  <div>
    
    <MemoryCalendar style={{ marginTop: "20px", marginBottom: "200px"}} />
  </div>
  )
}
export default CalendarScreen
