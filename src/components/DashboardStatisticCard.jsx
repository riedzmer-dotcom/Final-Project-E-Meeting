export default function DashboardStatisticCard({ title, value }) {
  return (
    <div
      className="bg-white rounded-[10px] shadow-sm flex flex-col justify-start 
                 px-[20px] py-[16px] h-auto sm:h-[128px]"
    >
      <span className="text-[#5E5E5E] text-[18px] font-normal leading-[27px] mb-[8px]">
        {title}
      </span>
      <span className="text-black text-[36px] font-medium leading-[46px]">
        {value}
      </span>
    </div>
  );
}
