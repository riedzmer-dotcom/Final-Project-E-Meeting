export default function ScheduleHeaderRoom({ rooms }) {
  return (
    <div className="flex w-max">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="min-w-[300px] h-[70px] flex items-center justify-center
                     border-r border-gray-300 bg-gray-100 font-medium text-[#5E5E5E]
                     hover:bg-gray-200 transition-colors duration-150"
                     style={{ fontFamily: "'Roboto', sans-serif", fontSize: "24px", lineHeight: "32px" }}

        >
          {room}
        </div>
      ))}
    </div>
  );
}
