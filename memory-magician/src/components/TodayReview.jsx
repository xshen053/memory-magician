import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import '../css/style.css';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { fetchUserAttributes } from 'aws-amplify/auth';
import { getOneCardUserFromUserIDCardID, getAllUnreviewedCardsOfUserForToday, updateOneUserCardLastTimeReviewDuration, markOneUserCardReviewedWithDuration } from '../utilities/apis/carduserAPI';
import { useMemory } from "../context/MemoryContext.jsx";
const StyledChip = styled(Chip)({
  marginLeft: '8px',
  
});

function TodayReview() {
  const { memoryAdded } = useMemory();
  const [todayCards, setTodayCards] = useState([]);
  const [reviewDuration, setDuration] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Function to update the duration for a specific id
  const updateDuration = (id, duration) => {
    setDuration(prevDurations => {
    // Check if the id already exists in the state
    const existingDuration = prevDurations[id] || 0;
    return {
      ...prevDurations,
      [id]: existingDuration + duration
    };
    });
  };

  // Add a state to track the timer for each cardUser
  const [timers, setTimers] = useState({}); // Object with cardUser.id as key and timer info as value

  // Start the timer
  const startTimer = (id) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [id]: { startTime: new Date(), isRunning: true }
    }));
  };
  
  // Stop the timer and log the duration
  const stopTimer = (id) => {
    const timer = timers[id];
    if (timer && timer.isRunning) {
      const duration = new Date() - timer.startTime;
      console.log(`Timer for ${id} stopped. Duration: ${duration} ms`);

      // record the mapping between id -> duration
      updateDuration(id, duration)
      // Reset the timer
      setTimers(prevTimers => ({
        ...prevTimers,
        [id]: { ...timer, isRunning: false }
      }));
    }
  };

  const resetTimer = (userId) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [userId]: { ...prevTimers[userId], elapsedTime: 0, isRunning: false }
    }));
  };  


  function triggerTestSnackbar() {
    setSnackbarOpen(true);
  }
  
  useEffect(() => {
    const fetchTodaysMemories = async () => {
      try {
        const currentUser = await fetchUserAttributes()
        const r = await getAllUnreviewedCardsOfUserForToday(currentUser["sub"])
        setTodayCards(r)
        console.log(r.length)
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = { ...prevTimers };
        Object.keys(updatedTimers).forEach(id => {
          if (updatedTimers[id].isRunning) {
            updatedTimers[id].elapsedTime = new Date() - updatedTimers[id].startTime;
          }
        });
        return updatedTimers;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

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

  const markMemoryAsReviewed = async (userCardID, userID, cardID, iteration) => {
    try {
      let duration = 1000
      if (reviewDuration[userCardID] !== undefined) {
        duration = reviewDuration[userCardID]
      }
      // update this userCard
      await markOneUserCardReviewedWithDuration(userCardID, duration)
      const newIteration = iteration + 1
      const nextUserCardID = await getOneCardUserFromUserIDCardID(userID, cardID, newIteration)
      
      // update next userCard's lastReviewDuration field
      await updateOneUserCardLastTimeReviewDuration(nextUserCardID, duration)
      setSnackbarOpen(true); // Open the Snackbar to display the success message
      await fetchTodaysMemories(); // Call fetchTodaysMemories again to refresh the list
    } catch (error) {
      console.error("Error during markMemoryAsReviewed: ", error);
      throw error
    }
  }
  

  const formatTime = (milliseconds = 0) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div style={{ textAlign: 'left' }}> {/* This div ensures everything inside is left-aligned */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '50px' }} >
        All cards for today: {todayCards.length}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Estimate time: 2 hours
      </Typography>            
      <Divider sx={{ bgcolor: 'purple' }} />
      {/* <div className="list-container"> */}
      
      <List>
        {todayCards.map((cardUser) => (
          <ListItem 
            key={cardUser.id} 
            className="list-item-container list-item-hover"
            secondaryAction={
              <>
              <StyledChip 
                label={`${cardUser.iteration}/${cardUser.card.total}`} 
                style={{ backgroundColor: 'transparent' }} // Replace #yourColor with your desired color
              />
              <IconButton onClick={() => timers[cardUser.id]?.isRunning ? stopTimer(cardUser.id) : startTimer(cardUser.id)}>
                {timers[cardUser.id]?.isRunning ? <StopIcon /> : <PlayArrowIcon />}
              </IconButton>

              <IconButton onClick={() => resetTimer(cardUser.id)}>
                <ReplayIcon /> 
              </IconButton>
              {timers[cardUser.id] && (
            <Typography variant="body2">
              Timer: {formatTime(timers[cardUser.id].elapsedTime)}
            </Typography>
          )}
            </>
            }
            // define the color
            style={{ 
              width: '100%', // Adjust width as needed
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: cardUser.card.type === "GENERAL" ? "transparent" : "transparent" 
            }}
          > 
            <Checkbox
              edge="start"
              checked = {cardUser.isReviewed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${cardUser.id}` }}
              onClick={() => {
                // Check if timer is not running before marking as reviewed
                if (!timers[cardUser.id] || !timers[cardUser.id].isRunning) {
                    markMemoryAsReviewed(cardUser.id, cardUser.userID, cardUser.cardID, cardUser.iteration);
                } else {
                    alert("Please stop timer before finish the task!")
                }
            }}
            />
            <ListItemText 
              id={`checkbox-list-label-${cardUser.id}`} 
              primary={cardUser.card.content}
              secondary = {`est: ${cardUser.lastTimeReviewDuration / 1000} min`}
              style={{ fontWeight: 'bold' }} // Replace #yourColor with your desired color

              />
          </ListItem>
        ))}
      </List>
      {/* </div> */}
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
