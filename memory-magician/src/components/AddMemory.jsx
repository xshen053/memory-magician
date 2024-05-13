/**
 * Copyright (c) Xiaxi Shen 2024
 */

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Modal,
  Box,
  Fab,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Backdrop,
  CircularProgress,
  InputAdornment
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMemory } from "../context/MemoryContext";
import { createCardApi } from "../utilities/apis/cardAPI";
import { createUserCardsBatchAPI } from '../utilities/apis/carduserAPI';
import { prepareForReviewDatesForNewTask, addDateToCardData } from "../utilities/algorithm/ebbinghaus-forgetting-curve1";
import { fetchUserAttributes } from "aws-amplify/auth";

function AddMemory() {
  // invariant: iteration field of UserCard starts from 0

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
  const [loading, setLoading] = useState(false);
  const [showRepeatDuration, setShowRepeatDuration] = useState(false);
  const [repeatDuration, setRepeatDuration] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [repeatDayError, setRepeatDayError] = useState(false);
  const [tagError, setTagError] = useState(false);
  const [localStartDate, setStartDate] = useState(new Date());

  /**
   * Handles the change event when the user selects a different card type.
   * Updates the selection state and controls the visibility of the repeat duration input.
   * 
   * @param {object} event The event object containing information about the change event.
   *                      Should include a 'value' property representing the selected card type.
   */
  const handleCardTypeChange = (event) => {
    // Update the selection state based on the user's choice
    setSelection(event.target.value);
    
    // Determine whether to show the repeat duration input based on the selected card type
    const isPeriodic = event.target.value === 'PERIODIC';
    setShowRepeatDuration(isPeriodic);
  };

  /**
   * precondition:
   * new tag is updated in {@link newTag}
   * 
   * Get called when user clicks add tag 
   * 
   * @effects {@link newTag} is set to empty since the tag user wants to add is updated in {@link tag}
   */
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) { // Prevent adding empty or duplicate tags
      setTags(prevTags => [...prevTags, newTag]);
      setNewTag(""); // Clear input after adding
      setTagError(false)
    }
  };

  /**
   * Remove input tag from {@link tags}
   * 
   * @param {*} tagToRemove 
   * @effect {@link tags} gets updated
   */
  const handleRemoveTag = (tagToRemove) => {
    setTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  /**
   * get total iteration times based on card type
   * 
   * @returns {number} number of iteartion needed
   */
  const getTotalReviewTimes = (reviewDates, dailyDates) => {
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
  
  /**
   * Precondition:
   * This function requires the following states to be initialized and populated with valid data:
   * - {@link title}: The `title` state must hold the content or description of the card to be created.
   * - {@link tags}: The `tags` state should contain an array of tags associated with the card.
   * - {@link selection}: The `selection` state needs to specify the type of card (e.g., DAILY, GENERAL).
   * - {@link count}: The `count` state should represent the total number of review dates or interactions expected for the card.
   * - {@link localStartDate}: The `localStartDate` records today's date (new Date())
   * 
   * Functionality:
   * Create a card and associated review dates entries in the database.
   * Utilizes user input from various states to configure and initiate the creation of a new card,
   * followed by generating and adding review dates based on predefined logic.
   * 
   * Gernerate review dates entries by following steps:
   * 1. Prepare review dates based on the memory's start date using {@link prepareForReviewDatesForNewTask}
   * 2. Assemble review entries with user and card data using {@link addDateToCardData}
   * 3. Batch add these entries to the database using {@link createUserCardsBatchAPI}
   * @effects Upon successful completion, a new card and several review date entries are added to the database.
   *          In case of failure, it logs and rethrows the error for upstream handling.
   */
  const createCardAndAddToDataBase = async () => {
    try {
      const { reviewDates, dailyDates } = prepareForReviewDatesForNewTask(localStartDate)
      const currentUser = await fetchUserAttributes()
      const userID = currentUser["sub"]
      const count = getTotalReviewTimes(reviewDates, dailyDates)
      const cardID = await createCardApi({ content: title, tags: tags, type: selection, total: count, creatorUserID: userID });
      // assembe UserCard entry
      const utcStartDateString = localStartDate.toISOString();
      const unassembledUserCard = { userID: userID, cardID: cardID, reviewDuration: DEFAULTDURATION, lastTimeReviewDuration: DEFAULTDURATION, isReviewed: false };
      const assembledUserCard = addDateToCardData(utcStartDateString, selection, unassembledUserCard, reviewDates, dailyDates, repeatDuration)
      await createUserCardsBatchAPI(assembledUserCard)
    } catch (error) {
      console.log("error when creating new task: ", error)
      setLoading(false); // Stop loading on error
      alert(error)
      throw error
    }
  }

  /**
   * When user finishs adding a card and clicked submit
   * This function gets called to set all states back to default
   */
  const cleanAllStates = () => {
        setTags([]);
        setOpen(false);
        setSnackbarOpen(true);
        setTitle("")
  }

  /**
   * Triggered when user clicks add button to add a new card
   * 
   * It first check if following states are valid:
   * 1. {@link title} if a user forgets to input title
   * 2. {@link repeatDuration} If a user wants to create a "PERIODIC" card,
   * but forgot to input how ofter he wants to repeat
   * 3. {@link newTag} if a user wants to add a tag (typed something in the box)
   * but forgot to add it by clicking Add Tag button
   * 
   * @effects_error If it didn't pass above checks, it will directly return and show some errors
   * by setting error states to true,
   * using {@link setTitleError}, {@link setRepeatDayError}, {@link setTagError}
   * 
   * If it passes above check, it will then do following things:
   * 1. reset error states using {@link setTitleError}, {@link setRepeatDayError}, {@link setTagError}
   * 2. add a loading animation using {@link setLoading}
   * 3. call {@link createCardAndAddToDataBase} to interact with the database to add datas
   * 4. clean all states {@link cleanAllStates}
   * 5. update all pages having dependency with cards update by calling {@link triggerMemoryAdded}
   * 
   * @effects_success database gets updated
   * @param {Event} event - The event object associated with the form submission. This object 
   * contains all the information about the event, including the element that triggered the event
   * (e.g., the submit button). The `event` object is used primarily to prevent the default 
   * form submission behavior, allowing for custom validation and data handling.
   * 
   * The `event` parameter is a standard DOM event object and supports all properties and methods
   * defined by the Event interface, such as `event.preventDefault()` and `event.target`.
   */
  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault(); 
    // Check if the title is empty
    if (!title.trim()) {
      // Show validation error
      setTitleError(true); 
      // Prevent further processing
      return; 
    }
    if (selection === "PERIODIC" && !repeatDuration.trim()) {
      setRepeatDayError(true);
      return
    }
    if (newTag) {
      setTagError(true);
      return 
    }
    // Reset validation state if the title passes validation
    setTitleError(false);
    setRepeatDayError(false)
    setTagError(false)
    // Start loading
    setLoading(true); 
    try {
      // Try to execute the database operation
      await createCardAndAddToDataBase();
      // If successful, perform further actions
      cleanAllStates(); // Reset states after successful database interaction
      triggerMemoryAdded(); // Update UI or notify other components
    } catch (error) {
      // Handle any errors that occur during the database operation
      console.error("Failed to create card and add to database:", error);
      // Optionally, set an error state to provide feedback to the user
      alert(error)
    } finally {
      // This block runs regardless of try/catch outcome
      setLoading(false); // Ensure loading state is reset when operation is complete
    }
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
        onClick={() => {setOpen(true);setTagError(false)}}
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
        
        <FormControl fullWidth style={{ marginBottom: "20px" }}>
          <DatePicker
            selected={localStartDate}
            onChange={(date) => {setStartDate(date)
            }}
            customInput={<TextField label="Memory starts on" fullWidth variant="outlined"/>}
            dateFormat="MMMM d, yyyy"
          />
        </FormControl>              
        <TextField
          fullWidth
          variant="outlined"
          label="Add Tag"
          value={newTag}
          onChange={(e) => {setNewTag(e.target.value);
            // after click the add button, newTag becomes empty, so set Error to false
            if (tagError && !newTag) setTagError(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevent form submission on Enter
              handleAddTag();
            }
          }}
          error={tagError} // Show error styling if titleError is true
          helperText={tagError ? "Please click add tag button if you want to add one tag! " : ""} // Show helper text when there's an error          
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
              onChange={handleCardTypeChange}
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
              onChange={(e) => {setRepeatDuration(e.target.value);
                if (repeatDayError && repeatDuration !== '') setRepeatDayError(false)
              }}
              error={repeatDayError}
              helperText={repeatDayError ? "This field cannot be empty." : ""} // Show helper text when there's an error            
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
