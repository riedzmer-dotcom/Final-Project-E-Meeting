export default function ScheduleHeaderRoom({ rooms, reservationsByRoom = {} }) {
  return (
    <div
      className="
        flex w-max 
        scroll-mx-2
        scroll-px-2
        select-none
      "
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      
      {rooms.map((room) => {
        /* ======================================================
           GET RESERVATIONS PER ROOM
        ====================================================== */
        const resv = reservationsByRoom[room.id] || [];

        /* ======================================================
           CHECK IF ROOM HAS ANY RESERVATION
        ====================================================== */
        const hasBooking = resv.length > 0;

        /* ======================================================
           CALCULATE TOTAL BOOKED MINUTES
        ====================================================== */
        const totalMinutes = resv.reduce((sum, r) => {
          const [sh, sm] = r.start_time.split(":").map(Number);
          const [eh, em] = r.end_time.split(":").map(Number);
          return sum + (eh * 60 + em - (sh * 60 + sm));
        }, 0);

        /* ======================================================
           OPERATING HOURS (07:00 – 22:00 → 15 hours)
        ====================================================== */
        const OPERATING_MINUTES = 15 * 60;

        /* ======================================================
           DETERMINE IF ROOM IS FULLY BOOKED
        ====================================================== */
        const isFull = totalMinutes >= OPERATING_MINUTES;

        /* ======================================================
           BACKGROUND COLOR LOGIC
           - FULL  → red
           - PARTIAL booking → gray-300
           - EMPTY → gray-200
        ====================================================== */
        const bgColor = isFull
          ? "bg-red-400"
          : hasBooking
          ? "bg-gray-300"
          : "bg-gray-200";

        /* ======================================================
           TEXT COLOR
        ====================================================== */
        const textColor = isFull || hasBooking ? "text-white" : "text-gray-700";

        
        /* ======================================================
           UI
        ====================================================== */
        return (
          <div
            key={room.id}
            className={`
              min-w-[300px] h-[70px]
              flex items-center justify-center
              border-r border-gray-300
              font-medium
              transition-colors duration-150
              ${bgColor} ${textColor}
            `}
            style={{
              fontSize: "24px",
              lineHeight: "32px",
            }}
          >
            {room.room_name}
          </div>
        );
      })}
    </div>
  );
}
