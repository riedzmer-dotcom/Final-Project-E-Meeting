import { useEffect } from "react";

export default function ReservationDetailModal({ isOpen, onClose, onBack, formData }) {
  useEffect(() => {
    const escHandler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [onClose]);

  if (!isOpen || !formData) return null;

  // 🔹 Format tanggal
  const formatDate = (date) => {
    if (!date) return "-";
    try {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // 🔹 Hitung durasi otomatis
  const getDuration = (start, end) => {
    if (!start || !end) return "-";
    try {
      const [sh, sm] = start.split(":").map(Number);
      const [eh, em] = end.split(":").map(Number);
      const diff = eh * 60 + em - (sh * 60 + sm);
      const hours = Math.floor(diff / 60);
      const minutes = diff % 60;
      if (diff <= 0) return "-";
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
    } catch {
      return "-";
    }
  };

  // 🔹 Hitung total keseluruhan
  const totalAmount =
    Number(formData.roomTotal || 0) + Number(formData.snackTotal || 0);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
      />

      {/* Drawer / Modal */}
      <div className="fixed top-0 right-0 w-[456px] h-full bg-white shadow-xl z-50 flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center px-[16px] py-[16px] gap-0
                        shadow-[0_2px_4px_-2px_rgba(0,0,0,0.1)] bg-white">
          
          {/* Kiri: Back + Title */}
          <div className="flex items-center gap-2">
            <button
              onClick={onBack} // 🔙 Kembali ke Reservation Form
              className="flex items-center justify-center w-[24px] h-[24px] rounded-full
                         hover:bg-[#FFF3E9] text-[#EB5B00] transition-all duration-200"
            >
              <i className="uis uis-angle-left text-[24px]" />
            </button>
            <h2 className="text-[24px] font-medium text-[#2B2B2B]">
              Detail Reservation
            </h2>
          </div>

          {/* Kanan: Tombol Tutup */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-[26px] font-light leading-none"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto bg-white text-[#2B2B2B] divide-y divide-gray-200">
          
          {/* ROOM DETAIL */}
          <section className="px-6 py-4">
            <h3 className="font-medium text-[15px] mb-3">Room Detail</h3>
            <div className="grid grid-cols-2 text-[14px] gap-y-1.5">
              <div className="text-[#7A7A7A]">Room Name</div>
              <div className="text-right">{formData.roomName || "-"}</div>

              <div className="text-[#7A7A7A]">Room Type</div>
              <div className="text-right">{formData.roomType || "-"}</div>

              <div className="text-[#7A7A7A]">Capacity</div>
              <div className="text-right">
                {formData.capacity ? `${formData.capacity} people` : "-"}
              </div>

              <div className="text-[#7A7A7A]">Price/hour</div>
              <div className="text-right">
                Rp {formData.pricePerHour ? formData.pricePerHour.toLocaleString("id-ID") : "0"}
              </div>
            </div>
          </section>

          {/* BOOK DETAIL */}
          <section className="px-6 py-4">
            <h3 className="font-medium text-[15px] mb-3">Book Detail</h3>
            <div className="grid grid-cols-2 text-[14px] gap-y-1.5">
              <div className="text-[#7A7A7A]">Name</div>
              <div className="text-right">{formData.name || "-"}</div>

              <div className="text-[#7A7A7A]">No.Hp</div>
              <div className="text-right">{formData.phone || "-"}</div>

              <div className="text-[#7A7A7A]">Company/Organization</div>
              <div className="text-right">{formData.company || "-"}</div>

              <div className="text-[#7A7A7A]">Date Reservation</div>
              <div className="text-right">{formatDate(formData.date)}</div>

              <div className="text-[#7A7A7A]">Duration</div>
              <div className="text-right">
                {getDuration(formData.startTime, formData.endTime)}
              </div>

              <div className="text-[#7A7A7A]">Total Participants</div>
              <div className="text-right">
                {formData.participants
                  ? `${formData.participants} participants`
                  : "-"}
              </div>
            </div>
          </section>

          {/* KONSUMSI DETAIL */}
          {formData.snackEnabled && (
            <section className="px-6 py-4">
              <h3 className="font-medium text-[15px] mb-3">Konsumsi Detail</h3>
              <div className="grid grid-cols-2 text-[14px] gap-y-1.5">
                <div className="text-[#7A7A7A]">Snack</div>
                <div className="text-right">
                  {formData.snackType ||
                    (formData.snackCategory?.includes("Lunch")
                      ? "Lunch"
                      : "Coffee Break")}
                </div>

                <div className="text-[#7A7A7A]">Packages</div>
                <div className="text-right">{formData.snackCategory || "-"}</div>
              </div>
            </section>
          )}

          {/* TOTAL SECTION */}
          <section className="px-6 py-4">
            <h3 className="font-medium text-[15px] mb-3">Total</h3>

            {/* Room */}
            <div className="flex justify-between mb-[10px]">
              <div>
                <p className="text-[14px]">{formData.roomName || "-"}</p>
                <p className="text-[13px] text-[#7A7A7A]">
                  {getDuration(formData.startTime, formData.endTime)} × Rp{" "}
                  {formData.pricePerHour
                    ? formData.pricePerHour.toLocaleString("id-ID")
                    : "0"}
                </p>
              </div>
              <p className="text-[14px] font-medium">
                {formData.roomTotal
                  ? formData.roomTotal.toLocaleString("id-ID")
                  : "0"}
              </p>
            </div>

            {/* Snack */}
            {formData.snackEnabled && (
              <div className="flex justify-between mb-[10px]">
                <div>
                  <p className="text-[14px]">{formData.snackCategory || "-"}</p>
                  <p className="text-[13px] text-[#7A7A7A]">
                    {formData.participants
                      ? `${formData.participants} × ${
                          formData.snackCategory?.includes("50.000")
                            ? "50.000"
                            : "20.000"
                        }`
                      : "-"}
                  </p>
                </div>
                <p className="text-[14px] font-medium">
                  {formData.snackTotal
                    ? formData.snackTotal.toLocaleString("id-ID")
                    : "0"}
                </p>
              </div>
            )}

            {/* Divider & Total */}
            <div className="border-t border-gray-200 my-3"></div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-[15px]">Total</span>
              <span className="font-semibold text-[18px]">
                Rp {totalAmount.toLocaleString("id-ID")}
              </span>
            </div>
          </section>

          {/* NOTE */}
          {formData.note && (
            <section className="px-6 py-4">
              <h3 className="font-medium text-[15px] mb-2">Note</h3>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                {formData.note}
              </p>
            </section>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-5 bg-white shadow-[0_-2px_6px_-2px_rgba(0,0,0,0.08)]">
          <button
            onClick={() => {
              console.log("Submit reservation:", formData);
              onClose();
            }}
            className="w-full bg-[#EB5B00] hover:bg-[#d84f00] text-white font-medium rounded-[10px] h-[48px] transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
