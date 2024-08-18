import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Load events from localStorage
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);

    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  useEffect(() => {
    // Save events to localStorage
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (newEvent.trim() && newDate.trim() && newTime.trim()) {
      const event = {
        name: newEvent.trim(),
        date: newDate.trim(),
        time: newTime.trim(),
        completed: false,
      };
      setEvents([...events, event]);
      setNewEvent("");
      setNewDate("");
      setNewTime("");
    }
  };

  const handleToggleCompleted = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].completed = !updatedEvents[index].completed;
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  // Filter events based on their status
  const incompleteEvents = events.filter((event) => !event.completed);
  const completedEvents = events.filter((event) => event.completed);

  return (
    <div className="App">
      <h1>Event Calendar</h1>
      <div>
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Event"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
          min={minDate}
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
      <div>
        <h2>Upcoming Events</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {incompleteEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={event.completed}
                    onChange={() =>
                      handleToggleCompleted(events.indexOf(event))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Completed Events</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Completed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {completedEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={event.completed}
                    onChange={() =>
                      handleToggleCompleted(events.indexOf(event))
                    }
                  />
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDeleteEvent(events.indexOf(event))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
