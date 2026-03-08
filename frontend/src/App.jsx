import { useState } from "react";
import { mockRooms } from "./mockRooms";
import { FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./App.css";

function App() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSearch = () => {
        setSearched(true);
    };

    if (!searched) {
        return (
            <div className="app">

                <header className="hero">
                    <h1>UBC Study Room Finder</h1>
                    <p>Find available study rooms across UBC in one place.</p>

                </header>

                <div className="search-container">
                    <div className="search-box">

                        <div className="input-group">
                            <label>Select Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>Select Time</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>

                        <button onClick={handleSearch}>
                            Find Study Rooms
                        </button>

                    </div>
                </div>

            </div>
        );
    }

    return (
        <div className="app">

            <header className="hero small">
                <h1>UBC Study Room Finder</h1>
                <p>Available rooms for {date} at {time}</p>
                <button className="back-button" onClick={() => setSearched(false)}>
                        ← Back
                    </button>
            </header>

            <div className="room-grid">

                {mockRooms.map((room) => (
                    <div key={room.id} className="room-card">

                        <h2>{room.roomName}</h2>

                        <p className="room-info">
                            <FaMapMarkerAlt /> {room.building}
                        </p>

                        <p className="room-info">
                            <FaUsers /> Capacity: {room.capacity}
                        </p>

                        <p className="room-info">
                            Source: {room.source}
                        </p>

                        <p className="room-status">
                            {room.availableNow
                                ? "🟢 Available now"
                                : `🕒 Next available at ${room.nextAvailableSlot}`}
                        </p>

                        <p className="room-info">
                            <FaClock /> Last updated: {room.lastUpdated}
                        </p>

                        <a
                            className="booking-link"
                            href={room.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Book on official site
                        </a>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default App;