import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import mainLogo from "/src/assets/images/main-logo.png";
import bgImage from "/src/assets/images/BgeMeeting.webp";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { username, password });
      console.log("Response dari backend:", res.data);

      // Ambil token
      const token = res.data?.data?.token;
      if (!token) throw new Error("Token tidak ditemukan!");

      // Decode token untuk ambil user_id
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.user_id;

      // Simpan data ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("userId", userId);

      alert("✅ Login berhasil!");
      navigate("/Dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("❌ Login gagal! Periksa username dan password kamu.");
    } finally {
      setLoading(false);
    }
  };

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
        className="bg-white w-[90%] sm:w-[420px] md:w-[500px] lg:w-[560px] ml-[60px] px-[110px] pt-[50px] pb-[20px]
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
            Welcome Back!
          </h1>
          <p className="text-[14px] text-[#919191]">
            Please enter your username and password here!
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col w-full gap-[20px]">
          {/* Username */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#2B2B2B] text-[16px]">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px]
                         text-[14px] text-[#5E5E5E]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]
                         transition-all duration-200"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[4px] relative">
            <label className="text-[#2B2B2B] text-[16px]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px]
                         text-[14px] text-[#5E5E5E]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]
                         transition-all duration-200"
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[12px] top-[36px] text-gray-400 hover:text-[#EB5B00] transition-colors duration-200"
            >
              <i
                className={`uil ${
                  showPassword ? "uil-eye-slash" : "uil-eye"
                } text-[20px]`}
              ></i>
            </button>

            <a
              href="/ResetPassword"
              className="absolute right-[4px] -bottom-[18px] text-[12px] text-[#919191]
                         hover:text-[#EB5B00] focus:text-[#EB5B00]
                         transition-all duration-150"
            >
              Forgot Password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="mt-[25px] w-full h-[48px] rounded-[10px]
                       bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium
                       active:scale-95 transition-all duration-200
                       focus:ring-1 focus:ring-[#EB5B00]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="text-gray-500 text-sm mt-[22px]">
          Don't have an account?{" "}
          <a
            href="/Register"
            className="text-[#EB5B00] font-medium hover:underline
                       transition-all duration-150"
          >
            Register
          </a>
        </p>

        {/* Footer */}
        <div className="text-center text-[12px] text-gray-400 mt-[25px]">
          © Ridwan Nurhamsyah — Final Project E-Meeting
        </div>
      </div>
    </div>
  );
}
