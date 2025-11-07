import PickerStartDate from "./PickerStartDate";
import PickerEndDate from "./PickerEndDate";

export default function DashboardFilterPanel() {
  return (
    <section className="w-full h-[114px] bg-white px-[20px] py-[20px] flex items-center justify-between">
      {/* 🧭 Wrapper kiri (pakai grid agar Start & End sejajar dan sama lebar) */}
      <div className="flex-1 h-[74px] grid grid-cols-2 gap-[16px] pr-[20px]">
        
        {/* 🗓 Start Date */}
        <div className="flex flex-col">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            Start Date
          </label>
          <div className="w-full h-[48px]">
            <PickerStartDate />
          </div>
        </div>

        {/* 🗓 End Date */}
        <div className="flex flex-col">
          <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
            End Date
          </label>
          <div className="h-[48px]">
            <PickerEndDate />
          </div>
        </div>
      </div>

      {/* 🔶 Tombol Search */}
      <div className="w-[230px] h-[74px] flex flex-col justify-end">
        <button
          className="w-full h-[48px] rounded-[10px] bg-[#EB5B00] hover:bg-[#ff6a12]
                     text-white text-[16px] font-medium flex items-center justify-center
                     transition-all duration-200 active:scale-95
                     focus:outline-none focus-visible:outline-none
                     focus:ring-1 focus:ring-[#EB5B00]"
        >
          Search
        </button>
      </div>
    </section>
  );
}
