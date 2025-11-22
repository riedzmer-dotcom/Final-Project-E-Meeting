import { useState, useRef, useEffect } from "react";

export default function DropdownSelect({
  placeholder,
  options = [],
  value = "",
  onChange,
  disabled = false,
}) {

/* ======================================================
       STATES & REFS
     ====================================================== */
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);


/* ======================================================
       CLOSE DROPDOWN ON OUTSIDE CLICK
     ====================================================== */
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


 /* ======================================================
       DISPLAY LABEL
     ====================================================== */
  const displayLabel =
    typeof value === "object" && value !== null
      ? value.label
      : options.find((opt) => opt.value === value)?.label || placeholder;


/* ======================================================
       UI
     ====================================================== */
  return (
    <div ref={dropdownRef} className={`relative w-full ${disabled ? "opacity-60" : ""}`}>
      
      
      {/* BUTTON */}
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
        <span className={displayLabel ? "text-[#2B2B2B]" : "text-gray-400"}>
          {displayLabel || placeholder}
        </span>

        <i
          className={`uil uil-angle-down absolute right-[10px] top-1/2 -translate-y-1/2 text-[20px]
                     transition-transform duration-200
                     ${open ? "rotate-180 text-[#EB5B00]" : "text-gray-400"}`}
        />
      </button>

      
      
      
      {/* DROPDOWN MENU */}
      {open && !disabled && (
        <ul
          className="absolute w-full mt-[8px] bg-white border border-gray-200 
                     rounded-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
                     z-50 max-h-[240px] overflow-y-auto"
        >
          {options.length > 0 ? (
            options.map((item, i) => {
              const isSelected =
                (typeof value === "object" && value?.value === item.value) ||
                value === item.value ||
                value === item.label;

              return (
                <li
                  key={i}
                  onClick={() => {
                    setOpen(false);
                    onChange?.(item); 
                  }}
                  className={`px-[14px] py-[10px] text-[14px] cursor-pointer
                              transition-all duration-150
                              ${
                                isSelected
                                  ? "bg-[#FFF3E9] text-[#EB5B00]"
                                  : "text-[#5E5E5E] hover:bg-[#FFF3E9] hover:text-[#EB5B00]"
                              }`}
                >
                  {item.label || item.value}
                </li>
              );
            })
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
