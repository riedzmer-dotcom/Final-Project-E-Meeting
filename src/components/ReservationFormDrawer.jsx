import { useState, useEffect } from "react";
import DropdownSelect from "../components/DropdownSelect";
import PickerReservationDate from "../components/PickerReservationDate";
import PickerTime from "../components/PickerTime";
import { getRooms, getSnacks, getReservations } from "../services/api";
import { SnackPriceMap } from "../data/SnackPriceMap";

export default function ReservationFormDrawer({
  isOpen,
  onClose,
  onNext,
  editingData,
  showToast,
  onSaved,
}) {

  // ======================================================
  // FORM DEFAULT
  // ======================================================
  const defaultForm = {
    roomId: "",
    roomName: "",
    roomType: "",
    capacity: "",
    pricePerHour: 0,

    name: "",
    phone: "",
    company: "",

    date: "",
    startTime: "",
    endTime: "",

    participants: "",

    snackEnabled: false,
    snackCategory: "",
    totalSnackPack: "",

    note: "",
  };

  /* ======================================================
   STATE — SUBMISSION FLAG 
   ====================================================== */

  const [formData, setFormData] = useState(defaultForm);

  // ======================================================
  // ROOMS STATE
  // ======================================================
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadRooms = async () => {
      try {
        setLoadingRooms(true);
        const res = await getRooms({ limit: 100 });
        setRooms(res.data || []);
      } finally {
        setLoadingRooms(false);
      }
    };

    loadRooms();
  }, [isOpen]);

  const roomNameOptions = rooms
    .slice()
    .sort((a, b) => a.room_name.localeCompare(b.room_name))
    .map((r) => ({
      label: `${r.room_name} - ${r.room_type} - ${r.capacity} people`,
      value: r.id,
      type: r.room_type,
      capacity: r.capacity,
      pricePerHour: r.price,
      rawName: r.room_name,
    }));

  // ======================================================
  // RESET ADD MODE
  // ======================================================
          useEffect(() => {
        if (isOpen && !editingData) {
          setFormData(defaultForm);
        }
      }, [isOpen, editingData]);

   



  // ======================================================
  // PREFILL EDIT
  // ======================================================
  useEffect(() => {
    if (!editingData || rooms.length === 0) return;

    const room = rooms.find((r) => r.id === editingData.room_id);

    setFormData({
      roomId: editingData.room_id || "",
      roomName: room?.room_name || editingData?.rooms?.room_name || "",
      roomType: room?.room_type || editingData?.rooms?.room_type || "",
      capacity: room?.capacity || "",
      pricePerHour: room?.price || 0,

      name: editingData.pemesan || "",
      phone: editingData.no_hp || "",
      company: editingData.company_name || "",
      date: editingData.date_reservation || "",
      startTime: editingData.start_time?.slice(0, 5) || "",
      endTime: editingData.end_time?.slice(0, 5) || "",
      participants: editingData.total_participant || "",
      snackEnabled: editingData.snack ? true : false,
      snackCategory: editingData.snack || "",
      totalSnackPack: editingData.totalSnackPack || "",
      note: editingData.note || "",
    });
  }, [editingData, rooms]);

  // ======================================================
  // SNACK API
  // ======================================================
  const [snacks, setSnacks] = useState([]);
  const [loadingSnacks, setLoadingSnacks] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    if (!editingData && formData.__init !== true) {
    setFormData({ ...defaultForm, __init: true });
  }

  

    const loadSnacks = async () => {
      try {
        setLoadingSnacks(true);
        const res = await getSnacks();
        setSnacks(res.data || []);
      } finally {
        setLoadingSnacks(false);
      }
    };

    loadSnacks();
  }, [isOpen]);

  const mergedSnacks = [
    ...snacks.map((s) => s.name),
    ...Object.keys(SnackPriceMap),
  ];

  const snackOptions = [...new Set(mergedSnacks)].map((name) => ({
    label: name,
    value: name,
  }));

  // ======================================================
  // HANDLE CHANGE
  // ======================================================
  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  // ======================================================
  // CALCULATE TOTALS
  // ======================================================
  const calculateTotals = () => {
    let duration = 0;

    if (formData.startTime && formData.endTime) {
      const [sh, sm] = formData.startTime.split(":").map(Number);
      const [eh, em] = formData.endTime.split(":").map(Number);

      const diff = eh * 60 + em - (sh * 60 + sm);
      if (diff > 0) duration = diff / 60;
    }

    const roomTotal = formData.pricePerHour * duration;
    const pricePerPack = SnackPriceMap[formData.snackCategory] || 0;

    const snackTotal =
      formData.snackEnabled && formData.totalSnackPack
        ? Number(formData.totalSnackPack) * pricePerPack
        : 0;

    return { roomTotal, snackTotal };
  };

  // ======================================================
// 🔥 VALIDASI OVERLAPPING (FIXED)
// ======================================================
const checkOverlapping = async () => {
  try {
    // ambil hanya reservation untuk tanggal ini (AMAN, tidak menimpa state lain)
    const res = await getReservationsByDate(formData.date);

    // filter hanya ruangan yg sama
    const existing = (res.data || []).filter(
      (r) => r.room_id === formData.roomId
    );

    const toMinutes = (t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    const newStart = toMinutes(formData.startTime);
    const newEnd = toMinutes(formData.endTime);

    for (let r of existing) {
      if (editingData && r.id === editingData.id) continue;

      const s = toMinutes(r.start_time);
      const e = toMinutes(r.end_time);

      // overlap rule
      if (newStart < e && newEnd > s) return r;
    }

    return null;
  } catch (e) {
    console.error("Overlap check error", e);
    return null;
  }
};


  // ======================================================
  // VALIDASI 
  // ======================================================
  const handleNextClick = async () => {

    // 1. REQUIRED FIELD
    if (!formData.roomId) return showToast("Room wajib dipilih", "warning");
    if (!formData.name) return showToast("Nama wajib diisi", "warning");
    if (!formData.phone) return showToast("No.Hp wajib diisi", "warning");
    if (!formData.date) return showToast("Tanggal wajib diisi", "warning");
    if (!formData.startTime || !formData.endTime)
      return showToast("Waktu belum lengkap", "warning");

    // 2. INVALID TIME
    const [sh, sm] = formData.startTime.split(":").map(Number);
    const [eh, em] = formData.endTime.split(":").map(Number);
    if (eh * 60 + em <= sh * 60 + sm)
      return showToast("⛔ End time harus lebih besar dari start time", "warning");

    // 3. CAPACITY CHECK
    if (formData.participants && formData.capacity && Number(formData.participants) > Number(formData.capacity)) {
      return showToast(`⛔ Peserta melebihi kapasitas ruangan (${formData.capacity})`, "warning");
    }

    // 4. OVERLAP CHECK
    const conflict = await checkOverlapping();
    if (conflict) {
      return showToast(
        `⛔ Jadwal bentrok dengan reservasi lain: ${conflict.start_time.slice(0,5)} - ${conflict.end_time.slice(0,5)}`,
        "warning"
      );
    }

    // 5. LANJUT KE STEP 2
    const totals = calculateTotals();
    const selectedRoom = roomNameOptions.find((o) => o.value === formData.roomId);

    const cleanData = {
      ...formData,
      snackCategory: formData.snackEnabled ? formData.snackCategory : "",
      totalSnackPack: formData.snackEnabled ? formData.totalSnackPack : "",
      ...totals,
      selectedRoom,
    };

    onNext(cleanData);
  };

  // ======================================================
  // ESC CLOSE
  // ======================================================
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;


  // ======================================================
  // UI
  // ======================================================

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* Drawer Panel */}
      <div className="fixed top-0 right-0 w-[456px] h-full bg-white shadow-xl z-50 flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center px-[24px] py-[16px]
                shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)] bg-white">
          <h2 className="text-[24px] font-medium text-[#2B2B2B]">
            Reservation Form | {editingData ? "Edit" : "New"}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#EB5B00] text-[24px] font-light leading-none"
          >
            x
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-[24px] py-[20px] space-y-[18px] bg-white">
          
          {/* Room Name */}
          <div className="flex flex-col flex-1 min-w-[140px]">
            <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">
              Room Name
            </label>
            <div className="h-[48px]">
              <DropdownSelect
                  placeholder="Select Room"
                  options={roomNameOptions}
                  isLoading={loadingRooms}
                  value={roomNameOptions.find((o) => o.value === formData.roomId) || null}
                  onChange={(item) => {
                    setFormData((prev) => ({
                      ...prev,
                      roomId: item.value,
                      roomName: item.rawName,
                      roomType: item.type,
                      capacity: item.capacity,
                      pricePerHour: item.pricePerHour,
                    }));
                  }}
                />

            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Name"
              className="w-full mt-[2px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">No.Hp</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="No.Hp"
              className="w-full mt-[2px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">
              Company / Organization
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Company / Organization"
              className="w-full mt-[2px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00] focus:border-[#EB5B00]"
            />
          </div>

          {/* Date Reservation */}
          <div className="relative max-w-full">
            <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">Date Reservation</label>
            <div className="w-full mt-[2px]">
              <PickerReservationDate
                value={formData.date}
                onChange={(val) => handleChange("date", val)}
              />
            </div>
          </div>

          {/* Time Reservation */}
          <div className="flex gap-[16px] w-full">
            <div className="flex flex-col flex-1 min-w-[120px]">
              <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">
                Start Time
              </label>
              <div className="h-[48px]">
                <PickerTime
                  placeholder="Start time"
                  value={formData.startTime}
                  onChange={(val) => handleChange("startTime", val)}
                />
              </div>
            </div>

            <div className="flex flex-col flex-1 min-w-[120px]">
              <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">
                End Time
              </label>
              <div className="h-[48px]">
                <PickerTime
                  placeholder="End time"
                  value={formData.endTime}
                  onChange={(val) => handleChange("endTime", val)}
                />
              </div>
            </div>
          </div>

          {/* Total Participants */}
          <div>
            <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">Total Participants</label>
            <input
              type="number"
              value={formData.participants}
              onChange={(e) => handleChange("participants", e.target.value)}
              placeholder="Total Participants"
              className="w-full mt-[2px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            />
          </div>

         {/* Snack Section */}
          <div className="flex flex-col gap-[8px] mt-[4px]">
            {/* Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.snackEnabled}
                onChange={(e) => handleChange("snackEnabled", e.target.checked)}
                className="h-[18px] w-[18px] text-[#EB5B00] rounded border-gray-300 focus:ring-[#EB5B00]"
              />
              <label className="text-[14px]">Add Snack</label>
            </div>

            {/* Snack Category */}
            <div className="flex flex-col flex-1 min-w-[140px]">
              <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">
                Snack Category
              </label>
              <div className="h-[48px] relative">
                <DropdownSelect
                  placeholder="Select snack package"
                  options={snackOptions}
                  isLoading={loadingSnacks}
                  value={
                    snackOptions.find((o) => o.value === formData.snackCategory) ||
                    null
                  }
                  onChange={(item) => handleChange("snackCategory", item.value)}
                  disabled={!formData.snackEnabled}
                />

                {!formData.snackEnabled && (
                  <div className="absolute inset-0 bg-gray-100/60 rounded-[10px] cursor-not-allowed"></div>
                )}
              </div>
            </div>

            {/* Total Pack */}
            {formData.snackEnabled && (
              <div>
                <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">
                  Total Pack
                </label>
                <input
                  type="number"
                  value={formData.totalSnackPack}
                  onChange={(e) => handleChange("totalSnackPack", e.target.value)}
                  placeholder="Jumlah pack"
                  className="w-full mt-[2px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
                />
              </div>
            )}


          </div>

          {/* Note */}
          <div>
            <label className="text-[14px] text-[#555] font-medium px-[5px] mb-[2px]">Note</label>
            <textarea
              rows="3"
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              placeholder="Enter note here..."
              className="w-full mt-[2px] border border-gray-300 rounded-[10px]
                         px-[12px] py-[8px] text-[15px] text-[#2B2B2B] resize-none
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-[20px] bg-white shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.08)]">
          <button
              onClick={() => {
                const totals = calculateTotals();
                const selectedRoom = roomNameOptions.find((o) => o.value === formData.roomId);

                const cleanData = {
                  ...formData,
                  snackCategory: formData.snackEnabled ? formData.snackCategory : "",
                  totalSnackPack: formData.snackEnabled ? formData.totalSnackPack : "",
                  ...totals,
                  selectedRoom,
                };

                onNext({
                  ...cleanData,
                  isEdit: !!editingData,
                  editId: editingData?.id || null,
                });
              }}


            className="w-full bg-[#EB5B00] hover:bg-[#d84f00] text-white 
                       font-medium rounded-[10px] h-[48px] transition-all duration-200
                       focus:outline-none focus-visible:outline-none
                       focus:ring-1 focus:ring-[#EB5B00]"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
