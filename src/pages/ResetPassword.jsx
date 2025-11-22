import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { forgotPassword } from "../services/api"; // Backend not ready yet
import mainLogo from "/src/assets/images/main-logo.png";
import bgImage from "/src/assets/images/BgeMeeting.webp";

export default function ResetPassword() {

/* ======================================================
       STATES
     ====================================================== */

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


 /* ======================================================
       HANDLERS
     ====================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("⚠️ Mohon isi email terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      // Send request to backend for OTP generation
      const res = await forgotPassword({ email });
      console.log("Forgot Password Response:", res);

      const message =
        res?.message || "✅ Kode OTP telah dikirim ke email kamu.";
      alert(message);

      // Save user email for OTP verification page
      localStorage.setItem("resetEmail", email);

      // Redirect to OTP verification page
      navigate("/VerifyOTP");
    } catch (err) {
      console.error("❌ Forgot password error:", err);
      const message =
        err.response?.data?.message ||
        "❌ Gagal mengirim kode OTP. Coba lagi nanti.";
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
            Forgot Password
          </h1>
          <p className="text-[14px] text-[#919191]">
            Masukkan alamat email kamu untuk menerima kode OTP reset password.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[20px]">
          {/* Email */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#2B2B2B] text-[16px]">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px]
                         text-[14px] text-[#5E5E5E] bg-white
                         focus:bg-white focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         focus:outline-none focus-visible:outline-none
                         transition-all duration-200 ease-in-out"
            />
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
            {loading ? "Loading..." : "Send OTP"}
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
