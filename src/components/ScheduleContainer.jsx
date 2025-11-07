import { useRef } from "react";
import ScheduleHeaderRoom from "./ScheduleHeaderRoom";
import ScheduleTimeSidebar from "./ScheduleTimeSidebar";
import ScheduleBody from "./ScheduleBody";

// 🔹 Import data dummy dari file
import { scheduleRooms, scheduleTimes } from "../data/ScheduleDataDummies";

export default function ScheduleContainer() {
  const containerRef = useRef(null);

  return (
    <div className="relative w-full h-full bg-white">
      {/* Scrollable container utama */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-auto"
        style={{ scrollbarGutter: "auto" }}
      >
        <div className="relative flex w-max min-h-full min-w-full">
          {/* Sidebar waktu (sticky kiri) */}
          <div className="sticky top-0 left-0 z-20 flex flex-col bg-white">
            {/* Kotak putih sudut kiri atas */}
            <div className="h-[70px] w-[80px] bg-white flex-shrink-0" />

            {/* TimeSidebar scrollable vertical */}
            <div className="flex-1 overflow-y-scroll overflow-x-hidden">
              <ScheduleTimeSidebar times={scheduleTimes} />
            </div>
          </div>

          {/* Konten utama */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Header sticky atas */}
            <div className="sticky top-0 z-10 bg-white">
              <ScheduleHeaderRoom rooms={scheduleRooms} />
            </div>

            {/* Body utama */}
            <div className="overflow-x-auto overflow-y-hidden">
              <ScheduleBody rooms={scheduleRooms} times={scheduleTimes} />
            </div>
          </div>
        </div>
      </div>

      {/* overlay sudut kiri atas */}
      <div className="absolute top-0 left-0 h-[70px] w-[100px] bg-white z-30 pointer-events-none" />
    </div>
  );
}
