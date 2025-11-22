import React from "react";

/* ======================================================
   ROOM CARD
   Single card item for Room listing
   ====================================================== */
function RoomCard({
  id,
  name,
  capacity,
  pricePerHour,
  type,
  image,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="relative bg-white rounded-[15px] shadow-sm border border-gray-100 overflow-hidden 
                 hover:shadow-md transition-all duration-300 ease-in-out"
    >

      {/* ======================================================
         IMAGE SECTION
         ====================================================== */}
      <div className="relative w-full h-[180px] flex items-center justify-center bg-[#F8F8F8]">
        {image ? (
          <img
            src={image}
            alt={`${name || "Room"} Preview`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => (e.target.src = "/placeholder-room.jpg")}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <i className="uil uil-image text-[36px]" />
            <p className="text-sm">No Image</p>
          </div>
        )}


        {/* ======================================================
           ACTION BUTTONS (Edit / Delete)
           ====================================================== */}
        <div className="absolute top-[10px] right-[10px] flex gap-[8px]">
          {/* 🗑 Delete */}
          <button
            onClick={() => onDelete?.(id)}
            className="w-[32px] h-[32px] rounded-full bg-white shadow-sm flex items-center justify-center
                      text-[#EB5B00] hover:bg-[#EB5B00] hover:text-white active:scale-95 transition-all"
          >
            <i className="uil uil-trash text-[18px]" />
          </button>

          {/* Edit button */}
          <button
            onClick={() => onEdit?.(id)}
            className="w-[32px] h-[32px] rounded-full bg-white shadow-sm flex items-center justify-center
                      text-[#EB5B00] hover:bg-[#EB5B00] hover:text-white active:scale-95 transition-all"
          >
            <i className="uil uil-pen text-[18px]" />
          </button>
        </div>
      </div>

      {/* ======================================================
         INFO SECTION (Bottom)
         ====================================================== */}
      <div className="px-[16px] py-[8px] flex flex-col gap-[4px]">
        <h3 className="text-[20px] font-semibold text-gray-800 truncate">
          {name || "Unnamed Room"}
        </h3>

        {/* Capacity & Price */}
        <div className="flex items-center justify-between text-gray-500 text-[14px]">
          <div className="flex items-center gap-[4px]">
            <i className="uil uil-users-alt text-[20px] text-[#EB5B00]" />
            <span>{capacity ?? 0} people</span>
          </div>

          <div className="flex items-center gap-[4px]">
            <i className="uil uil-money-bill text-[20px] text-[#EB5B00]" />
            <span>
              Rp{" "}
              {pricePerHour
                ? pricePerHour.toLocaleString("id-ID")
                : "0"}{" "}
              / hours
            </span>
          </div>
        </div>
      </div>


      {/* ======================================================
         LABEL TYPE (ke posisi semula)
         ====================================================== */}
      <div className="absolute bottom-[45px] right-[15px]">
        <span
          className="bg-[#EB5B00] text-white text-[12px] font-medium px-[10px] py-[4px] 
                     rounded-full shadow-sm"
        >
          {type || "Unknown"}
        </span>
      </div>
    </div>
  );
}


/* ======================================================
   MEMOIZATION
   Prevents unnecessary re-renders
   ====================================================== */
export default React.memo(RoomCard);
