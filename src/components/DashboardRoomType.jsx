// components/DashboardRoomType.jsx
export default function DashboardRoomType({ name, capacity, pricePerHour, type, image }) {
  return (
    <div
      className="relative bg-white rounded-[15px] shadow-sm border border-gray-100 overflow-hidden 
                 hover:shadow-md transition-all duration-300 ease-in-out"
    >
      {/* 🔹 Gambar */}
      <div className="relative w-full h-[180px]">
        <img
          src={image}
          alt={`${name} Preview`}
          className="w-full h-full object-cover"
        />

        {/* 🔘 Tombol Aksi */}
        <div className="absolute top-[10px] right-[10px] flex gap-[8px]">

          {/* 🗑 Delete */}
          <button
            className="w-[32px] h-[32px] rounded-full bg-white shadow-sm flex items-center justify-center
                      text-[#EB5B00] transition-all duration-200
                      hover:bg-[#EB5B00] hover:text-white
                      focus:bg-[#EB5B00] focus:text-white
                      focus:outline-none focus-visible:outline-none focus:ring-0
                      active:scale-95"
          >
            <i className="uil uil-trash text-[18px]" />
          </button>

          {/* ✏ Edit */}
          <button
            className="w-[32px] h-[32px] rounded-full bg-white shadow-sm flex items-center justify-center
                      text-[#EB5B00] transition-all duration-200
                      hover:bg-[#EB5B00] hover:text-white
                      focus:bg-[#EB5B00] focus:text-white
                      focus:outline-none focus-visible:outline-none focus:ring-0
                      active:scale-95"
          >
            <i className="uil uil-pen text-[18px]" />
          </button>

        </div>

      </div>

      {/* 🔹 Bagian Bawah */}
      <div className="px-[16px] py-[5px] flex flex-col gap-[4px]">
        {/* Nama Room */}
        <h3 className="text-[30px] font-medium text-gray-800">{name}</h3>

        {/* Info Kapasitas dan Harga */}
        <div className="flex items-center justify-between text-gray-500 text-[14px]">
          <div className="flex items-center gap-[4px]">
            <i className="uil uil-users-alt text-[20px] text-[#EB5B00]" />
            <span>{capacity} people</span>
          </div>

          <div className="flex items-center gap-[4px]">
            <i className="uil uil-money-bill text-[20px] text-[#EB5B00]" />
            <span>Rp {pricePerHour.toLocaleString("id-ID")} / hours</span>
          </div>
        </div>
      </div>

      {/* 🔹 Label kecil kanan bawah */}
      <div className="absolute bottom-[50px] right-[10px]">
        <span
          className="bg-[#EB5B00] text-white text-[12px] font-medium px-[10px] py-[4px] 
                     rounded-full shadow-sm"
        >
          {type}
        </span>
      </div>
    </div>
  );
}
