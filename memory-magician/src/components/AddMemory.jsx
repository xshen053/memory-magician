import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { InputAdornment } from '@mui/material';
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from '@mui/material/Chip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import { createUserCardsBatchAPI } from '../utilities/apis/carduserAPI';
import { createCardApi } from '../utilities/apis/cardAPI';
import { generateAllReviewDates, generateDatesForDailyCards, generateDatesForPeriodicCards } from '../utilities/algorithm/ebbinghaus-forgetting-curve1';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useMemory } from '../context/MemoryContext.jsx';


function AddMemory() {
  // iteration of card starts from 0

  const PERIDOICCOUNT = 50
  const ONETIMECOUNT = 1
  const DEFAULTDURATION = -1

  const { triggerMemoryAdded } = useMemory();

  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selection, setSelection] = useState("ONETIME"); // Initialize with a default value
  const [tags, setTags] = useState([]); // State to hold the tags
  const [newTag, setNewTag] = useState(""); // State to hold the new tag input
  const [reviewDates, setReviewDates] = useState([])
  const [dailyDates, setDailyDates] = useState([])
  const [loading, setLoading] = useState(false);
  const [showRepeatDuration, setShowRepeatDuration] = useState(false);
  const [repeatDuration, setRepeatDuration] = useState('');
  const [titleError, setTitleError] = useState(false);

  


  useEffect(() => {
    // one day only calculate once
    // TODO: will change in the future if allow customized learning interval
    const prepareForReviewDatesForTodayNewTask = () => {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      if (reviewDates.length === 0) {
        const rd = generateAllReviewDates(todayDate);
        setReviewDates(rd);
      }
      if (dailyDates.length === 0) {
        const dd = generateDatesForDailyCards(todayDate);
        setDailyDates(dd)
      }
      console.log("I am in prepareForReviewDatesForTodayNewTask")
    };
    prepareForReviewDatesForTodayNewTask();
  }, []); // Runs only once on component mount
  
  const handleChange = (event) => {
    setSelection(event.target.value);
    setShowRepeatDuration(event.target.value === 'PERIODIC');

  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) { // Prevent adding empty or duplicate tags
      setTags(prevTags => [...prevTags, newTag]);
      setNewTag(""); // Clear input after adding
    }
  };

  // Function to remove a tag
  const handleRemoveTag = (tagToRemove) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  /**
   * GENERAL task:
   * - create using {@link reviewDates}
   * 
   * DAILY task:
   * - create using {@link dailyDates}
   * 
   * ONETIME task:
   * - create using todayDate
   * 
   * PERIODIC task:
   * - create PeriodicDates first
   * - create using PeriodicDates
   * 
   * @param {Object} userCardData - The data for a user's review card.
   * @param {string} userCardData.userID - The unique identifier for the user.
   * @param {string} userCardData.cardID - The unique identifier for the card being reviewed.
   * @param {number} userCardData.reviewDuration - The duration of the current review session in minutes. Initialized to -1 indicating not started or not applicable.
   * @param {number} userCardData.lastTimeReviewDuration - The duration of the last review session in minutes. Initialized to -1 indicating no previous review or not applicable.
   * @param {boolean} userCardData.isReviewed - Flag indicating whether the card has been reviewed in the current session. False indicates not reviewed.
   * 
   * @returns {Object[]} An array of objects, each containing:
   * - userID: Identifier for the user.
   * - cardID: Identifier for the card.
   * - reviewDuration: Initial value set to {@link DEFAULTDURATION}.
   * - lastTimeReviewDuration: Initial value set to {@link DEFAULTDURATION}.
   * - isReviewed: Boolean indicating if the card has been reviewed, initially false.
   * - reviewDate: Date of the review (format description, e.g., ISO 8601 string).
   * - iteration: Number indicating the review iteration.
   */
  const addDateToCardData = (userCardData) => {
    let updatedDataArray = []
    if (selection === "GENERAL") {
      updatedDataArray = reviewDates.map((reviewDate, index) => {
        // Create a new data object for each call with the updated reviewDate
        return {
          ...userCardData, 
          reviewDate: reviewDate,
          iteration: index 
        };
      });
    }
    if (selection === "DAILY") {
      updatedDataArray = dailyDates.map((reviewDate, index) => {
        return {
          ...userCardData, 
          reviewDate: reviewDate,
          iteration: index 
        };
      });
    }
    // NOREVIEW is for backward compatibility
    if (selection === "ONETIME" || selection === "NOREVIEW") {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      updatedDataArray.push({
        ...userCardData,
        reviewDate: todayDate.toISOString(),
        iteration: 0
      })
    }        
    if (selection === "PERIODIC") {
      const todayDate = new Date();
      todayDate.setHours(0, 0, 0, 0);
      const periodicDates = generateDatesForPeriodicCards(todayDate, repeatDuration)
      updatedDataArray = periodicDates.map((reviewDate, index) => {
        return {
          ...userCardData,
          reviewDate: reviewDate,
          iteration: index 
        };
      });      
    }
    return updatedDataArray
  }

  /**
   * get total iteration times based on card type
   * 
   * @returns {number}
   */
  const getTotal = () => {
    if (selection === "GENERAL") {
      return reviewDates.length
    }
    if (selection === "DAILY") {
      return dailyDates.length
    }
    // NOREVIEW is for backward compatibility
    if (selection === "ONETIME" || selection === "NOREVIEW") {
      return ONETIMECOUNT
    }        
    if (selection === "PERIODIC") {
      return PERIDOICCOUNT
    }
  }

  const createCardAndAddToDataBase = async () => {
    try {
      // get keys
      const currentUser = await fetchUserAttributes()
      const userID = currentUser["sub"]

      const count = getTotal()

      // create card
      const cardID = await createCardApi(
      {
        content: title,
        tags: tags,
        type: selection, 
        total: count
      })
      
      // generate userCardDate
      const userCardData = {
        userID: userID,
        cardID: cardID,
        reviewDuration: DEFAULTDURATION,             
        lastTimeReviewDuration: DEFAULTDURATION,
        isReviewed: false,
      }
      const updatedDataArray = addDateToCardData(userCardData)
      await createUserCardsBatchAPI(updatedDataArray)
      
    } catch (error) {
      console.log("error when creating new task: ", error)
      setLoading(false); // Stop loading on error
      alert(error)
      throw error
    }
  }

  const cleanAllStates = () => {
        setLoading(false); // Stop loading on success
        setTags([]);
        setOpen(false);
        setSnackbarOpen(true);
        setTitle("")
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Check if the title is empty
    if (!title.trim()) {
      setTitleError(true); // Show validation error
      return; // Prevent further processing
    }
    // Reset validation state if the title passes validation
    setTitleError(false);

    setLoading(true); // Start loading
    await createCardAndAddToDataBase()
    cleanAllStates(); // Call cleanAllStates() after finishing adding
    triggerMemoryAdded(); // trigger a context to refresh place need the card in all screens
  };

  return (
    <div>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4b2e83", // This is your custom color.
          "&:hover": {
            backgroundColor: "#85754d", // This is a slightly darker shade for the hover effect.
          },
        }}
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-memory-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: "80%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginBottom: "20px" }}
          >
            Add Card
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Add New Card"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              // Optionally reset validation state on change
              if (titleError && e.target.value.trim() !== '') setTitleError(false);
            }}
            error={titleError} // Show error styling if titleError is true
            helperText={titleError ? "This field cannot be empty." : ""} // Show helper text when there's an error
            style={{ marginBottom: "20px" }}
          />

        <TextField
          fullWidth
          variant="outlined"
          label="Add Tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent form submission on Enter
              handleAddTag();
            }
          }}
          style={{ marginBottom: "20px" }}
        />
        <Button onClick={handleAddTag} style={{ marginBottom: "5px" }}>
          Add Tag
        </Button>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: "20px" }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{
                bgcolor: '#c5b4e3', // Light blue background
                '& .MuiChip-deleteIcon': {
                  color: '#ffffff', // Dark blue delete icon
                },
              }}
              color='primary'
            />
          ))}
        </Box>  

          <FormControl style={{ marginBottom: "20px"}}>
            <InputLabel id="demo-simple-select-label">
              Options
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selection.toUpperCase()} // Convert selection to uppercase
              label="Options"
              onChange={handleChange}
              >
              <MenuItem value="ONETIME">One-time</MenuItem>
              <MenuItem value="GENERAL">General</MenuItem>
              <MenuItem value="DAILY">Daily</MenuItem>
              <MenuItem value="PERIODIC">Repeat</MenuItem>
            </Select>
          </FormControl>
          {showRepeatDuration && (
            <TextField
              fullWidth
              variant="outlined"
              label="Repeat every ..."
              value={repeatDuration}
              onChange={(e) => setRepeatDuration(e.target.value)}
              style={{ marginBottom: "20px" }}
              InputProps={{
                endAdornment: <InputAdornment position="end">days</InputAdornment>,
              }}              
            />
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleSubmit(e)}
            fullWidth
            style={{
              padding: "10px",
              transition: "background-color 0.3s",
              backgroundColor: "#4b2e83", // Change this line
            }}
            hover={{
              backgroundColor: "#1976D2",
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            bgcolor: "#4b2e83", // Blue background color 4b2e83
            color: "#fff", // White text color
            ".MuiAlert-icon": { color: "#e8e3d3" }, // This targets the checkmark icon e8e3d3
            ".MuiAlert-message": {
              color: "#e8e3d3",
              fontWeight: "bold", // Bold text
            }, // Yellow text color for the "Good Job!" message
          }}
        >
          Congrations! Card is successfully added!
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        open={loading}
        >
      {/* You can use CircularProgress or replace it with an img tag for a GIF */}
      <CircularProgress color="inherit" />
    </Backdrop>      
    </div>
  );
}

export default AddMemory;
