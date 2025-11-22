import { useEffect, useState } from "react";

import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import DashboardFilterPanel from "../components/DashboardFilterPanel";
import DashboardSummaryCard from "../components/DashboardSummaryCard";
import DashboardPerformanceCard from "../components/DashboardPerformanceCard";
import LayoutFooter from "../components/LayoutFooter";

import { getRooms, getReservations } from "../services/api";

/* ======================================================
     STATE
  ====================================================== */

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMoney: 0,
    totalReservations: 0,
    totalVisitors: 0,
    totalRooms: 0,
  });

  const [roomPerformance, setRoomPerformance] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     CONSTANTS — OPERATIONAL HOURS
  ====================================================== */

  const OP_START = 6;  // 06:00
  const OP_END = 23;   // 23:00
  const OP_HOURS = OP_END - OP_START;  // 17 Jam


 /* ======================================================
     CALCULATE RESERVATION REVENUE
  ====================================================== */

  function calculateReservationRevenue(reservation, roomsMap) {
    const room = roomsMap[reservation.room_id];
    if (!room) return 0;

    const pricePerHour = Number(room.price ?? 0);

    const [sh, sm] = reservation.start_time.split(":").map(Number);
    const [eh, em] = reservation.end_time.split(":").map(Number);

    const start = sh * 60 + sm;
    const end = eh * 60 + em;

    const dur = Math.max((end - start) / 60, 0); 

    return pricePerHour * dur;
  }

 /* ======================================================
     GENERATE ROOM PERFORMANCE
  ====================================================== */

function generateRoomPerformance(rooms, reservations) {
  const roomsMap = {};
  rooms.forEach((r) => (roomsMap[r.id] = r));

  // Jam operasional: 06:00 - 23:00  → 17 jam = 1020 menit
  const OP_MINUTES = 17 * 60;

  // Struktur data:
  // dailyUsage[room_id][date] = total used minutes per date
  const dailyUsage = {};
  const omzetMap = {};

  rooms.forEach((room) => {
    dailyUsage[room.id] = {};
    omzetMap[room.id] = 0;
  });

  reservations.forEach((res) => {
    const roomId = res.room_id;
    if (!dailyUsage[roomId]) return;

    const date = res.date_reservation;

    const [sh, sm] = res.start_time.split(":").map(Number);
    const [eh, em] = res.end_time.split(":").map(Number);

    const startMin = sh * 60 + sm;
    const endMin = eh * 60 + em;

    const duration = Math.max(endMin - startMin, 0);

    // durasi harian
    if (!dailyUsage[roomId][date]) dailyUsage[roomId][date] = 0;
    dailyUsage[roomId][date] += duration;

    // Hitung omzet 
    omzetMap[roomId] += calculateReservationRevenue(res, roomsMap);
  });

  // Hasil akhir
  return rooms.map((room) => {
    const usageDates = Object.values(dailyUsage[room.id]);

    // Jika tidak ada booking → usage 0%
    if (usageDates.length === 0) {
      return {
        name: room.room_name,
        omzet: Math.round(omzetMap[room.id]),
        usage: 0,
      };
    }

    // Hitung usage harian → lalu ambil rata-rata
    const dailyPercentages = usageDates.map((minutes) => {
      const percent = (minutes / OP_MINUTES) * 100;
      return Math.min(percent, 100); // Tidak lebih dari 100%
    });

    // AVERAGE USAGE
    const avgUsage =
      dailyPercentages.reduce((a, b) => a + b, 0) / dailyPercentages.length;

    return {
      name: room.room_name,
      omzet: Math.round(omzetMap[room.id]),
      usage: Math.round(avgUsage),
    };
  });
}

  /* ======================================================
     FETCH DATA
  ====================================================== */

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const roomRes = await getRooms({ limit: 999 });
      const reservationRes = await getReservations();

      const rooms = roomRes.data ?? [];
      const reservations = reservationRes.data ?? [];

      /* SUMMARY */
      const totalReservations = reservations.length;
      const totalVisitors = reservations.reduce(
        (acc, r) => acc + Number(r.total_participant ?? 0),
        0
      );

      const roomsMap = {};
      rooms.forEach((r) => (roomsMap[r.id] = r));

      const totalMoney = reservations.reduce(
        (acc, r) => acc + calculateReservationRevenue(r, roomsMap),
        0
      );

      setStats({
        totalMoney,
        totalReservations,
        totalVisitors,
        totalRooms: rooms.length,
      });

      /* PERFORMANCE PER ROOM */
      const generated = generateRoomPerformance(rooms, reservations);

      const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

      const sorted = [...generated].sort((a, b) =>
        collator.compare(a.name, b.name)
      );

      setRoomPerformance(sorted);

    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);


  /* ======================================================
     UI
  ====================================================== */


  return (
    <div
      className="bg-gray-100 min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <LayoutSidebar />
      <LayoutHeader pageTitle="Dashboard" loading={loading} />


      <div className="absolute top-[80px] left-[80px] right-0 bottom-0 flex flex-col">
        <main className="flex-1 overflow-y-auto px-[20px] pt-[20px] pb-[8px] flex flex-col gap-[20px]">

          <DashboardFilterPanel />

          {loading && (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          )}

          {/* SUMMARY CARD */}
          {!loading && (
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
              <DashboardSummaryCard
                title="Total Omzet"
                value={`Rp ${stats.totalMoney.toLocaleString("id-ID")}`}
              />
              <DashboardSummaryCard
                title="Total Reservation"
                value={stats.totalReservations}
              />
              <DashboardSummaryCard
                title="Total Visitor"
                value={stats.totalVisitors}
              />
              <DashboardSummaryCard
                title="Total Rooms"
                value={stats.totalRooms}
              />
            </section>
          )}

          {/* ROOM PERFORMANCE CARD */}
          {!loading && (
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
              {roomPerformance.map((room, idx) => (
                <DashboardPerformanceCard
                  key={idx}
                  name={room.name}
                  usage={room.usage}
                  omzet={room.omzet}
                />
              ))}
            </section>
          )}

          <LayoutFooter />
        </main>
      </div>
    </div>
  );
}
