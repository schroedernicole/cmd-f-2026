import RoomCard from "./RoomCard";

export default function RoomList({ rooms }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}