import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { useState, useEffect } from "react";
import "../css/MemoryCalendar.css";

const localizer = momentLocalizer(moment);

function MemoryCalendar(props) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("https://9d50-66-160-179-28.ngrok-free.app/api/memory/", {
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
    })
      .then((response) => {
        const formattedEvents = [];

        response.data.forEach((memory) => {
          memory.review_dates.forEach((reviewDateObj) => {
            formattedEvents.push({
              title: memory.title,
              start: new Date(
                moment(reviewDateObj.date).tz("America/Los_Angeles").toDate()
              ),
              end: new Date(
                moment(reviewDateObj.date).tz("America/Los_Angeles").toDate()
              ),
              color:
                memory.title === "Special Event"
                  ? "blue"
                  : "rgb(233, 221, 174)",
            });
          });
        });

        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("There was an error fetching the memories:", error);
      });
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
