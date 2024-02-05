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

const StyledChip = styled(Chip)({
  marginLeft: '8px',
});

function TodayReview() {
  const [cards, setCards] = useState([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of today
  const startOfToday = today.toISOString();
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Set to start of tomorrow
  const startOfTomorrow = tomorrow.toISOString();
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  function triggerTestSnackbar() {
    setSnackbarOpen(true);
  }

  function fetchTodaysMemories() {
    axios
      .get("https://9d50-66-160-179-28.ngrok-free.app/api/memory/", {
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((response) => {
        console.log(response.data); // Add this line to inspect the response data
        const todaysMemories = response.data.filter((memory) => {
          return memory.review_dates.some((reviewDateObj) =>
            moment(reviewDateObj.date)
              .tz("America/Los_Angeles")
              .isSame(today, "day")
          );
        });
        setMemories(todaysMemories);
      })
      .catch((error) => {
        console.error("Error fetching today's memories:", error);
      });
  }

  useEffect(() => {
    fetchTodaysMemories(); // Use the extracted function here
  }, []);

  function markMemoryAsReviewed(memoryId) {
    axios
      .post(`http://127.0.0.1:8000/api/mark_as_reviewed/${memoryId}/`)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "Memory marked as reviewed.") {
          // Remove this memory from the list
          setMemories((prevMemories) =>
            prevMemories.filter((memory) => memory.id !== memoryId)
          );
          setSnackbarOpen(true); // Open the Snackbar to display the success message
        }
      })
      .catch((error) => {
        console.error("Error marking memory as reviewed:", error);
      });
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
        {memories.map((memory) => (
          <ListItem key={memory.id} secondaryAction={
            <StyledChip label={`3/18`} color="primary" />
          }>
            <Checkbox
              edge="start"
              checked={memory.reviewed}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': `checkbox-list-label-${memory.id}` }}
              onClick={() => markMemoryAsReviewed(memory.id)}
            />
            <ListItemText id={`checkbox-list-label-${memory.id}`} primary={memory.title} />
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
