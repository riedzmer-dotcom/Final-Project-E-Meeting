import { useEffect, useState } from "react";
import {
  createReservation,
  updateReservation,
  getReservations,
} from "../services/api";
import { SnackPriceMap } from "../data/SnackPriceMap";

export default function ReservationDetailModal({
  isOpen,
  onClose,
  onBack,
  formData,
  showToast,
  onSubmitted,
}) {

/* ======================================================
   STATE
   ====================================================== */
  const [isSubmitting, setIsSubmitting] = useState(false);


/* ======================================================
     ESC KEY → CLOSE MODAL
     ====================================================== */
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen || !formData) return null;


/* ======================================================
     FORMAT DATE: DD/MM/YYYY → YYYY-MM-DD (ISO)
     ====================================================== */
  const toISODate = (dateStr) => {
    if (!dateStr) return "";

    // Jika sudah ISO langsung return
    if (dateStr.includes("-")) return dateStr;

    const [d, m, y] = dateStr.split("/");
    return `${y}-${m}-${d}`;
  };

  /* ======================================================
     FORMAT DATE FOR DISPLAY (fallback safe)
     ====================================================== */
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    try {
      let iso = dateStr;

      // convert jika bukan ISO
      if (!dateStr.includes("-")) {
        const [d, m, y] = dateStr.split("/");
        iso = `${y}-${m}-${d}`;
      }

      return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };


/* ======================================================
     CHECK TIME OVERLAPPING FOR SAME ROOM & DATE
     ====================================================== */
  const checkOverlapping = async () => {
    try {
      const res = await getReservations();
      const all = res.data || [];

      const selectedDate = toISODate(formData.date);

      const filtered = all.filter(
        (r) =>
          r.room_id === formData.roomId &&
          r.date_reservation === selectedDate
      );

      const toMinutes = (t) => {
        const [h, m] = t.split(":").map(Number);
        return h * 60 + m;
      };

      const newStart = toMinutes(formData.startTime);
      const newEnd = toMinutes(formData.endTime);

      for (let r of filtered) {
        if (formData.isEdit && r.id === formData.editId) continue;

        const s = toMinutes(r.start_time);
        const e = toMinutes(r.end_time);

        if (newStart < e && newEnd > s) return r;
      }

      return null;
    } catch (err) {
      console.error("Overlap error:", err);
      return null;
    }
  };


/* ======================================================
     CALCULATE DURATION (HH:MM RANGE)
     ====================================================== */
  const getDuration = (start, end) => {
    if (!start || !end) return "-";
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const diff = eh * 60 + em - (sh * 60 + sm);
    if (diff <= 0) return "-";

    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  };


/* ======================================================
     TOTALS (ROOM + SNACK)
     ====================================================== */
  const roomTotal = Number(formData.roomTotal || 0);
  const snackTotal = Number(formData.snackTotal || 0);
  const totalAmount = roomTotal + snackTotal;


/* ======================================================
     SUBMIT HANDLER (ADD / EDIT)
     ====================================================== */
  const handleSubmit = async () => {
    if (isSubmitting) return;

    const payload = {
      room_id: formData.roomId,
      pemesan: formData.name,
      no_hp: formData.phone,
      company_name: formData.company,
      date_reservation: toISODate(formData.date),
      start_time: formData.startTime,
      end_time: formData.endTime,
      total_participant: Number(formData.participants),
      snack: formData.snackEnabled ? formData.snackCategory : "",
      note: formData.note,
      status: "pending",
    };

    // Overlap validation
    const conflict = await checkOverlapping();
    if (conflict) {
      return showToast(
        `⛔ Bentrok: ${conflict.start_time.slice(0, 5)} - ${conflict.end_time.slice(0, 5)}`,
        "warning"
      );
    }

    try {
      setIsSubmitting(true);

      if (formData.isEdit) {
        await updateReservation(formData.editId, payload);
        showToast("Reservation updated!", "success");
      } else {
        await createReservation(payload);
        showToast("Reservation created!", "success");
      }

      onSubmitted?.();
      onClose?.();
    } catch (err) {
      console.error("Submit ERR:", err);
      showToast("Gagal menyimpan data", "error");
    } finally {
      setIsSubmitting(false);
    }
  };


/* ======================================================
     UI
     ====================================================== */
  return (
    <>
    {/* SUBSECTION — OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* SUBSECTION — RIGHT DRAWER */}
      <div className="fixed top-0 right-0 w-[456px] h-full bg-white shadow-xl z-50 flex flex-col">


        {/* ======================================================
            HEADER
           ====================================================== */}
        <div className="flex justify-between items-center px-4 py-4 shadow bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="flex items-center justify-center w-[28px] h-[28px] rounded-full hover:bg-[#FFF3E9] text-[#EB5B00]"
            >
              <i className="uis uis-angle-left text-[20px]" />
            </button>

            <h2 className="text-[22px] font-medium">
              {formData.isEdit ? "Review Changes" : "Detail Reservation"}
            </h2>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#EB5B00] text-[24px]"
          >
            x
          </button>
        </div>


        {/* ======================================================
            BODY
           ====================================================== */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-200">

          {/* ROOM */}
          <section className="px-6 py-4">
            <h3 className="font-medium mb-3">Room Detail</h3>

            <div className="grid grid-cols-2 text-[14px] gap-y-1.5">
              <div className="text-gray-500">Room Name</div>
              <div className="text-right">{formData.roomName}</div>

              <div className="text-gray-500">Room Type</div>
              <div className="text-right">{formData.roomType}</div>

              <div className="text-gray-500">Capacity</div>
              <div className="text-right">{formData.capacity} people</div>

              <div className="text-gray-500">Price / hour</div>
              <div className="text-right">Rp {formData.pricePerHour.toLocaleString("id-ID")}</div>
            </div>
          </section>


          {/* SUBSECTION — BOOK DETAIL */}
          <section className="px-6 py-4">
            <h3 className="font-medium mb-3">Book Detail</h3>

            <div className="grid grid-cols-2 text-[14px] gap-y-1.5">
              <div className="text-gray-500">Name</div>
              <div className="text-right">{formData.name}</div>

              <div className="text-gray-500">Phone</div>
              <div className="text-right">{formData.phone}</div>

              <div className="text-gray-500">Company</div>
              <div className="text-right">{formData.company}</div>

              <div className="text-gray-500">Date</div>
              <div className="text-right">{formatDate(formData.date)}</div>

              <div className="text-gray-500">Duration</div>
              <div className="text-right">
                {getDuration(formData.startTime, formData.endTime)}
              </div>

              <div className="text-gray-500">Participants</div>
              <div className="text-right">{formData.participants} people</div>
            </div>
          </section>


          {/* SUBSECTION — SNACK DETAIL */}
          {formData.snackEnabled && (
            <section className="px-6 py-4">
              <h3 className="font-medium mb-3">Snack Detail</h3>

              <div className="grid grid-cols-2 text-[14px] gap-y-1.5">
                <div className="text-gray-500">Snack</div>
                <div className="text-right">{formData.snackCategory}</div>

                <div className="text-gray-500">Total Pack</div>
                <div className="text-right">{formData.totalSnackPack} pack</div>

                <div className="text-gray-500">Price / pack</div>
                <div className="text-right">
                  Rp {SnackPriceMap[formData.snackCategory].toLocaleString("id-ID")}
                </div>

                <div className="text-gray-500">Subtotal</div>
                <div className="text-right">
                  Rp {formData.snackTotal.toLocaleString("id-ID")}
                </div>
              </div>
            </section>
          )}


          {/* SUBSECTION — TOTAL */}
          <section className="px-6 py-4">
            <h3 className="font-medium mb-3">Total</h3>

            <div className="flex justify-between mb-2">
              <span>{formData.roomName}</span>
              <span>Rp {roomTotal.toLocaleString("id-ID")}</span>
            </div>

            {formData.snackEnabled && (
              <div className="flex justify-between mb-2">
                <span>{formData.snackCategory}</span>
                <span>Rp {snackTotal.toLocaleString("id-ID")}</span>
              </div>
            )}

            <div className="border-t mt-2 pt-2 flex justify-between text-[17px] font-semibold">
              <span>Total</span>
              <span>Rp {totalAmount.toLocaleString("id-ID")}</span>
            </div>
          </section>


          {/* SUBSECTION — NOTE */}
          {formData.note && (
            <section className="px-6 py-4">
              <h3 className="font-medium mb-2">Note</h3>
              <p className="text-gray-700 text-[14px]">{formData.note}</p>
            </section>
          )}
        </div>

        {/* ======================================================
            FOOTER
           ====================================================== */}
        <div className="p-5">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#EB5B00] hover:bg-[#d84f00] text-white h-[48px] rounded-[10px]"
          >
            {isSubmitting ? "Submitting..." : formData.isEdit ? "Save Changes" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
}
