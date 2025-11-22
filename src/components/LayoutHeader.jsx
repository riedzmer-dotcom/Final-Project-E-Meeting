import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/api";
import frameImage from "../assets/images/frame-image.png";
import CustomToast from "../components/CustomToast";
import TopLoadingBar from "./TopLoadingBar";

export default function LayoutHeader({ pageTitle = "Dashboard", loading  }) {

/* ======================================================
       STATES
     ====================================================== */
  const [user, setUser] = useState({
    username: "",
    role: "",
    photo_url: null,
  });

  const [toastMsg, setToastMsg] = useState("");
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  
 /* ======================================================
       LOGOUT HANDLER
     ====================================================== */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("photo_url");

    setToastMsg("Anda telah logout!");
    setTimeout(() => navigate("/Login"), 300);
  };

  /* ======================================================
       FETCH PROFILE (HEADER SYNC)
     ====================================================== */
  const loadProfile = async () => {
    try {
      const res = await getProfile();
      const data = res?.data || {};

      // Keep header photo in sync with stored photo
      if (data.photo_url) {
        localStorage.setItem("photo_url", data.photo_url);
      }

      setUser({
        username: data.username || "User",
        role: data.role || "User",
        photo_url: data.photo_url || null,
      });
    } catch (err) {
      console.error("❌ /profile error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/Login");
      }
    }
  };


/* ======================================================
       INITIAL LOAD + LISTEN FOR PROFILE UPDATE EVENT
     ====================================================== */
  useEffect(() => {
    loadProfile();

    // Listen for updates from SettingsAccountSection
    const handler = () => loadProfile();
    window.addEventListener("profile-updated", handler);

    return () => window.removeEventListener("profile-updated", handler);
  }, []);


  /* ======================================================
       PHOTO FALLBACK HANDLING
     ====================================================== */
  const displayedPhoto =
    user.photo_url ||
    localStorage.getItem("photo_url") ||
    frameImage;

 
 /* ======================================================
       UI
     ====================================================== */
    return (
    <>

    {/* TOAST */}
      {toastMsg && <CustomToast message={toastMsg} onClose={() => setToastMsg("")} />}

      
      {/* HEADER BAR */}
      <header
        className="fixed top-0 left-[80px] right-0 h-[80px]
                 bg-white border-b border-gray-100 
                 flex items-center justify-between 
                 px-[40px] z-20 transition-all duration-300 ease-in-out"
      >
        
        {/* PAGE TITLE */}
        <h1 className="text-[28px] font-semibold text-[#0F172A]">
          {pageTitle}
        </h1>

        {/* USER PROFILE SECTION */}
        <div className="flex items-center gap-3 w-auto h-[50px]">
          
          {/* USER AVATAR */}
          <img
            src={displayedPhoto}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />

          {/* USER NAME & ROLE */}
          <div className="flex flex-col leading-tight">
            <span className="text-[#0F172A] font-medium text-sm">
              {user.username}
            </span>
            <span className="text-gray-500 text-xs">{user.role}</span>
          </div>

          
          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="text-[#EB5B00] hover:opacity-90 hover:scale-90 active:scale-95 
                       transition-all duration-200 ease-out"
            title="Sign Out"
          >
            <i className="uil uil-signout text-[24px]" />
          </button>
        </div>
      </header>
       
       
       {/* TOP LOADING BAR */}
       <TopLoadingBar loading={loading} />
    </>
  );
}
