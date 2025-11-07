import { useState, useEffect } from "react";
import DropdownSelect from "../components/DropdownSelect";
import PickerReservationDate from "../components/PickerReservationDate";
import { roomTypes } from "../data/RoomsDataDummies";
import { snackCategoryOptions } from "../data/ScheduleDataDummies";
import PickerTime from "../components/PickerTime";

export default function ReservationFormDrawer({ isOpen, onClose, onNext }) {
  // 🎯 State utama untuk semua input form
  const [formData, setFormData] = useState({
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
    snackType: "",
    note: "",
  });

  // 🧮 Hitung total harga otomatis
  const calculateTotals = () => {
    const durationHours = (() => {
      if (!formData.startTime || !formData.endTime) return 0;
      const [sh, sm] = formData.startTime.split(":").map(Number);
      const [eh, em] = formData.endTime.split(":").map(Number);
      const diff = eh * 60 + em - (sh * 60 + sm);
      return diff > 0 ? diff / 60 : 0;
    })();

    const roomTotal = formData.pricePerHour * durationHours;
    let snackPrice = 0;

    if (formData.snackCategory.includes("50.000")) snackPrice = 50000;
    else if (formData.snackCategory.includes("20.000")) snackPrice = 20000;

    const snackTotal =
      formData.snackEnabled && formData.participants
        ? snackPrice * Number(formData.participants)
        : 0;

    return { roomTotal, snackTotal };
  };

  // 🧠 Update state dinamis
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // 🏢 Generate opsi room
  const roomNameOptions = (roomTypes || []).map((room) => room.name);

  // ⌨️ ESC untuk close
  useEffect(() => {
    const escHandler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [onClose]);

  // ❗ Stop render jika drawer tertutup
  if (!isOpen) return null;

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
          <h2 className="text-[24px] font-medium text-[#2B2B2B]">Reservation Form</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-[28px] font-light leading-none"
          >
            ×
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
                value={formData.roomName}
                onChange={(val) => {
                  const selectedRoom = roomTypes.find((r) => r.name === val);
                  setFormData((prev) => ({
                    ...prev,
                    roomName: val,
                    roomType: selectedRoom?.type || "",
                    capacity: selectedRoom?.capacity || "",
                    pricePerHour: selectedRoom?.pricePerHour || 0,
                  }));
                }}
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-[14px] text-[#555] font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Name"
              className="w-full mt-[6px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-[14px] text-[#555] font-medium">No.Hp</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="No.Hp"
              className="w-full mt-[6px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-[14px] text-[#555] font-medium">
              Company / Organization
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Company / Organization"
              className="w-full mt-[6px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            />
          </div>

          {/* Date Reservation */}
          <div className="relative max-w-full">
            <label className="text-[14px] text-[#555] font-medium">Date Reservation</label>
            <div className="w-full mt-[6px]">
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
            <label className="text-[14px] text-[#555] font-medium">Total Participants</label>
            <input
              type="number"
              value={formData.participants}
              onChange={(e) => handleChange("participants", e.target.value)}
              placeholder="Total Participants"
              className="w-full mt-[6px] h-[44px] border border-gray-300 rounded-[10px]
                         px-[12px] text-[15px] text-[#2B2B2B]
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            />
          </div>

          {/* Add Snack + Snack Category */}
          <div className="flex flex-col gap-[8px] mt-[4px]">
            {/* Checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="snack"
                type="checkbox"
                checked={formData.snackEnabled}
                onChange={(e) => handleChange("snackEnabled", e.target.checked)}
                className="h-[18px] w-[18px] text-[#EB5B00] rounded border-gray-300 focus:ring-[#EB5B00]"
              />
              <label htmlFor="snack" className="text-[14px] text-[#2B2B2B]">
                Add Snack
              </label>
            </div>

            {/* Snack Category */}
            <div className="flex flex-col flex-1 min-w-[140px]">
              <label className="text-[#5E5E5E] text-[16px] font-normal px-[5px] mb-[2px]">
                Snack Category
              </label>
              <div className="h-[48px] relative">
                <DropdownSelect
                  placeholder="Select snack package"
                  options={snackCategoryOptions}
                  value={formData.snackCategory}
                  onChange={(val) => handleChange("snackCategory", val)}
                  disabled={!formData.snackEnabled}
                />
                {!formData.snackEnabled && (
                  <div className="absolute inset-0 bg-gray-100/60 rounded-[10px] cursor-not-allowed"></div>
                )}
              </div>
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="text-[14px] text-[#555] font-medium">Note</label>
            <textarea
              rows="3"
              value={formData.note}
              onChange={(e) => handleChange("note", e.target.value)}
              placeholder="Enter note here..."
              className="w-full mt-[6px] border border-gray-300 rounded-[10px]
                         px-[12px] py-[8px] text-[15px] text-[#2B2B2B] resize-none
                         focus:outline-none focus:ring-1 focus:ring-[#EB5B00]/70 focus:border-[#EB5B00]"
            ></textarea>
          </div>
        </div>

        {/* Footer */}
        <div className="p-[20px] bg-white shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => {
              const { roomTotal, snackTotal } = calculateTotals();
              console.log("DEBUG FORM DATA:", { ...formData, roomTotal, snackTotal });
              onNext({ ...formData, roomTotal, snackTotal });
            }}
            className="w-full bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium rounded-[10px] h-[48px] transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
