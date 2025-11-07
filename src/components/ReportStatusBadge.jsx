export default function ReportStatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-[#00B929]";
      case "Booked":
        return "bg-[#FF8B00]";
      case "Cancel":
        return "bg-[#FF3838]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <span
      className={`${getStatusColor(status)} text-white text-[14px] font-medium flex items-center justify-center rounded-full`}
      style={{
        width: "60px",   // lebar tetap
        height: "30px",  // tinggi tetap
         fontSize: "12px",
        lineHeight: "25px",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {status}
    </span>
  );
}
