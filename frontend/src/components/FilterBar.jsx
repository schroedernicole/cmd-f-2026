export default function FilterBar({
  date,
  time,
  setDate,
  setTime,
  handleSearch,
}) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <label>
        Select Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>

      <br />
      <br />

      <label>
        Select Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>

      <br />
      <br />

      <button onClick={handleSearch}>Find Study Rooms</button>
    </div>
  );
}