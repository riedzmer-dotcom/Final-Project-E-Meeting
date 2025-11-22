import { useEffect, useState } from "react";
import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import LayoutFooter from "../components/LayoutFooter";
import ReportFilterPanel from "../components/ReportFilterPanel";
import ReportTable from "../components/ReportTable";
import ReportPagination from "../components/ReportPagination";
import { getReportData } from "../services/api";

export default function Report() {
  /* =======================================
     STATES
  ======================================= */
  const [allRecords, setAllRecords] = useState([]);   // semua data dari BE
  const [records, setRecords] = useState([]);         // hasil filtering FE
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    room_type: "",
    room_id: "",
    status: "",
  });

  const PAGE_LIMIT = 10;

  /* =======================================
     FETCH DATA BE (ONCE SAAT MOUNT)
  ======================================= */
  const fetchAllDataOnce = async () => {
    try {
      setLoading(true);

      
      const res = await getReportData({
        page: 1,
        limit: 9999,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined,
      });


      const arr = res.data || [];
      setAllRecords(arr);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDataOnce();
  }, []);

  /* =======================================
     FILTERING FULL FE
  ======================================= */
  const applyFilters = () => {
    let filtered = [...allRecords];

    // Date Filter
    if (filters.startDate) {
      filtered = filtered.filter(
        (item) => item.date_reservation >= filters.startDate
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        (item) => item.date_reservation <= filters.endDate
      );
    }

    // Room Type Filter
    if (filters.room_type) {
      filtered = filtered.filter(
        (item) => item.rooms?.room_type === filters.room_type
      );
    }

    // Room ID Filter
    if (filters.room_id) {
      filtered = filtered.filter(
        (item) => item.room_id === filters.room_id
      );
    }

    // Status Filter
    if (filters.status) {
      filtered = filtered.filter(
        (item) => item.status === filters.status
      );
    }

    // Reset page after filters change
    setPage(1);
    setRecords(filtered);
  };

 /* ======================================================
       RE-APPLY FILTERS WHEN allRecords CHANGES
     ====================================================== */
  useEffect(() => {
    applyFilters();
  }, [allRecords]);

  /* =======================================
     PAGINATION FE
  ======================================= */
  const startIdx = (page - 1) * PAGE_LIMIT;
  const paginatedRecords = records.slice(startIdx, startIdx + PAGE_LIMIT);
  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_LIMIT));


  /* ================================
     UI
  ================================ */

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden" 
         style={{ fontFamily: "'Roboto', sans-serif" }}>
      
      <LayoutSidebar />
      <LayoutHeader pageTitle="Report" />

      <div className="absolute top-[80px] left-[80px] flex flex-col pt-[20px] px-[20px] pb-0">

        {/* FILTER PANEL */}
        <div className="w-full bg-white z-20 px-[20px] pt-[20px] pb-0">
          <ReportFilterPanel
            filters={filters}
            setFilters={setFilters}
            onSearch={() => {
              applyFilters();
            }}
          />

        </div>

        {/* REPORT TABLE */}
        <div className="flex-1 bg-white z-10 overflow-hidden px-[10px] pt-[20px] pb-0">
          <div className="flex flex-col gap-[5px]">

            <ReportTable records={paginatedRecords} loading={loading} />

            <ReportPagination page={page} totalPages={totalPages} setPage={setPage} />

          </div>
        </div>

      </div>

      <div className="absolute left-[80px] right-0 bottom-0 bg-transparent z-30">
        <LayoutFooter />
      </div>

    </div>
  );
}
