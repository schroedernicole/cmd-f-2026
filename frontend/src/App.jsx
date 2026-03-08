import { useState } from "react";
import { FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./App.css";

function App() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [rooms, setRooms] = useState([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setSearched(true);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:5000/study_rooms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: date, start_time: time })
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(`HTTP Error ${response.status}: ${data.message}`);
            }

            const data = await response.json();
            console.log("Rooms data:", data);

            let rooms_data = [];
            for (const d of data) {
                rooms_data = rooms_data.concat(d["data"]);
            }

            setRooms(rooms_data);

        } catch (error) {
            console.error("Request failed:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!searched) {
        return (
            <div className="app">
                {loading && (
                    <div className="loading-container">
                        <h2 className="loading-text">Searching for study rooms...</h2>
                    </div>
                )}

                <header className="hero">
                    <h1>UBC Study Room Finder</h1>
                    <p>Find available study rooms across UBC in one place.</p>
                </header>

                <div className="search-container">
                    <div className="search-box">
                        <div className="input-group">
                            <label>Select Date</label>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                        <div className="input-group">
                            <label>Select Time</label>
                            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                        <button onClick={handleSearch}>Find Study Rooms</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            {loading && (
                <div className="loading-container">
                    <h2 className="loading-text">
                        Searching for study rooms...
                    </h2>
                </div>
            )}

            <header className="hero small">
                <h1>UBC Study Room Finder</h1>
                <p>Available rooms for {date} at {time}</p>
                <button className="back-button" onClick={() => setSearched(false)}>← Back</button>
            </header>

            <div className="room-grid">
                {rooms.map((room) => (
                    <div key={room.room_num} className="room-card">
                        <h2>{room.room_num}</h2>
                        <a className="booking-link" href={room.booking_link} target="_blank" rel="noopener noreferrer">
                            Book on official site
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;