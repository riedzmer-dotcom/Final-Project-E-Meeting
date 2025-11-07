import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import SettingsAccountSection from "../components/SettingsAccountSection";
import LayoutFooter from "../components/LayoutFooter";

export default function Settings() {
  return (
    <div
      className="bg-gray-100 min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* LayoutSidebar & LayoutHeader */}
      <LayoutSidebar />
      <LayoutHeader pageTitle="Settings" />

      {/* ===============================
          MAIN CONTENT AREA
      =============================== */}
      <div className="absolute top-[80px] left-[80px] right-0 bottom-0 bg-transparent flex flex-col">
        <main className="flex-1 overflow-y-auto px-[20px] pt-[20px] pb-[6px] flex flex-col gap-[20px]">
          
          {/* 🔹 Account Section */}
          <SettingsAccountSection />

    
          {/* 🔹 LayoutFooter */}
          <LayoutFooter />
        </main>
      </div>
    </div>
  );
}
