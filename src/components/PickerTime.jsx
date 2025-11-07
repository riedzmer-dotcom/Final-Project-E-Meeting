import { useState, useRef, useEffect } from "react";

export default function PickerTime({ placeholder = "Select time", value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Generate jam preset: 08:00 - 21:00
  const timeOptions = Array.from({ length: 14 }, (_, i) => {
    const hour = (8 + i).toString().padStart(2, "0");
    return `${hour}:00`;
  });

  // Tutup dropdown kalau klik di luar area
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Ketika memilih waktu
  const handleSelect = (time) => {
    onChange?.(time);
    setOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Button utama */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-[48px] border border-gray-300 rounded-[10px]
                   bg-white text-[#2B2B2B] text-[15px] px-[14px] pr-[42px]
                   flex items-center justify-between
                   focus:outline-none focus:ring-2 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]
                   hover:border-[#EB5B00]/50 transition-all duration-200 relative"
      >
        <span className={value ? "text-[#2B2B2B]" : "text-gray-400"}>
          {value || placeholder}
        </span>

        <i
          className={`uil uil-clock absolute right-[14px] text-[18px] transition-colors duration-200 
            ${open ? "text-[#EB5B00]" : "text-gray-400"}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className="absolute mt-[8px] w-full bg-white border border-gray-200 rounded-[10px]
                     shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-50 overflow-hidden max-h-[240px] overflow-y-auto"
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
