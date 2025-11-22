export default function ScheduleTimeSidebar({ times }) {
  return (
    <div className="flex flex-col bg-white">

      {/* EMPTY HEADER */}
      <div
        className="h-[70px] w-[80px] border-r border-none bg-transparent mb-0"
      />

      {/* TIMES */}
      <div>
        {times.map((time, i) => (
          <div
            key={i}
            className="h-[70px] w-[80px] flex items-start justify-end px-[5px] 
                       pt-0 pb-2 border-b border-gray-300 bg-gray-100 font-medium text-[#5E5E5E]"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {time}
          </div>

          
        ))}
      </div>

      

    </div>
  );
}
