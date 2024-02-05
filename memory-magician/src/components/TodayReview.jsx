import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import '../css/style.css';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { getAllUnreviewedCardsOfUserForToday, markOneUserCardReviewed } from '../utilities/apis/carduserAPI';
import { useMemory } from "../context/MemoryContext.jsx"

const StyledChip = styled(Chip)({
  marginLeft: '8px',
});

function TodayReview() {
  const { memoryAdded } = useMemory();
  const [todayCards, setTodayCards] = useState([]);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  function triggerTestSnackbar() {
    setSnackbarOpen(true);
  }

  
  useEffect(() => {
    const fetchTodaysMemories = async () => {
      try {
        const currentUser = await fetchUserAttributes()
        const r = await getAllUnreviewedCardsOfUserForToday(currentUser["sub"])
        setTodayCards(r)
        console.log("I am in fetchTodaysMemories")
      } catch (error) {
        console.log("Error during fetchTodaysMemories: ", error)
        throw error
      }
    }

    fetchTodaysMemories(); // call it when first render
    if (memoryAdded) {
      fetchTodaysMemories(); // call it when a new card is created
    }
  }, [memoryAdded]);

  const fetchTodaysMemories = async () => {
    try {
      const currentUser = await fetchUserAttributes()
      const r = await getAllUnreviewedCardsOfUserForToday(currentUser["sub"])
      setTodayCards(r)
      console.log("I am in fetchTodaysMemories")
    } catch (error) {
      console.log("Error during fetchTodaysMemories: ", error)
      throw error
    }
  }

  const markMemoryAsReviewed = async (cardID) => {
    try {
      await markOneUserCardReviewed(cardID);
      setSnackbarOpen(true); // Open the Snackbar to display the success message
      fetchTodaysMemories(); // Call fetchTodaysMemories again to refresh the list
    } catch (error) {
      console.error("Error during markMemoryAsReviewed: ", error);
      throw error
    }
  }

  return (
    <div style={{ textAlign: 'left' }}> {/* This div ensures everything inside is left-aligned */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '50px' }} >
        All Tasks For Today!
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Estimate time: 2 hours
      </Typography>
      <Divider sx={{ bgcolor: 'purple' }} />
      <List>
        {todayCards.map((cardUser) => (
          <ListItem 
            key={cardUser.id} 
            secondaryAction={
              <StyledChip label={`${cardUser.iteration}/${cardUser.card.total}`} color="primary" />
            }
            style={{ backgroundColor: cardUser.card.type === "GENERAL" ? "#c5b4e3" : "transparent" }}
          > 
            <Checkbox
              edge="start"
              checked = {cardUser.isReviewed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${cardUser.id}` }}
              onClick={() => markMemoryAsReviewed(cardUser.id)}
            />
            <ListItemText id={`checkbox-list-label-${cardUser.id}`} primary={cardUser.card.content} />
          </ListItem>
        ))}
      </List>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Good Job!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default TodayReview;
