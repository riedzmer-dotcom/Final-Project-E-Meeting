import { useEffect, useState } from "react";


export default function CustomToast({ message, type = "success", onClose }) {

/* ======================================================
       STATES
     ====================================================== */
  const [isClosing, setIsClosing] = useState(false);

/* ======================================================
       AUTO CLOSE TIMER
     ====================================================== */
  useEffect(() => {
    const t = setTimeout(() => handleClose(),350);
    return () => clearTimeout(t);
  }, []);

  /* ======================================================
       CLOSE HANDLER
     ====================================================== */
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 350); 
  };

 /* ======================================================
       STYLE CONFIGURATION
     ====================================================== */
  const config = {
    success: {
      border: "border-green-500",
      iconBorder: "border-green-600",
      iconColor: "text-green-600",
      icon: "✔",
    },
    error: {
      border: "border-red-500",
      iconBorder: "border-red-600",
      iconColor: "text-red-600",
      icon: "✖",
    },
    warning: {
      border: "border-yellow-500",
      iconBorder: "border-yellow-600",
      iconColor: "text-yellow-600",
      icon: "⚠",
    },
  };

  const s = config[type] || config.success;

  /* ======================================================
       UI
     ====================================================== */
  return (
    <div
      className={`
        fixed
        top-0
        right-0
        z-[9999]
        w-[456px]
        h-[82px]
        bg-white
        rounded-bl-[8px]
        shadow-[0_4px_25px_rgba(0,0,0,0.15)]
        flex items-center
        px-[20px]
        border-l-[6px] ${s.border}
        transition-all duration-300
         ${isClosing ? "animate-fade-slide-right-out" : "animate-fade-slide-right-in"}
      
      `}
    >
      {/* ICON */}
      <div
        className={`flex items-center justify-center w-[32px] h-[32px] rounded-full border ${s.iconBorder} mr-[16px]`}
      >
        <span className={`${s.iconColor} text-[18px]`}>
          {s.icon}
        </span>
      </div>

      {/* MESSAGE */}
      <p className="text-[16px] text-gray-800 font-medium flex-1">
        {message}
      </p>

      {/* CLOSE BUTTON */}
      <button
        className="text-gray-500 hover:text-gray-700 text-[18px]"
        onClick={onClose}
      >
        x
      </button>
    </div>
  );
}
