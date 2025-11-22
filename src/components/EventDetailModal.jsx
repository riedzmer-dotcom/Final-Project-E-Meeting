export default function EventDetailModal({ event, onClose }) {

/* ======================================================
       EARLY RETURN
     ====================================================== */
  if (!event) return null;


/* ======================================================
       UI
     ====================================================== */
  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] 
                 flex items-center justify-center p-4"
      onClick={onClose}
    >

      {/* MODAL CONTAINER */}
      <div 
        className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >


        {/* CLOSE BUTTON */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>


        {/* TITLE */}
        <h2 className="text-xl font-semibold mb-4">
          Detail Reservation
        </h2>


        {/* CUSTOMER NAME */}
        <div className="mb-3">
          <div className="text-sm text-gray-500">Customer</div>
          <div className="text-lg font-medium">
            {event.customer_name}
          </div>
        </div>

        {/* TIME INFORMATION */}
        <div className="mb-3">
          <div className="text-sm text-gray-500">Waktu</div>
          <div className="text-base">
            {event.start_time} - {event.end_time} WIB
          </div>
        </div>

        {/* ROOM INFORMATION */}
        <div className="mb-3">
          <div className="text-sm text-gray-500">Ruangan</div>
          <div className="text-base">
            {event.room_name} (kapasitas {event.capacity})
          </div>
        </div>

        {/* STATUS */}
        <div className="mb-3">
          <div className="text-sm text-gray-500">Status</div>
          <div className="capitalize font-medium">
            {event.status.replace("_", " ")}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex gap-3">
          
          
          {/* EDIT BUTTON */}
          <button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
            onClick={() => alert("Edit belum diimplementasi")}
          >
            Edit
          </button>

          {/* DELETE BUTTON */}
          <button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
            onClick={() => alert("Delete belum diimplementasi")}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}
