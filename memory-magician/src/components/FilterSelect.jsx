/**
 * Copyright (c) Xiaxi Shen 2024
 */

import React, { useState, useEffect } from 'react';

const FilterSelect = ({ todayCards, setSortedTodayCards }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending'); // New state for tracking sort order

  useEffect(() => {
    // Define a general sorting function that also checks for the sort order
    const sortFunction = (a, b, isAscending, compareFunction) => {
      const result = compareFunction(a, b);
      return isAscending ? result : -result; // If descending order is selected, reverse the result
    };

    // Function to extract the leading number from a string.
    const extractLeadingNumber = (str) => {
      const match = str.match(/^(\d+)/); // Regex to match a number at the start of the string
      return match ? parseInt(match[0], 10) : sortOrder === 'ascending' ? Infinity : -Infinity; // Return Infinity if no number is found
    };

    // Comparator for sorting by the leading number in the content string.
    const compareByLeadingNumber = (a, b) => {
      const numA = extractLeadingNumber(a.content);
      const numB = extractLeadingNumber(b.content);
      return numA - numB; // For ascending order
    };    
    
    let sortedCards = [...todayCards]; // Clone the array to prevent direct state mutation
  
    switch (selectedFilter) {
      case 'total':
        // Sort by 'total' reviews, ascending or descending
        sortedCards.sort((a, b) => sortFunction(a, b, sortOrder === 'ascending', (x, y) => x.total - y.total));
        break;
      case 'dateCreated':
        // Sort by 'date created', ascending or descending
        sortedCards.sort((a, b) => sortFunction(a, b, sortOrder === 'ascending', (x, y) => new Date(x.createdAt) - new Date(y.createdAt)));
        break;
      case 'lastReviewed':
        // Sort by 'last reviewed' date, ascending or descending
        sortedCards.sort((a, b) => sortFunction(a, b, sortOrder === 'ascending', (x, y) => new Date(x.lastReviewDate) - new Date(y.lastReviewDate)));
        break;
      case 'content':
        sortedCards.sort((a, b) => sortFunction(a, b, sortOrder === 'ascending', (x, y) => compareByLeadingNumber(x, y)));
        break;        
      // Add more cases as needed for other filters
      default:
        // If no filter is selected, or for a default unsorted state, don't sort
        break;
    }
  
    // Update the state with the newly sorted cards
    setSortedTodayCards(sortedCards);
  
  }, [selectedFilter, sortOrder, todayCards]);
  

  return (
    <div>
      <label htmlFor="filter-select">Sort Memories:</label>
      <select
        id="filter-select"
        value={selectedFilter}
        onChange={(e) => setSelectedFilter(e.target.value)}
      >
        <option value="">Select a filter...</option>
        <option value="total">Times Reviewed</option>
        <option value="dateCreated">Date Created</option>
        <option value="lastReviewed">Last Reviewed</option>
        <option value="content">Title</option>
      </select>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>      

    </div>
  );
};

export default FilterSelect;
