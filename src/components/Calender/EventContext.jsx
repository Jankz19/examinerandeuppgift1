import React, { createContext, useState } from "react";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [currentEvent, setCurrentEvent] = useState({ name: "", start: "", end: "" });
    const [filter, setFilter] = useState("all");

    const saveEvent = () => {
        if (currentEvent.name && currentEvent.start && currentEvent.end) {
            setEvents(
                [...events.filter(event => event.start !== currentEvent.start), currentEvent].sort(
                    (a, b) => new Date(a.start) - new Date(b.start)
                )
            );
            setCurrentEvent({ name: "", start: "", end: "" });
        }
    };

    const deleteEvent = (eventToDelete) => {
        setEvents(events.filter(event => event.start !== eventToDelete.start));
    };

    const getNextThreeEvents = () => {
        const now = new Date();
        return events
          .filter((event) => new Date(event.start) > now) 
          .sort((a, b) => new Date(a.start) - new Date(b.start)) 
          .slice(0, 3); 
      };

    return (
        <EventContext.Provider
            value={{
                events,
                currentEvent,
                filter,
                setCurrentEvent,
                setFilter,
                saveEvent,
                deleteEvent,
                getNextThreeEvents, 
            }}
        >
            {children}
        </EventContext.Provider>
    );
};
