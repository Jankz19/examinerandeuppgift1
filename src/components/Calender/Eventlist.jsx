import React, { useContext } from "react";
import { EventContext } from "./EventContext";

const EventList = ({ events }) => {
const { setCurrentEvent, deleteEvent } = useContext(EventContext);
const now = new Date();

    return (
        <ul>
        {events.map((event) => (
        <li
        key={event.start}
        style={{
        color: new Date(event.end) < now ? "gray" : "black",
            }}
                 >
        {event.name} ({new Date(event.start).toLocaleString()} - {new Date(event.end).toLocaleString()})
        <button onClick={() => setCurrentEvent(event)}>Edit</button>
                <button onClick={() => deleteEvent(event)}>Delete</button>
        </li>
        ))}
        </ul>
);
};


export default EventList;