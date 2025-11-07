import { useState } from "react";
import mainLogo from "/src/assets/images/main-logo.png";
import bgImage from "/src/assets/images/BgeMeeting.webp";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            Create Account
          </h1>
          <p className="text-[14px] text-[#919191]">
            Please fill in the information below!
          </p>
        </div>

        {/* FORM */}
        <form className="flex flex-col w-full gap-[20px]">

          {/* Username */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#2B2B2B] text-[16px]">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px]
                         text-[14px] text-[#5E5E5E]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         transition-all duration-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-[4px]">
            <label className="text-[#2B2B2B] text-[16px]">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px]
                         text-[14px] text-[#5E5E5E]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         transition-all duration-200"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-[4px] relative">
            <label className="text-[#2B2B2B] text-[16px]">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] pr-[42px]
                         text-[14px] text-[#5E5E5E]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         transition-all duration-200"
            />

            {/* Toggle Password */}
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
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-[4px] relative">
            <label className="text-[#2B2B2B] text-[16px]">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full h-[48px] rounded-[10px] border border-gray-300 px-[14px] pr-[42px]
                         text-[14px] text-[#5E5E5E]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         transition-all duration-200"
            />

            {/* Toggle Confirm Password */}
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-[12px] top-[36px] text-gray-400 hover:text-[#EB5B00] transition-colors duration-200"
            >
              <i
                className={`uil ${
                  showConfirm ? "uil-eye-slash" : "uil-eye"
                } text-[20px]`}
              ></i>
            </button>
          </div>

          {/* CREATE ACCOUNT BUTTON */}
          <button
            type="submit"
            className="mt-[25px] w-full h-[48px] rounded-[10px]
                       bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium
                       active:scale-95 transition-all duration-200
                       focus:outline-none focus:ring-1 focus:ring-[#EB5B00]"
          >
            Create Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-gray-500 text-sm mt-[22px]">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#EB5B00] font-medium hover:underline focus:underline
                       focus:outline-none focus-visible:outline-none
                       focus:text-[#EB5B00] transition-all duration-150"
          >
            Login
          </a>
        </p>

        {/* FOOTER */}
        <div className="text-center text-[12px] text-gray-400 mt-[25px]">
          © Ridwan Nurhamsyah — Final Project E-Meeting
        </div>
      </div>
    </div>
  );
}
