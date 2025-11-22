
export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {

/* ======================================================
       EARLY RETURN
     ====================================================== */
  if (!isOpen) return null;



/* ======================================================
       UI
     ====================================================== */

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      {/* MODAL BOX */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   bg-white rounded-[16px] shadow-xl z-50 w-[400px] max-w-[90%]
                   flex flex-col items-center px-[32px] py-[28px]"
        style={{ fontFamily: "'Roboto', sans-serif" }}
      >
        {/* ICON */}
        <div className="flex items-center justify-center bg-[#FFF3F3] rounded-full w-[80px] h-[80px] mb-[12px]">
          <i className="uil uil-trash text-[42px] text-[#E60000]" />
        </div>

        {/* TITLE */}
        <h2 className="text-[18px] text-[#2B2B2B] font-medium text-center mb-[28px]">
          Are you sure want to delete this room?
        </h2>

        {/* BUTTONS */}
        <div className="flex justify-center gap-[14px] w-full">
          <button
            onClick={onClose}
            className="flex-1 h-[44px] border border-gray-300 rounded-[8px]
                       text-[#2B2B2B] text-[15px] font-medium hover:bg-gray-100
                       transition-all duration-150"
          >
            No
          </button>

          {/* CONFIRM BUTTON */}
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 h-[44px] bg-[#E60000] text-white rounded-[8px]
                       text-[15px] font-medium hover:bg-[#C70000] transition-all duration-150"
          >
            Yes
          </button>
        </div>
      </div>
    </>
  );
}
