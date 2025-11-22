import { useState, useEffect } from "react";
import LayoutSidebar from "../components/LayoutSidebar";
import LayoutHeader from "../components/LayoutHeader";
import RoomsSearchPanel from "../components/RoomsSearchPanel";
import RoomsContainer from "../components/RoomsContainer";
import LayoutFooter from "../components/LayoutFooter";
import RoomFormDrawer from "../components/RoomFormDrawer";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import CustomToast from "../components/CustomToast";
import { getRooms, deleteRoom } from "../services/api";

export default function Rooms() {

/* ======================================================
       STATES
     ====================================================== */
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);   // ← penting
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [filters, setFilters] = useState({});

  // Toast
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const showBannerToast = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
  };

  // Capacity Range Mapping
  const capacityRanges = {
    all: { min: 0, max: Infinity }, 
    "5+": { min: 5, max: 9 },
    "10+": { min: 10, max: 19 },
    "20+": { min: 20, max: 49 },
    "50+": { min: 50, max: 99 },
    "100+": { min: 100, max: Infinity },
  };

  /* ======================================================
       FETCH ROOMS
     ====================================================== */
  const fetchRooms = async (params = {}) => {
  try {
    setLoading(true);
    setError("");

    let allRooms = [];
    let page = 1;
    let totalPages = 1;

    do {
      const queryParams = {
        page,
        limit: 50,
      };

      if (params.name) queryParams.name = params.name;
      if (params.room_type) queryParams.room_type = params.room_type;
      if (params.capacity !== undefined) {
            queryParams.capacity = params.capacity; // empty string = OK
          }



      const res = await getRooms(queryParams);
      const data = res?.data || [];

      allRooms = [...allRooms, ...data];
      totalPages = res?.pagination?.totalPages || 1;

      page++;
    } while (page <= totalPages);

    const formatted = allRooms.map((r) => ({
      id: r.id,
      name: r.room_name || "Unnamed Room",
      capacity: r.capacity ?? 0,
      pricePerHour: r.price ?? 0,
      type: r.room_type || "Unknown",
      image: r.image || "/placeholder-room.jpg",
      raw: r,
    }));

    /* Sort Rooms by Name */
    const collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
      });

      formatted.sort((a, b) => collator.compare(a.name, b.name));

        let finalRooms = formatted;

     /* FE Capacity Range Filter */
    if (params.capacity && capacityRanges[params.capacity]) {
      const range = capacityRanges[params.capacity];

      finalRooms = finalRooms.filter(
        (r) => r.capacity >= range.min && r.capacity <= range.max
      );
    }

      setRooms(finalRooms);

          } catch (err) {
            console.error("❌ Gagal mengambil data rooms:", err);
            showBannerToast("Gagal memuat data ruangan", "error");
          } finally {
            setLoading(false);
          }
        };

    
  /* ======================================================
       FILTER ROOMS (FROM SEARCH PANEL)
     ====================================================== */
  const handleSearch = (f) => {
  const valid = {};

  if (f.name) valid.name = f.name;

  valid.room_type = f.room_type === "all" ? "" : f.room_type;
  valid.capacity = f.capacity === "all" ? "" : f.capacity;

  setFilters(valid);
};



  /* ======================================================
       DELETE ROOM
     ====================================================== */
  const handleDeleteRoom = (id) => {
    setSelectedRoomId(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteRoom = async () => {
    try {
      await deleteRoom(selectedRoomId);

      showBannerToast("Room berhasil dihapus", "success");

      await fetchRooms(filters);
    } catch (err) {
      console.error("❌ deleteRoom error:", err);
      showBannerToast("Gagal menghapus room", "error");
    } finally {
      setDeleteModalOpen(false);
      setSelectedRoomId(null);
    }
  };

  /* ======================================================
       AFTER ADD / UPDATE ROOM
     ====================================================== */
  const handleSaveRoom = async () => {
    setDrawerOpen(false);
    setEditingRoom(null);   // reset edit
    showBannerToast("Perubahan berhasil disimpan", "success");
    fetchRooms(filters);
  };

  /* ======================================================
       LIFECYCLE FETCH
     ====================================================== */
  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length > 0) fetchRooms(filters);
  }, [filters]);

  /* ======================================================
       UI
     ====================================================== */
  return (
    <div
      className="bg-gray-100 min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      <LayoutSidebar />

      {/* Toast */}
      {toastMessage && (
        <CustomToast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}

      <LayoutHeader pageTitle="Rooms" />

      <div className="absolute top-[80px] left-[80px] right-0 bottom-0 
                      flex flex-col bg-transparent shadow-sm">

        {/* SEARCH PANEL */}
        <div className="w-full bg-gray-100 z-20 px-[20px] pt-[20px] pb-0">
          <RoomsSearchPanel
            onAddRoom={() => {
              setEditingRoom(null);
              setDrawerOpen(false);

              setTimeout(() => {
                setDrawerOpen(true);
              }, 30);
            }}
            onSearch={handleSearch}
          />
        </div>

        {/* ROOM LIST */}
        <div
          className="flex-1 bg-gray-100 z-10 overflow-y-auto px-[12px] py-0 pt-0"
          style={{ scrollbarGutter: "stable both-edges" }}
        >
          {loading ? (
            <p className="text-center text-gray-500 py-10">Memuat data ruangan...</p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : (
            <RoomsContainer
              rooms={rooms}
              onDelete={handleDeleteRoom}
              onEdit={(room) => {
                setEditingRoom(room.raw);  
                setDrawerOpen(true);        
              }}
            />
          )}

          <LayoutFooter />
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteRoom}
      />

      {/* ROOM FORM DRAWER */}
        <RoomFormDrawer
          isOpen={isDrawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditingRoom(null);
          }}
          onSave={handleSaveRoom}
          editingRoom={editingRoom}
          showToast={showBannerToast}   
        />


    </div>
  );
}
