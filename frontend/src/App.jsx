import { useState } from "react";
import { mockRooms } from "./mockRooms";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import RoomList from "./components/RoomList";

function App() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <Header />

      {!searched ? (
        <FilterBar
          date={date}
          time={time}
          setDate={setDate}
          setTime={setTime}
          handleSearch={handleSearch}
        />
      ) : (
        <RoomList rooms={mockRooms} />
      )}
    </div>
  );
}

export default App;