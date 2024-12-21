import React from "react";

function EventForm({ event, setEvent, onSave }) {
    return (
        <div>
            <input
            type="text"
            placeholder="Event Name"
            value={event.name}
            onChange={(e) => setEvent({ ...event, name: e.target.value })}
              />
        <input
        type="datetime-local"
            value={event.start}
            onChange={(e) => setEvent({ ...event, start: e.target.value })}
             />
        <input
            type="datetime-local"
            value={event.end}
            onChange={(e) => setEvent({ ...event, end: e.target.value })}
                />
            <button onClick={onSave}>Save</button>
        </div>
    );
}



export default EventForm;
