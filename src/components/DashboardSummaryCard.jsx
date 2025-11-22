export default function DashboardSummaryCard({ title, value }) {

/* ======================================================
       UI
     ====================================================== */
  return (
    <div className="
      bg-white rounded-[10px] shadow-sm 
      flex flex-col justify-start
      px-[20px] py-[16px] 
      h-auto sm:h-[128px]
    ">

      {/* TITLE */}
      <span className="text-[#5E5E5E] text-[18px] font-normal leading-[27px] mb-[8px]">
        {title}
      </span>

      {/* VALUE */}
      <span className="text-black text-[36px] font-medium leading-[46px]">
        {value !== undefined && value !== null ? value : "-"}
      </span>
    </div>
  );
}
