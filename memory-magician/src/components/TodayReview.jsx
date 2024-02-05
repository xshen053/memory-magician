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
import { getAllUnreviewedCardsOfUserForToday } from '../utilities/apis/carduserAPI';

const StyledChip = styled(Chip)({
  marginLeft: '8px',
});

function TodayReview() {
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
        console.log(r)
        console.log("I am in fetchTodaysMemories")
      } catch (error) {
        console.log("Error during fetchTodaysMemories: ", error)
        throw error
      }
    }

    fetchTodaysMemories(); // Use the extracted function here
  }, []);

  function markMemoryAsReviewed(memoryId) {
    setSnackbarOpen(true); // Open the Snackbar to display the success message
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
        {todayCards.map((card) => (
          <ListItem key={card.id} secondaryAction={
            <StyledChip label={`${card.iteration}/${card.card.total}`} color="primary" />
          }>
            <Checkbox
              edge="start"
              // checked={card.isReviewed}
              checked = {true}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${card.id}` }}
              onClick={() => markMemoryAsReviewed(card.id)}
            />
            <ListItemText id={`checkbox-list-label-${card.id}`} primary={card.card.content} />
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
