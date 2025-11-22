import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { resetPassword } from "../services/api"; // Backend not ready yet
import mainLogo from "/src/assets/images/main-logo.png";
import bgImage from "/src/assets/images/BgeMeeting.webp";

export default function ResetPasswordConfirm() {

/* ======================================================
       STATES
     ====================================================== */
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Retrieved from VerifyOTP.jsx
  const userId = localStorage.getItem("userId"); 

/* ======================================================
       HANDLERS
     ====================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("⚠️ Mohon isi semua kolom password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("⚠️ Password dan konfirmasi tidak cocok.");
      return;
    }

    if (!userId) {
      alert("❌ Tidak dapat menemukan user ID. Silakan ulangi proses reset password.");
      navigate("/ResetPassword");
      return;
    }

    setLoading(true);
    try {
      const payload = { password, confirm_password: confirmPassword };
      const res = await resetPassword(userId, payload);
      const message = res?.message || "✅ Password berhasil direset!";
      alert(message);

      // Clear temporary data
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("userId");

      // Redirect to login page
      navigate("/Login");
    } catch (err) {
      console.error("❌ Reset password error:", err);
      const message =
        err.response?.data?.message ||
        "❌ Gagal mereset password. Coba lagi nanti.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };


/* ======================================================
       UI
     ====================================================== */

  return (
    <div
      className="flex items-center justify-start min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        fontFamily: "'Roboto', sans-serif",
        backgroundImage: `url(${bgImage})`,
      }}
    >
      {/* CARD */}
      <div
        className="bg-white w-[90%] sm:w-[420px] md:w-[480px] lg:w-[540px]
                   ml-[60px] px-[60px] pt-[50px] pb-[40px]
                   rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.2)]
                   flex flex-col items-center"
      >
        {/* LOGO */}
        <div className="flex items-center justify-center mb-[15px]">
          <img
            src={mainLogo}
            alt="Logo"
            className="w-[147px] h-[50px] object-contain"
          />
        </div>

        {/* TITLE */}
        <div className="text-center mb-[20px]">
          <h1 className="text-[36px] font-medium text-[#2B2B2B] leading-[44px]">
            Reset Password
          </h1>
          <p className="text-[14px] text-[#919191]">
            Buat password baru untuk akun kamu.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[20px]">
          {/* Password */}
          <div className="flex flex-col gap-[4px] relative">
            <label className="text-[#2B2B2B] text-[16px]">Password Baru</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password baru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px]
                         text-[14px] text-[#5E5E5E] bg-white
                         focus:bg-white focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         focus:outline-none transition-all duration-200 ease-in-out"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[12px] top-[36px] text-gray-400 hover:text-[#EB5B00]"
            >
              <i
                className={`uil ${
                  showPassword ? "uil-eye-slash" : "uil-eye"
                } text-[20px]`}
              ></i>
            </button>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-[4px] relative">
            <label className="text-[#2B2B2B] text-[16px]">
              Konfirmasi Password Baru
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Konfirmasi password baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px]
                         text-[14px] text-[#5E5E5E] bg-white
                         focus:bg-white focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         focus:outline-none transition-all duration-200 ease-in-out"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-[12px] top-[36px] text-gray-400 hover:text-[#EB5B00]"
            >
              <i
                className={`uil ${
                  showConfirmPassword ? "uil-eye-slash" : "uil-eye"
                } text-[20px]`}
              ></i>
            </button>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-[25px] w-full h-[48px] rounded-[10px]
                       bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium
                       active:scale-95 transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-1 focus:ring-[#EB5B00]
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Simpan Password"}
          </button>
        </form>

        {/* FOOTER */}
        <div className="text-center text-[12px] text-gray-400 mt-[35px]">
          © Ridwan Nurhamsyah — Final Project E-Meeting
        </div>
      </div>
    </div>
  );
}
