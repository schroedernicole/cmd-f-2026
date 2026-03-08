export default function RoomCard({ room }) {
  return (
    <div
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

      <a href={room.bookingUrl} target="_blank" rel="noreferrer">
        Book on official site
      </a>
    </div>
  );
}