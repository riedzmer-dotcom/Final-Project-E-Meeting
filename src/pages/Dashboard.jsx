import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import DashboardFilterPanel from "../components/DashboardFilterPanel";
import DashboardStatisticCard from "../components/DashboardStatisticCard";
import DashboardRoomCard from "../components/DashboardRoomCard";
import LayoutFooter from "../components/LayoutFooter";

// 🔹 import data dummies (khusus Dashboard)
import { dashboardStats, dashboardRooms } from "../data/DashboardDataDummies";

export default function Dashboard() {
  return (
    <div
      className="bg-gray-100 min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* LayoutSidebar & LayoutHeader */}
      <LayoutSidebar />
      <LayoutHeader pageTitle="Dashboard" />

      {/* Wrapper utama konten dashboard */}
      <div
        className="absolute top-[80px] left-[80px] 
        right-0 bottom-0 bg-transparent flex flex-col"
      >
        <main
          className="flex-1 overflow-y-auto 
          px-[20px] pt-[20px] pb-[8px] flex flex-col gap-[20px]"
        >
          {/* 🔹 Filter Panel */}
          <DashboardFilterPanel />

          {/* 🔹 Statistik Utama */}
          <section className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
            {dashboardStats.map((item, i) => (
              <DashboardStatisticCard key={i} title={item.title} value={item.value} />
            ))}
          </section>

          {/* 🔹 Grid Room Cards */}
          <section className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {dashboardRooms.map((room, i) => (
              <DashboardRoomCard key={i} {...room} />
            ))}
          </section>

          {/* 🔹 LayoutFooter */}
          <LayoutFooter />
        </main>
      </div>
    </div>
  );
}
