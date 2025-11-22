export default function ReservationPagination({
  page,
  totalPages,
  onPrev,
  onNext,
  onGoto,
}) {
  if (totalPages <= 1) return null;


/* ======================================================
     GENERATE PAGE INDEX LIST
     ====================================================== */
  const pages = [];
  const start = Math.max(0, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let i = start; i <= end; i++) pages.push(i);


/* ======================================================
     UI
     ====================================================== */
  return (
    <div
      className="
        w-full flex items-center justify-center py-3 gap-1
        bg-gray-50 notranslate select-none
        shadow-[0_-2px_8px_rgba(0,0,0,0.06)]
      "
      translate="no"
    >
      {/* PREV BUTTON */}
      <button
        onClick={onPrev}
        disabled={page === 0}
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

      {/* PAGE NUMBERS */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onGoto(p)}
          className={`
            min-w-[32px] rounded-md py-[6px] px-3 text-[12px] font-semibold transition-all
            ${
              p === page
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
        disabled={page >= totalPages - 1}
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
