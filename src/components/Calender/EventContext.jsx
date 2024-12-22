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
            }}
        >
        {children}
    </EventContext.Provider>
    );
};
