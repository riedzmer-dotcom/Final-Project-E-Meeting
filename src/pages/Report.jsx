import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import LayoutFooter from "../components/LayoutFooter";
import ReportFilterPanel from "../components/ReportFilterPanel";
import ReportTable from "../components/ReportTable";
import ReportPagination from "../components/ReportPagination";

export default function Report() {
  return (
    <div
      className="relative min-h-screen bg-gray-100 overflow-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* LayoutSidebar & LayoutHeader */}
      <LayoutSidebar />
      <LayoutHeader pageTitle="Report" />

      {/* ===============================
          MAIN CONTENT AREA
      =============================== */}
      <div className="absolute top-[80px] left-[80px]  flex flex-col pt-[20px] px-[20px] pb-0">

        {/* WRAPPER FILTER PANEL — statis di atas */}
        <div className="w-full bg-white z-20 px-[20px] pt-[20px] pb-0">
          <ReportFilterPanel />
        </div>

        {/* WRAPPER REPORT CONTAINER — scrollable */}
        <div
          className="flex-1 bg-white z-10 overflow-hidden px-[10px] pt-[20px] pb-0"
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          {/* ===== Report Content Wrapper ===== */}
          <div className="flex flex-col gap-[5px]">
            {/* TABLE REPORT (Header statis, Body scroll) */}
            <ReportTable />

            {/* PAGINATION */}
            <ReportPagination />
          </div>

        </div>
        
      </div>
     {/* LayoutFooter WRAPPER — statis di bawah dan punya z-index jelas */}
        <div
        className="absolute left-[80px] right-0 bottom-0 bg-transparent z-30"
        
        >
        <LayoutFooter />
        </div>

    </div>
  );
}
