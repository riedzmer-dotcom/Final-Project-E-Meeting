import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import PickerStartDate from "../components/PickerStartDate";
import PickerEndDate from "../components/PickerEndDate";
import DropdownSelect from "../components/DropdownSelect";
import { getRooms, getReportData } from "../services/api";

export default function ReportFilterPanel({ filters, setFilters, onSearch }) {

/* ======================================================
       STATES
     ====================================================== */
  const [roomTypes, setRoomTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loadingRoomTypes, setLoadingRoomTypes] = useState(false);
  const [loadingStatuses, setLoadingStatuses] = useState(false);

 /* ======================================================
     LOAD ROOM TYPES
  ====================================================== */
  useEffect(() => {
    let mounted = true;

    const loadRoomTypes = async () => {
      try {
        setLoadingRoomTypes(true);
        const res = await getRooms({ limit: 200 });
        const arr = res.data || [];

        const types = Array.from(
          new Set(arr.map((r) => r.room_type).filter(Boolean))
        );

        if (!mounted) return;
        setRoomTypes(types.map((t) => ({ label: t, value: t })));
      } catch (err) {
        console.error("ReportFilterPanel: failed loadRoomTypes", err);
      } finally {
        if (mounted) setLoadingRoomTypes(false);
      }
    };

    loadRoomTypes();
    return () => (mounted = false);
  }, []);

  /* ======================================================
     LOAD STATUS LIST
  ====================================================== */
  useEffect(() => {
    let mounted = true;

    const loadStatuses = async () => {
      try {
        setLoadingStatuses(true);

        const res = await getReportData({ limit: 200, page: 1 });
        const arr = res.data || [];

        const uniq = Array.from(new Set(arr.map((r) => r.status).filter(Boolean)));

        if (!mounted) return;
        setStatuses(uniq.map((s) => ({ label: s, value: s })));
      } catch (err) {
        console.error("ReportFilterPanel: failed loadStatuses", err);
      } finally {
        if (mounted) setLoadingStatuses(false);
      }
    };

    loadStatuses();
    return () => (mounted = false);
  }, []);

  /* ======================================================
     FIELD HELPER
  ====================================================== */
  const setField = (field, val) => {
    setFilters((prev) => ({ ...prev, [field]: val }));
  };

  /* ======================================================
     HANDLE SEARCH CLICK
     — FE filtering -
  ====================================================== */
  const handleSearchClick = () => {
    onSearch?.();
  };

  /* ======================================================
     UI
  ====================================================== */
  return (
    <section
      className="w-full bg-white px-[5px] py-[16px]
                 flex flex-wrap md:flex-nowrap items-end justify-between gap-[20px]"
    >
      <div className="flex flex-1 flex-wrap md:flex-nowrap gap-[20px] min-w-0">

        {/* START DATE */}
        <div className="flex flex-col flex-1 min-w-[160px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            Start Date
          </label>
          <div className="h-[48px]">
            <PickerStartDate
              value={filters.startDate}
              onChange={(v) => setField("startDate", v)}
            />
          </div>
        </div>

        {/* END DATE */}
        <div className="flex flex-col flex-1 min-w-[160px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            End Date
          </label>
          <div className="h-[48px]">
            <PickerEndDate
              value={filters.endDate}
              onChange={(v) => setField("endDate", v)}
            />
          </div>
        </div>

        {/* ROOM TYPE */}
        <div className="flex flex-col flex-1 min-w-[140px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            Room Type
          </label>
          <div className="h-[48px]">
            <DropdownSelect
              placeholder="Select Type"
              options={roomTypes}
              value={roomTypes.find((x) => x.value === filters.room_type) || null}
              onChange={(item) => setField("room_type", item?.value || "")}
              isLoading={loadingRoomTypes}
            />
          </div>
        </div>

        {/* STATUS */}
        <div className="flex flex-col flex-1 min-w-[140px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            Status
          </label>
          <div className="h-[48px]">
            <DropdownSelect
              placeholder="Select Status"
              options={statuses}
              value={statuses.find((x) => x.value === filters.status) || null}
              onChange={(item) => setField("status", item?.value || "")}
              isLoading={loadingStatuses}
            />
          </div>
        </div>
      </div>

      {/* BUTTON AREA */}
      <div className="flex gap-[20px]">
        
        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearchClick}
          className="min-w-[120px] h-[48px] rounded-[10px] 
            bg-[#EB5B00] hover:bg-[#d84f00] text-white text-[16px] 
            font-medium transition-all duration-200
            focus:outline-none focus-visible:outline-none
            focus:ring-1 focus:ring-[#EB5B00]"
        >
          Search
        </button>

        {/* DOWNLOAD BUTTON */}
        <button
          className="min-w-[48px] h-[48px] rounded-[10px] 
            border border-[#EB5B00] text-[#EB5B00] flex items-center 
            justify-center hover:bg-[#FFF3E9] active:scale-95 transition-all duration-200
            focus:outline-none focus-visible:outline-none
            focus:ring-1 focus:ring-[#EB5B00]"
        >
          <Download size={20} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}
