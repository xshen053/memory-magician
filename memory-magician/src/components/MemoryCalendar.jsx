import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/MemoryCalendar.css";
import { getAllUserCardsOfUser2 } from '../utilities/apis/carduserAPI';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useMemory } from "../context/MemoryContext.jsx"
import MemoryFilter from './MemoryFilter.jsx';

const cardTypeColors = {
  HELP: "#FCE4EC",
  GENERAL: "transparent",
  DAILY: "#FFE0B2", 
  ONETIME: "#B3E5FC", 
  PERIODIC: "#C8E6C9", 
};

const order = {
  "DAILY" : 0,
  "ONETIME" : 1,
  "PERIODIC" : 2,
  "GENERAL" : 3
}

const lines = [
  { id: -1, type: "HELP", text: "Select / Deselect all memories"},
  { id: 0, type: "DAILY", text: "Daily memory" },
  { id: 1, type: "ONETIME", text: "One-time memory" },
  { id: 2, type: "PERIODIC", text: "Periodic memory" },
  { id: 3, type: "GENERAL", text: "General memory" },
];

const localizer = momentLocalizer(moment);

function MemoryCalendar(props) {
  const [searchTerm, setSearchTerm] = useState(''); // only usage is update the box
  const { memoryAdded } = useMemory();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([])
  const [currentfilter, setFilter] = useState(() => {
    const initialState = {};
    lines.forEach((line) => {
      initialState[line.id] = true; // Initialize each line as selected (true)
    });
    return initialState;
  });


  const handleFilterChange = (selectedItems) => {
    setFilter(selectedItems)
    // everytime we apply new filter to all events
    const resultAfterSearch = search(searchTerm, events)
    const resultAfterSearchAndFilter = filter(resultAfterSearch, selectedItems)
    // and update filtered one
    setFilteredEvents(resultAfterSearchAndFilter);
  };

  /**
   * update seaerchResults to display results in real-time
   * 
   * @param {*} value serachTerm
   * don't need update searchResults
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value); // sync
    const resultAfterFilter = filter(events, currentfilter)
    const resultAfterSearchAndFilter = search(value, resultAfterFilter); // Assuming search now returns the results
    setFilteredEvents(resultAfterSearchAndFilter);
  };


  const search = (term, inputData) => {
    if (!term) {
      return inputData
    }
    const normalizedSearchTerm = term.trim().toLowerCase();
    return inputData.filter(card => card.title.trim().toLowerCase().includes(normalizedSearchTerm));
  };  


  useEffect(() => {
    const fetchCards = async () => {
      try {
        const currentUser = await fetchUserAttributes()
        const allCardUser = await getAllUserCardsOfUser2(currentUser["sub"])
        const formattedEvents = [];
        allCardUser.forEach((cardUser) => {
            formattedEvents.push({
              title: cardUser.card.content,
              start: new Date(
                moment(cardUser.reviewDate).toDate()
              ),
              end: new Date(
                moment(cardUser.reviewDate).toDate()
              ),
              // color: cardUser.isReviewed ? "#F5F5F5" : "#c5b4e3",
              color: cardTypeColors[cardUser.card.type],
              isCompleted: cardUser.isReviewed,
              type: cardUser.card.type
            });
        });
        formattedEvents.sort((a, b) => {
          // Assuming isCompleted: true means the task is completed,
          // so false (not completed) should come before true (completed)
          if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1
          }
          
          if (a.type !== b.type) {
            return order[a.type] > order[b.type] ? 1 : -1;
          }
          return a.title > b.title

          // return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
        });
        // at the beginning, they are the same
        setEvents(formattedEvents)
        const filteredFormattedEvents = filter(formattedEvents, currentfilter)
        setFilteredEvents(filteredFormattedEvents);
      } catch (error) {
        console.log("Error during fetchCards: ", error)
        throw error
      }
    }
    fetchCards()
    if (memoryAdded) {
      fetchCards(); // call it when a new card is created
    }
  }, [memoryAdded]);

  const filter = (events, filteredResults) => {
      const chosedType = new Set(); // Note: Corrected 'set()' to 'new Set()'
      lines.forEach((line) => {
        if (filteredResults[line.id] === true) {
          chosedType.add(line.type);
        }
      });
      const filteredEvents = events.filter((cardUser) => {
        return chosedType.has(cardUser.type);
      })
      return filteredEvents
  }

  const eventStyleGetter = (event) => {
    let newStyle = {
      backgroundColor: event.color,
      textDecoration: event.isCompleted ? 'line-through' : 'none', // Apply strikethrough if event is completed
    };

    return {
      style: newStyle
    };
  };

  return (
    <div>
    <MemoryFilter onSelectionChange={handleFilterChange} />
    <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search for a card..."
    />
    <div style={props.style}>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        showAllEvents= {true}
        startAccessor="start"
        endAccessor="end"
        className="responsiveCalendar"
        eventPropGetter={eventStyleGetter}
      />
    </div>
    
    </div>
  );
}

export default MemoryCalendar;
