import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/MemoryCalendar.css";
import { getAllUserCardsOfUser } from '../utilities/apis/carduserAPI';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { useMemory } from "../context/MemoryContext.jsx"
import CalendarFilter from './CalendarFilter.jsx';


const lines = [
  { id: -1, type: "HELP", text: "Select / Deselect all memories"},
  { id: 0, type: "DAILY", text: "Daily memory" },
  { id: 1, type: "ONETIME", text: "One-time memory" },
  { id: 2, type: "PERIODIC", text: "Periodic memory" },
  { id: 3, type: "GENERAL", text: "General memory" },
];

const localizer = momentLocalizer(moment);

function MemoryCalendar(props) {
  const { memoryAdded } = useMemory();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([])
  const [filterState, setFilterState] = useState(() => {
    const initialState = {};
    lines.forEach((line) => {
      initialState[line.id] = true; // Initialize each line as selected (true)
    });
    return initialState;
  });

  const handleFilterChange = (items) => {
    setFilterState(items)
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const currentUser = await fetchUserAttributes()
        const allCardUser = await getAllUserCardsOfUser(currentUser["sub"])
        const formattedEvents = [];
        allCardUser.forEach((cardUser) => {
            formattedEvents.push({
              title: cardUser.card.content,
              start: new Date(
                moment(cardUser.reviewDate).utc().toDate()
              ),
              end: new Date(
                moment(cardUser.reviewDate).utc().toDate()
              ),
              color: cardUser.isReviewed ? "#F5F5F5" : "#c5b4e3",
              isCompleted: cardUser.isReviewed,
              type: cardUser.card.type
            });
        });
        formattedEvents.sort((a, b) => {
          // Assuming isCompleted: true means the task is completed,
          // so false (not completed) should come before true (completed)
          return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
        });
        // back up the original one
        setEvents(formattedEvents)
        const filteredFormattedEvents = filter(formattedEvents)
        // filtered one
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


  useEffect(() => {
    // everytime we apply new filter to all events
    const filteredFormattedEvents = filter(events)
    // and update filtered one
    setFilteredEvents(filteredFormattedEvents);
  }, [filterState])


  const filter = (events) => {
      const chosedType = new Set(); // Note: Corrected 'set()' to 'new Set()'
      lines.forEach((line) => {
        if (filterState[line.id] === true) {
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
    <CalendarFilter onSelectionChange={handleFilterChange} />
    <div style={props.style}>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
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
