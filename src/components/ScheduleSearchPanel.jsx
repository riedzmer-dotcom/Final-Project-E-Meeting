import { useState, useEffect } from "react";
import PickerStartDate from "../components/PickerStartDate";
import PickerEndDate from "../components/PickerEndDate";

export default function ScheduleSearchPanel({ onAddReservation, onSearch }) {
  const [todayLabel, setTodayLabel] = useState(""); 
  const [isFiltered, setIsFiltered] = useState(false);

  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");     

  /* ======================================================
     FORMAT TODAY LABEL (id-ID locale, long format)
  ====================================================== */
  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    setTodayLabel(formatted);
  }, []);

  /* ======================================================
     SHORT DATE FORMAT (dd/mm/yy)
  ====================================================== */
  const formatShort = (str) => {
    if (!str) return "";
    const [dd, mm, yyyy] = str.split("/");
    const yy = yyyy.slice(-2);
    return `${dd}/${mm}/${yy}`;
  };

  
  /* ======================================================
     HANDLE SEARCH → Trigger parent filter
  ====================================================== */
  const handleSearch = () => {
    if (startDate && endDate) setIsFiltered(true);
    else setIsFiltered(false);

    onSearch?.(startDate, endDate);
  };

  
  /* ======================================================
     UI
  ====================================================== */
  return (
    <section
      className="w-full bg-white px-[20px] py-[16px] flex items-center gap-[24px]"
      style={{ boxShadow: "0 2px 6px -2px rgba(0,0,0,0.05)" }}
    >
      {/* ======================================================
         LEFT LABEL: Today / Period Indicator
      ====================================================== */}
      <div
        className="
          flex flex-col justify-center 
          min-w-[220px] h-[40px] text-[16px] font-medium 
          text-[#2B2B2B] whitespace-nowrap leading-tight
          border-r border-gray-300 py-0 pr-[10px] -mr-[10px]
        "
      >
        {!isFiltered ? (
          <>
            <span>Today:</span>
            <span>{todayLabel}</span>
          </>
        ) : (
          <>
            <span>Periode:</span>
            <span>
              {formatShort(startDate)} - {formatShort(endDate)}
            </span>
          </>
        )}
      </div>

      {/* ======================================================
         START & END DATE FILTER
      ====================================================== */}
      <div className="flex-1 flex items-center gap-[16px] ml-0 pl-0">
        <div className="w-full h-[48px]">
          <PickerStartDate onChange={setStartDate} />
        </div>
        <div className="w-full h-[48px]">
          <PickerEndDate onChange={setEndDate} />
        </div>
      </div>

      {/* ======================================================
         SEARCH BUTTON
      ====================================================== */}
      <button
        onClick={handleSearch}
        className="
          min-w-[120px] h-[48px] rounded-[10px] -ml-[8px]
          border border-[#EB5B00] text-[#EB5B00] font-medium
          hover:bg-[#EB5B00]/10  active:scale-95 transition-all duration-200
        "
      >
        Search
      </button>

      {/* ======================================================
         ADD NEW RESERVATION
      ====================================================== */}
      <button
        onClick={onAddReservation}
        className="
          min-w-[180px] h-[48px] rounded-[10px]
          bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium text-[15px]
          active:scale-95 transition-all duration-200
        "
      >
        + Add New Reservation
      </button>
    </section>
  );
}
