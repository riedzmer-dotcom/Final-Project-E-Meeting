export default function ReportPagination({ page, totalPages, setPage }) {

  /* ======================================================
       HIDE PAGINATION WHEN ONLY 1 PAGE
     ====================================================== */
  if (totalPages <= 1) return null;

 /* ======================================================
       PAGE CALCULATIONS
       - Convert parent 1-based page → internal 0-based index
     ====================================================== */
  const current = page - 1;

   /* ======================================================
       HANDLERS
     ====================================================== */

  // Go to previous page
  const onPrev = () => {
    if (current > 0) setPage(current); // current → 1-based = current
  };

  // Go to next page
  const onNext = () => {
    if (current < totalPages - 1) setPage(current + 2); // +2 → 1-based
  };

  // Jump directly to page p (0-based)
  const onGoto = (p) => {
    setPage(p + 1); // convert 0-based → 1-based
  };


 /* ======================================================
       GENERATE PAGE LIST (MAX 3 PAGES):
       current-1, current, current+1
     ====================================================== */
  const pages = [];
  const start = Math.max(0, current - 1);
  const end = Math.min(totalPages - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  
  
  /* ======================================================
       UI
     ====================================================== */
  return (
    <div
      className="
        w-full flex items-center justify-end py-3 gap-1
        bg-gray-50 notranslate select-none
        shadow-[0_-2px_8px_rgba(0,0,0,0.06)]
      "
      translate="no"
    >

      {/* PREVIOUS BUTTON */}
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="
          rounded-md border border-gray-300 py-[6px] px-3 text-[12px] font-medium
          transition-all shadow-sm hover:shadow-md
          text-gray-600 hover:text-white
          hover:bg-[#EB5B00] hover:border-[#EB5B00]
          disabled:pointer-events-none disabled:opacity-40
        "
      >
        Prev
      </button>

      {/* PAGE NUMBER BUTTONS */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onGoto(p)}
          className={`
            min-w-[32px] rounded-md py-[6px] px-3 text-[12px] font-semibold transition-all
            ${
              p === current
                ? "bg-[#EB5B00] text-white shadow-md border border-[#EB5B00]"
                : "border border-gray-300 text-gray-600 hover:bg-[#EB5B00] hover:text-white hover:border-[#EB5B00]"
            }
          `}
        >
          {p + 1}
        </button>
      ))}

      {/* NEXT BUTTON */}
      <button
        onClick={onNext}
        disabled={current >= totalPages - 1}
        className="
          rounded-md border border-gray-300 py-[6px] px-3 text-[12px] font-medium
          transition-all shadow-sm hover:shadow-md
          text-gray-600 hover:text-white
          hover:bg-[#EB5B00] hover:border-[#EB5B00]
          disabled:pointer-events-none disabled:opacity-40
        "
      >
        Next
      </button>
    </div>
  );
}
