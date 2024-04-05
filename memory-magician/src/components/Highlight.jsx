/**
 * Copyright (c) Xiaxi Shen 2024
 */

// React and Libraries
import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// AWS and External APIs
import { fetchUserAttributes } from 'aws-amplify/auth';

// Utilities and Custom Functions
import { getAllCardsNeedReviewOfAUserForToday } from '../utilities/apis/carduserAPI';

// Contexts
import { useMemory } from "../context/MemoryContext.jsx";

// Theme and Styling
import { cardTypeColors } from '../theme/colors.jsx';
import { typeOrder } from '../theme/constants.jsx';
import '../css/style.css';

function TodayHighlight() {
  const { memoryAdded } = useMemory();
  const [todayCards, setTodayCards] = useState([]);

  useEffect(() => {
    fetchTodaysMemories(); // call it when first render
    if (memoryAdded) {
      fetchTodaysMemories(); // call it when a new card is created
    }
  }, [memoryAdded]);

  const fetchTodaysMemories = async () => {
    try {
      const currentUser = await fetchUserAttributes()
      const r = (await getAllCardsNeedReviewOfAUserForToday(currentUser["sub"])).filter(card => card.isReviewed)
      setTodayCards(r)
    } catch (error) {
      console.log("Error during fetchTodaysMemories: ", error)
      throw error
    }
  }

  return (
    <div style={{ textAlign: 'left' }}> {/* This div ensures everything inside is left-aligned */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '50px', color: 'black' }} >
        You have refreshed {todayCards.length} memories today!
      </Typography>
      <Divider sx={{ bgcolor: 'purple' }} />
      <List>
        {todayCards
        .sort((a, b) => typeOrder[a.card.type] - typeOrder[b.card.type])
        .map((cardUser) => (
          <ListItem 
            key={cardUser.id} 
            style={{ 
              width: '100%', // Adjust width as needed
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: cardTypeColors[cardUser.card.type]
            }}
          > 
            <Checkbox
              edge="start"
              checked = {cardUser.isReviewed}
              disabled={cardUser.isReviewed} // Disable the checkbox if it's already reviewed
              tabIndex={-1}
              disableRipple
              size="medium" // Set the size to "small"
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${cardUser.id}` }}
            />
            <ListItemText 
              id={`checkbox-list-label-${cardUser.id}`} 
              primary={cardUser.card.content}
              style={{ fontWeight: 'bold' }} // Replace #yourColor with your desired color
              />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default TodayHighlight;
