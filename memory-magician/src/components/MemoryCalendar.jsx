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

const localizer = momentLocalizer(moment);

function MemoryCalendar(props) {
  const { memoryAdded } = useMemory();
  const [events, setEvents] = useState([]);

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
              isCompleted: cardUser.isReviewed
            });
        });
        formattedEvents.sort((a, b) => {
          // Assuming isCompleted: true means the task is completed,
          // so false (not completed) should come before true (completed)
          return a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1;
        });
        
        setEvents(formattedEvents);
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
    <div style={props.style}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="responsiveCalendar"
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}

export default MemoryCalendar;
