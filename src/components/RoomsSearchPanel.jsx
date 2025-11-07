import DropdownSelect from "../components/DropdownSelect";
import { roomTypeOptions, roomCapacityOptions } from "../data/GlobalDataDummies";

export default function RoomsSearchPanel() {
  return (
    <section
      className="w-full bg-white px-[20px] py-[16px]
                 flex flex-wrap md:flex-nowrap items-center justify-between gap-[20px]"
      style={{
        boxShadow: "0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* 🔍 Input Keyword */}
      <div className="relative flex-1 min-w-[200px]">
        <i className="uil uil-search absolute left-[14px] top-1/2 -translate-y-1/2 text-gray-400 text-[18px]" />
        <input
          type="text"
          placeholder="Enter the keyword here..."
          className="w-full h-[48px] pl-[40px] pr-[14px] rounded-[10px]
                     border border-gray-300 text-[#5E5E5E] text-[14px]
                     focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                     focus:outline-none focus-visible:outline-none transition-all duration-200"
        />
      </div>

      {/* 🏷 Room Type */}
      <div className="flex flex-col flex-1 min-w-[180px]">
        
        <div className="h-[48px]">
          <DropdownSelect placeholder="Select Type" options={roomTypeOptions} />
        </div>
      </div>

      {/* 👥 Capacity */}
      <div className="flex flex-col flex-1 min-w-[150px]">
        
        <div className="h-[48px]">
          <DropdownSelect
            placeholder="Select Capacity"
            options={roomCapacityOptions.map((c) => c.label)}
          />
        </div>
      </div>

      {/* 🔍 Search Button */}
      <button
        className="min-w-[120px] h-[48px] rounded-[10px]
                   border border-[#EB5B00] text-[#EB5B00] font-medium
                   hover:bg-[#EB5B00]/10 transition-all duration-200
                   focus:outline-none focus-visible:outline-none
                  focus:ring-1 focus:ring-[#EB5B00]"
        style={{ fontFamily: "'Roboto', sans-serif", fontSize: "16px" }}
      >
        Search
      </button>

      {/* ➕ Add New Room */}
      <button
        className="min-w-[160px] h-[48px] rounded-[10px]
                   bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium
                   transition-all duration-200
                   focus:outline-none focus-visible:outline-none
             focus:ring-1 focus:ring-[#EB5B00]"
        style={{ fontFamily: "'Roboto', sans-serif", fontSize: "14px" }}
      >
        + Add New Room
      </button>
    </section>
  );
}
