import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';

import { Grid, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { CustomSnackbar } from './custom/customSnackbar.jsx';
import { fetchUserAttributes } from 'aws-amplify/auth';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import { getOneCardUserFromUserIDCardID, updateOneUserCardLastTimeReviewDuration, markOneUserCardReviewedWithDuration } from '../utilities/apis/carduserAPI';
import { updateCard } from '../graphql/mutations.js';
import { fetchCards, mutateCard } from '../utilities/apis/cardAPI.js';
import { useMemory } from "../context/MemoryContext.jsx";
import '../css/style.css';
import { createUserCardsBatchAPI } from '../utilities/apis/carduserAPI';
import { cardTypeColors, textColors } from '../theme/colors.jsx';
import { memoryWithExplanation as lines}  from '../theme/text.jsx';
import { StyledChip } from '../theme/componentsStyle.jsx';
import { typeOrder, boxSize } from '../theme/constants.jsx';



function MemoriesReview() {

  const DEFAULTDURATION = -1

  const { memoryAdded } = useMemory();
  const [todayCards, setTodayCards] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [estimateTime, setEstimateTime] = useState(0);
  const [curCardDuration, setCurCardDuration] = useState(0)
  const [localStartDate, setStartDate] = useState(new Date());

  const [selectedItems, setSelectedItems] = useState(() => {
    const initialState = {};
    lines.forEach((line) => {
      initialState[line.id] = true; // Initialize each line as selected (true)
    });
    return initialState;
  });
  
  // Add a state to track the timer for each cardUser
  const [timers, setTimers] = useState({}); // Object with cardUser.id as key and timer info as value


  // Start the timer
  const startTimer = (id) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [id]: {
        ...prevTimers[id],
        startTime: new Date(),
        isRunning: true,
        elapsedTime: prevTimers[id] && prevTimers[id].elapsedTime ? prevTimers[id].elapsedTime : 0 // Initialize if not present
      }
    }));
  };
  
  // Stop the timer and log the duration
  const stopTimer = (id) => {
    setTimers(prevTimers => {
      const timer = prevTimers[id];
      if (timer && timer.isRunning) {
        const duration = new Date() - timer.startTime;
        const elapsedTime = (timer.elapsedTime || 0) + duration; // Update elapsed time
        console.log(`Timer for ${id} stopped. Duration: ${duration} ms, Total elapsed: ${elapsedTime} ms`);

        // Update the timer object with the new elapsed time and stop the timer
        return {
          ...prevTimers,
          [id]: { ...timer, isRunning: false, elapsedTime }
        };
      }
      return prevTimers; // Return the timers unchanged if the condition is not met
    });
  };

  const resetTimer = (userId) => {
    setTimers(prevTimers => ({
      ...prevTimers,
      [userId]: { ...prevTimers[userId], elapsedTime: 0, isRunning: false }
    }));
  };  

  
  useEffect(() => {
    fetchTodaysMemories(); // call it when first render
    if (memoryAdded) {
      fetchTodaysMemories(); // call it when a new card is created
    }
  }, [memoryAdded]);


  useEffect(() => {
    // Update real-time interval
    const interval = setInterval(() => {
      setTimers(prevTimers => {
        const updatedTimers = { ...prevTimers };
        Object.keys(updatedTimers).forEach(id => {
          if (updatedTimers[id].isRunning) {
            // Calculate the time difference since the timer was started
            const timeSinceStart = new Date() - updatedTimers[id].startTime;
            // Add this difference to the existing elapsedTime to accumulate properly
            updatedTimers[id].elapsedTime = (updatedTimers[id].elapsedTime || 0) + timeSinceStart;
            // Reset startTime to now for the next interval calculation
            updatedTimers[id].startTime = new Date();
          }
        });
        return updatedTimers;
      });
    }, 1000); // Update every second
  
    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  

  const fetchTodaysMemories = async () => {
    try {
      const currentUser = await fetchUserAttributes()
      const r = await fetchCards(currentUser["sub"], "GENERAL")
      setTodayCards(r)
      console.log("I am in fetchTodaysMemories")
    } catch (error) {
      console.log("Error during fetchTodaysMemories: ", error)
      throw error
    }
  }



  /**
   * create a UserCardReview in the table
   * update following fields in card
   * - lastReviewDate
   * - total (review time)
   * 
   * @param {*} userCardID 
   * @param {*} userID 
   * @param {*} cardID 
   * @param {*} iteration 
   */
  const markMemoryAsReviewed = async (userID, cardID) => {
    try {
      let updatedDataArray = []
      let duration = 1000
      // if (timers[userCardID]) {
      //   console.log("duration")
      //   duration = timers[userCardID].elapsedTime
      //   console.log(duration)
      // }
      // generate userCardDate
      const userCardData = {
        userID: userID,
        cardID: cardID,
        reviewDuration: duration,             
        lastTimeReviewDuration: duration,
        isReviewed: true,
      }
      updatedDataArray.push({
        ...userCardData,
        reviewDate: localStartDate.toISOString(),
        iteration: todayCards.total + 1 ? todayCards.total !== 11 : 1
      })
      await mutateCard(cardID, todayCards.total + 1 ? todayCards.total !== 11 : 1, localStartDate.toISOString())
      await createUserCardsBatchAPI(updatedDataArray)
      setSnackbarOpen(true); // Open the Snackbar to display the success message
      await fetchTodaysMemories(); // Call fetchTodaysMemories again to refresh the list
    } catch (error) {
      console.error("Error during markMemoryAsReviewed: ", error);
      throw error
    }
  }

  function calculateDayGap(utcDateStr1, utcDateStr2) {
    // Parse the dates into Date objects
    let date1 = new Date(utcDateStr1);
    const date2 = new Date(utcDateStr2);

    
    if (utcDateStr1 === null) {
      return -1
    }    
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;
  
    // Convert milliseconds to days and round the result
    const differenceInDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return differenceInDays;
  }

  return (
    <div style={{ textAlign: 'left' }}> {/* This div ensures everything inside is left-aligned */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '50px', color: 'black' }} >
        All your memories: {todayCards.length}<br></br>

        This page lists all the memories you plan to review in an efficient manner
      </Typography>    
        
      <Divider sx={{ bgcolor: 'purple' }} />
      <List>
    {todayCards.map((card) => (
      <ListItem 
        key={card.id}
        style={{ 
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: cardTypeColors[card.type], // Ensure you define cardTypeColors
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
          <div style={{ display: 'flex', alignItems: 'center' }}> {/* Flex container */}
            <Checkbox
              edge="start"
              checked = {calculateDayGap(card.lastReviewDate, new Date().toISOString()) === 0}
              disabled={calculateDayGap(card.lastReviewDate, new Date().toISOString()) === 0} // Disable the checkbox if it's already reviewed
              tabIndex={-1}
              disableRipple
              size="medium"
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${card.id}` }}
              onClick={() => 
                markMemoryAsReviewed(card.creatorUserID, card.id)
              }
            />
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={card.content}
              primaryTypographyProps={{
                style: { fontWeight: 'bold', fontSize: '1.25rem' } // Adjust the fontSize as needed
              }}/>
            </div>
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={`Last reviewed: ${card.lastReviewDate ? card.lastReviewDate.split('T')[0] : null}`}
              style={{ fontWeight: 'bold'}}
            />
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={`Days since last review: ${calculateDayGap(card.lastReviewDate, new Date().toISOString())} days`}
              style={{ fontWeight: 'bold'}}
            />
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={`Times reviewed: ${card.total === 11 ? 0 : card.total}`}
              style={{ fontWeight: 'bold'}}
            />        
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={`Date created: ${card.createdAt.split('T')[0]}`}
              style={{ fontWeight: 'bold'}}
            />                   
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={
                <Typography 
                  component="span" // Use "span" to inline with other text if needed
                  style={{ fontWeight: 'bold'}}
                >
                  {/* {"leetcode link: "} */}
                  {/* Here's the link */}
                  <Link href="https://www.uw.edu" target="_blank" rel="noopener">
                    link
                  </Link>
                </Typography>
              }
            />                  
          </Grid>
          <Grid item>
            {/* Your secondary actions or additional info here */}
            {/* Uncomment and modify according to your needs */}
            <IconButton onClick={() => {}}>
              <PlayArrowIcon />
            </IconButton>
            <IconButton onClick={() => {}}>
              <StopIcon />
            </IconButton>
            <IconButton onClick={() => {}}>
              <ReplayIcon />
            </IconButton>
            <Typography variant="body2">
              Timer: {/* Display timer here */}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    ))}
  </List>
      {/* </div> */}
      <CustomSnackbar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        curCardDuration={curCardDuration}
      />
    </div>
  );
}

export default MemoriesReview;
