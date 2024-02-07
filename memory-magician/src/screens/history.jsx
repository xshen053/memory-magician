import { fetchUserAttributes } from 'aws-amplify/auth';
import React, { useState, useEffect } from 'react';
import { getCardsInfoFromUserApi } from '../utilities/apis/cardAPI';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import '../css/style.css';


const HistoryScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allCardsOfUser, setCards] = useState([])


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
    console.log(searchResults);
    setSearchResults(searchResults);
  };
  
  const search = () => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    return allCardsOfUser.filter(card => card.content.trim().toLowerCase().includes(normalizedSearchTerm));
  };
  
  

  return (
    <div>
      <h2>Search your cards!</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a card..."
        />
        <button onClick={handleSearch}>Filter</button>
      </div>
          <List>
          {searchResults.map((card) => (
            <ListItem 
              key={card.id}
              className={`list-item-container list-item-hover : ''}`}
              // define the color
              style={{ 
                width: '100%', // Adjust width as needed
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: card.type === "GENERAL" ? "transparent" : "#FFE0B2" 
              }}
            > 
              <ListItemText 
                id={`checkbox-list-label-${card.id}`} 
                primary={card.content}
                style={{ fontWeight: 'bold' }} // Replace #yourColor with your desired color
                />
            </ListItem>
          ))}
        </List>
    </div>
  );
};

export default HistoryScreen;
