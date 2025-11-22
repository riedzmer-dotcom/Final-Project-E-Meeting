import { useEffect, useState } from "react";

export default function TopLoadingBar({ loading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      setProgress(0);

      const timer = setInterval(() => {
        setProgress((prev) => {

          if (prev < 80) return prev + 5;
          if (prev < 95) return prev + 1;
          return prev;
        });
      }, 120);

      return () => clearInterval(timer);
    } else {
      setProgress(100);

      const timeout = setTimeout(() => {
        setProgress(0);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  return (
    <div
      className="fixed z-30 bg-[#EB5B00]"
      style={{
        left: "80px",
        right: 0,
        top: "80px", 
        height: "3px",
        width: `${progress}%`,
        opacity: progress === 0 ? 0 : 1,
        transition: "width 0.25s ease-out, opacity 0.4s ease",
      }}
    />
  );
}
