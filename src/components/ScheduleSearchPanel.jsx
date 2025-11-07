import { useState, useEffect } from "react";
import PickerStartDate from "../components/PickerStartDate";
import PickerEndDate from "../components/PickerEndDate";

export default function ScheduleSearchPanel({ onAddReservation }) {
  const [today, setToday] = useState("");

  useEffect(() => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    const formatted = new Date().toLocaleDateString("en-GB", options);
    setToday(formatted);
  }, []);

  return (
    <section
      className="w-full bg-white px-[20px] py-[16px] flex items-center gap-[24px]"
      style={{ boxShadow: "0 2px 6px -2px rgba(0, 0, 0, 0.05)" }}
    >
      {/* 📅 Tanggal otomatis */}
      <div
        className="flex items-center min-w-[220px] h-[40px] text-[16px] font-medium 
                   text-[#2B2B2B] whitespace-nowrap
                   border-r border-gray-300 py-0 pr-[10px] -mr-[10px]"
      >
        {today}
      </div>

      {/* 🗓 START & END DATE */}
      <div className="flex-1 flex items-center gap-[16px] ml-0 pl-0">
        <div className="w-full h-[48px]">
          <PickerStartDate />
        </div>
        <div className="w-full h-[48px]">
          <PickerEndDate />
        </div>
      </div>

      {/* 🔍 Search */}
      <button
        className="min-w-[120px] h-[48px] rounded-[10px] -ml-[8px]
                   border border-[#EB5B00] text-[#EB5B00] font-medium
                   hover:bg-[#EB5B00]/10 transition-all duration-200
                   focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:ring-offset-0"
        style={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px" }}
      >
        Search
      </button>

      {/* ➕ Add New Reservation */}
      <button
        onClick={onAddReservation} // ✅ hanya tambahan ini
        className="min-w-[180px] h-[48px] rounded-[10px]
                   bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium
                   transition-all duration-200
                   focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:ring-offset-0"
        style={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}
      >
        + Add New Reservation
      </button>
    </section>
  );
}
