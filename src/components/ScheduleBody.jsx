export default function ScheduleBody({ rooms, times, onCellClick }) {
  return (
    <div className="flex flex-col">
      {times.map((time, i) => (
        <div key={i} className="flex">
          {rooms.map((room, j) => (
            <div
              key={j}
              tabIndex={0}
              onClick={() => onCellClick(room, time)} // ✅ trigger modal
              className="min-w-[300px] h-[70px] border-b border-r border-gray-300 bg-white
                         hover:bg-[#FFF3E9] cursor-pointer transition-colors
                         focus:outline-none focus-visible:outline-none active:outline-none"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
