import ReportStatusBadge from "./ReportStatusBadge";
import { ExternalLink } from "lucide-react";
import { reportRecords } from "../data/ReportDataDummies";

export default function ReportTableBody() {
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
      {reportRecords.map((item) => (
        <tr
          key={item.id}
          className="border-t border-gray-300 hover:bg-gray-100 transition-all duration-150"
          style={{ height: "48px" }}
        >
          <td className="px-[40px] text-left align-middle">{item.date}</td>
          <td className="px-[40px] text-left align-middle">{item.room}</td>
          <td className="px-[40px] text-left align-middle">{item.type}</td>
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
