/**
 * Copyright (c) Xiaxi Shen 2024
 */

import MemoryCalendar from "./MemoryCalendar";
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';

import {cardTypeColors} from '../theme/colors'

import { memoryWithoutExplanation } from '../theme/text';


const boxSize = 15; // You can set the size you want for the box and the icon here

function MemoryFilter({ onSelectionChange }) {
  const [selectedItems, setSelectedItems] = useState(() => {
    const initialState = {};
    memoryWithoutExplanation.forEach((line) => {
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

  // Invoke the callback function whenever the selection changes
  useEffect(() => {
    console.log("call")
    onSelectionChange(selectedItems);
  }, [selectedItems]);

return (
  <div style={{ textAlign: 'left', marginTop: '20px'}}>
    <Box display="flex" flexDirection="row" >
      {memoryWithoutExplanation.map((line, index) => (
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
              marginRight: '5px',
              marginLeft: line.id === -1 ? '0px' : '10px'
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
  </div>
  )
}


export default MemoryFilter
