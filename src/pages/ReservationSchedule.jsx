import { useState } from "react";
import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import ScheduleSearchPanel from "../components/ScheduleSearchPanel";
import ScheduleContainer from "../components/ScheduleContainer";
import LayoutFooter from "../components/LayoutFooter";
import ReservationFormDrawer from "../components/ReservationFormDrawer";
import ReservationDetailModal from "../components/ReservationDetailModal"; // ✅ Tambahkan ini

export default function ReservationSchedule() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isDetailOpen, setDetailOpen] = useState(false); // ✅ Tambahkan ini
  const [reservationData, setReservationData] = useState(null);

  return (
    <div
      className="relative min-h-screen bg-gray-100 overflow-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <LayoutSidebar />
      <LayoutHeader pageTitle="Reservation Schedule" />

      <div className="absolute top-[80px] left-[80px] right-0 bottom-0 flex flex-col pt-[20px] px-[20px] bg-gray-100 shadow-sm">
        <div className="w-full bg-white z-20 px-0 pt-0 pb-0">
          <ScheduleSearchPanel onAddReservation={() => setDrawerOpen(true)} />
        </div>

        <div className="flex-1 bg-white z-10 overflow-hidden mt-0 px-[5px]">
          <ScheduleContainer />
        </div>

        <LayoutFooter />
      </div>

      {/* Drawer Form */}
      <ReservationFormDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNext={(data) => {
          setReservationData(data);
          setDrawerOpen(false);
          setDetailOpen(true);
        }}
      />

      {/* Modal Detail */}
      <ReservationDetailModal
        isOpen={isDetailOpen}
        onClose={() => setDetailOpen(false)}
        onBack={() => {
          setDetailOpen(false);
          setDrawerOpen(true);
        }}
        formData={reservationData}
      />
    </div>
  );
}
