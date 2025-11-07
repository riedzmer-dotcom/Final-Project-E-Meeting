export default function ScheduleTimeSidebar({ times }) {
  return (
    <div className="flex flex-col bg-white">
      {times.map((time, index) => (
        <div
          key={index}
          className="h-[70px] w-[100px] flex items-end justify-end px-[5px] border border-white font-medium text-[#5E5E5E]"
          style={{ fontFamily: "'Roboto', sans-serif" }}

        >
          {time}
        </div>
      ))}
    </div>
  );
}
