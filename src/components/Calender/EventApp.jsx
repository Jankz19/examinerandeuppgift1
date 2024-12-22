import React, { useContext } from "react";
import { EventContext } from "./EventContext";
import EventList from "./EventList"; 
import "./eventapp.css";

const EventApp = () => {
const {
    events,
    currentEvent,
    filter,
    setCurrentEvent,
    setFilter,
    saveEvent,
    } = useContext(EventContext);

    const filteredEvents = events.filter((event) => {
        const now = new Date();
        if (filter === "upcoming") return new Date(event.start) > now;
        if (filter === "past") return new Date(event.end) < now;
        return true;
 });

      return (
        <div className="container">
            <div className="event-form">
                <input
                 type="text"
                 placeholder="Event Name"
                    value={currentEvent.name}
                    onChange={(e) =>
                        setCurrentEvent({ ...currentEvent, name: e.target.value })
                    }
                />
                <input
                    type="datetime-local"
                  value={currentEvent.start}
                    onChange={(e) =>
                        setCurrentEvent({ ...currentEvent, start: e.target.value })
                    }
                />
                <input
                type="datetime-local"
                 value={currentEvent.end}
                    onChange={(e) =>
                        setCurrentEvent({ ...currentEvent, end: e.target.value })
                    }
                />
                <button onClick={saveEvent}>Save Event</button>
            </div>
            <div className="event-filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("upcoming")}>Upcoming</button>
                <button onClick={() => setFilter("past")}>Past</button>
             </div>
            <EventList events={filteredEvents} />
        </div>
    );
};

export default EventApp;
