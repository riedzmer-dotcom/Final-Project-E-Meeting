export default function EventCard({
  event,
  left,
  top,
  height,
  colWidth,
  statusStyles,
  onClick,
  onEdit,
  onDelete,
}) {

/* ======================================================
       EARLY RETURN
     ====================================================== */
  if (!event) return null;


/* ======================================================
       PREPARED DATA
     ====================================================== */

  const styleObj = statusStyles[event.status] || statusStyles.upcoming;

  // Format HH:MM:SS → HH:MM
  const formatTime = (t) => (t ? t.slice(0, 5) : "-");

  const customer =
    event.customer_name || event.pemesan || "-";

  const company =
    event.company_name || event.perusahaan || "";



/* ======================================================
       UI
     ====================================================== */
  return (
    <div
      className={`
        absolute rounded-md shadow-sm px-[4px] py-[4px] pl-[8px] pointer-events-auto
        ${styleObj.bg} ${styleObj.border}
        text-[#3D3D3D] text-sm transition-all duration-150 ease-out
        hover:shadow-md hover:scale-[101%]
      `}
      style={{
        top,
        left,
        height,
        width: colWidth,
        fontFamily: "'Roboto', sans-serif",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(event);
      }}
    >

      {/* EDIT / DELETE BUTTONS (TOP RIGHT) */}
      <div className="absolute right-1 top-1 flex gap-[2px] z-5">


        {/* DELETE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(event);
          }}
          className="
            text-[15px] text-[#dd9061] rounded-full px-[3px]
            hover:text-[#EB5B00] 
            transition-all duration-150
          "
        >
          <i className="uil uil-trash-alt" />
        </button>


         {/* EDIT BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(event);
          }}
          className="
            text-[15px] text-[#dd9061] rounded-full px-[3px]
            hover:text-[#EB5B00] 
            transition-all duration-150
          "
        >
          <i className="uil uil-edit" />
        </button>

      </div>



      {/* CUSTOMER NAME */}
      <div className="font-semibold text-[14px] mb-0.5">
        {customer}
      </div>


      {/* COMPANY NAME */}
      {company && (
        <div className="text-[12px] text-gray-700 mb-1 leading-tight">
          {company}
        </div>
      )}


      {/* TIME RANGE */}
      <div className="text-xs text-gray-600">
        {formatTime(event.start_time)} - {formatTime(event.end_time)} WIB
      </div>


      {/* STATUS LABEL */}
      <div
        className={`
          ${styleObj.label}
          absolute right-3 bottom-2 px-3 py-[2px]
          rounded-full text-[10px] !bg-transparent
        `}
      >
        {styleObj.labelText}
      </div>

    </div>
  );
}
