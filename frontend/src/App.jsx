import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { mockRooms } from "./mockRooms";

function App() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [searched, setSearched] = useState(false);
  
    const handleSearch = () => {
      setSearched(true);
    };
    if (!searched) {
        return (
          <div style={{ padding: "2rem", fontFamily: "Arial" }}>
            <h1>UBC Study Room Finder</h1>
            <p>Find available study rooms across UBC in one place.</p>
      
            <div style={{ marginTop: "2rem" }}>
              <label>
                Select Date:
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
      
              <br /><br />
      
              <label>
                Select Time:
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>
      
              <br /><br />
      
              <button onClick={handleSearch}>
                Find Study Rooms
              </button>
            </div>
          </div>
        );
      }
      return (
        <div style={{ padding: "2rem", fontFamily: "Arial" }}>
          <h1>UBC Study Room Finder</h1>
          <p>Find available study rooms across UBC in one place.</p>
    
          <div style={{ marginTop: "2rem" }}>
            {mockRooms.map((room) => (
              <div
                key={room.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1rem",
                  marginBottom: "1rem",
                  background: "white",
                }}
              >
                <h2>{room.roomName}</h2>
    
                <p>{room.building}</p>
    
                <p>Source: {room.source}</p>
    
                <p>Capacity: {room.capacity}</p>
    
                <p>
                  Status:{" "}
                  {room.availableNow
                    ? "Available now"
                    : `Next available at ${room.nextAvailableSlot}`}
                </p>
    
                <p>Last updated: {room.lastUpdated}</p>
    
                <a href={room.bookingUrl} target="_blank">
                  Book on official site
                </a>
              </div>
            ))}
          </div>
        </div>
      );
}


export default App;
