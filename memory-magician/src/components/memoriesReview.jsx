import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import FilterSelect from './FilterSelect'; // Adjust the import path as needed
import Stack from '@mui/material/Stack';

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
  const [curCardDuration, setCurCardDuration] = useState(0)
  const [localStartDate, setStartDate] = useState(new Date());
  const [sortedTodayCards, setSortedTodayCards] = useState([]);

  const [selectedItems, setSelectedItems] = useState(() => {
    const initialState = {};
    lines.forEach((line) => {
      initialState[line.id] = true; // Initialize each line as selected (true)
    });
    return initialState;
  });
  

  useEffect(() => {
    fetchTodaysMemories(); // call it when first render
    if (memoryAdded) {
      fetchTodaysMemories(); // call it when a new card is created
    }
  }, [memoryAdded]);


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
  const markMemoryAsReviewed = async (total, userID, cardID) => {
    try {
      let updatedDataArray = []
      let duration = 1000
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
        iteration: total !== 11 ? total + 1 : 1
      })
      await mutateCard(cardID, total !== 11 ? total + 1 : 1, localStartDate.toISOString())
      await createUserCardsBatchAPI(updatedDataArray)
      setSnackbarOpen(true); // Open the Snackbar to display the success message
      await fetchTodaysMemories(); // Call fetchTodaysMemories again to refresh the list
    } catch (error) {
      console.error("Error during markMemoryAsReviewed: ", error);
      throw error
    }
  }

  /**
   * Only calculate based on date
   * @param {*} utcDateStr1 
   * @param {*} utcDateStr2 
   * @returns 
   */
  function calculateDayGap(utcDateStr1, utcDateStr2) {
    // Parse the dates into Date objects
    let date1 = new Date(utcDateStr1);
    let date2 = new Date(utcDateStr2);
    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);
    
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
        
      <Divider sx={{ bgcolor: 'black', marginBottom: '10px' }} />
      <FilterSelect todayCards={todayCards} setSortedTodayCards={setSortedTodayCards} />
      <List>
    {sortedTodayCards.map((card) => (
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
                markMemoryAsReviewed(card.total, card.creatorUserID, card.id)
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
              primary={`Last reviewed: ${card.lastReviewDate ? new Date(card.lastReviewDate).toLocaleDateString().split('T')[0] : null}`}
              style={{ fontWeight: 'bold'}}
            />
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={`Days since last review: ${calculateDayGap(card.lastReviewDate, new Date().toISOString())} days`}
              style={{ fontWeight: 'bold'}}
            />
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={`Times reviewed: ${card.total}`}
              style={{ fontWeight: 'bold'}}
            />        
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={`Date created: ${new Date(card.createdAt).toLocaleDateString().split('T')[0]}`}
              style={{ fontWeight: 'bold'}}
            />    
            <Stack direction="row" spacing={1}>
              {card.tags.sort().map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small" // This makes the chip smaller
                // You can customize the Chip further, e.g., with an icon or variant
              />
            ))}
            </Stack>                        
            <ListItemText
              id={`checkbox-list-label-${card.id}`}
              primary={
                <Typography 
                  component="span" // Use "span" to inline with other text if needed
                  style={{ fontWeight: 'bold'}}
                >
                  {/* {"leetcode link: "} */}
                  {/* Here's the link */}
                  <Link href={card.link} target="_blank" rel="noopener noreferrer">
                    Link
                  </Link>

                  
                </Typography>
              }
            />                  
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
