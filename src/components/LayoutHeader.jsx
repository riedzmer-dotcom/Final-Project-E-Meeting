import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import frameImage from "../assets/images/frame-image.png";

export default function LayoutHeader({ pageTitle = "Dashboard" }) {
  const [user, setUser] = useState({ username: "", role: "" });
  const navigate = useNavigate();

  // 🔹 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    alert("✅ Anda telah logout!");
    navigate("/Login");
  };

  // 🔹 Fetch data user setelah komponen muncul
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.warn("⚠️ User ID tidak ditemukan di localStorage.");
          return;
        }

        // Panggil endpoint GET /api/v1/users/{id}
        const res = await api.get(`/users/${userId}`);

        if (res.data.status === 200 && res.data.data) {
          const userData = res.data.data;
          setUser({
            username: userData.username || "User",
            role: userData.role || "User",
          });
        } else {
          console.warn("⚠️ Respons tidak sesuai format:", res.data);
        }
      } catch (err) {
        console.error("Gagal ambil data user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <header
      className="fixed top-0 left-[80px] right-0 h-[80px]
                 bg-white border-b border-gray-100 
                 flex items-center justify-between 
                 px-[40px] z-20 transition-all duration-300 ease-in-out"
    >
      {/* 🔹 Judul Halaman */}
      <h1 className="text-[28px] font-semibold text-[#0F172A]">
        {pageTitle}
      </h1>

      {/* 🔹 User Info */}
      <div className="flex items-center gap-3 w-auto h-[50px]">
        <img
          src={frameImage}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex flex-col leading-tight">
          <span className="text-[#0F172A] font-medium text-sm">
            {user.username || "Loading..."}
          </span>
          <span className="text-gray-500 text-xs">{user.role}</span>
        </div>

        <button
          onClick={handleLogout}
          className="text-[#EB5B00] bg-transparent border-0 outline-none appearance-none
                    hover:opacity-90 hover:scale-90 active:scale-95
                    transition-all duration-200 ease-out"
          title="Sign Out"
        >
          <i className="uil uil-signout text-[24px]" />
        </button>
      </div>
    </header>
  );
}
