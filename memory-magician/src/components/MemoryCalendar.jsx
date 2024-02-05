import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/MemoryCalendar.css";
import { getAllUnreviewedCardsOfUser } from '../utilities/apis/carduserAPI';
import { fetchUserAttributes } from 'aws-amplify/auth';

const localizer = momentLocalizer(moment);

function MemoryCalendar(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const currentUser = await fetchUserAttributes()
        const allCardUser = await getAllUnreviewedCardsOfUser(currentUser["sub"])
        const formattedEvents = [];
        allCardUser.forEach((cardUser) => {
            formattedEvents.push({
              title: cardUser.card.content,
              start: new Date(
                moment(cardUser.reviewDate).tz("America/Los_Angeles").toDate()
              ),
              end: new Date(
                moment(cardUser.reviewDate).tz("America/Los_Angeles").toDate()
              ),
              color: "#c5b4e3"
              // cardUser.title === "Special Event"
              //     ? "blue"
              //     : "#c5b4e3",
            });
        });
        setEvents(formattedEvents);
      } catch (error) {
        console.log("Error during fetchCards: ", error)
        throw error
      }
    }
    fetchCards()
  }, []);

  return (
    <div style={props.style}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        className="responsiveCalendar"
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
    </div>
  );
}

export default MemoryCalendar;
