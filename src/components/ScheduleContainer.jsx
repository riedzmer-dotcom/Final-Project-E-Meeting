import { useEffect, useState } from "react";
import { getRooms, getReservations } from "../services/api";
import ScheduleHeaderRoom from "./ScheduleHeaderRoom";
import ScheduleTimeSidebar from "./ScheduleTimeSidebar";
import ScheduleBody from "./ScheduleBody";
import { generateScheduleTimes } from "../data/ScheduleTimes";

/* ======================================================
   MAIN CONTAINER
====================================================== */

export default function ScheduleContainer({
  onReadyReload,
  startDate,
  endDate,
  onEditEvent,
  onDeleteEvent,
  onPaginationChange,
}) {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [allReservations, setAllReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ======================================================
     STATE
  ====================================================== */
  const scheduleTimes = generateScheduleTimes();


  /* ======================================================
     INITIAL LOAD — ROOMS & RESERVATIONS
  ====================================================== */
  useEffect(() => {
    loadRooms();
    loadReservations();
  }, []);

  /* ======================================================
     PROVIDE RELOAD FUNCTION TO PARENT
  ====================================================== */
  useEffect(() => {
        if (typeof onReadyReload === "function") {
          onReadyReload(reloadReservations);
        }
      }, []);     
  

  /* ======================================================
     LOAD ROOMS
  ====================================================== */
    const loadRooms = async () => {
    try {
      setLoading(true);
      const res = await getRooms();
      const list = Array.isArray(res?.data) ? res.data : [];

      const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
      });

      setRooms(list.sort((a, b) => collator.compare(a.room_name, b.room_name)));
    } finally {
      setLoading(false);
    }
  };


  /* ======================================================
     LOAD RESERVATIONS
  ====================================================== */
  
    const loadReservations = async () => {
    const res = await getReservations();
    const list = Array.isArray(res?.data) ? res.data : [];
    setAllReservations(list);
    setReservations(list);
  };

  const reloadReservations = () => loadReservations();

  /* ======================================================
     DATE FILTERING
  ====================================================== */
  useEffect(() => {
    applyDateFilter();
  }, [startDate, endDate, allReservations]);

    const applyDateFilter = () => {
      if (!startDate && !endDate) {
        setReservations(allReservations);
        return;
      }

    const normalize = (d) => {
      if (!d) return null;
      const [dd, mm, yy] = d.split("/");
      return `${yy}-${mm}-${dd}`;
    };

    const start = normalize(startDate);
    const end = normalize(endDate);

    const filtered = allReservations.filter((r) => {
      const d = r.date_reservation;
      if (start && d < start) return false;
      if (end && d > end) return false;
      return true;
    });

    setReservations(filtered);
  };

  /* ======================================================
     GENERATE DATE RANGE (MULTI-DAY NAVIGATION)
  ====================================================== */
  const normalizeDateObj = (str) => {
    if (!str) return null;
    const [dd, mm, yyyy] = str.split("/");
    return new Date(`${yyyy}-${mm}-${dd}T00:00:00`);
  };

  const dateList = (() => {
    if (!startDate || !endDate) return [new Date()];

    const s = normalizeDateObj(startDate);
    const e = normalizeDateObj(endDate);
    if (!s || !e) return [new Date()];

    const arr = [];
    const cur = new Date(s);
    while (cur <= e) {
      arr.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return arr;
  })();

  
  /* ======================================================
     SELECTED DATE
  ====================================================== */
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedDate = dateList[selectedIndex] || new Date();

  const selectedIso = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  const reservationsForDay = reservations.filter(
    (r) => r.date_reservation === selectedIso
  );

  /* ======================================================
     ROOM PAGINATION
  ====================================================== */
  const ROOMS_PER_PAGE = 5;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(rooms.length / ROOMS_PER_PAGE);

  // Slice rooms based on page
  const pagedRooms = rooms.slice(
    page * ROOMS_PER_PAGE,
    page * ROOMS_PER_PAGE + ROOMS_PER_PAGE
  );

  // Filter reservations for visible rooms only
  const pagedReservations = reservationsForDay.filter((r) =>
    pagedRooms.some((rm) => rm.id === r.room_id)
  );

  // Group reservations by room
  const pagedReservationsByRoom = pagedRooms.reduce((acc, room) => {
    acc[room.id] = pagedReservations.filter((r) => r.room_id === room.id);
    return acc;
  }, {});

  
  
  
  /* ======================================================
     EXPOSE PAGINATION STATE TO PARENT
  ====================================================== */
  useEffect(() => {
    onPaginationChange?.({
      page,
      totalPages,
      setPage,
    });
  }, [page, totalPages, rooms]);


  /* ======================================================
     LOADING UI
  ====================================================== */
  if (loading) return <div className="p-4">Loading rooms...</div>;

  
  /* ======================================================
     UI
  ====================================================== */
  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* Scroll vertical only */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full">

          {/* Sidebar jam */}
          <div className="sticky left-0 top-0 z-10 bg-white">
            <ScheduleTimeSidebar times={scheduleTimes} />
          </div>

          {/* Header + Body */}
          <div className="flex flex-col">
            <div className="sticky top-0 z-20">
              <ScheduleHeaderRoom
                rooms={pagedRooms}
                reservationsByRoom={pagedReservationsByRoom}
              />
            </div>

            <ScheduleBody
              rooms={pagedRooms}
              times={scheduleTimes}
              reservations={pagedReservations}
              selectedDate={selectedDate}
              onEditEvent={onEditEvent}
              onDeleteEvent={onDeleteEvent}
            />
          </div>
        </div>
      </div>

      {/* Static Navigator */}
      <div
        className="absolute top-0 left-0 h-[70px] w-[80px] bg-gray-100 
        border-r border-gray-300 z-30 flex flex-col items-center justify-center"
      >
        <div className="text-[11px] font-semibold text-gray-700 leading-none">
          {selectedDate.toLocaleDateString("en-GB", { weekday: "long" })}
        </div>

        <div className="flex items-center justify-center gap-[1px] mt-[2px]">
          <button
            onClick={() => selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)}
            disabled={selectedIndex <= 0}
            className="text-[24px] text-gray-700 hover:text-[#EB5B00]"
          >
            <i className="uis uis-angle-left" />
          </button>

          <div className="text-[24px] text-gray-700 font-semibold leading-none">
            {selectedDate.getDate()}
          </div>

          <button
            onClick={() =>
              selectedIndex < dateList.length - 1 &&
              setSelectedIndex(selectedIndex + 1)
            }
            disabled={selectedIndex >= dateList.length - 1}
            className="text-[24px] text-gray-700 hover:text-[#EB5B00]"
          >
            <i className="uis uis-angle-right" />
          </button>
        </div>
      </div>
    </div>
  );
}
