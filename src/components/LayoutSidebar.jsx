import iconOnly from "../assets/images/Icon-Only.png";

export default function LayoutSidebar() {
  const menuIcons = [
    "uil-clipboard-notes",
    "uil-building",
    "uil-file-alt",
    "uil-setting",
  ];

  return (
    <aside
      className="fixed left-0 top-0 w-[80px] h-screen bg-white border-r border-gray-100 
                 flex flex-col items-center py-6 z-20 transition-all duration-150 ease-in-out"
    >
      {/* 🔹 Logo utama */}
      <div className="w-[50px] h-[50px] flex items-center justify-center mb-5">
        <img
          src={iconOnly}
          alt="E-Meeting Icon"
          className="w-[40px] h-[40px] object-contain"
        />
      </div>

      {/* 🔹 Tombol collapse */}
      <div className="flex items-center justify-center my-[20px]">
        <button
          className="w-[25px] h-[25px] flex items-center justify-center 
                    rounded-full border border-[#EB5B00] 
                    text-[#EB5B00] hover:bg-transparent 
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-0
                    active:text-[#EB5B00] hover:text-[#EB5B00] 
                    hover:border-[#EB5B00]
                    transform hover:scale-95 focus:scale-95 transition-transform duration-150 ease-out"
        >
          <i className="uil uil-angle-right text-[20px]" />
        </button>
      </div>

      {/* 🔹 Tombol Apps */}
<button
  className="w-[80px] h-[40px] my-[5px] flex items-center justify-center
             text-[#C4C4C4] bg-transparent border-0 outline-none appearance-none
             hover:text-[#EB5B00] hover:border-r-[3px] hover:border-[#EB5B00]
             focus:text-[#EB5B00] focus:scale-95
             active:text-[#EB5B00] active:scale-95
             transition-all duration-150 ease-out"
  style={{ background: "none", boxShadow: "none" }}
>
  <i className="uil uil-apps text-[24px]" />
</button>


{/* 🔹 Menu Vertikal */}
<div className="w-[80px] h-[220px] my-[20px] flex flex-col justify-between items-center">
  {menuIcons.map((ic, i) => (
    <button
      key={i}
      className="w-[80px] h-[40px] flex items-center justify-center
                 text-[#C4C4C4] bg-transparent border-0 outline-none appearance-none
                 hover:text-[#EB5B00] hover:border-r-[3px] hover:border-[#EB5B00]
                 focus:text-[#EB5B00] focus:scale-95
                 active:text-[#EB5B00] active:scale-95
                 transition-all duration-150 ease-out"
      style={{ background: "none", boxShadow: "none" }}
    >
      <i className={`uil ${ic} text-[24px]`} />
    </button>
  ))}
</div>


    </aside>
  );
}
