import React, { useState, useEffect } from 'react';
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
import { CustomSnackbar } from './custom/customSnackbar.jsx';
import { fetchUserAttributes } from 'aws-amplify/auth';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import { getOneCardUserFromUserIDCardID, getAllCardsNeedReviewOfAUserForToday, updateOneUserCardLastTimeReviewDuration, markOneUserCardReviewedWithDuration } from '../utilities/apis/carduserAPI';
import { useMemory } from "../context/MemoryContext.jsx";
import '../css/style.css';

import { cardTypeColors, textColors } from '../theme/colors.jsx';
import { memoryWithExplanation as lines}  from '../theme/text.jsx';
import { StyledChip } from '../theme/componentsStyle.jsx';
import { typeOrder, boxSize } from '../theme/constants.jsx';



function TodayReview() {
  const { memoryAdded } = useMemory();
  const [todayCards, setTodayCards] = useState([]);
  const [todayFilteredCards, setTodayFilteredCards] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [estimateTime, setEstimateTime] = useState(0);
  const [curCardDuration, setCurCardDuration] = useState(0)
  const [selectedItems, setSelectedItems] = useState(() => {
    const initialState = {};
    lines.forEach((line) => {
      initialState[line.id] = true; // Initialize each line as selected (true)
    });
    return initialState;
  });
  
  const toggleItemSelection = (id) => {
    // Toggle the selection state for the item
    if (id === -1) {
      // If id is -1, set all items to the same state as selectedItems[id]
      const nextState = !selectedItems[-1];
      const updatedSelections = {};
  
      for (const itemId in selectedItems) {
        if (selectedItems.hasOwnProperty(itemId)) {
          updatedSelections[itemId] = nextState;
        }
      }
  
      setSelectedItems(updatedSelections);
    } else {
      // Toggle the selection state for the specified item
      setSelectedItems({ ...selectedItems, [id]: !selectedItems[id] });
    }
  };


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
    setTodayFilteredCards(filter(todayCards))
  }, [selectedItems])

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
      const r = await getAllCardsNeedReviewOfAUserForToday(currentUser["sub"])
      let totalEstimatedTime = r.reduce((accumulator, cardUser) => {
        if (!cardUser.isReviewed) {
          return accumulator + (cardUser.lastTimeReviewDuration >= 0 ? cardUser.lastTimeReviewDuration : 0);
        }
        return accumulator;
      }, 0);
      setTodayCards(r)
      const filteredCards = filter(r)
      setTodayFilteredCards(filteredCards)
      totalEstimatedTime = totalEstimatedTime / 60000 // convert to minute
      setEstimateTime(totalEstimatedTime)
      console.log("I am in fetchTodaysMemories")
    } catch (error) {
      console.log("Error during fetchTodaysMemories: ", error)
      throw error
    }
  }

  const filter = (r) => {
    const chosedType = new Set(); // Note: Corrected 'set()' to 'new Set()'
    lines.forEach((line) => {
      if (selectedItems[line.id] === true) {
        chosedType.add(line.type);
      }
    });
    const filterdCards = r.filter((cardUser) => {
      return chosedType.has(cardUser.card.type);
    })

    return filterdCards
  
  }

  /**
   * mark a usercard as reviewed and also update the next review object's lastReviewDuration
   * 
   * @param {*} userCardID 
   * @param {*} userID 
   * @param {*} cardID 
   * @param {*} iteration 
   */
  const markMemoryAsReviewed = async (userCardID, userID, cardID, iteration, type) => {
    try {
      let duration = 1000
      if (timers[userCardID]) {
        console.log("duration")
        duration = timers[userCardID].elapsedTime
        console.log(duration)
      }
      // update this userCard
      await markOneUserCardReviewedWithDuration(userCardID, duration)
      if (type !== "NOREVIEW" && type !== "ONETIME") {
        const newIteration = iteration + 1
        const nextUserCardID = await getOneCardUserFromUserIDCardID(userID, cardID, newIteration)
        // update next userCard's lastReviewDuration field
        // if it is the last one, will not update
        if (nextUserCardID) {
          await updateOneUserCardLastTimeReviewDuration(nextUserCardID, duration)
        }
      }
      setCurCardDuration(duration)
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
      <Typography variant="h5" gutterBottom style={{ marginTop: '50px', color: 'black' }} >
        All memories for today: {todayCards.length}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Estimated time left: 
        <span style={{ backgroundColor: textColors["ESTIMATE"]}}> {estimateTime.toFixed(2)} </span> 
         minutes <br /> (excluding memories that are newly added and already reviewed)
         <br /><br />
      </Typography>

      <Typography variant="subtitle1" style={{ marginTop: '0px', color: 'red' }}>
      Uncheck the box to filter your memories, your memories will display in following order: 
          </Typography> 
      {/* <br /> */}

      <Box>
      {lines.map((line, index) => (
        <Box key={line.id} display="flex" alignItems="center" marginBottom="5px">
          <Box
            sx={{
              width: boxSize,
              height: boxSize, // Set the height to auto
              aspectRatio: '1 / 1', // Maintain the aspect ratio of 1:1
              bgcolor: cardTypeColors[line.type],
              border: 1, // 1px solid border
              borderColor: 'grey.500', // Customize the border color
              cursor: 'pointer', // Change cursor to pointer to indicate the box is clickable
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: '5px'
            }}
            onClick={() => toggleItemSelection(line.id)} // Update selection state on click
          >
            {selectedItems[line.id] && (
              <CheckIcon
                sx={{
                  fontSize: boxSize * 0.9, // Use 'fontSize' to scale the icon size
                }}
              />
            )}
          </Box>
          <Typography variant="subtitle2" style={{ marginTop: '5px', color: 'black' }}>
            {line.text}
          </Typography>
        </Box>
      ))}
    </Box>
        
      <Divider sx={{ bgcolor: 'purple' }} />

      {/* <div className="list-container"> */}
      
      <List>
        {todayFilteredCards.sort((a, b) => {
          // First, sort by review status (unreviewed first)
          if (a.isReviewed !== b.isReviewed) {
            return a.isReviewed ? 1 : -1;
          }

          // If review status is the same, then sort by card type (daily first)
          if (a.card.type !== b.card.type) {
            return typeOrder[a.card.type] > typeOrder[b.card.type] ? 1 : -1;
          }

          // If both review status and card type are the same, keep original order
          return a.card.content > b.card.content ? 1 : -1
        }).map((cardUser) => (
          <ListItem 
            key={cardUser.id} 
            className={`list-item-container list-item-hover ${cardUser.isReviewed ? 'strikethrough' : ''}`}
            secondaryAction={
              <>
              <StyledChip 
                // TODO: 1th / 11 times
                label={`${cardUser.iteration + 1}/${cardUser.card.total}`} 
                style={{ backgroundColor: '#E6F7FF', position: 'absolute', marginTop: 15, right:100 }} 
                />
                
              {cardUser.isReviewed && (
              <>
                <Typography variant="body2" style={{ marginTop: 55 }}>
                Time spent: {(cardUser.reviewDuration / 60000).toFixed(2)} min
              </Typography>
              </>
                )}

              { !cardUser.isReviewed && (
                <>
                  <IconButton onClick={() => timers[cardUser.id]?.isRunning ? stopTimer(cardUser.id) : startTimer(cardUser.id)}>
                    {timers[cardUser.id]?.isRunning ? <StopIcon /> : <PlayArrowIcon />}
                  </IconButton>

                  <IconButton onClick={() => resetTimer(cardUser.id)}>
                    <ReplayIcon /> 
                  </IconButton>
                  <Typography variant="body2">
                    Timer: {timers[cardUser.id] ? formatTime(timers[cardUser.id].elapsedTime) : '0:00'}
                  </Typography>
                </>
              )}
            </>
            }
            // define the color
            style={{ 
              width: '100%', // Adjust width as needed
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: cardTypeColors[cardUser.card.type]
              // backgroundColor: 'transparent'
            }}
          > 
          
            <Checkbox
            // sx={{
            //   color: cardTypeColors[cardUser.card.type] === "transparent" ? 'black' : cardTypeColors[cardUser.card.type],
            //   '&.Mui-checked': {
            //     color: cardTypeColors[cardUser.card.type] === "transparent" ? 'black' : cardTypeColors[cardUser.card.type],
            //   },
            //   fontWeight: 'bold'
            // }}
              edge="start"
              checked = {cardUser.isReviewed}
              disabled={cardUser.isReviewed} // Disable the checkbox if it's already reviewed
              tabIndex={-1}
              disableRipple
              size="medium" // Set the size to "small"
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${cardUser.id}` }}
              onClick={() => {
                // Check if timer is not running before marking as reviewed
                if (!timers[cardUser.id] || !timers[cardUser.id].isRunning) {
                    markMemoryAsReviewed(cardUser.id, cardUser.userID, cardUser.cardID, cardUser.iteration, cardUser.card.type);
                } else {
                    alert("Please stop timer before finish the task!")
                }
            }}
            />
            <ListItemText 
              id={`checkbox-list-label-${cardUser.id}`} 
              primary={cardUser.card.content}
              secondary = {
                cardUser.lastTimeReviewDuration >= 0
                ? `est: ${(cardUser.lastTimeReviewDuration / 60000).toFixed(2)} min`
                : 'first time review'}
              style={{ fontWeight: 'bold' }} // Replace #yourColor with your desired color
              />
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

export default TodayReview;
