import { useState, useRef, useEffect } from "react";

export default function DropdownSelectSmall({ options = [], value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[70px]">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-[32px] rounded-[8px] border border-gray-300 bg-white
                   text-[#5E5E5E] text-[14px] px-[8px] flex items-center justify-between
                   focus:outline-none focus-visible:outline-none
                   focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                   hover:border-[#EB5B00] transition-all duration-200"
      >
        {value}
        <i
          className={`uil uil-angle-down text-[18px] transition-transform duration-200 
          ${open ? "rotate-180 text-[#EB5B00]" : "text-gray-400"}`}
        />
      </button>

      {open && (
        <ul
          className="absolute bottom-[38px] w-full bg-white border border-gray-200 rounded-[8px]
                     shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-50 overflow-hidden"
        >
          {options.map((item, i) => (
            <li
              key={i}
              className="px-[8px] py-[8px] text-[14px] cursor-pointer text-[#5E5E5E]
                         hover:bg-[#FFF3E9] hover:text-[#EB5B00] transition"
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
