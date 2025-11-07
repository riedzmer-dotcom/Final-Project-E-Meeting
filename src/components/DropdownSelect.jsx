import { useState, useRef, useEffect } from "react";

export default function DropdownSelect({
  placeholder,
  options = [],
  value = "",
  onChange,
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Tutup dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative w-full ${disabled ? "opacity-60" : ""}`}>
      {/* Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`w-full h-[48px] rounded-[10px] border border-gray-300 bg-white
                    text-[#5E5E5E] text-[14px] font-light px-[14px] pr-[38px]
                    flex items-center justify-between relative
                    focus:outline-none focus-visible:outline-none
                    focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                    transition-all duration-200
                    ${disabled ? "cursor-not-allowed bg-gray-100" : ""}`}
      >
        <span className={value ? "text-[#2B2B2B]" : "text-gray-400"}>
          {value || placeholder}
        </span>

        <i
          className={`uil uil-angle-down absolute right-[10px] top-1/2 -translate-y-1/2 text-[20px]
                     transition-transform duration-200
                     ${open ? "rotate-180 text-[#EB5B00]" : "text-gray-400"}`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && !disabled && (
        <ul
          className="absolute w-full mt-[8px] bg-white border border-gray-200 
                     rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
                     z-50 max-h-[240px] overflow-y-auto"
        >
          {options.length > 0 ? (
            options.map((item, i) => (
              <li
                key={i}
                onClick={() => {
                  setOpen(false);
                  onChange?.(item); // ✅ kirim ke parent!
                }}
                className={`px-[14px] py-[10px] text-[14px] cursor-pointer
                            transition-all duration-150
                            ${
                              value === item
                                ? "bg-[#FFF3E9] text-[#EB5B00]"
                                : "text-[#5E5E5E] hover:bg-[#FFF3E9] hover:text-[#EB5B00]"
                            }`}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="px-[14px] py-[10px] text-[13px] text-gray-400 italic">
              No options available
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
