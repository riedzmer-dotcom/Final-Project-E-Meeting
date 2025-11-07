import { roomTypes } from "../data/RoomsDataDummies";
import DashboardRoomType from "./DashboardRoomType";

export default function RoomsContainer() {
  return (
    <section
      className="w-full min-h-[750px] bg-white px-[25px] py-[20px] mt-0 flex flex-col"
      style={{ boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="flex-1 overflow-y-auto pr-[10px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-[20px] gap-y-[20px] pb-[20px]">
          {roomTypes.map((room) => (
            <DashboardRoomType key={room.id} {...room} />
          ))}
        </div>
      </div>
    </section>
  );
}
