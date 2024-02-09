import { fetchUserAttributes } from 'aws-amplify/auth';
import React, { useState, useEffect } from 'react';
import { getCardsInfoFromUserApi, updateCardInfoApi } from '../utilities/apis/cardAPI';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import '../css/style.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MemoryFilter from '../components/MemoryFilter';
import { StyledChip } from '../theme/componentsStyle';
import { cardTypeColors } from '../theme/colors';
import { typeOrder } from '../theme/constants'
import { memoryWithoutExplanation } from '../theme/text'

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState(''); // only usage is update the box
  const [searchResults, setSearchResults] = useState([]);
  const [allCardsOfUser, setCards] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [selectedItems, setSelectedItems] = useState([])

  const handleTypeChange = (selectedItems) => {
    setSelectedItems(selectedItems)
    const resultAfterSearch = search(searchTerm, allCardsOfUser)
    const resultAfterFilterAndSearch = filt(selectedItems, resultAfterSearch)
    setSearchResults(resultAfterFilterAndSearch)
  };

  /**
   * filter inputData using filter
   * 
   * @param {*} inputfilter 
   * @param {*} inputData 
   * @returns 
   */
  const filt = (inputfilter, inputData) => {
    const chosedType = new Set(); // Note: Corrected 'set()' to 'new Set()'
    memoryWithoutExplanation.forEach((memory) => {
      if (inputfilter[memory.id] === true) {
        chosedType.add(memory.type);
      }
    });
    const filteredResults = inputData.filter((cardUser) => {
      return chosedType.has(cardUser.type);
    })
    return filteredResults
}  

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
    const sr = searchResults.filter((r) => {
      return r.id !== editingCard.id
    })
    const ar = allCardsOfUser.filter((r) => {
      return r.id !== editingCard.id
    })
    setSearchResults(sr)
    setCards(ar)
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

  /**
   * update seaerchResults to display results in real-time
   * 
   * @param {*} value serachTerm
   * don't need update searchResults
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value); // sync
    const resultAfterFilter = filt(selectedItems, allCardsOfUser)
    const resultAfterSearchAndFilter = search(value, resultAfterFilter); // Assuming search now returns the results
    setSearchResults(resultAfterSearchAndFilter);
  };

  
  const search = (term, inputData) => {
    if (!term) {
      return inputData
    }
    const normalizedSearchTerm = term.trim().toLowerCase();
    return inputData.filter(card => card.content.trim().toLowerCase().includes(normalizedSearchTerm));
  };
  
  return (
    <div>
      <h2>Search your memories!</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search for a card..."
        />
        <MemoryFilter onSelectionChange={handleTypeChange} />
        <Typography variant="h6" style={{ marginTop: '5px', color: 'black', textAlign: 'left' }}>
        Click a memory to modify it!
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
                <div style={{ display: 'flex', width: '100%' }}>
                <StyledChip 
                  label={`Created at (local time): ${new Date(card.createdAt).toLocaleString()}`} 
                  style={{ backgroundColor: 'transparent', flex: 1 }} // flex 1 allows this chip to grow
                />
                <StyledChip 
                  label={`${card.type.toLowerCase()}`} 
                  style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'flex-start' }} // flex 1 allows this chip to grow
                />
              </div>
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
