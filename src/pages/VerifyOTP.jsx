import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import mainLogo from "/src/assets/images/main-logo.png";
import bgImage from "/src/assets/images/BgeMeeting.webp";

export default function VerifyOTP() {

/* ======================================================
       STATES
     ====================================================== */

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  /* ======================================================
       LOAD EMAIL FROM LOCAL STORAGE
     ====================================================== */
  useEffect(() => {
    const savedEmail = localStorage.getItem("resetEmail");
    if (!savedEmail) {
      alert("⚠️ Email tidak ditemukan. Silakan ulangi reset password.");
      navigate("/ResetPassword");
      return;
    }
    setEmail(savedEmail);
  }, [navigate]);

  /* ======================================================
       COUNTDOWN TIMER FOR RESEND OTP
     ====================================================== */
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  /* ======================================================
       HANDLE OTP INPUT
     ====================================================== */
  const handleChange = (value, index) => {
    const char = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    if (char && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  /* Handle paste event for OTP input */
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();
    if (!pasteData) return;

    const chars = pasteData.split("").slice(0, 6);
    const newOtp = [...otp];
    chars.forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);

    const lastIndex = chars.length - 1;
    if (inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex].focus();
    }
  };

  /* ======================================================
       SUBMIT OTP VERIFICATION
     ====================================================== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("").trim();

    if (otpCode.length < 6) {
      alert("⚠️ Masukkan 6 digit kode OTP lengkap.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", { email, otp: otpCode });
      const message =
        res?.data?.message ||
        "✅ OTP berhasil diverifikasi. Silakan ubah password.";

      alert(message);

      const userId = res?.data?.data?.user_id;
      if (userId) localStorage.setItem("userId", userId);

      navigate("/ResetPasswordConfirm");
    } catch (err) {
      console.error("❌ Verify OTP error:", err);
      const message =
        err.response?.data?.message ||
        "❌ Kode OTP salah atau sudah kedaluwarsa.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================
       RESEND OTP
     ====================================================== */
  const handleResend = async () => {
    if (resending) return;
    setResending(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      const message = res?.data?.message || "✅ OTP baru telah dikirim ke email kamu.";
      alert(message);
      setTimer(60);
    } catch (err) {
      console.error("❌ Resend OTP error:", err);
      alert("❌ Gagal mengirim ulang OTP. Coba lagi nanti.");
    } finally {
      setResending(false);
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
            Verify OTP
          </h1>
          <p className="text-[14px] text-[#919191]">
            Masukkan 6 digit kode OTP yang dikirim ke:
          </p>
          <p className="text-[14px] text-[#EB5B00] font-medium mt-[4px]">
            {email}
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[25px] w-full"
        >
          {/* OTP BOXES */}
          <div
            className="flex justify-center gap-[10px]"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-[48px] h-[56px] text-center text-[20px] font-medium
                           rounded-[10px] border border-gray-300 text-[#2B2B2B]
                           focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                           focus:outline-none transition-all duration-150 ease-in-out"
              />
            ))}
          </div>

          {/* RESEND TIMER */}
          <div className="text-[14px] text-[#919191] mt-[10px]">
            {timer > 0 ? (
              <span>Kirim ulang dalam <b>{timer}s</b></span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="text-[#EB5B00] hover:underline disabled:opacity-50"
              >
                {resending ? "Mengirim..." : "Kirim Ulang OTP"}
              </button>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="mt-[10px] w-full h-[48px] rounded-[10px]
                       bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium
                       active:scale-95 transition-all duration-200 ease-in-out
                       focus:outline-none focus:ring-1 focus:ring-[#EB5B00]
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
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
