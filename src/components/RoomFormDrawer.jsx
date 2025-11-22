import { useState, useEffect } from "react";
import DropdownSelect from "../components/DropdownSelect";
import { createRoom, updateRoom } from "../services/api";


/* ======================================================
   ROOM FORM DRAWER
   Create / Edit Room (Right Drawer Panel)
   ====================================================== */
export default function RoomFormDrawer({
  isOpen,
  onClose,
  onSave,
  editingRoom,
  showToast, 
}) {


/* ======================================================
     LOCAL STATE
     formData → semua input form
     ====================================================== */
  const [formData, setFormData] = useState({
    roomImage: null,
    roomImageFile: null,
    roomName: "",
    roomType: "",
    price: "",
    capacity: "",
  });

/* ======================================================
     STATIC ROOM TYPE OPTIONS (Small, Medium, Large)
     ====================================================== */
  const [roomTypeOptions, setRoomTypeOptions] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    setRoomTypeOptions([
      { label: "Small", value: "small" },
      { label: "Medium", value: "medium" },
      { label: "Large", value: "large" },
    ]);

    setLoadingTypes(false);
  }, []);


  /* ======================================================
     LOAD DATA (ADD / EDIT MODE)
     ====================================================== */
  useEffect(() => {
    if (!isOpen) return; 

    if (editingRoom) {
      // MODE EDIT
      setFormData({
        roomImage: editingRoom.image || null,
        roomImageFile: null,
        roomName: editingRoom.room_name || "",
        roomType: editingRoom.room_type || "",
        price: editingRoom.price || "",
        capacity: editingRoom.capacity || "",
      });
    } else {
      // MODE ADD → Reset All
      setFormData({
        roomImage: null,
        roomImageFile: null,
        roomName: "",
        roomType: "",
        price: "",
        capacity: "",
      });
    }
  }, [isOpen, editingRoom]);


  /* ======================================================
     HANDLE INPUT
     ====================================================== */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /* ======================================================
     HANDLE IMAGE UPLOAD
     Preview gambar + simpan file asli
     ====================================================== */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        roomImage: URL.createObjectURL(file),
        roomImageFile: file,
      }));
    }
  };

  /* ======================================================
     SAVE ROOM (ADD / EDIT)
     ====================================================== */
  const handleSave = async () => {
    try {
      // --- Validation ---
      if (
        !formData.roomName ||
        !formData.roomType ||
        formData.price === "" ||
        formData.capacity === ""
      ) {
        showToast("Semua field wajib diisi!", "warning");
        return;
      }

      // --- Prepare FormData ---
      const payload = new FormData();
      payload.append("image", formData.roomImageFile);
      payload.append("room_name", formData.roomName);
      payload.append("room_type", formData.roomType);
      payload.append("price", Number(formData.price));
      payload.append("capacity", Number(formData.capacity));

      let res;

        // --- EDIT MODE ---
        if (editingRoom) {
          res = await updateRoom(editingRoom.id, payload);
          showToast("Room berhasil diperbarui", "success");
        } else {

        // --- ADD MODE ---
        if (!formData.roomImageFile) {
          showToast("Gambar wajib diupload!", "warning");
          return;
        }
        res = await createRoom(payload);
        showToast("Room berhasil ditambahkan", "success");
      }

      onSave?.(res.data);
      onClose();
    } catch (err) {
      console.error("❌ saveRoom error:", err);

      const backendMsg =
        err?.response?.data?.message || err?.response?.data || null;

      if (backendMsg) {
        showToast(String(backendMsg), "error");
      } else {
        showToast("Gagal menyimpan data room", "error");
      }
    }
  };

  /* ======================================================
     ESC TO CLOSE DRAWER
     ====================================================== */
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;


  /* ======================================================
     DRAWER UI
     ====================================================== */
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 w-[456px] h-full bg-white shadow-xl z-50 flex flex-col"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >

        

        {/* ======================================================
           HEADER
           ====================================================== */}
        <div className="flex justify-between items-center px-[24px] py-[16px]
                        shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)] bg-white">
          <h2 className="text-[24px] font-medium text-[#2B2B2B]">
            Room Form | {editingRoom ? "Edit" : "Add New"}
          </h2>


          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-[28px] leading-none"
          >
            x
          </button>
        </div>

        {/* ======================================================
           BODY
           ====================================================== */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px] space-y-[18px] bg-white">

          {/* Upload Image */}
          <div
              className={`
                flex flex-col items-center justify-center 
                rounded-[10px] p-0 h-[180px] border-[#EB5B00] relative
                ${formData.roomImage 
                  ? "shadow-sm border border-gray-200" 
                  : "border-2 border-dashed border-[#EB5B00]"}
              `}
            >
            
            {formData.roomImage ? (
              <>
                {/* Preview Image */}
                <img
                  src={formData.roomImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-[8px]"
                />

                {/* Edit Image Button */}
                <label
                  htmlFor="fileUpload"
                  className="absolute top-[10px] right-[10px] 
                              w-[25px] h-[25px] rounded-full bg-white shadow-sm 
                            flex items-center justify-center text-[#EB5B00] cursor-pointer
                            hover:bg-[#EB5B00] hover:text-white active:scale-95 transition-all"
                >
                  <i className="uil uil-pen text-[18px]" />
                </label>

                {/* DELETE Button */}
                <button
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      roomImage: null,
                      roomImageFile: null,
                    }))
                  }
                  className="absolute top-[10px] right-[40px] 
                            w-[25px] h-[25px] rounded-full bg-white shadow-sm 
                            flex items-center justify-center
                            text-[#EB5B00]
                            hover:bg-[#EB5B00] hover:text-white 
                            active:scale-95 transition-all"
                >
                  <i className="uil uil-trash text-[18px]" />
                </button>

                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            ) : (
              <>
                <i className="uil uil-upload text-[36px] text-[#EB5B00]" />
                <p className="text-sm text-gray-600 mt-1">
                  Drag & drop file here or
                </p>

                <label
                  htmlFor="fileUpload"
                  className="mt-2 px-[16px] py-[6px] bg-[#EB5B00] 
                  text-white text-sm font-medium rounded-[6px] 
                  cursor-pointer hover:bg-[#d84f00] transition"
                >
                  Choose File
                </label>

                <input
                  id="fileUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </>
            )}

          </div>

          {/* Input */}
          <div>
            <label className="text-[14px] text-[#555] font-medium">Room Name</label>
            <input
              type="text"
              value={formData.roomName}
              onChange={(e) => handleChange("roomName", e.target.value)}
              placeholder="Room Name"
              className="w-full mt-[6px] h-[48px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] focus:outline-none focus-visible:outline-none
                    focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]"
            />
          </div>

          <div>
            <label className="text-[14px] text-[#555] font-medium">Room Type</label>
            <div className="h-[48px]">
              <DropdownSelect
                placeholder="Select Type"
                options={roomTypeOptions}
                value={formData.roomType}
                onChange={(item) => handleChange("roomType", item.value)}
                isLoading={loadingTypes}
              />
            </div>
          </div>

          <div>
            <label className="text-[14px] text-[#555] font-medium">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="Price"
              className="w-full mt-[6px] h-[48px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] focus:outline-none focus-visible:outline-none
                    focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]"
            />
          </div>

          <div>
            <label className="text-[14px] text-[#555] font-medium">Capacity</label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => handleChange("capacity", e.target.value)}
              placeholder="Capacity"
              className="w-full mt-[6px] h-[48px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] focus:outline-none focus-visible:outline-none
                    focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]"
            />
          </div>

          
        </div>

        {/* ======================================================
           FOOTER
           ====================================================== */}
        <div className="flex justify-between items-center px-[24px] py-[16px]
         bg-white shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.08)]">
          <button
            onClick={handleSave}
            className="w-full h-[48px] px-[12px] font-medium text-white 
                      bg-[#EB5B00] hover:bg-[#d84f00] rounded-[10px]
                         focus:outline-none focus-visible:outline-none
                         focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]
                         transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
