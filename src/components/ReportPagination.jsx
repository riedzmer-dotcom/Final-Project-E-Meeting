import { useState } from "react";
import { pageSizeOptions } from "../data/GlobalDataDummies";
import DropdownSelectSmall from "../components/DropdownSelectSmall";

export default function ReportPagination() {
  const [size, setSize] = useState(pageSizeOptions[0]);

  return (
    <div className="flex justify-between items-center px-6 py-3 text-sm text-[#5E5E5E]">

      {/* LEFT SIDE — Show Entries */}
      <div className="flex items-center gap-[8px]">
        <span>Show</span>

        <DropdownSelectSmall
          options={pageSizeOptions}
          value={size}
          onChange={setSize}
        />

        <span>Entries</span>
      </div>

      {/* RIGHT SIDE — Pagination Buttons */}
      <div className="flex items-center gap-[8px]">

        {/* Prev */}
        <button
          className="w-[30px] h-[30px] rounded-[8px] bg-[#E0E0E0] text-[#5E5E5E]
                     flex items-center justify-center text-[14px] font-medium
                     hover:bg-[#EB5B00] hover:text-white active:scale-95
                     focus:outline-none focus-visible:outline-none focus:ring-1 focus:ring-[#EB5B00]
                     transition-all duration-200"
        >
          {"<"}
        </button>

        {/* Page Numbers */}
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className={`w-[30px] h-[30px] rounded-[8px] flex items-center justify-center 
                        text-[14px] font-medium active:scale-95 transition-all duration-200
                        focus:outline-none focus-visible:outline-none focus:ring-1 focus:ring-[#EB5B00]
                        ${
                          num === 1
                            ? "bg-[#EB5B00] text-white"
                            : "bg-[#E0E0E0] text-[#5E5E5E] hover:bg-[#EB5B00] hover:text-white"
                        }`}
          >
            {num}
          </button>
        ))}

        {/* Next */}
        <button
          className="w-[30px] h-[30px] rounded-[8px] bg-[#E0E0E0] text-[#5E5E5E]
                     flex items-center justify-center text-[14px] font-medium
                     hover:bg-[#EB5B00] hover:text-white active:scale-95
                     focus:outline-none focus-visible:outline-none focus:ring-1 focus:ring-[#EB5B00]
                      transition-all duration-200"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
