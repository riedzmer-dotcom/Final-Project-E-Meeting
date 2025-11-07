import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import RoomsSearchPanel from "../components/RoomsSearchPanel";
import RoomsContainer from "../components/RoomsContainer";
import LayoutFooter from "../components/LayoutFooter";

export default function Rooms() {
  return (
    <div
      className="bg-gray-100 min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* LayoutSidebar & LayoutHeader */}
      <LayoutSidebar />

      <LayoutHeader pageTitle="Rooms" />

      {/* ===============================
          MAIN CONTENT AREA
      =============================== */}
      <div className="absolute top-[80px] left-[80px] right-0 bottom-0 flex flex-col bg-transparent shadow-sm ">

        {/* WRAPPER SEARCH PANEL — statis */}
        <div className="w-full bg-gray-100 z-20 px-[20px] pt-[20px] pb-0">
          <RoomsSearchPanel />
        </div>

        {/* 🩵 WRAPPER ROOM CONTAINER — scrollable */}
        <div className="flex-1  bg-gray-100 z-10 overflow-y-auto px-[12px] py-0 pt-0"
        style={{ scrollbarGutter: "stable both-edges" }}
        >
          <RoomsContainer />
          {/* LayoutFooter — statis di bawah */}
         <LayoutFooter />
        </div>

      </div>
    </div>
  );
}
