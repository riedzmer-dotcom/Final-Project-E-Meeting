export default function DashboardRoomCard({ name, usage, omzet }) {
  // hitung derajat donut dari persen (1% = 3.6 derajat)
  const usageAngle = usage * 3.6;

  return (
    <div
      className="h-[227px] bg-white rounded-[10px] shadow-sm px-[20px] py-[20px] 
                 flex flex-col justify-between hover:shadow-md transition-all duration-300"
    >
      {/* 🔹 Nama ruangan */}
      <h3 className="text-[#5E5E5E] text-[28px] font-medium leading-[38px] mb-[8px]">
        {name}
      </h3>

      {/* 🔹 Isi bawah: teks kiri dan donut kanan */}
      <div className="flex justify-between items-center w-full">
        {/* Kiri: Persentase & Omzet */}
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-col gap-[5px]">
            <span className="text-[#787878] text-[14px] font-normal">
              Percentage of Usage
            </span>
            <span className="text-black text-[24px] font-semibold">
              {usage}%
            </span>
          </div>

          <div className="flex flex-col gap-[5px]">
            <span className="text-[#787878] text-[14px] font-normal">
              Omzet
            </span>
            <span className="text-black text-[24px] font-semibold">
              Rp. {Number(omzet).toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Kanan: Donut Chart */}
        <div className="relative w-[100px] h-[100px] flex items-center justify-center">
          {/* Latar abu-abu */}
          <div className="absolute inset-0 rounded-full bg-[#F7F7F7]" />
          {/* Arc progres */}
          <div
            className="absolute inset-0 rounded-full z-0"
            style={{
              background: `conic-gradient(#EB5B00 0deg ${usageAngle}deg, #F7F7F7 ${usageAngle}deg 360deg)`,
            }}
          />
          {/* Lingkaran putih di tengah */}
          <div className="w-[75px] h-[75px] rounded-full bg-white z-10" />
        </div>
      </div>
    </div>
  );
}
