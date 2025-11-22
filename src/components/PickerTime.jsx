import { useState, useRef, useEffect } from "react";

export default function PickerTime({ placeholder = "Select time", value, onChange }) {

/* ======================================================
       STATES & REFS
     ====================================================== */
  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);


/* ======================================================
       TIME OPTIONS (06:00 → 23:00)
     ====================================================== */
  const timeOptions = [];
  for (let h = 6; h <= 23; h++) {
    timeOptions.push(String(h).padStart(2, "0") + ":00");
  }


/* ======================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
     ====================================================== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


/* ======================================================
       HANDLERS
     ====================================================== */
  const handleSelect = (time) => {
    onChange?.(time);
    setOpen(false);
    setIsFocused(false);
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
    setIsFocused(true);
  };


/* ======================================================
       UI
     ====================================================== */
  return (
    <div ref={dropdownRef} className="relative w-full">

      {/* MAIN BUTTON */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => {
            if (!dropdownRef.current?.contains(document.activeElement)) {
              setIsFocused(false);
            }
          }, 120);
        }}
        className="w-full h-[48px] border border-gray-300 rounded-[10px]
                   bg-white text-[#2B2B2B] text-[15px] px-[14px] pr-[42px]
                   flex items-center justify-between
                   focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                   transition-all duration-200 relative"
      >
        <span className={value ? "text-[#2B2B2B]" : "text-gray-400"}>
          {value || placeholder}
        </span>

        {/* ICON CLOCK */}
        <i
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(e);
          }}
          className={`uil uil-clock absolute right-[12px] top-1/2 
                      -translate-y-1/2 text-[18px] cursor-pointer transition-colors duration-150
                      ${
                        isFocused || open
                          ? "text-[#EB5B00]"
                          : "text-gray-400 hover:text-[#EB5B00]"
                      }`}
        />
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <ul
          className="absolute mt-[8px] w-full bg-white border border-gray-200 rounded-[10px]
                     shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-50 overflow-hidden
                     max-h-[240px] overflow-y-auto"
        >
          {timeOptions.map((time, i) => (
            <li
              key={i}
              onClick={() => handleSelect(time)}
              className={`px-[14px] py-[10px] text-[14px] cursor-pointer
                          ${
                            value === time
                              ? "bg-[#FFF3E9] text-[#EB5B00]"
                              : "text-[#5E5E5E] hover:bg-[#FFF3E9] hover:text-[#EB5B00]"
                          } transition-all duration-150`}
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
