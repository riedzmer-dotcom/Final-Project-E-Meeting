// ScheduleBody.jsx
import EventCard from "./EventCard";

export default function ScheduleBody({
  rooms,
  times,
  reservations,
  selectedDate,
  onCellClick,
  onEventClick,

  // Handlers forwarded to EventCard
  onEditEvent,
  onDeleteEvent,
}) {

  const rowHeight = 70;
  const colWidth = 300;

  /* ======================================================
     Convert "HH:MM" → total minutes
     ====================================================== */
  const toMinutes = (hhmm) => {
    if (!hhmm) return 0;
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  /* ======================================================
     Calculate vertical position & height of an event card
     based on start/end times
     ====================================================== */
  const calcPosition = (start, end) => {
    const sMin = toMinutes(start);
    const eMin = toMinutes(end);
    if (eMin <= sMin) return { top: 0, height: 0, valid: false };

    return {
      top: (sMin / 60) * rowHeight,
      height: ((eMin - sMin) / 60) * rowHeight,
      valid: true,
    };
  };

  /* ======================================================
     Event card styles by status
     ====================================================== */
  const statusStyles = {
    in_progress: {
      bg: "bg-[#FFF1E5]",
      border: "border-l-[6px] border-[#FF7A00]",
      label: "border border-green-600 text-green-600 bg-white",
      labelText: "In Progress",
    },
    upcoming: {
      bg: "bg-[#FFEAD6]",
      border: "border-l-[6px] border-[#FF7A00]",
      label: "border border-orange-600 text-orange-600 bg-white",
      labelText: "Up Coming",
    },
    done: {
      bg: "bg-[#EAEAEA]",
      border: "border-l-[6px] border-[#A0A0A0]",
      label: "border border-gray-500 text-gray-700 bg-white",
      labelText: "Done",
    },
  };


  /* ======================================================
     UI
  ====================================================== */
  return (
    <div className="relative">


      {/* ======================================================
           GRID BACKGROUND — 24 HOURS × ROOMS
           Each cell = clickable slot
      ====================================================== */}
      <div className="flex flex-col select-none scroll-mx-2 scroll-px-2">
        {times.map((time, i) => (
          <div key={i} className="flex">
            {rooms.map((room) => (
              <div
                key={room.id}
                tabIndex={0}
                onClick={() => onCellClick?.(room, time, selectedDate)}
                className="
                  min-w-[300px] h-[70px]
                  border-b border-r border-gray-300
                  bg-white hover:bg-[#FFF3E9]
                  cursor-pointer
                  transition-colors duration-150
                  focus:outline-none
                "
              />
            ))}
          </div>
        ))}
      </div>

      {/* ======================================================
           ABSOLUTE LAYER — EVENT CARDS
           Positioned using time calculation
      ====================================================== */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {reservations?.map((event) => {
          const { top, height, valid } = calcPosition(
            event.start_time,
            event.end_time
          );
          if (!valid) return null;

          // Offset: grid visually starts at 06:00
          const adjustedTop = top - ((6 * 60) / 60) * rowHeight;

          const colIndex = rooms.findIndex((r) => r.id === event.room_id);
          if (colIndex === -1) return null;

          const left = colIndex * colWidth;

          return (
            <EventCard
              key={event.id}
              event={event}
              left={left}
              top={adjustedTop}
              height={height}
              colWidth={colWidth}
              statusStyles={statusStyles}
              onClick={onEventClick}

              // 🔥 EDIT / DELETE → DITERUSKAN KE PARENT
              onEdit={() => onEditEvent?.(event)}
              onDelete={() => onDeleteEvent?.(event)}
            />
          );
        })}
      </div>

    </div>
  );
}
