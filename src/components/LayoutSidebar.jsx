import { useLocation, useNavigate } from "react-router-dom";
import iconOnly from "../assets/images/Icon-Only.png";

export default function LayoutSidebar() {

/* ======================================================
       ROUTER
     ====================================================== */
  const location = useLocation();
  const navigate = useNavigate();


  /* ======================================================
       MENU ITEMS
     ====================================================== */
  const menuItems = [
    { icon: "uil-apps", path: "/Dashboard", label: "Dashboard" },
    { icon: "uil-clipboard-notes", path: "/ReservationSchedule", label: "Reservation Schedule" },
    { icon: "uil-building", path: "/Rooms", label: "Rooms" },
    { icon: "uil-file-alt", path: "/Report", label: "Report" },
    { icon: "uil-setting", path: "/Settings", label: "Settings" },
  ];


  /* ======================================================
       ACTIVE STATE CHECKER
     ====================================================== */
  const isActive = (path) => location.pathname === path;

 
 /* ======================================================
       UI
     ====================================================== */
  return (
    <aside
      className="fixed left-0 top-0 w-[80px] h-screen bg-white border-r border-gray-100 
                 flex flex-col items-center py-6 z-20 transition-all duration-150 ease-in-out"
    >


      {/* LOGO */}
      <div className="w-[50px] h-[50px] flex items-center justify-center mb-5">
        <img
          src={iconOnly}
          alt="E-Meeting Icon"
          className="w-[40px] h-[40px] object-contain"
        />
      </div>


      {/* COLLAPSE BUTTON (FUTURE FEATURE) */}
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


      {/* VERTICAL MENU */}
      <div className="w-[80px] h-[300px] mt-[20px] flex flex-col justify-between items-center">
        {menuItems.map((item, i) => {
          const active = isActive(item.path);
          return (
            <button
              key={i}
              onClick={() => navigate(item.path)}
              className={`relative w-[80px] h-[40px] flex items-center justify-center
                          border-0 outline-none appearance-none bg-transparent
                          transition-all duration-150 ease-out
                          ${
                            active
                              ? "text-[#EB5B00]"
                              : "text-[#C4C4C4] hover:text-[#EB5B00]"
                          }`}
              title={item.label}
            >
              <i className={`uil ${item.icon} text-[24px]`} />


              {/* ACTIVE INDICATOR */}
              {active && (
                <span className="absolute right-0 top-0 w-[3px] h-full bg-[#EB5B00] rounded-l-sm" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
