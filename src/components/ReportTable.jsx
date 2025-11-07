import ReportTableHeader from "./ReportTableHeader";
import ReportTableBody from "./ReportTableBody";

export default function TableReport() {
  return (
    <div className="bg-white rounded-t-xl shadow-sm overflow-hidden">
      {/* header table (statis) */}
      <div className="w-full">
        <table className="table-fixed w-full text-left text-sm border-collapse">
          {/* colgroup menentukan lebar kolom yang sama untuk header & body */}
          <colgroup>
            <col style={{ width: "200px" }} /> {/* Date */}
            <col style={{ width: "200px" }} /> {/* Room Name */}
            <col style={{ width: "200px" }} /> {/* Room Type */}
            <col style={{ width: "150px" }} /> {/* Status */}
            <col style={{ width: "80px" }} />  {/* Action */}
          </colgroup>

          <ReportTableHeader />
        </table>
      </div>

      {/* body table (scrollable area) */}
      <div className="max-h-[330px] overflow-y-auto">
        <table className="table-fixed w-full text-left text-sm border-collapse">
          <colgroup>
            <col style={{ width: "200px" }} />
            <col style={{ width: "200px" }} />
            <col style={{ width: "200px" }} />
            <col style={{ width: "150px" }} />
            <col style={{ width: "80px" }} />
          </colgroup>

          <ReportTableBody />
        </table>
      </div>
    </div>
  );
}
