import ReportTableHeader from "./ReportTableHeader";
import ReportTableBody from "./ReportTableBody";

export default function ReportTable({ records, loading }) {

/* ======================================================
       UI
     ====================================================== */
  return (
    <div className="bg-white rounded-t-[10px] shadow-sm overflow-hidden">

      {/* TABLE HEADER (STATIC) */}
      <div className="w-full">
        <table className="table-fixed w-full text-left text-sm border-collapse">
          
          
          {/* COLUMN WIDTH DEFINITIONS */}
          <colgroup>
            <col style={{ width: "200px" }} /> 
            <col style={{ width: "200px" }} /> 
            <col style={{ width: "200px" }} /> 
            <col style={{ width: "150px" }} /> 
            <col style={{ width: "80px" }} />  
          </colgroup>

          {/* HEADER COMPONENT */}
          <ReportTableHeader />
        </table>
      </div>

      {/* TABLE BODY (SCROLLABLE AREA) */}
      <div className="max-h-[330px] overflow-y-auto focus:outline-none focus:ring-0 focus:border-none">
        <table className="table-fixed w-full text-left text-sm border-collapse">
          
          {/* COLUMN WIDTH (MATCHING ABOVE) */}
          <colgroup>
            <col style={{ width: "200px" }} />
            <col style={{ width: "200px" }} />
            <col style={{ width: "200px" }} />
            <col style={{ width: "150px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>

          {/* BODY COMPONENT */}
          <ReportTableBody records={records} loading={loading} />
        </table>
      </div>
    </div>
  );
}
