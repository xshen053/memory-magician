import { fetchUserAttributes } from 'aws-amplify/auth';
import React, { useState, useEffect } from 'react';
import { getCardsInfoFromUserApi, updateCardInfoApi } from '../utilities/apis/cardAPI';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import '../css/style.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const StyledChip = styled(Chip)({
  marginLeft: '8px',
});

const cardTypeColors = {
  GENERAL: "transparent",
  DAILY: "#FFE0B2", 
  ONETIME: "#B3E5FC", 
  PERIODIC: "#C8E6C9", 
};

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allCardsOfUser, setCards] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  
  const handleEditClick = (card) => {
    setEditingCard(card);
    setOpenDialog(true);
  };

  const handleUpdateCard = async () => {
    // Here you would call an API to update the card, then fetch and refresh your cards list
    const data = {
      id: editingCard.id,
      content: editingCard.content
    }
    await updateCardInfoApi(data)
    setOpenDialog(false); // Close the dialog after saving
    await fetchAllCards()
  };

  const handleDeleteCard = async () => {
    const data = {
      id: editingCard.id,
      deleted: true
    }
    await updateCardInfoApi(data)
    setOpenDialog(false); // Close the dialog after saving
    await fetchAllCards()
  }

  
  useEffect(() => {
    fetchAllCards();
  }, []); // Runs only once on component mount

  const fetchAllCards = async () => {
    const currentUser = await fetchUserAttributes()
    const r = await getCardsInfoFromUserApi(currentUser["sub"])
    setCards(r)
    setSearchResults(r)
    console.log("I am in fetchAllCards")
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log(`Search for: ${searchTerm}`);
    const searchResults = search(); // Assuming search now returns the results
    setSearchResults(searchResults);
  };
  
  const search = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return allCardsOfUser.filter(card => card.content.trim().toLowerCase().includes(normalizedSearchTerm));
  };
  
  return (
    <div>
      <h2>Search your memories!</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a card..."
        />
        <button onClick={handleSearch}>Filter</button>
        <Typography variant="h6" style={{ marginTop: '5px', color: 'black', textAlign: 'left' }}>
        Click a card to modify it!
      </Typography>
      <Divider sx={{ bgcolor: 'purple' }} />
      </div>
          <List>
          {searchResults.sort((a, b) => {
            // First, sort by review status (unreviewed first)

            // If review status is the same, then sort by card type (daily first)
            if (a.type !== b.type) {
              return a.type === "DAILY" ? -1 : 1;
            }

            // If both review status and card type are the same, keep original order
            return a.content > b.content ? 1 : -1
        }).map((card) => (
            <ListItem 
              key={card.id}
              className={`list-item-container list-item-hover : ''}`}
              secondaryAction = {
                <StyledChip 
                  label={`${card.type.toLowerCase()}`} 
                  style={{ backgroundColor: 'transparent' }} // Replace #yourColor with your desired color
                />
              }
              onClick={() => handleEditClick(card)} // Add this line
              // define the color
              style={{ 
                width: '100%', // Adjust width as needed
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: cardTypeColors[card.type]
              }}
            > 
              <ListItemText 
                id={`checkbox-list-label-${card.id}`} 
                // primary={`${card.type}: ${card.content}`}
                primary = {card.content}
                style={{ fontWeight: 'bold' }} // Replace #yourColor with your desired color
                />
            </ListItem>
          ))}
        </List>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Card</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              label="Content"
              type="text"
              fullWidth
              value={editingCard ? editingCard.content : ''}
              onChange={(e) => setEditingCard({...editingCard, content: e.target.value})}
            />
            {/* Add more fields for tags or other properties here */}
          </DialogContent>
          <DialogActions>
          <Button
              onClick={() => {
                if (window.confirm('After deleting the card, it will never show again in calendar or list')) {
                  handleDeleteCard();
                }
              }}
              style={{ color: "red" }}
            >
              Delete
          </Button>         
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateCard} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

    </div>
    
  );
};

export default SearchScreen;
