import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datepicker.css";

export default function PickerEndDate({ onChange }) {

/* ======================================================
       STATES & REFS
     ====================================================== */
  const [endDate, setEndDate] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const dateInputRef = useRef(null);


/* ======================================================
       HANDLE DATE CHANGE (FORMAT: dd/MM/yyyy)
     ====================================================== */
  const handleDateChange = (date) => {
    setEndDate(date);

    if (onChange && date) {
      const d = String(date.getDate()).padStart(2, "0");
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const y = date.getFullYear();
      onChange(`${d}/${m}/${y}`);
    }
  };


/* ======================================================
       UI
     ====================================================== */

  return (
    <section className="relative w-full">
      
      {/* DATE PICKER INPUT */}
      <DatePicker
        wrapperClassName="w-full"
        ref={dateInputRef}
        selected={endDate}
        onChange={handleDateChange}    // 🔥 fix
        placeholderText="Select date"
        dateFormat="dd/MM/yyyy"
        className="
          block w-full h-[48px] px-[14px] pr-[36px] rounded-[10px]
          border border-gray-300 bg-white text-[#5E5E5E] text-[14px]
          focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
          focus:outline-none transition-all duration-200
        "
        popperPlacement="bottom-start"
        showPopperArrow={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* CALENDAR ICON */}
      <i
        onClick={() => dateInputRef.current.setFocus()}
        className={`
          uil uil-calendar-alt
          absolute right-[12px] top-1/2 -translate-y-1/2
          text-[18px] cursor-pointer transition-colors duration-150
          ${isFocused ? "text-[#EB5B00]" : "text-gray-400 hover:text-[#EB5B00]"}
        `}
      />
    </section>
  );
}
