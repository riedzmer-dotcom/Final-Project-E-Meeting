export default function DashboardPerformanceCard({ name, usage, omzet }) {
  
/* ======================================================
       SAFE VALUES & CALCULATIONS
     ====================================================== */  
  const safeUsage = Number(usage ?? 0);
  const safeOmzet = Number(omzet ?? 0);

  // Convert usage percentage to donut angle (1% = 3.6°)
  const usageAngle = safeUsage * 3.6;

  /* ======================================================
       UI
     ====================================================== */
  return (
    <div
      className="
        h-[227px] bg-white rounded-[10px] shadow-sm 
        px-[20px] py-[20px] 
        flex flex-col justify-between 
        hover:shadow-md transition-all duration-300
      "
    >
      {/* ROOM NAME */}
      <h3 className="text-[#5E5E5E] text-[28px] font-medium leading-[38px] mb-[8px]">
        {name ?? "-"}
      </h3>

      {/* BOTTOM CONTENT */}
      <div className="flex justify-between items-center w-full">
        
        {/* LEFT SIDE: USAGE & OMZET */}
        <div className="flex flex-col gap-[12px]">
          
          <div className="flex flex-col gap-[5px]">
            <span className="text-[#787878] text-[14px] font-normal">
              Percentage of Usage
            </span>
            <span className="text-black text-[24px] font-semibold">
              {safeUsage}%
            </span>
          </div>

          {/* OMZET */}
          <div className="flex flex-col gap-[5px]">
            <span className="text-[#787878] text-[14px] font-normal">
              Omzet
            </span>
            <span className="text-black text-[24px] font-semibold">
              Rp. {safeOmzet.toLocaleString("id-ID")}
            </span>
          </div>

        </div>

        {/* DONUT CHART */}
        <div className="relative w-[100px] h-[100px] flex items-center justify-center">
          
          {/* BACKGROUND CIRCLE */}
          <div className="absolute inset-0 rounded-full bg-[#F7F7F7]" />

          {/* PROGRESS DONUT */}
          <div
            className="absolute inset-0 rounded-full z-0"
            style={{
              background: `conic-gradient(
                #EB5B00 0deg ${usageAngle}deg, 
                #F7F7F7 ${usageAngle}deg 360deg
              )`,
            }}
          />

          {/* INNER WHITE CIRCLE */}
          <div className="w-[75px] h-[75px] rounded-full bg-white z-10" />
        </div>

      </div>
    </div>
  );
}
