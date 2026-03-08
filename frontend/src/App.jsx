import { useState } from "react";
import { FaUsers, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./App.css";

function App() {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [rooms, setRooms] = useState([]);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
    setSearched(true);

    try {
        const response = await fetch("http://127.0.0.1:5000/study_rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: date,
                start_time: time
            })
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(`HTTP Error ${response.status}: ${data.message}`);
        }

        const data = await response.json();
        console.log(data);
        let rooms_data = [];

        for (const d of data){
            console.log(d);
            rooms_data = rooms_data.concat(d["data"]);
        }

        console.log(rooms_data);


        // Example state update
        setRooms(rooms_data);

    } catch (error) {
        console.error("Request failed:", error);
    }
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

                {rooms.map((room) => (
                    <div key={room.room_num} className="room-card">

                        <h2>{room.room_num}</h2>

                        {/* <p className="room-info">
                            <FaMapMarkerAlt /> {room.building}
                        </p> */}

                        {/* <p className="room-info">
                            <FaUsers /> Capacity: {room.capacity}
                        </p> */}

                        {/* <p className="room-info">
                            Source: {room.source}
                        </p> */}

                        {/* <p className="room-status">
                            {room.availableNow
                                ? "🟢 Available now"
                                : `🕒 Next available at ${room.nextAvailableSlot}`}
                        </p> */}

                        {/* <p className="room-info">
                            <FaClock /> Last updated: {room.lastUpdated}
                        </p> */}

                        <a
                            className="booking-link"
                            href={room.booking_link}
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