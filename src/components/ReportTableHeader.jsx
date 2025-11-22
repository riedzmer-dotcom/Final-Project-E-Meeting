export default function ReportTableHeader() {

/* ======================================================
       UI — TABLE HEADER
     ====================================================== */
  return (
    <thead
      className="bg-gray-200 text-[#5E5E5E]"
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "27px",
        letterSpacing: "0",
      }}
    >
      <tr className="h-[54px]">

        {/* DATE REV, ROOM NAME, ROOM TYPE, STATUS, ACTION */}
        <th className="px-[40px] text-left align-middle">Date Reservation</th>
        <th className="px-[40px] text-left align-middle">Room Name</th>
        <th className="px-[40px] text-left align-middle">Room Type</th>
        <th className="px-[40px] text-left align-middle">Status</th>
        <th className="px-[40px] text-center align-middle">Action</th>
      </tr>
    </thead>
  );
}
