import { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PickerReservationDate({ value, onChange }) {

/* ======================================================
       UTILS: PARSE & FORMAT DATE
     ====================================================== */

  // Convert DD/MM/YYYY → Date object
  const parseDate = (str) => {
    if (!str) return null;
    const [d, m, y] = str.split("/");
    return new Date(`${y}-${m}-${d}`);
  };

  // Convert Date → DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


/* ======================================================
       STATES & REFS
     ====================================================== */
  const [selectedDate, setSelectedDate] = useState(parseDate(value));
  const [isFocused, setIsFocused] = useState(false);
  const dateInputRef = useRef(null);


 /* ======================================================
       SYNC VALUE DARI PARENT
     ====================================================== */
  useEffect(() => {
    setSelectedDate(parseDate(value));
  }, [value]);

  
/* ======================================================
       UI
     ====================================================== */
  return (
    <section className="relative w-full">
      
      {/* DATE PICKER INPUT */}
      <DatePicker
        wrapperClassName="w-full"
        ref={dateInputRef}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          onChange?.(formatDate(date)); // kirim string ke parent
        }}
        placeholderText="Select date"
        dateFormat="dd/MM/yyyy"
        className="block w-full h-[44px] border border-gray-300 rounded-[10px]
                   px-[14px] text-[15px] text-[#2B2B2B]
                   focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                   focus:outline-none transition-all duration-200"
        popperPlacement="bottom-start"
        showPopperArrow={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* CALENDAR ICON */}
      <i
        onClick={() => dateInputRef.current.setFocus()}
        className={`uil uil-calendar-alt absolute right-[12px] top-1/2 
                    -translate-y-1/2 text-[18px] cursor-pointer transition-colors duration-150
                    ${isFocused ? "text-[#EB5B00]" : "text-gray-400 hover:text-[#EB5B00]"}`}
      />
    </section>
  );
}
