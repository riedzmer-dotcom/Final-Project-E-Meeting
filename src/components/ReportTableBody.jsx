import ReportStatusBadge from "./ReportStatusBadge";
import { ExternalLink } from "lucide-react";

export default function ReportTableBody({ records = [], loading }) {

/* ======================================================
       LOADING STATE
     ====================================================== */
  if (loading) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="py-6 text-center text-gray-500">
            Loading data...
          </td>
        </tr>
      </tbody>
    );
  }


/* ======================================================
       EMPTY DATA STATE
     ====================================================== */
  if (!records.length) {
    return (
      <tbody>
        <tr>
          <td colSpan={5} className="py-6 text-center text-gray-500">
            No data available
          </td>
        </tr>
      </tbody>
    );
  }


/* ======================================================
       UI — TABLE BODY CONTENT
     ====================================================== */
  return (
    <tbody
      className="text-[#333333]"
      style={{
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "24px",
      }}
    >
      {records.map((item) => (
        <tr
          key={item.id}
          className="border-t border-gray-300 hover:bg-gray-100 transition-all duration-150"
          style={{ height: "48px" }}
        >
          
          {/* DATE, ROOM NAME, ROOM TYPE, STATUS BADGE, ACTION ICON */}
          <td className="px-[40px] text-left align-middle">{item.date_reservation}</td>
          <td className="px-[40px] text-left align-middle">{item.rooms?.room_name}</td>
          <td className="px-[40px] text-left align-middle">{item.rooms?.room_type}</td>
          <td className="px-[40px] text-left align-middle">
            <div className="flex items-center justify-start">
              <ReportStatusBadge status={item.status} />
            </div>
          </td>
          <td className="px-[40px] text-center align-middle text-[#EB5B00]">
            <ExternalLink size={18} className="inline" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
