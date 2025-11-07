import { Download } from "lucide-react";
import PickerStartDate from "../components/PickerStartDate";
import PickerEndDate from "../components/PickerEndDate";
import DropdownSelect from "../components/DropdownSelect";
import { roomTypeOptions, reportStatusOptions } from "../data/GlobalDataDummies";

export default function ReportFilterPanel() {
  return (
    <section
      className="w-full bg-white px-[5px] py-[16px]
                 flex flex-wrap md:flex-nowrap items-end justify-between gap-[20px]"
    >
      <div className="flex flex-1 flex-wrap md:flex-nowrap gap-[20px] min-w-0">

        {/* Start Date */}
        <div className="flex flex-col flex-1 min-w-[160px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            Start Date
          </label>
          <div className="h-[48px]">
            <PickerStartDate />
          </div>
        </div>

        {/* End Date */}
        <div className="flex flex-col flex-1 min-w-[160px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            End Date
          </label>
          <div className="h-[48px]">
            <PickerEndDate />
          </div>
        </div>

        {/* Room Type */}
        <div className="flex flex-col flex-1 min-w-[140px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            Room Type
          </label>
          <div className="h-[48px]">
            <DropdownSelect placeholder="Select Type" options={roomTypeOptions} />
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col flex-1 min-w-[140px]">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            Status
          </label>
          <div className="h-[48px]">
            <DropdownSelect placeholder="Select Status" options={reportStatusOptions} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-[20px]">
        <button className="min-w-[120px] h-[48px] rounded-[10px] 
        bg-[#EB5B00] hover:bg-[#d84f00] text-white text-[16px] 
        font-medium transition-all duration-200
        focus:outline-none focus-visible:outline-none
        focus:ring-1 focus:ring-[#EB5B00]">
          Search
        </button>

        <button className="min-w-[48px] h-[48px] rounded-[10px] 
        border border-[#EB5B00] text-[#EB5B00] flex items-center 
        justify-center hover:bg-[#FFF3E9] active:scale-95 transition-all duration-200
        focus:outline-none focus-visible:outline-none
        focus:ring-1 focus:ring-[#EB5B00]">
          <Download size={20} strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}
