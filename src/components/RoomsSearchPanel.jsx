import { useState, useEffect } from "react";
import DropdownSelect from "../components/DropdownSelect";

export default function RoomsSearchPanel({ onAddRoom, onSearch }) {
  const [keyword, setKeyword] = useState("");
  const [roomType, setRoomType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [typeOptions, setTypeOptions] = useState([]);
  const [capacityOptions, setCapacityOptions] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingCapacities, setLoadingCapacities] = useState(true);

  /* ======================================================
     LOAD ROOM TYPES (Static demo data)
     ====================================================== */
  useEffect(() => {
  setTypeOptions([
    { label: "All Type", value: "all" }, 
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ]);

  setLoadingTypes(false);
}, []);


  /* ======================================================
     LOAD CAPACITY OPTIONS (Static demo data)
     ====================================================== */
  useEffect(() => {
  setCapacityOptions([
    { label: "All Capacity", value: "all" },
    { label: "5+ people", value: "5+" },
    { label: "10+ people", value: "10+" },
    { label: "20+ people", value: "20+" },
    { label: "50+ people", value: "50+" },
    { label: "100+ people", value: "100+" },

  ]);

  setLoadingCapacities(false);
}, []);


  /* ======================================================
     HANDLE SEARCH CLICK
     - Build filters object and send to parent
     ====================================================== */
      const handleSearchClick = () => {
      const filters = {
        name: keyword.trim(),
        room_type: roomType,      // "" = ALL type
        capacity: capacity        // "all" = ALL capacity
      };

      onSearch?.(filters);
    };

    
  /* ======================================================
     UI
     ====================================================== */
  return (
    <section
      className="w-full bg-white px-[20px] py-[16px] flex flex-wrap md:flex-nowrap 
                 items-center justify-between gap-[16px]"
      style={{
        boxShadow: "0 -4px 6px -2px rgba(0, 0, 0, 0.05)",
      }}
    >
      {/* Keyword */}
      <div className="relative flex-1 min-w-[220px]">
        <i className="uil uil-search absolute left-[14px] top-1/2 -translate-y-1/2 
                    text-gray-400 text-[18px]" />
        <input
          type="text"
          placeholder="Enter keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full h-[48px] pl-[40px] pr-[14px] rounded-[10px] border 
                    border-gray-300 text-[#5E5E5E] text-[14px]
                     focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00] 
                     focus:outline-none transition-all"
        />
      </div>

      {/* Type */}
      <div className="flex flex-col flex-1 min-w-[180px]">
        <div className="h-[48px]">
          {loadingTypes ? (
            <div className="text-gray-400 text-sm flex items-center h-full pl-[10px]">
              Loading types...
            </div>
          ) : (
            <DropdownSelect
              placeholder="Select Type"
              options={typeOptions}
              value={typeOptions.find((o) => o.value === roomType) ?? null}
              onChange={(item) => {
                console.log("TYPE ITEM:", item);
                console.log("TYPE VALUE:", item.value);
                setRoomType(item.value);
              }}


            />
          )}
        </div>
      </div>

      {/* Capacity */}
      <div className="flex flex-col flex-1 min-w-[180px]">
        <div className="h-[48px]">
          {loadingCapacities ? (
            <div className="text-gray-400 text-sm flex items-center h-full pl-[10px]">
              Loading capacities...
            </div>
          ) : (
            <DropdownSelect
              placeholder="Select Capacity"
              options={capacityOptions}
              value={capacityOptions.find((o) => o.value === capacity) ?? null}
              onChange={(item) => {
              console.log("CAP ITEM:", item);
              console.log("CAP VALUE:", item.value);
              setCapacity(item.value);
            }}

            />
          )}
        </div>
      </div>

      {/* Search */}
      <button
        onClick={handleSearchClick}
        className="min-w-[120px] h-[48px] rounded-[10px] border border-[#EB5B00] 
        text-[#EB5B00] font-medium hover:bg-[#EB5B00]/10 transition-all
        active:scale-95 duration-200
        focus:outline-none focus:ring-1 focus:ring-[#EB5B00]"
      >
        Search
      </button>

      <button
        onClick={() => window.location.reload()}
        className="min-w-[120px] h-[48px] rounded-[10px] border border-[#EB5B00] 
        text-[#EB5B00] font-medium hover:bg-[#EB5B00]/10 transition-all
        active:scale-95 duration-200
        focus:outline-none focus:ring-1 focus:ring-[#EB5B00]"
      >
        Reset
      </button>


      {/* Add Room */}
      <button
        onClick={onAddRoom}
        className="min-w-[160px] h-[48px] rounded-[10px] bg-[#EB5B00] 
        hover:bg-[#d84f00] text-white font-medium transition-all
        active:scale-95 duration-200
        focus:outline-none focus:ring-1 focus:ring-[#EB5B00]"
      >
        + Add New Room
      </button>
    </section>
  );
}
